import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router'
import { useTheme } from '../theme'

const Navbar = () => {
    const { darkMode, toggleTheme } = useTheme();
    return (
        <div className='w-full flex justify-center '>
            <div className='min-w-[400px] '>
                <div className='border-[1px] border-navbordercolor rounded-[30px] py-[5px] px-[10px] bg-navbgcol'>
                    <nav className='flex list-none cursor-pointer gap-[2px] text-navtextcol text-[15px] font-light'>
                        <NavLink to='/' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}><li className='py-[10px] px-[15px] rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>Home</li></NavLink>
                        <NavLink to='/about' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}><li className='py-[10px] px-[15px] rounded-[30px]  transition-all duration-400 active:scale-[0.96] active:duration-150'>About</li></NavLink>
                        <NavLink to='/projects' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}><li className='py-[10px] px-[15px] rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>Projects</li></NavLink>
                        <NavLink to='/certificates' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}><li className='py-[10px] px-[15px] rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>Certificates</li></NavLink>
                        <NavLink to='/contacts' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}><li className='py-[10px] px-[15px] rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150'>Contacts</li></NavLink>
                        <li className='py-[5px] px-[5px] rounded-[30px] text-navbordercolor text-[20px] '>|</li>
                        <li onClick={toggleTheme} className='py-[10px] px-[15px] rounded-[30px] hover:bg-navlihoverbgcol transition-all duration-400 '>{darkMode ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sun preview-icon"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon preview-icon w-5 h-5" ><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" /></svg>)}</li>
                        <NavLink to='/admin-sign-in' className={(e) => { return e.isActive ? "bg-navtextcol text-navlihoverbgcol rounded-[30px] " : "hover:bg-navlihoverbgcol rounded-[30px] transition-all duration-400 active:scale-[0.96] active:duration-150" }}><li className='py-[10px] px-[15px] rounded-[30px] transition-all duration-400 '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock preview-icon w-5 h-5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></li></NavLink>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navbar
