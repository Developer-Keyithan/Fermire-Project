'use client'

import React, { useState } from "react"
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";

function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="">
            <button
                onClick={toggleMenu}
                className="text-3xl text-primary p-1 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>

            {isMenuOpen && (
                <div
                    className="absolute top-full left-0 w-full bg-white backdrop-blur-md shadow-xl border-t rounded-b-[32px] border-gray-100 flex flex-col items-center justify-center py-8 gap-6 text-lg font-medium text-gray-700 z-50 animate-in slide-in-from-top-4 duration-300 bg-primary/20">
                    <Link href='/' onClick={toggleMenu} className="hover:text-primary px-6 py-2 rounded-full transition-all w-full text-center">Home</Link>
                    <Link href='/products' onClick={toggleMenu} className="hover:text-primary px-6 py-2 rounded-full transition-all w-full text-center">Shop Now</Link>
                    <Link href='/#about' onClick={toggleMenu} className="hover:text-primary px-6 py-2 rounded-full transition-all w-full text-center">About Us</Link>
                    <Link href='/contactus' onClick={toggleMenu} className="hover:text-primary px-6 py-2 rounded-full transition-all w-full text-center">Contact Us</Link>
                    <Link href='/cart' onClick={toggleMenu} className="hover:text-primary px-6 py-2 rounded-full transition-all w-full text-center">Cart</Link>
                </div>
            )}
        </div>
    )
}

export default Menu
