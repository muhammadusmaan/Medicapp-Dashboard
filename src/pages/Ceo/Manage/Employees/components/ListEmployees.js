import React, { useEffect } from 'react'
import classNames from 'classnames';
import { href } from '../../../../../constants/extra';
import PLACEHOLDER_DOCTOR_IMAGE from '../../../../../assets/images/doctor_placeholder.png'
import { useState } from 'react';
import { clearSelectedEmployee, clearSearchResults, getEmployees, deleteEmployee, setPageNumber, searchEmployee, selectEmployee } from '../../../../../store/actions/employeeActions'
import { connect } from 'react-redux'
import { getPagesArray } from '../../../../../Utills/functions';

function ListEmployees({ clearSelectedEmployee, clearSearchResults, setEmployeePage, getEmployees, employees, deleteEmployee, setPageNumber, searchEmployee, selectEmployee }) {
  const [search, setSearch] = useState("");
  const { pageNumber, numberOfPages, employees: allEmployees, searchedEmployees, searchedText } = employees && employees

  useEffect(() => {
    if (searchedText !== "") {
      searchEmployee(pageNumber, searchedText)
    } else {
      getEmployees(pageNumber || 0)
    }
  }, [getEmployees, pageNumber, searchEmployee, searchedText])


  const deleteEmployeeHandler = (employee) => {
    deleteEmployee(employee._id).then(res => {
      getEmployees(pageNumber || 0)
    })
  }

  const onSearchEmployee = (e) => {
      setSearch(e.target.value);
      if(search !== "" && e.target.value === "" ){
        clearSearchResults();
        getEmployees(pageNumber || 0);
      }
  }

  const searchEmployeeHandler = (e) => {
    e.preventDefault();
    searchEmployee(0, search);
  }

  const employeesList = searchedEmployees.length > 0 ? searchedEmployees : allEmployees
  const pages = getPagesArray(numberOfPages)

  return (
    <>
      <form class="form-inline search-form d-none d-lg-block" onSubmit={searchEmployeeHandler}>
        <input style={{ width: "75%" }} class="form-control" type="search" placeholder="Search" aria-label="Search" value={search} onChange={onSearchEmployee} />
        <span class="icon-search"></span>
        <button type="submit" className="btn btn-secondary" style={{ padding: "12px 15px", marginLeft: '10px' }}>Search</button>
        <button type="button" onClick={() => { clearSelectedEmployee(); setEmployeePage("create") }} className="btn btn-primary" style={{ padding: "12px 15px", marginLeft: '10px' }}>Add New Employee</button>
      </form>
      <div style={{ paddingTop: '2rem' }}>
        <div className="row list-block">
          {employeesList?.map(employee => (
            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="media" style={{ borderBottom: "none" }} onClick={() => { selectEmployee(employee._id); setEmployeePage("create") }}>
                    <img className="pointer" src={employee?.profilePic ? employee?.profilePic : PLACEHOLDER_DOCTOR_IMAGE} alt="employee" />
                    <div className="media-body">
                      <h5 className="mt-0">{employee.name}</h5>
                      <p>{employee.emiratesId}</p>
                    </div>
                  </div>
                </div>
                <div className="dropdown">
                  <a href={href} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="icon-dots"></span>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item delete-item" href={href} onClick={(e) => {
                      e.preventDefault();
                      deleteEmployeeHandler(employee)
                    }}>Delete</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="row">
          <div className="col-md-12">
            {employeesList?.length > 0 ? (
              <nav>
                <ul className="pagination justify-content-center align-items-center my-md-2">
                  <li className="page-item" style={{ pointerEvents: +pageNumber <= 0 && "none" }}><a href={href} onClick={(e) => { e.preventDefault(); setPageNumber(pageNumber - 1) }}>Prev</a></li>
                  {pages.map((pageIndex) => (
                    <li className={classNames("page-item", { "active": +pageIndex === pageNumber })} key={pageIndex} onClick={() => setPageNumber(pageIndex)}><a className="page-link" href={href} onClick={(e) => e.preventDefault()}>{pageIndex + 1}</a></li>
                  ))}
                  <li className="page-item" style={{ pointerEvents: +pageNumber === +numberOfPages - 1 && "none" }}><a href={href} onClick={(e) => { e.preventDefault(); setPageNumber(pageNumber + 1) }}>Next</a></li>
                </ul>
              </nav>
            ) : (
              <p>No employees Found</p>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  employees: state.employees
})

const mapDispatchToProps = {
  getEmployees,
  deleteEmployee,
  setPageNumber,
  searchEmployee,
  clearSearchResults,
  selectEmployee,
  clearSelectedEmployee
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEmployees)