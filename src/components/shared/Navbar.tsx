'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logoImg from '@/assets/logo.png';
import { useWorkout } from '@/context/WorkoutContext';


const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { planList, savedList } = useWorkout();

  const navLinks = [
    { name: 'Workouts', href: '/' },
    { name: 'My Plan', href: '/my-plan' },
  ];

  return (
    <header className="w-full bg-[#0d0e12] sticky top-0 z-50 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 relative flex items-center justify-center">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span className="font-display text-white font-extrabold tracking-wider text-xl uppercase leading-none">
            FITLOG
          </span>
        </Link>

        {/* Middle: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#18260f] text-[#a3e635]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Status Badges */}
        <div className="flex items-center gap-4 text-xs">
          {/* Plan Badge */}
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 text-zinc-400 font-medium hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#a3e635] text-black text-[11px] font-bold flex items-center justify-center">
              {planList.length}
            </span>
          </Link>

          {/* Saved Badge */}
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-zinc-400 font-medium hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full border border-zinc-700 text-zinc-300 text-[11px] font-bold flex items-center justify-center">
              {savedList.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;