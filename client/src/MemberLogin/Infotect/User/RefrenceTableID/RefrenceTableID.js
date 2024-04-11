import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const RefrenceTableID = () => {
    useEffect(() => {
        getData();
    }, []);

    const [data, setData] = useState([]);

    const getData = () => {
        var id = 102;
        axios({
            url: `http://localhost:3001/api/memberreference/m/${id}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            setData(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    };

    const View = (name, email, clas, id) => {
        var member_id = localStorage.getItem("user_id");
        const member_name = name;
        const member_password = email;
        const member_email = email;
        const class_member = clas;
        const payload = {
            member_id: member_id,
            member_name: member_name,
            member_password: member_password,
            member_email: member_email,
            class_member: class_member
        };

        axios({
            url: `http://localhost:3001/api/members/networks`,
            method: 'POST',
            data: payload,
            contentType: 'application/json',
        })
        .then((res) => {
            alert("Success");
            UpdateData(id);
        })
        .catch((err) => {
            alert("Error: ", err);
        });
    };

    const UpdateData = (id) => {
        var flag = false;
        const datax = { flag: flag,id:id };
        console.log(datax);
        axios({
            url: `http://localhost:3001/api/memberreference/${id}/update-flag`,
            method: 'PUT',
            data: datax,
            contentType: 'application/json',
        })
        .then((res) => {
            alert("Success");
            getData();
        })
        .catch((err) => {
            alert("Error: ", err);
        });
    };      

    return (
        <>

            <div class="max-w-2xl mx-auto pt-[30px] pb-[50px] ">
                <h3 className='p-3 font-bold text-center'>Network</h3>
                <div class="flex flex-col">
                    <div class="overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden ">
                                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead class="bg-[#7f7ff5] dark:bg-[#8b8bf7]">
                                        <tr>
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
                                                    {/* <td class="py-3 px-6 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400">{d.id}</td> */}
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider  text-gray-700  dark:text-gray-400">{d.name}</td>
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider  text-gray-700  dark:text-gray-400">{d.srnumber}</td>
                                                    <td class="py-3 px-6 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400">
                                                        <div className='inline pr-[3px]'>
                                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full" onClick={() => View(d.name, d.referenceemail, d.cla_ss, d.id)}>
                                                                Make Member
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
        </>
    )
}

export default RefrenceTableID
