"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { MdOutlineAccountBalanceWallet, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiUser } from 'react-icons/bi';
import Navbar from '../../../app/Components/Navbar/Navbar';
import Footer from '../../../app/Components/Footer/Footer';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userType = 'consumer'

    const router = useRouter();

    const handleShowPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (confirmPassword && password !== confirmPassword) {
                toast.error('Passwords do not match');
            } else if (confirmPassword && password === confirmPassword) {
                toast.success('Passwords match');
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [password, confirmPassword]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const errors = [];

        if (!firstName) errors.push('first name');
        if (!lastName) errors.push('last name');
        if (!mobileNumber) errors.push('mobile number');
        if (!password) errors.push('password');
        if (!confirmPassword) errors.push('confirm password');

        if (errors.length > 0) {
            const errorMessage = errors
                .map((field, index) => {
                    if (index === 0) {
                        return field.charAt(0).toUpperCase() + field.slice(1);
                    } else {
                        return field;
                    }
                })
                .join(', ')
                .replace(/,([^,]*)$/, ' and$1');
            const plural = errors.length > 1 ? 'are' : 'is';
            const lastWord = errors.length > 1 ? 'them' : 'it'

            toast.error(`${errorMessage} ${plural} most important to create an account, please fill ${lastWord}.`);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/user', {
                firstName, lastName, email, mobileNumber, confirmPassword, userType
            });

            if (response.status === 200) {
                const token = response.data.token; // Get the token from the response
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                toast.success(response.data.message);
                if (response.data.user.userType === 'consumer') {
                    router.push('/');
                } else {
                    router.push('/dashboard');
                }
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800'>
            <Navbar />

            <div className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 items-center justify-center">

                {/* Left Side - Promotional / Image */}
                <div className="hidden lg:flex flex-col items-center justify-center p-8 bg-white/50 backdrop-blur rounded-3xl border border-gray-200 lg:w-1/3 h-full min-h-[600px] shadow-inner text-center">
                    <div className="relative w-48 h-48 mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg border-4 border-white">
                        <BiUser className='text-8xl text-gray-400' />
                        <div className="absolute inset-0 rounded-full border border-gray-300 opacity-20"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Join Our Farmer Community</h2>
                    <p className="text-gray-500 max-w-xs">Create your account to access fresh, organic produce directly from the source.</p>
                </div>

                {/* Right Side - Signup Form */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full lg:w-2/3 border border-gray-100 relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl -ml-10 -mb-10"></div>

                    <div className="relative z-10 w-full max-w-2xl mx-auto">
                        <div className="text-center mb-10">
                            <h1 className='text-3xl md:text-4xl font-extrabold text-primary mb-2'>Create an Account</h1>
                            <p className="text-gray-500">Fast, secure, and easy.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        id="first-name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className='appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm'
                                        type="text"
                                        placeholder='John'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        id="last-name"
                                        onChange={(e) => setLastName(e.target.value)}
                                        className='appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm'
                                        type="text"
                                        placeholder='Doe'
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                <input
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm'
                                    type="email"
                                    placeholder='john@example.com'
                                />
                            </div>

                            <div>
                                <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <input
                                    id="mobile-number"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className='appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm'
                                    type="number"
                                    placeholder='077 123 4567'
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className='appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='••••••••'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            id="confirm-password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className='appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='••••••••'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <div
                                    className="flex items-center cursor-pointer text-gray-500 hover:text-primary transition-colors text-sm"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? <MdVisibilityOff className="mr-1 text-lg" /> : <MdVisibility className="mr-1 text-lg" />}
                                    {showPassword ? "Hide Passwords" : "Show Passwords"}
                                </div>
                            </div>

                            <button
                                className='w-full bg-primary hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed'
                                type='submit'
                                disabled={isLoading || !firstName || !lastName || !email || !mobileNumber || !password || !confirmPassword || password !== confirmPassword }
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>Create Account <MdOutlineAccountBalanceWallet className="text-xl" /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center bg-gray-50 py-4 rounded-xl border border-gray-100">
                            <p className="text-gray-600">Already have an account? <Link href="/login" className="font-bold text-secondary hover:text-green-600 transition-colors">Login here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;
