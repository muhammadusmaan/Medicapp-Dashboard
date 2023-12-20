import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PatientApi from '../../../../api/Patients';
import RIGHT_ARROW from '../../../../assets/images/right-arrow.png'
import { href } from '../../../../constants/extra';
import ListUsers from './components/ListUsers';
import classNames from 'classnames';
import PatientDetail from './components/PatientDetail';

function Users() {
	const [patients, setPatients] = useState([]);
	const [search, setSearch] = useState([]);
	const [selectedTab, setSelectedTab] = useState("Users");
	const [patient, setPatient] = useState([]);

	useEffect(() => {
		PatientApi.getAllPlateformPatients().then((res) => {
			setPatients(res.data.data);
		});
	}, [selectedTab]);

	const submitHandler = (e) => {
		e.preventDefault();
		PatientApi.searchPlateformPatients(search === "" ? "undefined" : search).then((res) => {
			setPatients(res.data.data)
		});
	}

	const selectPatient = (id) => {
		setSelectedTab("Patient Detail")
		setPatient(patients.filter(patient => patient._id === id)[0])
	}

	return (
		<>
			{selectedTab === "Users" && (
				<ListUsers selectedTab={selectedTab} selectPatient={selectPatient} submitHandler={submitHandler} search={search} setSearch={setSearch} patients={patients} />
			)}
			{selectedTab === "Patient Detail" && (
				<PatientDetail selectedTab={selectedTab} patient={patient} setPatient={setPatient} setSelectedTab={setSelectedTab}  />
			)}
		</>
	)
}

export default Users
