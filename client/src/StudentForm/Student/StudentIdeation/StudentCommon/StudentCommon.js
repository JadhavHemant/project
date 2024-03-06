import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const StudentCommon = () => {
  return (
    <div>
      <div className='borderone'>
        <Link to='/student'></Link>
        <Link to='/student/tablestudent'></Link>
        <Link to='/student/studentidea'></Link>
        <Link to='/student/studentedit'></Link>
        <Link to='/student/studentview'></Link>
        {/*  */}
        <Link to='/student/refe'></Link>
        <Link to='/student/stableref'></Link>
        <Link to='/student/sviewref'></Link>
        <Link to='/student/seditref'></Link>
        <Link to='/student/addrefs'></Link>
         {/*  */}
        
      </div>
      <Outlet />
    </div>
  );
}

export default StudentCommon;
