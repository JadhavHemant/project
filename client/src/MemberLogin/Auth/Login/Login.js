import React, { useRef } from 'react'
import login from './loginimg.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const txtuser = useRef()
  const txtpassword = useRef()

  const LoginMember = (e) => {
    var u = txtuser.current.value;
    var p = txtpassword.current.value;

    if (!u) {
      alert("Please enter Email")
    }
    else if (!p) {
      alert("Password")
    }
    else if (u === "hemant" && p === "hemant") {
      navigate("/admin/")
    }
    else {
      e.preventDefault();
      const student = {
        member_email: txtuser.current.value,
        member_password: txtpassword.current.value,
      };

      axios({
        url: 'http://localhost:3001/api/login',
        method: 'POST',
        data: student,
        contentType: "application/json"
      })
        .then((res) => {
          localStorage.setItem("user_id", res.data.id);
          navigate("/user")
          console.log(res.data);
        })
        .catch((error) => {
          // console.error(error);
          alert(`Check your Membership plan or your credentials`);
        });
    };
  }

  const Reg = () => {
    navigate("/register");
  }
  return (
    <>
      <div className="grid w-full h-screen grid-cols-1 sm:grid-cols-2">
        <div className='hidden sm:block'>
          <img className='object-cover w-full h-full' src={login} alt='hello' />
        </div>
        <div className='bg-[white] flex flex-col justify-center'>
          <form className='max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg'>
            <h2 className='text-4xl dark:text-[white] font-bold text-center py-[40px]'>WELCOME BACK</h2>
            <div className='flex flex-col py-2 text-black'>
              <input className='p-2 mt-2 text-black focus:border-blue-500 bg-[#fffefe] focus:outline-[black]' type='email' placeholder='Email' ref={txtuser} />
            </div>
            <div className='flex flex-col py-2 text-black'>
              <input className='p-2 mt-2 text-black focus:border-blue-500 bg-[#fffefe] focus:outline-[black]' type='password' placeholder='Password' ref={txtpassword} />
            </div>
            <button className="w-full py-2 my-5 font-semibold text-white bg-[red] rounded-md shadow-md hover:bg-[#fa7575] focus:outline-none focus:ring focus:border-teal-700" onClick={LoginMember}>Login</button>
            <div >
              <div className='font-bold text-center'>
                <h2 className='text-[#D62102]'>Or Login with</h2>
              </div>
              <div class="md:w-2/1 pl-[55px] font-Manrope font-semibold pt-[30px]  p-4">
                <span><div className='inline text-[gray]'>Not a Member yet? </div><div className='text-[#D62102] inline'>
                  <button onClick={() => Reg()}>Sign Up</button> </div></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
