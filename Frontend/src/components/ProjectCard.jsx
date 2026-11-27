import React from 'react'

const ProjectCard = ({ project, onClick }) => {
    return (
        <div onClick={onClick} className=" flex flex-col cardpro h-full w-full overflow-hidden bg-navbgcol border-[1px] border-navbordercolor cursor-pointer hover:border-navtextcol rounded-[30px] hover:-translate-y-[5px] transition-all duration-300 active:scale-[0.98] active:duration-200">
            <div className="imgofproj h-[190px] shrink-0 bg-hirebgcol overflow-hidden">
                <img
                    src={project.projectimage}
                    alt={project.title}
                    className="rounded-t-[30px] w-full h-full object-cover"
                />
            </div>
            <div className="contentofproj flex flex-col flex-2 p-[20px]">
                <div className="titletext flex items-start justify-between mb-[10px] gap-[10px] text-navtextcol">
                    <div className="projecttitle font-instru italic text-[20px]">{project.title}</div>
                    <div className=" category shrink-0 bg-hirebgcol rounded-[20px] px-[10px] py-[2px] text-[11px] capitalize">{project.priority}</div>
                </div>
                <div className="midtext font-dmsan text-[14px] text-quantumtextcol">{project.description}</div>
                <div className="botcategory mt-auto pt-[14px]">

                    <ul className='list-none text-[12px] text-navtextcol flex flex-wrap gap-[10px] '>
                        {project.tags.map((tag, index) => (
                            <li
                                key={index}
                                className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px]'
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default ProjectCard
