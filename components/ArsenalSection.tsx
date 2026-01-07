import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINES = [
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

const ArsenalSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const stack = stackRef.current;
    const lines = linesRef.current;

    if (!section || !title || !stack || lines.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(title, { opacity: 0, y: 30 });

      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      const lineHeight = 80;
      const totalHeight = lines.length * lineHeight;
      const startOffset = totalHeight / 2;

      gsap.set(stack, { y: startOffset });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;
          const yMove = -totalHeight * progress;
          gsap.set(stack, { y: startOffset + yMove });

          const viewportCenter = window.innerHeight / 2;
          const stackRect = stack.getBoundingClientRect();
          const stackTop = stackRect.top;

          lines.forEach((line, index) => {
            const lineCenter = stackTop + index * lineHeight + lineHeight / 2;
            const distanceFromCenter = Math.abs(viewportCenter - lineCenter);
            const maxDistance = lineHeight * 2;
            const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

            const opacity = 1 - normalizedDistance * 0.75;
            const scale = 1 + (1 - normalizedDistance) * 0.08;

            gsap.set(line, {
              opacity: opacity,
              scale: scale,
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <h2
          ref={titleRef}
          className="absolute top-[12%] left-1/2 -translate-x-1/2 z-20 text-white/90 text-center px-6"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          What will you get associating with NAWF?
        </h2>

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: '#3b82f6',
              boxShadow: '0 0 12px 4px rgba(59, 130, 246, 0.4)',
            }}
          />
        </div>

        <div
          ref={stackRef}
          className="relative z-10"
          style={{
            transform: 'rotate(-12deg)',
            transformOrigin: 'center center',
          }}
        >
          {LINES.map((text, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) linesRef.current[index] = el;
              }}
              className="whitespace-nowrap text-center"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'white',
                opacity: 0.25,
                height: '80px',
                lineHeight: '80px',
                textTransform: 'uppercase',
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArsenalSection;
