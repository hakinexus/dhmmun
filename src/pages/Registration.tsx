import { useState, useRef, useEffect } from 'react';
import { User, GraduationCap, Mail, IdCard, CheckCircle, Sparkles, ArrowRight, ArrowLeft, AlertCircle, Calendar, Users, Globe, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';

type Step = 1 | 2 | 3;

export default function Registration() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
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
      triggerHaptic(hapticPatterns.success);
    }, 2000);
  };

  // Input Field Renderer Helper
  const renderInput = (
    id: keyof typeof formData, 
    label: string, 
    Icon: React.ElementType, 
    type: string = "text", 
    autoComplete: string = "off",
    inputMode: "text" | "numeric" | "email" | "tel" | "search" | "url" = "text",
    maxLength?: number,
    mask?: string
  ) => {
    const isFloating = formData[id] || focusedField === id || type === "date";
    const hasMask = !!mask;

    return (
      <div className="relative group w-full">
        <input 
          type={type} 
          id={id}
          value={formData[id]}
          onChange={handleInputChange}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          onFocus={() => { setFocusedField(id); triggerHaptic(hapticPatterns.light); }}
          onBlur={() => setFocusedField(null)}
          className={`peer w-full bg-surface-container/30 backdrop-blur-md border ${errors[id] ? 'border-error' : 'border-outline-variant/30'} rounded-2xl px-5 pt-7 pb-3 text-sm md:text-base text-on-surface focus:outline-none focus:bg-surface-container/60 transition-all duration-300 shadow-inner ${hasMask ? 'font-mono tracking-[0.1em] sm:tracking-[0.2em]' : ''}`}
          placeholder=" "
          aria-invalid={!!errors[id]}
        />
        
        {hasMask && isFloating && (
          <div 
            className="absolute inset-0 pointer-events-none px-5 pt-7 pb-3 border border-transparent text-sm md:text-base font-mono tracking-[0.1em] sm:tracking-[0.2em] text-transparent overflow-hidden whitespace-nowrap z-10 block"
            aria-hidden="true"
            style={{ lineHeight: 'normal' }}
          >
            <span className="opacity-0">{formData[id]}</span>
            <span className="text-on-surface-variant/40">{mask.slice(formData[id].length)}</span>
          </div>
        )}

        <label 
          htmlFor={id}
          className={`absolute left-5 transition-all duration-300 pointer-events-none z-20 ${
            isFloating ? 'top-2 text-[10px] font-bold text-primary' : 'top-5 text-base text-on-surface-variant/70'
          } ${errors[id] ? 'text-error' : ''}`}
        >
          {label}
        </label>
        <Icon className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 z-20 ${errors[id] ? 'text-error' : 'text-on-surface-variant/40 peer-focus:text-primary'}`} />
        <div className={`absolute inset-0 rounded-2xl border-2 pointer-events-none transition-all duration-500 z-20 ${errors[id] ? 'border-error opacity-100 scale-100' : focusedField === id ? 'border-primary opacity-100 scale-100 blur-[1px]' : 'border-primary opacity-0 scale-105'}`}></div>
        {errors[id] && <span className="absolute -bottom-5 left-2 text-[10px] text-error font-medium">{errors[id]}</span>}
      </div>
    );
  };

  const renderSelect = (
    id: keyof typeof formData, 
    label: string, 
    Icon: React.ElementType, 
    options: {value: string, label: string}[]
  ) => {
    const isFloating = formData[id] || focusedField === id;
    
    return (
      <div className="relative group w-full">
        <select 
          id={id}
          value={formData[id]}
          onChange={handleInputChange}
          onFocus={() => { setFocusedField(id); triggerHaptic(hapticPatterns.light); }}
          onBlur={() => setFocusedField(null)}
          className={`peer w-full bg-surface-container/30 backdrop-blur-md border ${errors[id] ? 'border-error' : 'border-outline-variant/30'} rounded-2xl px-5 pt-7 pb-3 text-sm md:text-base ${formData[id] ? 'text-on-surface' : 'text-transparent'} focus:text-on-surface focus:outline-none focus:bg-surface-container/60 transition-all duration-300 appearance-none cursor-pointer shadow-inner`}
          aria-invalid={!!errors[id]}
        >
          <option value="" disabled className="bg-surface text-on-surface-variant hidden">Select option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface text-on-surface">{opt.label}</option>
          ))}
        </select>
        
        <label 
          htmlFor={id}
          className={`absolute left-5 transition-all duration-300 font-medium pointer-events-none ${
            isFloating ? 'top-2 text-[10px] font-bold text-primary' : 'top-5 text-base text-on-surface-variant/70'
          } ${errors[id] ? 'text-error' : ''}`}
        >
          {label}
        </label>
        
        <Icon className={`absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 origin-center ${errors[id] ? 'text-error' : 'text-on-surface-variant/40 peer-focus:text-primary'}`} />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className={`w-4 h-4 transition-transform duration-300 ${focusedField === id ? 'rotate-180 text-primary' : 'text-on-surface-variant/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
        <div className={`absolute inset-0 rounded-2xl border-2 pointer-events-none transition-all duration-500 ${errors[id] ? 'border-error opacity-100 scale-100' : focusedField === id ? 'border-primary opacity-100 scale-100 blur-[1px]' : 'border-primary opacity-0 scale-105'}`}></div>
        {errors[id] && <span className="absolute -bottom-5 left-2 text-[10px] text-error font-medium">{errors[id]}</span>}
      </div>
    );
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
              
              <div className="relative bg-surface/40 backdrop-blur-3xl border border-white/10 dark:border-white/5 rounded-[1.9rem] md:rounded-[2.4rem] p-6 sm:p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden min-h-[450px] flex items-center">
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
                            {renderInput('firstName', 'First Name', User, 'text', 'given-name')}
                            {renderInput('lastName', 'Last Name', User, 'text', 'family-name')}
                          </div>
                          {renderInput('email', 'Email Address', Mail, 'email', 'email', 'email')}
                          {renderInput('dob', 'Date of Birth', Calendar, 'text', 'bday', 'numeric', 10, 'DD/MM/YYYY')}
                        </div>
                      )}

                      {/* STEP 2 FIELDS */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          {renderSelect('participationType', 'Participation Type', Users, [
                            { value: 'school', label: 'School Delegation' },
                            { value: 'individual', label: 'Individual Delegate' }
                          ])}
                          
                          <AnimatePresence mode="wait">
                            {formData.participationType === 'school' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="overflow-visible"
                              >
                                {renderInput('institution', 'School / Institution Name', Building, 'text', 'organization')}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {renderSelect('experience', 'MUN Experience Level', IdCard, [
                            { value: 'beginner', label: 'Beginner (0-1 conferences)' },
                            { value: 'intermediate', label: 'Intermediate (2-4 conferences)' },
                            { value: 'advanced', label: 'Advanced (5+ conferences)' }
                          ])}
                        </div>
                      )}

                      {/* STEP 3 FIELDS */}
                      {currentStep === 3 && (
                        <div className="space-y-6">
                          {renderSelect('committee', 'Desired Committee', Globe, [
                            { value: 'unsc', label: 'United Nations Security Council' },
                            { value: 'who', label: 'World Health Organization' },
                            { value: 'crisis', label: 'Joint Crisis Committee' },
                            { value: 'unicef', label: 'UNICEF' }
                          ])}
                          {renderInput('countryPref', 'Country/Position Preference', Globe, 'text')}
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex gap-4 pt-4">
                        {currentStep > 1 && (
                          <button 
                            type="button" 
                            onClick={handlePrev}
                            className="h-14 md:h-16 px-6 rounded-2xl bg-surface-container/50 border border-outline-variant/30 text-on-surface font-bold hover:bg-surface-container transition-all active:scale-95 flex items-center justify-center shrink-0"
                          >
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                        )}
                        
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="relative flex-1 h-14 md:h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold text-base md:text-lg overflow-hidden group transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-[0_4px_20px_rgba(var(--color-primary),0.3)]"
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
                          <AlertCircle className="w-4 h-4" />
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
                        Welcome to DHMMUN. We've registered your preferences and dispatched a confirmation email to <strong>{formData.email}</strong>.
                      </p>
                      <button 
                        onClick={() => {
                          setIsSuccess(false);
                          setCurrentStep(1);
                          setFormData({ firstName: '', lastName: '', email: '', dob: '', participationType: '', institution: '', experience: '', committee: '', countryPref: '' });
                        }}
                        className="px-6 md:px-8 py-3 text-sm md:text-base rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface font-bold hover:bg-surface-container-high transition-colors active:scale-95"
                      >
                        Return Home
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
