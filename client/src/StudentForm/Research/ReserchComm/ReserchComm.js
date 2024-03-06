import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../ReserchComm/Main.css';

const ReserchComm = () => {
  return (
    <>
      <div className='borderone'>
        <Link to='/resarch'></Link>
        <Link to='/resarch/reference'></Link>
        <Link to='/resarch/researchtable'></Link>
        <Link to='/resarch/researchadd'></Link>
        <Link to='/resarch/researchview'></Link>
        <Link to='/resarch/researchedit'></Link>
        <Link to='/resarch/reftable'></Link>
        <Link to='/resarch/addref'></Link>
        <Link to='/resarch/refedit'></Link>
        <Link to='/resarch/refview'></Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default ReserchComm;
