import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface NodeData {
  id: string;
  label: string;
}

const LEFT_NODES: NodeData[] = [
  { id: 'ultra-realistic', label: 'ULTRA REALISTIC' },
  { id: 'photography', label: 'PHOTOGRAPHY' },
  { id: 'cinematic', label: 'CINEMATIC STORY-TELLING' },
  { id: 'influencers', label: 'INFLUENCERS / CELEBS / YOUTUBERS' },
];

const RIGHT_NODES: NodeData[] = [
  { id: 'cost-effective', label: 'COST EFFECTIVE' },
  { id: 'no-production', label: 'NO REAL-TIME PRODUCTION SETUP' },
  { id: 'no-crew', label: 'NO CREW' },
  { id: 'time-efficient', label: 'TIME-EFFICIENT + HIGH-VELOCITY' },
  { id: 'commercial-ads', label: 'COMMERCIAL ADS' },
  { id: 'ready-campaigns', label: 'READY-TO-GO AD CAMPAIGNS' },
];

const BOTTOM_NODES: NodeData[] = [
  { id: 'synchronous', label: 'SYNCHRONOUS (THE OVERLAP)' },
  { id: 'versatile', label: 'VERSATILE' },
];

const ArsenalSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const centralNodeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const central = centralNodeRef.current;
    const svg = svgRef.current;
    if (!section || !central || !svg) return;

    const leftNodes = gsap.utils.toArray<HTMLElement>('.arsenal-node-left');
    const rightNodes = gsap.utils.toArray<HTMLElement>('.arsenal-node-right');
    const bottomNodes = gsap.utils.toArray<HTMLElement>('.arsenal-node-bottom');
    const allLines = svg.querySelectorAll('.connector-line');

    allLines.forEach((line) => {
      const pathEl = line as SVGPathElement;
      const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 200;
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0
      });
    });

    gsap.set([...leftNodes, ...rightNodes, ...bottomNodes], { opacity: 0, y: 20 });
    gsap.set(central, { opacity: 0, scale: 0.9 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=2500',
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    tl.to(central, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0);

    const leftLines = svg.querySelectorAll('.connector-line-left');
    const rightLines = svg.querySelectorAll('.connector-line-right');
    const bottomLines = svg.querySelectorAll('.connector-line-bottom');

    leftLines.forEach((line, i) => {
      tl.to(line, {
        strokeDashoffset: 0,
        opacity: 0.6,
        duration: 0.2,
        ease: 'power2.inOut'
      }, 0.4 + i * 0.08);
    });

    leftNodes.forEach((node, i) => {
      tl.to(node, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out'
      }, 0.5 + i * 0.08);

      tl.to(node, {
        scale: 1.04,
        duration: 0.1,
        ease: 'power2.out'
      }, 0.6 + i * 0.08);

      tl.to(node, {
        scale: 1,
        duration: 0.1,
        ease: 'power2.out'
      }, 0.7 + i * 0.08);
    });

    rightLines.forEach((line, i) => {
      tl.to(line, {
        strokeDashoffset: 0,
        opacity: 0.6,
        duration: 0.2,
        ease: 'power2.inOut'
      }, 1.2 + i * 0.06);
    });

    rightNodes.forEach((node, i) => {
      tl.to(node, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out'
      }, 1.3 + i * 0.06);

      tl.to(node, {
        scale: 1.04,
        duration: 0.1,
        ease: 'power2.out'
      }, 1.4 + i * 0.06);

      tl.to(node, {
        scale: 1,
        duration: 0.1,
        ease: 'power2.out'
      }, 1.5 + i * 0.06);
    });

    bottomLines.forEach((line, i) => {
      tl.to(line, {
        strokeDashoffset: 0,
        opacity: 0.6,
        duration: 0.2,
        ease: 'power2.inOut'
      }, 2.0 + i * 0.1);
    });

    bottomNodes.forEach((node, i) => {
      tl.to(node, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out'
      }, 2.1 + i * 0.1);

      tl.to(node, {
        scale: 1.04,
        duration: 0.1,
        ease: 'power2.out'
      }, 2.2 + i * 0.1);

      tl.to(node, {
        scale: 1,
        duration: 0.1,
        ease: 'power2.out'
      }, 2.3 + i * 0.1);
    });

    gsap.to(central, {
      boxShadow: '0 0 40px rgba(220, 38, 38, 0.12), 0 0 80px rgba(220, 38, 38, 0.04)',
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

  }, { scope: containerRef });

  const handleNodeEnter = (e: React.MouseEvent<HTMLDivElement>, nodeId: string) => {
    gsap.to(e.currentTarget, {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(255, 255, 255, 0.4)',
      duration: 0.2,
      ease: 'power2.out'
    });
    const line = document.querySelector(`#line-${nodeId}`);
    if (line) {
      gsap.to(line, { strokeWidth: 2, opacity: 1, duration: 0.2, ease: 'power2.out' });
    }
  };

  const handleNodeLeave = (e: React.MouseEvent<HTMLDivElement>, nodeId: string) => {
    gsap.to(e.currentTarget, {
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderColor: 'rgba(255, 255, 255, 0.15)',
      duration: 0.3,
      ease: 'power2.out'
    });
    const line = document.querySelector(`#line-${nodeId}`);
    if (line) {
      gsap.to(line, { strokeWidth: 1, opacity: 0.6, duration: 0.3, ease: 'power2.out' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="relative w-full h-screen"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <svg
          ref={svgRef}
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <path id="line-ultra-realistic" className="connector-line connector-line-left" d="M 350 320 Q 500 350 680 420" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path id="line-photography" className="connector-line connector-line-left" d="M 350 390 Q 480 400 680 435" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path id="line-cinematic" className="connector-line connector-line-left" d="M 350 460 Q 500 455 680 450" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path id="line-influencers" className="connector-line connector-line-left" d="M 350 530 Q 480 510 680 465" fill="none" stroke="#dc2626" strokeWidth="1" />

          <path id="line-cost-effective" className="connector-line connector-line-right" d="M 920 420 Q 1050 310 1250 240" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path id="line-no-production" className="connector-line connector-line-right" d="M 920 435 Q 1080 360 1250 310" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path id="line-no-crew" className="connector-line connector-line-right" d="M 920 445 Q 1080 410 1250 380" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path id="line-time-efficient" className="connector-line connector-line-right" d="M 920 455 Q 1080 470 1250 450" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path id="line-commercial-ads" className="connector-line connector-line-right" d="M 920 465 Q 1080 530 1250 520" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path id="line-ready-campaigns" className="connector-line connector-line-right" d="M 920 480 Q 1080 590 1250 590" fill="none" stroke="#dc2626" strokeWidth="1" />

          <path id="line-synchronous" className="connector-line connector-line-bottom" d="M 750 490 Q 700 600 600 700" fill="none" stroke="#dc2626" strokeWidth="1" />
          <path id="line-versatile" className="connector-line connector-line-bottom" d="M 850 490 Q 900 600 1000 700" fill="none" stroke="#dc2626" strokeWidth="1" />
        </svg>

        <div
          ref={centralNodeRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-5 md:px-12 md:py-6 border-2 border-red-600/50 bg-[#080808] z-20"
          style={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent" />
          <div className="relative text-center">
            <span className="font-mono text-sm md:text-base uppercase tracking-[0.2em] text-white/95 font-medium whitespace-nowrap">
              <span className="text-red-500 font-bold">AI</span> 360° Content Arsenal
            </span>
          </div>
        </div>

        <div className="absolute left-[4%] md:left-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 items-start z-10">
          {LEFT_NODES.map((node) => (
            <div
              key={node.id}
              className="arsenal-node-left px-4 py-3 border border-white/15 bg-[#0a0a0a] cursor-pointer select-none"
              style={{ opacity: 0 }}
              onMouseEnter={(e) => handleNodeEnter(e, node.id)}
              onMouseLeave={(e) => handleNodeLeave(e, node.id)}
            >
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.12em] text-white/80 whitespace-nowrap">
                {node.label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute right-[4%] md:right-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 items-end z-10">
          {RIGHT_NODES.map((node) => (
            <div
              key={node.id}
              className="arsenal-node-right px-4 py-3 border border-white/15 bg-[#0a0a0a] cursor-pointer select-none"
              style={{ opacity: 0 }}
              onMouseEnter={(e) => handleNodeEnter(e, node.id)}
              onMouseLeave={(e) => handleNodeLeave(e, node.id)}
            >
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.12em] text-white/80 whitespace-nowrap">
                {node.label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-[10%] md:bottom-[12%] left-1/2 -translate-x-1/2 flex gap-6 md:gap-10 z-10">
          {BOTTOM_NODES.map((node) => (
            <div
              key={node.id}
              className="arsenal-node-bottom px-4 py-3 border border-white/15 bg-[#0a0a0a] cursor-pointer select-none"
              style={{ opacity: 0 }}
              onMouseEnter={(e) => handleNodeEnter(e, node.id)}
              onMouseLeave={(e) => handleNodeLeave(e, node.id)}
            >
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.12em] text-white/80 whitespace-nowrap">
                {node.label}
              </span>
            </div>
          ))}
        </div>

        <div className="md:hidden absolute left-1/2 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-red-600/30 to-transparent pointer-events-none" />

      </div>
    </section>
  );
};

export default ArsenalSection;
