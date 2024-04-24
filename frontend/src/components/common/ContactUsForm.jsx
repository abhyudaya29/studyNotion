import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("data",data);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: ""
            });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex flex-col gap-8'>
                {/* First Name and Last Name in a row */}
                <div className='flex flex-row gap-5'>
                    <div className='flex flex-col'>
                        <label htmlFor="firstname" className='text-white'>First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder='Enter first name'
                            className='text-black'
                            {...register("firstname", { required: true })}
                        />
                        {errors.firstname && (
                            <span className='text-red-500'>Please enter Your Name</span>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="lastname" className='text-white'>Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder='Enter last name'
                            className='text-black'
                            {...register("lastname")}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-white'>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Enter your email'
                        className='text-black'
                        {...register("email", { required: true })}
                    />
                    {errors.email && (
                        <span className='text-red-500'>Please enter your email</span>
                    )}
                </div>

                {/* Phone Number */}
                <div className='flex flex-col'>
                    <label htmlFor="phonenumber" className='text-white'>Phone Number</label>
                    <div className='flex flex-row items-center gap-2'>
                        <select
                            name='countryCode'
                            id='countryCode'
                            {...register("countryCode", { required: true })}
                            className='text-black'
                        >
                            {CountryCode.map((number, index) => (
                                <option key={index} value={number.code}>
                                    {number.code} - {number.country}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder='123456789'
                            className='text-black'
                            {...register("phoneNo", {
                                required: true,
                                maxLength: { value: 10, message: "Invalid Phone Number" }
                            })}
                        />
                    </div>
                    {errors.phoneNo && (
                        <span className='text-red-500'>{errors.phoneNo.message}</span>
                    )}
                </div>

                {/* Message */}
                <div className='flex flex-col'>
                    <label htmlFor="message" className='text-white'>Message</label>
                    <textarea
                        name='message'
                        id='message'
                        cols='30'
                        rows='7'
                        placeholder='Enter your message'
                        className='text-black'
                        {...register("message", { required: true })}
                    />
                    {errors.message && (
                        <span className='text-red-500'>Please enter your message</span>
                    )}
                </div>

                {/* Submit Button */}
                <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded' type='submit'>Send Message</button>
            </div>
        </form>
    );
}

export default ContactUsForm;
