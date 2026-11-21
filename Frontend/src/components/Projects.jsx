import React, { useEffect, useState } from 'react'
import api from '../services/api'
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectPopup from './ProjectPopup.jsx';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                if (response.data.success) {
                    setProjects(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);
    let projectContent;
    if (loading) {
        projectContent = <p>Loading projects...</p>;
    }
    else if (projects.length > 0) {
        projectContent = projects.map((project) => (
            <ProjectCard
                key={project._id}
                project={project}
                onClick={() => setSelectedProject(project)}
            />
        ));
    }
    else {
        projectContent = <p>No projects available yet.</p>;
    }

    return (
        <div className=' flex flex-col w-full items-center'>
            <div className=' flex flex-col w-full max-w-[1080px] gap-[10px]'>
                <div className='toptext text-aboutskilltextcol text-[13px] '>PROJECTS</div>
                <div className='toptext text-[80px] leading-[0.9] text-navtextcol mb-[20px] font-instru italic tracking-tighter scale-y-[1.25] font-thin'>Selected work</div>
                <div className="projcardsss flex flex-wrap gap-[20px] mt-[20px]">
                    {projectContent}
                    {selectedProject && (
                        <ProjectPopup
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Projects
