import React, { useState, useContext } from 'react'
import SideNav from '../SideNav';
import { RootContext } from '../../contextApi/index';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../constants/Redirects';
import { href } from '../../constants/extra';
import LOGO from '../../assets/images/logo.png'
import classNames from 'classnames';
import HashLoader from "react-spinners/HashLoader";
import { usePromiseTracker } from "react-promise-tracker";

function DashboardLayout({ children }) {

    const { user, selectedNav } = useContext(RootContext);
    const history = useHistory();
    const { promiseInProgress } = usePromiseTracker();

    const [toggle, setToggle] = useState(false);

    const onCloseClick = (e) => {
        e.preventDefault();
        setToggle(false);
    }

    const onOpenClick = (e) => {
        e.preventDefault();
        setToggle(true);
    }

    const onLogout = () => {
        localStorage.clear();
        history.push(LOGIN_ROUTE);
    }

    // let redirectTo = null;
    // switch (user?.role) {
    //     case CEO: redirectTo = NURSE_PROFILE_ROUTE; break;
    //     default: redirectTo = "/";
    // }

    // let searchComp = null;
    // switch (selectedNav) {
    //     case DOCTORS_NAV: searchComp = <SearchDoctors />; break;
    //     case NURSE_NAV: searchComp = <SearchNurse />; break;
    //     case LABORATORY_NAV: searchComp = <SearchLab />; break;
    //     default: searchComp = null;
    // }

    return (
        <>
            <div id="wrapper" className={classNames({ 'toggled': toggle })}>
                <aside id="sidebar-wrapper" className="scrollbar">
                    <a href={href} className="d-lg-none" ><i id="close" onClick={onCloseClick} className="icon-close"></i></a>
                    <div className="text-center logo">
                        <a href={href}>
                            <img src={LOGO} alt="logo" />
                        </a>
                    </div>
                    <form className="form-inline search-form d-lg-none">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                        <span className="icon-search"></span>
                    </form>
                    <SideNav />
                </aside>
                <section id="content-wrapper" className="user-dashboard">
                    <header>
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <a href={href} className="d-lg-none" id="sidebar-toggle" onClick={onOpenClick}><i className="fa fa-bars"></i></a>
                            {/* {searchComp} */}
                            <ul className="navbar-nav ml-auto align-items-center">
                                <li className="nav-item">
                                    <div className="dropdown">
                                        <a href={href} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="icon-user"></span> {user?.firstName + " " + user?.lastName}
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            {/* <Link className="dropdown-item" to={redirectTo}>Profile</Link> */}
                                            <a className="dropdown-item" href={href} onClick={onLogout}>Logout</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    {promiseInProgress && (
                        <div className="centered-loader">
                            <HashLoader color="#417EBF" loading={true} size={50} />
                        </div>
                    )}
                    <div className={classNames({ "fade-out": promiseInProgress, "fade-in": !promiseInProgress })}>
                        {children}
                    </div>
                </section>
            </div>
        </>
    )
}

export default DashboardLayout
