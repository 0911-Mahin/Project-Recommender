import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react'
import { useEffect } from 'react';

import Home from '../pages/Home'
import Recommend from '../pages/Recommend'
import History from '../pages/History'
import Bookmarks from '../pages/Bookmarks'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Logout from '../pages/Logout'

export default function AnimatedRoutes({ expired, ...toastData }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (expired) {
            toastData.setToastContent({ message: "Session Timeout.\nPlease Login again", type: "error", fromPage: "Timeout" })
            navigate('/login')
        }
    }, [expired])

    return (
        <AnimatePresence initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home {...toastData} />} />
                <Route path="/recommend" element={<Recommend {...toastData} />} />
                <Route path="/history" element={<History {...toastData} />} />
                <Route path="/bookmarks" element={<Bookmarks {...toastData} />} />

                <Route path="/login" element={<Login {...toastData} />} />
                <Route path="/signup" element={<SignUp {...toastData} />} />
                <Route path="/logout" element={<Logout {...toastData} />} />
            </Routes>
        </AnimatePresence>
    )
}
