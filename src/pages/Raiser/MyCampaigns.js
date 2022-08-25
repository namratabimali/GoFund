import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../redux/actions/Store';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { UserContext } from '../../context/UserContext';

const MyCampaigns = () => {

  const [loading, setLoading] = useState(true)
  const [campaigns, setCampaigns] = useState([])

  const [user] = useContext(UserContext)

  useEffect(() => {
    axios.get('/my-campaigns').then((res) => {
      console.log(res.data)
      setCampaigns(res.data)
      setLoading(false)
    })
  }, [])



  return (
    <div>
      <Header tab='my-store' />
      <div className='container mx-auto col-md-10'>

        <div className='d-flex'>
          <div>
            <div className='rounded-circle d-flex align-items-center justify-content-center mx-auto' style={{ height: "8ch", width: "8ch", background: "#dbdbdb" }}>
              <p className='text-center text-primary fw-bold my-auto'>{user?.user?.firstName.charAt(0).toUpperCase()}{user?.user?.lastName.charAt(0).toUpperCase()}</p>
            </div>
            <p className='m-0 mt-3'>{user?.user.firstName} <span className='text-primary'>{user?.user.lastName}</span></p>

          </div>
        </div>

        <hr />

        <div>
          <p className='fs-2'>My Campaigns</p>
          <div className='my-2'>
            <Link to={"/add-campaign"} className='btn shadow ms-auto rounded-circle d-flex align-items-center jsutify-content-center bg-primary' style={{ height: "4ch", width: "4ch" }}>
              <p className='m-0 my-auto fw-bold text-center mx-auto fs-6 text-light'><i className='fa-solid fa-plus'></i></p>
            </Link>
          </div>
        </div>
        <div>
          <div className='d-flex flex-wrap justify-content-start'>
            {
              !loading ?
                <>
                  {
                    campaigns.length > 0 ?
                      <>
                        {
                          campaigns.map((val, ind) => {
                            return (
                              <Link to={`/game-details/${val._id}`} style={{ textDecoration: "none", color: "#3f3f3f" }}>
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
                          <p className=''>You have not added any campaigns yet.</p>
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MyCampaigns