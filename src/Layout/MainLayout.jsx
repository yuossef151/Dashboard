import { Sidebar } from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'

export default function MainLayout() {
  return (
    <>
      <div className="flex min-h-screen">
      <div className="">
        <SideBar />
      </div>
      
      <div className="flex-1 ">
        <Outlet /> 
      </div>
    </div>
    </>
  )
}
