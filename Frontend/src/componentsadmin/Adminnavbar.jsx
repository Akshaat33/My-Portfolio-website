import React from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router'
import { useTheme } from '../theme'

const Adminnavbar = () => {
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post(
                'http://localhost:5000/api/auth/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
        } catch (error) {
            console.log('Logout request failed:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/admin-sign-in');
        }
    };
    return (
        <div className='border-[1px] border-navbordercolor p-[10px] bg-navbgcol rounded-[20px]'>
            <div className="title text-[30px] text-navtextcol font-instru italic mb-[20px]">Admin</div>
            <div className="flex">
                <nav className='list-none flex flex-col w-full text-navtextcol'>
                    <NavLink to='/admin/dashboard' end className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}>
                        <li className='flex w-full justify-center py-[10px] gap-[10px] items-center rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>
                            <div className="svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>window</title><path fill="currentColor" d="M13 13h8v6q0 .825-.587 1.413T19 21h-6zm0-2V3h6q.825 0 1.413.588T21 5v6zm-2 0H3V5q0-.825.588-1.412T5 3h6zm0 2v8H5q-.825 0-1.412-.587T3 19v-6z" /></svg>
                            </div>
                            <div className="text">Overview</div>
                        </li>
                    </NavLink>
                    <NavLink to='/admin/dashboard/adminprojects' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}>
                        <li className='flex w-full justify-center py-[10px] gap-[10px] items-center rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>
                            <div className="svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>folder-outline-rounded</title><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20zm0-2h16V8h-8.825l-2-2H4zm0 0V6z" /></svg>
                            </div>
                            <div className="text">Projects</div>
                        </li>
                    </NavLink>
                    <NavLink to='/admin/dashboard/addprojects' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}>
                        <li className='flex w-full justify-center py-[10px] gap-[10px] items-center rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>
                            <div className="svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>upload</title><path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" /></svg>
                            </div>
                            <div className="text">Add Projects</div>
                        </li>
                    </NavLink>
                    <NavLink to='/admin/dashboard/addcertificates' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}>
                        <li className='flex w-full justify-center py-[10px] gap-[10px] items-center rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>
                            <div className="svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>certificate</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 15a3 3 0 1 0 6 0a3 3 0 1 0-6 0" /><path d="M13 17.5V22l2-1.5l2 1.5v-4.5" /><path d="M10 19H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-1 1.73M6 9h12M6 12h3m-3 3h2" /></g></svg>
                            </div>
                            <div className="text">Certificates</div>
                        </li>
                    </NavLink>
                    <NavLink to='/admin/dashboard/addskills' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}>
                        <li className='flex w-full justify-center py-[10px] gap-[10px] items-center rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>
                            <div className="svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>tag-outline</title><path fill="currentColor" d="m21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M13 20l-9-9V4h7l9 9M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5" /></svg>
                            </div>
                            <div className="text">Skills</div>
                        </li>
                    </NavLink>
                    <NavLink to='/admin/dashboard/profile' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}>
                        <li className='flex w-full justify-center py-[10px] gap-[10px] items-center rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>
                            <div className="svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>user-outline-regular</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 8a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" /><path d="M5 21a7 7 0 0 1 14 0" /></g></svg>
                            </div>
                            <div className="text">Profile</div>
                        </li>
                    </NavLink>
                    <NavLink to='/admin/dashboard/changeabout' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}>
                        <li className='flex w-full justify-center py-[10px] gap-[10px] items-center rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>
                            <div className="svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>user-outline-regular</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 8a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" /><path d="M5 21a7 7 0 0 1 14 0" /></g></svg>
                            </div>
                            <div className="text">About and More</div>
                        </li>
                    </NavLink>
                    <NavLink to='/admin/dashboard/showmessage' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}>
                        <li className='flex w-full justify-center py-[10px] gap-[10px] items-center rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>
                            <div className="svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>user-outline-regular</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 8a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" /><path d="M5 21a7 7 0 0 1 14 0" /></g></svg>
                            </div>
                            <div className="text">Messages</div>
                        </li>
                    </NavLink>
                    <NavLink to='/' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}>
                        <li className=' flex w-full justify-center py-[10px] gap-[10px] items-center rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>
                            <div className="svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>eye</title><path fill="currentColor" d="M11.5 18c4 0 7.46-2.22 9.24-5.5C18.96 9.22 15.5 7 11.5 7s-7.46 2.22-9.24 5.5C4.04 15.78 7.5 18 11.5 18m0-12c4.56 0 8.5 2.65 10.36 6.5C20 16.35 16.06 19 11.5 19S3 16.35 1.14 12.5C3 8.65 6.94 6 11.5 6m0 2C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9" /></svg>
                            </div>
                            <div className="text">View Public Site</div>
                        </li>
                    </NavLink>
                    <li onClick={toggleTheme} className='flex w-full justify-center gap-[10px] py-[10px] px-[15px] rounded-[30px] hover:bg-navlihoverbgcol transition-all duration-400 '>
                        <div>{darkMode ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sun preview-icon"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon preview-icon w-5 h-5" ><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" /></svg>)}</div>
                        <div>{darkMode ? ('Light Mode') : ('Dark Mode')}</div>
                    </li>
                    <li onClick={handleLogout} className='cursor-pointer flex w-full justify-center gap-[10px] py-[10px] px-[15px] rounded-[30px] hover:bg-navlihoverbgcol transition-all duration-400'>
                        <div className="svg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>sign-out-duotone</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="m18 15l3-3m0 0l-3-3m3 3H7m7 4v2.6a2.4 2.4 0 0 1-2.4 2.4H5.4A2.4 2.4 0 0 1 3 18.6V5.4A2.4 2.4 0 0 1 5.4 3h6.2A2.4 2.4 0 0 1 14 5.4V8" /></svg>
                        </div>
                        <div className="text">Sign Out</div>
                    </li>
                </nav>
            </div>
        </div>
    )
}

export default Adminnavbar
