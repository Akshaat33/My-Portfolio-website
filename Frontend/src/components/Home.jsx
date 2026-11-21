import React, { useEffect, useState } from 'react'
import myphoto from '../assets/img.avif'
import { Link } from 'react-router'
import { useTheme } from '../theme'
import api from '../services/api'
import ProjectPopup from './ProjectPopup'
import SkillsModal from '../componentsadmin/skillspopup';

const Home = () => {
    const [aboutData, setAboutData] = useState(null);
    const [aboutLoading, setAboutLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [skillCategories, setSkillCategories] = useState([]);
    const [showSkills, setShowSkills] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Akshat',
        tagline: 'Frontend developer building calm, fast interfaces.',
        profilepic: ''
    })
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await api.get('/addskills');
                if (response.data.success) {
                    setSkillCategories(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch skills:', error);
            }
        };
        fetchSkills();
    }, []);
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await api.get('/addcertificates');
                if (response.data.success) {
                    setCertificates(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch certificates:', error);
            }
        };
        fetchCertificates();
    }, []);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile')
                if (response.data.success) {
                    setProfile(response.data.profile);
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        }
        fetchProfile();
    }, [])
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                if (response.data.success) {
                    setProjects(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        };
        fetchProjects();
    }, []);
    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await api.get('/about');

                if (response.data.success) {
                    setAboutData(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch About information:', error);
            } finally {
                setAboutLoading(false);
            }
        };

        fetchAbout();
    }, []);
    const topThreeProjects = projects.slice(0, 3);
    const topProject = projects[0];
    const { darkMode, toggleTheme } = useTheme();
    const allSkills = skillCategories.flatMap(category => category.skills);
    const previewSkills = allSkills.slice(0, 5);
    const remainingSkills = allSkills.length - previewSkills.length;
    return (
        <div className='flex flex-col items-center w-full px-4 transition-all duration-300 gap-[10px]'>
            <div className='uppercards flex w-full max-w-[1080px] gap-[10px] '>
                <div className='upperleftcard h-[450px] overflow-hidden w-full rounded-[20px] max-w-[350px] '>
                    <img src={profile.profilepic} alt={profile.name} className='w-full h-full object-cover' />
                </div>
                <div className='upperrightcard flex flex-col h-[450px] flex-1 min-w-0 gap-[10px]'>
                    <div className='Namecard bg-navtextcol rounded-[20px] w-full w-full h-[270px]'>
                        <div className='m-[15px] flex flex-col h-[calc(100%-30px)]'>
                            <div className='uppertext text-headtextcolorlighttheme text-[12px] mb-[10px]'>PORTFOLIO</div>
                            <div className='uppertext text-mynamecol text-8xl italic font-extralight font-typecaveat'>{profile.name}</div>
                            <div className='uppertext text-namebelowtextcol mt-[10px] text-[15px] font-extralight'>{profile.tagline}</div>
                            <div className='uppertext gap-[10px] mt-auto flex'>
                                <Link to='/contacts' className=''>
                                    <div className="hiremebut bg-hirebgcol text-navtextcol cursor-pointer py-[10px] rounded-[20px] px-[10px] active:scale-[0.95] active:duration-200 transition-all duration-300">Hire Me</div>
                                </Link>
                                <div className='cursor-pointer'>
                                    {aboutData?.cv?.url ? (
                                        <a
                                            href={aboutData.cv.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                            className="cvdownload border-peachbg border-[1px] text-peachbg cursor-pointer py-[10px] rounded-[20px] px-[10px] active:scale-[0.95] active:duration-200 transition-all duration-300"
                                        >
                                            Download CV
                                        </a>
                                    ) : (
                                        <div className="cvdownload border-peachbg border-[1px] text-peachbg py-[10px] rounded-[20px] px-[10px] opacity-50">
                                            CV Coming Soon
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='AboutandSkillscard flex-2 flex gap-[10px]'>
                        <Link to='/about' className='flex-1 min-w-0'>
                            <div className='about border-[1px] border-navbordercolor h-full bg-navbgcol rounded-[30px] cursor-pointer hover:border-navtextcol hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.96] active:duration-200'>
                                <div className="aboutandskillcardcontent flex flex-col p-[20px] text-[14px] h-[100%]">
                                    <div className="aasccheading pb-[15px] text-aboutskilltextcol">ABOUT</div>
                                    <div className="aasccmid text-navtextcol">{aboutData?.aboutText?.paragraph1 || 'About information coming soon.'}</div>
                                    <div className="aascclast flex mt-auto gap-[5px] text-navtextcol">
                                        <div className="aasccltext hover:underline ">Read more</div>
                                        <div className="aascclsvg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-right preview-icon"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg></div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div onClick={() => setShowSkills(true)} className='skills border-[1px] border-navbordercolor flex-1 max-w-[100%] max-h[100%] bg-navbgcol rounded-[30px] cursor-pointer hover:border-navtextcol hover: hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.96] active:duration-200'>
                            <div className="aboutandskillcardcontent flex flex-col p-[20px] text-[14px] h-[100%]">
                                <div className="aasccheading text-aboutskilltextcol">SKILLS</div>
                                <div className="aasccmid mt-auto">
                                    <ul className='list-none text-[12px] text-navtextcol flex flex-wrap gap-[10px] '>
                                        {previewSkills.map((skill, index) => (
                                            <li
                                                key={index}
                                                className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px]'
                                            >
                                                {skill}
                                            </li>
                                        ))}
                                        {remainingSkills > 0 && (
                                            <li className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px]'>
                                                +{remainingSkills} more
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="aascclast flex mt-auto gap-[5px] text-navtextcol">
                                    <div className="aasccltext hover:underline ">Expand</div>
                                    <div className="aascclsvg"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-right preview-icon"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="midcards flex w-full max-w-[1080px] gap-[10px] ">
                <div className="projectsdisplay flex flex-col flex-1 bg-hirebgcol max-w-[100%] h-[250px] rounded-[30px] p-[20px]">
                    <div className="pdtoptext text-[14px] font-light">PROJECTS</div>
                    <div className="pdmid text-navtextcol mt-[15px]">
                        {topThreeProjects.map((project, index) => (
                            <div
                                key={project._id}
                                onClick={() => setSelectedProject(project)}
                                className={`pdmidprojcard flex justify-between border-b h-[40px] items-center ${index === 0 ? '' : 'mt-[10px]'} border-bordprojcardlinecol cursor-pointer hover:underline active:scale-[0.98] active:duration-200 transition-all`}
                            >
                                <div className="pdmidpcprojname mb-[10px] font-medium">
                                    {project.title}
                                </div>

                                <div className="pdmidpcprojstatus text-[12px] border-[1px] border-navtextcol rounded-[20px] px-[7px] py-[2px] mb-[10px] capitalize">
                                    {project.priority}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pdbottext flex mt-auto cursor-pointer active:scale-[0.99] active:duration-200 transition-all">
                        <Link to='/projects'>
                            <div className="pdbttext hover:underline">See All</div>
                        </Link>
                        <div>
                            <div className="pdbtsvg"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-right preview-icon"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg></div>
                        </div>
                    </div>
                </div>
                <div onClick={() => topProject && setSelectedProject(topProject)} className="pinnedproj flex flex-col flex-1 max-w-[100%] h-[250px] rounded-[30px] bg-navbgcol border-[1px] border-navbordercolor cursor-pointer hover:border-navtextcol hover: hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.96] active:duration-200">
                    <div className="pinnedprojimg flex-1 bg-cyan-200 overflow-hidden rounded-t-[30px]">
                        {topProject && (
                            <img
                                src={topProject.projectimage}
                                alt={topProject.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div className="pinnedprojdetails flex-1 p-[20px]">
                        <div className="topppd text-[14px] text-aboutskilltextcol">TOP PROJECT</div>
                        <div className="midppd">
                            <div className="pdmidprojcard flex justify-between h-[40px] items-center  ">
                                <div className="pdmidpcprojname mb-[10px] text-[30px] font-thin font-[cursive] text-navtextcol">{topProject?.title}</div>
                                <div className="pdmidpcprojstatus bg-hirebgcol text-[12px] rounded-[20px] px-[7px] py-[2px] mb-[10px]">{topProject?.priority}</div>
                            </div>
                        </div>
                        <div className="botppd text-quantumtextcol">{topProject?.description}</div>
                    </div>
                </div>
            </div>
            <div className="botcards flex flex-col w-full max-w-[1080px] gap-[10px]">
                <div className="botupcard flex gap-[10px]">
                    <Link to='/certificates' className='flex-1'>
                        <div className="certificates p-[20px] flex flex-col  bg-navbgcol h-[150px] rounded-[20px] border-[1px] border-navbordercolor cursor-pointer hover:border-navtextcol hover: hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.96] active:duration-200">
                            <div className='text-aboutskilltextcol text-[13px] '>CERTIFICATES</div>
                            <div className='text-[40px] font-[caveat] text-navtextcol'>{certificates.length}</div>
                            <div className='flex mt-auto gap-[5px] text-navtextcol text-[14px] text-navtextcol hover:underline'>
                                <div>View</div>
                                <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-right preview-icon"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg></div>
                            </div>
                        </div>
                    </Link>
                    <div className="flex-1">
                        <div className="education flex flex-col p-[20px] bg-navbgcol h-[150px] rounded-[20px] border-[1px] border-navbordercolor ">
                            <div className='text-aboutskilltextcol text-[13px] '>EDUCATION</div>
                            <div className='text-[40px] font-[caveat] text-navtextcol'>{aboutData?.education?.degree || 'Education'}</div>
                            <div className='text-navtextcol text-[14px] mt-auto text-quantumtextcol'>{aboutData?.education?.institute || 'Institute'}</div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="learningnow p-[20px] flex flex-col bg-navbgcol h-[150px] rounded-[20px] border-[1px] border-navbordercolor ">
                            <div className='text-aboutskilltextcol text-[13px] '>LEARNING NOW</div>
                            <div className='learningnowsmallcards font-[caveat] mt-auto'>
                                <ul className='list-none text-[12px] text-navtextcol flex flex-wrap gap-[10px] '>
                                    {(aboutData?.learningNow || []).map((skill, index) => (
                                        <li
                                            key={index}
                                            className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px]'
                                        >
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='text-navtextcol text-[14px] mt-auto text-quantumtextcol'>Heading towards full-stack</div>
                        </div>
                    </div>
                </div>
                <div className="botdowncard flex gap-[10px]">
                    <div className='links flex-1 p-[20px] flex flex-col bg-navbgcol h-[120px] rounded-[20px] border-[1px] border-navbordercolor '>
                        <div className=" text-aboutskilltextcol text-[13px] ">CONNECT ON</div>
                        <div className="listcontactbdc mt-[15px]">
                            <ul className='list-none text-[15px] text-navtextcol flex flex-wrap gap-[10px] '>
                                {aboutData?.links?.linkedin && (
                                    <li
                                        onClick={() => window.open(aboutData.links.linkedin, '_blank', 'noopener,noreferrer')}
                                        className='cursor-pointer border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px] hover:border-navtextcol hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.9] active:duration-200'
                                    >
                                        LinkedIn
                                    </li>
                                )}
                                {aboutData?.links?.github && (
                                    <li
                                        onClick={() => window.open(aboutData.links.github, '_blank', 'noopener,noreferrer')}
                                        className='cursor-pointer border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px] hover:border-navtextcol hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.9] active:duration-200'
                                    >
                                        GitHub
                                    </li>
                                )}
                                {aboutData?.links?.gmail && (
                                    <li
                                        className='cursor-pointer border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px] hover:border-navtextcol hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.9] active:duration-200'
                                    >
                                        <a href={`mailto:${aboutData.links.gmail}`}>
                                            Gmail
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="active p-[20px] flex flex-1 bg-navbgcol h-[120px] rounded-[20px] border-[1px] border-navbordercolor gap-[10px] item-center">
                        <div className='rounded-full bg bg-green-600 h-[10px] w-[10px] animate-pulse [animation-duration:1s] mt-[6px]'>
                        </div>
                        <div className='text-navtextcol text-[14px]'>Open to Work</div>
                    </div>
                    <div onClick={toggleTheme} className="theme-mode p-[20px] flex flex-1 bg-navbgcol h-[120px] rounded-[20px] border-[1px] border-navbordercolor gap-[10px] text-navtextcol text-[14px] cursor-pointer hover:border-navtextcol hover: hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.96] active:duration-200">
                        <div>{darkMode ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sun preview-icon"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon preview-icon w-5 h-5" ><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" /></svg>)}</div>
                        <div>{darkMode ? ('Light Mode') : ('Dark Mode')}</div>
                    </div>
                </div>
            </div>
            <Link to='/contacts' className='w-full max-w-[1080px]'>
                <div className="contactcard flex flex-col bg-navtextcol rounded-[30px] p-[20px] cursor-pointer hover:border-navtextcol hover: hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.96] active:duration-200">
                    <div className='text-contacttextcol text-[14px]'>CONTACT</div>
                    <div className='text-hirebgcol text-[40px] font-[cursive] font-thin'>Let's Build Something</div>
                    <div className='flex gap-[5px] text-peachbg'>
                        <div>
                            Say Hello
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-right preview-icon"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg>
                        </div>
                    </div>
                </div>
            </Link>
            {selectedProject && (
                <ProjectPopup
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
            {showSkills && (
                <SkillsModal
                    categories={skillCategories}
                    onClose={() => setShowSkills(false)}
                />
            )}
        </div>
    )
}

export default Home 