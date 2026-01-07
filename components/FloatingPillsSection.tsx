import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  'ULTRA REALISTIC',
  'PHOTOGRAPHY',
  'CINEMATIC STORY-TELLING',
  'INFLUENCERS / CELEBS / YOUTUBERS PARTNERSHIP',
  'COST EFFECTIVE',
  'NO REAL-TIME PRODUCTION SETUP',
  'NO CREW',
  'TIME-EFFICIENT + HIGH-VELOCITY DELIVERY',
  'COMMERCIAL ADS',
  'READY-TO-GO AD CAMPAIGNS',
  'SYNCHRONOUS (THE OVERLAP)',
  'VERSATILE',
];

const PILL_POSITIONS = [
  { x: 15, y: 18, rotation: -7, size: 'md' },
  { x: 68, y: 12, rotation: 5, size: 'sm' },
  { x: 42, y: 28, rotation: -4, size: 'lg' },
  { x: 8, y: 42, rotation: 8, size: 'lg' },
  { x: 72, y: 35, rotation: -6, size: 'sm' },
  { x: 35, y: 52, rotation: 10, size: 'lg' },
  { x: 78, y: 55, rotation: -8, size: 'sm' },
  { x: 12, y: 65, rotation: 6, size: 'lg' },
  { x: 55, y: 68, rotation: -5, size: 'md' },
  { x: 25, y: 78, rotation: 9, size: 'md' },
  { x: 65, y: 82, rotation: -10, size: 'md' },
  { x: 45, y: 90, rotation: 4, size: 'sm' },
];

const FloatingPillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.set(heading, { opacity: 0, y: 40 });
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      pillsRef.current.forEach((pill, index) => {
        if (!pill) return;

        const yOffset = 120 + (index % 3) * 40;
        const xOffset = (index % 2 === 0 ? 1 : -1) * (20 + (index % 4) * 10);
        const rotationOffset = PILL_POSITIONS[index].rotation * 0.5;

        gsap.set(pill, {
          opacity: 0,
          y: yOffset,
          x: xOffset,
        });

        gsap.to(pill, {
          opacity: 1,
          y: 0,
          x: 0,
          rotation: `+=${rotationOffset}`,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: `top+=${index * 30} 60%`,
            end: `top+=${400 + index * 50} 20%`,
            scrub: 0.8,
          },
        });

        gsap.to(pill, {
          y: -30 - (index % 3) * 15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'center center',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: '180vh',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)',
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <h2
          ref={headingRef}
          className="absolute left-1/2 -translate-x-1/2 text-center"
          style={{
            top: '8vh',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '90%',
          }}
        >
          What will you get associating with NAWF?
        </h2>

        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: '18vh',
            width: '90%',
            maxWidth: '1200px',
            height: '75vh',
            position: 'relative',
          }}
        >
          {ITEMS.map((text, index) => {
            const pos = PILL_POSITIONS[index];
            const sizeStyles = {
              sm: { padding: '10px 20px', fontSize: '0.7rem' },
              md: { padding: '12px 26px', fontSize: '0.75rem' },
              lg: { padding: '14px 32px', fontSize: '0.8rem' },
            };
            const style = sizeStyles[pos.size as keyof typeof sizeStyles];

            return (
              <div
                key={index}
                ref={(el) => { pillsRef.current[index] = el; }}
                className="absolute cursor-default select-none pill-item"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '100px',
                  padding: style.padding,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: style.fontSize,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  color: '#1a1a1a',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                  willChange: 'transform, opacity',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = `translate(-50%, -50%) rotate(${pos.rotation}deg) translateY(-6px)`;
                  el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = `translate(-50%, -50%) rotate(${pos.rotation}deg)`;
                  el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                }}
              >
                {text}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FloatingPillsSection;
