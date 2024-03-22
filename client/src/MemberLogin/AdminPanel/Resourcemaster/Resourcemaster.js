import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Resourcemaster = () => {
    useEffect(()=>{
        GetResourcemaster();
    },[]);

    const [data,setData]=useState([]);
    const GetResourcemaster=()=>{
     axios({
        url: `http://localhost:3001/api/resourcemaster`,
        method: 'GET',
        conetentType: 'application/json',
     }).then((res)=>{
        setData(res.data);
     }).catch((err)=>{
        alert(err.message);
     })
    }

    return (
        <>
        <div className='     h-[auto] pb-20 pt-10'>
            <div className='p-4'>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full flex justify-center items-center mx-auto">
                        Add Resource
                    </button>
                    </div>
                    <div class="max-w-6xl mx-auto pt-[30px] ">
                        <div class="flex flex-col">
                            <div class="overflow-x-auto shadow-md sm:rounded-lg">
                                <div class="inline-block min-w-full align-middle">
                                    <div class="overflow-hidden ">
                                        <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                            <thead class="bg-[#7f7ff5] dark:bg-[#8b8bf7]">
                                                <tr>
                                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                        Id
                                                    </th>
                                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    resource name
                                                    </th>
                                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    designation
                                                    </th>
                                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    status
                                                    </th>
                                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    empcode
                                                    </th>
                                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    fromdate
                                                    </th>
                                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    todate
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
                                                            <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.resourceid}</td>
                                                            <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.resourcename}</td>
                                                            <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.designation}</td>
                                                            <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.status}</td>
                                                            <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.empcode}</td>
                                                            <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.fromdate}</td>
                                                            <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.todate}</td>
                                                            <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                                {/* <div className='inline pr-[3px]'>
                                                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full" onClick={() => ViewMember(d.id)}>
                                                                        View
                                                                    </button>
                                                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => DeleteMember(d.id)}>
                                                                        Delete
                                                                    </button>
                                                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => UpdateMember(d.id)}>
                                                                        Edit
                                                                    </button>
                                                                </div> */}
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
                    </div>
                </>
    )
}

export default Resourcemaster