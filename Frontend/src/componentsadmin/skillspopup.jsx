import React, { useState } from "react"

const SkillsModal = ({ categories, onClose }) => {
    const [openCategory, setOpenCategory] = useState(0);
    return (
        <div className='modaloverlay fixed inset-0 z-50 flex items-center justify-center bg-navtextcol/50 p-[16px]'>

            <div className='modalcard relative w-full max-w-[620px] max-h-[90vh] overflow-y-auto bg-navbgcol border-[1px] border-navbordercolor rounded-[28px] p-[20px]'>

                {/* close icon */}
                <button onClick={onClose} className='closeicon absolute top-[16px] right-[16px] flex items-center justify-center w-[36px] h-[36px] rounded-full bg-navbgcol border-[1px] border-navbordercolor text-navtextcol cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.9]'>
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                        <path d='M6 6l12 12M18 6L6 18' />
                    </svg>
                </button>

                {/* heading */}
                <div className='toptext text-aboutskilltextcol text-[12px] tracking-[0.12em]'>SKILLS</div>
                <div className='modaltitle font-instru italic tracking-tighter text-[34px] leading-[1.1] text-navtextcol mt-[4px] mb-[16px]'>What I work with</div>
                <div className='accordionlist flex flex-col gap-[10px]'>
                    {categories.map((category, index) => (
                        <div
                            key={category._id}
                            className='accordioncard bg-peachbg border-[1px] border-navbordercolor rounded-[20px] px-[20px] py-[16px]'
                        >
                            <button
                                onClick={() => {
                                    setOpenCategory(
                                        openCategory === index ? null : index
                                    );
                                }}
                                className='accordionheader flex items-center justify-between w-full cursor-pointer text-left'
                            >
                                <div className='flex items-baseline gap-[8px]'>
                                    <div className='categoryname text-[17px] font-medium text-navtextcol'>
                                        {category.name}
                                    </div>
                                    <div className='categorycount text-[14px] text-quantumtextcol'>
                                        {category.skills.length} skills
                                    </div>
                                </div>
                                <svg
                                    className='chevron text-navtextcol'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                >
                                    {openCategory === index ? (
                                        <path d='M6 15l6-6 6 6' />
                                    ) : (
                                        <path d='M6 9l6 6 6-6' />
                                    )}
                                </svg>
                            </button>
                            {openCategory === index && (
                                <div className='accordionbody flex flex-col gap-[10px] mt-[12px]'>
                                    <div className='categorydesc text-[15px] text-quantumtextcol'>
                                        {category.description}
                                    </div>
                                    <div className='skilltags flex flex-wrap gap-[8px]'>
                                        {category.skills.map((skill, skillIndex) => (
                                            <div
                                                key={skillIndex}
                                                className='skilltag bg-navbgcol border-[1px] border-navbordercolor px-[12px] py-[2px] rounded-full text-[13px] text-navtextcol'
                                            >
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SkillsModal