import React, { useContext, useEffect } from 'react';
import DashboardLayout from '../../../layout/DashboardLayout';
import { connect } from 'react-redux';
import { RootContext } from '../../../contextApi';
import { getEmployeeRequests, deleteEmployeeRequest } from '../../../store/actions/employeeRequestActions'
import { href } from '../../../constants/extra';
import AddRequest from './components/addRequest';

function Requests({ getEmployeeRequests, employeeRequests, deleteEmployeeRequest }) {
	const { employeeRequests: allEmployeeRequests } = employeeRequests && employeeRequests;
	const { user } = useContext(RootContext)

	useEffect(() => {
		getEmployeeRequests(user.referenceId)
	}, [getEmployeeRequests]);

	const deleteEmployeeRequestHandler = (employeeRequestId) => {
		deleteEmployeeRequest(employeeRequestId)
	}

	return (
		<DashboardLayout>
			<div className="row align-items-center add-list">
				<div className="col-12">
					<br />
					<div className="row align-items-center add-list">
						<div className="col-6">
							<h4>Requests List</h4>
						</div>
						<div className="col-6 text-right">
							<a href={href} data-toggle="modal" data-target="#addRequest" className="btn btn-primary px-3">+ ADD REQUEST</a>
						</div>
					</div>
					<div style={{ textAlign: 'center' }}>
						{allEmployeeRequests?.length > 0 ? (
							<table style={{ border: '1px solid gray', padding: '7px', width: '100%' }}>
								<thead style={{ border: '1px solid gray', padding: '7px' }}>
									<tr style={{ border: '1px solid gray', padding: '7px' }}>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>Request Type</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>From</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>To</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>Reason</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>Status</td>
										<td style={{ border: '1px solid gray', padding: '7px', fontWeight: 'bold' }}>Actions</td>
									</tr>
								</thead>
								<tbody style={{ border: '1px solid gray', padding: '7px' }}>
									{allEmployeeRequests?.map(request => (
										<tr key={request._id} style={{ border: '1px solid gray', padding: '7px' }}>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{request.type}</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{request.from}</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{request.to}</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{request.reason}</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>{request.status}</td>
											<td style={{ border: '1px solid gray', padding: '7px' }}>
												<button className="btn btn-success" onClick={deleteEmployeeRequestHandler.bind(this, request._id)}>DELETE</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>You don't have any requests yet!</p>
						)}

					</div>
				</div>
			</div>
			<AddRequest />
		</DashboardLayout>
	)
}

const mapStateToProps = (state) => ({
	employeeRequests: state.employeeRequests
})

const mapDispatchToProps = {
	getEmployeeRequests,
	deleteEmployeeRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Requests)