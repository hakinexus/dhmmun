import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Eye, Play, Pause, ChevronLeft, ChevronRight, Quote, X, ShieldCheck, Compass, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useInView, AnimatePresence } from 'motion/react';
import Magnetic from '../components/Magnetic';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';
import { SECRETARIAT_MEMBERS, SecretariatMember } from '../data/secretariat';

const MEMBER_BIOS = [
  "Tasked with steering the diplomatic engine of DHMMUN, Alexandra orchestrates the conference with a blend of meticulous vision, procedural poise, and a commitment to authentic global consensus.",
  "Julian balances the high-stakes debates with strategic procedural expertise, ensuring every committee operates as an active crucible for genuine conflict resolution and forward-thinking dialogue.",
  "Elena curates the rigorous study guides and committee briefs, empowering delegates to approach historical and modern global crises with critical empathy, academic precision, and deep analytical insight.",
  "The architect of the conference infrastructure, Marcus works behind the scenes to secure smooth operational workflows and secure tech pipelines that allow ideas to flow without physical friction.",
  "Sophia frames the dialogue that defines the conference, capturing the dynamic intensity of committees and orchestrating media releases that turn debate into a cohesive international chronicle.",
  "Oliver ensures structural perfection across venues, coordinating delegate logistics and staff guides to deliver an immaculate event atmosphere fit for world-class debate.",
  "Managing internal coordination and expert staff relations, Isabella serves as the essential connective tissue between working committees, leadership units, and external global partners.",
  "Pioneering the modern digital surfaces of DHMMUN, Xavier crafts intuitive legislative applications and digital projection assets to make legislative debate accessible, transparent, and state-of-the-art."
];

