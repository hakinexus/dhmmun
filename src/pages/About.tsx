import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useInView } from 'motion/react';
import Magnetic from '../components/Magnetic';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';

const SECRETARIAT_MEMBERS = [
  {
    name: "Alexandra Sterling",
    role: "Secretary General",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrdpDcKuXTl5WTwB7MrQzN1flNQY7jy20EnTfwspvIdnhzrpzJiZe0HHF60BvbC8M1c20qqB4om06lS_3tHEO7_Emskgo4p1EThBKB2GXiuKRB-bN__55N9q9kxZGpRDeJP_mGvF99ncqFQ3eghvDpxetyElWwgzomn3r0r82CfqBYDUZKeG61vK-juJIyW1Gx8xhDmGSd4hHniJGCq7X04y_WZACQvnI8K9k0NJbSDZ9u0Z_6X3Djj2rVlzqXGBNZUGovChI8n9I",
    delay: 0,
    philosophy: "Diplomacy is the art of letting someone else have your way."
  },
  {
    name: "Julian Thorne",
    role: "Deputy Secretary General",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxFNFZ-VeBCYSJ331cON-tL4nCb4TXYrlY6XFcOyCWxfHezCfpxtYYbTHiatJh4eI3w1HbXxb7ZhDo3G1aIOPCpg09XXf69FnaMpQQ7SvU3lYTj2b8q-hDUJMA4ZNLn8DtvmxrhoTHu-ZPYNSpp5Z_PXIjJKP5fBqcp5W1lI_WXIeWOUJYHcqnLhop4qQC3BnqvGtRbvjJCEyNhv9VSf_mRRCqdfpZPNT_sCTVqQxQPu3sU6krskq--B5w0y_cgJV8sEtkkLPw7PU",
    delay: 0.1,
    mt: "lg:mt-12",
    philosophy: "Consensus is built in the silence between arguments."
  },
  {
    name: "Elena Rodriguez",
    role: "Director of Academics",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC57vgvG0dGko8QWij46kCjPJI53pKcwH9crA1_YnQb9t9-wEVkTldIC9Sr79sE3IMpDaBhw5FgApzZ7Xad0I_nlqlmcX-chWwBZFKD24UiNj2ESKbYYjxkoK2eKIJIUPmOTNRWym88vy1vx59hMdT3qDJLi1_nn-_o8WkZtL4kugDjob6LySOMGw6R4I4btIDhSKITc3ISc3VWx-71cqAXzp--4edDz0zbkcae9sKOVTWwzO0GRnhYIpHFRXvdG4bDwEP9ecqjFlM",
    delay: 0.2,
    philosophy: "True resolution requires historical empathy."
  },
  {
    name: "Marcus Chen",
    role: "Director of Logistics",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADHIGTlbEO9acTtODdUz5jPUED0CsDfm_VBY-pOJM8Ucnqd2sHDejphzrNw3XI40Lrjku9e35NiRKVdsujhIk1mOc5RMeuL76ND8zsX1e0qEXIXSg2Pbd8IUO7O4UO1UfBjyKti9aHaN4S7YvQkTVH9ag0wChHxf67UXSE10AB-hUd4tQupoH4VwGTf5p0BFTHLpUjr0dveZZfnQjSnoQg_zgRbRsBNE2VpunseTz0QeZfeOgo0xE_r2We1NVqWGjo09Ll3FaPh1c",
    delay: 0.3,
    mt: "lg:mt-12",
    philosophy: "Precision in logistics enables freedom in discourse."
  },
  {
    name: "Sophia Vane",
    role: "Head of Press & Media",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf5A2H3cOk81NiY5dY12jWa5VIEUeSnA5BKguxSvjOqIghIuN20I2kAxsR8zqPEqHP5SE1GkzrGgzygs9nM35mtw5sEOEE3Hp1kC9KwoSR3fMw-aEJTjFel6yv95Z8LGz3is5q5I1LHWjj3KOOFFIkU7wuOccgrzIEI3EXUO82ptzOp-yXfveFGCVGZ3oiJkbyxWmlj8DJEThQ3E11e7RUSNfoH33pXGyDtSh2UldQubmcNRIln7tf-FAN1-jdcm4hAMaj8mMSjj8",
    delay: 0.4,
    philosophy: "The narrative shapes the negotiation."
  },
  {
    name: "Oliver Bennett",
    role: "Conference Manager",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPDsLTthTa0tDY4S5ClJJpTplqTXriCv6rZgit6Q18utNFoR_W1qvTZcBjZ6rxNORxqleNPmiGcEHAtSSnGWrZR44xQyrGsN0D0d7DLytllxv7aCClB3kjWasFQtXywTSX9lr2uj1xaxDN8wB4P5jOsfu5LdFvFXM8Y_bnn-x0OiqpCUAUZe8dN9kLsN15dOIWyvVouAFbW5JwyG4rtdrn9MLYqfRfoZyDmRKHGWqqKLB3SKx4u0WrcllyALXO55cSunxiNzQd7CM",
    delay: 0.5,
    mt: "lg:mt-12",
    philosophy: "Structure is the invisible hand of progress."
  },
  {
    name: "Isabella Rossi",
    role: "Chief of Staff",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClxa7qkjMo3W3F213ppZewoW0sfHagIWrKi0mhjllZf83gsa9fsFiu0XxNqykRoFOrRipl7n-BoCKtq_cwvM6Daqp70vz1BzDf7aHAb4Ed88Uv93xeyWWwyh00COOTbZX5HUAIonuDMJhLMAvGE8WdBoncx1VhNDGhRfxu0a-1MqLZdrTcRjC-OGYlpoBoyLuGIlJWJrawoNeeOmY2IuVDcNSTCg1hu8lwMzz-MYJzWYH_hyBtAmIp5cpBR7kkL0TmKmVIJxIlSgw",
    delay: 0.6,
    philosophy: "Influence flows where friction is removed."
  },
  {
    name: "Xavier Wu",
    role: "Director of Technology",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxpXZtatX6QUxslRCkUk9CD6Rj3o_m3vvuUd__4rKlrxupiPEWObjfAxXEQznj0DUhvVVXORKP6ReMeTyC0FQC5nrVuvSv9AD6hWp7gF4b0yAl5lRMgWASmSD_HoIOQ1On6T86ZwIQQA4Ydj2fS_Qo6NknrtghLmhzsDx-kqHezvkj8_jJoQYo9L5HHUJ_UWAYYTJVBcDIBfVOkY-zKYqCyMVaFyZb96bo0XSmu_oGd4HVmp-h2XQ3ophEdkTLp0zuu5qBWX4h3HE",
    delay: 0.7,
    mt: "lg:mt-12",
    philosophy: "Transparency is the ultimate diplomatic protocol."
  }
];

