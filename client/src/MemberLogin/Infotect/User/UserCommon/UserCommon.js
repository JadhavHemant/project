// import { useState } from "react";
// import { Link, Outlet } from 'react-router-dom';
// import logo from './Logo/logo.png';
// import { Bars3Icon, } from "@heroicons/react/24/outline";

// const UserCommon = () => {
//   const [toggleMenu, setToggleMenu] = useState(false);

//   return (
//     <>
//       <header className="sticky top-0">
//         <nav>
//           <div className="mx-auto max-w-7xl backdrop-blur-sm bg-white/30 text-[14px]">
//             <div className="flex justify-between mx-auto w-full">
//               <div className="flex items-center justify-between my-2 lg:justify-end gap-[40px]">
//                 <Link to="/">
//                   <img src={logo} alt="Logo" className="h-[40px] w-[180px]" />
//                 </Link>
//               </div>
//               <div className="flex gap-6">
//                 <div className="hidden lg:flex gap-10 items-center justify-between my-2">
//                   <Link to="">About Us</Link>
//                   <Link to="ideation">Ideation</Link>
//                   <Link to="research">Research</Link>
//                   <Link to="oppo">opportunity</Link>
//                   <Link to="applyed">Applicatons</Link>
//                   <Link to="refrence">Reference</Link>
//                   <Link to="memberviewscard">Member View</Link>
//                   <Link to="group">Groups</Link>
//                   <Link to="/">Log-Out</Link>
//                 </div>
//                 <div className="flex items-center lg:hidden">
//                   <button onClick={() => setToggleMenu(!toggleMenu)}>
//                     <Bars3Icon className="h-7 pr-[15px]"/>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={`fixed z-40 w-full backdrop-blur-sm overflow-hidden flex flex-col lg:hidden gap-12 ${toggleMenu ? "h-auto" : "h-0"}`}>
//             <div className="px-8 text-center">
//               <div className="flex flex-col gap-8 font-bold overflow-visible tracking-wider pt-4 pb-4">
//                 <Link to="">About Us</Link>
//                 <Link to="ideation">Ideation</Link>
//                 <Link to="research">Research</Link>
//                 <Link to="oppo">opportunity</Link>
//                 <Link to="applyed">Applicatons</Link>
//                 <Link to="refrence">Reference</Link>
//                 <Link to="memberviewscard">Member View</Link>
//                 <Link to="group">Groups</Link>
//                 <Link to="/">Log-Out</Link>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <hr className="border border-[#050505]" />
//         <div>
// <Link to="viewmember"></Link>
// <Link to="addmember"></Link>
// <Link to="updatemember"></Link>

// <Link to="membership"></Link>
// <Link to="viewmembership"></Link>
// <Link to="addmembership"></Link>
// <Link to="updatemembership"></Link>

// <Link to="oppo"></Link>
// <Link to="viewoppo"></Link>
// <Link to="addoppo"></Link>
// <Link to="updateoppo"></Link>

// <Link to="allo"></Link>
// <Link to="viewallo"></Link>
// <Link to="addallo"></Link>
// <Link to="updateallo"></Link>

// <Link to="inter"></Link>
// <Link to="viewinter"></Link>
// <Link to="addinter"></Link>
// <Link to="updateintern"></Link>
//         </div>
//       </header>

//       <Outlet />
//     </>
//   )
// }

// export default UserCommon;
import { useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import logo from './Logo/logo.png';
import { Bars3Icon } from "@heroicons/react/24/outline";

const UserCommon = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  // Function to handle toggling the menu
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  // Function to handle clicking on a link in the toggle menu
  const handleLinkClick = () => {
    // Close the menu
    setToggleMenu(false);
  };

  return (
    <>
      <header className="sticky top-0">
        <nav>
          <div className="mx-auto max-w-7xl backdrop-blur-sm bg-white/30 text-[14px]">
            <div className="flex justify-between mx-auto w-full">
              <div className="flex items-center justify-between my-2 lg:justify-end gap-[40px]">
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-[40px] w-[180px]" />
                </Link>
              </div>
              <div className="flex gap-6">
                <div className="hidden lg:flex gap-5 items-center justify-between my-2">
                  <Link to="" onClick={handleLinkClick}>About Us</Link>
                  <Link to="ideation" onClick={handleLinkClick}>Ideation</Link>
                  <Link to="research" onClick={handleLinkClick}>Research</Link>
                  <Link to="oppo" onClick={handleLinkClick}>Opportunity</Link>
                  <Link to="applyed" onClick={handleLinkClick}>Applications</Link>
                  <Link to="refrence" onClick={handleLinkClick}>Reference</Link>
                  <Link to="memberviewscard" onClick={handleLinkClick}>Member View</Link>
                  <Link to="group" onClick={handleLinkClick}>Groups</Link>
                  <Link to="network" onClick={handleLinkClick}>network</Link>
                  {/* <Link to="groupmarge" onClick={handleLinkClick}>Group join</Link> */}
                  {/* <Link to="joingroup" onClick={handleLinkClick}>marge group</Link> */}
                  <Link to="/" onClick={handleLinkClick}>Log-Out</Link>
                </div>
                <div className="flex items-center lg:hidden">
                  <button onClick={handleToggleMenu}>
                    <Bars3Icon className="h-7 pr-[15px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`fixed z-40 w-full backdrop-blur-sm overflow-hidden flex flex-col lg:hidden gap-12 ${toggleMenu ? "h-auto" : "h-0"}`}>
            <div className="px-8 text-center">
              <div className="flex flex-col gap-8 font-bold overflow-visible tracking-wider pt-4 pb-4">
                <Link to="" onClick={handleLinkClick}>About Us</Link>
                <Link to="ideation" onClick={handleLinkClick}>Ideation</Link>
                <Link to="research" onClick={handleLinkClick}>Research</Link>
                <Link to="oppo" onClick={handleLinkClick}>Opportunity</Link>
                <Link to="applyed" onClick={handleLinkClick}>Applications</Link>
                <Link to="refrence" onClick={handleLinkClick}>Reference</Link>
                <Link to="memberviewscard" onClick={handleLinkClick}>Member View</Link>
                <Link to="group" onClick={handleLinkClick}>Groups</Link>
                {/* <Link to="groupmarge" onClick={handleLinkClick}>Group join</Link> */}
                <Link to="joingroup" onClick={handleLinkClick}>marge group</Link>
                <Link to="network" onClick={handleLinkClick}>network</Link>
                <Link to="/" onClick={handleLinkClick}>Log-Out</Link>
              </div>
            </div>
          </div>
        </nav>
        <hr className="border border-[gray]" />
        <div>
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
        </div>
      </header>

      <Outlet />
    </>
  )
}

export default UserCommon;
