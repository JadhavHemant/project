// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// const MembercardView = () => {
//     useEffect(() => {
//         Getdata();
//     }, [])

//     const [data, setData] = useState([]);

//     // const memberid = localStorage.getItem("user_id");
//     const Getdata = () => {
//         axios({
//             url: `http://localhost:3001/api/members`,
//             method: 'GET',
//             contentType: 'application/json',
//         }).then((res) => {
//             setData(res.data);
//         }).catch((err) => {
//             alert("error")
//         })
//     }

//     // const Updatedata = (id) => {
//     //     const Playload={flag:false}
//     //     axios({
//     //         url: `http://localhost:3001/api/selection_status/update/${id}`,
//     //         method: "put",
//     //         data:Playload,
//     //         contentType: "application/json",
//     //     }).then((res)=>{
//     //         alert("success");
//     //         Getdata();
//     //     }).catch((err)=>{
//     //     alert("error");
//     //     })
//     // }
//     return (
//         <>
//             <div className="flex flex-wrap justify-center">
//                 {data.map((d, k) => (
//                     <div className="flex mb-2 Pt-4  p-4" key={k} >
//                         <div className="max-w-sm overflow-hidden shadow-lg mx-auto border border-[orange] rounded-lg hover:shadow-1xl hover:shadow-[#111111] ">
//                             <div className="px-8 py-4 bg-[#ffffff] w-[600px]">
//                                 <p className="text-[black] text-base">Member Name: {d.member_name}</p>
//                                 <p className="text-[black] text-base">Phone Number : {d.member_phone}</p>
//                                 <p className="text-[black] text-base">technology : {d.technology}</p>
//                                 <p className="text-[black] text-base">discipline/Branch : {d.discipline}</p>
//                                 <p className="text-[black] text-base">city : {d.city}</p>
//                                 <p className="text-[black] text-base">state : {d.state}</p>
//                                 <p >skills : <span className='text-start border border-[black] w-[200px] p-[3px] pl-[4px] pr-[4px]'>{d.skills}</span></p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     )
// }

// export default MembercardView; 
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
                    <div className="flex mb-2 Pt-4 p-4 " key={k}>
                        <div className="max-w-sm overflow-hidden shadow-lg mx-auto border border-[#050505] rounded-lg hover:shadow-1xl hover:shadow-[#111111] ">
                            <div className="px-8 py-4 bg-[#ffffff] w-[600px]  bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
                                <p className="text-[black] text-base">Member Name: {d.member_name}</p>
                                <p className="text-[black] text-base">Phone Number : {d.member_phone}</p>
                                <p className="text-[black] text-base">Technology : {d.technology}</p>
                                <p className="text-[black] text-base">Discipline/Branch : {d.discipline}</p>
                                <p className="text-[black] text-base">City : {d.city}</p>
                                <p className="text-[black] text-base pb-2">State : {d.state}</p>
                                <p className='text-cenetr'>Skills :
                                    {d.skills.split(',').map((skill, index) => (
                                        <span key={index} className='border border-[#000000]  p-[4px]  rounded-[10px] underline text-center mt-[10px]' style={{ marginRight: '5px' }}>
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
            

        </>
    );
};

export default MembercardView;
