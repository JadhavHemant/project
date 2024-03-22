import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AllocationView = () => {
    const [member, setMember] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("member_id");
        if (id) {
            GetMember(id);
        }
    }, []);

    const GetMember = (id) => {
        axios({
            url: `http://localhost:3001/api/opportunity_allocation/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (Array.isArray(res.data)) {
                setMember(res.data);
            } else if (typeof res.data === 'object') {
                setMember([res.data]);
            } else {
                console.error('Invalid API response:', res.data);
            }
        }).catch((error) => {
            console.error('Error fetching member:', error);
        });
    };
    const navigate = useNavigate();

    const DeleteMember = (id) => {
        axios({
            url: `http://localhost:3001/api/opportunityallocation/${id}`,
            method: 'delete',
        }).then((res) => {
            alert("Delete member successfully");
            navigate("/admin/allo")
        }).catch((err) => {
            alert("Member not deleted ")
        })
    }
    const GoBack = () => {
        navigate("/admin/allo")
    }
    return (
        <>
            <div className="py-16 bg-[#F7F7F7]  h-screen">
                <div className="container px-6 m-auto text-gray-500 md:px-12 xl:px-0">
                    <div className="grid gap-6 mx-auto md:w-3/6 lg:w-full lg:grid-cols-1">
                        <div className="bg-[white] rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
                            <div className="mb-12 space-y-4">
                                {member.map((d, k) => (
                                    <div key={k}>
                                        <h5 className="text-xl font-semibold">Id :{d.membership_record_id}</h5>
                                        <div className="grid grid-cols-1 gap-4 member-details sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold">Member Id:</span>
                                                <span>{d.opportunity_id}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">Apportunity Allocated By:</span>
                                                <span>{d.opportunity_allocated_by}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">Opportunity Allocated To:</span>
                                                <span>{d.opportunity_allocated_to}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">Opportunity For:</span>
                                                <span>{d.opportunity_for}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">Allocation Date:</span>
                                                <span>{d.opportunity_allocation_date}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">Allocation Status:</span>
                                                <span>{d.opportunity_allocation_status}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">Remark:</span>
                                                <span>{d.opportunity_allocation_remark}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">Documents:</span>
                                                <a href={d.opportunity_details_doc}>{d.opportunity_details_doc}</a>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">Role:</span>
                                                <span>{d.memberrole}</span>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-center p-4'>
                                            <button class="bg-[#f73636] text-[white] hover:bg-[orange] hover:text-[black] font-bold py-2 px-4 rounded-full" onClick={() => DeleteMember(d.id)}>
                                                Delete
                                            </button>
                                            <div className='flex items-center justify-center p-3'>
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => GoBack()}>
                                                    &#8592; Go Back
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllocationView

