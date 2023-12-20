import React from 'react'
import { useState } from 'react';
import DashboardLayout from '../../../layout/DashboardLayout';
import Clinics from './Clinics';
import Employees from './Employees';
import Users from './Users';
import classNames from 'classnames';
import { href } from '../../../constants/extra';

function Manage() {
    const [tabSelected, setTabSelected] = useState("Clinics")

    let returnedComponent = null

    if (tabSelected === "Clinics") {
        returnedComponent = <Clinics />
    } else if (tabSelected === "Users") {
        returnedComponent = <Users />
    } else if (tabSelected === "Employees") {
        returnedComponent = <Employees />
    }
    
    return (
        <div>
            <DashboardLayout>
                <div className="row align-items-center add-list">
                    <div className="col-6">
                        <h4>Manage</h4>
                    </div>
                </div>
                <div className="row nav-tab-link">
                    <div className="col-md-12">
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <a className={classNames('nav-link', { 'active': tabSelected === "Clinics" })} href={href} onClick={(e) => { e.preventDefault(); setTabSelected("Clinics") }}>Clinics</a>
                            </li>
                            <li className="nav-item">
                                <a className={classNames('nav-link', { 'active': tabSelected === "Users" })} href={href} onClick={(e) => { e.preventDefault(); setTabSelected("Users") }}>Users</a>
                            </li>
                            <li className="nav-item">
                                <a className={classNames('nav-link', { 'active': tabSelected === "Employees" })} href={href} onClick={(e) => { e.preventDefault(); setTabSelected("Employees") }}>Employees</a>
                            </li>
                        </ul>
                    </div>
                </div>
                {returnedComponent}
            </DashboardLayout>
        </div>
    )
}

export default Manage
