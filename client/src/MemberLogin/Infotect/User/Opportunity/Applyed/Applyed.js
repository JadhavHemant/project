import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Applyed = () => {
    useEffect(() => {
        Getdata();
    }, [])

    const [data, setData] = useState([]);

    const memberid = localStorage.getItem("user_id");
    const Getdata = () => {
        axios({
            url: `http://localhost:3001/api/selection_status/result/${memberid}`,
            method: 'GET',
            contentType: 'application/json',
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert("error")
        })
    }

    const Updatedata = (id) => {
        const Playload={flag:false}
        axios({
            url: `http://localhost:3001/api/selection_status/update/${id}`,
            method: "put",
            data:Playload,
            contentType: "application/json",
        }).then((res)=>{
            Getdata();
        }).catch((err)=>{
        alert("error");
        })
    }
    return (
        <>
            <div className="flex flex-wrap justify-center">
                {data.map((d, k) => (
                    <div className="flex mb-2 Pt-4  p-4" key={k} >
                        <div className="max-w-sm overflow-hidden shadow-lg mx-auto border border-[orange] rounded-lg hover:shadow-3xl hover:shadow-[#111111] ">
                            <div className="px-8 py-4  w-[600px] bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
                                <h1>{d.id}</h1>
                                <p className="text-[black] text-base">Opportunity Name: {d.opportunity_name}</p>
                                <p className="text-[black] text-base">Name : {d.applicant_name}</p>
                                <p className="text-[black] text-base">Contact : {d.phonenumber}</p>
                                <p className="text-[black] text-base">Selection Status {d.selection_status}</p>
                                <button className="text-[black] border border-black bg-[#fcc03f] hover:bg-[#cdf855] p-1 rounded-[10px] " onClick={() => Updatedata(d.id)} >Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Applyed