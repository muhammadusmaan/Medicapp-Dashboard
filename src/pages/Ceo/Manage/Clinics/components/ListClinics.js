import React from 'react'
import { Link } from 'react-router-dom'
import RIGHT_ARROW from '../../../../../assets/images/right-arrow.png'

function ListClinics({ submitHandler, search, setSearch, hospitals, selectedTab, selectHospital }) {
  return (
    <section class="user-dashboard">
			<div className='container'>
				<div className='row' style={{ marginBottom: '2rem', marginRight: '15rem', marginLeft: '15rem' }}>
					<div className='col-sm-12'>
						<form onSubmit={submitHandler}>
							<input
								type="text"
								className="form-control"
								placeholder='Enter to search user by name, location, address, phone etc...'
								value={search}
								onChange={(e) => { setSearch(e.target.value) }}
							/>
						</form>
					</div>
				</div>
			</div>
				<div class="row justify-content-center">
					<div class="col-md-12 col-xl-10 pb-5">
          <h4 class="mb-4">{selectedTab}</h4>
            {hospitals?.length === 0 && (
              <div style={{ textAlign: "center" }}>
                There are no clinics currently.
              </div>
            )}
						{hospitals?.map((hospital, index) => (
							<div class="card lab-result mb-2" style={{ border: "1px solid lightgray", borderRadius: '1rem' }}>
								<div class="card-body py-2">
									<div class="row align-items-center">
										<div class="col-md-12 col-lg-8">
											<ul>
												<li>
													{index + 1}
												</li>
												<li>
													{hospital?.name}
												</li>
												<li>
													{hospital?.phoneNo}
												</li>
											</ul>
										</div>
										<div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                      <a href='' onClick={(e) => { e.preventDefault(); selectHospital(hospital._id) }}>
												<img src={RIGHT_ARROW} style={{ width: "2rem", height: '2rem' }} />
											</a>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
  )
}

export default ListClinics