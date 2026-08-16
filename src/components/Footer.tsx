import { Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-16 px-8 flex flex-col items-center gap-8 justify-center text-center bg-[var(--footer-bg)] backdrop-blur-3xl rounded-t-[4rem] mt-20 border-t border-white/5 transition-colors duration-500">
      <div className="text-xl font-bold text-primary font-headline tracking-tight">
        SummitMUN
      </div>
      <div className="flex flex-wrap justify-center gap-8 font-body text-sm tracking-wide">
        <Link to="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Privacy Policy</Link>
        <Link to="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Code of Conduct</Link>
        <Link to="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Documentation</Link>
        <Link to="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Contact Secretariat</Link>
      </div>
      <div className="w-16 h-[1px] bg-on-surface/10"></div>
      <p className="text-on-surface-variant font-body text-sm tracking-wide">
        © 2026 SummitMUN. Open Source Diplomatic Conference & Model UN Platform Template.
      </p>
      <div className="flex gap-6 mt-2">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" title="GitHub Repository">
          <Globe className="text-primary w-6 h-6" />
        </a>
        <a href="mailto:secretariat@example.org" className="opacity-80 hover:opacity-100 transition-opacity" title="Email Contact">
          <Mail className="text-primary w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}
