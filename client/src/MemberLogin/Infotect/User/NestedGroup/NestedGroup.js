import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NestedGroup = () => {

    useEffect(() => {
        Getdata();
        MemberidWise();
    }, [])

    const [ogroup, setOgrou] = useState([]);
    const MemberidWise = () => {
        const id = localStorage.getItem("user_id");
        axios({
            url: `http://localhost:3001/api/group/mid/${id}`,
            method: 'GET',
            contentType: 'application/json',
        }).then((res) => {
            setOgrou(res.data);

        }).catch((err) => {
        })
    }

    const [group, setGroups] = useState([]);
    const Getdata = () => {
        axios({
            url: `http://localhost:3001/api/groups`,
            method: 'GET',
            contentType: 'application/json',
        }).then((res) => {
            setGroups(res.data);
        }).catch((err) => {
        })
    }

    const navigate = useNavigate();
    const group_name = useRef();
    const other_group_name = useRef();
    const other_group_value = useRef();
    const group_owner = useRef();
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const AddData = async () => {
        var memberid = localStorage.getItem("user_id");
        const formData = new FormData();
        formData.append('member_id', memberid);
        formData.append('group_name', group_name.current.value);
        formData.append('other_group_name', other_group_name.current.value);
        formData.append('other_group_value', other_group_value.current.value);
        formData.append('group_owner', group_owner.current.value);
        if (file) {
            formData.append('groupLogo', file);
        }

        try {
            const response = await axios.post('http://localhost:3001/api/merged_groups', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            alert('Group created successfully!');
            navigate("/user/group")
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating group.');
        }
    };

    return (
        <>
            <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div class="container max-w-screen-lg mx-auto">
                    <div>

                        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div class="text-gray-600">
                                    <p class="font-medium text-lg">join Group</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div class="lg:col-span-2">
                                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                                        <div className="sm:col-span-2">
                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Select your Group :
                                            </label>
                                            <select ref={group_name} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6">
                                                <option>Select Group</option>
                                                {
                                                    Array.isArray(ogroup) && ogroup.map((d, k) => (
                                                        <option key={k} value={d.groupname}>{d.groupname}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        {/*  */}
                                        <div className="sm:col-span-2">
                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                marge group with :
                                            </label>
                                            <select ref={other_group_name} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6">
                                                <option>Select Group</option>
                                                {
                                                    group.map((d, k) => (
                                                        <option value={d.groupname}>name:{d.groupname} value:{d.transactionvalue}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="city"> transaction value</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={other_group_value} />
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="city">owner name</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={group_owner} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="photo">group logo</label>
                                            <input type="file" className="h-10 border mt-1 p-1   rounded px-4 w-full bg-gray-50" onChange={handleFileChange} />
                                        </div>
                                        <div class="md:col-span-5 text-right">
                                            <div class="inline-flex items-end">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => AddData()}>Submit</button>
                                            </div>
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

export default NestedGroup