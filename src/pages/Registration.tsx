import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  IdCard, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Calendar, 
  Users, 
  Globe, 
  Building, 
  ShieldCheck, 
  Lock, 
  Activity, 
  Download,
  X,
  Phone,
  Instagram,
  Share2,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';
import { feedbackSounds } from '../lib/audio';
import { SpotlightInput, SpotlightSelect } from '../components/SpotlightInput';
import { DiplomaticPass } from '../components/DiplomaticPass';
import { BriefingAdvisor } from '../components/BriefingAdvisor';

type Step = 1 | 2 | 3 | 4;

export default function Registration() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDraftToast, setShowDraftToast] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Robust State Management for 4 Steps
  const [formData, setFormData] = useState({
    // Step 1: Identity
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    // Step 2: Representation
    participationType: '',
    institution: '',
    experience: '',
    // Step 3: Connect & Know More (Optional but Recommended)
    phone: '',
    instagram: '',
    socials: '',
    hearAbout: '',
    motivation: '',
    // Step 4: Assignment
    committee: '',
    countryPref: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 1. Persistent Micro-Draft Restore Trigger
  useEffect(() => {
    const savedDraft = localStorage.getItem('dhmmun_registration_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        // Verify we have non-trivial input answers in our draft
        const exists = Object.values(parsed).some(val => typeof val === 'string' && val.trim() !== '');
        if (exists) {
          setFormData(prev => ({ ...prev, ...parsed }));
          setShowDraftToast(true);
          triggerHaptic(hapticPatterns.success);
        }
      } catch (e) {
        console.error("Failed to recover localized form draft state", e);
      }
    }
  }, []);

  // Guarantee that the toast always closes perfectly after 3.5s
  useEffect(() => {
    if (showDraftToast) {
      const t = setTimeout(() => {
        setShowDraftToast(false);
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [showDraftToast]);

  // 2. Persistent Auto-Backup Draft Engine Update
  useEffect(() => {
    if (!isSuccess) {
      localStorage.setItem('dhmmun_registration_draft', JSON.stringify(formData));
    }
  }, [formData, isSuccess]);

  const validateStep = (step: Step) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "Required";
      if (!formData.lastName.trim()) newErrors.lastName = "Required";
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email required";
      if (!formData.dob) {
        newErrors.dob = "Required";
      } else {
        const dobRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = formData.dob.match(dobRegex);
        if (!match) {
          newErrors.dob = "Format: DD/MM/YYYY";
        } else {
          const day = parseInt(match[1], 10);
          const month = parseInt(match[2], 10);
          const year = parseInt(match[3], 10);
          const date = new Date(year, month - 1, day);
          if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            newErrors.dob = "Invalid date";
          } else {
            const today = new Date();
            let age = today.getFullYear() - date.getFullYear();
            const m = today.getMonth() - date.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
            if (age < 12) newErrors.dob = "You must be at least 12 years old";
            else if (age > 100) newErrors.dob = "Please enter a valid birth year";
          }
        }
      }
    } 
    else if (step === 2) {
      if (!formData.participationType) newErrors.participationType = "Required";
      if (formData.participationType === 'school' && !formData.institution.trim()) newErrors.institution = "Required";
      if (!formData.experience) newErrors.experience = "Required";
    }
    else if (step === 3) {
      // Step 3 (Social connectivity & Delegate details) is entirely optional & recommended
      // No validation checks or blocking errors apply to this step
    }
    else if (step === 4) {
      if (!formData.committee) newErrors.committee = "Required";
      if (!formData.countryPref.trim()) newErrors.countryPref = "Required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      triggerHaptic(hapticPatterns.light);
      feedbackSounds.click();
      setCurrentStep(prev => (prev + 1) as Step);
    } else {
      triggerHaptic(hapticPatterns.error);
      feedbackSounds.error();
    }
  };

  const handlePrev = () => {
    triggerHaptic(hapticPatterns.light);
    feedbackSounds.click();
    setCurrentStep(prev => (prev - 1) as Step);
  };

  // Enable direct jumping if the requested step's predecessors are fully valid
  const handleStepJump = (target: Step) => {
    if (target === currentStep) return;
    
    if (target === 1) {
      setCurrentStep(1);
      triggerHaptic(hapticPatterns.light);
      feedbackSounds.click();
    } else if (target === 2) {
      if (validateStep(1)) {
        setCurrentStep(2);
        triggerHaptic(hapticPatterns.light);
        feedbackSounds.click();
      } else {
        triggerHaptic(hapticPatterns.error);
        feedbackSounds.error();
      }
    } else if (target === 3) {
      if (validateStep(1) && validateStep(2)) {
        setCurrentStep(3);
        triggerHaptic(hapticPatterns.light);
        feedbackSounds.click();
      } else {
        triggerHaptic(hapticPatterns.error);
        feedbackSounds.error();
      }
    } else if (target === 4) {
      if (validateStep(1) && validateStep(2) && validateStep(3)) {
        setCurrentStep(4);
        triggerHaptic(hapticPatterns.light);
        feedbackSounds.click();
      } else {
        triggerHaptic(hapticPatterns.error);
        feedbackSounds.error();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === 'dob') {
      const numbers = value.replace(/[^\d]/g, '');
      if (numbers.length <= 2) formattedValue = numbers;
      else if (numbers.length <= 4) formattedValue = `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
      else formattedValue = `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }

    setFormData(prev => ({ ...prev, [id]: formattedValue }));
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) {
      triggerHaptic(hapticPatterns.error);
      feedbackSounds.error();
      return;
    }
    setIsSubmitting(true);
    // Subtle physical confirmation sweep
    feedbackSounds.click();
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Clean up backup on completion
      localStorage.removeItem('dhmmun_registration_draft');
      triggerHaptic(hapticPatterns.success);
      feedbackSounds.success();
    }, 2200);
  };

  // Calculate dynamic Integrity complete index based on required fields
  const calculateIntegrityPercent = () => {
    const requiredKeys = ['firstName', 'lastName', 'email', 'dob', 'participationType', 'experience', 'committee', 'countryPref'];
    if (formData.participationType === 'school') {
      requiredKeys.push('institution');
    }
    let filledRequired = 0;
    requiredKeys.forEach(key => {
      const val = formData[key as keyof typeof formData];
      if (val && typeof val === 'string' && val.trim() !== '') {
        filledRequired++;
      }
    });
    return Math.round((filledRequired / requiredKeys.length) * 100);
  };

  // 3. Command Deck Custom Keyboard Event Integration (God Mode)
  useEffect(() => {
    const handleNextStepEvent = () => {
      if (currentStep === 4) {
        const virtualEvent = { preventDefault: () => {} } as React.FormEvent;
        handleSubmit(virtualEvent);
      } else {
        handleNext();
      }
    };

    const handlePrevStepEvent = () => {
      if (currentStep > 1) {
        handlePrev();
      }
    };

    const handleGoStepEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ step: Step }>;
      if (customEvent.detail && customEvent.detail.step) {
        handleStepJump(customEvent.detail.step);
      }
    };

    const handleAutofillEvent = () => {
      const sampleProfiles = [
        {
          firstName: "Jean-Luc",
          lastName: "Picard",
          email: "picard.starfleet@un.org",
          dob: "13/07/2002",
          participationType: "individual",
          institution: "",
          experience: "advanced",
          phone: "+44 7911 123456",
          instagram: "@jl_picard_mun",
          socials: "linkedin.com/in/jl-picard",
          hearAbout: "past",
          motivation: "Eager to draft resolution paradigms for galactic governance and humanitarian security corridors.",
          committee: "unsc",
          countryPref: "France"
        },
        {
          firstName: "Suhana",
          lastName: "Devi",
          email: "suhana.devi@oxford.edu",
          dob: "24/09/2004",
          participationType: "school",
          institution: "Oxford Diplomatic Society",
          experience: "advanced",
          phone: "+44 1865 270000",
          instagram: "@suhana_mun",
          socials: "github.com/suhana-devi",
          hearAbout: "friend",
          motivation: "Aiming to represent developing nations in WHO health systems funding models.",
          committee: "who",
          countryPref: "India"
        },
        {
          firstName: "Marcus",
          lastName: "Vance",
          email: "marcus.vance@yale.edu",
          dob: "15/12/2003",
          participationType: "school",
          institution: "Yale Association for UN",
          experience: "intermediate",
          phone: "+1 (203) 432-4771",
          instagram: "@marcusv_yale",
          socials: "linkedin.com/in/marcus-vance",
          hearAbout: "advisor",
          motivation: "Keen on crisis communication simulators and high-vulnerability national strategy drafting.",
          committee: "crisis",
          countryPref: "United States"
        }
      ];

      const randomProfile = sampleProfiles[Math.floor(Math.random() * sampleProfiles.length)];
      setFormData(randomProfile);
      setErrors({});
      triggerHaptic(hapticPatterns.success);
      feedbackSounds.success();
    };

    const handleClearEvent = () => {
      localStorage.removeItem('dhmmun_registration_draft');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        participationType: '',
        institution: '',
        experience: '',
        phone: '',
        instagram: '',
        socials: '',
        hearAbout: '',
        motivation: '',
        committee: '',
        countryPref: ''
      });
      setErrors({});
      setCurrentStep(1);
      triggerHaptic(hapticPatterns.error);
      feedbackSounds.error();
    };

    window.addEventListener('dhmmun-next-step', handleNextStepEvent);
    window.addEventListener('dhmmun-prev-step', handlePrevStepEvent);
    window.addEventListener('dhmmun-go-step', handleGoStepEvent);
    window.addEventListener('dhmmun-autofill-demo', handleAutofillEvent);
    window.addEventListener('dhmmun-clear-draft', handleClearEvent);

    return () => {
      window.removeEventListener('dhmmun-next-step', handleNextStepEvent);
      window.removeEventListener('dhmmun-prev-step', handlePrevStepEvent);
      window.removeEventListener('dhmmun-go-step', handleGoStepEvent);
      window.removeEventListener('dhmmun-autofill-demo', handleAutofillEvent);
      window.removeEventListener('dhmmun-clear-draft', handleClearEvent);
    };
  }, [currentStep, formData]);

  return (
    <main className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-36 md:pt-40 pb-16 md:pb-24 overflow-x-hidden selection:bg-primary/30">
      
      {/* High-Contrast Luxury Cosmic Backdrops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ rotate: [0, 180, 360], scale: [1, 1.12, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-15%] right-[-10%] w-[500px] md:w-[750px] h-[500px] md:h-[750px] bg-primary/10 blur-[100px] md:blur-[160px] opacity-60"
        />
        <motion.div 
          animate={{ rotate: [360, 180, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-15%] left-[-10%] w-[400px] md:w-[650px] h-[400px] md:h-[650px] bg-secondary/10 blur-[100px] md:blur-[160px] opacity-60"
        />
      </div>

      {/* Floating Micro-draft auto-restore Toast */}
      <AnimatePresence>
        {showDraftToast && (
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 120, scale: 0.9, transition: { duration: 0.25 } }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-6 right-6 md:right-10 z-[100] flex items-center justify-between gap-4 px-5 py-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl border border-zinc-200/50 dark:border-zinc-800/40 rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.35)] ring-1 ring-white/10 text-on-surface"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black font-headline tracking-wide uppercase text-primary leading-none">Draft Restored</span>
                <span className="text-[11px] text-on-surface-variant font-body mt-1">Geopolitical dossier draft recovered instantly.</span>
              </div>
            </div>
            
            <button
              onClick={() => {
                triggerHaptic(hapticPatterns.light);
                setShowDraftToast(false);
              }}
              className="p-1 rounded-lg hover:bg-white/10 text-on-surface-variant/60 hover:text-on-surface transition-colors duration-150 relative z-10"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl w-full">
        {/* Full-Width Header Section (Elegant, centered on mobile, pristine left-aligned on desktop) */}
        <div className="text-center lg:text-left space-y-4 mb-8 sm:mb-10 md:mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 shadow-[0_4px_16px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
          >
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold text-on-surface-variant tracking-widest uppercase">
              {isSuccess ? "Dossier Solidified" : `Ingesting Step ${currentStep} metadata`}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tight leading-[1.1] text-on-surface"
          >
            {isSuccess ? (
              <>Security Clearance <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">Approved.</span></>
            ) : (
              <>Configure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">Summit ID.</span></>
            )}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            {isSuccess 
              ? "Welcome to the conference floor. Your credentials have been locked into the secure roster database."
              : "Your entries compile in real-time onto the cryptographic digital pass. Verify all details carefully."
            }
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Dynamic Form Core & Progressive Timeline Stepper - Front and center on mobile, right on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 w-full order-1 lg:order-2"
          >
            <div className="relative rounded-[2.2rem] md:rounded-[2.6rem] p-[2px] w-full">
              {/* Multidimensional border neon gradient overlay */}
              <div className="absolute inset-0 rounded-[2.2rem] md:rounded-[2.6rem] bg-gradient-to-br from-primary/30 via-secondary/10 to-primary/30 opacity-40 blur-sm pointer-events-none" />
              
              {/* Card Container Morphs elastically with spring ease matching height of steps */}
              <motion.div 
                layout="size"
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                className="relative bg-white/95 dark:bg-[#0c0d12]/70 backdrop-blur-3xl border border-zinc-200/80 dark:border-white/5 rounded-[2.1rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.06)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col"
              >
                {/* Micro Liquid Highlight Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-100 dark:bg-zinc-800/30 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
                    animate={{ width: `${calculateIntegrityPercent()}%` }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <div key="form-container" className="space-y-8 w-full block">
                      
                      {/* Interactive Glass Node Stepper Timeline */}
                      <div className="flex flex-col gap-3 py-2 border-b border-zinc-200/80 dark:border-zinc-800/30">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col text-left">
                            <span className="text-[10px] font-bold text-primary font-headline uppercase tracking-widest">Dossier Progression</span>
                            <span className="text-xl sm:text-2xl font-black font-headline tracking-tight text-on-surface">
                              {currentStep === 1 && "Identity Node"}
                              {currentStep === 2 && "Representation Bounds"}
                              {currentStep === 3 && "Personal & Social Insights"}
                              {currentStep === 4 && "Final Endorsement"}
                            </span>
                          </div>
                          
                          {/* Integrity percentage Badge */}
                          <div className="flex flex-col items-end">
                            <div className="text-[10px] font-mono tracking-widest text-on-surface-variant font-bold">INTEGRITY INDEX</div>
                            <div className="text-base sm:text-lg font-black text-primary font-headline">
                              {calculateIntegrityPercent()}%
                            </div>
                          </div>
                        </div>
                        
                        {/* Interactive Steps Nodes Row */}
                        <div className="relative flex items-center justify-between w-full pt-4 pb-2 px-1">
                          {/* Stepper background track line */}
                          <div className="absolute left-0 right-0 top-[2.1rem] -translate-y-1/2 h-[2px] bg-zinc-200 dark:bg-zinc-800/40 z-0" />
                          
                          {/* Active completed path overlay */}
                          <motion.div 
                            className="absolute left-0 top-[2.1rem] -translate-y-1/2 h-[3px] bg-gradient-to-r from-primary to-secondary z-0 rounded-full"
                            animate={{ width: `${(currentStep - 1) * 33.333}%` }}
                            transition={{ duration: 0.4 }}
                          />

                          {/* Node Step Indicators */}
                          {([1, 2, 3, 4] as const).map((step) => {
                            const isActive = currentStep === step;
                            const isCompleted = currentStep > step || (step === 4 && calculateIntegrityPercent() === 100);
                            
                            return (
                              <button
                                key={`node-step-${step}`}
                                type="button"
                                onClick={() => handleStepJump(step)}
                                className="relative flex flex-col items-center z-10 cursor-pointer focus:outline-none group/node"
                              >
                                <motion.div 
                                  animate={{
                                    scale: isActive ? 1.15 : 1,
                                    boxShadow: isActive ? '0 0 20px rgba(var(--color-primary), 0.4)' : 'none'
                                  }}
                                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-all duration-350 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl ${
                                    isCompleted 
                                      ? 'border-primary bg-primary/15 text-primary' 
                                      : isActive 
                                        ? 'border-primary bg-white dark:bg-zinc-900 text-primary shadow-lg ring-4 ring-teal-500/15 dark:ring-cyan-500/15' 
                                        : 'border-zinc-200/80 dark:border-zinc-800/60 text-on-surface-variant hover:border-zinc-300 dark:hover:border-zinc-700'
                                  }`}
                                >
                                  {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 font-bold" />
                                  ) : step > currentStep ? (
                                    <Lock className="w-4 h-4 text-on-surface-variant/40" />
                                  ) : (
                                    <span className="text-xs font-black font-headline">{step}</span>
                                  )}
                                </motion.div>
                                <span className={`text-[9px] sm:text-[10px] font-bold font-headline uppercase mt-2 tracking-wider ${
                                  isActive ? 'text-primary' : 'text-on-surface-variant/60'
                                }`}>
                                  {step === 1 && "Identity"}
                                  {step === 2 && "Profile"}
                                  {step === 3 && "Insights"}
                                  {step === 4 && "Assignment"}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>



                      {/* Main Dynamic Step Form Fields */}
                      <motion.form 
                        key={`form-step-${currentStep}`}
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -25 }}
                        transition={{ duration: 0.35 }}
                        onSubmit={(e) => { e.preventDefault(); if (currentStep === 4) { handleSubmit(e); } else { handleNext(); } }}
                        className="space-y-6 md:space-y-8"
                        noValidate
                      >
                        {/* STEP 1: Personal Profile Identification */}
                        {currentStep === 1 && (
                          <div className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                              <SpotlightInput 
                                id="firstName" 
                                label="First Name" 
                                Icon={User} 
                                value={formData.firstName}
                                onChange={handleInputChange}
                                onFocusStateChange={setFocusedField}
                                autoComplete="given-name" 
                                error={errors.firstName}
                              />
                              <SpotlightInput 
                                id="lastName" 
                                label="Last Name" 
                                Icon={User} 
                                value={formData.lastName}
                                onChange={handleInputChange}
                                onFocusStateChange={setFocusedField}
                                autoComplete="family-name" 
                                error={errors.lastName}
                              />
                            </div>
                            <SpotlightInput 
                              id="email" 
                              label="Email Address" 
                              Icon={Mail} 
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onFocusStateChange={setFocusedField}
                              autoComplete="email" 
                              inputMode="email"
                              error={errors.email}
                            />
                            <SpotlightInput 
                              id="dob" 
                              label="Date of Birth" 
                              Icon={Calendar} 
                              value={formData.dob}
                              onChange={handleInputChange}
                              onFocusStateChange={setFocusedField}
                              autoComplete="bday" 
                              inputMode="numeric"
                              maxLength={10}
                              mask="DD/MM/YYYY"
                              error={errors.dob}
                            />
                          </div>
                        )}

                        {/* STEP 2: Custom Profile Configuration */}
                        {currentStep === 2 && (
                          <div className="space-y-6">
                            <SpotlightSelect 
                              id="participationType" 
                              label="Participation Type" 
                              Icon={Users} 
                              value={formData.participationType}
                              onChange={handleInputChange}
                              onFocusStateChange={setFocusedField}
                              error={errors.participationType}
                              options={[
                                { value: 'school', label: 'School Delegation Mission' },
                                { value: 'individual', label: 'Individual Delegate Path' }
                              ]}
                            />
                            
                            <AnimatePresence mode="wait">
                              {formData.participationType === 'school' && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                  transition={{ type: "spring", stiffness: 220, damping: 23 }}
                                  className="overflow-visible"
                                >
                                  <SpotlightInput 
                                    id="institution" 
                                    label="School / Institution Name" 
                                    Icon={Building} 
                                    value={formData.institution}
                                    onChange={handleInputChange}
                                    onFocusStateChange={setFocusedField}
                                    autoComplete="organization" 
                                    error={errors.institution}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <SpotlightSelect 
                              id="experience" 
                              label="MUN Experience level" 
                              Icon={IdCard} 
                              value={formData.experience}
                              onChange={handleInputChange}
                              onFocusStateChange={setFocusedField}
                              error={errors.experience}
                              options={[
                                { value: 'beginner', label: 'Beginner (0-1 conferences)' },
                                { value: 'intermediate', label: 'Intermediate (2-4 conferences)' },
                                { value: 'advanced', label: 'Advanced Pioneer (5+ conferences)' }
                              ]}
                            />
                          </div>
                        )}

                        {/* STEP 3: To Know the Delegates More */}
                        {currentStep === 3 && (
                          <div className="space-y-6">
                            <div className="text-left mb-2">
                              <h3 className="text-sm font-bold text-primary font-headline uppercase tracking-wider">Social Connectivity & Insights</h3>
                              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                                Most of these details are optional, but highly recommended so we can contact you, coordinate with delegation leaders, and help chairs craft your experience.
                              </p>
                            </div>
                            
                            <div className="grid sm:grid-cols-2 gap-6">
                              <SpotlightInput 
                                id="phone" 
                                label="Phone Number" 
                                Icon={Phone} 
                                type="tel"
                                placeholder="e.g. +1 (555) 0122"
                                value={formData.phone}
                                onChange={handleInputChange}
                                onFocusStateChange={setFocusedField}
                                error={errors.phone}
                              />
                              <SpotlightInput 
                                id="instagram" 
                                label="Instagram Handle" 
                                Icon={Instagram} 
                                placeholder="e.g. @username"
                                value={formData.instagram}
                                onChange={handleInputChange}
                                onFocusStateChange={setFocusedField}
                                error={errors.instagram}
                              />
                            </div>

                            <SpotlightInput 
                              id="socials" 
                              label="Other Socials or Portfolio Link" 
                              Icon={Share2} 
                              placeholder="e.g. linkedin.com/in/username"
                              value={formData.socials}
                              onChange={handleInputChange}
                              onFocusStateChange={setFocusedField}
                              error={errors.socials}
                            />

                            <SpotlightSelect 
                              id="hearAbout" 
                              label="How did you hear about us?" 
                              Icon={Compass} 
                              value={formData.hearAbout}
                              onChange={handleInputChange}
                              onFocusStateChange={setFocusedField}
                              error={errors.hearAbout}
                              options={[
                                { value: '', label: 'Select an option' },
                                { value: 'advisor', label: 'School MUN / Academic Advisor' },
                                { value: 'social', label: 'Social Media Platform / Ads' },
                                { value: 'friend', label: 'Word of Mouth / Friend' },
                                { value: 'search', label: 'Web Search Engine' },
                                { value: 'past', label: 'Past Attendee Recommendation' },
                                { value: 'other', label: 'Other Referral Source' }
                              ]}
                            />

                            <SpotlightInput 
                              id="motivation" 
                              label="Special Skills & Expectations" 
                              Icon={Sparkles} 
                              placeholder="e.g. What are you most excited for?"
                              value={formData.motivation}
                              onChange={handleInputChange}
                              onFocusStateChange={setFocusedField}
                              error={errors.motivation}
                            />
                          </div>
                        )}

                        {/* STEP 4: Summit Mission Designation */}
                        {currentStep === 4 && (
                          <div className="space-y-6">
                            <SpotlightSelect 
                              id="committee" 
                              label="Desired Committee Mandate" 
                              Icon={Globe} 
                              value={formData.committee}
                              onChange={handleInputChange}
                              onFocusStateChange={setFocusedField}
                              error={errors.committee}
                              options={[
                                { value: 'unsc', label: 'United Nations Security Council' },
                                { value: 'who', label: 'World Health Organization' },
                                { value: 'crisis', label: 'Joint Crisis Committee' },
                                { value: 'unicef', label: 'UNICEF Alliance' }
                              ]}
                            />
                            <SpotlightInput 
                              id="countryPref" 
                              label="Sovereign / Country Preference" 
                              Icon={Globe} 
                              value={formData.countryPref}
                              onChange={handleInputChange}
                              onFocusStateChange={setFocusedField}
                              error={errors.countryPref}
                            />
                          </div>
                        )}

                        {/* Secondary Interactive Controls Row */}
                        <div className="flex gap-4 pt-4">
                          {currentStep > 1 && (
                            <motion.button 
                              type="button" 
                              onClick={handlePrev}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.97 }}
                              className="h-14 md:h-16 px-6 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/40 text-on-surface font-bold hover:bg-zinc-250/50 dark:hover:bg-zinc-800/60 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                            >
                              <ArrowLeft className="w-5 h-5" />
                            </motion.button>
                          )}
                          
                          <motion.button 
                            type="submit" 
                            disabled={isSubmitting}
                            whileHover={isSubmitting ? {} : { scale: 1.01 }}
                            whileTap={isSubmitting ? {} : { scale: 0.97 }}
                            className="relative flex-1 h-14 md:h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold text-base md:text-lg overflow-hidden group transition-all disabled:opacity-70 disabled:hover:scale-100 shadow-[0_4px_25px_rgba(var(--color-primary),0.25)] cursor-pointer"
                          >
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                            <div className="relative z-10 flex items-center justify-center gap-2">
                              {isSubmitting ? (
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 md:w-6 md:h-6 border-2 border-on-primary/30 border-t-on-primary rounded-full"
                                />
                              ) : (
                                <>
                                  <span>{currentStep === 4 ? "Lock Credential & Submit" : "Next Milestone"}</span>
                                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </div>
                          </motion.button>
                        </div>

                        {/* Error Highlight Banner */}
                        {Object.keys(errors).length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-2 text-error text-[11px] md:text-xs font-medium mt-4 bg-error/10 py-3 px-4 rounded-xl border border-error/20"
                          >
                            <AlertCircle className="w-4 h-4 text-error" />
                            <span>Correct designated warning fields before executing the signature.</span>
                          </motion.div>
                        )}
                      </motion.form>
                    </div>
                  ) : (
                    /* Spectacular Success Credential locked Page */
                    <motion.div 
                      key="success-container"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10 flex flex-col items-center justify-center text-center py-6 md:py-10 w-full"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative"
                      >
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-25"></div>
                        <ShieldCheck className="w-10 h-10 text-primary" />
                      </motion.div>
                      
                      <h2 className="text-2xl sm:text-3xl font-headline font-black text-on-surface mb-3">
                        Dossier Solidified
                      </h2>
                      
                      <p className="text-sm text-on-surface-variant font-body mb-8 max-w-sm px-4 leading-relaxed">
                        Verification clearance completed. Welcome to DHMMUN 2026. Credentials assigned safely for <strong>{formData.email}</strong>.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md pt-2">
                        {/* Dynamic Download Certificate Indicator button */}
                        <button
                          onClick={() => {
                            triggerHaptic(hapticPatterns.success);
                            alert("Your official PDF Digital Pass has been compiled and saved! (Simulated download successful)");
                          }}
                          className="px-6 py-3.5 text-xs sm:text-sm rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_20px_rgba(var(--color-primary),0.3)] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Digital Pass</span>
                        </button>
                        
                        <button 
                          onClick={() => {
                            setIsSuccess(false);
                            setCurrentStep(1);
                            setFormData({ 
                              firstName: '', 
                              lastName: '', 
                              email: '', 
                              dob: '', 
                              participationType: '', 
                              institution: '', 
                              experience: '', 
                              phone: '',
                              instagram: '',
                              socials: '',
                              hearAbout: '',
                              motivation: '',
                              committee: '', 
                              countryPref: '' 
                            });
                          }}
                          className="px-6 py-3.5 text-xs sm:text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-on-surface font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-95 cursor-pointer"
                        >
                          Establish New Dossier
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Column 2: Interactive Holographic Diplomatic Pass & AI Briefing - Placed underneath on mobile, left on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6 lg:sticky lg:top-36 text-center lg:text-left order-2 lg:order-1 w-full"
          >
            {/* Interactive Holographic Diplomatic Pass */}
            <DiplomaticPass 
              formData={formData} 
              currentStep={currentStep} 
              isSuccess={isSuccess} 
            />

            {/* Geopolitical Intelligence Briefing Module */}
            {!isSuccess && (
              <BriefingAdvisor 
                activeField={focusedField} 
                currentStep={currentStep} 
              />
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
