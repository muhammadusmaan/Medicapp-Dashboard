import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../../../../components/forms/TextInput'
import SelectInput from '../../../../../components/forms/SelectInput'
import { toast } from 'react-toastify'
import EmployeeApi from '../../../../../api/Employee'
import { connect } from 'react-redux'
import NumberFormatInput from '../../../../../components/forms/NumberFormat'

function CreateEmployee({ setEmployeePage, employees }) {
  const [employeeAgreement, setEmployeeAgreement] = useState(undefined);
  const [passportPdf, setPassportPdf] = useState(undefined);
  const [emiratesIdPdf, setEmiratesIdPdf] = useState(undefined);
  const [visaPdf, setVisaPdf] = useState(undefined);
  const [profilePic, setProfilePic] = useState(undefined);

  const { selectedEmployee } = employees;

  return (
    <Formik
      initialValues={{
        name: selectedEmployee.name || "",
        email: selectedEmployee.email || "",
        department: selectedEmployee.department || "",
        salary: selectedEmployee.salary || "",
        passportNo: selectedEmployee.passportNo || "",
        emiratesId: selectedEmployee.emiratesId || "",
        workEmail: selectedEmployee.workEmail || "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email().required('Required'),
        department: Yup.string().required('Required'),
        salary: Yup.number().required('Required'),
        passportNo: Yup.number().required('Required'),
        emiratesId: Yup.string().required('Required'),
      })}
      onSubmit={(values, { resetForm }) => {
        const isSaveForm = Object.values(selectedEmployee).length === 0;
        if (!employeeAgreement && isSaveForm) {
          toast.error("Please upload your Employee Agreement");
          return false;
        } else if (!passportPdf && isSaveForm) {
          toast.error("Please upload your Passport Pdf");
          return false;
        } else if (!emiratesIdPdf && isSaveForm) {
          toast.error("Please upload your EmiratesId Pdf");
          return false;
        } else if (!visaPdf && isSaveForm) {
          toast.error("Please upload your Visa Pdf");
          return false;
        }

        const formData = new FormData()
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("department", values.department);
        formData.append("salary", values.salary);
        formData.append("passportNo", values.passportNo);
        formData.append("workEmail", values.workEmail);
        formData.append("emiratesId", values.emiratesId);
        employeeAgreement && formData.append("employeeAgreement", employeeAgreement);
        passportPdf && formData.append("passportPdf", passportPdf);
        emiratesIdPdf && formData.append("emiratesIdPdf", emiratesIdPdf);
        visaPdf && formData.append("visaPdf", visaPdf);
        profilePic && formData.append("profilePic", profilePic);

        if (Object.keys(selectedEmployee).length > 0) {
          EmployeeApi.updateEmployee(selectedEmployee._id, formData).then(res => {
            toast.success("Employee updated successfully");
            setEmployeePage("list")
          }).catch(err => {
            toast.error(err.response.data.message)
          });
        } else {
          EmployeeApi.createEmployee(formData).then(res => {
            toast.success("Employee created successfully");
            setEmployeePage("list")
          }).catch(err => {
            toast.error(err.response.data.message)
          })
        }
      }}
      enableReinitialize={true}
    >
      <Form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <TextInput type="text" name="name" placeholder="Name" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextInput disabled={Object.keys(selectedEmployee).length > 0} type="email" name="email" placeholder="Email" />
            </div>
          </div>
          <div className="col-md-6">
            <div class="form-group">
              <SelectInput name="department" style={{ height: "50px" }}>
                <option value="">Department</option>
                <option value="FINANCE">FINANCE</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="SALES">SALES</option>
                <option value="OPERATIONS">OPERATIONS</option>
              </SelectInput>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextInput type="number" name="salary" placeholder="Salary" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextInput type="number" name="passportNo" placeholder="Passport No" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextInput type="text" name="workEmail" placeholder="Work Email" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              {/* <TextInput type="text" name="emiratesId" placeholder="Emirates Id" /> */}
              <NumberFormatInput
                format={"###-####-#######-#"}
                mask={"-"}
                name="emiratesId"
                placeholder={"Emirates ID"} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="Profile Picture" style={{ fontWeight: '800' }}>
                Profile Picture
                {Object.keys(selectedEmployee).length > 0 && (
                  <span>
                    <a target="_blank" href={selectedEmployee.profilePic} rel="noreferrer" style={{ marginLeft: '0.5rem', fontSize: '13px', textDecoration: "underline" }}>See Attachment</a>
                  </span>
                )}
              </label>
              <input type="file" className="form-control" accept="image/*" onChange={(e) => { setProfilePic(e.target.files[0]) }} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="employeeAgreement" style={{ fontWeight: '800' }}>
                Employee Agreement
                {Object.keys(selectedEmployee).length > 0 && (
                  <span>
                    <a target="_blank" href={selectedEmployee.employeeAgreement} rel="noreferrer" style={{ marginLeft: '0.5rem', fontSize: '13px', textDecoration: "underline" }}>See Attachment</a>
                  </span>
                )}
              </label>
              <input type="file" className="form-control" accept='application/pdf' onChange={(e) => { setEmployeeAgreement(e.target.files[0]) }} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="passportPdf" style={{ fontWeight: '800' }}>
                Passport Pdf
                {Object.keys(selectedEmployee).length > 0 && (
                  <span>
                    <a target="_blank" href={selectedEmployee.passportPdf} rel="noreferrer" style={{ marginLeft: '0.5rem', fontSize: '13px', textDecoration: "underline" }}>See Attachment</a>
                  </span>
                )}
              </label>
              <input type="file" className="form-control" accept='application/pdf' onChange={(e) => { setPassportPdf(e.target.files[0]) }} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="emiratesIdPdf" style={{ fontWeight: '800' }}>
                EmiratesId Pdf
                {Object.keys(selectedEmployee).length > 0 && (
                  <span>
                    <a target="_blank" href={selectedEmployee.emiratesIdPdf} rel="noreferrer" style={{ marginLeft: '0.5rem', fontSize: '13px', textDecoration: "underline" }}>See Attachment</a>
                  </span>
                )}
              </label>
              <input type="file" className="form-control" accept='application/pdf' onChange={(e) => { setEmiratesIdPdf(e.target.files[0]) }} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="visaPdf" style={{ fontWeight: '800' }}>
                Visa Pdf
                {Object.keys(selectedEmployee).length > 0 && (
                  <span>
                    <a target="_blank" href={selectedEmployee.visaPdf} rel="noreferrer" style={{ marginLeft: '0.5rem', fontSize: '13px', textDecoration: "underline" }}>See Attachment</a>
                  </span>
                )}
              </label>
              <input type="file" className="form-control" accept='application/pdf' onChange={(e) => { setVisaPdf(e.target.files[0]) }} />
            </div>
          </div>
        </div>
        <div className="form-group text-center mb-0 mt-3">
          <button type="button" className="btn btn-secondary" style={{ marginRight: "1rem" }} onClick={() => { setEmployeePage("list") }}>Cancel</button>
          <button type="submit" className="btn btn-primary">
            {Object.keys(selectedEmployee).length > 0 ? "Update" : "Confirm New Employee"}
          </button>
        </div>
      </Form>
    </Formik>
  )
}

const mapStateToProps = (state) => ({
  employees: state.employees
})

export default connect(mapStateToProps, null)(CreateEmployee);