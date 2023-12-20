import React, { useEffect, useState } from 'react'
import ArchiveApi from '../../../api/Archive';
import DashboardLayout from '../../../layout/DashboardLayout';
import { toast } from 'react-toastify';
import moment from 'moment';

function Archives() {

    const [search, setSearch] = useState("");
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [archives, setArchives] = useState([]);

    useEffect(() => {
        ArchiveApi.getArchives().then(res => {
            setArchives(res.data.data);
        })
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if (search === "") {
            ArchiveApi.getArchives().then(res => {
            	setArchives(res.data.data);
            })
        } else {
            ArchiveApi.searchByPageNumber(search).then((res) => {
            	setArchives(res.data.data)	
            }).catch(err => {
                setArchives([]);
                toast.error("No archives found");
            })
        }
    }

    const filterArchive = () => {
        if (!(from && to)) {
            toast.error("Please select from and to date first");
        } else {
            const data = { fromDate: from, toDate: to }; 
            ArchiveApi.filterByFromToDate(data).then((res) => {
            	setArchives(res.data.data)	
            }).catch(err => {
                setArchives([]);
                toast.error("No archives found");
            })
        }
    }

    const deleteArchiveHandler = (archive) => {
        ArchiveApi.deleteArchive(archive._id).then(res => {
            setArchives(archives.filter(a => a._id !== res.data.data._id));
        });
    }

    const clearFilter = () => {
        ArchiveApi.getArchives().then(res => {
            setArchives(res.data.data);
        })
    }

    const viewHandler = (archive) => {
        window.open(archive.url, '_blank');
    }

    return (
        <div>
            <DashboardLayout>
                <section class="user-dashboard">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3 style={{ textAlign: "center", marginBottom: "3rem" }}>Archives ( Clinic Reports )</h3>
                            </div>
                        </div>
                    </div>
                    <div className='container' style={{ marginBottom: "2rem" }}>
                        <div className='row'>
                            <div className='col-md-2'>
                               
                                    <label htmlFor='searchText'> File Number </label>
                                    <input
                                        id="searchText"
                                        className='form-control'
                                        placeholder='File Number'
                                        type='text'
                                        name='search'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                            </div>
                            <div className='col-md-2'>
                                <button className='btn btn-primary' style={{ marginTop: "2.2rem" }} onClick={submitHandler}>Search</button>
                            </div>
                            <div className='col-md-2' style={{ borderLeft: '2px solid black', paddingLeft: '3rem' }}>
                               
                                    <label htmlFor='from'> From </label>
                                    <input
                                        id="from"
                                        className='form-control'
                                        type='date'
                                        name='from'
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                    />
                            </div>
                            <div className='col-md-2'>
                               
                                    <label htmlFor='to'> To </label>
                                    <input
                                        id="to"
                                        className='form-control'
                                        type='date'
                                        name='to'
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                    />
                            </div>
                            <div className='col-md-2'>
                                <button className='btn btn-primary' style={{ marginTop: "2.2rem" }} onClick={filterArchive}>Date Filter</button>
                            </div>
                            <div className='col-md-2'>
                                <button className='btn btn-secondary' style={{ marginTop: "2.2rem", marginLeft: "-1rem" }} onClick={clearFilter}>Clear Filter</button>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-12 col-xl-10 pb-5">
                            {archives?.length === 0 && (
                                <div style={{ textAlign: "center" }}>
                                    There is no archived report yet.
                                </div>
                            )}
                            {archives?.map((archive, index) => (
                                <div class="card lab-result mb-2" style={{ border: "1px solid lightgray", borderRadius: '1rem' }}>
                                    <div class="card-body py-2">
                                        <div class="row align-items-center">
                                            <div class="col-md-12 col-lg-9">
                                                <ul>
                                                    <li>
                                                        <span style={{ fontWeight: 'bold' }}>File No: </span> {archive?.pageNumber}
                                                    </li>
                                                    <li>
                                                        <span style={{ fontWeight: 'bold' }}>From: </span> {archive?.from}
                                                    </li>
                                                    <li>
                                                        <span style={{ fontWeight: 'bold' }}>To: </span> {archive?.to}
                                                    </li>
                                                    <li>
                                                        <span style={{ fontWeight: 'bold' }}>Hospital: </span> {archive?.hospitalId.name}
                                                    </li>
                                                    <li>
                                                        <span style={{ fontWeight: 'bold' }}>Archived At: </span> {moment(archive?.date).format("LL")}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="col-md-12 col-lg-1 text-center text-md-right mt-3 mt-md-0">
                                                <button type="button" class="btn btn-danger" onClick={() => deleteArchiveHandler(archive)}>DELETE</button>
                                            </div>
                                            <div class="col-md-12 col-lg-1 text-center text-md-right mt-3 mt-md-0" style={{ marginLeft: "3rem" }}>
                                                <button type="button" class="btn btn-primary" onClick={viewHandler.bind(this, archive)}>VIEW</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </DashboardLayout>
        </div>
    )
}

export default Archives
