import React from 'react'

const ProjectPopup = ({ project, onClose }) => {
    return (
        <div className='modaloverlay fixed inset-0 z-50 flex items-center justify-center bg-navtextcol/50 p-[16px]'>

            <div className='modalcard relative w-full max-w-[620px] max-h-[90vh] overflow-y-auto bg-navbgcol border-[1px] border-navbordercolor rounded-[28px]'>

                {/* TOP: photo area */}
                <div className='modalphoto relative flex items-center justify-center w-full h-[240px] bg-navtextcol'>
                    {/* replace the initials with <img className='w-full h-full object-cover'> when a photo exists */}
                    <img src={project.projectimage} alt={project.title} className='w-full h-full object-cover' />

                    <button onClick={onClose} className='closeicon absolute top-[16px] right-[16px] flex items-center justify-center w-[36px] h-[36px] rounded-full bg-navbgcol text-navtextcol cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.9]'>
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M6 6l12 12M18 6L6 18' />
                        </svg>
                    </button>
                </div>

                {/* BODY */}
                <div className='modalbody flex flex-col p-[20px]'>

                    {/* title + priority pill */}
                    <div className='modaltitlerow flex items-start justify-between gap-[12px]'>
                        <div className='modaltitle font-instru italic tracking-tighter text-[34px] leading-[1] text-navtextcol'>{project.title}</div>
                        <div className='prioritypill shrink-0 mt-[6px] bg-peachbg border-[1px] border-navbordercolor text-navtextcol text-[12px] px-[10px] py-[2px] rounded-[20px]'>{project.priority}</div>
                    </div>
                    <div className='modaldesc text-[15px] text-quantumtextcol mt-[6px]'>
                        {project.description}
                    </div>

                    {/* LINKS: GitHub + Live */}
                    <div className='modallinks flex flex-wrap gap-[8px] mt-[14px]'>
                        <a
                            href={project.githubUrl}
                            target='_blank'
                            rel='noreferrer'
                            className='githublink flex items-center gap-[6px] bg-peachbg border-[1px] border-navbordercolor text-navtextcol px-[14px] py-[5px] rounded-full text-[13px] cursor-pointer hover:-translate-y-[2px] hover:border-navtextcol transition-all duration-300 active:scale-[0.95]'
                        >
                            <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
                                <path d='M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z' />
                            </svg>
                            GitHub
                        </a>

                        <a
                            href={project.liveUrl}
                            target='_blank'
                            rel='noreferrer'
                            className='livelink flex items-center gap-[6px] bg-peachbg border-[1px] border-navbordercolor text-navtextcol px-[14px] py-[5px] rounded-full text-[13px] cursor-pointer hover:-translate-y-[2px] hover:border-navtextcol transition-all duration-300 active:scale-[0.95]'
                        >
                            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                <circle cx='12' cy='12' r='9' />
                                <path d='M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18' />
                            </svg>
                            Live site
                            <svg width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                <path d='M7 17L17 7M8 7h9v9' />
                            </svg>
                        </a>
                    </div>

                    {/* TECHNOLOGIES USED */}
                    <div className='sectionlabel text-[12px] tracking-[0.12em] text-quantumtextcol mt-[22px]'>TECHNOLOGIES USED</div>
                    <div className='techtags flex flex-wrap gap-[8px] mt-[8px]'>
                        {project.tags.map((tag, index) => (
                            <div
                                key={index}
                                className='tag bg-peachbg border-[1px] border-navbordercolor px-[12px] py-[2px] rounded-[20px] text-[13px]'
                            >
                                {tag}
                            </div>
                        ))}
                    </div>

                    {/* CHALLENGES FACED */}
                    <div className='sectionlabel text-[12px] tracking-[0.12em] text-quantumtextcol mt-[22px]'>CHALLENGES FACED</div>
                    <div className='challengelist flex flex-col gap-[8px] mt-[8px]'>
                        {project.challengesfaced.map((challenge, index) => (
                            <div
                                key={index}
                                className='challengecard bg-peachbg border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[12px]'
                            >
                                <div className='challengetitle text-[15px] font-medium text-navtextcol'>
                                    Challenge {index + 1}
                                </div>
                                <div className='challengefix text-[14px] text-quantumtextcol mt-[2px]'>
                                    {challenge}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* HOW IT WAS DONE */}
                    <div className='sectionlabel text-[12px] tracking-[0.12em] text-quantumtextcol mt-[22px]'>HOW IT WAS DONE</div>
                    <ol className='steplist list-decimal pl-[22px] mt-[8px] flex flex-col gap-[6px] text-[15px] text-navtextcol'>
                        {project.Howitwasbuilt.map((step, index) => (
                            <li key={index}>
                                {step}
                            </li>
                        ))}
                    </ol>

                    {/* BUTTONS (last two) */}
                    <div className='modalbuttons flex flex-wrap gap-[10px] mt-[22px]'>
                        <button className='moreinfobutton flex items-center gap-[8px] bg-navtextcol text-peachbg px-[22px] py-[10px] rounded-full text-[15px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
                            More info
                            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                <path d='M5 12h14M13 6l6 6-6 6' />
                            </svg>
                        </button>
                        <button onClick={onClose} className='closebutton border-[1px] border-navtextcol text-navtextcol px-[22px] py-[10px] rounded-full text-[15px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ProjectPopup