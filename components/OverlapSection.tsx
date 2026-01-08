import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const OverlapSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'center center',
        scrub: 0.5,
      }
    });

    tl.fromTo(lineLeftRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
      0
    );

    tl.fromTo(lineRightRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
      0
    );

    tl.fromTo(labelRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      0.2
    );

    tl.fromTo(glowRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
      0.3
    );

  }, { scope: containerRef });

  const handleMouseEnter = useCallback(() => {
    gsap.to(labelRef.current, {
      scale: 1.1,
      letterSpacing: '0.7em',
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to(glowRef.current, {
      opacity: 1,
      scale: 1.3,
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to([lineLeftRef.current, lineRightRef.current], {
      scaleX: 1.2,
      duration: 0.4,
      ease: 'power2.out'
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(labelRef.current, {
      scale: 1,
      letterSpacing: '0.5em',
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to(glowRef.current, {
      opacity: 0.6,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to([lineLeftRef.current, lineRightRef.current], {
      scaleX: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] overflow-hidden flex items-center justify-center py-16 md:py-20"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 flex items-center justify-center w-full max-w-4xl px-8">
        <div
          ref={lineLeftRef}
          className="flex-1 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(234, 88, 12, 0.6) 100%)',
            transformOrigin: 'right center',
            opacity: 0
          }}
        />

        <div
          className="relative px-8 md:px-12 cursor-pointer select-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.15) 0%, transparent 70%)',
              transform: 'scale(2)',
              opacity: 0
            }}
          />

          <div
            ref={labelRef}
            className="relative"
            style={{ opacity: 0 }}
          >
            <span
              className="font-mono text-sm md:text-base uppercase text-white/80 font-medium"
              style={{ letterSpacing: '0.5em' }}
            >
              The Overlap
            </span>
          </div>
        </div>

        <div
          ref={lineRightRef}
          className="flex-1 h-px"
          style={{
            background: 'linear-gradient(90deg, rgba(234, 88, 12, 0.6) 0%, transparent 100%)',
            transformOrigin: 'left center',
            opacity: 0
          }}
        />
      </div>
    </section>
  );
};

export default OverlapSection;
