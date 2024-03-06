
import { Link, Outlet } from 'react-router-dom'
const StudentCommon = () => {
  return (
    <>
      <div>
      <Link to="ideation"></Link>
      <Link to="ideationrefrence"></Link>
       <Link to="research"></Link>
        <Link to="researchrefrence"></Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default StudentCommon
