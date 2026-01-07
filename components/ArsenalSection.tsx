import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  'ULTRA REALISTIC',
  'PHOTOGRAPHY',
  'CINEMATIC STORY-TELLING',
  'INFLUENCERS / CELEBS / YOUTUBERS',
  'COST EFFECTIVE',
  'NO REAL-TIME PRODUCTION',
  'NO CREW',
  'HIGH-VELOCITY DELIVERY',
  'COMMERCIAL ADS',
  'READY-TO-GO CAMPAIGNS',
  'SYNCHRONOUS OVERLAP',
  'VERSATILE',
];

const ArsenalSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const radiusX = 380;
    const radiusZ = 200;
    const angleStep = (Math.PI * 2) / ITEMS.length;

    const updatePositions = () => {
      const progress = progressRef.current.value;
      const baseAngle = progress * Math.PI * 2;

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const angle = baseAngle + index * angleStep;
        const x = Math.sin(angle) * radiusX;
        const z = Math.cos(angle) * radiusZ;
        const scale = (z + radiusZ) / (radiusZ * 2) * 0.6 + 0.4;
        const opacity = (z + radiusZ) / (radiusZ * 2) * 0.7 + 0.3;
        const zIndex = Math.round((z + radiusZ) * 10);

        gsap.set(item, {
          x: x,
          z: z,
          scale: scale,
          opacity: opacity,
          zIndex: zIndex,
        });
      });

      linesRef.current.forEach((line, index) => {
        if (!line) return;
        const angle = baseAngle + index * angleStep;
        const x = Math.sin(angle) * radiusX * 0.3;
        const z = Math.cos(angle) * radiusZ * 0.3;
        const opacity = ((Math.cos(angle) * radiusZ + radiusZ) / (radiusZ * 2)) * 0.3 + 0.1;

        line.setAttribute('x2', String(250 + x));
        line.setAttribute('y2', String(150 + z * 0.5));
        line.style.opacity = String(opacity);
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(container, { opacity: 0, scale: 0.9 });

      gsap.to(container, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to(progressRef.current, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          onUpdate: updatePositions,
        },
      });

      updatePositions();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: '250vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: '100%',
            maxWidth: '900px',
            height: '500px',
            perspective: '1000px',
            perspectiveOrigin: 'center center',
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center"
            style={{ pointerEvents: 'none' }}
          >
            <span
              className="block text-white"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                fontWeight: 300,
                letterSpacing: '0.2em',
                marginBottom: '6px',
                textTransform: 'uppercase',
              }}
            >
              AI 360°
            </span>
            <span
              className="block text-white"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                fontWeight: 500,
                letterSpacing: '0.06em',
              }}
            >
              Content Arsenal
            </span>
          </div>

          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            width="500"
            height="300"
            style={{ marginLeft: '-250px', marginTop: '-150px' }}
          >
            {ITEMS.map((_, index) => (
              <line
                key={index}
                ref={(el) => { linesRef.current[index] = el; }}
                x1="250"
                y1="150"
                x2="250"
                y2="150"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
            ))}
          </svg>

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
          >
            {ITEMS.map((text, index) => (
              <div
                key={index}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  willChange: 'transform, opacity',
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArsenalSection;
