import React, { useEffect, useState } from 'react'
import api from '../services/api.js'

const Certificate = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        fetchCertificates();
    }, []);
    const fetchCertificates = async () => {
        try {
            setLoading(true);
            const response = await api.get('/addcertificates');
            if (response.data.success) {
                setCertificates(response.data.data);
            }
        } catch (error) {
            setError(
                error.response?.data?.message || 'Failed to fetch certificates.'
            );
        } finally {
            setLoading(false);
        }
    };
    let certificateContent;

    if (loading) {
        certificateContent = <p>Loading certificates...</p>;
    }
    else if (error) {
        certificateContent = <p>{error}</p>;
    }
    else if (certificates.length === 0) {
        certificateContent = <p>No certificates available yet.</p>;
    }
    else {
        certificateContent = certificates.map((certificate) => (
            <div key={certificate._id} style={{backgroundImage: `url(${certificate.certificateimg})`, backgroundSize: 'cover', backgroundPosition: 'center',}} className="card flex flex-col bg-amber-800 rounded-[30px] h-[210px] w-[330px] p-[20px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.98] active:duration-200">
                <div className="certificatetitle mt-auto font-dmsan text-[25px] ">{certificate.title}</div>
            </div>
        ));
    }
    return (
        <div className='flex flex-col w-full items-center '>
            <div className="flex flex-col w-full max-w-[1080px] gap-[10px]">
                <div className='toptext text-aboutskilltextcol text-[13px] '>CERTIFICATES</div>
                <div className='toptext text-[80px] leading-[0.9] text-navtextcol mb-[30px] font-instru italic tracking-tighter scale-y-[1.25] font-extralight'>Proof of practice</div>
                <div className='toptext text-aboutskilltextcol text-[13px] '>Sample entries. Replace them with your own.</div>
                <div className="certificatescard flex flex-wrap gap-[20px] mt-[10px]">
                    {certificateContent}
                </div>
            </div>
        </div>
    )
}

export default Certificate