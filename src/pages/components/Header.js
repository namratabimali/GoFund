import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { loggedData } from '../../redux/actions/user'
import $ from 'jquery'

const Header = (props) => {

    useEffect(() => {
        $(`.${props.tab}`).addClass('active-n')
    }, [])

    const [user] = useContext(UserContext)
    // console.log(user)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(loggedData())
    //     console.log(logged.user.username)
    // }, [dispatch])


    const logout = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    return (
        <div className='container-fluid'>
            <div className='col-md-10 mx-auto'>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className='navbar-brand' to="/"><img src="/assets/logo.png" style={{ height: "6ch", width: "6ch" }} alt="logo" /></Link>
                    <div className="container mx-auto">
                        <div>
                            <div className='search-box p-2 px-3'>
                                <i className='fa-solid fa-search text-secondary'></i>
                                <input className='search ms-2' type="text" style={{ border: "none", outline: "none", background: "transparent" }} placeholder="Search" />
                            </div>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <div className='d-flex ms-2'>
                                <div className='mx-2'>
                                    <Link className='text-secondary home' style={{ textDecoration: "none" }} to={'/'}>Home</Link>
                                </div>
                                <div className='mx-2'>
                                    <Link className='text-secondary campaigns' style={{ textDecoration: "none" }} to={'/campaigns'}>Campaigns</Link>
                                </div>
                                <div className='mx-2'>
                                    <Link className='text-secondary about' style={{ textDecoration: "none" }} to={''}>About</Link>
                                </div>
                                <div className='mx-2'>
                                    <Link className='text-secondary contact' style={{ textDecoration: "none" }} to={''}>Contact</Link>
                                </div>
                            </div>

                            {
                                user ?
                                    <div className='d-flex ms-auto'>
                                        {/* <div className='mx-2 my-auto'>
                                            <Link className='text-secondary my-games' style={{ textDecoration: "none" }} to={'/my-games'}>My Campaigns</Link>
                                        </div> */}
                                        <div className='mx-2 my-auto'>
                                            <Link className='btn btn-primary text-light my-store' style={{ textDecoration: "none" }} to={'/add-campaign'}> <i className='fa-solid fa-plus'></i> Create Campaign</Link>
                                        </div>
                                        <div className='mx-2'>
                                            <Link className='text-secondary' style={{ textDecoration: "none" }} to={'/my-campaigns'}>
                                                <div className='rounded-circle d-flex align-items-center justify-content-center' style={{ height: "4ch", width: "4ch", background: "#dbdbdb" }}>
                                                    <p className='text-center text-primary fw-bold my-auto'>{user?.user?.firstName.charAt(0).toUpperCase()}{user?.user?.lastName.charAt(0).toUpperCase()}</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className='mx-2 my-auto'>
                                            <button className='btn p-0 text-secondary' onClick={logout} style={{ textDecoration: "none" }}><i className='fa-solid fa-sign-out'></i></button>
                                        </div>
                                    </div> :
                                    <>
                                        <div className='d-flex ms-auto'>
                                            <div className='mx-2 my-auto'>
                                                <Link className='text-secondary' style={{ textDecoration: "none" }} to={'/login'}><i className='fa-solid fa-sign-in'></i></Link>
                                            </div>
                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header