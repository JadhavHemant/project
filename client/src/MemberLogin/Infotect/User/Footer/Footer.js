import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="flex justify-center items-center text-center">
                <div className="flex">
                    <div className="h-5 w-5 bg-blue-500 rounded-full animate-bounce mr-1" style={{ animationDelay: '0.5s' }}></div>
                    <div className="h-5 w-5 bg-red-500 rounded-full animate-bounce mr-1" style={{ animationDelay: '1s' }}></div>
                    <div className="h-5 w-5 bg-green-500 rounded-full animate-bounce mr-1" style={{ animationDelay: '1.5s' }}></div>
                </div>
            </div>
        </>
    )
}

export default Footer