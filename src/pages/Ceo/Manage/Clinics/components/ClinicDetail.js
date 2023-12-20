import React from 'react'
import { toast } from 'react-toastify';
import HospitalApi from '../../../../../api/Hospital';
import COPY_ICON from '../../../../../assets/images/copy.png'
import { href } from '../../../../../constants/extra';

function ClinicDetail({ selectedTab, hospital, setSelectedTab, setHospital }) {

  const copyToClipboard = (text) => {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    toast.success("Copied to clipboard")
  }

  const deleteHospital = () => {
    HospitalApi.deleteHospital(hospital._id).then(res => {
      toast.success("Hospital deleted successfully");
      setSelectedTab("Clinics")
    });
  }

  return (
    <>
      <h4 style={{ marginBottom: "2rem" }}>{selectedTab}</h4>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Hospital Name</label>
            <label class="sr-only" for="inlineFormInputGroup">Hospital Name</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(hospital?.name) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Name" value={hospital?.name} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Email</label>
            <label class="sr-only" for="inlineFormInputGroup">Email</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(hospital?.email) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Email" value={hospital?.email} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Contact Info</label>
            <label class="sr-only" for="inlineFormInputGroup">Contact Info</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(hospital?.phone) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Phone" value={hospital?.phone} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">Address</label>
            <label class="sr-only" for="inlineFormInputGroup">Address</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(hospital?.address) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Birthday" value={hospital?.address} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="name">TradeLicense No</label>
            <label class="sr-only" for="inlineFormInputGroup">TradeLicense No</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(hospital?.tradeLicenseNo) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Emirates Id" value={hospital?.tradeLicenseNo} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="form-group text-center mb-0 mt-4">
          <button type="submit" className="btn btn-danger" onClick={deleteHospital}>DELETE HOSPITAL</button>
        </div>
      </div>
    </>
  )
}

export default ClinicDetail