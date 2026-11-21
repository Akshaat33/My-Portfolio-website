import React, { useState, useEffect } from 'react'
import api from '../services/api'

const Certificates = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    issuedby: '',
    year: '',
    credentiallink: ''
  });
  const [certificateimg, setCertificateimg] = useState(null);
  useEffect(() => {
    fetchCertificates();
  }, [])
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await api.get('/addcertificates');
      if (response.data.success) {
        setCertificates(response.data.data);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to fetch certificates.'
      );
    } finally {
      setLoading(false);
    }
  };
  const addCertificate = async () => {
    if (!formData.title.trim() || !formData.issuedby.trim() || !formData.year || !certificateimg) {
      setMessage('Please fill all required fields and select a certificate image.');
      return;
    }
    const data = new FormData();
    data.append('title', formData.title);
    data.append('issuedby', formData.issuedby);
    data.append('year', formData.year);
    data.append('credentiallink', formData.credentiallink);
    data.append('certificateimg', certificateimg);
    try {
      setMessage('Adding certificate...');
      const response = await api.post('/addcertificates', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        setMessage('Certificate added successfully!');
        setFormData({
          title: '',
          issuedby: '',
          year: '',
          credentiallink: ''
        });
        setCertificateimg(null);
        await fetchCertificates();
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to add certificate.'
      );
    }
  };
  const deleteCertificate = async (id) => {
    try {
      const response = await api.delete(`/addcertificates/${id}`);
      if (response.data.success) {
        setMessage('Certificate deleted successfully!');
        setCertificates((prevCertificates) =>
          prevCertificates.filter(
            (certificate) => certificate._id !== id
          )
        );
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to delete certificate.'
      );
    }
  };
  const reorderCertificates = async (updatedCertificates) => {
    try {
      const certificateIds = updatedCertificates.map(
        (certificate) => certificate._id
      );
      const response = await api.put('/addcertificates/reorder', {
        certificateIds
      });
      if (response.data.success) {
        setCertificates(updatedCertificates);
        setMessage('Certificate order updated!');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to reorder certificates.'
      );
      await fetchCertificates();
    }
  };
  const moveCertificate = (index, direction) => {
    const updatedCertificates = [...certificates];
    const newIndex = index + direction;
    // Prevent moving beyond the first or last position
    if (newIndex < 0 || newIndex >= updatedCertificates.length) {
      return;
    }
    // Swap the two certificates
    [updatedCertificates[index], updatedCertificates[newIndex]] =
      [updatedCertificates[newIndex], updatedCertificates[index]];
    // Save the new order in MongoDB
    reorderCertificates(updatedCertificates);
  };
  let certificateContent;
  if (loading) {
    certificateContent = <p>Loading certificates...</p>;
  }
  else if (certificates.length === 0) {
    certificateContent = <p>No certificates added yet.</p>;
  }
  else {
    certificateContent = certificates.map((certificate, index) => (
      <div
        key={certificate._id}
        className='certrow flex items-center gap-[14px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] px-[16px] py-[10px]'
      >
        <img
          src={certificate.certificateimg}
          alt={certificate.title}
          className='certthumb w-[48px] h-[40px] rounded-[10px] object-cover shrink-0'
        />
        <div className='certinfo flex flex-col grow min-w-0'>
          <div className='certname text-[17px] leading-[1.2] truncate'>
            {certificate.title}
          </div>
          <div className='certmeta text-[14px] text-quantumtextcol'>
            {certificate.issuedby} · {certificate.year}
          </div>
        </div>
        <div className='flex items-center gap-[6px]'>
          <button
            onClick={() => moveCertificate(index, -1)}
            disabled={index === 0}
            title='Move up'
            className='cursor-pointer disabled:opacity-30'
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M6 15l6-6 6 6' /></svg>
          </button>

          <button
            onClick={() => moveCertificate(index, 1)}
            disabled={index === certificates.length - 1}
            title='Move down'
            className='cursor-pointer disabled:opacity-30'
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M6 9l6 6 6-6' /></svg>
          </button>
        </div>
        <button
          onClick={() => deleteCertificate(certificate._id)}
          className='cursor-pointer'
          title='Delete certificate'
        >
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6' /></svg>
        </button>
      </div>
    ));
  }
  return (
    <div className='certificates flex flex-col w-full text-navtextcol'>

      <div className='toptext text-aboutskilltextcol text-[12px] tracking-[0.12em]'>ADMIN</div>
      <div className='toptext font-instru italic tracking-tighter text-[48px] leading-[1] mt-[4px] mb-[16px]'>Certificates</div>

      <div className='certbody grid grid-cols-1 lg:grid-cols-2 gap-[24px] items-start'>

        {/* LEFT: form */}
        <div className='certform flex flex-col gap-[6px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>

          <label className='text-[14px]'>Certificate title</label>
          <input
            type='text'
            value={formData.title}
            onChange={(e) => setFormData({
              ...formData,
              title: e.target.value
            })}
            placeholder='JavaScript Developer'
            className='certinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Issued by</label>
          <input
            type='text'
            value={formData.issuedby}
            onChange={(e) => setFormData({
              ...formData,
              issuedby: e.target.value
            })}
            placeholder='Coursera, Google, NPTEL'
            className='certinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Year</label>
          <input
            type='text'
            value={formData.year}
            onChange={(e) => setFormData({
              ...formData,
              year: e.target.value
            })}
            placeholder='2026'
            className='certinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Credential link (optional)</label>
          <input
            type='text'
            value={formData.credentiallink}
            onChange={(e) => setFormData({
              ...formData,
              credentiallink: e.target.value
            })}
            placeholder='https://example.com/verify/123'
            className='certinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Certificate image</label>
          <label className='dropzone flex items-center justify-center gap-[10px] bg-peachbg border-[2px] border-dashed border-navbordercolor rounded-[16px] py-[22px] cursor-pointer text-quantumtextcol text-[14px] hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.98]'>
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
              <rect x='3' y='3' width='18' height='18' rx='3' />
              <circle cx='9' cy='9' r='1.8' />
              <path d='M21 16l-5-5-9 9' />
            </svg>
            Drop an image here or click to choose
            <input type='file' accept='image/*' className='hidden'
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setCertificateimg(file);
                }
              }} />
          </label>

          <button onClick={addCertificate} className='addcertbutton flex items-center gap-[8px] w-fit mt-[14px] bg-navtextcol text-peachbg px-[22px] py-[10px] rounded-full text-[15px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
            <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M12 16V4M6 10l6-6 6 6M4 20h16' />
            </svg>
            Add certificate
          </button>
        </div>

        {/* RIGHT: live preview */}
        <div className='certpreview flex flex-col gap-[10px]'>
          <div className='text-[14px]'>Live preview</div>

          <div className='previewcard flex flex-col justify-between min-h-[200px] bg-navtextcol text-peachbg rounded-[24px] p-[20px]'>
            <div className='flex items-center justify-between'>
              <div className='previewyear text-[13px] tracking-[0.1em]'>{formData.year || 'YEAR'}</div>
              <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                <circle cx='12' cy='9' r='5' />
                <path d='M9 13.5L8 21l4-2 4 2-1-7.5' />
              </svg>
            </div>
            <div className='previewtitle font-instru italic tracking-tighter text-[34px] leading-[1.05]'>{formData.title || 'Certificate title'}</div>
            <div className='previewissuer text-[14px] opacity-70'>{formData.issuedby || 'Issuing Body'}</div>
          </div>

          <div className='text-[14px] text-quantumtextcol'>
            New certificates appear <span className='font-bold'>first</span> on the Certificates page. Use the arrows below to reorder.
          </div>
        </div>
      </div>

      {/* YOUR CERTIFICATES */}
      <div className='certsheader flex items-center gap-[10px] mt-[28px] mb-[10px]'>
        <div className='text-[14px] tracking-[0.12em] text-quantumtextcol'>YOUR CERTIFICATES</div>
        <div className='text-[13px] bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[1px] rounded-[20px]'>{certificates.length}</div>
      </div>

      <div className='certlist flex flex-col gap-[10px]'>

        {/* ROW 1 (first one: moveup disabled). Duplicate for every certificate */}
        {certificateContent}

        {/* ROWS 2, 3: duplicate ROW 1, change the name and meta.
            Make moveup active on rows 2+, and disable movedown on the last row. */}

      </div>
    </div>
  )
}

export default Certificates
