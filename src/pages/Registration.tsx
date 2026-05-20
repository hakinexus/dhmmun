import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, IdCard, CheckCircle, Sparkles, ArrowRight, ArrowLeft, AlertCircle, Calendar, Users, Globe, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';
import { SpotlightInput, SpotlightSelect } from '../components/SpotlightInput';

type Step = 1 | 2 | 3;

export default function Registration() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDraftToast, setShowDraftToast] = useState(false);
  
  // Robust State Management for 3 Steps
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
    // Step 3: Assignment
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
          setFormData(parsed);
          setShowDraftToast(true);
          triggerHaptic(hapticPatterns.success);
          const t = setTimeout(() => {
            setShowDraftToast(false);
          }, 3500);
          return () => clearTimeout(t);
        }
      } catch (e) {
        console.error("Failed to recover localized form draft state", e);
      }
    }
  }, []);

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
      if (!formData.committee) newErrors.committee = "Required";
      if (!formData.countryPref.trim()) newErrors.countryPref = "Required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      triggerHaptic(hapticPatterns.light);
      setCurrentStep(prev => (prev + 1) as Step);
    } else {
      triggerHaptic(hapticPatterns.error);
    }
  };

  const handlePrev = () => {
    triggerHaptic(hapticPatterns.light);
    setCurrentStep(prev => (prev - 1) as Step);
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
    if (!validateStep(3)) {
      triggerHaptic(hapticPatterns.error);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Clean up backup on completion
      localStorage.removeItem('dhmmun_registration_draft');
      triggerHaptic(hapticPatterns.success);
    }, 2000);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-x-hidden selection:bg-primary/30">
      {/* Cinematic Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1], borderRadius: ["40%", "60%", "40%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/20 blur-[80px] md:blur-[120px] mix-blend-screen dark:mix-blend-normal opacity-70 md:opacity-100"
        />
        <motion.div 
          animate={{ rotate: [360, 270, 180, 90, 0], scale: [1, 1.2, 1], borderRadius: ["50%", "40%", "50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/20 blur-[80px] md:blur-[120px] mix-blend-screen dark:mix-blend-normal opacity-70 md:opacity-100"
        />
      </div>

      {/* Persistent Micro-Draft Reassuring toast notification */}
      <AnimatePresence>
        {showDraftToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 md:right-10 z-[100] flex items-center gap-3 px-5 py-4 bg-surface-container/90 backdrop-blur-2xl border border-primary/25 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.3)] ring-1 ring-white/10 text-on-surface"
          >
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center animate-pulse">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold font-headline tracking-wide uppercase text-primary leading-none">Draft Restored</span>
              <span className="text-[11px] text-on-surface-variant font-body mt-0.5">Your progress has been recovered.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl w-full">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Typography & Dynamic Info */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8 text-center md:text-left pt-8 md:pt-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/50 backdrop-blur-md border border-outline-variant/30 mb-4 md:mb-6 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-[10px] md:text-xs font-bold text-on-surface-variant tracking-widest uppercase">
                  {currentStep === 1 ? "Identity Verification" : currentStep === 2 ? "Representation Path" : "Final Assignment"}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-black tracking-tighter leading-[1.1] mb-4 md:mb-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentStep}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="block"
                  >
                    {currentStep === 1 && <>Who Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">You?</span></>}
                    {currentStep === 2 && <>How Will You <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">Serve?</span></>}
                    {currentStep === 3 && <>Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">Legacy.</span></>}
                  </motion.span>
                </AnimatePresence>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-on-surface-variant font-body leading-relaxed max-w-md mx-auto md:mx-0">
                {currentStep === 1 && "We need your core identity to construct your diplomatic credentials."}
                {currentStep === 2 && "Tell us your delegation type so we can calibrate your experience."}
                {currentStep === 3 && "Select your desired committee and country preferences for the summit."}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Liquid Glass Sequential Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 perspective-1000 w-full"
          >
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] p-[2px] sm:p-1 w-full max-w-[500px] lg:max-w-none mx-auto">
              <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-primary/40 via-secondary/20 to-primary/40 opacity-50 blur-md transition-all duration-1000"></div>
              
              {/* Card Container Morphs dynamically matching the speed of customized transitions */}
              <motion.div 
                layout="size"
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                className="relative bg-surface/40 backdrop-blur-3xl border border-white/10 dark:border-white/5 rounded-[1.9rem] md:rounded-[2.4rem] p-6 sm:p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden min-h-[450px] flex items-center"
              >
                <div className="absolute inset-0 rounded-[1.9rem] md:rounded-[2.4rem] border border-white/20 pointer-events-none mix-blend-overlay"></div>
                
                {/* Progress Bar Top Edge */}
                {!isSuccess && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-surface-container overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      animate={{ width: `${(currentStep / 3) * 100}%` }}
                      transition={{ ease: "easeInOut", duration: 0.4 }}
                    />
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form 
                      key={`step-${currentStep}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      onSubmit={currentStep === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
                      className="relative z-10 space-y-6 md:space-y-8 w-full block"
                      noValidate
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface">
                          {currentStep === 1 && "Personal Identity"}
                          {currentStep === 2 && "Delegate Profile"}
                          {currentStep === 3 && "Assignments"}
                        </h2>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">Step {currentStep} of 3</span>
                      </div>

                      {/* STEP 1 FIELDS */}
                      {currentStep === 1 && (
                        <div className="space-y-6">
                          <div className="grid sm:grid-cols-2 gap-6">
                            <SpotlightInput 
                              id="firstName" 
                              label="First Name" 
                              Icon={User} 
                              value={formData.firstName}
                              onChange={handleInputChange}
                              autoComplete="given-name" 
                              error={errors.firstName}
                            />
                            <SpotlightInput 
                              id="lastName" 
                              label="Last Name" 
                              Icon={User} 
                              value={formData.lastName}
                              onChange={handleInputChange}
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
                            autoComplete="bday" 
                            inputMode="numeric"
                            maxLength={10}
                            mask="DD/MM/YYYY"
                            error={errors.dob}
                          />
                        </div>
                      )}

                      {/* STEP 2 FIELDS */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          <SpotlightSelect 
                            id="participationType" 
                            label="Participation Type" 
                            Icon={Users} 
                            value={formData.participationType}
                            onChange={handleInputChange}
                            error={errors.participationType}
                            options={[
                              { value: 'school', label: 'School Delegation' },
                              { value: 'individual', label: 'Individual Delegate' }
                            ]}
                          />
                          
                          <AnimatePresence mode="wait">
                            {formData.participationType === 'school' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                                className="overflow-visible"
                              >
                                <SpotlightInput 
                                  id="institution" 
                                  label="School / Institution Name" 
                                  Icon={Building} 
                                  value={formData.institution}
                                  onChange={handleInputChange}
                                  autoComplete="organization" 
                                  error={errors.institution}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <SpotlightSelect 
                            id="experience" 
                            label="MUN Experience Level" 
                            Icon={IdCard} 
                            value={formData.experience}
                            onChange={handleInputChange}
                            error={errors.experience}
                            options={[
                              { value: 'beginner', label: 'Beginner (0-1 conferences)' },
                              { value: 'intermediate', label: 'Intermediate (2-4 conferences)' },
                              { value: 'advanced', label: 'Advanced (5+ conferences)' }
                            ]}
                          />
                        </div>
                      )}

                      {/* STEP 3 FIELDS */}
                      {currentStep === 3 && (
                        <div className="space-y-6">
                          <SpotlightSelect 
                            id="committee" 
                            label="Desired Committee" 
                            Icon={Globe} 
                            value={formData.committee}
                            onChange={handleInputChange}
                            error={errors.committee}
                            options={[
                              { value: 'unsc', label: 'United Nations Security Council' },
                              { value: 'who', label: 'World Health Organization' },
                              { value: 'crisis', label: 'Joint Crisis Committee' },
                              { value: 'unicef', label: 'UNICEF' }
                            ]}
                          />
                          <SpotlightInput 
                            id="countryPref" 
                            label="Country/Position Preference" 
                            Icon={Globe} 
                            value={formData.countryPref}
                            onChange={handleInputChange}
                            error={errors.countryPref}
                          />
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex gap-4 pt-4">
                        {currentStep > 1 && (
                          <button 
                            type="button" 
                            onClick={handlePrev}
                            className="h-14 md:h-16 px-6 rounded-2xl bg-surface-container/50 border border-outline-variant/30 text-on-surface font-bold hover:bg-surface-container transition-all active:scale-95 flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                        )}
                        
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="relative flex-1 h-14 md:h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold text-base md:text-lg overflow-hidden group transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-[0_4px_20px_rgba(var(--color-primary),0.3)] cursor-pointer"
                        >
                          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                          <div className="relative z-10 flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 md:w-6 md:h-6 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-[pulse_1s_infinite]"
                              />
                            ) : (
                              <>
                                <span>{currentStep === 3 ? "Submit Application" : "Continue"}</span>
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </div>
                        </button>
                      </div>

                      {Object.keys(errors).length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-center gap-2 text-error text-[11px] md:text-xs font-medium mt-4 bg-error/10 py-2 px-3 rounded-lg border border-error/20"
                        >
                          <AlertCircle className="w-4 h-4 text-error" />
                          <span>Please fix the highlighted errors before continuing.</span>
                        </motion.div>
                      )}
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10 flex flex-col items-center justify-center text-center py-8 md:py-12 w-full"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative"
                      >
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20"></div>
                        <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                      </motion.div>
                      <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-3 md:mb-4">Application Secured</h2>
                      <p className="text-sm md:text-base text-on-surface-variant font-body mb-6 md:mb-8 max-w-sm px-4">
                        Welcome to DHMMUN. We’ve registered your preferences and dispatched a confirmation email to <strong>{formData.email}</strong>.
                      </p>
                      <button 
                        onClick={() => {
                          setIsSuccess(false);
                          setCurrentStep(1);
                          setFormData({ firstName: '', lastName: '', email: '', dob: '', participationType: '', institution: '', experience: '', committee: '', countryPref: '' });
                        }}
                        className="px-6 md:px-8 py-3 text-sm md:text-base rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface font-bold hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
                      >
                        Return Home
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

