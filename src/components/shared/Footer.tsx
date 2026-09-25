import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0d0e12] border-t border-zinc-800/80 mt-auto py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left - Brand Logo + FITLOG */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 relative flex items-center justify-center">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-display text-white font-extrabold tracking-wider text-lg uppercase leading-none">
            FITLOG
          </span>
        </Link>

        {/* Right - Copyright line */}
        <p className="text-zinc-500 text-xs sm:text-sm font-sans text-center sm:text-right">
          &copy; 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
