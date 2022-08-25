import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home = () => {

    const [campaigns, setCampaigns] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/all-campaigns').then((res) => {
            console.log(res.data)
            setCampaigns(res.data)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <Header tab="home" />
            <div className='' style={{ height: "40ch", background: `url(assets/orphans.jpg)`, backgroundSize: 'cover', backgroundPosition: "center" }}>
                <div className='d-flex col-md-5' style={{ height: "100%" }}>
                    <div className='my-auto mx-5'>
                        <p className='text-light my-auto' style={{ fontSize: "4rem", fontWeight: "100" }}>Little <span className='text-primary' style={{ fontWeight: "900" }}>Donation</span> Changes <span className=''>Lives.</span></p>
                    </div>
                </div>
            </div>

            <div className='container-fluid bg-light p-0 py-5'>
                <div className='container mx-auto col-md-10 mt-5 row p-0'>
                    <div className='col-md-6'>
                        <div>
                            <img className='rounded' style={{ width: "100%", height: "30ch", objectFit: "cover" }} src="assets/food.jpg" alt="" />
                            <div className='d-flex mt-3'>
                                <div className='me-2'>
                                    <img className='rounded' style={{ width: "100%", height: "30ch", objectFit: "cover" }} src="assets/study.jpg" alt="" />
                                </div>
                                <div className='ms-2'>
                                    <img className='rounded' style={{ width: "100%", height: "30ch", objectFit: "cover" }} src="assets/water.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='d-flex align-items-center h-100'>
                            <div className=''>
                                <p className='text-primary'>About Us</p>
                                <p className='fw-bold m-0' style={{ fontSize: "3rem" }}>Fight for the right cause to save lives.</p>
                                <div className='my-5'>
                                    <p className=''><i className='fa-solid fa-check-circle text-success me-3'></i>Food and water charity</p>
                                    <p className=''><i className='fa-solid fa-check-circle text-success me-3'></i>Make Donations</p>
                                    <p className=''><i className='fa-solid fa-check-circle text-success me-3'></i>Raise Campaigns</p>
                                    <p className=''><i className='fa-solid fa-check-circle text-success me-3'></i>24/7 Online Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mx-auto col-md-10 mt-5 mb-5'>
                <div className='mt-5'>
                    <h5 className='fw-light text-primary'><span><i className='fa-solid fa-heart me-2'></i></span>Make Donations</h5>
                    <div className='d-flex flex-wrap justify-content-start'>
                        {
                            !loading ?
                                <>
                                    {
                                        campaigns.length > 0 ?
                                            <>
                                                {
                                                    campaigns.splice(0, 3).map((val, ind) => {
                                                        return (
                                                            <Link to={`/campaign-details/${val._id}`} style={{ textDecoration: "none", color: "#3f3f3f" }}>
                                                                <div className='my-3 bg-light' style={{ marginRight: "2ch", height: '45ch', width: "38ch", borderRadius: "6px" }}>
                                                                    <img src={val.image} className='poster' style={{ height: '60%', width: "100%", objectFit: "cover", borderRadius: "6px 6px 0 0" }} alt="" />
                                                                    <div className="progress progress-sm" style={{ borderRadius: "0 !important" }}>
                                                                        <div className="progress-bar" role="progressbar" style={{ width: `${val.raised / val.goal * 100}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                    <div className='px-4 py-2'>
                                                                        <p className='m-0 text-info'>{val.category}</p>
                                                                        <h3 style={{ width: "18ch" }} className='fw-bold my-1 text-normal'>{val.title}</h3>
                                                                        <div className='d-flex justify-content-between my-3'>
                                                                            <div>
                                                                                <span className='text-secondary text-sm' style={{ fontWeight: "100" }}><i className='fa-solid fa-globe'></i> Goal</span>
                                                                                <h5 className='m-0 fw-bold text-primary'>Rs. {val.goal}</h5>
                                                                            </div>
                                                                            <div>
                                                                                <span className='text-secondary text-sm' style={{ fontWeight: "100" }}><i className='fa-solid fa-people-group'></i> Raised</span>
                                                                                <h5 className='m-0 fw-bold text-primary'>Rs. {val.raised}</h5>
                                                                            </div>
                                                                            <div>
                                                                                <span className='text-secondary text-sm' style={{ fontWeight: "100" }}><i className='fa-solid fa-share'></i> To Go</span>
                                                                                <h5 className='m-0 fw-bold text-primary'>Rs. {val.goal - val.raised}</h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    })
                                                }
                                            </> :
                                            <>
                                                <div className='mx-auto d-flex align-items-center' style={{ height: "50ch" }}>
                                                    <p className=''>No Campaigns</p>
                                                </div>
                                            </>
                                    }
                                </> :
                                <>
                                    <div className='mx-auto d-flex align-items-center' style={{ height: "50ch" }}>
                                        <div className="spinner-border text-secondary" style={{ height: "5ch", width: "5ch", fontSize: "1.5rem" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </>
                        }
                        <div className='mx-auto'>
                            <Link to={''} className="btn btn-primary py-3">Explore Campaigns</Link>
                        </div>
                    </div>
                </div>

            </div>

            <div className='container-fluid bg-light p-0 py-5'>
                <div className='container mx-auto col-md-10 mt-5 row p-0'>
                    <div className='col-md-6'>
                        <img className='rounded' style={{ width: "100%", height: "100%", objectFit: "cover" }} src="assets/hands.jpg" alt="" />
                    </div>
                    <div className='col-md-6'>
                        <div className='d-flex align-items-center h-100'>
                            <div className=''>
                                <p className='text-primary'>Joins Us</p>
                                <p className='fw-bold m-0' style={{ fontSize: "3rem" }}>Become a volunteer to help us feeding people.</p>
                                <div className='my-5'>
                                    <Link to={''} className="btn btn-primary py-3 px-3">Apply Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home