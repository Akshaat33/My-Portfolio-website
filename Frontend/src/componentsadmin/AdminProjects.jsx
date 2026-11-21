import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/projects');
      setProjects(response.data.data);
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to fetch projects.'
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  const priorityGroups = [
    { key: 'pinned', label: 'PINNED' },
    { key: 'featured', label: 'FEATURED' },
    { key: 'normal', label: 'NORMAL' },
  ];
  const changePriority = (projectId, newPriority) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project._id === projectId
          ? { ...project, priority: newPriority }
          : project
      )
    );
  };
  const moveProject = (groupKey, index, direction) => {
    setProjects(prevProjects => {
      const groupProjects = prevProjects.filter(
        project => (project.priority || 'normal') === groupKey
      );
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= groupProjects.length) {
        return prevProjects;
      }
      const reorderedGroup = [...groupProjects];
      [
        reorderedGroup[index],
        reorderedGroup[targetIndex]
      ] = [
          reorderedGroup[targetIndex],
          reorderedGroup[index]
        ];
      let groupIndex = 0;
      return prevProjects.map(project => {
        if ((project.priority || 'normal') === groupKey) {
          return reorderedGroup[groupIndex++];
        }
        return project;
      });
    });
  };
  const saveChanges = async () => {
    try {
      setSaving(true);
      setError('');
      setMessage('');
      // Arrange all projects in their group order
      const orderedProjects = priorityGroups.flatMap(group =>
        projects.filter(
          project => (project.priority || 'normal') === group.key
        )
      );
      // Save each project's priority
      await Promise.all(
        orderedProjects.map(project =>
          api.put(`/projects/${project._id}`, {
            priority: project.priority || 'normal'
          })
        )
      );
      // Save the overall project ordering
      await api.put('/projects/reorder', {
        projectIds: orderedProjects.map(project => project._id)
      });
      setProjects(orderedProjects);
      setMessage('Changes saved successfully.');
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to save changes.'
      );
    } finally {
      setSaving(false);
    }
  };
  const deleteProject = async (projectId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this project?'
    );
    if (!confirmed) return;
    try {
      setError('');
      setMessage('');
      await api.delete(`/projects/${projectId}`);
      setProjects(prevProjects =>
        prevProjects.filter(project => project._id !== projectId)
      );
      setMessage('Project deleted successfully.');
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to delete project.'
      );
    }
  };
  let projectContent;
  if (loading) {
    projectContent = (
      <p className='mt-[24px] text-quantumtextcol'>
        Loading projects...
      </p>
    );
  }
  else if (error) {
    projectContent = (
      <p className='mt-[24px] text-red-500'>
        {error}
      </p>
    );
  }
  else if (projects.length === 0) {
    projectContent = (
      <p className='mt-[24px] text-quantumtextcol'>
        No projects uploaded yet.
      </p>
    );
  }
  else {
    projectContent = (
      <div className='flex flex-col gap-[24px] mt-[22px]'>
        {priorityGroups.map((group) => {
          const groupProjects = projects.filter(
            project => (project.priority || 'normal') === group.key
          );
          return (
            <div key={group.key}>
              <div className='groupheader flex items-center gap-[10px] mb-[10px]'>
                <div className='text-[13px] tracking-[0.12em] text-quantumtextcol'>
                  {group.label}
                </div>
                <div className='text-[13px] bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[1px] rounded-[20px]'>
                  {groupProjects.length}
                </div>
              </div>
              <div className='projectlist flex flex-col gap-[8px]'>
                {groupProjects.map((project, index) => (
                  <div
                  key={project._id}
                    className='projectrow flex flex-wrap items-center gap-[14px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] px-[16px] py-[10px]'
                  >
                    {/* Your existing SVG and row structure */}

                    <svg className='draghandle cursor-grab text-quantumtextcol shrink-0' width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                      <circle cx='8' cy='5' r='1.8' /><circle cx='16' cy='5' r='1.8' />
                      <circle cx='8' cy='12' r='1.8' /><circle cx='16' cy='12' r='1.8' />
                      <circle cx='8' cy='19' r='1.8' /><circle cx='16' cy='19' r='1.8' />
                    </svg>

                    <img
                      src={project.projectimage}
                      alt={project.title}
                      className='projectthumb w-[48px] h-[38px] rounded-[10px] object-cover shrink-0'
                    />

                    <div className='projectinfo flex flex-col gap-[6px] grow min-w-[160px]'>
                      <div className='flex items-center gap-[8px]'>
                        <div className='projecttitle text-[17px] leading-[1]'>{project.title}</div>
                        {project.placement === 'top' && (
                          <div className='onhomepill bg-navtextcol text-peachbg text-[12px] px-[8px] py-[1px] rounded-[20px]'>
                            On Home
                          </div>
                        )}
                      </div>
                      <div className='tags flex flex-wrap gap-[6px]'>
                        {project.tags?.map((tag, index) => (
                          <div
                            key={`${project._id}-${tag}-${index}`}
                            className='tag bg-peachbg border-[1px] border-navbordercolor px-[12px] py-[1px] rounded-[20px] text-[13px]'
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='projectcontrols flex items-center gap-[14px] ml-auto'>
                      <div className='relative'>
                        <select value={project.priority || 'normal'} onChange={(e) => changePriority(project._id, e.target.value)} className='priorityselect appearance-none bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] pl-[14px] pr-[34px] py-[8px] text-[14px] text-navtextcol cursor-pointer outline-none'>
                          <option value="pinned">Pinned</option>
                          <option value="featured">Featured</option>
                          <option value="normal">Normal</option>
                        </select>
                        <svg className='pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M6 9l6 6 6-6' /></svg>
                      </div>
                      <button disabled={index === 0} onClick={() => moveProject(group.key, index, -1)} className={`moveup cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] ${index === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-[2px]'}`}>
                        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M6 15l6-6 6 6' /></svg>
                      </button>
                      <button disabled={index === groupProjects.length - 1} onClick={() => moveProject(group.key, index, 1)} className={`movedown cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] ${index === groupProjects.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-[2px]'}`}>
                        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M6 9l6 6 6-6' /></svg>
                      </button>
                      <button onClick={() => deleteProject(project._id)} className='deleteproject cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95]'>
                        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6' /></svg>
                      </button>
                    </div>
                  </div>
                ))}
                {groupProjects.length === 0 && (
                  <p className='text-[14px] text-quantumtextcol'>
                    No projects in this group.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );

  }
  return (
    <div className='projects flex flex-col w-full text-navtextcol'>

      <div className='toptext text-aboutskilltextcol text-[12px] tracking-[0.12em]'>ADMIN</div>
      <div className='toptext font-instru italic tracking-tighter text-[48px] leading-[1] mt-[4px] mb-[10px]'>Projects</div>
      <div className='text-[15px] text-quantumtextcol max-w-[800px]'>
        Manage project priorities and display order. Use the arrows to rearrange projects within each group.
      </div>
      {projectContent}
      {message && (
        <p className='text-green-600 text-[14px] mt-[14px]'>
          {message}
        </p>
      )}
      {error && (
        <p className='text-red-500 text-[14px] mt-[14px]'>
          {error}
        </p>
      )}

      <button onClick={saveChanges} disabled={saving} className='savebutton flex items-center gap-[8px] w-fit mt-[18px] bg-navtextcol text-peachbg px-[22px] py-[10px] rounded-full text-[15px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
        <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M5 12l5 5L20 7' />
        </svg>
        {saving ? 'Saving...' : 'Save changes'}
      </button>

    </div>
  )
}

export default Projects
