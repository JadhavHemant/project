import React from 'react'
import sideimg from './Image/Frame.png'
const Explore = () => {
    return (
        <>
            <div className='flex pt-10 h-[1063px]'>
                <div class="flex-1 w-64 p-[100px] text-[40px] font-semibold font-manrope">
                    <span>
                        <div className='inline text-[#D62102]'>Eager to Explore the Future Landscape of </div><div className='inline text-[#B5B5B5]'>Startup Ecosystems?</div> </span>
                    <div className='text-[20px] font-normal pt-[40px] pb-[80px]'>
                        We are ensure startups, small businesses run effectively in optimized costs and improved productivity in lean phases and help build startups / manage startups in a very lean way.
                    </div>
                    <div className='text-[20px] pt-4'>
                        <input type='btutton' value="Learn More" className='w-[190px] bg-[#D62102] rounded-[5px] text-center p-3 text-[#fdfdfd] shadow-custom' />
                    </div>
                </div>
                <div className='flex-1 pt-[50px] pb-[50px] h-[500px] w-[494px]'>
                    <img src={sideimg} alt="img" />
                </div>
            </div>
        </>
    )
}

export default Explore
