import React, { useEffect, useState } from 'react'
import axios from 'axios'
const MembercardView = () => {
    useEffect(() => {
        Getdata();
    }, [])

    const [data, setData] = useState([]);

    // const memberid = localStorage.getItem("user_id");
    const Getdata = () => {
        axios({
            url: `http://localhost:3001/api/members`,
            method: 'GET',
            contentType: 'application/json',
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert("error")
        })
    }

    // const Updatedata = (id) => {
    //     const Playload={flag:false}
    //     axios({
    //         url: `http://localhost:3001/api/selection_status/update/${id}`,
    //         method: "put",
    //         data:Playload,
    //         contentType: "application/json",
    //     }).then((res)=>{
    //         alert("success");
    //         Getdata();
    //     }).catch((err)=>{
    //     alert("error");
    //     })
    // }
    return (
        <>
            <div className="flex flex-wrap justify-center">
                {data.map((d, k) => (
                    <div className="flex mb-2 Pt-4  p-4" key={k} >
                        <div className="max-w-sm overflow-hidden shadow-lg mx-auto border border-[orange] rounded-lg hover:shadow-1xl hover:shadow-[#111111] ">
                            <div className="px-8 py-4 bg-[#ffffff] w-[600px]">
                                <p className="text-gray-700 text-base">Member Name: {d.member_name}</p>
                                <p className="text-gray-700 text-base">Phone Number : {d.member_phone}</p>
                                <p className="text-gray-700 text-base">technology : {d.technology}</p>
                                <p className="text-gray-700 text-base">discipline/Branch {d.discipline}</p>
                                <p className="text-gray-700 text-base">city {d.city}</p>
                                <p className="text-gray-700 text-base">state {d.state}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MembercardView; 