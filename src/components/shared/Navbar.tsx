'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logoImg from '@/assets/logo.png';
import { useWorkout } from '@/context/WorkoutContext';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { planList, savedList } = useWorkout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu automatically 
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Workouts', href: '/' },
    { name: 'My Plan', href: '/my-plan' },
  ];

  return (
    <header className="w-full bg-[#0d0e12]/95 backdrop-blur-md sticky top-0 z-50 py-3 sm:py-4 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[44px]">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
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

        {/* Desktop / Tablet Middle */}
        <nav className="hidden md:flex items-center gap-2">
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

        {/* Desktop Status Badges */}
        <div className="hidden sm:flex items-center gap-4 text-xs">
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

        {/* Mobile View Toggle & Badges */}
        <div className="flex md:hidden items-center gap-3">
          {/* Quick Badges for Mobile */}
          <div className="flex sm:hidden items-center gap-2 text-xs">
            <Link
              href="/my-plan?tab=plan"
              className="flex items-center gap-1.5 text-zinc-400 font-medium"
            >
              <span className="text-[11px]">Plan</span>
              <span className="w-5 h-5 rounded-full bg-[#a3e635] text-black text-[11px] font-bold flex items-center justify-center">
                {planList.length}
              </span>
            </Link>

            <Link
              href="/my-plan?tab=saved"
              className="flex items-center gap-1.5 text-zinc-400 font-medium"
            >
              <span className="text-[11px]">Saved</span>
              <span className="w-5 h-5 rounded-full border border-zinc-700 text-zinc-300 text-[11px] font-bold flex items-center justify-center">
                {savedList.length}
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-zinc-400 hover:text-white p-1.5 rounded-lg focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#13141d] border-t border-zinc-800/80 px-4 py-4 space-y-3 mt-3 font-sans transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#18260f] text-[#a3e635] border border-[#a3e635]/40'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-around text-xs">
            <Link
              href="/my-plan?tab=plan"
              className="flex items-center gap-2 text-zinc-300 font-medium py-1"
            >
              <span>Today&apos;s Plan</span>
              <span className="w-6 h-6 rounded-full bg-[#a3e635] text-black text-xs font-bold flex items-center justify-center">
                {planList.length}
              </span>
            </Link>

            <Link
              href="/my-plan?tab=saved"
              className="flex items-center gap-2 text-zinc-300 font-medium py-1"
            >
              <span>Saved Workouts</span>
              <span className="w-6 h-6 rounded-full border border-zinc-700 text-zinc-300 text-xs font-bold flex items-center justify-center">
                {savedList.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;