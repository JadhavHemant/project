import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllocationOppoTable = () => {

    useEffect(() => {
        getData();

    }, [])

    const [member, setMember] = useState([]);

    const getData = () => {
        axios({
            url: `http://localhost:3001/api/get/opportunityallocation`,
            method: 'GET',
            contentType: 'application/json',
        }).then((res) => {
            setMember(res.data);
        }).catch((err) => {
            alert("failure", err)
        })
    }

    const DeleteMember = (id) => {
        axios({
            url: `http://localhost:3001/api/opportunityallocation/${id}`,
            method: 'delete',
        })
            .then((res) => {
                alert("Delete record successfully");
                getData();
            })
            .catch((err) => {
                console.error("Error deleting record:", err);
                alert("Error: " + err.message);
            });
    };
    const navigate = useNavigate();

    const ViewMember = (id) => {
        localStorage.setItem("member_id", id);
        navigate("/admin/viewallo")
    }

    const AddMemberShip = (id) => {
        navigate("/admin/addallo")
    }
    const UpdateMemberS = (id) => {
        localStorage.setItem("member_id", id);
        navigate("/admin/updateallo")
    }

    return (
        <>
            <div className='bg-[#B5B5B5] h-[auto] pb-20 pt-10'>
                <div className='pt-[20px]'>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full flex justify-center items-center mx-auto" onClick={() => AddMemberShip()}>
                        Add Opportunity Allocation
                    </button>
                </div>
                <div class="max-w-3xl mx-auto pt-[20px]">
                    <div class="flex flex-col">
                        <div class="overflow-x-auto shadow-md sm:rounded-lg">
                            <div class="inline-block min-w-full align-middle">
                                <div class="overflow-hidden ">
                                    <table class="min-w-full divide-y divide-[black] table-fixed dark:divide-gray-700">
                                        <thead class="bg-[#9393fc] dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Id
                                                </th>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Allocated By
                                                </th>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Allocated To
                                                </th>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                            {
                                                member.map((d, k) => (
                                                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.id}</td>
                                                        <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.opportunity_allocated_by}</td>
                                                        <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.opportunity_allocated_to}</td>
                                                        <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                            <div className='inline pr-[3px]'>
                                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full" onClick={() => ViewMember(d.id)}>
                                                                    View
                                                                </button>
                                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => DeleteMember(d.id)}>
                                                                    Delete
                                                                </button>
                                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => UpdateMemberS(d.id)}>
                                                                    Edit
                                                                </button>
                                                            </div>
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

export default AllocationOppoTable