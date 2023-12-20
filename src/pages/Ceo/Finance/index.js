import React from 'react'
import { useState } from 'react';
import DashboardLayout from '../../../layout/DashboardLayout';
import Clinics from './Clinics';
import classNames from 'classnames';
import { href } from '../../../constants/extra';
import Expenses from './Expenses';
import All from './All';

function Finance() {
    const [tabSelected, setTabSelected] = useState("Clinics")

    let returnedComponent = null

    if (tabSelected === "Clinics") {
        returnedComponent = <Clinics />
    } else if (tabSelected === "Expenses") {
        returnedComponent = <Expenses />
    } else if (tabSelected === "All") {
        returnedComponent = <All />
    }
    
    return (
        <div>
            <DashboardLayout>
                <div className="row align-items-center add-list">
                    <div className="col-6">
                        <h4>Finance</h4>
                    </div>
                </div>
                <div className="row nav-tab-link">
                    <div className="col-md-12">
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <a className={classNames('nav-link', { 'active': tabSelected === "Clinics" })} href={href} onClick={(e) => { e.preventDefault(); setTabSelected("Clinics") }}>Clinics</a>
                            </li>
                            <li className="nav-item">
                                <a className={classNames('nav-link', { 'active': tabSelected === "Expenses" })} href={href} onClick={(e) => { e.preventDefault(); setTabSelected("Expenses") }}>Expenses</a>
                            </li>
                            <li className="nav-item">
                                <a className={classNames('nav-link', { 'active': tabSelected === "All" })} href={href} onClick={(e) => { e.preventDefault(); setTabSelected("All") }}>All</a>
                            </li>
                        </ul>
                    </div>
                </div>
                {returnedComponent}
            </DashboardLayout>
        </div>
    )
}

export default Finance
