import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface NodeData {
  id: string;
  label: string;
  group: 'left' | 'right' | 'bottom';
}

const LEFT_NODES: NodeData[] = [
  { id: 'ultra-realistic', label: 'ULTRA REALISTIC', group: 'left' },
  { id: 'photography', label: 'PHOTOGRAPHY', group: 'left' },
  { id: 'cinematic', label: 'CINEMATIC STORY-TELLING', group: 'left' },
  { id: 'influencers', label: 'INFLUENCERS / CELEBS / YOUTUBERS PARTNERSHIP', group: 'left' },
];

const RIGHT_NODES: NodeData[] = [
  { id: 'cost-effective', label: 'COST EFFECTIVE', group: 'right' },
  { id: 'no-production', label: 'NO REAL-TIME PRODUCTION SETUP', group: 'right' },
  { id: 'no-crew', label: 'NO CREW', group: 'right' },
  { id: 'time-efficient', label: 'TIME-EFFICIENT + HIGH-VELOCITY DELIVERY', group: 'right' },
  { id: 'commercial-ads', label: 'COMMERCIAL ADS', group: 'right' },
  { id: 'ready-campaigns', label: 'READY-TO-GO AD CAMPAIGNS', group: 'right' },
];

const BOTTOM_NODES: NodeData[] = [
  { id: 'synchronous', label: 'SYNCHRONOUS (THE OVERLAP)', group: 'bottom' },
  { id: 'versatile', label: 'VERSATILE', group: 'bottom' },
];

const ArsenalSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const centralNodeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const central = centralNodeRef.current;
    const svg = svgRef.current;
    if (!section || !heading || !central || !svg) return;

    const leftNodes = gsap.utils.toArray<HTMLElement>('.arsenal-node-left');
    const rightNodes = gsap.utils.toArray<HTMLElement>('.arsenal-node-right');
    const bottomNodes = gsap.utils.toArray<HTMLElement>('.arsenal-node-bottom');
    const leftLines = svg.querySelectorAll('.connector-line-left');
    const rightLines = svg.querySelectorAll('.connector-line-right');
    const bottomLines = svg.querySelectorAll('.connector-line-bottom');

    [...leftLines, ...rightLines, ...bottomLines].forEach((line) => {
      const pathEl = line as SVGPathElement;
      const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 200;
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0
      });
    });

    gsap.set(heading, { opacity: 0, y: 30 });
    gsap.set(central, { opacity: 0, scale: 0.97, y: 20 });
    gsap.set([...leftNodes, ...rightNodes, ...bottomNodes], { opacity: 0, y: 20, scale: 0.97 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=4000',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1
      }
    });

    tl.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, 0);

    tl.to(heading, {
      y: -80,
      scale: 0.9,
      opacity: 0.7,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0.4);

    tl.to(central, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.5);

    leftNodes.forEach((node, i) => {
      const delay = 0.9 + i * 0.08;
      tl.to(node, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out'
      }, delay);
    });

    leftLines.forEach((line, i) => {
      tl.to(line, {
        strokeDashoffset: 0,
        opacity: 0.4,
        duration: 0.2,
        ease: 'power2.inOut'
      }, 1.0 + i * 0.06);
    });

    rightNodes.forEach((node, i) => {
      const delay = 1.5 + i * 0.07;
      tl.to(node, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out'
      }, delay);
    });

    rightLines.forEach((line, i) => {
      tl.to(line, {
        strokeDashoffset: 0,
        opacity: 0.4,
        duration: 0.2,
        ease: 'power2.inOut'
      }, 1.6 + i * 0.05);
    });

    bottomNodes.forEach((node, i) => {
      const delay = 2.2 + i * 0.1;
      tl.to(node, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out'
      }, delay);
    });

    bottomLines.forEach((line, i) => {
      tl.to(line, {
        strokeDashoffset: 0,
        opacity: 0.4,
        duration: 0.2,
        ease: 'power2.inOut'
      }, 2.3 + i * 0.08);
    });

    tl.to({}, { duration: 0.5 }, 2.6);

  }, { scope: containerRef });

  const handleNodeEnter = (group: string) => {
    setHoveredGroup(group);

    const central = centralNodeRef.current;
    if (central) {
      gsap.to(central, {
        boxShadow: '0 0 60px rgba(220, 38, 38, 0.15), 0 0 100px rgba(220, 38, 38, 0.05)',
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    const relatedLines = document.querySelectorAll(`.connector-line-${group}`);
    relatedLines.forEach(line => {
      gsap.to(line, { opacity: 0.8, strokeWidth: 1.5, duration: 0.3 });
    });

    const otherGroups = ['left', 'right', 'bottom'].filter(g => g !== group);
    otherGroups.forEach(g => {
      const otherNodes = document.querySelectorAll(`.arsenal-node-${g}`);
      const otherLines = document.querySelectorAll(`.connector-line-${g}`);
      otherNodes.forEach(node => {
        gsap.to(node, { opacity: 0.3, duration: 0.3 });
      });
      otherLines.forEach(line => {
        gsap.to(line, { opacity: 0.15, duration: 0.3 });
      });
    });
  };

  const handleNodeLeave = () => {
    setHoveredGroup(null);

    const central = centralNodeRef.current;
    if (central) {
      gsap.to(central, {
        boxShadow: '0 0 30px rgba(220, 38, 38, 0.08), 0 0 60px rgba(220, 38, 38, 0.02)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    const allNodes = document.querySelectorAll('.arsenal-node-left, .arsenal-node-right, .arsenal-node-bottom');
    const allLines = document.querySelectorAll('.connector-line');

    allNodes.forEach(node => {
      gsap.to(node, { opacity: 1, duration: 0.4 });
    });
    allLines.forEach(line => {
      gsap.to(line, { opacity: 0.4, strokeWidth: 1, duration: 0.4 });
    });
  };

  const getNodeOpacity = (group: string) => {
    if (!hoveredGroup) return 1;
    return hoveredGroup === group ? 1 : 0.3;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="relative w-full h-screen flex items-center justify-center"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div
          ref={headingRef}
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          style={{ opacity: 0 }}
        >
          <h2 className="font-mono text-lg md:text-xl lg:text-2xl uppercase tracking-[0.15em] text-white/90 text-center whitespace-nowrap">
            WHAT WILL YOU GET ASSOCIATING WITH NAWF?
          </h2>
        </div>

        <svg
          ref={svgRef}
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <path className="connector-line connector-line-left" d="M 340 340 Q 480 370 640 420" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path className="connector-line connector-line-left" d="M 340 400 Q 460 415 640 435" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path className="connector-line connector-line-left" d="M 340 460 Q 480 458 640 450" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path className="connector-line connector-line-left" d="M 340 520 Q 460 505 640 465" fill="none" stroke="#dc2626" strokeWidth="1" />

          <path className="connector-line connector-line-right" d="M 960 420 Q 1100 330 1260 265" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path className="connector-line connector-line-right" d="M 960 432 Q 1120 370 1260 325" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path className="connector-line connector-line-right" d="M 960 444 Q 1100 410 1260 385" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path className="connector-line connector-line-right" d="M 960 456 Q 1100 470 1260 445" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path className="connector-line connector-line-right" d="M 960 468 Q 1100 530 1260 505" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path className="connector-line connector-line-right" d="M 960 480 Q 1100 580 1260 565" fill="none" stroke="#dc2626" strokeWidth="1" />

          <path className="connector-line connector-line-bottom" d="M 760 490 Q 720 580 620 680" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path className="connector-line connector-line-bottom" d="M 840 490 Q 880 580 980 680" fill="none" stroke="#dc2626" strokeWidth="1" />
        </svg>

        <div
          ref={centralNodeRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-6 md:px-14 md:py-7 border border-red-600/40 bg-[#0a0a0a] z-20"
          style={{
            opacity: 0,
            boxShadow: '0 0 30px rgba(220, 38, 38, 0.08), 0 0 60px rgba(220, 38, 38, 0.02)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent" />
          <div className="relative text-center">
            <span className="font-mono text-sm md:text-base uppercase tracking-[0.2em] text-white/95 font-medium whitespace-nowrap">
              <span className="text-red-500">AI</span> 360° Content Arsenal
            </span>
          </div>
        </div>

        <div className="absolute left-[6%] lg:left-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-4 lg:gap-5 items-start z-10">
          {LEFT_NODES.map((node) => (
            <div
              key={node.id}
              className="arsenal-node-left px-5 py-3.5 border border-white/10 bg-[#080808]/90 cursor-pointer select-none transition-colors duration-300"
              style={{ opacity: 0 }}
              onMouseEnter={() => handleNodeEnter('left')}
              onMouseLeave={handleNodeLeave}
            >
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.1em] text-white/70 whitespace-nowrap">
                {node.label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute right-[6%] lg:right-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-4 lg:gap-5 items-end z-10">
          {RIGHT_NODES.map((node) => (
            <div
              key={node.id}
              className="arsenal-node-right px-5 py-3.5 border border-white/10 bg-[#080808]/90 cursor-pointer select-none transition-colors duration-300"
              style={{ opacity: 0 }}
              onMouseEnter={() => handleNodeEnter('right')}
              onMouseLeave={handleNodeLeave}
            >
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.1em] text-white/70 whitespace-nowrap">
                {node.label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-[8%] lg:bottom-[12%] left-1/2 -translate-x-1/2 flex gap-8 lg:gap-12 z-10">
          {BOTTOM_NODES.map((node) => (
            <div
              key={node.id}
              className="arsenal-node-bottom px-5 py-3.5 border border-white/10 bg-[#080808]/90 cursor-pointer select-none transition-colors duration-300"
              style={{ opacity: 0 }}
              onMouseEnter={() => handleNodeEnter('bottom')}
              onMouseLeave={handleNodeLeave}
            >
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.1em] text-white/70 whitespace-nowrap">
                {node.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ArsenalSection;
