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

const ArsenalSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const orbit = orbitRef.current;
    const title = titleRef.current;
    const lines = linesRef.current;

    if (!section || !orbit || !title || !lines) return;

    const ctx = gsap.context(() => {
      gsap.set([title, orbit, lines], { opacity: 0 });

      gsap.to([title, orbit, lines], {
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to([orbit, lines], {
        rotation: 360,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const radius = 320;
  const angleStep = 360 / ITEMS.length;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="relative" style={{ width: radius * 2 + 200, height: radius * 2 + 200 }}>
          <div
            ref={titleRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center"
          >
            <span
              className="block text-white"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontWeight: 300,
                letterSpacing: '0.15em',
                marginBottom: '8px',
              }}
            >
              AI 360°
            </span>
            <span
              className="block text-white"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                fontWeight: 500,
                letterSpacing: '0.08em',
              }}
            >
              Content Arsenal
            </span>
          </div>

          <svg
            ref={linesRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            width={radius * 2 + 200}
            height={radius * 2 + 200}
            style={{ transformOrigin: 'center center' }}
          >
            {ITEMS.map((_, index) => {
              const angle = (index * angleStep - 90) * (Math.PI / 180);
              const centerX = radius + 100;
              const centerY = radius + 100;
              const endX = centerX + Math.cos(angle) * (radius - 40);
              const endY = centerY + Math.sin(angle) * (radius - 40);

              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          <div
            ref={orbitRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              width: radius * 2,
              height: radius * 2,
              transformOrigin: 'center center',
            }}
          >
            {ITEMS.map((text, index) => {
              const angle = index * angleStep - 90;
              const rad = angle * (Math.PI / 180);
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div
                  key={index}
                  className="absolute whitespace-nowrap"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-angle - 90}deg)`,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)',
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    color: 'rgba(255,255,255,0.7)',
                    textAlign: 'center',
                  }}
                >
                  {text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArsenalSection;
