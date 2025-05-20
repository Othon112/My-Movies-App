"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const links = [
    {href: "/popular", label: "Popular"},
    {href: "/now-playing", label: "Now Playing"},
    {href: "/top-rated", label: "Top Rated"},
    {href: "/my-favorites", label: "My Favorites"},
];

const Header = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return(
        <header
            className={clsx(
                "w-full border-b shadow-sm transition-colors duration-300 sticky top-0 z-50",
                scrolled
                    ? "bg-gradient-to-r from-black to-blue-900/80 backdrop-blur"
                    : "bg-gradient-to-r from-black to-blue-900"
            )}
        >
            <div className='container mx-auto flex items-center justify-between px-4 py-5 '>
                <Link href="/" className='text-xl font-bold text-white hover:text-yellow-300 transition-colors'>
                    PelisXD
                </Link>

                <nav className="flex gap-6">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={clsx(
                                "text-sm font-medium transition-colors hover:text-yellow-300",
                                pathname === href ? "text-yellow-600 underline" : "text-white"
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export default Header