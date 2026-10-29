import React from 'react'
import { useNavigate } from 'react-router'
import { useForge } from '../hooks/useForge.js'

const Dashborad = () => {

  const navigate = useNavigate()
  const { handlePreviewUrl } = useForge()


  const handleStartButton = async () => {
    await handlePreviewUrl()
    navigate('/sandboxUi')
  }


  return (
    <div className='h-full w-full '>
      {/* navbar */}
      <div className='bg-[#161B22]  h-[10vh] w-full px-8 flex justify-between items-center'>
        {/* logo name  */}
        <div className='flex items-center gap-2'>
          <h1 className='text-white font-sans font-bold rotate-0 text-2xl' >Forge</h1>
        </div>
        {/* start button */}
        <button className='bg-[#238636] text-white font-sans px-4 py-1 rounded font-semibold hover:bg-[#2ea043] cursor-pointer'
          onClick={() => {
            handleStartButton()
          }}
        >Start</button>
      </div>

      {/* hero section */}
      <div className='bg-[#0D1117] h-[80vh] w-full flex'>
        {/* left hero section */}
        <div className='h-full w-1/1 px-5'>
          <div className='h-1/2 flex justify-start items-center'>
            <div>
              <h1 className='font-bold text-white text-7xl'>Say it.</h1>
              <div className='flex font-bold text-white text-7xl gap-2 mt-2'><h1 className='rotate-355 bg-[#238636]'>Forge</h1><span>it.</span></div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-start gap-10'>
            <p className='text-white font-sans '>Forge is a sandbox where you describe an interface in <br /> plain words and AI builds it in React. See the result live, <br />   read the code, and keep editing until it feels right.</p>

            <button className='bg-[#238636] text-white font-sans px-7 py-3 rounded font-semibold hover:bg-[#2ea043] cursor-pointer'>Start a new project</button>
          </div>
        </div>

        {/* right hero section */}
        <div className='flex justify-center items-center w-full h-full '>
          <div className='bg-[#161B22] w-110 border py-3 px-5 border-white font-mono text-sm '>
            <div className="text-white">you &gt; a pricing page with 3 plans</div>
            <div className="text-green-400">forge &gt; creating Pricing.jsx</div>
            <div className="text-green-400">forge &gt; creating PlanCard.jsx</div>
            <div className="text-green-400">forge &gt; preview ready</div>
            <div className='flex items-center gap-2 mt-2'>
              <span className="text-green-400 border rounded-2xl px-3 font-sm ">live</span> <div class="w-2 h-4 bg-white animate-pulse"></div> </div>
          </div>
        </div>
      </div>

      {/* footer section */}
      <footer>
        <div className='bg-[#0D1117] h-[10vh] w-full text-white flex justify-between items-center border-t px-10 text-sm' >
          <p>© 2026 Himanshu. All rights reserved.</p>
          <p>Built with React + AI</p>
        </div>
      </footer>
    </div>
  )
}

export default Dashborad