import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowRight, Eye, Play, Pause, ChevronLeft, ChevronRight, Quote, X, 
  ShieldCheck, Compass, ExternalLink, Fingerprint, Activity, Radio, 
  Cpu, Lock, FileText, Globe, Terminal, ShieldAlert 
} from 'lucide-react';
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

// Rich secondary biographical matrices for god-level immersive experience
const SECRETARIAT_ADVANCED_DATA: Record<number, {
  integrity: string;
  strategy: string;
  securityHash: string;
  clearanceCode: string;
  biotechSignature: string;
  regionalAuthority: string;
}> = {
  0: {
    integrity: "Alexandra Sterling maintains ultimate executive oversight of academic integrity. Under her guidance, voting frameworks have been modernized to match the highest international MUN criteria.",
    strategy: "Focusing on delegate parity, resolution consensus, and enforcing rules of assembly strictly aligned with modern diplomatic statutes.",
    securityHash: "SHA-256::E9F2A618B2C4F9A7D8CC39F18E9B1A00C2F",
    clearanceCode: "SEC-CLEAR-901-SG [OVERLORD]",
    biotechSignature: "DNA_SAMPLE_AST_8819::VERIFIED",
    regionalAuthority: "Muscat Central Assembly, Block Alpha"
  },
  1: {
    integrity: "Julian Thorne directs crisis escalation and structural resolution frameworks. He ensures high-tension debates evolve into productive models.",
    strategy: "Directing strategic mediation workflows and crisis management checkpoints designed to test intellectual elasticity.",
    securityHash: "SHA-256::D2B9F4E5A8C1F7D3E2B8840A11100C3D8FA",
    clearanceCode: "SEC-CLEAR-802-DSG [EXECUTIVE]",
    biotechSignature: "DNA_SAMPLE_JTH_9920::VERIFIED",
    regionalAuthority: "Muscat Central Assembly, Block Alpha"
  },
  2: {
    integrity: "Elena Rodriguez guards absolute academic accuracy across study briefs, background papers, and legislative research portfolios.",
    strategy: "Reviewing citation authenticity, historical truthfulness, and empirical metrics of working draft papers with absolute academic precision.",
    securityHash: "SHA-256::B1C8E5E1D3F2D4C0A5F9D2B883C1A2F8",
    clearanceCode: "SEC-CLEAR-703-ACA [ACADEMIC]",
    biotechSignature: "DNA_SAMPLE_ERO_4410::VERIFIED",
    regionalAuthority: "Academic Directorate, Block Beta"
  },
  3: {
    integrity: "Marcus Chen coordinates event infrastructure, operational distribution pipelines, and materials workflows.",
    strategy: "Deploying micro-scheduling algorithms and venue layout flow models to guarantee zero-friction travel logistics during committees.",
    securityHash: "SHA-256::C5C3A1F4B2C8D9E3A4B1D992FF3A1A2D",
    clearanceCode: "SEC-CLEAR-604-LOG [LOGISTICS]",
    biotechSignature: "DNA_SAMPLE_MCH_3391::VERIFIED",
    regionalAuthority: "Infrastructure Hub, Block Gamma"
  },
  4: {
    integrity: "Sophia Vane regulates DHMMUN chronicles, media coordination, and official delegate press releases.",
    strategy: "Shaping public perceptions of international debate, managing high-fidelity media campaigns, and coordinating active press pools.",
    securityHash: "SHA-256::A9F9C8D2B4E1A5C7E8A9E002B3C5A8F9",
    clearanceCode: "SEC-CLEAR-505-MED [CHRONICLE]",
    biotechSignature: "DNA_SAMPLE_SVA_7228::VERIFIED",
    regionalAuthority: "Press Directorate, Block Delta"
  },
  5: {
    integrity: "Oliver Bennett governs room dynamics, venue readiness, and team assignments for maximum event impact.",
    strategy: "Implementing clean schedules, strategic checkpoint controls, and staff delegation metrics to produce an exceptional assembly state.",
    securityHash: "SHA-256::E1F8C2A4D3F9E1A7D18B11B2C3C4B82A",
    clearanceCode: "SEC-CLEAR-406-MGR [STRATEGY]",
    biotechSignature: "DNA_SAMPLE_OBE_8131::VERIFIED",
    regionalAuthority: "Venue Operations, Block Epsilon"
  },
  6: {
    integrity: "Isabella Rossi operates as the central administrative tissue connecting individual chairs with executive authority boards.",
    strategy: "Supervising staff communication integrity rules, chair-coordination workflows, and international delegate relations.",
    securityHash: "SHA-256::F4C9B1E4A5C2D9A1B1C5A60F8E3D7C9A",
    clearanceCode: "SEC-CLEAR-307-COS [SYNERGY]",
    biotechSignature: "DNA_SAMPLE_IRO_5521::VERIFIED",
    regionalAuthority: "Administrative Council, Block Zeta"
  },
  7: {
    integrity: "Xavier Wu crafts custom web platforms, live resolution databases, and visual statistics graphs for local assemblies.",
    strategy: "Securing web services, designing intuitive legislative UX/UI, and providing zero-latency voting projections.",
    securityHash: "SHA-256::A1C5F9D2B7D9C3E1F5C8A009C2B7E1D4",
    clearanceCode: "SEC-CLEAR-208-TEC [INTELLIGENCE]",
    biotechSignature: "DNA_SAMPLE_XWU_2291::VERIFIED",
    regionalAuthority: "Tech Operations, Block Sigma"
  }
};

