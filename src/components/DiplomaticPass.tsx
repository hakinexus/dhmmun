import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Shield, Fingerprint, Award, Globe, Building, CheckCircle2, QrCode } from 'lucide-react';

interface DiplomaticPassProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    participationType: string;
    institution: string;
    experience: string;
    committee: string;
    countryPref: string;
    phone?: string;
    instagram?: string;
    socials?: string;
    hearAbout?: string;
    motivation?: string;
  };
  currentStep: number;
  isSuccess: boolean;
}

export const DiplomaticPass: React.FC<DiplomaticPassProps> = ({ formData, currentStep, isSuccess }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance spring animated 3D parallax tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 }; // Snappy premium floating physics config
  
  // Rotate exactly towards the cursor: 
  // - y goes [-0.5, 0.5]: top mouse = y negative -> rotateX is positive (top tilts towards us)
  // - x goes [-0.5, 0.5]: left mouse = x negative -> rotateY is positive (left tilts towards us)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [15, -15]), springConfig);
  
  // Real-time Holographic Sheen Gradient tracking (perfectly aligned with cursor positions under the mouse)
  const sheenX = useSpring(useTransform(x, [-0.5, 0.5], ['-35%', '35%']), springConfig);
  const sheenY = useSpring(useTransform(y, [-0.5, 0.5], ['-35%', '35%']), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Exact relative mouse coordinates based on a completely stable container
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Normalize bounds strictly between [-0.5, 0.5]
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    // Graceful return to flat center
    x.set(0);
    y.set(0);
  };

  // Generate a dynamic luxury biometric credential hash based on user details
  const getSerialNumber = () => {
    if (!formData.firstName && !formData.lastName) return "DHMMUN-2026-PENDING";
    const initials = `${formData.firstName?.[0] || 'D'}${formData.lastName?.[0] || 'H'}`.toUpperCase();
    const length = formData.email ? formData.email.length : 12;
    const hexCode = (length * 7919).toString(16).toUpperCase();
    return `DH-26-${initials}-${hexCode}`;
  };

  const getClearanceLevel = () => {
    let fieldsFilled = 0;
    const totalFields = Object.keys(formData).length;
    Object.values(formData).forEach(val => {
      if (typeof val === 'string' && val.trim() !== '') fieldsFilled++;
    });
    
    if (isSuccess) return "CR-4 / MASTER SECURED";
    if (fieldsFilled > 7) return "CR-3 / COMPLETED ACCESS";
    if (fieldsFilled > 4) return "CR-2 / REGISTERED ASSIGNMENT";
    if (fieldsFilled > 0) return "CR-1 / DATA INGESTION";
    return "CR-0 / UNPARSED CONTEXT";
  };

  const getCommitteeLabel = (val: string) => {
    const list: Record<string, string> = {
      unsc: 'United Nations Security Council',
      who: 'World Health Organization',
      crisis: 'Joint Crisis Committee',
      unicef: 'UNICEF'
    };
    return list[val] || val || 'NOT CHOSEN';
  };

  const getExperienceBadge = (val: string) => {
    const list: Record<string, string> = {
      beginner: 'Novice Delegate',
      intermediate: 'Intermediate',
      advanced: 'Elite Veteran (5+)'
    };
    return list[val] || val || 'PENDING CLASSIFICATION';
  };

  return (
    <div className="w-full select-none justify-center flex py-2 sm:py-6 lg:py-10">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group w-full max-w-[420px] cursor-pointer"
        style={{ perspective: "1500px" }}
      >
        
        {/* Absolute Outer Glowing Orbit */}
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[1.8rem] sm:rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-1000" />
        
        {/* Holographic 3D Tilt Wrapper */}
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full aspect-[1.58/1] min-h-[195px] xs:min-h-[220px] sm:min-h-[250px] md:min-h-[275px] bg-white/80 dark:bg-[#0c0d12]/60 border border-zinc-200/80 dark:border-white/10 rounded-[1.6rem] xs:rounded-[1.8rem] sm:rounded-[2.2rem] p-4 xs:p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.05)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl ring-1 ring-white/15 dark:ring-white/5"
        >
          {/* Dynamic Laser-Shine Interactive Overlay */}
          <motion.div 
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 70%, rgba(255,255,255,0) 100%)`,
              left: sheenX,
              top: sheenY,
            }}
            className="absolute -inset-[100%] pointer-events-none mix-blend-overlay opacity-80 z-20 transition-all duration-75 block"
          />

          {/* Liquid Glass Texture Accent Background Grid */}
          <div className="absolute inset-0 bg-radial-at-t from-primary/10 via-transparent to-secondary/5 pointer-events-none z-0" />
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(45deg,#fff_25%,transparent_25%),linear-gradient(-45deg,#fff_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#fff_75%),linear-gradient(-45deg,transparent_75%,#fff_75%)] bg-[size:16px_16px] pointer-events-none" />

          {/* Header Row: Security Icon, Summit Metadata & Clearance */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="relative w-8 h-8 xs:w-10 xs:h-10 rounded-lg xs:rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                <Shield className="w-4 h-4 xs:w-5 xs:h-5 text-primary animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] xs:text-xs font-bold tracking-widest text-primary font-headline uppercase leading-none">DHMMUN 2026</span>
                <span className="text-[7px] xs:text-[9px] text-on-surface-variant/70 font-mono tracking-wider font-bold mt-1">DIPLOMATIC CREDENTIAL</span>
              </div>
            </div>
            <div className="flex flex-col items-end text-right font-mono">
              <span className="text-[7px] xs:text-[8px] bg-primary/10 text-primary border border-primary/25 rounded px-1.5 py-0.5 tracking-wider font-bold">
                {getClearanceLevel()}
              </span>
              <span className="text-[6px] xs:text-[7px] text-on-surface-variant/40 mt-1 uppercase tracking-widest">Global Sec. ID</span>
            </div>
          </div>

          {/* Middle Row: Diplomat Credentials & Barcode */}
          <div className="relative z-10 grid grid-cols-12 gap-3 xs:gap-4 items-center">
            
            {/* User Real-time ID / Avatar placeholder */}
            <div className="col-span-3 flex justify-center">
              <div className="relative w-11 h-11 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl xs:rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/40 flex items-center justify-center overflow-hidden hover:rotate-3 transition-transform duration-300">
                {formData.firstName || formData.lastName ? (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-sm xs:text-base sm:text-xl font-black text-primary font-headline">
                      {formData.firstName?.[0] || ''}{formData.lastName?.[0] || ''}
                    </span>
                    <Fingerprint className="w-3.5 h-3.5 text-secondary/70 absolute bottom-0.5 right-0.5 opacity-70" />
                  </div>
                ) : (
                  <Fingerprint className="w-6 h-6 xs:w-8 xs:h-8 text-on-surface-variant/30 animate-[pulse_2s_infinite]" />
                )}
                {/* Fingerprint scanlight glow */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/60 blur-[1px] animate-[scan_2.5s_ease-in-out_infinite]" />
              </div>
            </div>

            {/* Dynamic personal specifications */}
            <div className="col-span-6 flex flex-col text-left gap-0.5 xs:gap-1">
              <div className="text-[11px] xs:text-sm sm:text-base font-black tracking-tight text-on-surface font-headline truncate max-w-[120px] xs:max-w-[170px]">
                {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}` : "UNASSIGNED APPLICANT"}
              </div>
              <div className="text-[8px] xs:text-[10px] text-on-surface-variant/80 truncate font-mono max-w-[120px] xs:max-w-[170px]">
                {formData.email || "email.authentication@dhmmun.org"}
              </div>
              <div className="flex items-center gap-1 text-[8px] xs:text-[9px] text-on-surface-variant/60">
                <Building className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-secondary" />
                <span className="truncate max-w-[100px] xs:max-w-[150px] font-medium font-body leading-none">
                  {formData.participationType === 'school' ? (formData.institution || "Institution Unset") : "Individual Mission"}
                </span>
              </div>
            </div>

            {/* Micro QR / Barcode Code */}
            <div className="col-span-3 flex justify-end">
              <div className="p-1 xs:p-1.5 bg-white rounded-md xs:rounded-lg border border-white/20 filter invert opacity-80 hover:opacity-100 transition-opacity">
                <QrCode className="w-8 h-8 xs:w-10 xs:h-10 stroke-[1.25]" />
              </div>
            </div>
          </div>

          {/* Footer Row: Allocated Commitments, Preference & Signature */}
          <div className="relative z-10 pt-2 border-t border-dashed border-outline-variant/30 flex items-center justify-between text-[8px] xs:text-[9px] font-mono">
            <div className="flex flex-col text-left max-w-[65%] gap-0.5">
              <div className="text-[6px] xs:text-[7px] text-on-surface-variant/50 uppercase tracking-widest font-bold leading-none">Committee Allocation</div>
              <div className="text-[8px] xs:text-[10px] text-primary font-bold font-headline truncate mt-0.5 flex items-center gap-1">
                <Award className="w-2.5 h-2.5 xs:w-3 xs:h-3 shrink-0 text-primary" />
                {formData.committee ? getCommitteeLabel(formData.committee) : "Mission Pending"}
              </div>
            </div>
            
            <div className="flex flex-col text-right max-w-[35%] gap-0.5">
              <div className="text-[6px] xs:text-[7px] text-on-surface-variant/50 uppercase tracking-widest font-bold leading-none">SOVEREIGN</div>
              <div className="text-[8px] xs:text-[10px] text-secondary font-bold font-headline truncate mt-0.5 flex items-center gap-1 justify-end">
                <Globe className="w-2.5 h-2.5 xs:w-3 xs:h-3 shrink-0 text-secondary" />
                {formData.countryPref ? formData.countryPref.toUpperCase() : "PENDING"}
              </div>
            </div>
          </div>

          {/* Real-time Validation Checkmark emblem */}
          {isSuccess && (
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute inset-0 bg-primary/10 backdrop-blur-md flex items-center justify-center z-30 pointer-events-none"
            >
              <div className="bg-surface/90 border border-primary/30 p-4 rounded-3xl flex items-center gap-3 shadow-2xl">
                <CheckCircle2 className="w-8 h-8 text-primary animate-bounce animate-duration-1000" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black tracking-wider uppercase text-on-surface font-headline">IDENTITY APPROVED</span>
                  <span className="text-[9px] font-mono text-on-surface-variant mt-0.5">Clearing ID: {getSerialNumber()}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Subtle Dynamic Scan Serial bar */}
          <div className="absolute bottom-1 left-4 xs:left-6 text-[6px] xs:text-[7px] text-on-surface-variant/30 font-mono tracking-widest">
            {getSerialNumber()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
