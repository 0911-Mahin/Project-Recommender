import { motion } from 'motion/react'
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import './css/Common.css'
import { getToken, registerAccount } from '../assets/api'

const baseInputStyle = "p-2 outline valid:outline-green-400 valid:text-cyan-800 focus:outline-sky-500 focus:invalid:border-pink-500"

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

        let [message, type] = await registerAccount(email, username, password)

        if (type === 'info') {
            const [login_message, login_type, tokens] = await getToken(username, password)
            if (type === 'info') {
                localStorage.clear();
                localStorage.setItem("token", tokens.access);
                localStorage.setItem("refresh", tokens.refresh);
                localStorage.setItem("timestamp", Date.now());
                window.dispatchEvent(new Event("authchange"));
                navigate("/recommend");
            } else {
                message = "Something went wrong. Please try again later."
                type = 'error'
            }
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="page-layout flex justify-center items-center bg-linear-320 from-cyan-50 to-pink-50"
        >
            <form onSubmit={handleSubmit} noValidate autoComplete='on' className='gap-4 bg-white p-10 mt-0 pt-4 flex flex-col justify-center items-center h-fit border-2 border-pink-900 shadow-2xl'>
                <p className="pb-2 invisible h-0">Log in to see your saved projects and matches.</p>
                <h1 className='text-4xl font-semibold pb-2'>Sign-Up</h1>
                <div className='flex flex-col gap-1 w-full'>
                    <span className='text-lg mt-1'>Email:</span>
                    <div className='flex flex-col'>
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
                    <div className='flex flex-col'>
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
                    <div className='flex flex-col'>
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
                    <div className='flex flex-col'>
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
                <button type="submit" className="text-white bg-pink-900 hover:bg-pink-800 active:bg-pink-700 p-3 w-1/2 font-semibold">Sign - Up</button>
                <p>Already have an account? <Link to="/signup" className="text-blue-400 hover:underline">Login</Link></p>
            </form>
        </motion.div>
    )
}
