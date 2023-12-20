import React from 'react'
import { toast } from 'react-toastify';
import COPY_ICON from '../../../../../assets/images/copy.png'
import ADD_ICON from '../../../../../assets/images/add.png'
import AddPoints from './AddPoints';
import { href } from '../../../../../constants/extra';
import PatientApi from '../../../../../api/Patients';

function PatientDetail({ selectedTab, patient, setSelectedTab, setPatient }) {

  const copyToClipboard = (text) => {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    toast.success("Copied to clipboard")
  }

  const deleteUser = () => {
    PatientApi.deletePatient(patient._id).then(res => {
      toast.success("Patient deleted successfully");
      setSelectedTab("Users")
    });
  }

  return (
    <>
      <h4 style={{ marginBottom: "2rem" }}>{selectedTab}</h4>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Patient Name</label>
            <label class="sr-only" for="inlineFormInputGroup">Patient Name</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(patient?.firstName + " " + patient?.lastName) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Name" value={patient?.firstName + " " + patient?.lastName} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Email</label>
            <label class="sr-only" for="inlineFormInputGroup">Email</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(patient?.email) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Email" value={patient?.email} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Contact Info</label>
            <label class="sr-only" for="inlineFormInputGroup">Contact Info</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(patient?.phone) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Phone" value={patient?.phone} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Birthday</label>
            <label class="sr-only" for="inlineFormInputGroup">Birthday</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(patient?.birthday) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Birthday" value={patient?.birthday} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Emirates Id</label>
            <label class="sr-only" for="inlineFormInputGroup">Emirates Id</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(patient?.emiratesId) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Emirates Id" value={patient?.emiratesId} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Gender</label>
            <label class="sr-only" for="inlineFormInputGroup">Gender</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(patient?.gender) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Gender" value={patient?.gender} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Location</label>
            <label class="sr-only" for="inlineFormInputGroup">Location</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(patient?.location) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Location" value={patient?.location} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Points</label>
            <label class="sr-only" for="inlineFormInputGroup">Points</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }}>
                  <a href={href} data-toggle="modal" data-target="#AddPoints">
                    <img src={ADD_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                  </a>
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Points" value={patient?.points} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="form-group text-center mb-0 mt-4">
          <button type="submit" className="btn btn-danger" onClick={deleteUser}>DELETE USER</button>
        </div>
      </div>
      <AddPoints patient={patient} setPatient={setPatient} />
    </>
  )
}

export default PatientDetail