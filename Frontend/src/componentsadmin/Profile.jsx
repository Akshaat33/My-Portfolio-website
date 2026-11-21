import React, { useEffect, useState } from 'react'
import api from '../services/api'

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    tagline: '',
    profilepic: ''
  })
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        if (response.data.success) {
          setProfile(response.data.profile);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setMessage('No profile saved yet. Add your details!');
        } else {
          setMessage('Failed to fetch profile.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();

  }, [])
  const saveProfile = async () => {
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('tagline', profile.tagline);
    if (imageFile) {
      formData.append('profilepic', imageFile);
    }
    try {
      setMessage('Saving Changes')
      const response = await api.put('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        setProfile(response.data.profile);
        setMessage('Profile updated successfully!');
        setImageFile(null);
        setImagePreview('');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to save profile.'
      );
    }
  }

  return (
    <div className='profile flex flex-col w-full text-navtextcol'>

      <div className='toptext text-aboutskilltextcol text-[12px] tracking-[0.12em]'>ADMIN</div>
      <div className='toptext font-instru italic tracking-tighter text-[48px] leading-[1] mt-[4px] mb-[10px]'>Profile</div>
      <div className='text-[15px] text-quantumtextcol'>Changes show on the Home page straight away.</div>

      <div className='profilebody grid grid-cols-1 lg:grid-cols-2 gap-[24px] mt-[16px] items-start'>

        {/* LEFT: form */}
        <div className='profileform flex flex-col gap-[6px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>

          <label className='text-[14px]'>Name</label>
          <input
            type='text'
            value={profile.name}
            onChange={(e) => setProfile({
              ...profile,
              name: e.target.value
            })}
            className='profileinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Tagline</label>
          <input
            type='text'
            value={profile.tagline}
            onChange={(e) => setProfile({
              ...profile,
              tagline: e.target.value
            })}
            className='profileinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Profile picture</label>
          <label className='dropzone flex items-center justify-center gap-[10px] bg-peachbg border-[2px] border-dashed border-navbordercolor rounded-[16px] py-[22px] cursor-pointer text-quantumtextcol text-[14px] hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.98]'>
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M12 16V4M6 10l6-6 6 6M4 20h16' />
            </svg>
            Drop a portrait here or click to choose
            <input type='file' accept='image/*' className='hidden' onChange={(e) => { const file = e.target.files[0]; if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); } }} />
          </label>
          <div className='text-[13px] text-quantumtextcol'>A portrait photo (3 by 4) fits the Home tile best.</div>


          <button onClick={saveProfile} className='savebutton flex items-center gap-[8px] w-fit mt-[14px] bg-navtextcol text-peachbg px-[22px] py-[10px] rounded-full text-[15px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
            <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M5 12l5 5L20 7' />
            </svg>
            Save profile
          </button>
        </div>

        {/* RIGHT: preview */}
        <div className='profilepreview flex flex-col gap-[10px] w-full max-w-[300px]'>
          <div className='text-[14px]'>How it looks on Home</div>
          <div className='previewcard relative overflow-hidden w-full aspect-[3/4] bg-hirebgcol rounded-[24px] border-[1px] border-navbordercolor'>
            {(imagePreview || profile.profilepic) && (
              <img
                src={imagePreview || profile.profilepic}
                alt="Profile preview"
                className="w-full h-full object-cover rounded-[16px]"
              />
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
