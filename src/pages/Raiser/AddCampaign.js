import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import './add.css';
import $ from 'jquery'
import { toast } from 'react-toastify'
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Addgame = () => {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState()
    const [goal, setGoal] = useState("Steam")
    const [category, setCategory] = useState("Food")
    const [description, setDescription] = useState("")

    const navigate = useNavigate()

    const formats = ['image', 'bold']

    const handleSubmit = async () => {

        let fd = new FormData()
        fd.append('image', image)
        fd.append('title', title)
        fd.append('goal', goal)
        fd.append('category', category)
        fd.append('description', description)

        const res = await axios.post('/add-campaign', fd)
        if (res.data.success) {
            navigate('/my-campaigns')
        } else {
            toast.error(res.data.message, { position: toast.POSITION.TOP_RIGHT })
        }
    }

    return (
        <div className='' style={{ height: '100vh' }}>
            <Header />
            <div className="form rounded col-md-6 p-5 mx-auto my-5">
                <h6 className='mt-4 fw-bold'>Create Your Campaign</h6>
                <form action="">
                    <div className='form-group my-3' style={{ position: "relative" }}>
                        <label htmlFor="" className='text-sm'>Title</label>
                        <input onChange={(e) => setTitle(e.target.value)} className='form-control py-3 px-3' type="text" placeholder='Campaign Title' />
                    </div>
                    <div className='row'>
                        <div className='form-group col-md-6'>
                            <label htmlFor="" className='text-sm'>Budget Goal</label>
                            <input type="text" onChange={(e) => setGoal(e.target.value)} className='form-control py-3 px-3' placeholder='Set Budget Goal' />
                            <small id={`err`} className='text-danger mx-2'></small>
                        </div>
                        <div className='form-group col-md-6'>
                            <label htmlFor="" className='text-sm'>Category</label>
                            <select className='form-select py-3 px-3' onChange={(e) => setCategory(e.target.value)}>
                                <option disabled>Category</option>
                                <option defaultValue="Food">Food</option>
                                <option defaultValue="Water">Water</option>
                                <option defaultValue="Education">Education</option>
                                <option defaultValue="Medicak">Medical</option>
                            </select>
                            <small id={`err`} className='text-danger mx-2'></small>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="" className='text-sm'>Image</label>
                        <div className='form-control p-3'>
                            <input id="image" onChange={(e)=>setImage(e.target.files[0])} type="file" accept='image/*' />
                        </div>
                        <small id={`err`} className='text-danger mx-2'></small>
                    </div>
                    <div>
                        <label htmlFor="" className='text-sm'>Description</label>
                        <textarea className='form-control' name="" placeholder='Explain your campaign here...' id="" rows="6"></textarea>
                    </div>
                    <div className='my-4'>
                        <button type='button' onClick={handleSubmit} className='btn btn-primary py-3 w-100'>Done</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Addgame