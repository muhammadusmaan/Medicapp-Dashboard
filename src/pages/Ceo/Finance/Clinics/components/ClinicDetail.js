import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HospitalApi from '../../../../../api/Hospital';
import COPY_ICON from '../../../../../assets/images/copy.png'
import { href } from '../../../../../constants/extra';
import { saveAs } from 'file-saver'
import ArchiveApi from '../../../../../api/Archive';

function ClinicDetail({ hospital: id, selectedTab, setSelectedTab }) {

  const [hospital, setHospital] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    HospitalApi.getHospitalFinance(id).then(res => {
      setHospital(res.data.data.hospital[0]);
    });
  }, []);

  const downloadReport = () => {
    if (!fromDate || !toDate) {
      toast.error("Select Start date and End date first");
      return false;
    }

    const data = {
      hospitalId: id,
      fromDate,
      toDate
    }
    HospitalApi.getHospitalFinanceReport(data).then(res => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
      saveAs(pdfBlob, 'Appointment Slip.pdf')
    });
    HospitalApi.getHospitalFinanceStatistics(data).then(res => {
      setAppointments(res.data.data);
    })
  }

  const archivePdf = () => {
    if (!fromDate || !toDate) {
      toast.error("Select Start date and End date first");
      return false;
    }

    const data = {
      hospitalId: id,
      fromDate,
      toDate
    }
    HospitalApi.getHospitalFinanceReport(data).then(res => {
      const pdfFile = new File([res.data], "name.pdf")
      const formData = new FormData()
      formData.append("url", pdfFile);
      formData.append("from", fromDate);
      formData.append("to", toDate);
      formData.append("pageNumber", Math.floor(Math.random() * 1000000));
      formData.append("hospitalId", id);
      
      ArchiveApi.createArchive(formData).then(() => {
        toast.success("Successfully archived PDF")
      });
    });
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

  const downloadFinanceData = () => {
    if (!fromDate || !toDate) {
      toast.error("Select Start date and End date first");
      return false;
    }

    const data = {
      hospitalId: id,
      fromDate,
      toDate
    }

    HospitalApi.getHospitalFinanceStatistics(data).then(res => {
      setAppointments(res.data.data);
    })
  }

  return (
    <>
      <h4 style={{ marginBottom: "2rem" }}>{selectedTab}</h4>
      <form onSubmit={() => { }} encType="multipart/form-data" autocomplete="off">
        <div className="row">
          <div className="col-sm-6">
            <label for="name">Hospital Name</label>
            <label class="sr-only" for="inlineFormInputGroup">Hospital Name</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(hospital?.name) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input id="name" type="text" class="form-control" placeholder="Hospital Name" value={hospital?.name} />
            </div>
          </div>
          <div className="col-sm-6">
            <label for="name">Trade License #</label>
            <label class="sr-only" for="inlineFormInputGroup">Trade License #</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(hospital?.tradeLicenseNo) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Trade License #" value={hospital?.tradeLicenseNo} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label for="name">Contact Info</label>
            <label class="sr-only" for="inlineFormInputGroup">Contact Info</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text" style={{ cursor: "pointer" }} onClick={(e) => { copyToClipboard(hospital.phoneNo) }}>
                  <img src={COPY_ICON} style={{ height: '1.1rem', width: '1.1rem' }} />
                </div>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Contact Info" value={hospital?.phoneNo} />
            </div>
          </div>
          <div className="col-sm-6">
            <label for="name">Email Address</label>
            <label class="sr-only" for="inlineFormInputGroup">Email Address</label>
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
        <br />
        <h4 style={{ marginBottom: "2rem" }}>Appointments</h4>
        <div className="row">
          <div className="col-sm-6">
            <label class="sr-only" for="inlineFormInputGroup">From</label>
            <div className="form-group">
              <label for="from">From</label>
              <input id="from" type="date" class={"form-control"} placeholder="From" value={fromDate} onChange={(e) => { setFromDate(e.target.value) }} />
            </div>
          </div>
          <div className="col-sm-6">
            <label class="sr-only" for="inlineFormInputGroup">To</label>
            <div className="form-group">
              <label for="to">To</label>
              <input id="to" type="date" class={"form-control"} placeholder="To" value={toDate} onChange={(e) => { setToDate(e.target.value) }} />
            </div>
          </div>
          <div className="col-sm-6">
            <label class="sr-only" for="inlineFormInputGroup">Total Appointments</label>
            <div className="form-group">
              <label for="totalAppointments">Total Appointments</label>
              <input id="totalAppointments" type="text" class={"form-control"} placeholder="To" value={appointments?.filter(app => app.status === "BOOKED").length} />
            </div>
          </div>
          <div className="col-sm-6">
						<label class="sr-only" for="inlineFormInputGroup">Total Amount</label>
						<div className="form-group">
							<label for="totalAppointments">Total Amount</label>
							<input id="totalAppointments" type="text" class={"form-control"} placeholder="Total Amount" value={appointments?.filter(app => app.status === "BOOKED").length * 21} />
						</div>
					</div>
        </div>
        <div className="form-group text-center">
          <button type="button" className="btn btn-secondary mt-2 mr-2" onClick={() => copyToClipboard(hospital.name + " " + hospital.tradeLicenseNo + " " + hospital.phoneNo + " " + hospital.email)}>Copy All</button>
          <button type="button" className="btn btn-success mt-2 ml-2" onClick={downloadReport}>Download as PDF</button>
          <button type="button" className="btn btn-success mt-2 ml-2" onClick={archivePdf}>Archive PDF</button>
          <button type="button" className="btn btn-primary mt-2 ml-2" onClick={downloadFinanceData}>Get Appointment Finance</button>
          <button type="button" className="btn btn-info mt-2 ml-2" onClick={() => { window.open(`${hospital.tradeLicenseFile}`, "_blank") }}>Download Trade License</button>
        </div>
      </form>
    </>
  )
}

export default ClinicDetail