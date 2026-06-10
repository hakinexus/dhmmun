import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Shield, Users, ShieldAlert, ArrowRight, Banknote, HeartPulse, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COMMITTEES_DATA, Committee } from '../data/committees';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';

export default function Committees() {
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);
  const navigate = useNavigate();

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
    const delay = 0.15 + index * 0.05; // Cascades nicely starting after header

    if (committee.type === 'large') {
      return (
        <motion.div
          key={committee.id}
          layoutId={`committee-card-${committee.id}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay }}
          whileHover={{ y: -6, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSelectedCommittee(committee);
            triggerHaptic(hapticPatterns.success);
          }}
          className={`w-full md:w-auto ${committee.colSpan} group cursor-pointer`}
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
          layoutId={`committee-card-${committee.id}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay }}
          whileHover={{ y: -6, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSelectedCommittee(committee);
            triggerHaptic(hapticPatterns.success);
          }}
          className={`w-full md:w-auto ${committee.colSpan} group relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/20 cursor-pointer`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
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
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCommittee(committee);
                  triggerHaptic(hapticPatterns.success);
                }}
                className="bg-white text-background px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-colors active:scale-95"
              >
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
        layoutId={`committee-card-${committee.id}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -6, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setSelectedCommittee(committee);
          triggerHaptic(hapticPatterns.success);
        }}
        className={`w-full md:w-auto ${committee.colSpan} cursor-pointer`}
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
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCommittee(committee);
                    triggerHaptic(hapticPatterns.tap);
                  }}
                  className="text-primary flex items-center gap-2 font-bold hover:gap-4 transition-all duration-300 active:scale-95 origin-left"
                >
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/20 text-on-secondary-container text-xs font-bold tracking-widest uppercase"
        >
          <Landmark className="w-4 h-4" />
          2026 Chambers
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-headline font-bold tracking-tighter text-on-surface leading-none"
        >
          Committees <span className="text-primary">&</span> Topics
        </motion.h1>
         <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-xl text-on-surface-variant max-w-2xl font-light leading-relaxed"
        >
          Dive into the complexities of global governance. Our committees are designed to challenge delegates through rigorous debate on the most pressing issues of our time.
        </motion.p>
      </header>

      {/* Committees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 w-full">
        {COMMITTEES_DATA.map((committee, index) => renderCommitteeCard(committee, index))}
      </div>

      {/* Share Element Layout Morph Focus Viewport */}
      <AnimatePresence>
        {selectedCommittee && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Dark blurred overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCommittee(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-xl"
            />
            {/* Modal Body container */}
            <motion.div
              layoutId={`committee-card-${selectedCommittee.id}`}
              className="relative w-full max-w-4xl bg-surface-container-lowest/95 dark:bg-[#0c0d12]/95 backdrop-blur-3xl border border-primary/20 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.5)] overflow-hidden z-[120] flex flex-col md:flex-row gap-0"
              transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.55 }}
            >
              {/* Left banner/visual side */}
              <div className="w-full md:w-2/5 relative bg-surface-container-high/40 p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-outline-variant/10 overflow-hidden shrink-0">
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <div className="absolute top-[-20%] right-[-20%] w-60 h-60 bg-primary/20 rounded-full blur-[80px]" />
                  <div className="absolute bottom-[-20%] left-[-20%] w-60 h-60 bg-secondary/20 rounded-full blur-[80px]" />
                </div>
                {selectedCommittee.bgImg && (
                  <img
                    src={selectedCommittee.bgImg}
                    alt={selectedCommittee.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay scale-110 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="relative z-10 space-y-6 flex flex-col h-full justify-between">
                  <button
                    onClick={() => {
                      setSelectedCommittee(null);
                      triggerHaptic(hapticPatterns.tap);
                    }}
                    className="flex md:hidden absolute top-6 right-6 p-2 rounded-full bg-surface-container-high/60 border border-outline-variant/10 text-on-surface-variant"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit border border-primary/15 shadow-[0_4px_16px_rgba(var(--color-primary-rgb),0.1)]">
                    {getIcon(selectedCommittee.iconName)}
                  </div>
                  
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full font-black uppercase inline-block">
                      {selectedCommittee.badge || "ASSIGNMENT DECREE"}
                    </span>
                    <h3 className="text-2xl font-headline font-black text-on-surface tracking-tight leading-none">
                      {selectedCommittee.title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2.5 py-4 border-t border-outline-variant/15 text-left">
                    {selectedCommittee.seats && (
                      <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>Chamber Capacity: <strong className="text-on-surface">{selectedCommittee.seats}</strong></span>
                      </div>
                    )}
                    {selectedCommittee.format && (
                      <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>Format Style: <strong className="text-on-surface">{selectedCommittee.format}</strong></span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Security Clearance: <strong className="text-on-surface uppercase font-mono tracking-tight text-error">{
                        selectedCommittee.id === 'unsc' ? 'TOP SECRET // SG V' :
                        selectedCommittee.id === 'unhrc' ? 'RESTRICTED // LEVEL II' :
                        selectedCommittee.id === 'disec' ? 'SECRET // ORBITAL DEPT' :
                        selectedCommittee.id === 'adhoc' ? 'CLASSIFIED // CRISIS SANS' : 'DIPLOMATIC OFFICIAL'
                      }</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right content side */}
              <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-between items-start text-left relative overflow-y-auto max-h-[85vh] md:max-h-[80vh]">
                <button
                  onClick={() => setSelectedCommittee(null)}
                  className="hidden md:flex absolute top-6 right-6 p-2 rounded-full bg-surface-container-high/60 hover:bg-primary/10 hover:text-primary border border-outline-variant/10 text-on-surface-variant transition-all cursor-pointer active:scale-90"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-6 w-full pr-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-on-surface-variant uppercase">COMMITTEE AGENDA</span>
                    {selectedCommittee.topic && (
                      <h4 className="text-lg sm:text-xl font-headline font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        {selectedCommittee.topic}
                      </h4>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-on-surface-variant font-body leading-relaxed">
                    {selectedCommittee.description}
                  </p>

                  {/* Chamber Mandate & Objectives */}
                  <div className="space-y-3 pt-4 border-t border-outline-variant/10">
                    <h5 className="text-[10px] font-headline font-black tracking-widest text-primary uppercase">DIALECTIC TARGETS</h5>
                    <ul className="space-y-2 text-xs text-on-surface-variant font-body">
                      {selectedCommittee.id === 'unsc' && (
                        <>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Draft multi-lateral defense standards for post-quantum threat mitigation.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Arbitrate border sovereign networks against rogue automation algorithms.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Adopt official binding Resolutions signed under SG Security Clearance.</span></li>
                        </>
                      )}
                      {selectedCommittee.id === 'unhrc' && (
                        <>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Formulate the Universal Declaration of Digital Access & Equality.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Examine systematic information exclusion of developing littoral states.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Recommend equitable open-source algorithmic structures.</span></li>
                        </>
                      )}
                      {selectedCommittee.id === 'disec' && (
                        <>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Limit outer-atmosphere kinetic intercept vectors.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Mitigate orbital launch weapon payload proliferation.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Standardize non-destructive debris collection boundaries.</span></li>
                        </>
                      )}
                      {selectedCommittee.id === 'adhoc' && (
                        <>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>React dynamically to live broadcast intelligence feeds.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Draft rapid-crisis directives to prevent immediate border clashes.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Redraw bilateral maritime economic boundaries overnight.</span></li>
                        </>
                      )}
                      {selectedCommittee.id === 'ecosoc' && (
                        <>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Design macro climate transition bonds for high-risk emerging states.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Restructure post-crisis IMF sovereign debt repayment multipliers.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Expand digital transaction frameworks for trade liquidity.</span></li>
                        </>
                      )}
                      {selectedCommittee.id === 'who' && (
                        <>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Democratize synthesis code for generic biological therapeutic structures.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Regulate non-proliferation of programmable pathogens.</span></li>
                          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span><span>Enforce digital biosafety verification ledgers across labs.</span></li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Advisor / Chairperson profile */}
                  <div className="flex gap-4 items-center bg-surface-container/30 border border-outline-variant/10 p-3.5 rounded-2xl w-full">
                    <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center font-bold text-secondary text-xs shrink-0">
                      {selectedCommittee.id === 'unsc' ? 'IS' : selectedCommittee.id === 'unhrc' ? 'MV' : selectedCommittee.id === 'disec' ? 'SC' : selectedCommittee.id === 'adhoc' ? 'CD' : selectedCommittee.id === 'ecosoc' ? 'MA' : 'ER'}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] uppercase font-mono tracking-wider text-on-surface-variant">CHAIRPERSON / CRISIS HEAD</span>
                      <strong className="text-xs text-on-surface leading-tight">
                        {selectedCommittee.id === 'unsc' ? 'Isabella Sterling & Hani Al-Busaidi' :
                         selectedCommittee.id === 'unhrc' ? 'Michael Vance' :
                         selectedCommittee.id === 'disec' ? 'Sophia Chen' :
                         selectedCommittee.id === 'adhoc' ? 'Crisis Administration Council' :
                         selectedCommittee.id === 'ecosoc' ? 'Marcus Aurelio' : 'Elena Rostova'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Confirm Register Node Call-to-action */}
                <div className="w-full pt-6 flex items-center justify-between gap-4 mt-auto border-t border-outline-variant/10">
                  <button
                    onClick={() => {
                      setSelectedCommittee(null);
                      triggerHaptic(hapticPatterns.tap);
                    }}
                    className="px-4 py-2 text-on-surface-variant font-bold text-xs uppercase tracking-wider hover:text-on-surface transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      triggerHaptic(hapticPatterns.success);
                      navigate(`/registration?committee=${selectedCommittee.id}`);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold px-5 py-2.5 rounded-full hover:scale-102 transition-transform shadow-[0_4px_16px_rgba(var(--color-primary-rgb),0.2)] font-headline text-xs cursor-pointer"
                  >
                    Reserve Seat <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
