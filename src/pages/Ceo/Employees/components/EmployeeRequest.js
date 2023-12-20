import React from 'react'
import DashboardLayout from '../../../../layout/DashboardLayout'
import { useState } from 'react'
import { useEffect } from 'react'
import EmployeeApi from '../../../../api/Employee'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import EmployeeRequestApi from '../../../../api/EmployeeRequests'

function EmployeeRequests() {
  const history = useHistory();
  const [employee, setEmployee] = useState({});
  const [allEmployeeRequests, setAllEmployeeRequests] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    EmployeeApi.getSingleEmployee(id).then(res => {
      setEmployee(res.data.data);
    });
    EmployeeRequestApi.getAllEmployeeRequests(id).then(res => {
      console.log("REQUESTS => ", res.data.data);
      setAllEmployeeRequests(res.data.data)
    })
  }, [id]);

  return (
    <DashboardLayout>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <img src={employee.profilePic} alt='Employee Image' style={{ width: '10rem', marginTop: '1rem', borderRadius: '3rem' }} />
          </div>
        </div>
        <h4 style={{ marginTop: '2rem' }}>Employee Requests</h4>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
						{allEmployeeRequests?.length > 0 ? (
							<table style={{ border: '1px solid gray', padding: '7px', width: '100%' }}>
								<thead style={{ border: '1px solid gray', padding: '7px' }}>
									<tr style={{ border: '1px solid gray', padding: '7px' }}>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}></td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>Request Type</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>From</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>To</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>Reason</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>Status</td>
									</tr>
								</thead>
								<tbody style={{ border: '1px solid gray', padding: '7px' }}>
									{allEmployeeRequests?.map(request => (
										<tr key={request._id} style={{ border: '1px solid gray', padding: '7px' }}>
											<td style={{ border: '1px solid gray', padding: '7px', backgroundColor: "gray", color: 'white', cursor: "pointer" }} onClick={() => history.push(`/ceo/employees/requestsDetail/${request._id}/${id}`)}>Open</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{request.type}</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{request.from}</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{request.to}</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{request.reason}</td>
                      <td style={
                        request.status === 'PENDING' ?
                          { border: '1px solid gray', padding: '7px', backgroundColor: 'red', color: 'white' }
                          : request.status === "DECLINED" ? 
                          { border: '1px solid gray', padding: '7px', backgroundColor: 'yellow', color: 'black' }
                          :
                          { border: '1px solid gray', padding: '7px', backgroundColor: 'green', color: 'white' }
                      }>{request.status}</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>You don't have any requests yet!</p>
						)}

					</div>
        <div className='col-md-12 mt-4' style={{ textAlign: 'center' }}>
          <button onClick={() => { history.goBack() }} className="btn btn-secondary">Back</button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeRequests