import React from 'react'
import PreviewScreen from '../componets/PreviewScreen.jsx'

const sandboxUi = () => {
    return (
        <div className='h-screen w-full bg-[#161B22] flex justify-center items-center' >
            {/* aside bar */}
            <div className='h-full w-[20%] bg-red-200'>
                hi</div>
            {/* center */}
            <div className=' h-full w-[50%  ] bg-black'>
                {/* preview screen */}
                <div>
                    <PreviewScreen />
                </div>
                {/* terminal screen */}
                <div></div>
            </div>
            {/* right  */}
            <div className='h-full w-[30%] bg-red-200'>
                hi</div>
        </div>
    )
}

export default sandboxUi