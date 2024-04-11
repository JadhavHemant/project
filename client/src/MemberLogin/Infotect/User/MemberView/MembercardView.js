import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MembercardView = () => {
    useEffect(() => {
        Getdata();
    }, []);

    const [data, setData] = useState([]);

    const Getdata = () => {
        axios({
            url: `http://localhost:3001/api/members`,
            method: 'GET',
            contentType: 'application/json',
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert("error");
        });
    };

    return (
        <>
            <div className='p-4'>
                <h1 className='text-center font-bold text-3xl underline font-[ORANGE] text-[#070707]'>Members.</h1>
            </div>

            <div className="flex flex-wrap justify-center">
                {data.map((d, k) => (
                    <div className="flex mb-2 pt-4 p-4" key={k}>
                        <div className="max-w-sm overflow-hidden shadow-lg mx-auto border border-[#050505] rounded-lg hover:shadow-1xl hover:shadow-[#111111] hover:border-[#000000] hover:border-[2px]">
                            <div className='grid grid-cols-1 md:grid-cols-2'>
                                <div className="px-8 py-4 bg-[#ffffff] w-[600px] cursor-pointer">
                                    <p className="text-[black] text-base">Member Name: {d.member_name}</p>
                                    <p className="text-[black] text-base">Technology: {d.technology}</p>
                                    <p className="text-[black] text-base">Discipline/Branch: {d.discipline}</p>
                                    <p className="text-[black] text-base">City: {d.city}</p>
                                    <p className="text-[black] text-base pb-2">State: {d.state}</p>
                                    <p className='pb-2'>Skills: {d.skills && d.skills.split(',').map((skill, index) => (
                                        <span key={index} className='p-[4px] rounded-[10px] hover:underline text-[#0e0d0d] cursor-pointer' style={{ marginRight: '5px' }}>
                                            {skill.trim()}
                                        </span>
                                    ))}
                                    </p>
                                </div>
                                <div className="flex justify-center items-center">
                                    <img src={`http://localhost:3001/uploads/${d.photo}`} className='w-[80px] h-[80px] border border-black rounded-lg' alt={d.member_name} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MembercardView;