function DossierInspector({ member, bio, index, onClose }: { member: SecretariatMember; bio: string; index: number; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'mandate' | 'integrity' | 'security'>('mandate');
  const details = SECRETARIAT_ADVANCED_DATA[index] || SECRETARIAT_ADVANCED_DATA[0];
  const [decryptProgress, setDecryptProgress] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (activeTab === 'security') {
      setDecryptProgress(0);
      const interval = setInterval(() => {
        setDecryptProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 4;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

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
        className="w-full max-w-5xl bg-surface-container-lowest border border-[#a88544]/20 rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
      >
        {/* Holographic scanner top corner marks */}
        <div className="absolute top-2 left-6 font-mono text-[7px] text-[#a88544]/30 pointer-events-none">SYS_READY_A9 // COORD:23.58</div>
        <div className="absolute top-2 right-6 font-mono text-[7px] text-[#a88544]/30 pointer-events-none">DHMMUN_SEC_PROTOCOL</div>

        {/* Top Header Grid */}
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-6 py-5 md:px-10 md:py-6 shrink-0 bg-surface-container/40">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#a88544] font-bold flex items-center gap-2">
              <SecurityIcon className="w-4 h-4 animate-spin text-[#a88544]" />
              DIPLOMATIC DIRECTORY SECURITY ARCHIVE // SEC-0{index + 1}
            </span>
          </div>
          <button
            onClick={() => {
              triggerHaptic(hapticPatterns.tap);
              onClose();
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container border border-outline-variant/15 text-on-surface hover:bg-[#a88544] hover:text-white hover:border-[#a88544] transition-all cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Dossier Body Column */}
        <div className="overflow-y-auto px-6 py-8 md:p-10 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Holographic scanner portrait box */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-[#a88544]/25 relative bg-surface-container shadow-inner">
                {/* Laser scan row */}
                <motion.div
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#a88544] to-transparent z-20 shadow-[0_0_15px_rgba(168,133,68,0.8)]"
                />

                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale opacity-90 scale-[1.02]"
                  referrerPolicy="no-referrer"
                />

                {/* Cyber tech design elements */}
                <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.12] border-2 border-dashed border-[#a88544] m-6 rounded-full animate-[spin_50s_linear_infinite]" />
                <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.22] border border-[#a88544]/40 m-12 rounded-full animate-[spin_20s_linear_reverse_infinite]" />
                
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#a88544]/50" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#a88544]/50" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#a88544]/50" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#a88544]/50" />

                {/* Fully transparent overlay for sharp photorealistic display of members */}
              </div>

              {/* Verified metadata seals */}
              <div className="grid grid-cols-2 gap-3 font-mono text-[9px] tracking-wider text-on-surface-variant/70 bg-surface-container-low/40 p-5 rounded-2xl border border-outline-variant/10">
                <div>
                  <span className="text-[#a88544]/55 block font-bold">DIPLOMATIC ROLE</span>
                  <span className="font-bold text-on-surface text-[10px] block mt-0.5">{member.role}</span>
                </div>
                <div>
                  <span className="text-[#a88544]/55 block font-bold">ACCESS STATUS</span>
                  <span className="font-bold text-emerald-500 text-[10px] block mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> VERIFIED_PASSED
                  </span>
                </div>
                <div>
                  <span className="text-[#a88544]/55 block font-bold">REGISTRY LOCATION</span>
                  <span className="font-bold text-on-surface text-[10px] block mt-0.5">{details.regionalAuthority}</span>
                </div>
                <div>
                  <span className="text-[#a88544]/55 block font-bold">SYSTEM INTEGRITY</span>
                  <span className="font-bold text-primary text-[10px] block mt-0.5">100% ONLINE</span>
                </div>
              </div>
            </div>

            {/* Profile Narratives & Dynamic Dossier Tabs */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs tracking-[0.2em] text-[#a88544] font-black uppercase py-1 px-3.5 bg-[#a88544]/10 rounded-full inline-block">
                  {member.role}
                </span>
                <h2 className="font-headline text-4xl md:text-6xl font-black text-on-surface tracking-tighter mt-3.5 leading-tight">
                  {member.name}
                </h2>
              </div>

              {/* Tab Selector with framer motion underlay slider */}
              <div className="flex border-b border-outline-variant/10 p-1 bg-surface-container-low rounded-xl gap-2 font-mono text-xs">
                {(['mandate', 'integrity', 'security'] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        triggerHaptic(hapticPatterns.light);
                        setActiveTab(tab);
                      }}
                      className={`relative flex-1 py-3 text-center rounded-lg uppercase tracking-widest font-bold transition-all duration-300 z-10 cursor-pointer ${
                        isActive ? "text-[#a88544]" : "text-on-surface-variant/50 hover:text-on-surface-variant"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeInspectorTabIndicator"
                          className="absolute inset-0 bg-primary/10 border-b-2 border-[#a88544] rounded-lg -z-10"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      {tab === 'mandate' && 'General Mandate'}
                      {tab === 'integrity' && 'Legislative Strategy'}
                      {tab === 'security' && 'Security Clearance'}
                    </button>
                  );
                })}
              </div>

              {/* Tab Display Area */}
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'mandate' && (
                    <motion.div
                      key="mandate"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      {/* Luxury Quote Container */}
                      <div className="relative p-6 rounded-2xl bg-[#a88544]/5 border border-[#a88544]/10 overflow-hidden shadow-inner my-1">
                        <Quote className="absolute right-4 top-4 w-24 h-24 text-primary/5 pointer-events-none" />
                        <p className="font-headline italic text-on-surface text-lg md:text-xl relative z-10 leading-snug">
                          "{member.philosophy}"
                        </p>
                        <div className="w-10 h-[1.5px] bg-[#a88544]/50 mt-4" />
                        <span className="font-mono text-[8px] tracking-widest text-primary/60 font-black mt-2.5 block uppercase">
                          // DECLARED LEGISLATIVE PRESTIGE PHILOSOPHY
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-mono text-[10px] tracking-widest text-[#a88544] font-black uppercase flex items-center gap-2">
                          <Compass className="w-4 h-4" />
                          BIOGRAPHICAL PROFILE
                        </h4>
                        <p className="font-body text-base text-on-surface-variant leading-relaxed opacity-95">
                          {bio}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'integrity' && (
                    <motion.div
                      key="integrity"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="p-6 rounded-2xl border border-outline-variant/15 bg-surface-container-high/40">
                        <div className="flex items-center gap-3 mb-4">
                          <FileText className="w-5 h-5 text-primary" />
                          <h4 className="font-mono text-xs tracking-wider text-on-surface font-bold">
                            OFFICIAL ASSEMBLY RESPONSIBILITY RECORD
                          </h4>
                        </div>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                          {details.integrity}
                        </p>
                      </div>

                      <div className="p-6 rounded-2xl border border-[#a88544]/20 bg-[#a88544]/5">
                        <div className="flex items-center gap-3 mb-3">
                          <Activity className="w-5 h-5 text-[#a88544] animate-pulse" />
                          <h4 className="font-mono text-xs tracking-wider text-[#a88544] font-black">
                            COMMITTEE PROTOCOLS & INTEGRITY
                          </h4>
                        </div>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                          {details.strategy}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'security' && (
                    <motion.div
                      key="security"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5 font-mono text-xs text-on-surface-variant"
                    >
                      <div className="p-6 rounded-2xl border border-[#a88544]/20 bg-black/40 text-emerald-500 overflow-hidden relative">
                        <Terminal className="absolute right-4 top-4 w-12 h-12 text-emerald-500/10 pointer-events-none" />
                        
                        <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-3 mb-4">
                          <Cpu className="w-4 h-4 text-emerald-500" />
                          <span className="font-black tracking-widest text-[10px]">REAL-TIME SECURITY LINK ACTIVE</span>
                        </div>

                        <div className="space-y-2.5 text-[11px] leading-relaxed">
                          <div>
                            <span className="text-emerald-500/50">SYSTEM LEVEL: </span>
                            <span className="font-bold text-emerald-400">{details.clearanceCode}</span>
                          </div>
                          <div>
                            <span className="text-emerald-500/50">ENCRYPTION HASH: </span>
                            <span className="font-bold select-all text-emerald-400">{details.securityHash}</span>
                          </div>
                          <div>
                            <span className="text-emerald-500/50">BIOMETRICS PATH: </span>
                            <span className="font-bold text-emerald-200">{details.biotechSignature}</span>
                          </div>
                          <div>
                            <span className="text-emerald-500/50">OMAN LEGISLATIVE PATH: </span>
                            <span className="text-emerald-300">AUTHORIZED ACCESS PORT COORD::MUS_9901A</span>
                          </div>
                        </div>

                        {/* Decrypting Progress Bar */}
                        <div className="mt-5 space-y-1.5">
                          <div className="flex justify-between text-[9px] text-emerald-500/70">
                            <span>DECRYPTING BIOMETRIC CLEARANCE MATRIX...</span>
                            <span>{decryptProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-500/20">
                            <motion.div 
                              className="h-full bg-emerald-500"
                              style={{ width: `${decryptProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-2xl border border-primary/20 text-on-surface">
                        <Fingerprint className="w-5 h-5 text-primary" />
                        <span className="text-[10px] tracking-wider leading-relaxed text-on-surface-variant">
                          This diplomat matrix is officially certified by the Oman General Secretariat Security Bureau. Authorized persons only are permitted transmission variables.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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

function SecurityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
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

  // God-level Spotlight Physics
  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const goldSpotlight = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(168, 133, 68, 0.18) 0%, transparent 60%)`;

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
          ? "border-[#a88544]/40 shadow-2xl shadow-primary/[0.04]" 
          : "border-outline-variant/15 shadow-md"
      } hover:border-[#a88544] hover:shadow-2xl hover:shadow-primary/10`}
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Golden Spotlight Aura */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: goldSpotlight }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-[2rem]"
      >
        {/* Left Side: Photo Frame */}
        <div className="lg:col-span-12 xl:col-span-5 h-[340px] xl:h-[480px] relative overflow-hidden">
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
          {/* Unmasked sharp portrait focus without edge-fading artifacts */}
          
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
            className="absolute top-6 left-6 z-20 bg-[#a88544]/10 border border-[#a88544]/30 backdrop-blur-md px-4 py-1.5 rounded-full"
            style={{ transform: "translateZ(30px)" }}
          >
            <span className="font-mono text-[9px] tracking-widest text-[#a88544] font-bold uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              TOP EXECUTIVE AUTHORITY // REGISTRY SEC-0{index + 1}
            </span>
          </div>
        </div>

        {/* Right Side: Biographic content details */}
        <div 
          className="lg:col-span-12 xl:col-span-7 p-8 lg:p-12 flex flex-col justify-between gap-6 relative z-10"
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
              // CL-MATRIX AUTHORIZED FILE M-0{index + 1}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInspect();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a88544]/10 border border-[#a88544]/20 hover:bg-[#a88544] hover:text-white transition-all duration-300 active:scale-95 font-headline text-xs font-bold uppercase tracking-wider text-[#a88544]"
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
  
  // Spotlight position
  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const goldSpotlight = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(168, 133, 68, 0.18) 0%, transparent 60%)`;

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
          ? "border-[#a88544]/35 shadow-2xl shadow-primary/[0.03]" 
          : "border-outline-variant/15 shadow-lg"
      } hover:border-[#a88544] hover:shadow-primary/8`}
      style={{ perspective: 1200 }}
    >
      {/* Golden-amber precise pointer spotlight overlay */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: goldSpotlight }}
      />

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
          {/* Pure transparent boundary for crisp image detailing */}

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

        {/* Content Box */}
        <div
          className="relative z-30 bg-surface-container/60 backdrop-blur-md p-5 rounded-2.5xl border border-outline-variant/10 overflow-hidden shadow-xl"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Top Line Indicator */}
          <div className="w-10 h-[2px] bg-[#a88544] mb-3 group-hover:w-full transition-all duration-500" />

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
            <span className="font-mono text-[8.5px] uppercase tracking-wider text-on-surface-variant/40">
              // REGISTER SEC-0{index + 1}
            </span>
            <div className="flex items-center gap-1.5 text-[#a88544] text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
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
            {/* Beautiful sharp image borders without washing/cloudy edge-fades */}
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
                  className="absolute -inset-[50%] bg-gradient-to-br from-secondary/20 via-primary/10 to-transparent blur-[80px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50"
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent z-10"></div>
          </div>
          
          <div className="relative z-20 p-12 md:p-20 md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 group-hover:font-black transition-all duration-500 text-white">The Downe House Difference</h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed font-body">
              Hosted at the prestigious Downe House Muscat, our conference benefits from state-of-the-art facilities and an ethos of academic excellence. We blend traditional British educational values with the dynamic, forward-looking spirit of Oman.
            </p>
            <ul className="space-y-4 mb-10 font-body">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-white/90">World-class auditorium and committee rooms</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-white/90">Expertly trained chairs and secretariat</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-white/90">Commitment to diverse representation</span>
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
