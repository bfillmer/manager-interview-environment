import React, { useState } from 'react';
import { type Project } from '../../backend/models';
import SkillsInput from '../components/SkillsInput';

export function CreateProjectPage() {
    const [formData, setFormData] = useState<Project>({} as Project);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // API call to create project
            await fetch('/api/projects', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            setIsSubmitted(true);
            setFormData({} as Project);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div >
            <h2>Create New Project</h2>
            {isSubmitted && <p>Submitted.</p>}
            {!isSubmitted && <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Project Name:</label>
                    <input className="border border-slate-400 rounded-sm px-2 py-1 mr-2" type='text' name='name' placeholder='Project Name' onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor='organizationName'>Organization Name:</label>
                    <input className="border border-slate-400 rounded-sm px-2 py-1 mr-2" type='text' name='organizationName' placeholder='Organization Name' onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor='requiredDays'>Required Days:</label>
                    <input className="border border-slate-400 rounded-sm px-2 py-1 mr-2" type='number' name='requiredDays' placeholder='Required Days' onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor='dueDate'>Due Date:</label>
                    <input className="border border-slate-400 rounded-sm px-2 py-1 mr-2" type='date' name='dueDate' placeholder='Due Date' onChange={handleInputChange}/>
                </div>
                <SkillsInput onSkillsChange={(skillsNeeded) => setFormData(prev => ({ ...prev, skillsNeeded }))} />
                <button  className="rounded-sm px-2 py-1 bg-cyan-500 text-white hover:bg-cyan-800" type="submit">
                    Submit
                </button>
            </form>}
        </div>
    );
};

export default CreateProjectPage;