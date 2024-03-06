import React, { useEffect,useRef,useState} from 'react';
import axios from 'axios';
import login from './loginimg.png'
import { useNavigate } from 'react-router-dom';
const MemberUpdate = () => {
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
const [ids,setId]=useState();
    useEffect(() => {
        const id = localStorage.getItem("member_id");
        setId(id)

        if (id) {
          GetMember(id);
        } 
        getGeolocation();
      }, []);
    
      const GetMember = (id) => {
        axios({
          url: `http://localhost:3001/api/members/${id}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
         console.log(res.data)
         member_name.current.value = res.data.member_name;
         member_code.current.value = res.data.member_code;
         member_phone.current.value = res.data.member_phone;
         member_email.current.value = res.data.member_email;
         member_password.current.value = res.data.member_password;
         photo_image.current.value = res.data.photo_image;
         resume.current.value = res.data.resume;
         id_card_proof.current.value = res.data.id_card_proof;
         other_documents.current.value = res.data.other_documents;
         geolocation.current.value = res.data.geolocation;
         specialisation.current.value = res.data.specialisation;
         address.current.value = res.data.address;
         city.current.value = res.data.city;
         state.current.value = res.data.state;
         pincode.current.value = res.data.pincode;
         technology.current.value = res.data.technology;
         roll_number.current.value = res.data.roll_number;
         class_member.current.value = res.data.class_member;
         discipline.current.value = res.data.discipline;
         membergroup.current.value = res.data.membergroup;
         membercategory.current.value = res.data.membercategory;
         membertype.current.value = res.data.membertype;
        }).catch((error) => {
          console.error('Error fetching member:', error);
        });
      };
    
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
            discipine: discipline.current.value,
            membergroup: membergroup.current.value,
            membercategory: membercategory.current.value,
            membertype: membertype.current.value
        };
        console.log(playload);
        var id=ids;
        axios({
            url: `http://localhost:3001/api/update/member/${id}`,
            method: 'PUT',
            data: playload,
            contentType: 'application/json',
        }).then((res) => {
            alert('Update sucessfully');
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
                                            <input type='text' ref={member_password} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
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

                                    {/*  */}
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
                                    {/*  */}
                                    <div className="sm:col-span-1">
                                        <label htmlFor="geolocation" className="block text-sm font-medium leading-6 text-gray-900">
                                            Geolocation:
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" id="geolocation" ref={geolocation} value={geolocationValue} onChange={() => { }} className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 read-only"/>
                                        </div>
                                    </div>
                                    {/*  */}

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
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Roll Number :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={roll_number} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
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
                                        <div className="mt-2">
                                            <input type="text" ref={membergroup} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Member Category :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={membercategory} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Member Type :
                                        </label>
                                        <div className="mt-2">
                                            <input type="text" ref={membertype} className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start p-10 mt-6 gap-x-6 ">
                                    <button type="button" className="h-[78px] w-[300px] px-3 py-2 text-sm font-semibold text-white bg-[#D62102]  shadow-sm hover:bg-[#D62102] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[red]" onClick={() => addData()}>Update</button>
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

export default MemberUpdate
