import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const RefrenceTable = () => {
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, []);

    const [data, setdata] = useState([]);

    const getData = () => {
        axios({
            url: "/studentsrefrence",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setdata(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const Delete = (id) => {
        axios({
            url: `/studentsrefrence/${id}`,
            method: 'DELETE',
        })
            .then((res) => {
                alert("Deleted successfully");
                getData();
            })
            .catch((err) => {
                alert("Delete failed");
            });
    };

    const View = (id) => {
        localStorage.setItem("user_id", id);
        navigate("/admin/refrenceview")
    }
    const Edit = (id) => {
        localStorage.setItem("user_id", id);
        navigate("/admin/refrenceedit")
    }
    const GoBack = () => {
        navigate("/admin")
    }
    const AddRef = () => {
        navigate("/admin/refrence")
    }
    return (
        <>
            <div className='flex items-center justify-center p-3'>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => AddRef()}>
                    &#8592; Add Reference
                </button>
            </div>
            <div class="max-w-2xl mx-auto pt-[30px]">
                <h3 className='p-3 font-bold text-center'>Ideation Reference</h3>
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
                                                Name
                                            </th>
                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-widertext-center text-gray-700 uppercase dark:text-gray-400">
                                                srnumber
                                            </th>
                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center">
                                        {
                                            data.map((d, k) => (
                                                <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400">{d.id}</td>
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400">{d.name}</td>
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400">{d.srnumber}</td>
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400">
                                                        <div className='inline pr-[3px]'>
                                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full" onClick={() => View(d.id)}>
                                                                View
                                                            </button>
                                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => Delete(d.id)}>
                                                                Delete
                                                            </button>
                                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => Edit(d.id)}>
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </td>
                                                    {/* <td class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        <div className='inline pr-[3px]'>
                                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => Opportunity(d.id)}>
                                                                Add Opportunity
                                                            </button>
                                                        </div>
                                                        </td> */}
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
            <div className='flex items-center justify-center p-3'>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => GoBack()}>
                    &#8592; Go Back
                </button>
            </div>
        </>
    )
}

export default RefrenceTable