function DossierInspector({ member, bio, index, onClose }: { member: SecretariatMember; bio: string; index: number; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden select-none">
      {/* Blurred immersive background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/95 backdrop-blur-3xl"
        onClick={onClose}
      />

      {/* Main Dossier Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="w-full max-w-5xl bg-surface-container-lowest border border-outline-variant/15 rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
      >
        {/* Top Header Grid */}
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-6 py-5 md:px-10 md:py-6 shrink-0 bg-surface-container/40">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#a88544] font-bold">
              UNITED NATIONS SECURITY MATRIX // REGISTRY DIRECTORY: {index + 1}
            </span>
          </div>
          <button
            onClick={() => {
              triggerHaptic(hapticPatterns.tap);
              onClose();
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container border border-outline-variant/15 text-on-surface hover:bg-primary hover:text-white transition-colors cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Dossier Body Column */}
        <div className="overflow-y-auto px-6 py-8 md:p-10 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Holographic scanner portrait box */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-outline-variant/15 relative bg-surface-container shadow-inner">
                {/* Laser scan row */}
                <motion.div
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent z-20 shadow-[0_0_15px_rgba(var(--primary),0.8)]"
                />

                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale opacity-90 scale-[1.02]"
                  referrerPolicy="no-referrer"
                />

                {/* Cyber tech design elements */}
                <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.15] border-2 border-dashed border-primary/40 m-6 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.25] border border-primary/35 m-12 rounded-full animate-[spin_15s_linear_reverse_infinite]" />
                
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary/50" />

                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent z-15" />
              </div>

              {/* Verified metadata seals */}
              <div className="grid grid-cols-2 gap-3 font-mono text-[9px] tracking-wider text-on-surface-variant/70 bg-surface-container-low/40 p-5 rounded-2xl border border-outline-variant/10">
                <div>
                  <span className="text-on-surface-variant/40 block">DIPLOMATIC ROLE</span>
                  <span className="font-bold text-on-surface text-[11px] block mt-0.5">{member.role}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant/40 block">CLEARANCE LEVEL</span>
                  <span className="font-bold text-primary text-[11px] block mt-0.5">SEC-LEVEL-5</span>
                </div>
                <div>
                  <span className="text-on-surface-variant/40 block">REPRESENTING</span>
                  <span className="font-bold text-on-surface text-[11px] block mt-0.5">DHMMUN MUSCAT</span>
                </div>
                <div>
                  <span className="text-on-surface-variant/40 block">SECURITY STATUS</span>
                  <span className="font-bold text-emerald-500 text-[11px] block mt-0.5">VERIFIED ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Profile Narratives */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs tracking-[0.2em] text-primary font-bold uppercase py-1 px-3.5 bg-primary/10 rounded-full inline-block">
                  {member.role}
                </span>
                <h2 className="font-headline text-4xl md:text-6xl font-black text-on-surface tracking-tighter mt-3.5 leading-tight">
                  {member.name}
                </h2>
              </div>

              {/* Luxury Quote Container */}
              <div className="relative p-6 rounded-2xl bg-surface-container-high border border-outline-variant/10 overflow-hidden shadow-inner my-1">
                <Quote className="absolute right-4 top-4 w-24 h-24 text-primary/5 pointer-events-none" />
                <p className="font-headline italic text-on-surface text-lg md:text-xl lg:text-2xl relative z-10 leading-snug">
                  "{member.philosophy}"
                </p>
                <div className="w-10 h-[1.5px] bg-primary/40 mt-4" />
                <span className="font-mono text-[9px] tracking-widest text-primary/60 font-bold mt-2.5 block uppercase">
                  // OFFICIAL LEGISLATIVE MISSION PHILOSOPHY
                </span>
              </div>

              {/* Statement details */}
              <div className="space-y-4 pt-2">
                <h4 className="font-mono text-[10px] tracking-widest text-[#a88544] font-black uppercase flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  BIOGRAPHICAL CONTEXT & MANDATE
                </h4>
                <p className="font-body text-base lg:text-lg text-on-surface-variant leading-relaxed opacity-95">
                  {bio}
                </p>
              </div>

              {/* Signatures and watermarks */}
              <div className="border-t border-outline-variant/10 pt-6 mt-4 flex items-center justify-between font-mono text-[9px] text-on-surface-variant/40">
                <span>ISSUED DIRECTLY BY THE GENERAL LEGISLATIVE SECRETARIAT</span>
                <span>CODE CERT-991A-DM</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FeaturedExecutiveCard({ member, bio, index, onInspect }: { member: SecretariatMember; bio: string; index: number; onInspect: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // In-view sensing for automatic monochrome-to-color transformation
  const isInView = useInView(cardRef, { once: false, amount: 0.25 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const imgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const imgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const pctX = (e.clientX - rect.left) / rect.width - 0.5;
    const pctY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(pctX);
    y.set(pctY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onClick={onInspect}
      className={`col-span-12 group cursor-pointer border rounded-[2rem] overflow-hidden relative shadow-lg bg-surface-container-low transition-all duration-1000 ${
        isInView 
          ? "border-primary/30 shadow-2xl shadow-primary/[0.04]" 
          : "border-outline-variant/15 shadow-md"
      } hover:border-primary hover:shadow-2xl hover:shadow-primary/10`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-[2rem]"
      >
        {/* Left Side: Photo Frame */}
        <div className="lg:col-span-5 h-[340px] lg:h-[480px] relative overflow-hidden">
          <motion.img
            style={{ 
              x: imgX, 
              y: imgY,
              filter: isInView || isHovered ? "grayscale(0%) brightness(100%)" : "grayscale(100%) brightness(80%)",
              opacity: isInView || isHovered ? 0.95 : 0.45,
              scale: isInView || isHovered ? 1.0 : 1.05,
              transition: "filter 1400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1), scale 1400ms cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            src={member.img}
            alt={member.name}
            className="absolute -left-[5%] -top-[5%] w-[110%] h-[110%] object-cover group-hover:opacity-100 group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-background/40 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden z-15" />
          
          {/* Laser scanning line sweeping across the portrait on in-view state */}
          {isInView && (
            <motion.div
              initial={{ y: "-10%" }}
              animate={{ y: ["0%", "105%"] }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#a88544] to-transparent z-20 pointer-events-none shadow-[0_0_15px_rgba(168,133,68,0.7)]"
            />
          )}

          {/* Badge */}
          <div 
            className="absolute top-6 left-6 z-20 bg-primary/10 border border-primary/30 backdrop-blur-md px-4 py-1.5 rounded-full"
            style={{ transform: "translateZ(30px)" }}
          >
            <span className="font-mono text-[9px] tracking-widest text-[#a88544] font-bold uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              TOP EXECUTIVE AUTHORITY
            </span>
          </div>
        </div>

        {/* Right Side: Biographic content details */}
        <div 
          className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between gap-6 relative z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="space-y-4">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#a88544] font-bold uppercase block">
                {member.role}
              </span>
              <h3 className="font-headline text-3xl lg:text-5xl font-black text-on-surface tracking-tighter mt-1.5 group-hover:text-primary transition-colors duration-300">
                {member.name}
              </h3>
            </div>

            {/* Philosophy quotes */}
            <div className="relative p-5 rounded-2xl bg-surface-container border border-outline-variant/10 overflow-hidden shadow-inner max-w-xl">
              <Quote className="absolute right-4 top-4 w-16 h-16 text-primary/5 pointer-events-none" />
              <p className="font-headline italic text-on-surface text-base lg:text-lg relative z-10 leading-snug">
                "{member.philosophy}"
              </p>
            </div>

            <p className="font-body text-sm lg:text-base text-on-surface-variant leading-relaxed max-w-xl opacity-90 line-clamp-3">
              {bio}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-outline-variant/10 pt-5 mt-2">
            <span className="font-mono text-[10px] tracking-wider text-on-surface-variant/40 uppercase">
              // CL-MATRIX AUTHORIZED FILE SEC-0{index + 1}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInspect();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 font-headline text-xs font-bold uppercase tracking-wider text-primary"
            >
              <span>Inspect Security Dossier</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ExecutiveCard({ member, bio, index, onInspect }: { member: SecretariatMember; bio: string; index: number; onInspect: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // In-view sensing for automatic monochrome-to-color transformation
  const isInView = useInView(cardRef, { once: false, amount: 0.25 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 24 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const pctX = (e.clientX - rect.left) / rect.width - 0.5;
    const pctY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(pctX);
    y.set(pctY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onInspect}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-1000 bg-surface-container-low h-[450px] flex flex-col justify-between ${
        isInView 
          ? "border-primary/25 shadow-2xl shadow-primary/[0.03]" 
          : "border-outline-variant/15 shadow-lg"
      } hover:border-primary hover:shadow-primary/8`}
      style={{ perspective: 1200 }}
    >
      {/* 3D Panel */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative p-6 flex flex-col justify-end gap-4 overflow-hidden rounded-3xl"
      >
        {/* Grayscale Base Portrait Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src={member.img}
            alt={member.name}
            style={{
              filter: isInView || isHovered ? "grayscale(0%) brightness(100%)" : "grayscale(100%) brightness(80%)",
              opacity: isInView || isHovered ? 0.90 : 0.40,
              scale: isInView || isHovered ? 1.0 : 1.05,
              transition: "filter 1400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1), scale 1400ms cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            className="w-full h-full object-cover group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10" />

          {/* Laser scanning line sweeping across the portrait on in-view state */}
          {isInView && (
            <motion.div
              initial={{ y: "-10%" }}
              animate={{ y: ["0%", "105%"] }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#a88544] to-transparent z-20 pointer-events-none shadow-[0_0_12px_rgba(168,133,68,0.6)]"
            />
          )}
        </div>

        {/* Spot Light Ring Overlay */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.15)_0%,transparent_50%)]"
          style={{
            "--x": useMotionTemplate`${glowX}`,
            "--y": useMotionTemplate`${glowY}`
          } as any}
        />

        {/* Content Box */}
        <div
          className="relative z-30 bg-surface-container/60 backdrop-blur-md p-5 rounded-2.5xl border border-outline-variant/10 overflow-hidden shadow-xl"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Top Line Indicator */}
          <div className="w-10 h-[2px] bg-primary mb-3 group-hover:w-full transition-all duration-500" />

          <div className="space-y-1">
            <span className="font-mono text-[9px] tracking-widest text-[#a88544] font-bold uppercase block">{member.role}</span>
            <h3 className="font-headline text-2xl font-black text-on-surface tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
              {member.name}
            </h3>
          </div>

          <div className="mt-2.5 pt-2.5 border-t border-outline-variant/10 overflow-hidden h-12 relative">
            <p className="font-headline italic text-on-surface-variant text-xs line-clamp-2 leading-relaxed">
              "{member.philosophy}"
            </p>
          </div>

          {/* Footer of the card */}
          <div className="mt-3.5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-wider text-on-surface-variant/40">
              SECRETARIAT CARD SEC-0{index + 1}
            </span>
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
              <span>Inspect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SecretariatInteractiveShowcase() {
  const [selectedDossier, setSelectedDossier] = useState<number | null>(null);

  return (
    <div className="w-full relative py-6">
      
      {/* Simultaneous Grand Corporate Bento Grid Container (View All Together!) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        
        {/* Tier 1 Row: Featured Grand Cards (Secretary General and Deputy) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-8 mb-4">
          <FeaturedExecutiveCard
            member={SECRETARIAT_MEMBERS[0]}
            bio={MEMBER_BIOS[0]}
            index={0}
            onInspect={() => {
              triggerHaptic(hapticPatterns.success);
              setSelectedDossier(0);
            }}
          />
          <FeaturedExecutiveCard
            member={SECRETARIAT_MEMBERS[1]}
            bio={MEMBER_BIOS[1]}
            index={1}
            onInspect={() => {
              triggerHaptic(hapticPatterns.success);
              setSelectedDossier(1);
            }}
          />
        </div>

        {/* Tier 2 Row: Staggered Portrait Cards of Remaining Directors (Elena, Marcus, Sophia, Oliver, Isabella, Xavier) */}
        {SECRETARIAT_MEMBERS.slice(2).map((member, i) => {
          const actualIndex = i + 2;
          return (
            <div key={actualIndex}>
              <ExecutiveCard
                member={member}
                bio={MEMBER_BIOS[actualIndex]}
                index={actualIndex}
                onInspect={() => {
                  triggerHaptic(hapticPatterns.success);
                  setSelectedDossier(actualIndex);
                }}
              />
            </div>
          );
        })}

      </div>

      {/* Cyber Intelligence Dossier Inspector Overlay Panel */}
      <AnimatePresence>
        {selectedDossier !== null && (
          <DossierInspector
            member={SECRETARIAT_MEMBERS[selectedDossier]}
            bio={MEMBER_BIOS[selectedDossier]}
            index={selectedDossier}
            onClose={() => setSelectedDossier(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

export default function About() {

  // Lens Effect Logic
  const visionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const lensOpacity = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!visionRef.current) return;
    const rect = visionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const smoothLensOpacity = useSpring(lensOpacity, { stiffness: 150, damping: 20 });

  // Eye Parallax (subtle tracking)
  const eyeX = useTransform(smoothX, [0, 800], [-15, 15]);
  const eyeY = useTransform(smoothY, [0, 400], [-15, 15]);

  return (
    <main className="relative pt-24 md:pt-32 pb-20 overflow-x-hidden w-full">
      {/* Abstract Background Orbs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-[40%] left-[-5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="w-full md:w-3/5 flex flex-col items-start text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-headline font-bold leading-[0.9] tracking-tighter mb-6 md:mb-8 liquid-text-gradient chromatic-hover"
            >
              The Legacy of <br/>Diplomacy.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              className="text-xl md:text-2xl text-on-surface-variant font-body leading-relaxed max-w-2xl opacity-80"
            >
              Downe House Model United Nations is more than a conference; it is a synthesis of historical prestige and future-focused problem solving.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.10 }}
            className="w-full md:w-2/5 aspect-square relative rounded-xl overflow-hidden shadow-2xl"
          >
            <img 
              className="w-full h-full object-cover" 
              alt="Modern architectural glass building" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy3k_NtYVKSA2rOP2fkIIpBjQktMfwtrBVHC0upsD8ZpsUvV9hnHR-vAAU7BVP8og5tKt5lI3oAGnM7YuOLYxFUFrvh2gz9E17FPKT7m1i2EZmzaTa1WySPAMoQDqTEs3c9-K2yq-twgQ0t0g0ZfRxiQLGd57Jfc2W8wld3GJKAil5sT3rwDsiH2aNbFGE8dDjj21q-vSlXnwZ-2iAhm4fP2QUCiGsqe0SNyBjn3GfjgeuU-efujcBM2GIe4cTeNgfF5gOh1f6SIs" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Spirit Section (Asymmetric Layout) */}
      <section className="max-w-7xl mx-auto px-6 mb-20 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* The Vision of DHMMUN */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-start-1 md:col-end-7 flex flex-col justify-center"
          >
            <div 
              ref={visionRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => lensOpacity.set(1)}
              onMouseLeave={() => lensOpacity.set(0)}
              className="bg-surface-container-low p-12 rounded-xl relative overflow-hidden group border border-outline-variant/20 hover:border-primary/20 transition-colors duration-500"
            >
              {/* Eye Icon with Parallax */}
              <motion.div 
                style={{ x: eyeX, y: eyeY }}
                className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-0"
              >
                <Eye className="w-32 h-32 text-primary" />
              </motion.div>

              {/* Base Content */}
              <div className="relative z-10 transition-opacity duration-500 group-hover:opacity-30">
                <h2 className="text-4xl font-headline font-bold mb-6 text-primary">The Vision of DHMMUN</h2>
                <p className="text-lg text-on-surface leading-relaxed opacity-90 font-body">
                  Our vision is to empower delegates to transcend traditional debate. In the "Fluidity of Diplomacy," we encourage participants to navigate complex global tapestries with intellectual agility and moral clarity. We aim to foster an environment where consensus is not just reached, but discovered through deep understanding.
                </p>
              </div>

              {/* Magnified Lens Overlay */}
              <motion.div 
                className="absolute inset-0 z-20 pointer-events-none p-12 hidden md:block"
                style={{
                  opacity: smoothLensOpacity,
                  WebkitMaskImage: useMotionTemplate`radial-gradient(circle 140px at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`,
                  maskImage: useMotionTemplate`radial-gradient(circle 140px at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`,
                }}
              >
                <div className="relative z-10">
                  <h2 className="text-4xl font-headline font-black mb-6 text-primary text-glow">The Vision of DHMMUN</h2>
                  <p className="text-lg text-on-surface leading-relaxed font-body font-medium drop-shadow-lg">
                    Our vision is to empower delegates to transcend traditional debate. In the "Fluidity of Diplomacy," we encourage participants to navigate complex global tapestries with intellectual agility and moral clarity. We aim to foster an environment where consensus is not just reached, but discovered through deep understanding.
                  </p>
                </div>
              </motion.div>

              {/* Mobile Fallback for Lens Effect */}
              <motion.div 
                className="absolute inset-0 z-20 pointer-events-none p-12 md:hidden"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  WebkitMaskImage: "radial-gradient(circle 120px at 50% 50%, black 0%, transparent 100%)",
                  maskImage: "radial-gradient(circle 120px at 50% 50%, black 0%, transparent 100%)",
                }}
              >
                <div className="relative z-10">
                  <h2 className="text-4xl font-headline font-black mb-6 text-primary text-glow">The Vision of DHMMUN</h2>
                  <p className="text-lg text-on-surface leading-relaxed font-body font-medium drop-shadow-lg">
                    Our vision is to empower delegates to transcend traditional debate. In the "Fluidity of Diplomacy," we encourage participants to navigate complex global tapestries with intellectual agility and moral clarity. We aim to foster an environment where consensus is not just reached, but discovered through deep understanding.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* The Downe House Spirit */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-start-7 md:col-end-13 mt-12 md:mt-24"
          >
            <div className="bg-surface-container-lowest p-12 rounded-xl border border-outline-variant/10 hover:border-secondary/20 transition-colors duration-500 group relative overflow-hidden liquid-border">
              
              {/* Static Aura Background */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                  className="absolute -inset-[50%] bg-gradient-to-br from-secondary/20 via-primary/10 to-transparent blur-[80px] rounded-full mix-blend-screen opacity-50"
                />
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl font-headline font-bold mb-6 text-secondary group-hover:font-black transition-all duration-500">The Downe House Spirit</h2>
                <p className="text-lg text-on-surface leading-relaxed opacity-90 font-body">
                  Rooted in our heritage, the "Downe House Spirit" emphasizes resilience, empathy, and the pursuit of excellence. This conference reflects our commitment to nurturing global citizens who are prepared to lead with grace and speak with conviction on the world stage.
                </p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4 text-primary-fixed-dim">
              <span className="h-[1px] w-20 bg-primary/30"></span>
              <span className="font-headline tracking-widest uppercase text-xs">Excellence in Discourse</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Downe House Difference */}
      <section className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden group"
        >
          <div className="absolute inset-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzTicZQfoqIhvyIDG2wbn2V_nWpaVqambiyHlabWvPRbfnQeAgMDHOGxfXJsJ2ALfbzYS7rRu56Y9x-TO9_4nzJDPTcwC-C0j_5BWIzsvJ56Tsyu9OPwU6Xs1BSWbdlKW18CK2bKoUTHhpDW5lg0_isL9e8tFl2NnOPQrOdzsd7SyEUKAEQYDDw_XA0SsokjuI6mvuVCPNrlc7l25Q_bFl3onQx9zkboFsWUrbEv-BKkTtsMle_gqXCk7aASqdoLvTMVJQoV63dFM" 
              alt="Downe House Muscat Campus" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-12 md:p-20 md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 group-hover:font-black transition-all duration-500">The Downe House Difference</h2>
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed font-body">
              Hosted at the prestigious Downe House Muscat, our conference benefits from state-of-the-art facilities and an ethos of academic excellence. We blend traditional British educational values with the dynamic, forward-looking spirit of Oman.
            </p>
            <ul className="space-y-4 mb-10 font-body">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-on-surface">World-class auditorium and committee rooms</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-on-surface">Expertly trained chairs and secretariat</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-on-surface">Commitment to diverse representation</span>
              </li>
            </ul>
            <Magnetic strength={0.2}>
              <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all font-headline chromatic-btn-hover px-6 py-3 rounded-full bg-primary/10 border border-primary/20 active:scale-95">
                Explore the Venue <ArrowRight className="w-5 h-5" />
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </section>

      {/* Secretariat Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 lg:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="font-headline text-primary tracking-[0.3em] uppercase text-sm mb-4 block">Leadership Collective</span>
          <h2 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter mb-4">The Secretariat</h2>
          <p className="text-on-surface-variant font-body text-base md:text-lg max-w-2xl mx-auto opacity-70">
            Meet the visionaries behind DHMMUN Muscat. Interact with each leader below to explore their philosophy and mission for this year’s conference.
          </p>
        </motion.div>

        <SecretariatInteractiveShowcase />
      </section>
    </main>
  );
}
