import React, { useContext, useRef, useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import TextInput from '../../../../../components/forms/TextInput'
import { RootContext } from '../../../../../contextApi'
import { toast } from 'react-toastify'
import { href } from '../../../../../constants/extra'
import AuthApi from '../../../../../api/Auth'
import PatientApi from '../../../../../api/Patients'

function AddPoints({ patient, setPatient }) {
  const [leavePdf, setLeavePdf] = useState(null);
  const [addedPoints, setAddedPoints] = useState(null);
  const [ceoPassword, setCeoPassword] = useState("");
  const btnAddRef = useRef("");
  const btnRemoveRef = useRef("");

  const confirmPassword = (e) => {
    e.preventDefault();
    try {
      if (ceoPassword !== "") {
        AuthApi.login({
          email: "ceo@medicappae.com",
          password: ceoPassword
        }).then(res => {
          PatientApi.updatePatient(patient._id, { ...patient, addedPoints, updatePoints: true, points: parseInt(patient.points) + parseInt(addedPoints)}).then(res => {
            setPatient({ ...patient, points: parseInt(patient.points) + parseInt(addedPoints) });
            toast.success("Points added successfully");
          }).catch(err => {
            toast.error("Problem while adding points");
          });
          
        }).catch(err => {
          toast.error("Wrong password");
        });  
      } else {
        toast.error("CEO password required");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Formik
      initialValues={{
        currentPoints: patient.points,
        addPoints: "",
      }}
      validationSchema={Yup.object({
        addPoints: Yup.string().required('Required')
      })}
      onSubmit={(values, { resetForm }) => {
        setAddedPoints(values.addPoints);
        btnRemoveRef.current.click();
        btnAddRef.current.click();
        resetForm()
      }}
      enableReinitialize={true}
    >
      {({ values, errors }) => {
        return (
          <>
            <div className="modal fade" id="AddPoints" tabindex="-1" aria-labelledby="AddPointsLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-body">
                    <button ref={btnRemoveRef} type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span className="icon-close"></span>
                    </button>
                    <h4 className="text-center">Add Points</h4>
                    <Form>
                      <div className='row'>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Previous Points</label>
                            <TextInput disabled={true} type="currentPoints" name="currentPoints" placeholder="Current Points" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Add Points</label>
                            <TextInput type="addPoints" name="addPoints" placeholder="Points to be added" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group text-center mb-0">
                        <button type="submit" className="btn btn-primary">Confirm</button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
            <a href={href} ref={btnAddRef} style={{ visibility: "hidden" }} data-toggle="modal" data-target="#confirmAddPoints" className="btn btn-primary px-3">+</a>
              <div className="modal fade" id="confirmAddPoints" tabindex="-1" aria-labelledby="AddPointsLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-body">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span className="icon-close"></span>
                      </button>
                      <p className="text-center">Are you sure you want to add {addedPoints} points to user? if yes, enter ceo password</p>
                      <form onSubmit={confirmPassword}>
                        <input type="password" className="form-control" value={ceoPassword} onChange={(e) => setCeoPassword(e.target.value)} />
                        <div className="form-group text-center mb-0 mt-4">
                          <button type="submit" className="btn btn-primary">Confirm</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
          </>
        )
      }
      }
    </Formik>
  )
}

export default AddPoints
