import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const EcosComm = () => {
    return (
        <>
            <div>
                <Link to='/ecosystem'></Link>
                <Link to='/ecosystem/table'></Link>
                <Link to='/ecosystem/add'></Link>
                <Link to='/ecosystem/edit'></Link>
                <Link to='/ecosystem/view'></Link>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default EcosComm
