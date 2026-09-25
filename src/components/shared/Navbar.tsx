'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}


const Navbar: React.FC<NavbarProps> = ({ planCount = 0, savedCount = 0 }) => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Workouts', href: '/' },
    { name: 'My Plan', href: '/my-plan' },
  ];

  return (
    <header className="w-full bg-[#111318] border-b border-zinc-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="text-[#ccff00] transform -rotate-45 transition-transform group-hover:rotate-0">
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.5 5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H7a1 1 0 0 0 1-1v-2h8v2a1 1 0 0 0 1 1h.5a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 17.5 5H17a1 1 0 0 0-1 1v2H8V6a1 1 0 0 0-1-1h-.5zM3 8.5A1.5 1.5 0 0 1 4.5 7H5v10h-.5A1.5 1.5 0 0 1 3 15.5v-7zm16.5-1.5a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H19V7h.5z" />
            </svg>
          </div>
          <span className="text-white font-extrabold tracking-wider text-xl uppercase">FITLOG</span>
        </Link>
     {/* Middle: Navigation Links */}
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1b2b10] text-[#ccff00]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Status Badges */}
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          {/* Plan Badge */}
          <div className="flex items-center gap-2 text-zinc-300 font-medium">
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black text-xs font-bold flex items-center justify-center">
              {planCount}
            </span>
          </div>
        
         {/* Saved Badge */}
          <div className="flex items-center gap-2 text-zinc-300 font-medium">
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full border border-zinc-600 text-zinc-300 text-xs font-bold flex items-center justify-center">
              {savedCount}
            </span>
          </div>
        </div>
     </div>
    </header>
  );
};

export default Navbar;