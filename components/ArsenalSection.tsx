import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ArsenalSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('.arsenal-heading');
    const coreCard = section.querySelector('.arsenal-core');
    const creativeRows = gsap.utils.toArray<HTMLElement>('.arsenal-creative-row');
    const efficiencyBlock = section.querySelector('.arsenal-efficiency-block');
    const efficiencyItems = gsap.utils.toArray<HTMLElement>('.arsenal-efficiency-item');
    const resolutionBlock = section.querySelector('.arsenal-resolution');

    gsap.set(heading, { opacity: 0, y: 40 });
    gsap.set(coreCard, { opacity: 0, y: 30, scale: 0.98 });
    gsap.set(creativeRows, { opacity: 0, y: 24 });
    gsap.set(efficiencyBlock, { opacity: 0, y: 24 });
    gsap.set(efficiencyItems, { opacity: 0, y: 20 });
    gsap.set(resolutionBlock, { opacity: 0, y: 24, scale: 0.97 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=5500',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1
      }
    });

    tl.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, 0);

    tl.to(heading, {
      opacity: 0.4,
      y: -60,
      scale: 0.85,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0.5);

    tl.to(coreCard, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, 0.6);

    tl.to(coreCard, {
      y: -180,
      scale: 0.9,
      opacity: 0.6,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 1.2);

    creativeRows.forEach((row, i) => {
      const startTime = 1.4 + i * 0.35;
      tl.to(row, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, startTime);

      if (i < creativeRows.length - 1) {
        tl.to(row, {
          opacity: 0.3,
          y: -30,
          duration: 0.3,
          ease: 'power2.inOut'
        }, startTime + 0.3);
      }
    });

    const efficiencyStart = 1.4 + creativeRows.length * 0.35 + 0.2;

    tl.to(creativeRows[creativeRows.length - 1], {
      opacity: 0.3,
      y: -30,
      duration: 0.3,
      ease: 'power2.inOut'
    }, efficiencyStart - 0.1);

    tl.to(efficiencyBlock, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, efficiencyStart);

    efficiencyItems.forEach((item, i) => {
      tl.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out'
      }, efficiencyStart + 0.5 + i * 0.25);
    });

    const resolutionStart = efficiencyStart + 0.5 + efficiencyItems.length * 0.25 + 0.3;

    tl.to([efficiencyBlock, ...efficiencyItems], {
      opacity: 0.25,
      y: -20,
      duration: 0.4,
      ease: 'power2.inOut'
    }, resolutionStart - 0.2);

    tl.to(resolutionBlock, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, resolutionStart);

    tl.to({}, { duration: 0.8 }, resolutionStart + 0.6);

  }, { scope: containerRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="relative w-full h-screen flex flex-col items-center justify-center"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="arsenal-heading absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-6">
          <h2 className="font-mono text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.12em] text-white/90 text-center leading-relaxed">
            WHAT WILL YOU GET ASSOCIATING WITH NAWF?
          </h2>
        </div>

        <div className="arsenal-core absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-6">
          <div className="px-12 py-8 md:px-16 md:py-10 border border-red-600/30 bg-[#080808]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent pointer-events-none" />
            <span className="font-mono text-base md:text-lg lg:text-xl uppercase tracking-[0.2em] text-white/95 whitespace-nowrap">
              <span className="text-red-500">AI</span> 360° Content Arsenal
            </span>
          </div>
        </div>

        <div className="arsenal-creative-row absolute top-[50%] left-[8%] md:left-[12%] -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-12 h-px bg-red-600/30 absolute -left-16 top-1/2 hidden md:block" />
            <span className="font-mono text-lg md:text-xl lg:text-2xl uppercase tracking-[0.15em] text-white/85">
              ULTRA REALISTIC
            </span>
          </div>
        </div>

        <div className="arsenal-creative-row absolute top-[50%] right-[8%] md:right-[12%] -translate-y-1/2 z-10 text-right">
          <div className="relative">
            <div className="w-12 h-px bg-red-600/30 absolute -right-16 top-1/2 hidden md:block" />
            <span className="font-mono text-lg md:text-xl lg:text-2xl uppercase tracking-[0.15em] text-white/85">
              PHOTOGRAPHY
            </span>
          </div>
        </div>

        <div className="arsenal-creative-row absolute top-[50%] left-[8%] md:left-[12%] -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-12 h-px bg-red-600/30 absolute -left-16 top-1/2 hidden md:block" />
            <span className="font-mono text-lg md:text-xl lg:text-2xl uppercase tracking-[0.15em] text-white/85">
              CINEMATIC STORY-TELLING
            </span>
          </div>
        </div>

        <div className="arsenal-creative-row absolute top-[50%] right-[8%] md:right-[12%] -translate-y-1/2 z-10 text-right">
          <div className="relative">
            <div className="w-12 h-px bg-red-600/30 absolute -right-16 top-1/2 hidden md:block" />
            <span className="font-mono text-lg md:text-xl lg:text-2xl uppercase tracking-[0.15em] text-white/85">
              INFLUENCERS / CELEBS / YOUTUBERS PARTNERSHIP
            </span>
          </div>
        </div>

        <div className="arsenal-efficiency-block absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-2xl px-6">
          <div className="border border-white/10 bg-[#080808]/80 px-10 py-8 md:px-14 md:py-10">
            <h3 className="font-mono text-lg md:text-xl uppercase tracking-[0.15em] text-white/90 mb-6">
              COST EFFECTIVE
            </h3>
            <div className="space-y-3 pl-4 border-l border-red-600/20">
              <p className="font-mono text-sm md:text-base uppercase tracking-[0.1em] text-white/60">
                No real-time Production setup
              </p>
              <p className="font-mono text-sm md:text-base uppercase tracking-[0.1em] text-white/60">
                No Crew
              </p>
            </div>
          </div>
        </div>

        <div className="arsenal-efficiency-item absolute top-[58%] left-[8%] md:left-[15%] z-10">
          <span className="font-mono text-base md:text-lg lg:text-xl uppercase tracking-[0.12em] text-white/80">
            TIME-EFFICIENT + HIGH-VELOCITY DELIVERY
          </span>
        </div>

        <div className="arsenal-efficiency-item absolute top-[58%] right-[8%] md:right-[15%] z-10 text-right">
          <span className="font-mono text-base md:text-lg lg:text-xl uppercase tracking-[0.12em] text-white/80">
            COMMERCIAL ADS
          </span>
        </div>

        <div className="arsenal-efficiency-item absolute top-[58%] left-1/2 -translate-x-1/2 z-10 text-center">
          <span className="font-mono text-base md:text-lg lg:text-xl uppercase tracking-[0.12em] text-white/80">
            READY TO GO AD CAMPAIGNS
          </span>
        </div>

        <div className="arsenal-resolution absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
          <div className="space-y-6">
            <div className="px-10 py-5 border border-white/15 bg-[#080808]/90">
              <span className="font-mono text-lg md:text-xl lg:text-2xl uppercase tracking-[0.15em] text-white/90">
                SYNCHRONOUS (THE OVERLAP)
              </span>
            </div>
            <div className="px-10 py-5 border border-white/15 bg-[#080808]/90">
              <span className="font-mono text-lg md:text-xl lg:text-2xl uppercase tracking-[0.15em] text-white/90">
                VERSATILE
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ArsenalSection;
