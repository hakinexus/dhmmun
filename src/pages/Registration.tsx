import { useState } from 'react';
import { User, GraduationCap, Mail, IdCard, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';

export default function Registration() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerHaptic(hapticPatterns.success);
    }, 2000);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Liquid Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1, 1.2, 1],
            borderRadius: ["40%", "60%", "40%", "50%", "40%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 blur-[120px] mix-blend-screen dark:mix-blend-normal"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 270, 180, 90, 0],
            scale: [1, 1.2, 1, 1.1, 1],
            borderRadius: ["50%", "40%", "60%", "40%", "50%"]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/20 blur-[120px] mix-blend-screen dark:mix-blend-normal"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography & Info */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/50 backdrop-blur-md border border-outline-variant/30 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-on-surface-variant tracking-wide uppercase">Applications Open</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter leading-[1.1] mb-6">
                Secure Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">Legacy.</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant font-body leading-relaxed max-w-md">
                Join the most prestigious diplomatic simulation. Shape policies, forge alliances, and redefine global discourse.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 pt-4"
            >
              {[
                { title: "Priority Allocation", desc: "Early applicants receive first choice of committees." },
                { title: "Exclusive Resources", desc: "Instant access to our delegate preparation portal." },
                { title: "Gala Access", desc: "VIP entry to the closing diplomatic banquet." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container/50 backdrop-blur-sm border border-outline-variant/30 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Liquid Glass Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 perspective-1000"
          >
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] p-1">
              {/* Liquid Border Effect */}
              <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-primary/40 via-secondary/20 to-primary/40 opacity-50 blur-md"></div>
              
              {/* Main Glass Container */}
              <div className="relative bg-surface/40 backdrop-blur-3xl border border-white/10 dark:border-white/5 rounded-[1.9rem] md:rounded-[2.4rem] p-5 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden">
                
                {/* Inner Glass Highlight */}
                <div className="absolute inset-0 rounded-[1.9rem] md:rounded-[2.4rem] border border-white/20 pointer-events-none mix-blend-overlay"></div>
                
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                      onSubmit={handleSubmit}
                      className="relative z-10 space-y-6"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-headline font-bold text-on-surface">Delegate Profile</h2>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">Step 1 of 1</span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="relative group">
                          <input 
                            type="text" 
                            id="firstName"
                            required
                            onFocus={() => setFocusedField('firstName')}
                            onBlur={() => setFocusedField(null)}
                            className="peer w-full bg-surface-container/30 backdrop-blur-md border border-outline-variant/30 rounded-2xl px-5 pt-7 pb-3 text-on-surface focus:outline-none focus:bg-surface-container/50 transition-all duration-300"
                            placeholder=" "
                          />
                          <label 
                            htmlFor="firstName"
                            className="absolute left-5 top-5 text-on-surface-variant/70 text-base transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary font-medium pointer-events-none"
                          >
                            First Name
                          </label>
                          <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/30 peer-focus:text-primary transition-colors duration-300" />
                          {/* Focus Glow */}
                          <div className={`absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none transition-all duration-500 ${focusedField === 'firstName' ? 'opacity-100 scale-100 blur-[1px]' : 'opacity-0 scale-105'}`}></div>
                        </div>

                        {/* Last Name */}
                        <div className="relative group">
                          <input 
                            type="text" 
                            id="lastName"
                            required
                            onFocus={() => setFocusedField('lastName')}
                            onBlur={() => setFocusedField(null)}
                            className="peer w-full bg-surface-container/30 backdrop-blur-md border border-outline-variant/30 rounded-2xl px-5 pt-7 pb-3 text-on-surface focus:outline-none focus:bg-surface-container/50 transition-all duration-300"
                            placeholder=" "
                          />
                          <label 
                            htmlFor="lastName"
                            className="absolute left-5 top-5 text-on-surface-variant/70 text-base transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary font-medium pointer-events-none"
                          >
                            Last Name
                          </label>
                          <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/30 peer-focus:text-primary transition-colors duration-300" />
                          <div className={`absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none transition-all duration-500 ${focusedField === 'lastName' ? 'opacity-100 scale-100 blur-[1px]' : 'opacity-0 scale-105'}`}></div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="relative group">
                        <input 
                          type="email" 
                          id="email"
                          required
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className="peer w-full bg-surface-container/30 backdrop-blur-md border border-outline-variant/30 rounded-2xl px-5 pt-7 pb-3 text-on-surface focus:outline-none focus:bg-surface-container/50 transition-all duration-300"
                          placeholder=" "
                        />
                        <label 
                          htmlFor="email"
                          className="absolute left-5 top-5 text-on-surface-variant/70 text-base transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary font-medium pointer-events-none"
                        >
                          Email Address
                        </label>
                        <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/30 peer-focus:text-primary transition-colors duration-300" />
                        <div className={`absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none transition-all duration-500 ${focusedField === 'email' ? 'opacity-100 scale-100 blur-[1px]' : 'opacity-0 scale-105'}`}></div>
                      </div>

                      {/* Institution */}
                      <div className="relative group">
                        <input 
                          type="text" 
                          id="institution"
                          required
                          onFocus={() => setFocusedField('institution')}
                          onBlur={() => setFocusedField(null)}
                          className="peer w-full bg-surface-container/30 backdrop-blur-md border border-outline-variant/30 rounded-2xl px-5 pt-7 pb-3 text-on-surface focus:outline-none focus:bg-surface-container/50 transition-all duration-300"
                          placeholder=" "
                        />
                        <label 
                          htmlFor="institution"
                          className="absolute left-5 top-5 text-on-surface-variant/70 text-base transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary font-medium pointer-events-none"
                        >
                          Institution / School
                        </label>
                        <GraduationCap className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/30 peer-focus:text-primary transition-colors duration-300" />
                        <div className={`absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none transition-all duration-500 ${focusedField === 'institution' ? 'opacity-100 scale-100 blur-[1px]' : 'opacity-0 scale-105'}`}></div>
                      </div>

                      {/* Experience */}
                      <div className="relative group">
                        <select 
                          id="experience"
                          required
                          defaultValue=""
                          onFocus={() => setFocusedField('experience')}
                          onBlur={() => setFocusedField(null)}
                          className="peer w-full bg-surface-container/30 backdrop-blur-md border border-outline-variant/30 rounded-2xl px-5 pt-7 pb-3 text-on-surface focus:outline-none focus:bg-surface-container/50 transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="bg-surface text-on-surface-variant">Select your experience</option>
                          <option value="beginner" className="bg-surface">Beginner (0-1 conferences)</option>
                          <option value="intermediate" className="bg-surface">Intermediate (2-4 conferences)</option>
                          <option value="advanced" className="bg-surface">Advanced (5+ conferences)</option>
                        </select>
                        <label 
                          htmlFor="experience"
                          className="absolute left-5 top-2 text-xs text-primary font-medium pointer-events-none"
                        >
                          Experience Level
                        </label>
                        <IdCard className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/30 peer-focus:text-primary transition-colors duration-300" />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-on-surface-variant/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                        <div className={`absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none transition-all duration-500 ${focusedField === 'experience' ? 'opacity-100 scale-100 blur-[1px]' : 'opacity-0 scale-105'}`}></div>
                      </div>

                      {/* Submit Button */}
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="relative w-full h-16 mt-8 rounded-2xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold text-lg overflow-hidden group transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                      >
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                        
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-6 h-6 border-2 border-on-primary/30 border-t-on-primary rounded-full"
                            />
                          ) : (
                            <>
                              <span>Submit Application</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </div>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10 flex flex-col items-center justify-center text-center py-12"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                        className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative"
                      >
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20"></div>
                        <CheckCircle className="w-12 h-12 text-primary" />
                      </motion.div>
                      <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">Application Received</h2>
                      <p className="text-on-surface-variant font-body mb-8 max-w-sm">
                        Welcome to DHMMUN. We've sent a confirmation email with your delegate preparation materials.
                      </p>
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className="px-8 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface font-bold hover:bg-surface-container-high transition-colors active:scale-95"
                      >
                        Submit Another
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
