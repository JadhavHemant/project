import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const AuthComm = () => {
    return (
        <>
            <div>
                <Link to=""></Link>
                <Link to="register" ></Link>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default AuthComm
