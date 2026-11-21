import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Certificate from './components/Certificate'
import Projects from './components/Projects'
import Contacts from './components/Contacts'
import Admin from './components/Admin'
import { createBrowserRouter, RouterProvider, Outlet, } from 'react-router'
import AdminDashboard from './componentsadmin/AdminDashboard'
import AdminProtectedRoute from './componentsadmin/AdminProtectedRoute'
import AddSkills from './componentsadmin/AddSkills'
import AddCertificate from './componentsadmin/AddCertificates'
import AddProjects from './componentsadmin/AddProjects'
import Overview from './componentsadmin/Overview'
import Profile from './componentsadmin/Profile'
import AdminProjects from './componentsadmin/AdminProjects'
import ChangeAbout from './componentsadmin/ChangeAbout'
import ShowMessage from './componentsadmin/ShowMessage'


function Layout() {
  return (
    <>
      <div className='min-h-screen max-w-full'>
        <div className="flex flex-col mt-[20px] mb-[15px]  w-full sticky top-[20px]">
          <Navbar />
        </div>
        <div className='flex flex-col'>
          <Outlet />
        </div>
        <div className=' flex w-full w-[1080px] justify-center text-[14px] pt-[50px] pb-[30px] text-gray-500'>
          <footer>© 2026 Akshat</footer>
        </div>
      </div>
    </>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/admin-sign-in", element: <Admin /> },
        { path: "/projects", element: <Projects /> },
        { path: "/certificates", element: <Certificate /> },
        { path: "/about", element: <About /> },
        { path: "/contacts", element: <Contacts /> },
      ],
    },
    {
      element: <AdminProtectedRoute />,
      children: [
        {
          path: "/admin/dashboard",
          element: <AdminDashboard />,
          children: [
            { index: true , element:<Overview/>},
            { path: "adminprojects", element: <AdminProjects /> },
            { path: "addprojects", element: <AddProjects /> },
            { path: "addcertificates", element: <AddCertificate /> },
            { path: "addskills", element: <AddSkills /> },
            { path: "profile", element: <Profile /> },
            { path: "changeabout", element: <ChangeAbout /> },
            { path: "showmessage", element: <ShowMessage /> },
          ]
        }
      ]
    },
  ])
  return <RouterProvider router={router} />
}

export default App
