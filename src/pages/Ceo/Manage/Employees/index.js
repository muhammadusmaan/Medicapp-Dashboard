import React from 'react'
import { useState } from 'react';
import ListEmployees from './components/ListEmployees';
import CreateEmployee from './components/CreateEmployee';
import DashboardLayout from '../../../../layout/DashboardLayout';
import { connect } from 'react-redux';

function Employees({ employees }) {
    const [employeePage, setEmployeePage] = useState("list");
    const { selectedEmployee } = employees;

    let returnedComponent = null;
    let pageTitle = "Employees";

    if (employeePage === "list") {
        returnedComponent = <ListEmployees setEmployeePage={setEmployeePage} />
    } else if (employeePage === "create") {
        if (Object.keys(selectedEmployee).length > 0) { 
            pageTitle = `Update [ ${selectedEmployee.name} ] Info`
        } else {
            pageTitle = "Create New Employee"
        }
        returnedComponent = <CreateEmployee setEmployeePage={setEmployeePage} />
    }

    return (
        <div>
            <div className="row align-items-center add-list">
                <div className="col-6">
                    <h4>{pageTitle}</h4>
                </div>
            </div>
            {returnedComponent}
        </div>
    )
}

const mapStateToProps = (state) => ({
    employees: state.employees
})

export default connect(mapStateToProps, null)(Employees)
