import { User, GraduationCap, Mail, IdCard, CheckCircle } from 'lucide-react';

export default function Registration() {
  return (
    <main className="relative pt-32 pb-20 min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] right-[20%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Info */}
          <div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter mb-6">
              Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Seat</span>
            </h1>
            <p className="text-xl text-on-surface-variant font-body mb-10 leading-relaxed">
              Join hundreds of delegates from around the world for three days of intense debate, negotiation, and diplomatic simulation.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface mb-1">Early Bird Registration</h3>
                  <p className="text-on-surface-variant text-sm">Closes October 15th, 2025. Secure preferred committee allocations.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface mb-1">Delegate Preparation Guide</h3>
                  <p className="text-on-surface-variant text-sm">Sent immediately upon registration confirmation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface mb-1">Gala Dinner Access</h3>
                  <p className="text-on-surface-variant text-sm">Included in all standard delegate packages.</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-surface-container-low rounded-2xl border border-primary/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h4 className="text-primary font-bold mb-2 relative z-10">Need Assistance?</h4>
              <p className="text-sm text-on-surface-variant relative z-10">Contact our Delegate Affairs team at <a href="mailto:delegates@dhmmun.org" className="text-on-surface hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">delegates@dhmmun.org</a></p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div 
            className="bg-surface-container-low/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-outline-variant/30 relative"
            style={{ boxShadow: 'var(--image-shadow)' }}
          >
            {/* Decorative corner */}
            <div className="absolute -top-px -right-px w-20 h-20 bg-gradient-to-bl from-primary/40 to-transparent rounded-tr-[2rem] opacity-50"></div>
            
            <h2 className="text-3xl font-headline font-bold mb-8 text-on-surface">Delegate Application</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                    <input type="text" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/30" placeholder="Jane" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                    <input type="text" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/30" placeholder="Doe" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                  <input type="email" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/30" placeholder="jane.doe@school.edu" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Institution / School</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                  <input type="text" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/30" placeholder="International School of..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Experience Level</label>
                <div className="relative">
                  <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                  <select defaultValue="" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer">
                    <option value="" disabled className="text-on-surface-variant/30">Select your experience</option>
                    <option value="beginner">Beginner (0-1 conferences)</option>
                    <option value="intermediate">Intermediate (2-4 conferences)</option>
                    <option value="advanced">Advanced (5+ conferences)</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <button type="button" className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold text-lg icon-glow hover:brightness-110 transition-all scale-[1.02] hover:scale-[1.04] active:scale-[0.98] mt-4">
                Submit Application
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
