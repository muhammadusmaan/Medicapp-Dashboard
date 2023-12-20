import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { createEmployeeRequest } from '../../../../store/actions/employeeRequestActions'
import { connect } from 'react-redux'
import TextInput from '../../../../components/forms/TextInput'
import TextArea from '../../../../components/forms/TextArea'
import SelectInput from '../../../../components/forms/SelectInput'
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'
import EmployeeApi from '../../../../api/Employee'
import EmployeeRequestApi from '../../../../api/EmployeeRequests'
import DashboardLayout from '../../../../layout/DashboardLayout'
import { getTotalDaysBetweenTwoDays } from '../../../../Utills/functions'
import { toast } from 'react-toastify'

function RequestInfo() {
  const { requestId, employeeId } = useParams();
  const [employee, setEmployee] = useState([]);
  const [request, setRequest] = useState([]);

  const history = useHistory();

  useEffect(() => {
    EmployeeApi.getSingleEmployee(employeeId).then(res => {
      console.log("EMPLOYEE => ", res.data.data);
      setEmployee(res.data.data);
    });
    EmployeeRequestApi.getSingleEmployeeRequest(requestId).then(res => {
      console.log("REQUEST => ", res.data.data);
      setRequest(res.data.data);
    });
  }, [employeeId, requestId]);

  const declineHandler = () => {
    const body = { status: "DECLINED" };
    EmployeeRequestApi.updateEmployeeRequest(requestId, body).then(res => {
      toast.success("Request got declined");
      history.goBack();
    });
  }

  const approveHandler = () => {
    const body = { status: "APPROVED" };
    EmployeeRequestApi.updateEmployeeRequest(requestId, body).then(res => {
      toast.success("Request got approved");
      history.goBack();
    });
  }

  return (
    <DashboardLayout>
      <Formik
        initialValues={{
          type: request.type,
          from: request.from,
          to: request.to,
          reason: request.reason,
        }}
        enableReinitialize={true}
      >
        {({ values, errors }) => {
          return (
            <div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <img src={employee.profilePic} alt='Employee Image' style={{ width: '10rem', marginTop: '1rem', borderRadius: '3rem' }} />
                  </div>
                  <div style={{ marginLeft: '2rem' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                      {employee.name}
                    </div>
                    <div>
                      Department: {employee.department}
                    </div>
                    <div>
                      Employee ID: {employee._id}
                    </div>
                    {request?.leavePdf && (
                      <div>
                        Leave Attachment:
                        <span
                          style={{ textDecoration: "underline", marginLeft: '0.5rem', color: 'blue', cursor: "pointer" }}
                          onClick={() => window.open(request?.leavePdf, "_blank")}
                        >
                          See Attachment</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Form>
                <div className="row" style={{ marginTop: '2rem' }}>
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
                        <TextInput type="time" name="from" placeholder="From Time" />
                      ) : (
                        <TextInput type="date" min={moment(new Date()).add(1, 'days').format('YYYY-MM-DD')} name="from" placeholder="From Date" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      {values.type === "EARLY LEAVE" ? (
                        <TextInput type="time" name="to" placeholder="To Time" />
                      ) : (
                        <TextInput type="date" min={moment(new Date(values.from).toLocaleTimeString())} name="to" placeholder="To Time" />
                      )}
                    </div>
                  </div>
                  <div className='col-md-6'></div>
                </div>
                {values.type !== "EARLY LEAVE" && (
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label>Total Days</label>
                        <input type="number" className='form-control' placeholder="To Time" value={getTotalDaysBetweenTwoDays(new Date(values.from), new Date(values.to))} />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label>Remaining Days</label>
                        <input type="number" className='form-control' placeholder="To Time" value={getTotalDaysBetweenTwoDays(new Date(), new Date(values.to))} />
                      </div>
                    </div>
                  </div>
                )}
                <div className='row'>
                  <div className="col-md-12">
                    <div className="form-group">
                      <TextArea name="reason" placeholder="Reason" />
                    </div>
                  </div>
                </div>
                <div className="form-group text-center mb-0">
                  <button type="type" className="btn" style={{ backgroundColor: 'indianred', color: 'white', marginRight: "1rem" }} onClick={declineHandler}>Decline</button>
                  <button type="type" className="btn btn-primary" onClick={approveHandler}>Approve</button>
                </div>
              </Form>
            </div>
          )
        }
        }
      </Formik>
    </DashboardLayout>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  createEmployeeRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestInfo)
