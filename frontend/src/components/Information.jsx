import React from 'react'
import back from '../assets/images/green.jpg';

const Information = () => {
  return (
    <>
    <div className='px-4 md:px-20  w-full flex flex-col md:flex-row h-[100vh]'
        style={{ backgroundImage: `url(${back})`, backgroundSize: "cover" }}>

        <div className='w-[40%] px-4'>
            <h1 className='text-[3.5rem] font-bold '>Why polution should be controll ?</h1>
            <p className='mt-4 text-[1.5rem]'>Pollution must be controlled to protect our health, preserve ecosystems, and ensure a sustainable future. It contaminates the air we breathe, the water we drink, and the land we depend on for food. Unchecked pollution leads to climate change, biodiversity loss, and severe health issues, making it crucial to take immediate action.</p>
        </div>

        <img className='w-[60%] h-[65vh] object-cover ' src="https://img.freepik.com/free-photo/factory-producing-co2-pollution_23-2150858215.jpg?t=st=1724092268~exp=1724095868~hmac=8a434ce57ed0b0b56b9e1f4cfdf1639095e56eb8127e6cc543df4c8412dc5870&w=1380" alt="" />

    </div>
    </>
  )
}

export default Information