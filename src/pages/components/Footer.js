import React from 'react'

const Footer = () => {
    return (
        <div className='py-4 mt-4' style={{ background: "#f1f1f1" }}>
            <div className='container mx-auto col-md-9'>
                <div className='row'>
                    <div className='col-md-3'>
                        <h6 className='fw-bold'>Website</h6>
                        <div className='mt-4'>
                            <p className='text-sm'>About</p>
                            <p className='text-sm'>Developers</p>
                            <p className='text-sm'>Contact Us</p>
                            <p className='text-sm'>Terms</p>
                            <p className='text-sm'>Conditions</p>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <h6 className='fw-bold'>Charities</h6>
                        <div className='mt-4'>
                            <p className='text-sm'></p>
                            <p className='text-sm'>Food</p>
                            <p className='text-sm'>Water</p>
                            <p className='text-sm'>Education</p>
                            <p className='text-sm'>Medicine</p>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <h6 className='fw-bold'>Findraising</h6>
                        <div className='mt-4'>
                            <p className='text-sm'>Raise Campaign</p>
                            <p className='text-sm'>Donate</p>
                            <p className='text-sm'>Gamify</p>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='d-flex'>
                            <p className='fs-1 mx-2'><i className='fa-brands fa-facebook-square'></i></p>
                            <p className='fs-1 mx-2'><i className='fa-brands fa-instagram'></i></p>
                            <p className='fs-1 mx-2'><i className='fa-brands fa-twitter'></i></p>
                        </div>
                    </div>

                    <div className='col-md-12 mt-4'>
                        <div className='d-flex'>
                            <p className='text-xs'>Terms & Conditions</p>
                            <p className='text-xs ms-4'>Privacy</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Footer