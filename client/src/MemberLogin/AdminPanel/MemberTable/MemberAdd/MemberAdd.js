import React, { useRef, useEffect, useState } from 'react'
import login from './loginimg.png'
// import google from './google.png';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const MemberAdd = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null); // Use state to store end date
    const [val, setVal] = useState("No");
    const [valr, setValR] = useState("No");

    const handleStartupChange = (value) => {
        if (value === 'Yes') {
            setVal('Yes');
        } else {
            setVal('No');
        }
    };

    const handleResChange = (value) => {
        if (value === 'Yes') {
            setValR('Yes');
        } else {
            setValR('No');
        }
    };
    const [ment, setMent] = useState("No")

    const handleMentChange = (value) => {
        if (value === 'Yes') {
            setMent('Yes');
        } else {
            setMent('No');
        }
    };
    const [investor, setInvester] = useState("No")
    const handleInvestChange = (value) => {
        if (value === 'Yes') {
            setInvester('Yes');
        } else {
            setInvester('No');
        }
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        if (option) {
            setStartDate(new Date());
        } else {
            setStartDate(null);
        }
    };

    useEffect(() => {
        GetMemberMaster();
        GetMemberType();
        Membercategorys();

        const getEndDate = () => {
            if (startDate && selectedOption) {
                const endDate = new Date(startDate);
                if (selectedOption === 'sevenDays') {
                    endDate.setDate(endDate.getDate() + 7);
                } else if (selectedOption === 'thirtyDays') {
                    endDate.setDate(endDate.getDate() + 30);
                } else if (selectedOption === 'ninetyDays') {
                    endDate.setDate(endDate.getDate() + 90);
                }

                const formattedDate = endDate.toISOString().slice(0, 10);
                setEndDate(formattedDate);
                return formattedDate;
            }
            return '';
        };

        getEndDate();
    }, [startDate, selectedOption]);

    const [membermaster, setMemberMaster] = useState([]);
    const GetMemberMaster = () => {
        axios({
            url: `http://localhost:3001/api/membergroupmaster`,
            method: 'GET',
            contentType: 'application/json',

        }).then((res) => {
            setMemberMaster(res.data);
        }).catch((err) => {
            alert(err)
        })
    }

    const [membertypex, setMemberType] = useState([]);

    const GetMemberType = () => {
        axios({
            url: `http://localhost:3001/api/membertypes`,
            method: 'GET',
            contentType: 'application/json',
        }).then((res) => {
            setMemberType(res.data);
        }).catch((err) => {
            alert(err)
        })
    }

    const [membercate, setMemberMasterCategory] = useState([]);

    const Membercategorys = () => {
        axios({
            url: `http://localhost:3001/api/membercategories`,
            method: 'GET',
            contentType: 'application/json',
        }).then((res) => {
            setMemberMasterCategory(res.data)
        }).catch((err) => {
            alert(err)
        })
    }

    const navigate = useNavigate();
    const member_name = useRef();
    const member_code = useRef();
    const member_phone = useRef();
    const member_email = useRef();
    const member_password = useRef();
    const photo_image = useRef();
    const resume = useRef();
    const id_card_proof = useRef();
    const other_documents = useRef();
    const geolocation = useRef();
    const specialisation = useRef();
    const address = useRef();
    const city = useRef();
    const state = useRef();
    const pincode = useRef();
    const technology = useRef();
    const roll_number = useRef();
    const class_member = useRef();
    const discipline = useRef();
    const membergroup = useRef();
    const membercategory = useRef();
    const membertype = useRef();
    const organization_name = useRef();
    const designation_role = useRef();
    const country = useRef();
    const addData = () => {
        var playload = {
            member_name: member_name.current.value,
            member_code: member_code.current.value,
            member_phone: member_phone.current.value,
            member_email: member_email.current.value,
            member_password: member_password.current.value,
            photo_image: photo_image.current.value,
            resume: resume.current.value,
            id_card_proof: id_card_proof.current.value,
            other_documents: other_documents.current.value,
            geolocation: geolocation.current.value,
            specialisation: specialisation.current.value,
            address: address.current.value,
            city: city.current.value,
            state: state.current.value,
            pincode: pincode.current.value,
            technology: technology.current.value,
            roll_number: roll_number.current.value,
            class_member: class_member.current.value,
            discipline: discipline.current.value,
            membergroup: membergroup.current.value,
            membercategory: membercategory.current.value,
            membertype: membertype.current.value,
            date_of_expire: endDate,
            interested_startup: val,
            interested_research: valr,
            interested_investments: investor,
            organization_name: organization_name.current.value,
            designation_role: designation_role.current.value,
            country: country.current.value,
            interested_mentoring: ment,
        };
        console.log(playload);
        axios({
            url: 'http://localhost:3001/api/add/members',
            method: 'POST',
            data: playload,
            contentType: 'application/json',
        }).then((res) => {
            alert('success');
            Reg();
        }).catch((err) => {
            alert('error');
        })
    }

    const Reg = () => {
        navigate("/admin");
    }

    const [geolocationValue, setGeolocationValue] = useState('');

    const getGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setGeolocationValue(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                (error) => {
                    console.error('Error getting geolocation:', error.message);
                    setGeolocationValue('Error getting geolocation');
                }
            );
        } else {
            setGeolocationValue('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        getGeolocation();
    }, []);

    return (
        <>
            <div className="grid w-full h-screen grid-cols-1 sm:grid-cols-2">
                <div className='hidden sm:block'>
                    <img className='object-cover w-full h-full' src={login} alt='hello' />
                </div>
                <div className='bg-[white] flex flex-col justify-center'>
                    <form className='font-semibold font-Manrope '>
                        <h1 className='text-center pt-[50px] font-Manrope text-[29px] '>CREATE NEW MEMBER</h1>
                        <div className="p-4 space-y-12 ">
                            <div className="p-4 pb-12 border-b border-gray-900/10">
                                <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Member Email :
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type='text' ref={member_email}
                                                className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password :
                                        </label>
                                        <div className="mt-2">
                                            <input type='password' ref={member_password} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Member name :
                                        </label>
                                        <div className="mt-2">
                                            <input type='text' ref={member_name} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Member Code :
                                        </label>
                                        <div className="mt-2">
                                            <input type='text' ref={member_code} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone Number :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={member_phone} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Organization :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={organization_name} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Roll Number :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={roll_number} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            designation_role :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={designation_role} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-1">
                                        <label className="block text-sm font-medium leading-6 text-gray-900"> Photo :</label>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <br />
                                            <input type="text" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" ref={photo_image} />
                                            <div style={{ position: "relative" }}></div>
                                            <a href="https://drive.google.com/drive/folders/18xEFIS66wqfRQWjcAzJnE19-l39gFZIT?usp=share_link" target="_blank" rel="noopener noreferrer" className='text-[blue] text-[12px]'>Upload file here</a>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-1">
                                        <label className="block text-sm font-medium leading-6 text-gray-900"> Resume :</label>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <br />
                                            <input type="text" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" ref={resume} />
                                            <div style={{ position: "relative" }}></div>
                                            <a href="https://drive.google.com/drive/folders/18xEFIS66wqfRQWjcAzJnE19-l39gFZIT?usp=share_link" target="_blank" rel="noopener noreferrer" className='text-[blue] text-[12px]'>Upload file here</a>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-1">
                                        <label className="block text-sm font-medium leading-6 text-gray-900"> Id Card Proof :</label>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <br />
                                            <input type="text" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" ref={id_card_proof} />
                                            <div style={{ position: "relative" }}></div>
                                            <a href="https://drive.google.com/drive/folders/18xEFIS66wqfRQWjcAzJnE19-l39gFZIT?usp=share_link" target="_blank" rel="noopener noreferrer" className='text-[blue] text-[12px]'>Upload file here</a>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-1">
                                        <label className="block text-sm font-medium leading-6 text-gray-900"> Other Documents :</label>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <br />
                                            <input type="text" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" ref={other_documents} />
                                            <div style={{ position: "relative" }}></div>
                                            <a href="https://drive.google.com/drive/folders/18xEFIS66wqfRQWjcAzJnE19-l39gFZIT?usp=share_link" target="_blank" rel="noopener noreferrer" className='text-[blue] text-[12px]'>Upload file here</a>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="geolocation" className="block text-sm font-medium leading-6 text-gray-900">
                                            Geolocation:
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" id="geolocation" ref={geolocation} value={geolocationValue} onChange={() => { }} className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Specialisation:
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={specialisation} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Address :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={address} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            City :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={city} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            State :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={state} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            country :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={country} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Pincode :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={pincode} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Technology :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={technology} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Class :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={class_member} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Discipine :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={discipline} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Member Group :
                                        </label>
                                        <select ref={membergroup} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6">
                                            <option>Select Group</option>
                                            {
                                                membermaster.map((d, k) => (
                                                    <option value={d.groupname}>{d.id} {d.groupname}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Member Category :
                                        </label>
                                        <select ref={membercategory} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6">
                                            <option>Select Category</option>
                                            {
                                                membercate.map((d, k) => (
                                                    <option value={d.categoryname}>{d.id} {d.categoryname}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Member Type :
                                        </label>
                                        <select ref={membertype} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6">
                                            <option>Select Type</option>
                                            {
                                                membertypex.map((d, k) => (
                                                    <option value={d.typename}>{d.id} {d.typename}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div class='md:col-span-2'>
                                        <label>Interested in Membership</label>
                                        <div>
                                            <input type="checkbox" id="sevenDays" checked={selectedOption === 'sevenDays'} onChange={() => handleOptionChange('sevenDays')} /><label className='pl-2'>Free Trial for 7 Days</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="thirtyDays" checked={selectedOption === 'thirtyDays'} onChange={() => handleOptionChange('thirtyDays')} /><label className='pl-2'>Monthly</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="ninetyDays" checked={selectedOption === 'ninetyDays'} onChange={() => handleOptionChange('ninetyDays')} /><label className='pl-2'>quarterly</label>
                                        </div>
                                    </div>
                                    <div class='md:col-span-2'>
                                        <div>
                                            <input type="checkbox" onChange={() => handleResChange('Yes')} /><label className='pl-2'>Interested in  Research</label>
                                        </div>
                                        <div >
                                            <input type="checkbox" onChange={() => handleInvestChange('Yes')} /><label className='pl-2'>Interested in getting investments</label>
                                        </div>
                                        <div >
                                            <input type="checkbox" onChange={() => handleMentChange('Yes')} /><label className='pl-2' >Interested in mentoring</label>
                                        </div>
                                    </div>
                                    <div class='md:col-span-2'>
                                        <div>
                                            <input type="checkbox" onChange={() => handleStartupChange('Yes')} /><label className='pl-2' > Interested in  Startup</label>
                                        </div>
                                        <div >
                                            <label> We will wish to build more awareness about your startup spin and connect you to investor, incubator and accelerators. By selecting this option, you give consent for us to send you information in form of news letter,  whatsapp and sms and also include your name and photo in our website if needed</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start p-10 mt-6 gap-x-6 ">
                                    <button type="button" className="h-[78px] w-[300px] px-3 py-2 text-sm font-semibold text-white bg-[#D62102]  shadow-sm hover:bg-[#D62102] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[red]" onClick={() => addData()}>Submit</button>
                                </div>
                                <div class="md:w-2/1 pl-[55px] font-Manrope font-semibold pt-[30px]  p-4 text-center">
                                    <span><div className='text-[#D62102] inline'><button onClick={() => Reg()}>Go To Member Details</button> </div></span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MemberAdd



