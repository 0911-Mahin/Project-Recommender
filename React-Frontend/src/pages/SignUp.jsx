import { motion } from 'motion/react'
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import './css/Common.css'

const baseInputStyle = "p-2 rounded-xs outline valid:outline-green-400 valid:text-cyan-800 focus:outline-sky-500 focus:invalid:border-pink-500"

export default function SignUp({ toastVersion, setToastVersion, toastContent, setToastContent }) {
    const [touched, setTouched] = useState({
        email: false,
        username: false,
        password: false,
        confpass: false
    })
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setToastContent({
                message: "You are already signed in.",
                type: "Info",
                fromPage: "Login",
            })
            navigate("/recommend")
        }
    }, [navigate])

    async function handleSubmit(e) {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")
        const confirm_password = formData.get("confirm_password")
        const confirmPasswordInput = form.querySelector('#confirm_password')

        if (confirmPasswordInput) {
            confirmPasswordInput.setCustomValidity(password === confirm_password ? "" : "Passwords do not match")
        }

        if (!form.checkValidity()) {
            setTouched({ email: true, username: true, password: true, confpass: true })
            return
        }

        const res = await fetch("http://localhost:8000/account/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        }).catch(() => { });

        let message = "Something went wrong. Please try again later.";
        let type = 'error';
        if (res && res.status === 201) {
            const res_json = await res.json();
            setToastContent({ message: res_json.message + " Login to get started", type: "success", fromPage: "SignUp" })
            navigate("/login");
            return;
        } else if (res && (res.status === 422 || res.status === 400)) {
            const err = await res.json()
            message = err.error
            type = 'info'
        }

        setToastContent({
            message,
            type,
            fromPage: "SignUp",
        })
        setToastVersion((prev) => prev + 1)

        return
    }

    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="page-layout flex justify-start"
        >
            <form onSubmit={handleSubmit} noValidate autoComplete='on' className='gap-4 bg-white m-3 p-10 rounded-sm flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-semibold pb-9'>Sign-Up</h1>
                <div className='grid grid-cols-3 gap-4 w-full'>
                    <span className='text-lg mt-1'>Email:</span>
                    <div className='flex flex-col col-span-2'>
                        <input type="email"
                            name='email'
                            placeholder='sample_1798@dom.ain'
                            className={`${baseInputStyle} peer/email ${touched.email ? 'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:outline-pink-500' : ''}`}
                            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                            onChange={() => setTouched(prev => ({ ...prev, email: true }))}
                            required />
                        <p className={`text-pink-600 invisible ${touched.email ? 'peer-invalid/email:visible' : ''}`}>Please enter a valid email address.</p>
                    </div>
                    <span className='text-lg mt-1'>Username:</span>
                    <div className='flex flex-col col-span-2'>
                        <input type="text"
                            name='username'
                            placeholder='sample_1798'
                            className={`${baseInputStyle} peer/username ${touched.username ? 'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:outline-pink-500' : ''}`}
                            onBlur={() => setTouched(prev => ({ ...prev, username: true }))}
                            onChange={() => setTouched(prev => ({ ...prev, username: true }))}
                            required />
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
                    <span className='text-lg mt-1'>Confirm Password:</span>
                    <div className='flex flex-col col-span-2'>
                        <input type="password"
                            id='confirm_password'
                            name='confirm_password'
                            placeholder='********'
                            className={`${baseInputStyle} peer/confpass ${touched.confpass ? 'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:outline-pink-500' : ''}`}
                            required
                            onBlur={() => setTouched(prev => ({ ...prev, confpass: true }))}
                            onChange={() => setTouched(prev => ({ ...prev, confpass: true }))} />
                        <p className={`text-pink-600 invisible ${touched.confpass ? 'peer-invalid/confpass:visible' : ''}`}>Passwords must match.</p>
                    </div>
                </div>
                <button type="submit" className="text-white bg-indigo-500 rounded-sm p-3 hover:bg-indigo-600 active:bg-indigo-700 w-full">Sign-Up</button>
                <p>Already have an account? <Link to="/signup" className="text-blue-800 hover:underline">Login</Link></p>
            </form>
        </motion.div>
    )
}
