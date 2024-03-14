import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EolDataView = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [member, setMemberid] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const memberid = localStorage.getItem("user_id");
            setMemberid(memberid);
            const response = await axios.get(`/api/memberidoppodata/intre/${memberid}`);
            setData(response.data.map(item => ({ ...item, selectedOption: null })));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteData = async (id) => {
        try {
            await axios.delete(`/api/delete/interested/${id}`);
            alert("Deleted successfully");
            getData();
        } catch (error) {
            alert("Failed to delete");
            console.error("Delete error:", error);
        }
    };

    const viewMember = (id) => {
        localStorage.setItem("member_id", id);
        navigate("/admin/viewmember");
    };

    const handleCheckboxChange = (index, option, id, opportunityName, interestedName, phoneNumber) => {
        const newData = [...data];
        newData[index].selectedOption = option;
        setData(newData);

        if (option === "Yes") {
            const payload = {
                selection_status: "yes",
                applicant_name: interestedName,
                opportunity_name: opportunityName,
                phonenumber: phoneNumber,
                opportunity_id: id,
                flag: true,
                memberid: member,
            };

            axios.post('/api/selection_status/result', payload)
                .then((res) => {
                    alert("hello");
                })
                .catch((err) => {
                    alert("Error occurred while processing request.");
                });
        } else if (option === "No") {
            const payload = {
                selection_status: "No",
                applicant_name: interestedName,
                opportunity_name: opportunityName,
                phonenumber: phoneNumber,
                opportunity_id: id,
                flag: false,
                memberid: member,
            };
            console.log(payload);
            axios.post('/api/selection_status/result', payload)
                .then((res) => {
                    alert("hello");
                })
                .catch((err) => {
                    alert("Error occurred while processing request.");
                });
        }
    };
    const Goback = () => {
        navigate("/user/oppo");
    }

    return (
        <>
            <div className='p-6'>
                <div className="max-w-7xl mx-auto pt-[30px]">
                    <div className='p-4'>
                        <button className='p-2 bg-[#7f7ff5] text-white font-bold rounded-[10px] hover:bg-blue-700' onClick={() => Goback()}>&larr; Go Back</button>
                    </div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                        <thead className="bg-[#7f7ff5] dark:bg-[#8b8bf7]">
                                            <tr>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Member Name
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Phone Number
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400 hidden gap-10 lg:flex">
                                                    Email
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Opportunity
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Action
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                                    Selection status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                            {data.map((d, index) => (
                                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.interested_name}</td>
                                                    <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.phonenumber}</td>
                                                    <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400 hidden gap-10 lg:flex">{d.email}</td>
                                                    <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.opportunity_name}</td>
                                                    <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400 inline">
                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => deleteData(d.id)}>Delete</button>
                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => viewMember(d.interest_id)}>Details</button>
                                                    </td>
                                                    <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400 ">
                                                        <label className="text-black font-bold py-2 px-4 rounded-full ml-1"><input type="checkbox" checked={d.selectedOption === 'Yes'} onChange={() => handleCheckboxChange(index, 'Yes', d.id, d.opportunity_name, d.interested_name, d.phonenumber)} />Yes</label>
                                                        <label className="text-black font-bold py-2 px-4 rounded-full ml-1"><input type="checkbox" checked={d.selectedOption === 'No'} onChange={() => handleCheckboxChange(index, 'No', d.id, d.opportunity_name, d.interested_name, d.phonenumber)} />No</label>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EolDataView;