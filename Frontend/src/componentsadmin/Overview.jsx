import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import api from '../services/api'

const Overview = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    skills: 0
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, certificatesRes, skillsRes] = await Promise.all([
          api.get('/projects'),
          api.get('/addcertificates'),
          api.get('/addskills')
        ]);
        setProjects(projectsRes.data.data);
        const totalSkills = skillsRes.data.data.reduce(
          (total, category) => total + category.skills.length,
          0
        );
        setStats({
          projects: projectsRes.data.data.length,
          certificates: certificatesRes.data.data.length,
          skills: totalSkills
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    fetchStats();
  }, []);
  const topThreeProjects = projects.slice(0, 3);
  return (
    <div className='overview flex flex-col w-full text-navtextcol'>

      <div className='toptext text-aboutskilltextcol text-[13px] tracking-[0.12em]'>ADMIN</div>
      <div className='toptext font-instru italic tracking-tighter text-[56px] leading-[1] mt-[6px] mb-[10px]'>Overview</div>

      <div className='stats grid grid-cols-1 sm:grid-cols-3 gap-[12px] mt-[10px]'>
        <div className='statcard bg-navbgcol border-[1px] border-navbordercolor rounded-[20px] p-[16px]'>
          <div className='statnumber font-instru italic text-[44px] leading-[1]'>{stats.projects}</div>
          <div className='statlabel text-[14px] text-quantumtextcol'>Projects</div>
        </div>
        <div className='statcard bg-navbgcol border-[1px] border-navbordercolor rounded-[20px] p-[16px]'>
          <div className='statnumber font-instru italic text-[44px] leading-[1]'>{stats.certificates}</div>
          <div className='statlabel text-[14px] text-quantumtextcol'>Certificates</div>
        </div>
        <div className='statcard bg-navbgcol border-[1px] border-navbordercolor rounded-[20px] p-[16px]'>
          <div className='statnumber font-instru italic text-[44px] leading-[1]'>{stats.skills}</div>
          <div className='statlabel text-[14px] text-quantumtextcol'>Skills</div>
        </div>
      </div>

      <div className='shownonhome mt-[28px]'>
        <div className='toptextskills text-[20px]'>Shown on Home</div>
        <div className='text-[14px] text-quantumtextcol mt-[8px]'>
          The Home bento shows the first three projects after sorting by priority, then by your drag order.
        </div>

        <ol className='homelist list-decimal pl-[22px] mt-[12px] flex flex-col gap-[8px] text-[16px]'>
          {topThreeProjects.map((project) => (
            <li key={project._id}>
              {project.title}
              <span className={`ml-[8px] text-[12px] px-[10px] py-[2px] rounded-[20px] ${project.priority === 'pinned'
                  ? 'bg-hirebgcol text-navtextcol'
                  : 'bg-peachbg border-[1px] border-navbordercolor text-navtextcol'
                }`}>
                {project.priority}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className='buttons flex flex-wrap gap-[10px] mt-[24px]'>
        <Link to='/admin/dashboard/addprojects'>
          <button className='uploadbutton flex items-center gap-[10px] bg-navtextcol text-peachbg px-[24px] py-[12px] rounded-full cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M12 5v14M5 12h14' />
            </svg>
            Upload project
          </button>
        </Link>
        <Link to='/admin/dashboard/adminprojects'>
          <button className='reorderbutton border-[1px] border-navtextcol text-navtextcol px-[24px] py-[12px] rounded-full cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
            Reorder projects
          </button>
        </Link>
      </div>

    </div>
  )
}

export default Overview
