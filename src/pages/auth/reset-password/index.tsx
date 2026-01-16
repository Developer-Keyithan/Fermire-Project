import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Navbar from '../../../app/Components/Navbar/Navbar';
import Footer from '../../../app/Components/Footer/Footer';
import { MdLockReset, MdVisibility, MdVisibilityOff } from "react-icons/md";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            setIsLoading(false);
            return;
        }

        try {
            // Mock API call
            // const response = await axios.post('/api/user/reset-password', { password, token: router.query.token });

            setTimeout(() => {
                toast.success('Password has been reset successfully');
                router.push('/login');
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
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mb-16"></div>

                    <div className="relative z-10 text-center">
                        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-primary">
                            <MdLockReset className="text-3xl" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-primary tracking-tight">
                            Set New Password
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Your new password must be different to previously used passwords.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                                        placeholder="••••••••"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                                        placeholder="••••••••"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
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
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
