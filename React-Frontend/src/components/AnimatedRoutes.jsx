import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react'

import Home from '../pages/Home'
import Recommend from '../pages/Recommend'
import History from '../pages/History'
import Bookmarks from '../pages/Bookmarks'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Logout from '../pages/Logout'

import './css/AnimatedRoutes.css'
import { useEffect } from 'react';

export default function AnimatedRoutes({ expired, ...toastData }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (expired) {
            toastData.setToastContent({ message: "Session Timeout.\nPlease Login again", type: "info", fromPage: "Timeout" })
            navigate('/login')
        }
    }, [expired])

    return (
        <AnimatePresence initial={false}>
            <Routes location={location} key={location.pathname} className="route-wrapper">
                <Route className="page" path="/" element={<Home {...toastData} />} />
                <Route className="page" path="/recommend" element={<Recommend {...toastData} />} />
                <Route className="page" path="/history" element={<History {...toastData} />} />
                <Route className="page" path="/bookmarks" element={<Bookmarks {...toastData} />} />

                <Route className="page" path="/login" element={<Login {...toastData} />} />
                <Route className="page" path="/signup" element={<SignUp {...toastData} />} />
                <Route className="page" path="/logout" element={<Logout {...toastData} />} />
            </Routes>
        </AnimatePresence>
    )
}
