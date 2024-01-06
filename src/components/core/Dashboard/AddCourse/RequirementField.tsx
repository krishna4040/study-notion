'use client'
import React, { useState, useEffect } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormGetValue } from 'react-hook-form';
import { formValues } from './CourseInformationForm';

interface props {
    name: string;
    label: string;
    register: UseFormRegister<formValues>;
    errors: FieldErrors<formValues>;
    setValue: UseFormSetValue<formValues>;
    getValues: UseFormGetValue<formValues>;
}

const RequirementField: React.FunctionComponent<props> = ({ name, label, register, errors, setValue, getValues }) => {

    const [requirment, setRequirment] = useState('');
    const [requirmentList, setRequirmentList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, []);

    useEffect(() => {
        setValue(name, requirmentList);
    }, []);

    const handleAddRequirment = () => {
        if (requirment) {
            setRequirmentList([...requirmentList, requirment]);
            setRequirment('');
        }
    }

    const handleRemoveRequirment = () => {

    }

    return (
        <div>

            <label>{label}</label>
            <div>
                <input
                    type="text"
                    value={requirment}
                    onChange={(event) => { setRequirment(event.target.value) }}
                    className='w-full'
                />
            </div>

            {
                requirmentList.length > 0 && (
                    <ul>
                        {
                            requirmentList.map((element, index) => {
                                return (
                                    <li key={index}>
                                        <span>{element}</span>
                                        <button
                                            type='button'
                                            onClick={handleRemoveRequirment}
                                            className='text-xs text-pure-greys-300'
                                        >
                                            clear
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }

        </div>
    )
}

export default RequirementField