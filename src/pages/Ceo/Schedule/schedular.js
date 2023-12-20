import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { href } from "../../../constants/extra";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RootContext } from "../../../contextApi/index";
import TodoApi from "../../../api/Todo";
import DeleteSlot from "./DeleteSlot";
import TextInput from "../../../components/forms/TextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SelectInput from "../../../components/forms/SelectInput";
import TextArea from "../../../components/forms/TextArea";

const localizer = momentLocalizer(moment);

function Scheduler() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [todos, setTodos] = useState([]);

  const { user } = useContext(RootContext);
  const buttonRef = useRef();
  const deleteSlotRef = useRef();

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time.getTime());
    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterEndPassedTime = (time) => {
    const newDate = moment(time);
    const dateSelected = moment(startDate);
    return newDate.isAfter(dateSelected);
  };

  useEffect(() => {
    TodoApi.getCeoTodos().then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        const events = [];
        res.data.data.forEach((todo) => {
          events.push({
            _id: todo._id,
            title: `${
              moment(todo.from).format("hh:mm a") +
              " - " +
              moment(todo.to).format("hh:mm a")
            }`,
            start: todo.from,
            end: todo.to,
            // status: todo.status,
          });
        });
        setTodos(events);
      }
    });
  }, [id]);

  const onSelectSlot = (box) => {
    console.log("Click");
    if (isTodayOrFuture(moment(box.start))) {
      setSelectedDate(box.start);
      const startDate = new Date(box.start.getTime());
      const endDate = new Date(box.start.getTime());

      const currentTime = new Date();
      console.log("Start Date", startDate);
      console.log("End Date", endDate);
      if (currentTime.getMinutes() < 30) {
        startDate.setMinutes(30);
        startDate.setHours(currentTime.getHours());
        setStartDate(startDate);
        endDate.setMinutes(0);
        endDate.setHours(new Date().getHours() + 1);
        setEndDate(endDate);
      } else {
        startDate.setMinutes(0);
        startDate.setHours(new Date().getHours() + 1);
        setStartDate(startDate);

        endDate.setMinutes(30);
        endDate.setHours(new Date().getHours() + 1);
        setEndDate(endDate);
      }
      buttonRef.current.click();
    }
  };

  function isTodayOrFuture(date) {
    date = stripTime(date);
    return date.diff(stripTime(moment.now())) >= 0;
  }

  function stripTime(date) {
    date = moment(date);
    date.hours(0);
    date.minutes(0);
    date.seconds(0);
    date.milliseconds(0);
    return date;
  }

  const onSelectEvent = (slot) => {
    setSelectedSlot(slot);
    deleteSlotRef.current.click();
  };

  const handleSlotDeleteCallback = (deletedSlot) => {
    const updatedSlots = todos.filter((item) => item._id !== deletedSlot._id);
    setTodos(updatedSlots);
    deleteSlotRef.current.click();
  };

  const createTodo = (todoData) => {
    TodoApi.createTodo(todoData)
      .then((res) => {
        setTodos([
          ...todos,
          {
            _id: res.data.data._id,
            title: `${
              moment(startDate).format("hh:mm a") +
              " - " +
              moment(endDate).format("hh:mm a")
            }`,
            start: startDate,
            end: endDate,
          },
        ]);
        toast.success("Todo created successfully");
        buttonRef.current.click();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Problem while creating the todo");
      });
  };

  const eventStyleGetter = (event, start, end, status) => {
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      fontSize: "14px",
      textAlign: "center",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };

    if (event.status === "BOOKED" && moment(event.end).isSameOrBefore()) {
      style.backgroundColor = "#D22B2B";
      style.pointerEvents = "none";
    }

    if (moment(event.end).isAfter() && event.status === "BOOKED") {
      style.backgroundColor = "green";
    }

    return {
      style: style,
    };
  };
  return (
    <>
      <div className="col-md-12 mb-3">
        <div
          class="col-6 mb-4"
          style={{ marginLeft: "-15px", fontWeight: "600", fontSize: "22px" }}
        >
          <h4>Schedule</h4>
        </div>
        <Calendar
          popup
          localizer={localizer}
          events={todos}
          startAccessor="start"
          views={["month"]}
          endAccessor="end"
          selectable={true}
          style={{ height: 900 }}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          eventPropGetter={eventStyleGetter}
        />

        <div class="col-6 text-right" style={{ visibility: "hidden" }}>
          <a
            ref={buttonRef}
            href={href}
            data-toggle="modal"
            data-target="#setSchedule"
            class="btn btn-primary px-3"
          ></a>
          <a
            ref={deleteSlotRef}
            href={href}
            data-toggle="modal"
            data-target="#deleteSlot"
            class="btn btn-primary px-3"
          ></a>
        </div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            type: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string().optional(),
            type: Yup.string().required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            if (startDate === null) {
              toast.success("Please select start date");
              return false;
            }
            if (endDate === null) {
              toast.success("Please select end date");
              return false;
            }

            const todoData = {
              from: startDate,
              to: endDate,
              title: values.title,
              description: values.description,
              type: values.type,
            };
            console.log(todoData);
            createTodo(todoData);
            resetForm();
          }}
          enableReinitialize={true}
        >
          {({ values, errors }) => {
            return (
              <div
                class="modal fade"
                id="setSchedule"
                tabindex="-1"
                aria-labelledby="setScheduleLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered modal-lg">
                  <div class="modal-content">
                    <div class="modal-body">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span class="icon-close"></span>
                      </button>
                      <h4 class="text-center">Create Todo</h4>
                      <Form>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label for="from">Title</label>
                              <TextInput
                                name="title"
                                type="title"
                                placeholder="Title"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="from">From</label>
                              <DatePicker
                                id="from"
                                className="form-control"
                                placeholderText="From Date"
                                selected={startDate}
                                onChange={(date) => {
                                  setStartDate(date);
                                  const dateSelected = new Date(date.getTime());
                                  if (dateSelected.getMinutes() < 30) {
                                    dateSelected.setMinutes(30);
                                    dateSelected.setHours(
                                      dateSelected.getHours()
                                    );
                                    setEndDate(dateSelected);
                                  } else {
                                    dateSelected.setMinutes(0);
                                    dateSelected.setHours(
                                      dateSelected.getHours() + 1
                                    );
                                    setEndDate(dateSelected);
                                  }
                                }}
                                showTimeSelect
                                autoComplete="off"
                                filterTime={filterPassedTime}
                                minDate={selectedDate}
                                // maxDate={selectedDate}
                                dateFormat="MMMM d, yyyy h:mm aa"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="to">To</label>
                              <DatePicker
                                id="to"
                                className="form-control"
                                placeholderText="To Date"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                showTimeSelect
                                autoComplete="off"
                                filterTime={filterEndPassedTime}
                                minDate={selectedDate}
                                // maxDate={selectedDate}
                                dateFormat="MMMM d, yyyy h:mm aa"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="to">Type</label>
                              <SelectInput
                                name="type"
                                style={{ height: "50px" }}
                              >
                                <option value="">Select Todo Type</option>
                                <option value="GOVERNMENT">GOVERNMENT</option>
                                <option value="MEETING">MEETING</option>
                                <option value="INTERVIEWS">INTERVIEWS</option>
                              </SelectInput>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="description">Description</label>
                              <TextArea
                                type="description"
                                name="description"
                                placeholder="Description"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group text-center mb-0">
                          <button type="submit" className="btn btn-primary">
                            Create
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
      <DeleteSlot
        selectedSlot={selectedSlot}
        slotDeletedCallback={handleSlotDeleteCallback}
      />
    </>
  );
}

export default Scheduler;
