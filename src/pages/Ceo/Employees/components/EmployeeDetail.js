import React from 'react'
import DashboardLayout from '../../../../layout/DashboardLayout'
import TextInput from '../../../../components/forms/TextInput'
import SelectInput from '../../../../components/forms/SelectInput'
import { useState } from 'react'
import { useEffect } from 'react'
import EmployeeApi from '../../../../api/Employee'
import { useParams } from 'react-router-dom'
import COPY_ICON from '../../../../assets/images/copy.png'
import { toast } from 'react-toastify'
import EmployeeCheckinApi from '../../../../api/Checkin'
import { useHistory } from 'react-router-dom'

function EmployeeDetail() {
  const history = useHistory();
  const [employee, setEmployee] = useState({});
  const [searchedDate, setSearchedDate] = useState(new Date());
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const { id } = useParams();

  useEffect(() => {
    EmployeeApi.getSingleEmployee(id).then(res => {
      setEmployee(res.data.data);
    });
    getCheckInOutHandler(new Date().toLocaleDateString(), id);
  }, [id]);

  const getCheckInOutHandler = (date, employeeId) => {
    const data = { date, employeeId }
    EmployeeCheckinApi.employeeCheckinoutOfADate(data).then(res => {
      setCheckin(res.data.data?.checkin);
      setCheckout(res.data.data?.checkout);
    })
  }

  const copyToClipboard = (text) => {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    toast.success("Copied to clipboard")
  }

  const setCheckInOutInputHandler = (e) => {
    setSearchedDate(e.target.value)
    getCheckInOutHandler(new Date(e.target.value).toLocaleDateString(), id);
  }

  return (
    <DashboardLayout>
      <div>
        <h4>{employee.name}</h4>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <img src={employee.profilePic} alt='Employee Image' style={{ width: '10rem', marginTop: '1rem', borderRadius: '3rem' }} />
          </div>
          <div style={{ marginLeft: '2rem' }}>
            <input type="date" className='form-control' value={searchedDate} onChange={setCheckInOutInputHandler} />
            <div style={{ padding: '10px 20px', width: '15rem', backgroundColor: "lightgreen", marginTop: "0.4rem" }}>
              IN: { (!checkin && !checkout) ? "Absent" : checkin }
            </div>
            <div style={{ padding: '10px 20px', width: '15rem', backgroundColor: "indianred", marginTop: "0.4rem" }}>
              OUT: { (checkin && !checkout) ? "------" : checkout }
            </div>
          </div>
        </div>
        <div style={{ marginTop: '3rem' }}>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label for="name">Employee Name</label>
                <label class="sr-only" for="inlineFormInputGroup">Employee Name</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(employee?.name) }}>
                      <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                    </div>
                  </div>
                  <input type="text" class="form-control" id="inlineFormInputGroup" disabled placeholder="Email" value={employee?.name} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="name">Employee Email</label>
                <label class="sr-only" for="inlineFormInputGroup">Employee Email</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(employee?.email) }}>
                      <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                    </div>
                  </div>
                  <input type="text" class="form-control" id="inlineFormInputGroup" disabled placeholder="Email" value={employee?.email} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div class="form-group">
                <label for="name">Employee Department</label>
                <label class="sr-only" for="inlineFormInputGroup">Employee Department</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(employee?.department) }}>
                      <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                    </div>
                  </div>
                  <input type="text" class="form-control" id="inlineFormInputGroup" disabled placeholder="Email" value={employee?.department} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <button type="button" style={{ width: '100%', marginTop: '2rem', height: '3.1rem' }} className="btn btn-primary" onClick={() => window.open(employee.employeeAgreement, "_blank")}>Employee Agreement</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
              <label for="name">Employee Passport Number</label>
                <label class="sr-only" for="inlineFormInputGroup">Employee Passport Number</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(employee?.passportNo) }}>
                      <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                    </div>
                  </div>
                  <input type="text" class="form-control" id="inlineFormInputGroup" disabled placeholder="Email" value={employee?.passportNo} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <button type="button" style={{ width: '100%', marginTop: '2rem', height: '3.1rem' }} className="btn btn-primary" onClick={() => window.open(employee.passportPdf, "_blank")}>Passport PDF</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="name">Employee Emirates ID</label>
                <label class="sr-only" for="inlineFormInputGroup">Employee Emirates ID</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(employee?.emiratesId) }}>
                      <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                    </div>
                  </div>
                  <input type="text" class="form-control" id="inlineFormInputGroup" disabled placeholder="Email" value={employee?.emiratesId} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <button type="button" style={{ width: '100%', marginTop: '2rem', height: '3.1rem' }} className="btn btn-primary" onClick={() => window.open(employee.emiratesIdPdf, "_blank")}>Emirates ID PDF</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="name">Employee Salary</label>
                <label class="sr-only" for="inlineFormInputGroup">Employee Salary</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(employee?.salary) }}>
                      <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                    </div>
                  </div>
                  <input type="text" class="form-control" id="inlineFormInputGroup" disabled placeholder="Email" value={employee?.salary} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <button type="button" style={{ width: '100%', marginTop: '2rem', height: '3.1rem' }} className="btn btn-primary" onClick={() => window.open(employee.visaPdf, "_blank")}>VISA PDF</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
              <label for="name">Employee Work Email</label>
                <label class="sr-only" for="inlineFormInputGroup">Employee Work Email</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(employee?.workEmail) }}>
                      <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                    </div>
                  </div>
                  <input type="text" class="form-control" id="inlineFormInputGroup" disabled placeholder="Email" value={employee?.workEmail} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <button type="button" style={{ width: '100%', marginTop: '2rem', height: '3.1rem' }} className="btn btn-primary" onClick={() => history.push(`/ceo/employees/requests/${id}`)}>Employee's Requests</button>
              </div>
            </div>
            <div className='col-md-12' style={{ textAlign: 'center' }}>
              <button onClick={() => { history.goBack() }} className="btn btn-secondary">Back</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeDetail