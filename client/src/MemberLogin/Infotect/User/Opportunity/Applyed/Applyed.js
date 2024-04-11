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
        const Playload = { flag: false }
        axios({
            url: `http://localhost:3001/api/selection_status/update/${id}`,
            method: "put",
            data: Playload,
            contentType: "application/json",
        }).then((res) => {
            Getdata();
        }).catch((err) => {
            alert("error");
        })
    }
    return (
        <>
            <div className='p-4'>
                <h1 className='text-center font-bold text-3xl underline font-[ORANGE] text-[#070707]'>Applications.</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                {data.map((d, k) => (
                    <div className="flex mb-2 Pt-4  p-4" key={k} >
                        <div className="max-w-sm overflow-hidden shadow-lg mx-auto border border-[#030303] rounded-lg hover:shadow-3xl hover:shadow-[#111111] hover:border-[black] hover:border-[2px] ">
                            <div className="text-[#050505] px-8 py-4  w-[600px]">
                                <h1>{d.id}</h1>
                                <p className="text-base">Opportunity Name: {d.opportunity_name}</p>
                                <p className="text-base">Name : {d.applicant_name}</p>
                                <p className="text-base">Contact : {d.phonenumber}</p>
                                <p className="text-base">Selection Status {d.selection_status}</p>
                                <div className='pt-[10px] '>
                                    <button className="border border-black bg-[orange] hover:bg-[#ecff3c] p-1 rounded-[10px] " onClick={() => Updatedata(d.id)} >Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Applyed