import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GroupTables = () => {
  useEffect(() => {
    Getdata();
  }, []);

  const [data, setData] = useState([]);

  const Getdata = () => {
    axios({
      url: `http://localhost:3001/api/merged_groups`,
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
      <div className="flex flex-wrap justify-center">
        {data.map((d, k) => (
          <div className="flex mb-2 pt-4 p-4" key={k}>
            <div className="max-w-sm overflow-hidden shadow-lg mx-auto border border-[#050505] rounded-lg hover:shadow-1xl hover:shadow-[#111111] hover:border-[#000000] hover:border-[2px]">
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className="px-8 py-4 bg-[#ffffff] w-[600px] cursor-pointer text-[12px]">
                <p className="text-[black]  ">Sr.No: {k+1}</p>
                  <p className="text-[black]  ">group name: {d.group_name}</p>
                  <p className="text-[black]  ">Join With: {d.other_group_name}</p>
                  <p className="text-[black]  ">transaction value: {d.other_group_value}</p>
                  <p className="text-[black]  ">Join Date: {d.formed_date}</p>
                </div>
                <div className="flex justify-end items-end p-2">
                  <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 dark:text-gray-400  items-center">
                    <img src={`http://localhost:3001/${d.group_logo.replace(/\\/g, '/')}`} alt={d.group_name} className=" h-[80px] w-[60px] hover:scale-125 transition-transform duration-500 cursor-pointer rounded-lg border border-black" />
                  </td>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default GroupTables