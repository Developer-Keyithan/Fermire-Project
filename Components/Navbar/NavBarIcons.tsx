'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { LuFileHeart } from "react-icons/lu";
import { RiMoonClearFill } from "react-icons/ri";
import CartModel from "../CartModel/CartModel";
import WishListModel from "../WishListModel/WishListModel";
import Link from "next/link";
import Profile from "../Profile/Profile";

interface NavBarIconsProps {
    userData: any;
}

const NavBarIcons: React.FC<NavBarIconsProps> = ({ userData }) => {
    
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState(userData);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishListOpen, setIsWishListOpen] = useState(false);

    const router = useRouter();

    const isLoggedIn = false;

    const handleProfile = () => {
        setIsProfileOpen((prev) => !prev)
    }

    return (
        <div className="flex gap-4 relative">

            <div className='text-2xl bg-green flex justify-center items-center'>
                <BiUser
                    onClick={handleProfile}
                />
            </div>
            {isProfileOpen && (<Profile />)}

            <div
                className=' relative text-2xl bg-green flex justify-center items-center cursor-pointer'
            >
                <IoCartOutline
                    onClick={() => setIsCartOpen((prev) => !prev)}
                />
                <div className="absolute -top-2 -right-2 py-[1px] px-2 bg-bgRed rounded-full text-white text-xs items-center justify-center">
                    2
                </div>
            </div>
            {isCartOpen && (<CartModel />)}

            <div
                className=' relative text-2xl bg-green flex justify-center items-center cursor-pointer'
            >
                <LuFileHeart
                    onClick={() => setIsWishListOpen((prev) => !prev)}
                />
                <div className="absolute -top-2 -right-2 py-[1px] px-2 bg-bgRed rounded-full text-white text-xs items-center justify-center">
                    2
                </div>
            </div>
            {isWishListOpen && (<WishListModel />)}

            <div className='text-2xl bg-green flex justify-center items-center cursor-pointer' >
                <RiMoonClearFill />
            </div>
        </div>
    )
}

export default NavBarIcons;
