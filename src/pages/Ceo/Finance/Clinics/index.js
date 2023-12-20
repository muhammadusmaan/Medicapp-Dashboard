import React, { useEffect, useState } from 'react'
import HospitalApi from '../../../../api/Hospital';
import ClinicDetail from './components/ClinicDetail';
import ListClinics from './components/ListClinics';

function Clinics() {
	const [hospitals, setHospitals] = useState([]);
	const [hospital, setHospital] = useState(null);
	const [search, setSearch] = useState([]);
	const [selectedTab, setSelectedTab] = useState("Clinics");

	useEffect(() => {
		HospitalApi.getAllAdminHospitals().then(res => {
			setHospitals(res.data.data);
		})
	}, [selectedTab]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (search === "") {
			HospitalApi.getAllAdminHospitals().then(res => {
				setHospitals(res.data.data);
			})
		} else {
			HospitalApi.searchHospitalByText(search).then((res) => {
				setHospitals(res.data.data)	
			})
		}
	}

	const selectHospital = (id) => {
		setSelectedTab("Hospital Detail")
		setHospital(hospitals.filter(hospital => hospital._id === id)[0]._id)
	}

	return (
		<>
			{selectedTab === "Clinics" && (
				<ListClinics hospitals={hospitals} selectedTab={selectedTab} selectHospital={selectHospital} submitHandler={submitHandler} search={search} setSearch={setSearch} hospital={hospital} />
			)}
			{selectedTab === "Hospital Detail" && (
				<ClinicDetail selectedTab={selectedTab} hospital={hospital} setHospital={setHospital} setSelectedTab={setSelectedTab}  />
			)}
		</>
	)
}

export default Clinics
