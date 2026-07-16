import { motion } from 'motion/react'
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import MessageToast from "../components/MessageToast"

import './css/Common.css'

const baseInputStyle = "p-2 rounded-xs outline valid:outline-green-400 valid:text-cyan-800 focus:outline-sky-500 focus:invalid:border-pink-500"

export default function Login({ toastVersion, setToastVersion, toastContent, setToastContent }) {
    const [touched, setTouched] = useState({
        username: false,
        password: false,
    })

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setToastContent({
                message: "You are already signed in.",
                type: "info",
                fromPage: "Login",
            })
            navigate("/recommend")
        }
    }, [navigate])

    async function handleSubmit(e) {
        e.preventDefault()

        const form = e.target
        if (!form.checkValidity()) {
            setTouched({ username: true, password: true })
            return
        }

        const formData = new FormData(form)
        const username = formData.get("username")
        const password = formData.get("password")

        const res = await fetch("http://localhost:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).catch(() => { });

        let message = "Something went wrong. Please try again later.";
        let type = 'error'
        if (res && res.status === 200) {
            const tokens = await res.json();
            localStorage.clear()
            localStorage.setItem("token", tokens.access)
            localStorage.setItem("refresh", tokens.refresh)
            localStorage.setItem("timestamp", JSON.stringify(Date.now()))
            window.dispatchEvent(new Event("authchange"))
            setToastContent({ message: "Login successful!", type: "success", fromPage: "Login" })
            navigate("/recommend");
            return;
        } else if (res && res.status === 401) {
            const err = await res.json()
            message = err.detail
            type = 'info'
        }

        setToastContent({
            message,
            type,
            fromPage: "Login",
        });
        setToastVersion((prev) => prev + 1)

        return
    }

    return (
        <>
            <MessageToast {...toastContent} toastVersion={toastVersion} />
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="page-layout flex justify-end"
            >
                <form onSubmit={handleSubmit} autoComplete='on' noValidate className='gap-4 bg-white m-3 p-10 rounded-sm flex flex-col justify-center items-center'>
                    <h1 className='text-4xl font-semibold pb-9'>Login</h1>
                    <div className='grid grid-cols-3 gap-4 w-full'>
                        <span className='text-lg mt-1'>Username:</span>
                        <div className='flex flex-col col-span-2'>
                            <input type="text"
                                name='username'
                                placeholder='sample_1798'
                                className={`${baseInputStyle} peer/username ${touched.username ? 'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:outline-pink-500' : ''}`}
                                required
                                onBlur={() => setTouched(prev => ({ ...prev, username: true }))}
                                onChange={() => setTouched(prev => ({ ...prev, username: true }))} />
                            <p className={`text-pink-600 invisible ${touched.username ? 'peer-invalid/username:visible' : ''}`}>Please enter a username.</p>
                        </div>
                        <span className='text-lg mt-1'>Password:</span>
                        <div className='flex flex-col col-span-2'>
                            <input type="password"
                                name='password'
                                placeholder='********'
                                className={`${baseInputStyle} peer/password ${touched.password ? 'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:outline-pink-500' : ''}`}
                                required
                                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                                onChange={() => setTouched(prev => ({ ...prev, password: true }))} />
                            <p className={`text-pink-600 invisible ${touched.password ? 'peer-invalid/password:visible' : ''}`}>Please enter a password.</p>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-indigo-500 rounded-sm p-3 hover:bg-indigo-600 active:bg-indigo-700 w-full">Sign-In</button>
                    <p>Don't have an account? <Link to="/signup" className="text-blue-800 hover:underline">Register</Link></p>
                </form>
            </motion.div>
        </>
    )
}
