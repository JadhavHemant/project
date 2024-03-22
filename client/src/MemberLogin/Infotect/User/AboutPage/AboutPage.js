import React from 'react'
import imagex from './Image/imagelogo.png'
import FocusArea from './FocusArea/FocusArea'
import Explore from './Explore/Explore'
import Vision from './Vision/Vision'
const AboutPage = () => {
    return (
        <>
            <div className='bg-[#F7F7F7] flex'>
                <div class="flex-1 w-64 p-[80px] text-[40px] font-semibold">
                    <div className='font-manrope'>
                        Revolutionization Research in 
                    </div>
                    <div className='text-[#D62102]'>Enterpreneurship,</div>
                    <span><div className='inline text-[#B5B5B5]'>Management,</div>and</span>
                    <div className='text-[#D62102] pb-4'>Technology</div>
                    <div className='text-[20px] pt-4'>
                        <input type='btutton' value="Get In Touch" className='w-[190px] bg-[#D62102] rounded-[5px] text-center p-3 text-[#fdfdfd] shadow-custom'/>
                    </div>
                </div>
                <div className='flex-1 w-64 pt-[50px] pb-[50px]'>
                    <img src={imagex} alt="img" />
                </div>
            </div>
            <FocusArea/>
            <Explore/>
            <Vision/>
        </>
    )
}

export default AboutPage
