import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Applyed = () => {
    useEffect(() => {
        Getdata();
    }, [])

    const [data, setData] = useState([]);

    const memberid = localStorage.getItem("user_id");
    // alert(memberid);
    const Getdata = () => {
        axios({
            url: `/api/interestedpeople/${memberid}`,
            method: 'GET',
            contentType: 'application/json',
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert("error")
        })
    }

    return (
        <>
           
            <div className="flex flex-wrap justify-center">
                {data.map((d, k) => (
                    <div className="flex mb-2 Pt-4  p-4" key={k} >
                        <div className="max-w-sm overflow-hidden shadow-lg mx-auto border border-[orange] rounded-lg hover:shadow-2xl hover:shadow-[#111111] ">
                            <div className="px-6 py-4 bg-[#f3efef] w-[600px]">
                                <div className="font-bold text-xl mb-2">{k+1}</div>
                                <p className="text-gray-700 text-base">Opportunity Name: {d.opportunity_name}</p>
                                <p className="text-gray-700 text-base">Name : {d.applicant_name}</p>
                                <p className="text-gray-700 text-base">Contact : {d.phonenumber}</p>
                                <p className="text-gray-700 text-base">Date And Time {d.selection_status}</p>
                                <p className="text-gray-700 text-base">Date And Time {d.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Applyed