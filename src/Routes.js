import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import CampaignDetails from './pages/CampaignDetails';
import Campaigns from './pages/Discover/Campaigns';
import Home from './pages/Discover/Home';
import AddCampaign from './pages/Raiser/AddCampaign';
import MyCampaigns from './pages/Raiser/MyCampaigns';

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route exact path={'/'} element={<Home />}></Route>
                    <Route exact path={'/login'} element={<Login />}></Route>
                    <Route exact path={'/register'} element={<Register />}></Route>

                    <Route exact path={'/add-campaign'} element={<AddCampaign />}></Route>
                    <Route exact path={'/my-campaigns'} element={<MyCampaigns />}></Route>

                    {/* Campaigns */}
                    <Route exact path={'/campaign-details/:id'} element={<CampaignDetails />}></Route>
                    <Route exact path={'/campaigns'} element={<Campaigns />}></Route>


                </Routes>
            </UserProvider>
        </BrowserRouter>
    )
}

export default PageRoutes