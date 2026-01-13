import React from 'react';
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className='bg-gray-900 text-gray-300 py-16 font-light'>
      <div className='container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>

        {/* About Section */}
        <div className='space-y-4'>
          <h3 className='font-semibold text-xl text-white border-b-2 border-primary w-max pb-2 mb-4'>About Us</h3>
          <p className="leading-relaxed text-sm text-gray-400">
            We’re a platform dedicated to directly connecting farmers with consumers, ensuring fresh, high-quality agricultural products reach your doorstep. No middlemen, just pure, farm-fresh goodness.
          </p>
        </div>

        {/* Mission Section */}
        <div className="space-y-4">
          <h3 className='font-semibold text-xl text-white border-b-2 border-primary w-max pb-2 mb-4'>Our Mission</h3>
          <p className="leading-relaxed text-sm text-gray-400">
            Connecting farmers and consumers directly for a better and more sustainable future. We empower local farmers while bringing fresh produce to your table.
          </p>
        </div>

        {/* Quick Links */}
        <div className='space-y-4'>
          <h3 className='font-semibold text-xl text-white border-b-2 border-primary w-max pb-2 mb-4'>Quick Links</h3>
          <div className="flex flex-col space-y-2 text-sm">
            {['Home', 'Shop', 'About Us', 'Contact Us', 'FAQs', 'Privacy Policy', 'Terms & Conditions'].map((link) => (
              <a key={link} href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary hover:pl-2 transition-all duration-300">{link}</a>
            ))}
          </div>
        </div>

        {/* Contact & Newsletter */}
        <div className='space-y-6'>
          <div>
            <h3 className='font-semibold text-xl text-white border-b-2 border-primary w-max pb-2 mb-4'>Contact Us</h3>
            <div className="text-sm space-y-2 text-gray-400">
              <p>Phone: <span className="text-white">+94 76 0202 918</span></p>
              <p>Email: <span className="text-white">sathyjaseelankeyithan@gmail.com</span></p>
              <p>Address: <span className="text-white">No:52, 2nd Cross Street, Vavuniya</span></p>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-white font-medium mb-3">Follow Us</h4>
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn].map((Icon, idx) => (
                <Link key={idx} href="/" className="bg-gray-800 p-2 rounded-full hover:bg-primary text-white transition-colors duration-300">
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-800 mt-12 pt-8'>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-auto">
            <div className="flex bg-gray-800 rounded-full p-1 pl-4 w-full md:w-80">
              <input type="email" placeholder='Enter Your Email Address' className="bg-transparent text-sm w-full outline-none text-white placeholder-gray-500" />
              <button className="bg-primary hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">Subscribe</button>
            </div>
          </div>
          <p className="text-sm text-gray-500">&copy; Since 2024 - {new Date().getFullYear()} Fermire. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
