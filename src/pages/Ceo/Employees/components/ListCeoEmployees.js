import React, { useEffect } from 'react'
import classNames from 'classnames';
import { href } from '../../../../constants/extra';
import PLACEHOLDER_DOCTOR_IMAGE from '../../../../assets/images/doctor_placeholder.png'
import { useState } from 'react';
import { setDepartment, clearSearchResults, getEmployees, setPageNumber, searchEmployee, selectEmployee } from '../../../../store/actions/employeeActions'
import { connect } from 'react-redux'
import { getPagesArray } from '../../../../Utills/functions';
import { useHistory } from 'react-router-dom'

function ListCeoEmployees({ setDepartment, clearSearchResults, getEmployees, employees, deleteEmployee, setPageNumber, searchEmployee, selectEmployee }) {
  const [search, setSearch] = useState("");
  const { pageNumber, numberOfPages, employees: allEmployees, searchedEmployees, searchedText, department } = employees && employees
  const history = useHistory();

  useEffect(() => {
    if (searchedText !== "") {
      searchEmployee(pageNumber, searchedText)
    } else {
      getEmployees(pageNumber || 0, department)
    }
  }, [department, getEmployees, pageNumber, searchEmployee, searchedText])

  const onSearchEmployee = (e) => {
    setSearch(e.target.value);
    if (search !== "" && e.target.value === "") {
      clearSearchResults();
      getEmployees(pageNumber || 0);
    }
  }

  const searchEmployeeHandler = (e) => {
    e.preventDefault();
    searchEmployee(0, search);
  }

  const filterByDepartment = (e) => {
    const value = e.target.value;
    setDepartment(value);
    setSearch("");
  }

  const employeesList = searchedEmployees.length > 0 ? searchedEmployees : allEmployees
  const pages = getPagesArray(numberOfPages)

  return (
    <>
      <form class="form-inline search-form d-none d-lg-block" onSubmit={searchEmployeeHandler}>
        <input class="form-control" type="search" placeholder="Search" aria-label="Search" value={search} onChange={onSearchEmployee} />
        <span class="icon-search"></span>
      </form>
      <div>
        <form class="form-inline search-form d-none d-lg-block">
          <select value={department} onChange={(filterByDepartment)} className={"form-control"} style={{ height: "50px", marginTop: '1rem' }}>
            <option value="">Department</option>
                <option value="FINANCE">FINANCE</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="SALES">SALES</option>
                <option value="OPERATIONS">OPERATIONS</option>
          </select>
        </form>
      </div>
      <div style={{ paddingTop: '2rem' }}>
        <div className="row list-block">
          {employeesList?.map(employee => (
            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <div className="card" onClick={() => history.push(`/ceo/employees/${employee._id}`)}>
                <div className="card-body">
                  <div className="media" style={{ borderBottom: "none" }} onClick={() => { selectEmployee(employee._id); }}>
                    <img className="pointer" src={employee?.profilePic ? employee?.profilePic : PLACEHOLDER_DOCTOR_IMAGE} alt="employee" />
                    <div className="media-body">
                      <h5 className="mt-0">{employee.name}</h5>
                      <p>{employee.emiratesId}</p>
                    </div>
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
  setPageNumber,
  searchEmployee,
  clearSearchResults,
  selectEmployee,
  setDepartment
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCeoEmployees)