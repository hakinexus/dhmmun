import React from 'react';
import { motion } from 'motion/react';
import { Landmark, Shield, Users, ShieldAlert, ArrowRight, Banknote, HeartPulse } from 'lucide-react';
import { COMMITTEES_DATA, Committee } from '../data/committees';

export default function Committees() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-8 h-8" />;
      case 'Users':
        return <Users className="w-8 h-8" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-8 h-8" />;
      case 'Banknote':
        return <Banknote className="w-8 h-8" />;
      case 'HeartPulse':
        return <HeartPulse className="w-8 h-8" />;
      default:
        return <Shield className="w-8 h-8" />;
    }
  };

  const renderCommitteeCard = (committee: Committee, index: number) => {
    const delay = index * 0.1;

    if (committee.type === 'large') {
      return (
        <motion.div
          key={committee.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay }}
          className={`w-[85vw] shrink-0 md:w-auto ${committee.colSpan} snap-center group`}
        >
          <div className="glass-card liquid-border rounded-xl p-6 md:p-10 h-full flex flex-col justify-between hover:bg-surface-variant/40 transition-colors duration-500 overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                  {getIcon(committee.iconName)}
                </div>
                {committee.badge && (
                  <span className="text-on-surface-variant font-headline text-lg font-medium opacity-50">
                    {committee.badge}
                  </span>
                )}
              </div>
              <h2 className="text-4xl font-headline font-bold mb-4">{committee.title}</h2>
              {committee.topic && (
                <h3 className="text-primary font-medium text-lg mb-8 uppercase tracking-widest">
                  Topic: {committee.topic}
                </h3>
              )}
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
                {committee.description}
              </p>
            </div>
            <div className="mt-12 flex items-center gap-4 relative z-10">
              {committee.seats && (
                <span className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium">
                  {committee.seats}
                </span>
              )}
              {committee.format && (
                <span className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium">
                  {committee.format}
                </span>
              )}
            </div>
            {committee.bgImg && (
              <img
                className="absolute -right-20 -bottom-20 w-80 h-80 object-cover opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 rounded-full blur-2xl"
                alt="dramatic low angle shot of modern architecture with sharp angles and cyan light reflections against a dark night sky"
                src={committee.bgImg}
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </motion.div>
      );
    }

    if (committee.type === 'bento') {
      return (
        <motion.div
          key={committee.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay }}
          className={`w-[85vw] shrink-0 md:w-auto ${committee.colSpan} snap-center group relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/20`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
          {committee.bgImg && (
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
              alt="stylized digital rendering of the earth with interconnected nodes and glowing cyan light data paths"
              src={committee.bgImg}
              referrerPolicy="no-referrer"
            />
          )}
          <div className="relative z-20 p-6 md:p-12 h-full flex flex-col justify-end max-w-xl">
            {committee.badge && (
              <div className="mb-4 inline-flex items-center gap-2 text-primary font-bold">
                <span className="w-12 h-[1px] bg-primary"></span>
                {committee.badge}
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">{committee.title}</h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              {committee.description}
            </p>
            <div className="flex items-center gap-6">
              <button className="bg-white text-background px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors active:scale-95">
                {committee.actionText || 'Explore'}
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    // Default small / standard grid layout
    return (
      <motion.div
        key={committee.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay }}
        className={`w-[85vw] shrink-0 md:w-auto ${committee.colSpan} snap-center`}
      >
        <div className="glass-card liquid-border rounded-xl p-6 md:p-10 h-full flex flex-col justify-between hover:bg-surface-variant/40 transition-colors duration-500">
          <div>
            {committee.id === 'ecosoc' || committee.id === 'who' ? (
              <div className="flex items-start gap-6">
                <div className={`p-5 rounded-full shrink-0 ${committee.id === 'ecosoc' ? 'bg-on-secondary-container/10 text-on-secondary-container' : 'bg-primary/10 text-primary'}`}>
                  {getIcon(committee.iconName)}
                </div>
                <div>
                  <h2 className="text-3xl font-headline font-bold mb-2">{committee.title}</h2>
                  {committee.topic && (
                    <h3 className="text-on-surface-variant font-medium mb-6">{committee.topic}</h3>
                  )}
                  <p className="text-on-surface-variant leading-relaxed">
                    {committee.description}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className={`p-4 rounded-2xl mb-8 w-fit ${committee.id === 'disec' ? 'bg-error/10 text-error' : 'bg-secondary-container/20 text-secondary'}`}>
                  {getIcon(committee.iconName)}
                </div>
                <h2 className="text-3xl font-headline font-bold mb-4 leading-tight">{committee.title}</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {committee.description}
                </p>
              </>
            )}
          </div>
          
          {(committee.hasGuideLink || committee.statusBadge) && (
            <div className="mt-8 flex items-center gap-2">
              {committee.hasGuideLink && (
                <button className="text-primary flex items-center gap-2 font-bold hover:gap-4 transition-all duration-300 active:scale-95 origin-left">
                  {committee.actionText || 'View Guide'} <ArrowRight className="w-5 h-5" />
                </button>
              )}
              {committee.statusBadge && (
                <>
                  <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                  <span className="text-xs text-error font-bold uppercase tracking-tighter">{committee.statusBadge}</span>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <main className="pt-24 md:pt-40 pb-20 px-6 max-w-7xl mx-auto overflow-x-hidden w-full">
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
      <div className="flex md:grid md:grid-cols-12 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 md:pb-0 w-full">
        {COMMITTEES_DATA.map((committee, index) => renderCommitteeCard(committee, index))}
      </div>
    </main>
  );
}
