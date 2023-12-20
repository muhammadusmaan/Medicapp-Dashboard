import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { createEmployeeRequest } from "../../../../store/actions/employeeRequestActions";
import { connect } from "react-redux";
import TextInput from "../../../../components/forms/TextInput";
import TextArea from "../../../../components/forms/TextArea";
import SelectInput from "../../../../components/forms/SelectInput";
import { RootContext } from "../../../../contextApi";
import moment from "moment";
import { toast } from "react-toastify";

function AddRequest({ createEmployeeRequest }) {
  const { user } = useContext(RootContext);
  const [leavePdf, setLeavePdf] = useState(null);

  return (
    <Formik
      initialValues={{
        type: "",
        from: "",
        to: "",
        reason: "",
      }}
      validationSchema={Yup.object({
        type: Yup.string().required("Required"),
        from: Yup.string().required("Required"),
        to: Yup.string().required("Required"),
        reason: Yup.string().required("Required"),
      })}
      onSubmit={(values, { resetForm }) => {
        if (leavePdf === null) {
          toast.success(
            "Please upload any proof or something to get approved your leave"
          );
          return false;
        }

        const formData = new FormData();
        formData.append("type", values.type);
        formData.append("from", values.from);
        formData.append("to", values.to);
        formData.append("reason", values.reason);
        formData.append("employeeId", user.referenceId);
        formData.append("leavePdf", leavePdf);

        createEmployeeRequest(formData);
        resetForm();
      }}
      enableReinitialize={true}
    >
      {({ values, errors }) => {
        return (
          <div
            className="modal fade"
            id="addRequest"
            tabindex="-1"
            aria-labelledby="AddRequestLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-body">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span className="icon-close"></span>
                  </button>
                  <h4 className="text-center">Send Request</h4>
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <SelectInput name="type" style={{ height: "50px" }}>
                            <option value="">Select Request Type</option>
                            <option value="ANNUAL LEAVE">ANNUAL LEAVE</option>
                            <option value="SICK LEAVE">SICK LEAVE</option>
                            <option value="EARLY LEAVE">EARLY LEAVE</option>
                          </SelectInput>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          {values.type === "EARLY LEAVE" ? (
                            <TextInput
                              type="time"
                              name="from"
                              placeholder="From Time"
                            />
                          ) : (
                            <TextInput
                              type="date"
                              min={moment(new Date())
                                .add(1, "days")
                                .format("YYYY-MM-DD")}
                              name="from"
                              placeholder="From Date"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          {values.type === "EARLY LEAVE" ? (
                            <TextInput
                              type="time"
                              name="to"
                              placeholder="To Time"
                            />
                          ) : (
                            <TextInput
                              type="date"
                              min={moment(
                                new Date(values.from).toLocaleTimeString()
                              )}
                              name="to"
                              placeholder="To Time"
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextArea
                            type="date"
                            name="reason"
                            placeholder="Reason"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextInput
                            type="file"
                            name="leavePdf"
                            placeholder="Leave PDF"
                            onChange={(e) => {
                              setLeavePdf(e.target.files[0]);
                            }}
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
        );
      }}
    </Formik>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  createEmployeeRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRequest);
