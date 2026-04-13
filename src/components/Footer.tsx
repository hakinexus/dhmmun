import { Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-16 px-8 flex flex-col items-center gap-8 justify-center text-center bg-[var(--footer-bg)] backdrop-blur-3xl rounded-t-[4rem] mt-20 border-t border-white/5 transition-colors duration-500">
      <div className="text-xl font-bold text-primary font-headline">
        DHMMUN
      </div>
      <div className="flex flex-wrap justify-center gap-8 font-body text-sm tracking-wide">
        <Link to="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Privacy Policy</Link>
        <Link to="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Terms of Service</Link>
        <Link to="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Contact Us</Link>
      </div>
      <div className="w-16 h-[1px] bg-on-surface/10"></div>
      <p className="text-on-surface-variant font-body text-sm tracking-wide">© 2026 DHMMUN. The Fluidity of Diplomacy.</p>
      <div className="flex gap-6 mt-4">
        <Link to="#" className="opacity-80 hover:opacity-100 transition-opacity">
          <Globe className="text-primary w-6 h-6" />
        </Link>
        <Link to="#" className="opacity-80 hover:opacity-100 transition-opacity">
          <Mail className="text-primary w-6 h-6" />
        </Link>
      </div>
    </footer>
  );
}
