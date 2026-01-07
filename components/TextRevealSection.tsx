import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TextBlockProps {
  headline: string;
  subtext: string;
  alignment: 'left' | 'right';
}

const TextBlock: React.FC<TextBlockProps> = ({ headline, subtext, alignment }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const headlineEl = headlineRef.current;
    const subtextEl = subtextRef.current;
    if (!headlineEl || !subtextEl) return;

    const words = headlineEl.querySelectorAll('.word-reveal');

    gsap.fromTo(words,
      {
        y: 40,
        opacity: 0,
        letterSpacing: '0.08em'
      },
      {
        y: 0,
        opacity: 1,
        letterSpacing: '-0.04em',
        duration: 0.5,
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headlineEl,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(subtextEl,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: subtextEl,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: blockRef });

  const wrapWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span
        key={i}
        className="word-reveal inline-block will-change-transform"
        style={{ marginRight: '0.3em' }}
      >
        {word}
      </span>
    ));
  };

  const isLeft = alignment === 'left';

  return (
    <div
      ref={blockRef}
      className={`flex flex-col gap-8 md:gap-10 ${isLeft ? '' : 'md:items-end'}`}
    >
      <h2
        ref={headlineRef}
        className={`font-space-mono font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase leading-[1.1] text-white max-w-5xl ${isLeft ? 'text-left' : 'md:text-right'}`}
        style={{ letterSpacing: '-0.04em' }}
      >
        {wrapWords(headline)}
      </h2>

      <p
        ref={subtextRef}
        className={`text-lg md:text-xl lg:text-2xl text-neutral-500 leading-relaxed max-w-md ${isLeft ? 'self-end md:mr-16' : 'self-start md:ml-16'}`}
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
      >
        {subtext}
      </p>
    </div>
  );
};

const TextRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-center py-32 md:py-40 lg:py-48 px-6 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="flex flex-col gap-32 md:gap-48 lg:gap-56 max-w-6xl mx-auto w-full">

        <TextBlock
          headline="IF YOU'RE ASKING WHAT'S SPECIAL ABOUT THESE, THE ANSWER IS YES AND NO."
          subtext="The reality within these content pieces must shape their perception."
          alignment="left"
        />

        <TextBlock
          headline="IF YOU THOUGHT EVERYTHING'S SHOWN ABOVE WAS REAL... THINK AGAIN!"
          subtext="Of course, except for Farmley."
          alignment="right"
        />

      </div>
    </section>
  );
};

export default TextRevealSection;
