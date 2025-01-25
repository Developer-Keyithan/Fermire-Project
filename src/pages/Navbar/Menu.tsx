'use client'

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react"
import { IoMenu } from "react-icons/io5";

const Menu: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
const router = useRouter();

    const handleAboutClick = (e: MouseEvent) => {
        e.preventDefault();
        router.push("/");

        setTimeout(() => {
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    return (
        <div className="">
            <IoMenu
                className="cursor-pointer text-xl"
                onClick={() => setIsMenuOpen((prev) => !prev)}
            />{
                isMenuOpen && (
                    <div className="absolute bg-primaryColor text-white left-0 top-16 w-full h-[calc(100vh-64px)]">
                        <Link href='/'>Home</Link>
                        <Link href='/products'>Shop Now</Link>
                        <Link href='#about' onClick={handleAboutClick}>About Us</Link>
                        <Link href='/contactus'>Contact Us</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Menu
