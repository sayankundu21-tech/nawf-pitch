import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceRowProps {
  text: string;
  index: number;
  category?: string;
}

const ServiceRow: React.FC<ServiceRowProps> = ({ text, index }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (!rowRef.current) return;

    gsap.to(rowRef.current, {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(indexRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.25,
      ease: 'power2.out'
    });

    gsap.to(lineRef.current, {
      scaleX: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out'
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!rowRef.current) return;

    gsap.to(rowRef.current, {
      backgroundColor: 'transparent',
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(indexRef.current, {
      opacity: 0,
      x: -8,
      duration: 0.25,
      ease: 'power2.out'
    });

    gsap.to(lineRef.current, {
      scaleX: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, []);

  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={rowRef}
      className="service-row relative w-full border-b border-white/10 cursor-pointer transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0, transform: 'translateY(30px)' }}
    >
      <div className="relative flex items-center justify-between py-6 md:py-8 lg:py-10 px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-4 md:gap-6">
          <span
            ref={indexRef}
            className="font-mono text-xs text-white/40"
            style={{ opacity: 0, transform: 'translateX(-8px)' }}
          >
            {formattedIndex}
          </span>
          <span className="text-lg md:text-xl lg:text-2xl font-light tracking-wide text-white/90">
            {text}
          </span>
        </div>
        <div
          ref={lineRef}
          className="hidden md:block w-16 lg:w-24 h-px bg-white/30"
          style={{ transformOrigin: 'left center', transform: 'scaleX(0)', opacity: 0 }}
        />
      </div>
    </div>
  );
};

interface CategoryLabelProps {
  text: string;
}

const CategoryLabel: React.FC<CategoryLabelProps> = ({ text }) => {
  return (
    <div
      className="category-label w-full pt-12 md:pt-16 lg:pt-20 pb-4 md:pb-6 px-4 md:px-8 lg:px-12"
      style={{ opacity: 0, transform: 'translateY(20px)' }}
    >
      <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/30">
        {text}
      </span>
    </div>
  );
};

const ServiceListing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const services = {
    primary: [
      'ULTRA REALISTIC',
      'PHOTOGRAPHY',
      'CINEMATIC STORY-TELLING',
      'INFLUENCERS / CELEBS / YOUTUBERS PARTNERSHIP'
    ],
    core: [
      'SYNCHRONOUS (THE OVERLAP)',
      'VERSATILE'
    ],
    delivery: [
      'COST EFFECTIVE',
      'No real-time Production setup',
      'No Crew',
      'TIME-EFFICIENT + HIGH-VELOCITY DELIVERY',
      'COMMERCIAL ADS',
      'READY TO GO AD CAMPAIGNS'
    ]
  };

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(
      anchorRef.current,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: anchorRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    const categoryLabels = container.querySelectorAll('.category-label');
    categoryLabels.forEach((label) => {
      gsap.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: label,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    const serviceRows = container.querySelectorAll('.service-row');
    serviceRows.forEach((row, i) => {
      gsap.to(row, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: i * 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 92%',
          toggleActions: 'play none none none'
        }
      });
    });

  }, { scope: containerRef });

  let globalIndex = 0;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-24 md:py-32 lg:py-40">
        <h2
          ref={headingRef}
          className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white/90 leading-tight mb-20 md:mb-28 lg:mb-36 max-w-3xl"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          WHAT WILL YOU GET ASSOCIATING WITH NAWF?
        </h2>

        <div
          ref={anchorRef}
          className="relative mb-16 md:mb-20 lg:mb-24 pb-12 md:pb-16 border-b border-white/10"
        >
          <div className="flex flex-col">
            <span
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white/95 tracking-tight"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="font-medium">AI</span> 360° Content Arsenal
            </span>
          </div>
        </div>

        <div className="w-full">
          <CategoryLabel text="Primary capabilities" />
          <div className="border-t border-white/10">
            {services.primary.map((service) => (
              <ServiceRow key={service} text={service} index={globalIndex++} />
            ))}
          </div>

          <CategoryLabel text="Core differentiation" />
          <div className="border-t border-white/10">
            {services.core.map((service) => (
              <ServiceRow key={service} text={service} index={globalIndex++} />
            ))}
          </div>

          <CategoryLabel text="Delivery & scale" />
          <div className="border-t border-white/10">
            {services.delivery.map((service) => (
              <ServiceRow key={service} text={service} index={globalIndex++} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceListing;
