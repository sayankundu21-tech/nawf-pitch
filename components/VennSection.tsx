import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const VennSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const realityCircleRef = useRef<HTMLDivElement>(null);
  const aiCircleRef = useRef<HTMLDivElement>(null);
  const nawfRef = useRef<HTMLDivElement>(null);
  const overlapRef = useRef<HTMLDivElement>(null);
  const flowLinesRef = useRef<SVGSVGElement>(null);
  const realityLabelRef = useRef<HTMLSpanElement>(null);
  const aiLabelRef = useRef<HTMLSpanElement>(null);

  const [hoveredElement, setHoveredElement] = useState<'nawf' | 'reality' | 'ai' | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 70%',
        end: 'center center',
        toggleActions: 'play none none none'
      }
    });

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 30, letterSpacing: '0.1em' },
      { opacity: 1, y: 0, letterSpacing: '0.5em', duration: 0.6, ease: 'power2.out' },
      0
    );

    tl.fromTo(realityCircleRef.current,
      { opacity: 0, x: -100, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
      0.2
    );

    tl.fromTo(aiCircleRef.current,
      { opacity: 0, x: 100, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
      0.2
    );

    tl.fromTo(overlapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      0.6
    );

    tl.fromTo(flowLinesRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      0.5
    );

    tl.fromTo(nawfRef.current,
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      0.7
    );

    tl.fromTo([realityLabelRef.current, aiLabelRef.current],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
      0.8
    );

  }, { scope: containerRef });

  const handleNawfEnter = useCallback(() => {
    setHoveredElement('nawf');

    gsap.to(overlapRef.current, {
      opacity: 0.9,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to('.flow-line', {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    });

    const letters = nawfRef.current?.querySelectorAll('.nawf-letter');
    if (letters) {
      letters.forEach((letter, i) => {
        gsap.to(letter, {
          y: (i % 2 === 0 ? -3 : 3),
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  }, []);

  const handleNawfLeave = useCallback(() => {
    setHoveredElement(null);

    gsap.to(overlapRef.current, {
      opacity: 0.6,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to('.flow-line', {
      opacity: 0.4,
      duration: 0.4,
      ease: 'power2.out'
    });

    const letters = nawfRef.current?.querySelectorAll('.nawf-letter');
    if (letters) {
      gsap.to(letters, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, []);

  const handleCircleEnter = useCallback((side: 'reality' | 'ai') => {
    setHoveredElement(side);

    const targetCircle = side === 'reality' ? realityCircleRef.current : aiCircleRef.current;
    const otherCircle = side === 'reality' ? aiCircleRef.current : realityCircleRef.current;

    gsap.to(targetCircle, {
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(otherCircle, {
      opacity: 0.5,
      duration: 0.3,
      ease: 'power2.out'
    });

    const flowClass = side === 'reality' ? '.flow-line-left' : '.flow-line-right';
    gsap.to(flowClass, {
      opacity: 1,
      strokeWidth: 2,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, []);

  const handleCircleLeave = useCallback(() => {
    setHoveredElement(null);

    gsap.to([realityCircleRef.current, aiCircleRef.current], {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to('.flow-line', {
      opacity: 0.4,
      strokeWidth: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center py-24 md:py-32"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 mb-16 md:mb-24 text-center px-4">
        <h2
          ref={headingRef}
          className="text-neutral-400 text-sm md:text-base uppercase tracking-[0.5em] font-light"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontStretch: '125%',
            letterSpacing: '0.5em'
          }}
        >
          Built With AI
        </h2>
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 flex items-center justify-center" style={{ height: '50vh', minHeight: '400px' }}>

        <svg
          ref={flowLinesRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet"
          style={{ opacity: 0 }}
        >
          <defs>
            <linearGradient id="flowGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="flowGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          <path
            className="flow-line flow-line-left"
            d="M 180 200 Q 280 180 400 200"
            fill="none"
            stroke="url(#flowGradientLeft)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.4"
          />
          <path
            className="flow-line flow-line-right"
            d="M 400 200 Q 520 220 620 200"
            fill="none"
            stroke="url(#flowGradientRight)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.4"
          />

          <circle cx="180" cy="200" r="4" fill="#dc2626" opacity="0.6" />
          <circle cx="400" cy="200" r="5" fill="#ffffff" opacity="0.8" />
          <circle cx="620" cy="200" r="4" fill="#0891b2" opacity="0.6" />
        </svg>

        <div
          ref={realityCircleRef}
          className="absolute rounded-full cursor-pointer transition-colors duration-300"
          style={{
            width: 'min(45vw, 320px)',
            height: 'min(45vw, 320px)',
            left: '10%',
            background: 'radial-gradient(circle at 40% 40%, rgba(220, 38, 38, 0.15) 0%, rgba(220, 38, 38, 0.05) 60%, transparent 100%)',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            opacity: 0
          }}
          onMouseEnter={() => handleCircleEnter('reality')}
          onMouseLeave={handleCircleLeave}
        >
          <span
            ref={realityLabelRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-red-500/60"
            style={{ marginLeft: '-20%', opacity: 0 }}
          >
            Reality
          </span>
        </div>

        <div
          ref={aiCircleRef}
          className="absolute rounded-full cursor-pointer transition-colors duration-300"
          style={{
            width: 'min(45vw, 320px)',
            height: 'min(45vw, 320px)',
            right: '10%',
            background: 'radial-gradient(circle at 60% 40%, rgba(8, 145, 178, 0.15) 0%, rgba(8, 145, 178, 0.05) 60%, transparent 100%)',
            border: '1px solid rgba(8, 145, 178, 0.2)',
            opacity: 0
          }}
          onMouseEnter={() => handleCircleEnter('ai')}
          onMouseLeave={handleCircleLeave}
        >
          <span
            ref={aiLabelRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-cyan-500/60"
            style={{ marginLeft: '20%', opacity: 0 }}
          >
            AI
          </span>
        </div>

        <div
          ref={overlapRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 'min(20vw, 140px)',
            height: 'min(35vw, 250px)',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
            opacity: 0.6
          }}
        />

        <div
          ref={nawfRef}
          className="relative z-20 cursor-pointer select-none"
          onMouseEnter={handleNawfEnter}
          onMouseLeave={handleNawfLeave}
          style={{ opacity: 0 }}
        >
          <span
            className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight flex"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {'NAWF'.split('').map((letter, i) => (
              <span
                key={i}
                className="nawf-letter inline-block will-change-transform"
              >
                {letter}
              </span>
            ))}
          </span>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span
            className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] transition-opacity duration-300 ${
              hoveredElement === 'nawf' ? 'text-white/60' : 'text-white/30'
            }`}
          >
            The Overlap
          </span>
        </div>
      </div>

    </section>
  );
};

export default VennSection;
