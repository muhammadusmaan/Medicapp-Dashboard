import React, { useContext, useEffect, useState } from 'react'
import EmployeeCheckinApi from '../../../api/Checkin';
import { href } from '../../../constants/extra'
import { RootContext } from '../../../contextApi';
import DashboardLayout from '../../../layout/DashboardLayout'

function Checkin() {
  const [attendance, setAttendance] = useState([]);
  const { user } = useContext(RootContext);

  useEffect(() => {
    getLatestHistory();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLatestHistory = () => {
    EmployeeCheckinApi.getAllAttendance(user.referenceId).then(res => {
      setAttendance(res.data.data?.reverse());
    });
  }

  const checkinHandler = (e) => {
    e.preventDefault();
    const data = {
      date: new Date().toLocaleDateString(),
      checkin: new Date().toLocaleTimeString(),
      employeeId: user.referenceId
    }

    EmployeeCheckinApi.employeeCheckin(data).then(res => {
      getLatestHistory();
    });
  }

  const checkOutHandler = (update, e) => {
    e.preventDefault();
    const data = {
      date: update.date,
      checkin: update.checkin,
      checkout: new Date().toLocaleTimeString(),
    };

    EmployeeCheckinApi.employeeCheckout(update._id, data).then(res => {
      getLatestHistory();
    })
  }

  const today = attendance.filter(att => att.date === (new Date().toLocaleDateString()));

  return (
    <DashboardLayout>
      {!(today[0]?.checkin && today[0].checkout) && (
        <>
          <div style={{
          backgroundColor: "lightgray",
          padding: '100px 10px',
          marginTop: '2rem',
          textAlign: 'center',
          marginBottom: '3rem'
          }}>            
          {today.length > 0 ? (
            <a href={href} className="btn btn-primary px-3" onClick={checkOutHandler.bind(this, attendance.filter(att => att.date === (new Date().toLocaleDateString()))[0])}>Check Out</a>
          ) : (
            <a href={href} className="btn btn-primary px-3" onClick={checkinHandler}>Check In</a>
            )}
          <h4 style={{ paddingTop: '1.5rem' }}>Mark today's Attendance</h4>
        </div>
        </>
        
      )}
      <div className="row align-items-center add-list">
				<div className="col-12">
					<div className="row align-items-center add-list">
						<div className="col-6">
							<h4>Check In/Out History</h4>
						</div>
					</div>
					<div style={{ textAlign: 'center' }}>
						{attendance?.length > 0 ? (
							<table style={{ border: '1px solid gray', padding: '7px', width: '100%' }}>
								<thead style={{ border: '1px solid gray', padding: '7px' }}>
									<tr style={{ border: '1px solid gray', padding: '7px' }}>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>Date</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>Check In</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>Check Out</td>
									</tr>
								</thead>
								<tbody style={{ border: '1px solid gray', padding: '7px' }}>
									{attendance?.map(att => (
										<tr key={att._id} style={{ border: '1px solid gray', padding: '7px' }}>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{att.date}</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{att.checkin}</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{att.checkout}</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>You don't have any attendance!</p>
						)}

					</div>
				</div>
			</div>
    </DashboardLayout>
  )
}

export default Checkin