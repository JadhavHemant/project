import { useState } from "react";
import { Bars3Icon, } from "@heroicons/react/24/outline";
import { Link, Outlet } from 'react-router-dom'
import logo from './logo.png'
const AdminCommon = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <>
      <div className="sticky top-0 bg-[#FFFFFF]">
        <nav>
          <div className="mx-auto max-w-7xl ">
            <div className="flex justify-between mx-auto w-5/5 ">
              <div className="flex items-center justify-between my-2 lg:justify-end lg:gap-[100px]">
                <Link to=""> <img src={logo} alt="" className="h-[40px] w-[100px]" /></Link>
                <div className="hidden gap-10 lg:flex">
                  <Link to="">Members</Link>
                  <Link to="studenttable">Ideation</Link>
                  <Link to="resarchtable">Research</Link>
                  <Link to="membership">Membership</Link>
                  <Link to="intoppo">Eol</Link>
                  <Link to="oppo">Opportunity</Link>
                  <Link to="allo">Allocation</Link>
                  <Link to="inter">Interview</Link>
                  <Link to="/">Log-Out</Link>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="items-center hidden gap-10 xs:flex">
                  <div className="items-center hidden gap-2 lg:flex">
                  </div>
                  <div>
                  </div>
                </div>
                <div className="flex items-center lg:hidden">
                  <button onClick={() => setToggleMenu(!toggleMenu)}>
                    <Bars3Icon className="h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${!toggleMenu ? "h-0" : "h-full"
              }`}>
            <div className="px-8">
              <div className="flex flex-col gap-8 font-bold tracking-wider">
                <Link to="">Members</Link>
                <Link to="studenttable">Ideation</Link>
                <Link to="resarchtable">Research</Link>
                <Link to="membership">Membership</Link>
                <Link to="intoppo">Eol</Link>
                <Link to="oppo">Opportunity</Link>
                <Link to="allo">Opportunity Allocation</Link>
                <Link to="inter">Interview</Link>
                <Link to="">Log Out</Link>
              </div>
            </div>
          </div>
        </nav>
        <hr className="border border-[#9b9b9b]" />
      </div>

      <div>
        <Link to="membertable"></Link>
        <Link to="viewmember"></Link>
        <Link to="addmember"></Link>
        <Link to="updatemember"></Link>

        <Link to="membership"></Link>
        <Link to="viewmembership"></Link>
        <Link to="addmembership"></Link>
        <Link to="updatemembership"></Link>

        <Link to="oppo"></Link>
        <Link to="viewoppo"></Link>
        <Link to="addoppo"></Link>
        <Link to="updateoppo"></Link>

        <Link to="allo"></Link>
        <Link to="viewallo"></Link>
        <Link to="addallo"></Link>
        <Link to="updateallo"></Link>

        <Link to="inter"></Link>
        <Link to="viewinter"></Link>
        <Link to="addinter"></Link>
        <Link to="updateintern"></Link>


        <Link to="studenttable"></Link>
        <Link to="studentviewinfo"></Link>
        <Link to="studentupdateinfo"></Link>
        <Link to="studentideation"></Link>

        <Link to="refrence"></Link>
        <Link to="refrencetable"></Link>
        <Link to="refrenceview"></Link>
        <Link to="refrenceedit"></Link>

        <Link to="resarchtable"></Link>
        <Link to="addresearch"></Link>
        <Link to="researchupdateinfo"></Link>
        <Link to="refrenceaddresearch"></Link>

        <Link to="refrenceaddtableresearch"></Link>
        <Link to="refrenceaddviewresearch"></Link>
        <Link to="refrenceaddupdateresarch"></Link>


        <Link to="resourcemaster"></Link>

      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default AdminCommon
