import { NavLink } from 'react-router-dom'

const AuthBaseClass = "flex item-center justify-center p-2 rounded-sm font-semibold mr-5 ml-5"

export default function GuestLinks() {
    return (
        <>
            <NavLink to="/login" type="button"
                className={AuthBaseClass}>Log in</NavLink>
            <p>/</p> 
            <NavLink to="/signup" type="button"
                className={AuthBaseClass}>Sign Up</NavLink>
        </>
    )
}
