"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Hero: React.FC = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="relative w-full h-[80vh] flex items-center bg-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder for Hero Image - in real app, use Image component or background-image */}
        <div className="w-full h-full bg-gradient-to-r from-black/80 to-transparent absolute z-10"></div>
        {/* Assuming there is a background image set globally or we need to add it here. 
             Since Hero.css is deleted, I should add the image or a placeholder style.
             I'll add a placeholder gradient or checking if there was an image asset used in css.
             The original code had <div className="hero-image">. 
             I will use a gradient background consistent with 'Premium Nature'.
          */}
        <div className="w-full h-full bg-[url('/assets/hero-bg-2k.png')] bg-cover bg-center brightness-75 contrast-110 saturate-125 animation-ken-burns"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-16 flex flex-col items-start space-y-6 text-white animate-fade-in-scale">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-shadow">
          Pure Agriculture <br />
          <span className="text-secondary">Products</span>
        </h1>
        <p className="text-lg md:text-2xl font-light max-w-lg text-gray-200">
          Welcome to <strong className="text-accent font-semibold">Fermire</strong>. We believe in better agriculture for a better future.
        </p>
        <div className="flex flex-row gap-4 mt-8">
          <button onClick={handleSignup} className="px-8 py-3 bg-primary hover:bg-green-800 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95">
            Sign Up
          </button>
          <button onClick={handleLogin} className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white font-semibold rounded-full shadow-lg transition-all duration-300">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;