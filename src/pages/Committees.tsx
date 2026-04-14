import { motion } from 'motion/react';
import { Landmark, Shield, Users, ShieldAlert, ArrowRight, Banknote, HeartPulse } from 'lucide-react';

export default function Committees() {
  return (
    <main className="pt-24 md:pt-40 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <header className="mb-16 md:mb-24 flex flex-col items-start gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/20 text-on-secondary-container text-xs font-bold tracking-widest uppercase"
        >
          <Landmark className="w-4 h-4" />
          2026 Chambers
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl font-headline font-bold tracking-tighter text-on-surface leading-none"
        >
          Committees <span className="text-primary">&</span> Topics
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-on-surface-variant max-w-2xl font-light leading-relaxed"
        >
          Dive into the complexities of global governance. Our committees are designed to challenge delegates through rigorous debate on the most pressing issues of our time.
        </motion.p>
      </header>

      {/* Swipe Indicator for Mobile */}
      <div className="md:hidden flex items-center gap-2 text-on-surface-variant/60 text-sm font-medium mb-4 animate-pulse">
        <ArrowRight className="w-4 h-4" />
        <span>Swipe to explore</span>
      </div>

      {/* Committees Grid */}
      <div className="flex md:grid md:grid-cols-12 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 md:pb-0 w-[calc(100vw-3rem)] md:w-full">
        {/* UNSC: Security Council (The Anchor) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="w-[85vw] shrink-0 md:w-auto md:col-span-8 snap-center group"
        >
          <div className="glass-card liquid-border rounded-xl p-6 md:p-10 h-full flex flex-col justify-between hover:bg-surface-variant/40 transition-colors duration-500 overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                  <Shield className="w-8 h-8" />
                </div>
                <span className="text-on-surface-variant font-headline text-lg font-medium opacity-50">CRITICAL THRESHOLD</span>
              </div>
              <h2 className="text-4xl font-headline font-bold mb-4">United Nations Security Council</h2>
              <h3 className="text-primary font-medium text-lg mb-8 uppercase tracking-widest">Topic: Post-Quantum Cybersecurity Threats in Sovereignty</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
                The Security Council will navigate the unprecedented challenges of encrypted warfare and the ethical implications of autonomous defense systems in a multipolar world.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-4 relative z-10">
              <span className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium">15 Seats</span>
              <span className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium">Double Delegate</span>
            </div>
            <img 
              className="absolute -right-20 -bottom-20 w-80 h-80 object-cover opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 rounded-full blur-2xl" 
              alt="dramatic low angle shot of modern architecture with sharp angles and cyan light reflections against a dark night sky" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtdWd-Pg-ZwRsYRJmopuNWBCryp95-mo3HzKAEWDYFGS9Xt5_4JX6OLAmIX9NNavs8FusqRdXmqwPbeA54YAyXCPjLauT5X-yHlWhysHckgQH2bDKu5nPy3pMYIcPgnCCTeJ9_UcWfjYJqUxsSKTTCZ30sSkFPl1Oot8EnNsd9LRdYEJzN9gSEtoVITuzDRQGLVYZkhVZK09goYsdEprCFqQB9FrVDiBlE9xNoGnvd5kM9i7Qxpj-zcfPCB5zrrbtvAa4gDLbgycc" 
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* UNHRC */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-[85vw] shrink-0 md:w-auto md:col-span-4 snap-center"
        >
          <div className="glass-card liquid-border rounded-xl p-6 md:p-10 h-full flex flex-col justify-between hover:bg-surface-variant/40 transition-colors duration-500">
            <div>
              <div className="p-4 rounded-2xl bg-secondary-container/20 text-secondary mb-8 w-fit">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-headline font-bold mb-4 leading-tight">Human Rights Council</h2>
              <p className="text-on-surface-variant leading-relaxed">
                Addressing the digital divide and universal access to information as a fundamental human right in the era of artificial intelligence.
              </p>
            </div>
            <div className="mt-8">
              <button className="text-primary flex items-center gap-2 font-bold hover:gap-4 transition-all duration-300 active:scale-95 origin-left">
                View Guide <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* DISEC */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-[85vw] shrink-0 md:w-auto md:col-span-4 snap-center"
        >
          <div className="glass-card liquid-border rounded-xl p-6 md:p-10 h-full flex flex-col justify-between hover:bg-surface-variant/40 transition-colors duration-500">
            <div>
              <div className="p-4 rounded-2xl bg-error/10 text-error mb-8 w-fit">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-headline font-bold mb-4 leading-tight">DISEC</h2>
              <p className="text-on-surface-variant leading-relaxed">
                The First Committee focuses on the regulation of space-based kinetic weapons and the prevention of an arms race in outer space.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
              <span className="text-xs text-error font-bold uppercase tracking-tighter">High Stakes</span>
            </div>
          </div>
        </motion.div>

        {/* Special Committee (Bento Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-[85vw] shrink-0 md:w-auto md:col-span-8 snap-center group relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
          <img 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
            alt="stylized digital rendering of the earth with interconnected nodes and glowing cyan light data paths" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcDYHlQgvWEbL2D36LtO286UIuiyV3yjHkHJYAVjSSVaSo8bnWvzuzdfDyuiDEHqV6ZLc_ASpp2v0C225xbgfsgkWX3kThp4Fd6i65n8BljzN1KmcORtElwAgiiE4_whJOWdJyich_1zGAbG-BW59ZAkwR2AN0EMbwPr0YYIqXDrTybot9ihY7pTt0IEiYlcA7RA6OtJwmEqahR3bMno42iajtoC6f5hOH7rQSVBn-StWq5izpZjcQQwqCMHrpImZJJVZ1y3DN40Y" 
            referrerPolicy="no-referrer"
          />
          <div className="relative z-20 p-6 md:p-12 h-full flex flex-col justify-end max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 text-primary font-bold">
              <span className="w-12 h-[1px] bg-primary"></span>
              SPECIAL CRISIS
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">Ad-Hoc: The Fluidity of Borders</h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              An immersive, fast-paced crisis simulation challenging delegates to respond to a sudden, global environmental shift that alters maritime boundaries overnight.
            </p>
            <div className="flex items-center gap-6">
              <button className="bg-white text-background px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors active:scale-95">
                Apply for Position
              </button>
            </div>
          </div>
        </motion.div>

        {/* ECOSOC */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-[85vw] shrink-0 md:w-auto md:col-span-6 snap-center"
        >
          <div className="glass-card liquid-border rounded-xl p-6 md:p-10 h-full flex flex-col justify-between hover:bg-surface-variant/40 transition-colors duration-500">
            <div className="flex items-start gap-6">
              <div className="p-5 rounded-full bg-on-secondary-container/10 text-on-secondary-container shrink-0">
                <Banknote className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-headline font-bold mb-2">ECOSOC</h2>
                <h3 className="text-on-surface-variant font-medium mb-6">Restructuring Global Debt Architecture</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Exploring innovative financial instruments to support emerging economies during climate-driven economic transitions and systemic shocks.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* WHO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-[85vw] shrink-0 md:w-auto md:col-span-6 snap-center"
        >
          <div className="glass-card liquid-border rounded-xl p-6 md:p-10 h-full flex flex-col justify-between hover:bg-surface-variant/40 transition-colors duration-500">
            <div className="flex items-start gap-6">
              <div className="p-5 rounded-full bg-primary/10 text-primary shrink-0">
                <HeartPulse className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-headline font-bold mb-2">World Health Org</h2>
                <h3 className="text-on-surface-variant font-medium mb-6">Synthetic Biology Governance</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Establishing international frameworks for the regulation of lab-grown pathogens and the democratization of gene-editing technologies.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
