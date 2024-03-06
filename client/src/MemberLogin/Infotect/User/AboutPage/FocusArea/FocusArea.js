import React from 'react'
import logo from './Logos/logo1.png'
import logo2 from './Logos/logo2.png'
import logo3 from './Logos/logo3.png'
import logo4 from './Logos/logo4.png'

const FocusArea = () => {
    return (
        <>
            <div className='pt-[100px]'>
                <h1 className='text-[64px] font-manrope text-center font-bold text-[#D62102] '>STRATEGIC FOCUS AREAS</h1>
            </div>
            <div class="flex justify-between pt-[50px] pl-[100px] pr-[100px] text-[20px] font-bold text-[#414141] pb-[40px]">
                <div class="flex-initial w-64 h-14">
                    <div class="flex flex-col items-center">
                        <img src={logo} alt='logo1' />
                        <h3>Research and Development</h3>
                    </div>
                </div>
                <div class="flex-initial w-64">
                    <div class="flex flex-col items-center">
                        <img src={logo2} alt='logo1' />
                        <h3>Product Launch</h3>
                    </div>
                </div>
                <div class="flex-initial w-64">
                    <div class="flex flex-col items-center">
                        <img src={logo3} alt='logo1' />
                        <h3>Business Development</h3>
                    </div>
                </div>
                <div class="flex-initial w-64">
                    <div class="flex flex-col items-center">
                        <img src={logo4} alt='logo1' />
                        <h3>Skills Development</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FocusArea
