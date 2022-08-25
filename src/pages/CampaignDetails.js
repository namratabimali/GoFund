import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import myKey from '../utils/khalti'
import { toast } from 'react-toastify'
import KhaltiCheckout from "khalti-checkout-web";



const CampaignDetails = () => {
    const [campaign, setCampaign] = useState()
    const id = useParams().id
    const [amount, setAmount] = useState()
    const [raised, setRaised] = useState()
    const [donaters, setDonaters] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/campaign-details/' + id).then((res) => {
            setCampaign(res.data)
            setRaised(res.data.raised)
        })
    }, [])
    useEffect(() => {
        axios.get('/donaters/' + id).then((res) => {
            console.log(res.data)
            setDonaters(res.data)
        })
    }, [])

    const checkout = () => {
        new KhaltiCheckout(config).show({ amount: 10000, mobile: 9866701165 })
    }

    const raise = () => {
        setRaised(campaign.raised + parseInt(amount))
    }


    let config = {
        publicKey: myKey.publicTestKey,
        productIdentity: id,
        productName: campaign?.title,
        productUrl: "http://localhost:3000/campaign-details/" + id,
        eventHandler: {
            onSuccess(payload) {
                console.log(payload);
                //  booking property 
                axios.post('/donate', {
                    campaign: id,
                    amount: amount
                }).then(res => {
                    if (res.data.success) {
                        toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                        var raised = campaign.raised + parseInt(amount)
                        raise()
                    } else {
                        toast.error(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            onError(error) {
                console.log(error);
            },
            onClose() {
                console.log("widget is closing");
            },
        },
        paymentPreference: [
            "KHALTI",
            "EBANKING",
            "MOBILE_BANKING",
            "CONNECT_IPS",
            "SCT",
        ],
    };

    return (
        <div>
            <Header />
            <div className='container mx-auto col-md-10 row p-0'>
                <div className='col-md-8 border bg-light p-0 pb-5'>
                    <img className='rounded' style={{ height: "50ch", width: "100%", objectFit: 'cover' }} src={`http://localhost:5000/${campaign?.image}`} alt="" />
                    <div className='mx-3 mt-5'>
                        <p className='text text-info'>{campaign?.category}</p>
                        <p className='fs-1'>{campaign?.title}</p>
                        <div className='mb-3'>
                            <p>{campaign?.description}</p>
                        </div>
                        <div className="progress ">
                            <div className="progress-bar " role="progressbar" style={{ width: `${raised ? raised / campaign?.goal * 100 : 0}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>

                        <div className='d-flex justify-content-between my-3 col-md-7'>
                            <div>
                                <span className='text-secondary text-sm' style={{ fontWeight: "100" }}><i className='fa-solid fa-globe'></i> Goal</span>
                                <h5 className='m-0 fw-bold text-primary'>Rs. {campaign?.goal}</h5>
                            </div>
                            <div>
                                <span className='text-secondary text-sm' style={{ fontWeight: "100" }}><i className='fa-solid fa-people-group'></i> Raised</span>
                                <h5 className='m-0 fw-bold text-success'>Rs. {raised}</h5>
                            </div>
                            <div>
                                <span className='text-secondary text-sm' style={{ fontWeight: "100" }}><i className='fa-solid fa-share'></i> To Go</span>
                                <h5 className='m-0 fw-bold text-primary'>Rs. {campaign?.goal - campaign?.raised}</h5>
                            </div>
                        </div>

                        <hr className='mt-5' />

                        <div className='d-flex'>
                            <div className='form-control rounded-pill p-3 w-25 d-flex me-3'>
                                <p className='my-auto'>Rs.</p>
                                <input onChange={(e) => setAmount(e.target.value)} type="number" className='' style={{ border: "none", background: "none", outline: "none" }} />
                            </div>
                            <button onClick={() => checkout()} className='btn btn-success rounded-pill py-3 px-3'>Donate Now</button>
                        </div>

                        <div className='mt-4'>
                            <p className='m-0 text-sm ms-2'>Payment Methods:</p>
                            <div className='d-flex py-3'>
                                <img className='me-2' style={{ height: "4ch" }} src="https://dao578ztqooau.cloudfront.net/static/img/logo1.png" alt="" />
                                <img className='me-2' style={{ height: "4ch" }} src="https://techlekh.com/wp-content/uploads/2017/06/esewa-logo.png" alt="" />
                            </div>
                        </div>

                        <hr />

                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='border bg-light py-3 px-3'>
                        <p className='text-secondary'>Recent Donors</p>
                        {
                            donaters ?
                                <>
                                    {
                                        donaters.map((val, ind) => {
                                            return (
                                                <div className='d-flex my-4'>
                                                    <div>
                                                        <div className='rounded-circle d-flex align-items-center justify-content-center' style={{ height: "5ch", width: "5ch", background: "#dbdbdb" }}>
                                                            <p className='text-center text-primary fw-bold my-auto'>{val?.user.firstName.charAt(0).toUpperCase()}{val?.user.lastName.charAt(0).toUpperCase()}</p>
                                                        </div>
                                                    </div>
                                                    <div className='mx-2'>
                                                        <p className='m-0'>{val.user.firstName} {val.user.lastName}</p>
                                                        <p className='m-0 text-primary text-sm'>Rs. {val.amount}<span className='text-info mx-2 px-2' style={{borderLeft: "2px solid #a6a6a6"}}><i className='fa-solid fa-calendar me-1'></i>{new Date(val.date).toDateString()}</span></p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </> :
                                <></>

                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CampaignDetails