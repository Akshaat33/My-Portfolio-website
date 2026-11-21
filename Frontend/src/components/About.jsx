import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import api from '../services/api'

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [skillCategories, setSkillCategories] = useState([]);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            }
        };
        fetchAbout();
    }, []);
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
    return (
        <div className=' flex flex-col w-full items-center'>
            <div className=' flex flex-col w-full max-w-[1080px] '>
                <div className='toptext text-aboutskilltextcol text-[13px] '>ABOUT</div>
                <div className='flex h-[650px] mt-[15px] gap-[10px]'>
                    <div className="text flex-3 ">
                        <div className="toptext text-[80px] leading-[0.9] text-navtextcol mb-[30px] font-typecaveat">{aboutData?.aboutText?.headline || 'About me'}</div>
                        <div className="midtext flex flex-col gap-[15px] text-navtextcol">
                            <div className="midtextA ">{aboutData?.aboutText?.paragraph1 || ''}</div>
                            <div className="midtextB">{aboutData?.aboutText?.paragraph2 || ''}</div>
                        </div>
                        <div className="bottomtext flex mt-[20px] gap-[10px]">
                            <div>
                                <a href={aboutData?.cv?.url || '#'} target="_blank" rel="noopener noreferrer" download className='border-[1px] border-navtextcol px-[15px] py-[10px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.9] active:duration-200 rounded-[30px] bg-navtextcol text-peachbg inline-flex items-center justify-center'>{aboutData?.cv?.url ? 'Download CV' : 'CV Coming Soon'}</a>
                            </div>
                            <Link to='/contacts'>
                                <div className='border-[1px] border-navtextcol px-[15px] py-[10px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.9] active:duration-200 inline-flex items-center justify-center rounded-[30px] text-navtextcol '>Get in touch</div>
                            </Link>
                        </div>
                    </div>
                    <div className="skillblock flex-2 flex items-end text-navtextcol">
                        <div className="p-[20px] bg-navbgcol w-full max-w-full rounded-[30px] border-[1px] border-navbordercolor h-auto">
                            <div className='skills mb-[20px]'>
                                <div className="toptextskills text-[20px] mb-[10px]">Skills</div>
                                <div className="cardtextskills">
                                    <div className='learningnowsmallcards mt-auto'>
                                        <ul className='list-none text-[14px] text-navtextcol flex flex-wrap gap-[10px]'>
                                            {skillCategories
                                                .flatMap((category) => category.skills)
                                                .slice(0, 6)
                                                .map((skill, index) => (
                                                    <li
                                                        key={index}
                                                        className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px]'
                                                    >
                                                        {skill}
                                                    </li>
                                                ))}
                                            {skillCategories.flatMap((category) => category.skills).length > 6 && (
                                                <li className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px]'>
                                                    +{skillCategories.flatMap((category) => category.skills).length - 6} more
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='learning mb-[20px]'>
                                <div className="toptextskills text-[20px] mb-[10px]">Learning</div>
                                <div className="cardtextskills">
                                    <div className='learningnowsmallcards mt-auto'>
                                        <ul className='list-none text-[14px] text-navtextcol flex flex-wrap gap-[10px] '>
                                            {aboutData?.learningNow?.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px]'
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='education'>
                                <div className="toptextskills text-[20px] mb-[10px]">Education</div>
                                <div className="toptextskills text-[14px]">{aboutData?.education?.degree || ''}</div>
                                <div className="toptextskills text-quantumtextcol text-[14px]">{aboutData?.education?.institute || ''}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
