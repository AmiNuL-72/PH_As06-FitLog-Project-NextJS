
import React from 'react';
import Image from 'next/image';
import bannerImg from '@/assets/banner.png';

const Hero: React.FC = () => {
  return (
    <section className="w-full mt-10 mb-12">
      <div className="w-full min-h-[370px] bg-[#151620] border border-zinc-800/60 rounded-2xl px-8 py-8 sm:px-10 sm:py-9 lg:px-14 lg:py-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-10">
        {/* Left Content */}
        <div className="flex-1 max-w-[610px] z-10">
          <span className="text-[#a3e635] font-bold text-[11px] sm:text-xs tracking-[0.12em] uppercase mb-4 block">
            WORKOUT LIBRARY
          </span>

          <h1 className="font-display text-white text-[42px] sm:text-[48px] lg:text-[52px] font-black uppercase tracking-tight leading-[0.9] mb-5 max-w-[600px]">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed mb-7 max-w-[520px] font-sans">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center justify-center bg-[#a3e635] hover:bg-[#b8ff00] text-black font-extrabold text-xs px-6 py-3.5 rounded-md transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg uppercase tracking-wider"
          >
            BROWSE WORKOUTS
          </a>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-[360px] lg:w-[390px] h-[230px] md:h-[280px] flex justify-center items-center shrink-0 z-10">
          <Image
            src={bannerImg}
            alt="FitLog Hero Gym Banner"
            width={390}
            height={280}
            priority
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

