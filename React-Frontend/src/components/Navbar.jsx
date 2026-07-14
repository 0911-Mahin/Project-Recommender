import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

import reactLogo from './assets/react.svg'

import "./css/Navbar.css"

const navLinkBaseClass = "inline-flex items-center whitespace-nowrap rounded-sm px-3 py-2 transition-all duration-300 ease-out will-change-transform "
const AuthBaseClass = "flex item-center justify-center w-12/10 p-2 rounded-sm shadow-xl font-semibold "

function renderGuestLinks() {
    return (
        <ul className="grid grid-cols-2 gap-8 justify-end mr-8">
            <li>
                <NavLink to="/login" type="button"
                    className={({ isActive }) =>
                        AuthBaseClass + (isActive
                            ? 'bg-green-300 text-orange-900'
                            : 'bg-white hover:bg-green-300 hover:text-orange-900 active:bg-green-400')
                    }>Log in</NavLink>
            </li>
            <li>
                <NavLink to="/signup" type="button"
                    className={({ isActive }) =>
                        AuthBaseClass + (isActive
                            ? 'bg-green-300 text-orange-900'
                            : 'bg-white hover:bg-green-300 hover:text-orange-900 active:bg-green-400')
                    }>Sign Up</NavLink>
            </li>
        </ul>
    )
}

function renderUserLinks() {
    return (
        <ul className="flex flex-row gap-16 mr-8 justify-center items-center">
            <li>
                <NavLink to="/history">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clock-history stroke-cyan-500" viewBox="0 0 16 16">
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                </NavLink>
            </li>
            <li>
                <NavLink to="/bookmarks">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bookmark stroke-cyan-500" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                </NavLink>
            </li>
            <li>
                <NavLink to="logout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right stroke-cyan-500" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg>
                </NavLink>
            </li>
        </ul>
    )
}

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
        <nav className='bg-slate-500/60 backdrop-blur-sm w-full h-15 grid grid-cols-3'>

            <div className="flex items-center justify-start">
                <a className="navbar-brand w-fit block ml-8">
                    <img src={reactLogo} width="30" height="30" alt="" />
                </a>
            </div>
            <div className='flex items-center justify-center'>
                <ul className="flex flex-row gap-5 text-white items-center">
                    <li className="text-lg">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                navLinkBaseClass + (isActive
                                    ? 'scale-110 nav-link-underline nav-link-active'
                                    : 'hover:scale-110 nav-link-underline')
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="text-lg">
                        <NavLink
                            to="/recommend"
                            className={({ isActive }) =>
                                navLinkBaseClass + (isActive
                                    ? 'scale-110 nav-link-underline nav-link-active'
                                    : 'hover:scale-110 nav-link-underline')
                            }
                        >
                            Search
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex items-center justify-end'>
                {isLoggedIn ? renderUserLinks() : renderGuestLinks()}
            </div>
        </nav >
    )
}
