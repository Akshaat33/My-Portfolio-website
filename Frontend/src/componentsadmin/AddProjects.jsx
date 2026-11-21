import React, { useState, useEffect , useRef } from 'react'
import api from '../services/api.js'

const UploadProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    challengesfaced: '',
    Howitwasbuilt: '',
    githubUrl: '',
    liveUrl: '',
    priority: 'normal',
    placement: 'top'
  });
  const [projectimage, setProjectimage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const imagePreview = projectimage
    ? URL.createObjectURL(projectimage)
    : null;
  const publishProject = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      setMessage('Title and description are required.');
      return;
    }
    if (!projectimage) {
      setMessage('Please select a project image.');
      return;
    }
    try {
      setLoading(true);
      setMessage('Publishing project...');
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append('projectimage', projectimage);
      const response = await api.post('/projects', data ,{headers: {'Content-Type': 'multipart/form-data'}});
      if (response.data.success) {
        setMessage('Project published successfully!');
        setFormData({
          title: '',
          description: '',
          tags: '',
          challengesfaced: '',
          Howitwasbuilt: '',
          githubUrl: '',
          liveUrl: '',
          priority: 'normal',
          placement: 'top'
        });
        setProjectimage(null);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to publish project.'
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='uploadproject flex flex-col w-full text-navtextcol'>

      <div className='toptext text-aboutskilltextcol text-[12px] tracking-[0.12em]'>ADMIN</div>
      <div className='toptext font-instru italic tracking-tighter text-[48px] leading-[1] mt-[4px] mb-[16px]'>Upload project</div>

      <div className='uploadbody grid grid-cols-1 lg:grid-cols-2 gap-[24px] items-start'>

        {/* LEFT: form */}
        <div className='projectform flex flex-col gap-[6px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>

          <label className='text-[14px]'>Title</label>
          <input
            type='text'
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder='Weather App'
            className='projectinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Description</label>
          <textarea
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder='What it does, in one or two sentences'
            className='projecttextarea bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300 resize-y'
          />

          <label className='text-[14px] mt-[10px]'>Tags</label>
          <input
            type='text'
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder='React, CSS, API'
            className='projectinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Challenges faced</label>
          <textarea
            rows={3}
            name="challengesfaced"
            value={formData.challengesfaced}
            onChange={handleChange}
            placeholder='One per line. Add the fix after a dash: API rate limits - cached results'
            className='projecttextarea bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300 resize-y'
          />

          <label className='text-[14px] mt-[10px]'>How it was built</label>
          <textarea
            rows={3}
            name="Howitwasbuilt"
            value={formData.Howitwasbuilt}
            onChange={handleChange}
            placeholder='One step per line'
            className='projecttextarea bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300 resize-y'
          />

          <label className='text-[14px] mt-[10px]'>GitHub link</label>
          <input
            type='url'
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder='https://github.com/username/repo'
            className='projectinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Live URL (optional)</label>
          <input
            type='url'
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder='https://myproject'
            className='projectinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Photo</label>
          <label className='dropzone flex items-center justify-center gap-[10px] bg-peachbg border-[2px] border-dashed border-navbordercolor rounded-[16px] py-[22px] cursor-pointer text-quantumtextcol text-[14px] hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.98]'>
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
              <rect x='3' y='3' width='18' height='18' rx='3' />
              <circle cx='9' cy='9' r='1.8' />
              <path d='M21 16l-5-5-9 9' />
            </svg>
            Drop a photo here or click to choose
            <input type='file' accept='image/*' className='hidden' onChange={(e) => { const file = e.target.files[0]; if (file) { setProjectimage(file); } }} />
          </label>

          <label className='text-[14px] mt-[10px]'>Priority</label>
          <div className='prioritypicker flex w-fit bg-peachbg border-[1px] border-navbordercolor rounded-full p-[3px] gap-[2px]'>
            <button type="button" onClick={() => setFormData(prev => ({ ...prev, priority: 'pinned' }))} className={`prioritybtn px-[20px] py-[8px] rounded-full text-[15px] cursor-pointer transition-all duration-300 active:scale-[0.95] ${formData.priority === 'pinned' ? 'bg-navtextcol text-peachbg' : ''}`}>Pinned</button>
            <button type="button" onClick={() => setFormData(prev => ({ ...prev, priority: 'featured' }))} className={`prioritybtn px-[20px] py-[8px] rounded-full text-[15px] cursor-pointer transition-all duration-300 active:scale-[0.95] ${formData.priority === 'featured' ? 'bg-navtextcol text-peachbg' : ''}`}>Featured</button>
            <button type="button" onClick={() => setFormData(prev => ({ ...prev, priority: 'normal' }))} className={`prioritybtn px-[20px] py-[8px] rounded-full text-[15px] cursor-pointer transition-all duration-300 active:scale-[0.95] ${formData.priority === 'normal' ? 'bg-navtextcol text-peachbg' : ''}`}>Normal</button>
          </div>

          <label className='text-[14px] mt-[10px]'>Placement within group</label>
          <div className='placementpicker flex w-fit bg-peachbg border-[1px] border-navbordercolor rounded-full p-[3px] gap-[2px]'>
            <button type="button" onClick={() => setFormData(prev => ({ ...prev, placement: 'top' }))} className={`placementbtn px-[20px] py-[8px] rounded-full text-[15px] cursor-pointer  transition-all duration-300 active:scale-[0.95] ${formData.placement === 'top' ? 'bg-navtextcol text-peachbg' : ''}`}>Top</button>
            <button type="button" onClick={() => setFormData(prev => ({ ...prev, placement: 'bottom' }))} className={`placementbtn px-[20px] py-[8px] rounded-full text-[15px] cursor-pointer transition-all duration-300 active:scale-[0.95] ${formData.placement === 'bottom' ? 'bg-navtextcol text-peachbg' : ''}`}>Bottom</button>
          </div>

          <button onClick={publishProject} type="button" disabled={loading} className='publishbutton flex items-center gap-[8px] w-fit mt-[14px] bg-navtextcol text-peachbg px-[22px] py-[10px] rounded-full text-[15px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
            <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M12 16V4M6 10l6-6 6 6M4 20h16' />
            </svg>
            {loading ? 'Publishing...' : 'Publish project'}
          </button>
        </div>

        {/* RIGHT: live preview */}
        <div className='projectpreview flex flex-col gap-[10px]'>
          <div className='text-[14px]'>Live preview</div>

          <div className='previewcard overflow-hidden bg-navbgcol border-[1px] border-navbordercolor rounded-[24px]'>
            {/* photo area. Replace the initials with <img className='w-full h-full object-cover'> when a photo is picked */}
            <div className='previewphoto flex items-center justify-center w-full h-[260px] bg-hirebgcol'>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Project preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className='previewinitials font-instru italic text-[64px] leading-[1] text-navtextcol'>
                  PT
                </div>
              )}
            </div>
            <div className='previewtext flex flex-col gap-[6px] p-[16px]'>
              <div className='previewtitle font-instru italic tracking-tighter text-[28px] leading-[1.1]'>{formData.title || 'Project title'}</div>
              <div className='previewdesc text-[15px] text-quantumtextcol'>{formData.description || 'A short description appears here.'}</div>
            </div>
          </div>

          <div className='text-[14px] text-quantumtextcol'>
            Will appear <span className='font-bold text-navtextcol'>#1 of 6</span> on the Projects page. It will also show in the Home bento.
          </div>
        </div>

      </div>
    </div>
  )
}

export default UploadProject
