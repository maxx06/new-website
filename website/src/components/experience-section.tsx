"use client"

import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    title: "Engineer",
    company: "Kalshi",
    image: "/kalshi.png",
    description: "Building features for the world's first regulated prediction market exchange.",
  },
  {
    title: "Founding Engineer #4",
    company: "icon.com",
    image: "/icon.png",
    description: "Founders Fund, 10M+ ARR",
  },
  {
    title: "Research Intern",
    company: "Microsoft AI",
    image: "/microsoft.png",
    description: "RL + SFT for reasoning LLMs over detection of AI-generated text. Currently achieving SOTA performances, publishing paper this January.",
  },
  {
    title: "Organizer",
    company: "HackDuke",
    image: "/hackduke_logo.jpeg",
    description: "Organizing Duke University's largest hackathon, managing logistics and operations for 500+ participants annually.",
    roundedLogo: true
  },
  {
    title: "Research & Teaching",
    company: "Duke University",
    image: "/duke.png",
    description: "Research in ML for Ecology, AI Agents, and Reasoning. TA for Data Structures & Algorithms.",
  },
  {
    title: "Research",
    company: "Rutgers University",
    image: "/rutgers.png",
    description: "Contributing to research initiatives in recommender systems and ML.",
  }
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.0001
  });

  // Smooth entry/exit of the whole sticky scene so the section doesn't feel abrupt.
  const enterOpacity = useTransform(smoothProgress, [0, 0.06], [0, 1]);
  const exitOpacity = useTransform(smoothProgress, [0.94, 1], [1, 0]);
  const sceneOpacity = useTransform([enterOpacity, exitOpacity], ([a, b]) => a * b);
  const sceneY = useTransform(smoothProgress, [0, 0.06, 0.94, 1], [18, 0, 0, -18]);
  const sceneScale = useTransform(smoothProgress, [0, 0.06, 0.94, 1], [0.985, 1, 1, 0.985]);

  return (
    <section ref={containerRef} className="relative h-[700vh] bg-black px-6 md:px-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ opacity: sceneOpacity, y: sceneY, scale: sceneScale }}
          className="relative h-full w-full"
        >
          {experiences.map((exp, i) => (
            <Card 
              key={i} 
              exp={exp} 
              index={i} 
              total={experiences.length} 
              scrollYProgress={smoothProgress} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface ExperienceCardProps {
  exp: typeof experiences[0] & { roundedLogo?: boolean };
  index: number;
  total: number;
  scrollYProgress: any;
}

function Card({ exp, index, total, scrollYProgress }: ExperienceCardProps) {
  const widthPct = 100 / total;
  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
  const smoothstep = (t: number) => t * t * (3 - 2 * t);

  // Treat the cards as a growing horizontal strip that stays centered while it grows:
  // - At start: stripCount = 1 (only Kalshi), centered.
  // - As you scroll: stripCount increases towards `total`, and the strip shifts left to stay centered.
  // This naturally makes Kalshi slide left "one slot" each time a new card joins the strip.
  const revealEnd = 0.6; // faster reveal; leaves tail scroll after fully revealed
  const stripCount = useTransform(scrollYProgress, (p) => {
    const t = clamp01(p / revealEnd);
    return 1 + (total - 1) * t;
  });

  // Left edge (in %) of the centered strip within the padded container
  const stripLeft = useTransform(stripCount, (c) => 50 - (c * widthPct) / 2);

  // Where this card should end up at the current strip size (as LEFT%, not transform%)
  const targetLeftNum = useTransform(stripLeft, (left) => left + index * widthPct);
  const prevLeftNum = useTransform(stripLeft, (left) => left + Math.max(0, index - 1) * widthPct);

  // Each non-zero index card reveals when stripCount crosses its index.
  const localReveal = useTransform(stripCount, (c) => clamp01(c - index));
  const easedReveal = useTransform(localReveal, (t) => smoothstep(t));
  const cardOpacity = useTransform(localReveal, [0, 0.02, 1], [0, 1, 1]);
  const pointerEvents = useTransform(localReveal, (t) => (t > 0.02 ? 'auto' : 'none'));

  // Slide in from *under the previous card* (same x as previous, lower z-index),
  // then peel to the right into its own slot.
  // Use vw math so landing is exact and Kalshi keeps shifting as the strip grows.
  const leftPos = useTransform([easedReveal, prevLeftNum, targetLeftNum], ([e, pl, tl]) => {
    const lp = pl * (1 - e) + tl * e;
    return `${lp}%`;
  });

  // Kalshi always participates in the strip centering (it’s card 0).
  const kalshiLeft = useTransform(stripLeft, (left) => `${left}%`);

  return (
    <motion.div 
      style={{ 
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: `${widthPct}%`,
        left: index === 0 ? kalshiLeft : leftPos,
        opacity: index === 0 ? 1 : cardOpacity,
        zIndex: total - index,
        pointerEvents: index === 0 ? 'auto' : pointerEvents,
      }}
      aria-hidden={index === 0 ? undefined : true}
      className="h-full border-r border-white/5 last:border-r-0"
    >
      <div className="h-full w-full [perspective:1200px]">
        <div className="exp-card-3d group h-full w-full bg-[#050505] flex flex-col relative overflow-hidden">
        {/* Top Image Section - 50% height */}
        <div className="relative h-[50%] w-full overflow-hidden flex-shrink-0">
          <Image
            src={exp.image}
            alt={exp.company}
            fill
            className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
          
          <div className="absolute bottom-8 left-6 right-6 z-20 flex flex-col items-start gap-3">
            <div className="w-12 h-12 relative bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-2 shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:border-primary/50">
              <Image 
                src={exp.image} 
                alt={exp.company} 
                fill 
                className={`object-contain p-1.5 ${exp.roundedLogo ? 'rounded-md' : ''}`} 
              />
            </div>
            <div className="w-full">
              <p className="text-primary font-bold text-[8px] uppercase tracking-[0.3em] mb-1 opacity-50">Experience 0{index + 1}</p>
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-white tracking-tighter leading-tight group-hover:text-primary transition-colors duration-700 break-words">
                {exp.company}
              </h3>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow p-5 md:p-6 lg:p-8 flex flex-col z-20">
          <div className="mb-4">
            <h4 className="text-sm md:text-base font-bold text-white/90 mb-1 leading-tight">{exp.title}</h4>
            <div className="w-6 h-0.5 bg-primary/30 rounded-full group-hover:w-10 group-hover:bg-primary transition-all duration-700" />
          </div>
          
          <div className="flex-grow overflow-hidden">
            <p className="text-muted-foreground text-[10px] md:text-[11px] lg:text-xs leading-relaxed font-light line-clamp-[10] md:line-clamp-none">
              {exp.description}
            </p>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
            <span className="text-[7px] font-mono tracking-widest text-primary uppercase">MEMBER // 0{index + 1}</span>
            <div className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-all" />
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  )
}
