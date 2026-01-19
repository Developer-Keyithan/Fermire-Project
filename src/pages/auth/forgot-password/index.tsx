import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Navbar from '../../../app/Components/Navbar/Navbar';
import Footer from '../../../app/Components/Footer/Footer';
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email) {
            toast.error('Please enter your email address');
            setIsLoading(false);
            return;
        }

        try {
            // Mock API call for now since backend endpoint might not exist yet
            // const response = await axios.post('/api/user/forgot-password', { email });

            // Simulating success
            setTimeout(() => {
                toast.success('Password reset link has been sent to your email.');
            }, 1000);

        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setTimeout(() => setIsLoading(false), 1000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
            <Navbar />

            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                    {/* Decorative background blobs */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -ml-10 -mt-10"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl -mr-10 -mb-10"></div>

                    <div className="relative z-10 text-center">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-primary">
                            <MdEmail className="text-3xl" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-primary tracking-tight">
                            Forgot Password?
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            No worries, we'll send you reset instructions.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || !email}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Sending...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center relative z-10">
                        <Link href="/login" className="flex items-center justify-center font-medium text-gray-600 hover:text-primary transition-colors gap-2">
                            &larr; Back to Login
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
