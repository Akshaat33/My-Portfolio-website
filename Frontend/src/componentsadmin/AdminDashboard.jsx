import React from 'react'
import Adminnavbar from './Adminnavbar'
import { Outlet } from 'react-router'

function AdminDashboard() {
  return (
    <>
    <div className='max-w-full flex justify-center h-screen'>

      <div className='w-full max-w-[1080px] flex gap-[20px] mt-[20px]'>
        <div className=' flex-5 '>
            <Adminnavbar/>
        </div>
        <div className=' flex-15'>
            <Outlet/>
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard