import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const IntrestOppor = () => {
    const navigate = useNavigate();
useEffect(() =>{
    getData();
},[])

const[data,setData]=useState([]);
    const getData = () =>{
        axios({
            url: 'http://localhost:3001/api/interestedpeople',
            method: 'GET',

        }).then((res)=>{
            setData(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    const deleteData=(id)=>{
        axios({
            url: `http://localhost:3001/api/delete/interested/${id}`,
            method: 'DELETE',
        }).then((res)=>{
            alert("done");
            getData();
        }).catch((err)=>{
            alert("failure");
        })
    }

const ViewMember=(id)=>{
    localStorage.setItem("member_id", id);
    navigate("/admin/viewmember")
}

  return (
   <>
    <div class="max-w-5xl mx-auto pt-[30px] ">
                <div class="flex flex-col">
                    <div class="overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden ">
                                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead class="bg-[#7f7ff5] dark:bg-[#8b8bf7]">
                                        <tr>
                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                            Member Id
                                            </th>
                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                Member Name
                                            </th>
                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                Phone Number
                                            </th>
                                        
                                            {/* <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                Email
                                            </th> */}
                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                Opportunity
                                            </th>
                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">

                                        {
                                            data.map((d, k) => (
                                                <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.interest_id}</td>
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.interested_name}</td>
                                                    {/* <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.phonenumber}</td> */}
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.email}</td>
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.opportunity_name}</td>
                                                   <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1 " onClick={()=>deleteData(d.id)}>Delete</button>
                                                     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1 " onClick={()=>ViewMember(d.interest_id)}>View Member</button>
                                                     </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
   </>
  )
}

export default IntrestOppor