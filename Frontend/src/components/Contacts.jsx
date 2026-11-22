import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Contacts = () => {
    const [links, setLinks] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        loading: false,
        message: '',
        error: false
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormStatus({
            loading: true,
            message: '',
            error: false
        });
        try {
            const response = await axios.post(
                'https://my-portfolio-website-nvvd.onrender.com/api/contact',
                formData
            );
            setFormStatus({
                loading: false,
                message: response.data.message,
                error: false
            });
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error(error);
            setFormStatus({
                loading: false,
                message: error.response?.data?.message || 'Failed to send message.',
                error: true
            });
        }
    };
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await axios.get('YOUR_ABOUT_API_URL');
                setLinks(res.data.data.links);
            } catch (error) {
                console.error('Failed to fetch social links:', error);
            }
        };
        fetchLinks();
    }, []);
    const [click, setclick] = useState(false)
    return (
        <>
            <div className='flex flex-col w-full items-center '>
                <div className="flex flex-col w-full max-w-[1080px] gap-[10px]">
                    <div className='toptext text-aboutskilltextcol text-[13px] '>CONTACTS</div>
                    <div className="flex ">
                        <div className="form flex-3">
                            <div className='toptext text-[70px] leading-[0.9] text-navtextcol mt-[10px] font-instru italic tracking-tighter scale-y-[1.25] font-extralight'>Let’s build something</div>
                            <div className="formcreation mt-[30px]">
                                <form className='flex flex-col' onSubmit={handleSubmit}>
                                    <label className='text-[14px] text-navtextcol pb-[5px]'>Full name</label>
                                    <input name='name' value={formData.name} onChange={handleInputChange} required className='bg-navbgcol max-w-[500px] h-[50px] p-[20px] rounded-[20px] focus:outline-hirebgcol' type="text" placeholder="Your name" />
                                    <label className='text-[14px] text-navtextcol pb-[5px]'>Email</label>
                                    <input name='email' value={formData.email} onChange={handleInputChange} required className='bg-navbgcol max-w-[500px] h-[50px] p-[20px] rounded-[20px] focus:outline-hirebgcol' type="email" placeholder="you@company.com" />
                                    <label className='text-[14px] text-navtextcol pb-[5px]'>Message</label>
                                    <textarea name='message' value={formData.message} onChange={handleInputChange} required className='bg-navbgcol max-w-[500px] h-[150px] p-[20px] rounded-[20px] focus:outline-hirebgcol' placeholder="Tell me about the project or role" />
                                    <button
                                        className='bg-navtextcol text-peachbg mt-[30px] cursor-pointer px-[15px] py-[10px] rounded-[30px] self-start hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.9] disabled:opacity-50'
                                        type="submit"
                                        disabled={formStatus.loading}
                                    >
                                        {formStatus.loading ? 'Sending...' : 'Send message →'}
                                    </button>
                                    {formStatus.message && (
                                        <p className={`mt-3 text-sm ${formStatus.error ? 'text-red-500' : 'text-green-600'}`}>
                                            {formStatus.message}
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                        <div className="info flex-2 flex items-center text-navtextcol h-[500px]">
                            <div className="p-[20px] bg-navbgcol w-full max-w-full rounded-[30px] border-[1px] border-navbordercolor h-[280px]">
                                <div className='skills mb-[20px]'>
                                    <div className="toptextskills text-[20px] mb-[10px]">Contact Info</div>
                                    <div className="email">
                                        <div className="texttitle text-[14px] text-quantumtextcol">Email:</div>
                                        <div className="email flex gap-[10px] items-center">
                                            <a href={`mailto:${links.gmail}`} className="emailtext">
                                                {links.gmail || 'Not provided'}
                                            </a>
                                            <div className="emailtextcopybutton flex gap-[10px] border-[1px] text-[14px] px-[10px] py-[5px] rounded-[20px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200" onClick={async () => {
                                                await navigator.clipboard.writeText(links.gmail); setclick(true); setTimeout(() => {
                                                    setclick(false)
                                                }, 2000);
                                            }}>
                                                <div className="copysvg flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 408 480"><path fill="#000000" d="M299 5v43H43v299H0V48q0-18 12.5-30.5T43 5h256zm64 86q17 0 29.5 12.5T405 133v299q0 18-12.5 30.5T363 475H128q-18 0-30.5-12.5T85 432V133q0-17 12.5-29.5T128 91h235zm0 341V133H128v299h235z" /></svg>
                                                </div>
                                                <div className="copytext">Copy</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="email">
                                        <div className="texttitle text-[14px] text-quantumtextcol">Phone No. :</div>
                                        <div className="email flex gap-[10px] items-center">
                                            <a href={`tel:${links.phoneno}`} className="emailtext">
                                                {links.phoneno || 'Not provided'}
                                            </a>
                                            <div className="emailtextcopybutton flex gap-[10px] border-[1px] text-[14px] px-[10px] py-[5px] rounded-[20px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200" onClick={async () => {
                                                await navigator.clipboard.writeText(links.phoneno); setclick(true); setTimeout(() => {
                                                    setclick(false)
                                                }, 2000);
                                            }}>
                                                <div className="copysvg flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 408 480"><path fill="#000000" d="M299 5v43H43v299H0V48q0-18 12.5-30.5T43 5h256zm64 86q17 0 29.5 12.5T405 133v299q0 18-12.5 30.5T363 475H128q-18 0-30.5-12.5T85 432V133q0-17 12.5-29.5T128 91h235zm0 341V133H128v299h235z" /></svg>
                                                </div>
                                                <div className="copytext">Copy</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='learning mb-[20px]'>
                                    <div className="toptextskills text-[20px] mb-[10px]">Elsewhere</div>
                                    <div className="cardtextskills">
                                        <div className='learningnowsmallcards mt-auto'>
                                            <ul className='list-none text-[14px] text-navtextcol flex flex-wrap gap-[10px]'>
                                                {links.linkedin && (
                                                    <li
                                                        className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95]'
                                                        onClick={() => window.open(links.linkedin, '_blank', 'noopener,noreferrer')}
                                                    >
                                                        Linkedin
                                                    </li>
                                                )}
                                                {links.github && (
                                                    <li
                                                        className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95]'
                                                        onClick={() => window.open(links.github, '_blank', 'noopener,noreferrer')}
                                                    >
                                                        Github
                                                    </li>
                                                )}
                                                {links.leetcode && (
                                                    <li
                                                        className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95]'
                                                        onClick={() => window.open(links.leetcode, '_blank', 'noopener,noreferrer')}
                                                    >
                                                        Leetcode
                                                    </li>
                                                )}
                                                {links.instagram && (
                                                    <li
                                                        className='bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[2px] rounded-[20px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95]'
                                                        onClick={() => window.open(links.instagram, '_blank', 'noopener,noreferrer')}
                                                    >
                                                        Instagram
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {click && (<div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-navtextcol text-white px-5 py-3 rounded-full shadow-lg text-sm animate-[toastFadeIn_400ms_ease-out]">✓ Text copied!</div>)}
        </>
    )
}

export default Contacts 
