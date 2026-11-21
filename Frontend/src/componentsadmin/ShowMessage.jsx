import React, { useEffect, useState } from "react";
import api from "../services/api";

const MessagesAdmin = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get('/contact');

                setMessages(response.data.data || []);

            } catch (error) {
                console.error('Error fetching messages:', error);

                setError(
                    error.response?.data?.message ||
                    'Failed to fetch messages.'
                );
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this message?'
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/contact/${id}`);

            setMessages((previous) =>
                previous.filter((msg) => msg._id !== id)
            );

        } catch (error) {
            console.error('Delete failed:', error);
            alert(
                error.response?.data?.message ||
                'Failed to delete message.'
            );
        }
    };
    return (
        <div className='messagesadmin flex flex-col w-full text-navtextcol'>

            <div className='toptext text-aboutskilltextcol text-[12px] tracking-[0.12em]'>ADMIN</div>
            <div className='toptext font-instru italic tracking-tighter text-[48px] leading-[1] mt-[4px] mb-[10px]'>Messages</div>
            <div className='text-[15px] text-quantumtextcol'>
                Everything sent through the Contact form on your site shows up here, newest first.
            </div>

            {/* count + search */}
            <div className='messagesbar flex flex-wrap items-center justify-between gap-[12px] mt-[20px] mb-[10px]'>
                <div className='flex items-center gap-[10px]'>
                    <div className='text-[13px] tracking-[0.12em] text-quantumtextcol'>INBOX</div>
                    <div className='text-[13px] bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[1px] rounded-[20px]'>{messages.length}</div>
                    <div className='text-[13px] tracking-[0.08em] bg-navtextcol text-peachbg px-[10px] py-[1px] rounded-[20px]'>3 NEW</div>
                </div>
            </div>

            <div className='messagelist flex flex-col gap-[10px]'>

                {/* MESSAGE 1 (new). Duplicate this card for every message */}
                {loading ? (
                    <div className='text-center py-[30px] text-quantumtextcol'>
                        Loading messages...
                    </div>
                ) : error ? (
                    <div className='text-center py-[30px] text-red-500'>
                        {error}
                    </div>
                ) : messages.length === 0 ? (
                    <div className='emptystate flex flex-col items-center gap-[6px] bg-peachbg border-[2px] border-dashed border-navbordercolor rounded-[24px] py-[40px] text-quantumtextcol text-[15px]'>
                        <div className='font-instru italic text-[26px] text-navtextcol'>
                            No messages yet
                        </div>
                        New contact form messages will show up here.
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id} className='messagecard flex flex-col gap-[10px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>
                            <div className='messagetop flex flex-wrap items-start justify-between gap-[12px]'>
                                <div className='sender flex items-center gap-[12px]'>
                                    <div className='avatar w-[40px] h-[40px] rounded-full bg-navtextcol text-peachbg font-instru italic text-[18px] flex items-center justify-center shrink-0'>
                                        {msg.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='sendername text-[17px] leading-[1.2]'>
                                            {msg.name}
                                        </div>
                                        <a
                                            href={`mailto:${msg.email}`}
                                            className='senderemail text-[14px] text-quantumtextcol underline'
                                        >
                                            {msg.email}
                                        </a>
                                    </div>
                                </div>
                                <div className='messagedate text-[13px] text-quantumtextcol'>
                                    {new Date(msg.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <div className='messagebody bg-peachbg border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[12px] text-[15px] text-navtextcol'>
                                {msg.message}
                            </div>
                            <div className='messageactions flex flex-wrap items-center gap-[10px]'>
                                <a
                                    href={`mailto:${msg.email}`}
                                    className='replybutton flex items-center gap-[8px] bg-navtextcol text-peachbg px-[18px] py-[8px] rounded-full text-[14px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95]'
                                >
                                    Reply
                                </a>
                                <button
                                    onClick={() => handleDelete(msg._id)}
                                    className='border-[1px] border-red-400 text-red-500 px-[18px] py-[8px] rounded-full text-[14px] cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {/* EMPTY STATE: show this instead of the list when there are no messages
        <div className='emptystate flex flex-col items-center gap-[6px] bg-peachbg border-[2px] border-dashed border-navbordercolor rounded-[24px] py-[40px] text-quantumtextcol text-[15px]'>
          <div className='font-instru italic text-[26px] text-navtextcol'>No messages yet</div>
          New contact form messages will show up here.
        </div>
        */}

            </div>
        </div>
    )
}

export default MessagesAdmin