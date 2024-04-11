import React, { useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../image/logo.png';
const AddgroupMember = () => {
  const navigate = useNavigate();
  const group_id = useRef();
  // const memberid = useRef();
  const membername = useRef();
  const email = useRef();
  const phone = useRef();
  const transactionvalue = useRef();
  useEffect(() => {
    GetData();
  }, [])


const [group,setGroup]=useState([]);
  const GetData = () => {
    axios({
      url: `http://localhost:3001/api/groups`,
      method: 'GET',
      contentType: 'application/json'
    }).then((res) => {
      setGroup(res.data);
    }).catch((err) => {
      alert(err.message);
    })
  }




  const Addidea = () => {
    if (
      !group_id.current.value ||
      !membername.current.value ||
      !email.current.value ||
      !phone.current.value ||
      !transactionvalue.current.value
    ) {
      alert("Please fill in all the required fields and select a file.");
      return;
    }
    const memberid = localStorage.getItem("user_id");

    const ide = { group_id: group_id.current.value, membername: membername.current.value, email: email.current.value, phone: phone.current.value, transactionvalue: transactionvalue.current.value, memberid: memberid };
    console.log(ide)
    axios({
      url: "http://localhost:3001/api/group_member",
      method: "post",
      data: ide,
      contentType: "application/json",
    }).then((res) => {
      alert("Form submit successfully");
    }).catch((err) => {
      alert("Check details");
    });
  };


  const Refernce = () => {
    navigate("/student/ideationrefrence")
  }
  return (
    <>
      <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
            <img src={logo} alt='logo' class="w-[150px]" />
            <p class="text-gray-500 mb-6">Member Group Form.</p>
            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div class="text-gray-600">
                  <p class="font-medium text-lg">Member Group Form</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <div class="lg:col-span-2">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Member Group :
                      </label>
                      <select ref={group_id} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6">
                        <option>Select Group</option>
                        {
                          group.map((d, k) => (
                            <option value={d.id}>{d.groupname}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">membername</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={membername} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">email</label>
                      <input type="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={email} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">phone </label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={phone} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">transaction value</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={transactionvalue} />
                    </div>
                    <br />
                    <div class="md:col-span-5 text-right ">
                      <div class="inline-flex items-end gap-x-3">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => Addidea()}>Submit</button>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default AddgroupMember
