import React, { useState } from 'react';
import { MdOutlineLogin, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../../app/Components/Navbar/Navbar';
import Footer from '../../../app/Components/Footer/Footer';

const Login: React.FC = () => {
    const router = useRouter();

    const [emailOrMobileNumber, setEmailOrMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        const errors = [];

        if (!emailOrMobileNumber) {
            errors.push('e-mail or mobile number');
            setIsLoading(false);
        }

        if (!password) {
            errors.push('password');
            setIsLoading(false);
        }

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

            toast.error(`${errorMessage} ${plural} most important to log in, please fill ${lastWord}.`);
            setIsLoading(false)
            return;
        }

        try {
            const response = await axios.post('/api/auth/login', {
                emailOrMobileNumber,
                password,
            });

            if (response.status === 200) {
                const token = response.data.token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                toast.success(response.data.message);
                if (response.data.user.userType === 'consumer') {
                    router.push('/');
                } else {
                    router.push(`/dashboard/${response.data.user.userType}`);
                }
            } else {
                toast.error(response.data.error);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
            <Navbar />

            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                    {/* Decorative background blobs */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/10 blur-xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-accent/10 blur-xl"></div>

                    <div className='relative z-10'>
                        <h2 className="mt-2 text-center text-3xl font-extrabold text-primary tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Login to your account
                        </p>
                    </div>

                    <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit} method="POST">
                        <div className="rounded-md shadow-sm space-y-5">
                            <div>
                                <label htmlFor="email-address" className="sr-only">E-mail or Mobile Number</label>
                                <input
                                    id="email-address"
                                    name="mobile-number"
                                    type="text"
                                    required
                                    className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 sm:text-sm"
                                    placeholder="E-mail or Mobile Number"
                                    onChange={(e) => setEmailOrMobileNumber(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-primary transition-colors"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link href="/forgot-password" className="font-medium text-primary hover:text-green-800 transition-colors duration-200">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || !emailOrMobileNumber || !password}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <MdOutlineLogin className="text-xl group-hover:animate-pulse" />
                                        Login
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center relative z-10">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/auth/signup" className="font-medium text-secondary hover:text-green-600 transition-colors duration-200">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;