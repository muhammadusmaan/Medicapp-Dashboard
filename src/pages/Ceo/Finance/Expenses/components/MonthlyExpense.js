import React from 'react'
import { Link } from 'react-router-dom'
import RIGHT_ARROW from '../../../../../assets/images/right-arrow.png'

function MonthlyExpense({ setPage }) {
  return (
    <section class="user-dashboard">
				<div class="row justify-content-center">
					<div class="col-md-12 col-xl-10 pb-5">
            <h4 class="mb-4">Expenses January 20XX</h4>
            <button type="button" className="btn btn-secondary mt-2 mb-2" onClick={() => setPage(1)}>Back</button>
						<div class="card lab-result mb-2" style={{ border: "1px solid lightgray", borderRadius: '1rem' }}>
							<div class="card-body" style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}>
								<div class="row align-items-center">
									<div class="col-md-12 col-lg-8">
										<ul>
											<li>
												Salaries
											</li>
											<li>
												January XX/XX/XXXX
											</li>
											<li>
												XXXXXX.XX AED
											</li>
										</ul>
									</div>
									<div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
										<a style={{ cursor: 'pointer' }} onClick={() => setPage(3)}>
											<img src={RIGHT_ARROW} style={{ width: "2rem", height: '2rem' }} />
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="card lab-result mb-2" style={{ border: "1px solid lightgray", borderRadius: '1rem' }}>
							<div class="card-body" style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}>
								<div class="row align-items-center">
									<div class="col-md-12 col-lg-8">
										<ul>
											<li>
												Electricity & Water
											</li>
											<li>
												January XX/XX/XXXX
											</li>
											<li>
												XXXXXX.XX AED
											</li>
										</ul>
									</div>
									<div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
										<Link to={`type/1`}>
											<img src={RIGHT_ARROW} style={{ width: "2rem", height: '2rem' }} />
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div class="card lab-result mb-2" style={{ border: "1px solid lightgray", borderRadius: '1rem' }}>
							<div class="card-body" style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}>
								<div class="row align-items-center">
									<div class="col-md-12 col-lg-8">
										<ul>
											<li>
												Office Rent
											</li>
											<li>
												January XX/XX/XXXX
											</li>
											<li>
												XXXXXX.XX AED
											</li>
										</ul>
									</div>
									<div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
										<Link to={`type/1`}>
											<img src={RIGHT_ARROW} style={{ width: "2rem", height: '2rem' }} />
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div class="card lab-result mb-2" style={{ border: "1px solid lightgray", borderRadius: '1rem' }}>
							<div class="card-body" style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}>
								<div class="row align-items-center">
									<div class="col-md-12 col-lg-8">
										<ul>
											<li>
												Vehicle Consumables
											</li>
											<li>
												January XX/XX/XXXX
											</li>
											<li>
												XXXXXX.XX AED
											</li>
										</ul>
									</div>
									<div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
										<Link to={`type/1`}>
											<img src={RIGHT_ARROW} style={{ width: "2rem", height: '2rem' }} />
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div class="card lab-result mb-2" style={{ border: "1px solid lightgray", borderRadius: '1rem' }}>
							<div class="card-body" style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}>
								<div class="row align-items-center">
									<div class="col-md-12 col-lg-8">
										<ul>
											<li>
												IT Services
											</li>
											<li>
												January XX/XX/XXXX
											</li>
											<li>
												XXXXXX.XX AED
											</li>
										</ul>
									</div>
									<div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
										<Link to={`type/1`}>
											<img src={RIGHT_ARROW} style={{ width: "2rem", height: '2rem' }} />
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div class="card lab-result mb-2" style={{ border: "1px solid lightgray", borderRadius: '1rem' }}>
							<div class="card-body" style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}>
								<div class="row align-items-center">
									<div class="col-md-12 col-lg-8">
										<ul>
											<li>
												Un-expected Expenses
											</li>
											<li>
												January XX/XX/XXXX
											</li>
											<li>
												XXXXXX.XX AED
											</li>
										</ul>
									</div>
									<div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
										<Link to={`type/1`}>
											<img src={RIGHT_ARROW} style={{ width: "2rem", height: '2rem' }} />
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
  )
}

export default MonthlyExpense