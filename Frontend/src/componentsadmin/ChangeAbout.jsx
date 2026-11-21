import React, { useEffect, useState } from "react";
import api from "../services/api";

const AboutAdmin = () => {
  const [aboutData, setAboutData] = useState({
    aboutText: {
      headline: '',
      paragraph1: '',
      paragraph2: ''
    },
    education: {
      degree: '',
      institute: ''
    },
    learningNow: [],
    links: {
      linkedin: '',
      github: '',
      instagram: '',
      leetcode: ''
    }
  });
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append('aboutText', JSON.stringify(aboutData.aboutText));
      formData.append('education', JSON.stringify(aboutData.education));
      formData.append('learningNow', JSON.stringify(aboutData.learningNow));
      formData.append('links', JSON.stringify(aboutData.links));

      if (cvFile) {
        formData.append('cv', cvFile);
      }

      const response = await api.put('/about', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setAboutData(response.data.data);
        setCvFile(null);
        alert('About information saved successfully!');
      }

    } catch (error) {
      console.error('Save About Error:', error);

      alert(
        error.response?.data?.message ||
        'Failed to save About information.'
      );

    } finally {
      setSaving(false);
    }
  };
  const [cvFile, setCvFile] = useState(null);
  const handleCVChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file.');
      e.target.value = '';
      return;
    }
    setCvFile(file);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get('/about');
        if (response.data.success) {
          setAboutData(response.data.data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.log('No About information saved yet.');
        } else {
          console.error('Failed to fetch About information:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);
  const [newSkill, setNewSkill] = useState('');
  return (

    <div className='aboutadmin flex flex-col w-full text-navtextcol'>

      <div className='toptext text-aboutskilltextcol text-[12px] tracking-[0.12em]'>ADMIN</div>
      <div className='toptext font-instru italic tracking-tighter text-[48px] leading-[1] mt-[4px] mb-[10px]'>About</div>
      <div className='text-[15px] text-quantumtextcol'>
        Everything here shows on the About page. Current values are on top, type below to change them.
      </div>

      <div className='sections flex flex-col gap-[16px] mt-[16px]'>

        {/* ABOUT TEXT: three lines */}
        <div className='aboutcard flex flex-col gap-[6px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>
          <div className='text-[22px] mb-[6px]'>About text</div>

          <label className='text-[14px]'>Line 1: headline</label>
          <textarea
            rows={2}
            value={aboutData.aboutText.headline}
            onChange={(e) =>
              setAboutData({
                ...aboutData,
                aboutText: {
                  ...aboutData.aboutText,
                  headline: e.target.value
                }
              })
            }
            disabled={loading}
            className='abouttextarea bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300 resize-y'
          />

          <label className='text-[14px] mt-[10px]'>Line 2: first paragraph</label>
          <textarea
            rows={3}
            value={aboutData.aboutText.paragraph1}
            onChange={(e) =>
              setAboutData({
                ...aboutData,
                aboutText: {
                  ...aboutData.aboutText,
                  paragraph1: e.target.value
                }
              })
            }
            disabled={loading}
            className='abouttextarea bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300 resize-y'
          />

          <label className='text-[14px] mt-[10px]'>Line 3: second paragraph</label>
          <textarea
            rows={3}
            value={aboutData.aboutText.paragraph2}
            onChange={(e) =>
              setAboutData({
                ...aboutData,
                aboutText: {
                  ...aboutData.aboutText,
                  paragraph2: e.target.value
                }
              })
            }
            disabled={loading}
            className='abouttextarea bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300 resize-y'
          />
        </div>

        {/* EDUCATION */}
        <div className='educationcard flex flex-col gap-[6px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>
          <div className='text-[22px] mb-[6px]'>Education</div>

          <div className='text-[12px] tracking-[0.12em] text-quantumtextcol'>CURRENT</div>
          <div className='currentbox bg-peachbg border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[12px]'>
            <div className='currentdegree text-[16px]'>{aboutData.education.degree || 'Not added yet'}</div>
            <div className='currentinstitute text-[14px] text-quantumtextcol'>{aboutData.education.institute || 'Not added yet'}</div>
          </div>

          <div className='text-[12px] tracking-[0.12em] text-quantumtextcol mt-[14px]'>EDIT CURRENT EDUCATION</div>

          <label className='text-[14px] mt-[4px]'>Degree</label>
          <input
            type='text'
            placeholder='B.Tech, Computer Science'
            value={aboutData.education.degree}
            onChange={(e) =>
              setAboutData({
                ...aboutData,
                education: {
                  ...aboutData.education,
                  degree: e.target.value
                }
              })
            }
            disabled={loading}
            className='educationinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Institute</label>
          <input
            type='text'
            placeholder='Quantum University, Roorkee'
            value={aboutData.education.institute}
            onChange={(e) =>
              setAboutData({
                ...aboutData,
                education: {
                  ...aboutData.education,
                  institute: e.target.value
                }
              })
            }
            disabled={loading}
            className='educationinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />
        </div>

        {/* LEARNING NOW */}
        <div className='learningcard flex flex-col gap-[6px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>
          <div className='text-[22px] mb-[6px]'>Learning now</div>
          <div className='text-[12px] tracking-[0.12em] text-quantumtextcol'>CURRENT</div>
          <div className='learningtags flex flex-wrap gap-[8px]'>
            {aboutData.learningNow.map((skill, index) => (
              <div
                key={index}
                className='skilltag flex items-center gap-[8px] bg-peachbg border-[1px] border-navbordercolor pl-[14px] pr-[10px] py-[5px] rounded-full text-[14px]'
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    setAboutData({
                      ...aboutData,
                      learningNow: aboutData.learningNow.filter(
                        (_, i) => i !== index
                      )
                    })
                  }
                  className='removeskill cursor-pointer hover:scale-[1.2] transition-all duration-300 active:scale-[0.9]'
                >
                  <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M6 6l12 12M18 6L6 18' />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <label className='text-[14px] mt-[14px]'>Add something you are learning</label>
          <div className='flex flex-wrap gap-[8px]'>
            <input
              type='text'
              placeholder='Express'
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              disabled={loading}
              className='learninginput grow min-w-[180px] bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
            />
            <button
              type="button"
              onClick={() => {
                const skill = newSkill.trim();
                if (!skill) return;
                if (aboutData.learningNow.includes(skill)) {
                  return;
                }
                setAboutData({
                  ...aboutData,
                  learningNow: [...aboutData.learningNow, skill]
                });
                setNewSkill('');
              }}
              disabled={loading}
              className='addlearningbutton flex items-center gap-[8px] border-[1px] border-navtextcol text-navtextcol px-[20px] py-[10px] rounded-full text-[15px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95]'
            >
              Add
            </button>
          </div>
        </div>

        {/* LINKS */}
        <div className='linkscard flex flex-col gap-[6px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>
          <div className='text-[22px] mb-[6px]'>Links</div>

          {/* LINK ROW: LinkedIn. Duplicate for every link */}
          <div className='linkrow flex flex-col gap-[6px]'>
            <div className='text-[14px]'>LinkedIn</div>
            <div className='currentlink flex items-center justify-between gap-[10px] bg-peachbg border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px]'>
              <div className='currenturl text-[14px] text-quantumtextcol truncate'>{aboutData.links.linkedin || 'Not added yet'}</div>
              <a href={aboutData.links.linkedin || undefined} target='_blank' rel='noreferrer' className='openlink shrink-0 text-[13px] underline cursor-pointer hover:-translate-y-[2px] transition-all duration-300'>Open</a>
            </div>
            <input
              type='url'
              value={aboutData.links.linkedin}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  links: {
                    ...aboutData.links,
                    linkedin: e.target.value
                  }
                })
              }
              disabled={loading}
              placeholder='New LinkedIn link (leave empty to keep current)'
              className='linkinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
            />
          </div>

          {/* GitHub */}
          <div className='linkrow flex flex-col gap-[6px] mt-[10px]'>
            <div className='text-[14px]'>GitHub</div>
            <div className='currentlink flex items-center justify-between gap-[10px] bg-peachbg border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px]'>
              <div className='currenturl text-[14px] text-quantumtextcol truncate'>{aboutData.links.github || 'Not added yet'}</div>
              <a href={aboutData.links.github || undefined} target='_blank' rel='noreferrer' className='openlink shrink-0 text-[13px] underline cursor-pointer hover:-translate-y-[2px] transition-all duration-300'>Open</a>
            </div>
            <input
              type="url"
              value={aboutData.links.github}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  links: {
                    ...aboutData.links,
                    github: e.target.value
                  }
                })
              }
              disabled={loading}
              placeholder='New GitHub link (leave empty to keep current)'
              className='linkinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
            />
          </div>

          {/* Instagram */}
          <div className='linkrow flex flex-col gap-[6px] mt-[10px]'>
            <div className='text-[14px]'>Instagram</div>
            <div className='currentlink flex items-center justify-between gap-[10px] bg-peachbg border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px]'>
              <div className='currenturl text-[14px] text-quantumtextcol truncate'>{aboutData.links.instagram || 'Not added yet'}</div>
              <a href={aboutData.links.instagram || undefined} target='_blank' rel='noreferrer' className='openlink shrink-0 text-[13px] underline cursor-pointer hover:-translate-y-[2px] transition-all duration-300'>Open</a>
            </div>
            <input
              type='url'
              value={aboutData.links.instagram}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  links: {
                    ...aboutData.links,
                    instagram: e.target.value
                  }
                })
              }
              disabled={loading}
              placeholder='New Instagram link (leave empty to keep current)'
              className='linkinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
            />
          </div>

          <div className='linkrow flex flex-col gap-[6px] mt-[10px]'>
            <div className='text-[14px]'>LeetCode</div>
            <div className='currentlink flex items-center justify-between gap-[10px] bg-peachbg border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px]'>
              <div className='currenturl text-[14px] text-quantumtextcol truncate'>{aboutData.links.leetcode || 'Not added yet'}</div>
              <a href={aboutData.links.leetcode || undefined} target='_blank' rel='noreferrer' className='openlink shrink-0 text-[13px] underline cursor-pointer hover:-translate-y-[2px] transition-all duration-300'>Open</a>
            </div>
            <input
              type='url'
              value={aboutData.links.leetcode}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  links: {
                    ...aboutData.links,
                    leetcode: e.target.value
                  }
                })
              }
              disabled={loading}
              placeholder='LeetCode link'
              className='linkinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
            />
          </div>

          <div className='linkrow flex flex-col gap-[6px] mt-[10px]'>
            <div className='text-[14px]'>Phone Number</div>
            <div className='currentlink flex items-center justify-between gap-[10px] bg-peachbg border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px]'>
              <div className='currenturl text-[14px] text-quantumtextcol truncate'>{aboutData.links.phoneno || 'Not added yet'}</div>
              <a href={`tel:${aboutData.links.phoneno}`} target='_blank' rel='noreferrer' className='openlink shrink-0 text-[13px] underline cursor-pointer hover:-translate-y-[2px] transition-all duration-300'>Call</a>
            </div>
            <input
              type='tel'
              value={aboutData.links.phoneno}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  links: {
                    ...aboutData.links,
                    phoneno: e.target.value
                  }
                })
              }
              disabled={loading}
              placeholder='contact number'
              className='linkinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
            />
          </div>

          <div className='linkrow flex flex-col gap-[6px] mt-[10px]'>
            <div className='text-[14px]'>Email</div>
            <div className='currentlink flex items-center justify-between gap-[10px] bg-peachbg border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px]'>
              <div className='currenturl text-[14px] text-quantumtextcol truncate'>{aboutData.links.gmail || 'Not added yet'}</div>
              <a href={`mailto:${aboutData.links.gmail}`} target='_blank' rel='noreferrer' className='openlink shrink-0 text-[13px] underline cursor-pointer hover:-translate-y-[2px] transition-all duration-300'>Email</a>
            </div>
            <input
              type='email'
              value={aboutData.links.gmail}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  links: {
                    ...aboutData.links,
                    gmail: e.target.value
                  }
                })
              }
              disabled={loading}
              placeholder='Email Address'
              className='linkinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
            />
          </div>

          {/* CV */}
          <div className='linkrow flex flex-col gap-[6px] mt-[10px]'>
            <div className='text-[14px]'>CV (Download CV button)</div>
            <div className='currentlink flex items-center justify-between gap-[10px] bg-peachbg border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px]'>
              <div className='currenturl text-[14px] text-quantumtextcol truncate'>{cvFile ? cvFile.name : aboutData.cv?.url ? 'Existing CV uploaded' :'No new CV selected'}</div>
              <a href={aboutData.cv?.url || undefined} target='_blank' rel='noreferrer' className='openlink shrink-0 text-[13px] underline cursor-pointer hover:-translate-y-[2px] transition-all duration-300'>Open</a>
            </div>
            <label className='dropzone flex items-center justify-center gap-[10px] bg-peachbg border-[2px] border-dashed border-navbordercolor rounded-[16px] py-[16px] cursor-pointer text-quantumtextcol text-[14px] hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.98]'>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M12 16V4M6 10l6-6 6 6M4 20h16' />
              </svg>
              Drop a new CV here or click to choose
              <input onChange={handleCVChange} disabled={loading} type='file' accept='.pdf' className='hidden' />
            </label>
          </div>
        </div>

      </div>

      {/* SAVE */}
      <button onClick={handleSave} disabled={saving || loading} className='savebutton flex items-center gap-[8px] w-fit mt-[18px] bg-navtextcol text-peachbg px-[22px] py-[10px] rounded-full text-[15px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
        <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M5 12l5 5L20 7' />
        </svg>
        {saving ? 'Saving...' : 'Save changes'}
      </button>

    </div>
  )
}

export default AboutAdmin