function SecretariatCard({ member }: { member: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [delayedInView, setDelayedInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // margin requires the card to be in the middle 20% of the screen horizontally to trigger
  const isInView = useInView(cardRef, { margin: "0px -40% 0px -40%" });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setDelayedInView(true), 300);
      return () => clearTimeout(timer);
    } else {
      setDelayedInView(false);
    }
  }, [isInView]);

  const isActive = isMobile ? delayedInView : isHovered;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply 3D effect on desktop
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: member.delay * 0.5 }}
      className={`relative w-[80vw] shrink-0 md:w-auto snap-center ${member.mt || ''}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { if (!isMobile) setIsHovered(true); }}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-card group p-6 rounded-[2rem] border border-outline-variant/20 hover:border-primary/30 transition-colors duration-500 w-full h-full flex flex-col cursor-default"
      >
        <div 
          className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Grayscale Base */}
          <img 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" 
            alt={member.name} 
            src={member.img} 
            referrerPolicy="no-referrer"
          />
          
          {/* Liquid Color Reveal */}
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: isActive ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
            className="absolute inset-0 z-10"
          >
            <img 
              className="w-full h-full object-cover scale-105" 
              alt={member.name} 
              src={member.img} 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          </motion.div>
        </div>
        
        <div className="space-y-2 flex-grow" style={{ transform: "translateZ(40px)" }}>
          <h3 className="text-2xl md:text-[1.75rem] leading-tight font-headline font-bold text-on-surface group-hover:text-primary transition-colors duration-300">{member.name}</h3>
          <p className="text-primary font-body text-sm md:text-base font-semibold tracking-wider uppercase">{member.role}</p>
          
          {/* Typewriter Philosophy */}
          <div className="mt-5 pt-5 border-t border-outline-variant/20 min-h-[80px]">
            <p className="font-mono text-xs md:text-[13px] text-on-surface-variant uppercase tracking-widest leading-relaxed">
              {member.philosophy.split("").map((char: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.01, delay: isActive ? i * 0.015 : 0 }}
                  onAnimationStart={() => {
                    if (isActive) {
                      triggerHaptic(hapticPatterns.typewriter);
                    }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-3/5"
          >
            <h1 className="text-5xl md:text-8xl font-headline font-bold leading-[0.9] tracking-tighter mb-6 md:mb-8 liquid-text-gradient chromatic-hover">
              The Legacy of <br/>Diplomacy.
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant font-body leading-relaxed max-w-2xl opacity-80">
              Downe House Model United Nations is more than a conference; it is a synthesis of historical prestige and future-focused problem solving.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
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
      <section className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="font-headline text-primary tracking-[0.3em] uppercase text-sm mb-4 block">Leadership</span>
          <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter">The Secretariat</h2>
        </motion.div>

        {/* Swipe Indicator for Mobile */}
        <div className="md:hidden flex items-center justify-center gap-2 text-on-surface-variant/60 text-sm font-medium mb-8 animate-pulse">
          <ArrowRight className="w-4 h-4" />
          <span>Swipe to explore</span>
        </div>

        {/* Profile Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 w-full md:pb-0">
          {SECRETARIAT_MEMBERS.map((member, i) => (
            <SecretariatCard key={i} member={member} />
          ))}
        </div>
      </section>
    </main>
  );
}
