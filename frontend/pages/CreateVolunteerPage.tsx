import React, { useState } from 'react';
import { type Volunteer } from '../../backend/models';
import SkillsInput from '../components/SkillsInput';
import MultiDatePicker from '../components/MultiDatePicker';

export function CreateVolunteerPage() {
    const [formData, setFormData] = useState<Volunteer>({} as Volunteer);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, name: e.target.value }));
    }
    const onSkillsChange = (skills: string[]) => setFormData(prev => ({ ...prev, skills }));
    const onAvailabilityChange = (dates: Date[]) => {
        setSelectedDates(dates);
        setFormData(prev => ({ ...prev, availability: dates }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/api/volunteers', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            setFormData({} as Volunteer);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error creating Volunteer:', error);
        }
    };

    return (
        <div >
            <h2>Create New Volunteer</h2>
            {isSubmitted && <p>Submitted.</p>}
            {!isSubmitted && <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Volunteer Name:</label>
                    <input className="border border-slate-400 rounded-sm px-2 py-1 mr-2" type='text' name='name' placeholder='Volunteer Name' required onChange={onNameChange}/>
                </div>
                <SkillsInput onSkillsChange={onSkillsChange} />
                <MultiDatePicker selectedDates={selectedDates} onDatesChange={onAvailabilityChange} />
                <button  className="rounded-sm px-2 py-1 bg-cyan-500 text-white hover:bg-cyan-800" type="submit">
                    Submit
                </button>
            </form>}
        </div>
    );
};

export default CreateVolunteerPage;