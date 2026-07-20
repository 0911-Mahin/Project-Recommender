import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';

import GuestLinks from './GuestLinks'
import UserLinks from './UserLinks'

import Logo from './assets/Logo.svg'

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')))

    useEffect(() => {
        const updateAuthState = () => setIsLoggedIn(Boolean(localStorage.getItem('token')))

        updateAuthState()
        window.addEventListener('authchange', updateAuthState)

        return () => {
            window.removeEventListener('authchange', updateAuthState)
        }
    }, [])

    return (
        <nav className='bg-pink-950 border-b-2 w-full h-15 grid grid-cols-2 shadow-lg border-blue-500 text-white'>

            <div className="flex items-center justify-start">
                <Link to="/" className="w-fit block ml-8 rounded-sm flex flex-row items-center">
                    <div className="mr-2 bg-blue-400 p-1 rounded-sm">
                        <img src={Logo} width="20" height="20" alt="" />
                    </div>
                    <code>project_match</code>
                </Link>
            </div>
            <div className='flex items-center justify-end'>
                <Link
                    to="/recommend"
                    className="mr-3 pr-3"
                >
                    Recommend
                </Link>
                <p>/</p>
                {isLoggedIn ? <UserLinks /> : <GuestLinks />}
            </div>
        </nav >
    )
}
