import React from 'react'
import { useState } from 'react';
import DashboardLayout from '../../../layout/DashboardLayout';
import { connect } from 'react-redux';
import ListCeoEmployees from './components/ListCeoEmployees';

function CeoEmployees({ employees }) {
    const [employeePage, setEmployeePage] = useState("list");

    return (
        <DashboardLayout>
            <div className="row align-items-center add-list">
                <div className="col-12">
                  <h4>Employees</h4>
                  <div style={{ marginTop: "4rem" }}>
                    <ListCeoEmployees />
                  </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

const mapStateToProps = (state) => ({
    employees: state.employees
})

export default connect(mapStateToProps, null)(CeoEmployees)
