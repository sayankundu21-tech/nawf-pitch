import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', large = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -4,
      boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-lg border border-neutral-200/60 transition-colors duration-300 ${large ? 'px-10 py-8' : 'px-5 py-4'} ${className}`}
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const WhatYouGetSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      0
    );

    tl.fromTo(mainCardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
      0.2
    );

    const columns = columnsRef.current?.children;
    if (columns) {
      tl.fromTo(columns,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        0.4
      );
    }

  }, { scope: containerRef });

  const leftColumnItems = [
    'ULTRA REALISTIC',
    'PHOTOGRAPHY',
    'CINEMATIC STORY-TELLING',
    'INFLUENCERS / CELEBS / YOUTUBERS PARTNERSHIP'
  ];

  const centerColumnItems = [
    'SYNCHRONOUS (THE OVERLAP)',
    'VERSATILE'
  ];

  const rightColumnItems = [
    'COST EFFECTIVE',
    'No real-time Production setup',
    'No Crew',
    'TIME-EFFICIENT + HIGH-VELOCITY DELIVERY',
    'COMMERCIAL ADS',
    'READY TO GO AD CAMPAIGNS'
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: '#fafafa' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <h2
          ref={headingRef}
          className="text-center text-neutral-900 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-16 md:mb-20"
          style={{ opacity: 0, fontFamily: "'Inter', sans-serif" }}
        >
          WHAT WILL YOU GET ASSOCIATING WITH NAWF?
        </h2>

        <div ref={mainCardRef} className="flex justify-center mb-16 md:mb-20" style={{ opacity: 0 }}>
          <Card large className="text-center max-w-md w-full">
            <span className="block text-orange-500 text-sm font-semibold tracking-widest mb-2">
              AI
            </span>
            <span className="block text-neutral-900 text-xl md:text-2xl font-semibold tracking-tight">
              360° Content Arsenal
            </span>
          </Card>
        </div>

        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          <div className="space-y-4">
            <div className="mb-6">
              <span className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
                Craft & Realism
              </span>
            </div>
            {leftColumnItems.map((item, index) => (
              <Card key={index}>
                <span className="text-neutral-800 text-sm font-medium tracking-wide">
                  {item}
                </span>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <div className="mb-6">
              <span className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
                NAWF Core
              </span>
            </div>
            {centerColumnItems.map((item, index) => (
              <Card key={index}>
                <span className="text-neutral-800 text-sm font-medium tracking-wide">
                  {item}
                </span>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <div className="mb-6">
              <span className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
                Speed & Scale
              </span>
            </div>
            {rightColumnItems.map((item, index) => (
              <Card key={index}>
                <span className="text-neutral-800 text-sm font-medium tracking-wide">
                  {item}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
