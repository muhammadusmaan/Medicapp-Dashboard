import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextInput from "../../../../components/forms/TextInput";
import ExpenseApi from "../../../../api/Expenses";
import TextArea from "../../../../components/forms/TextArea";
import SelectInput from "../../../../components/forms/SelectInput";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  EXPENSETYE_ELECTICITY_WATER,
  EXPENSETYE_OFFICE_RENT,
  EXPENSETYE_SALARY,
  EXPENSETYE_UN_EXPECTED,
  EXPENSETYE_VEHICLE_CONSUMABLE,
} from "../../../../constants/expenses";

function CreateExpense({
  defaultExpense,
  newExpense,
  employes,
  updatedExpense,
}) {
  const [showEmployee, setShowEmployees] = useState(false);
  const [expenseDate, setExpensetDate] = useState(null);
  const [expenseType, setExpenseType] = useState();
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  useMemo(() => {
    defaultExpense &&
      setShowEmployees(
        defaultExpense?.type == EXPENSETYE_SALARY.value ? true : false
      );
    defaultExpense &&
      setExpensetDate(
        defaultExpense?.date ? new Date(defaultExpense?.date) : null
      );
    defaultExpense && setExpenseType(defaultExpense?.type);

    defaultExpense?.type == EXPENSETYE_SALARY.value &&
      // console.log(
      //   "Setting Value",
      //   `${defaultExpense?.employeeId?.salary}_${defaultExpense?.employeeId?._id}`
      // );
      setSelectedEmployee(
        `${defaultExpense?.employeeId?.salary}_${defaultExpense?.employeeId?._id}`
      );
    defaultExpense?.type == EXPENSETYE_SALARY.value &&
      setEmployeeId(defaultExpense?.employeeId?._id);
    defaultExpense?.type == EXPENSETYE_SALARY.value &&
      setSalaryAmount(defaultExpense?.employeeId?.salary);
  }, [defaultExpense]);

  const refButton = useRef();
  const handleTypeSelect = (type) => {
    console.log("handleTypeSelect: ", type.target.value);
    setExpenseType(type.target.value);
    setShowEmployees(type.target.value == EXPENSETYE_SALARY.value);
  };
  const handleSetEmployee = (employee) => {
    setSelectedEmployee(employee.target.value);
    setSalaryAmount(parseInt(`${employee.target.value}`.split("_")[0]));
    setEmployeeId(`${employee.target.value}`.split("_")[1]);
  };
  const addExpense = (data) => {
    ExpenseApi.addExpense(data)
      .then((res) => {
        console.log(res.data.data);
        newExpense(res.data.data);
        toast.success("Expense created successfully");
        refButton.current.click();
      })
      .catch((err) => {
        console.log(err.response);
        toast.success("Problem while creating the expense");
      });
  };
  const updateExpense = (data) => {
    console.log("data", data);
    ExpenseApi.updateExpense(data)
      .then((res) => {
        console.log(res.data.data);
        updatedExpense(res.data.data);
        toast.success("Expense updated successfully");
        refButton.current.click();
      })
      .catch((err) => {
        console.log(err.response);
        toast.success("Problem while updating the expense");
      });
  };
  return (
    <Formik
      initialValues={{
        title: defaultExpense?.title ?? "",
        amount: defaultExpense?.amount ?? "",
        description: defaultExpense?.description ?? "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
        // description: Yup.string().required("Required"),
      })}
      onSubmit={(values, { resetForm }) => {
        if (expenseDate == null) {
          toast.error("Please select expense date");
          return false;
        }
        if (expenseType == "") {
          toast.error("Please select expense type");
          return false;
        }
        if (expenseType == EXPENSETYE_SALARY.value && salaryAmount == 0) {
          toast.error("Please select employee");
          return false;
        }
        if (expenseType != EXPENSETYE_SALARY.value && !values.amount) {
          toast.error("Please select amount");
          return false;
        }
        let data = {
          title: values.title,
          type: expenseType,
          description: values.description,
          amount:
            expenseType == EXPENSETYE_SALARY.value
              ? salaryAmount
              : values.amount,
          date: new Date(expenseDate).toISOString(),
          employeeId:
            expenseType == EXPENSETYE_SALARY.value ? employeeId : null,
        };
        if (defaultExpense) {
          console.log({ ...data, _id: defaultExpense?._id });
          updateExpense({ ...data, _id: defaultExpense?._id });
        } else {
          addExpense(data);
        }
        setExpensetDate(null);
        setEmployeeId("");
        setExpenseType("");
        resetForm();
      }}
      enableReinitialize={true}
    >
      <div
        className="modal fade"
        id="addExpense"
        tabindex="-1"
        aria-labelledby="addExpenseLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <button
                ref={refButton}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span className="icon-close"></span>
              </button>
              <h4 className="text-center">
                {defaultExpense ? "Update" : "Add"} Expense
              </h4>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <label for="title">Title</label>
                    <div className="form-group">
                      <TextInput type="text" name="title" placeholder="Title" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label for="date">Date</label>
                      <DatePicker
                        name="dateExpense"
                        id="date-expense"
                        className="form-control"
                        placeholderText="Date"
                        selected={expenseDate}
                        onChange={(date) => {
                          setExpensetDate(date);
                        }}
                        // showTimeSelect
                        autoComplete="off"
                        dateFormat="MMMM d, yyyy" // h:mm aa
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label for="expenses-type">Select Expense Type</label>
                      <SelectInput
                        id={"expenseType"}
                        name={"expenseType"}
                        style={{ height: "50px" }}
                        onChange={handleTypeSelect}
                        value={
                          expenseType ? expenseType : defaultExpense?.type ?? ""
                        }
                      >
                        <option>Select Expense Type</option>
                        <option value={EXPENSETYE_SALARY.value}>
                          {EXPENSETYE_SALARY.title}
                        </option>
                        <option value={EXPENSETYE_ELECTICITY_WATER.value}>
                          {EXPENSETYE_ELECTICITY_WATER.title}
                        </option>
                        <option value={EXPENSETYE_OFFICE_RENT.value}>
                          {EXPENSETYE_OFFICE_RENT.title}
                        </option>
                        <option value={EXPENSETYE_VEHICLE_CONSUMABLE.value}>
                          {EXPENSETYE_VEHICLE_CONSUMABLE.title}
                        </option>
                        <option value={EXPENSETYE_UN_EXPECTED.value}>
                          {EXPENSETYE_UN_EXPECTED.title}
                        </option>
                      </SelectInput>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label for="salary-amount">
                        {showEmployee ? "Select Employee" : "Amount"}
                      </label>
                      {showEmployee && (
                        <SelectInput
                          id={"salary"}
                          type="number"
                          name="salary"
                          onChange={handleSetEmployee}
                          value={selectedEmployee}
                          style={{ height: "50px" }}
                        >
                          <option value="">Select Employee</option>
                          {employes?.map((item, index) => (
                            <option
                              key={`emp_${item._id}`}
                              value={`${item.salary}_${item._id}`}
                            >
                              {item.name}
                            </option>
                          ))}
                        </SelectInput>
                      )}
                      {!showEmployee && (
                        <TextInput
                          type="number"
                          name="amount"
                          placeholder="Amount"
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label for="description">Description</label>
                      <TextArea
                        type="text"
                        name="description"
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group text-center mb-0">
                  <button type="submit" className="btn btn-primary">
                    Confirm
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default CreateExpense;
