import React, { useState, useEffect } from 'react'
import api from '../services/api.js'

const Skills = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [skillName, setSkillName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/addskills');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to fetch skill categories.'
      );
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async () => {
    if (!selectedCategory || !skillName.trim()) {
      setMessage('Please select a category and enter a skill name.');
      return;
    }
    try {
      setMessage('Adding skill...');
      const response = await api.post(`/addskills/${selectedCategory}`, {
        skill: skillName
      });
      if (response.data.success) {
        setMessage('Skill added successfully!');
        setSkillName('');
        await fetchCategories();
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to add skill.'
      );
    }
  };

  const addSkillCategory = async () => {
    if (!categoryName.trim()) {
      setMessage('Please enter a category name.');
      return;
    }
    try {
      setMessage('Adding category...');
      const response = await api.post('/addskills/categories', {
        name: categoryName,
        description: categoryDescription
      });
      if (response.data.success) {
        setMessage('Category added successfully!');
        setCategoryName('');
        setCategoryDescription('');
        await fetchCategories();
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to add category.'
      );
    }
  };
  const removeSkill = async (categoryId, skill) => {
    try {
      const response = await api.delete(`/addskills/${categoryId}`, {
        data: {
          skill: skill
        }
      });

      if (response.data.success) {
        setMessage('Skill removed successfully!');
        await fetchCategories();
      }

    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to remove skill.'
      );
    }
  };
  const deleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category and all its skills?')) {
      return;
    }
    try {
      const response = await api.delete(
        `/addskills/categories/${categoryId}`
      );
      if (response.data.success) {
        setMessage('Category deleted successfully!');
        await fetchCategories();
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to delete category.'
      );
    }
  };
  const reorderCategories = async (updatedCategories) => {
    try {
      const categoryIds = updatedCategories.map(
        (category) => category._id
      );
      const response = await api.put('/addskills/reorder', {
        categoryIds
      });
      if (response.data.success) {
        setCategories(updatedCategories);
        setMessage('Category order updated!');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to reorder categories.'
      );
      await fetchCategories();
    }
  };
  const moveCategory = (index, direction) => {
    const updatedCategories = [...categories];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= updatedCategories.length) {
      return;
    }
    [updatedCategories[index], updatedCategories[newIndex]] =
      [updatedCategories[newIndex], updatedCategories[index]];
    reorderCategories(updatedCategories);
  };
  const totalSkills = categories.reduce(
    (total, category) => total + category.skills.length,
    0
  );
  let categoryContent;
  if (loading) {
    categoryContent = <p>Loading skill categories...</p>;
  }
  else if (categories.length === 0) {
    categoryContent = <p>No skill categories added yet.</p>;
  }
  else {
    categoryContent = categories.map((category, index) => (
      <div key={category._id} >
        <div className='categorycard flex flex-col gap-[4px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>

          <div className='categorytop flex items-start justify-between gap-[14px]'>
            <div className='flex flex-col gap-[4px]'>
              <div className='flex items-baseline gap-[8px]'>
                <div className='categoryname text-[19px] font-medium'>{category.name}</div>
                <div className='categorycount text-[14px] text-quantumtextcol'>{category.skills.length} skills</div>
              </div>
              <div className='categorydesc text-[15px] text-quantumtextcol'>{category.description}</div>
            </div>

            <div className=' categorycontrols flex items-center gap-[18px] pr-[8px]'>
              <button onClick={() => moveCategory(index, -1)} disabled={index === 0} className='disabled:opacity-40 disabled:cursor-not-allowed moveup opacity-40 cursor-not-allowed'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M6 15l6-6 6 6' /></svg>
              </button>
              <button onClick={() => moveCategory(index, 1)} disabled={index === categories.length - 1} className='disabled:opacity-40 disabled:cursor-not-allowed movedown cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95]'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M6 9l6 6 6-6' /></svg>
              </button>
              <button onClick={() => deleteCategory(category._id)} className='deletecategory cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95]'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6' /></svg>
              </button>
            </div>
          </div>
          <div className='skilltags flex flex-wrap gap-[8px] mt-[10px]'>
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className='skilltag flex items-center gap-[8px] bg-peachbg border-[1px] border-navbordercolor pl-[14px] pr-[10px] py-[5px] rounded-full text-[14px]'>
                {skill}
                <button onClick={() => removeSkill(category._id, skill)} className='removeskill cursor-pointer hover:scale-[1.2] transition-all duration-300 active:scale-[0.9]'>
                  <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M6 6l12 12M18 6L6 18' /></svg>
                </button>
              </div>
            ))}
            {/* duplicate a skilltag div for React, Responsive design, etc. */}
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className='skills flex flex-col w-full text-navtextcol'>

      <div className='toptext text-aboutskilltextcol text-[12px] tracking-[0.12em]'>ADMIN</div>
      <div className='toptext font-instru italic tracking-tighter text-[48px] leading-[1] mt-[4px] mb-[10px]'>Skills</div>
      <div className='text-[15px] text-quantumtextcol'>
        Skills show in the Home skills card, the expanded skills card and the About page, grouped by category.
      </div>

      {/* TOP: two forms side by side */}
      <div className='forms grid grid-cols-1 lg:grid-cols-2 gap-[24px] mt-[16px] items-start'>

        {/* Add a skill */}
        <div className='addskillcard flex flex-col gap-[6px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>
          <div className='text-[22px] mb-[6px]'>Add a skill</div>

          <label className='text-[14px]'>Category</label>
          <div className='relative'>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className='categoryselect w-full appearance-none bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] pl-[16px] pr-[40px] py-[10px] text-[15px] text-navtextcol cursor-pointer outline-none focus:border-navtextcol transition-all duration-300'>
              <option value=''>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <svg className='pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M6 9l6 6 6-6' /></svg>
          </div>

          <label className='text-[14px] mt-[10px]'>Skill</label>
          <input
            type='text'
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder='TypeScript'
            className='skillinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <button onClick={addSkill} className='addskillbutton flex items-center gap-[8px] w-fit mt-[14px] bg-navtextcol text-peachbg px-[22px] py-[10px] rounded-full text-[15px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 5v14M5 12h14' /></svg>
            Add skill
          </button>
        </div>

        {/* Add a category */}
        <div className='addcategorycard flex flex-col gap-[6px] bg-navbgcol border-[1px] border-navbordercolor rounded-[24px] p-[20px]'>
          <div className='text-[22px] mb-[6px]'>Add a category</div>

          <label className='text-[14px]'>Category name</label>
          <input
            type='text'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder='Databases'
            className='categoryinput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <label className='text-[14px] mt-[10px]'>Short description (optional)</label>
          <input
            type='text'
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder='Where I store and query data'
            className='descriptioninput bg-navbgcol border-[1px] border-navbordercolor rounded-[16px] px-[16px] py-[10px] text-[15px] text-navtextcol placeholder:text-quantumtextcol outline-none focus:border-navtextcol transition-all duration-300'
          />

          <button onClick={addSkillCategory} className='addcategorybutton flex items-center gap-[8px] w-fit mt-[14px] border-[1px] border-navtextcol text-navtextcol px-[22px] py-[10px] rounded-full text-[15px] cursor-pointer hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.95] active:duration-200'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 5v14M5 12h14' /></svg>
            Add category
          </button>
        </div>
      </div>

      {/* CATEGORIES header */}
      <div className='categoriesheader flex items-center gap-[10px] mt-[28px] mb-[10px]'>
        <div className='text-[14px] tracking-[0.12em] text-quantumtextcol'>CATEGORIES</div>
        <div className='text-[13px] bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[1px] rounded-[20px]'>{categories.length}</div>
        <div className='text-[13px] tracking-[0.08em] bg-peachbg border-[1px] border-navbordercolor px-[10px] py-[1px] rounded-[20px]'>{totalSkills} SKILLS</div>
      </div>

      <div className='categorylist flex flex-col gap-[12px]'>
        {categoryContent}
        {/* CATEGORY 1 (first one: moveup disabled). Duplicate this whole card for every category */}
        {/* END CATEGORY 1 */}

        {/* CATEGORIES 2, 3, 4: duplicate the card above and change the name, count, description and tags.
            Middle ones keep all three controls active.
            The last one: give movedown the "opacity-40 cursor-not-allowed" classes instead. */}

      </div>
    </div>
  )
}

export default Skills
