import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

import './css/Common.css'

export default function Logout({ toastVersion, setToastVersion, toastContent, setToastContent }) {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.clear()
        window.dispatchEvent(new Event('authchange'))
        setToastContent({ message: "Log Out Successful!", type: 'info', fromPage: "Logout" })
        navigate("/");
    }, [navigate])

    return (<></>)
}
