import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Lightbulb, Compass, AlertCircle, Bookmark } from 'lucide-react';

interface BriefingAdvisorProps {
  activeField: string | null;
  currentStep: number;
}

export const BriefingAdvisor: React.FC<BriefingAdvisorProps> = ({ activeField, currentStep }) => {
  // Get tailored advisor guidance based on focused field or active step
  const getBriefing = () => {
    switch (activeField) {
      case 'firstName':
      case 'lastName':
        return {
          title: "Legal Identity Check",
          icon: Terminal,
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/20",
          message: "Please enter your official passport/ID name. These will be engraved directly onto your printed lanyard and official certificates."
        };
      case 'email':
        return {
          title: "Primary Communication Node",
          icon: Bookmark,
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/20",
          message: "Ensure you use an address you monitor frequently. Formal resolution frameworks, country allocations, and summit schedules will be beamed here."
        };
      case 'dob':
        return {
          title: "Security Clearance Eligibility",
          icon: AlertCircle,
          color: "text-secondary",
          bg: "bg-secondary/10",
          border: "border-secondary/20",
          message: "Summits are calibrated for delegates aged 12 and above. Format: DD/MM/YYYY. If you make a mistake, simply change it."
        };
      case 'participationType':
        return {
          title: "Strategic Alliance Selection",
          icon: Compass,
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/20",
          message: "Select 'School Delegation' if you are traveling with an academic squad, or 'Individual Delegate' to champion single-sovereignty agendas."
        };
      case 'institution':
        return {
          title: "Academic Sovereign Registry",
          icon: Lightbulb,
          color: "text-secondary",
          bg: "bg-secondary/10",
          border: "border-secondary/20",
          message: "Enter the formal name of your academic institution. Outstanding delegation awards will be attributed directly to this title."
        };
      case 'experience':
        return {
          title: "Tactical Alignment",
          icon: Terminal,
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/20",
          message: "Choose Beginner (0-1 conferences), Intermediate (2-4), or Advanced (5+). These bounds allow us to balance committee experience for maximum discourse quality."
        };
      case 'committee':
        return {
          title: "Chamber Mandate",
          icon: Compass,
          color: "text-secondary",
          bg: "bg-secondary/10",
          border: "border-secondary/20",
          message: "UNSC resolves extreme peacekeeping; WHO steers planetary healthcare structures; JCC manages live asymmetric crises with real-time countdown tickers."
        };
      case 'countryPref':
        return {
          title: "Geopolitical Posturing",
          icon: Lightbulb,
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/20",
          message: "For example, 'United States' or 'France'. Propose countries that best match your discourse style. Aligning interests with your preferred nations drives success."
        };
      case 'phone':
        return {
          title: "Direct Contact Channel",
          icon: Compass,
          color: "text-secondary",
          bg: "bg-secondary/10",
          border: "border-secondary/20",
          message: "Optional but highly recommended. We'll use this to coordinate with you or your delegation leader for timely notifications."
        };
      case 'instagram':
        return {
          title: "Social Delegate Connect",
          icon: Lightbulb,
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/20",
          message: "Optional handle. Allows peer delegates to coordinate, share intelligence, and build early coalitions before setting foot on the floor."
        };
      case 'socials':
        return {
          title: "Other Digital Profiles",
          icon: Terminal,
          color: "text-secondary",
          bg: "bg-secondary/10",
          border: "border-secondary/20",
          message: "Optional. Add a link (LinkedIn, Twitter, or website) to showcase previous conference roles or academic leadership to the secretariat."
        };
      case 'hearAbout':
        return {
          title: "Referral Intelligence",
          icon: Compass,
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/20",
          message: "Help our outreach division understand where our delegates are coming from to improve global access."
        };
      case 'motivation':
        return {
          title: "Expectations & Motivation",
          icon: Lightbulb,
          color: "text-secondary",
          bg: "bg-secondary/10",
          border: "border-secondary/20",
          message: "Optional but recommended. Give the chairs a brief peek into what you want to achieve or what hobbies you enjoy so they can support you."
        };
      default:
        // Default message depending on overall step
        if (currentStep === 1) {
          return {
            title: "Dossier Creation Initiated",
            icon: Compass,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/20",
            message: "Identify yourself to initiate secure entry to the conference. All inputs are saved in high-performance local micro-drafts."
          };
        } else if (currentStep === 2) {
          return {
            title: "Representation Credentials",
            icon: TargetIcons(currentStep),
            color: "text-secondary",
            bg: "bg-secondary/10",
            border: "border-secondary/20",
            message: "Establishing representational bounds. Your profile helps the administration match debate styles, ensuring an elite experience."
          };
        } else if (currentStep === 3) {
          return {
            title: "Delegate Profiling",
            icon: Lightbulb,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/20",
            message: "Let the secretariat get to know you better. All inputs in this step are optional but recommended to create a custom profile."
          };
        } else {
          return {
            title: "Committee Allocation Preferences",
            icon: Terminal,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/20",
            message: "Almost there. Specify your desired committee and country preferences to finalise your registration dossier submission."
          };
        }
    }
  };

  const info = getBriefing();
  const Icon = info.icon;

  return (
    <div className="w-full text-left pt-2 md:pt-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeField || currentStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className={`relative overflow-hidden rounded-2xl border ${info.border} ${info.bg} p-5 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.06)]`}
        >
          {/* Futuristic corner grid effect */}
          <div className="absolute top-0 right-0 w-8 h-8 opacity-[0.1] bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent)] pointer-events-none" />

          <div className="flex gap-4 items-start relative z-10">
            <div className={`p-2.5 rounded-xl ${info.bg} border ${info.border} shrink-0`}>
              <Icon className={`w-4 h-4 ${info.color} animate-pulse`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xs font-black font-headline tracking-widest uppercase mb-1 ${info.color}`}>
                {info.title}
              </span>
              <p className="text-[11px] sm:text-xs text-on-surface-variant font-body leading-relaxed">
                {info.message}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Helper for dynamic step icons
const TargetIcons = (step: number) => {
  if (step === 2) return Compass;
  return Terminal;
};
