import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MembershipTable = () => {

    useEffect(() => {
        getData();

    }, [])

    const [member, setMember] = useState([]);

    const getData = () => {
        axios({
            url: `/api/membershiprecords`,
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
            url: `/api/delete/membershiprecord/${id}`,
            method: 'delete',
        }).then((res) => {
            alert("Delete membership record successfully");
            getData();
        }).catch((err) => {
            alert("Error: " + err)
        })
    }
    const navigate = useNavigate();

    const ViewMember = (id) => {
        localStorage.setItem("member_id", id);
        navigate("/admin/viewmembership")
    }

    const AddMemberShip = (id) => {
        navigate("/admin/addmembership")
    }
const UpdateMemberS=(id)=>{
    localStorage.setItem("member_id", id);
    navigate("/admin/updatemembership")
}

    return (
        <>
            <div className='bg-[#B5B5B5] h-[auto] pb-20 pt-10'>
                <div className='pt-[20px]'>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full flex justify-center items-center mx-auto" onClick={() => AddMemberShip()}>
                        Add Membership
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
                                                    Member Id
                                                </th>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Membership Type
                                                </th>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Membership Category
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
                                                        <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.member_id}</td>
                                                        <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.membership_type}</td>
                                                        <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.membership_category}</td>
                                                        <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                            <div className='inline pr-[3px]'>
                                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full" onClick={() => ViewMember(d.membership_record_id)}>
                                                                    View
                                                                </button>
                                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => DeleteMember(d.membership_record_id)}>
                                                                    Delete
                                                                </button>
                                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={()=>UpdateMemberS(d.membership_record_id)}>
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

export default MembershipTable
