import { Globe, Users, GraduationCap, MapPin, Building, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import Magnetic from '../components/Magnetic';
import HeroTextAnimation from '../components/HeroTextAnimation';
import ScrollTextAnimation from '../components/ScrollTextAnimation';

export default function Home() {
  const { scrollY } = useScroll();
  const blobsY = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden glass-gradient-bg">
        {/* Ethereal Background Elements */}
        <motion.div style={{ y: blobsY }} className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></motion.div>
        <motion.div style={{ y: blobsY }} className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full"></motion.div>
        
        <div className="container mx-auto px-6 text-center z-10">
          <HeroTextAnimation />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-on-surface-variant text-lg md:text-2xl font-body leading-relaxed mb-12 md:mb-16 opacity-90 font-light"
          >
            Experience the next generation of global discourse at Downe House Muscat. Where traditional diplomacy meets the transparency of the future.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-24 md:mb-32 w-full px-4 md:px-0"
          >
            <Magnetic strength={0.3} className="w-full md:w-auto">
              <Link 
                to="/registration" 
                className="group relative flex md:inline-flex items-center justify-center w-full md:w-auto px-10 py-4 md:py-5 rounded-full text-on-primary font-bold text-lg transition-all duration-500 chromatic-btn-hover"
              >
                {/* Base background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Inner highlight (top edge) */}
                <div className="absolute inset-0 rounded-full liquid-border opacity-50"></div>
                {/* Outer glow */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary to-secondary opacity-30 blur-xl group-hover:opacity-60 group-hover:blur-2xl transition-all duration-500 -z-10"></div>
                
                <span className="relative z-10 flex items-center gap-2 drop-shadow-md tracking-wide">
                  Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Magnetic>
            
            <Magnetic strength={0.2} className="w-full md:w-auto">
              <Link 
                to="/about" 
                className="group relative flex md:inline-flex items-center justify-center w-full md:w-auto px-10 py-4 md:py-5 rounded-full text-on-surface font-semibold text-lg transition-all duration-500 chromatic-btn-hover"
              >
                {/* Glass background */}
                <div className="absolute inset-0 rounded-full bg-on-surface/5 backdrop-blur-xl border border-outline-variant/20 group-hover:bg-on-surface/10 group-hover:border-outline-variant/40 transition-all duration-500"></div>
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 rounded-full liquid-border opacity-30"></div>
                
                <span className="relative z-10 tracking-wide">Learn More</span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 3.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-medium">Scroll</span>
          <div className="w-[1px] h-16 bg-on-surface/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Feature Section */}
      <section className="py-20 md:py-32 px-6 container mx-auto overflow-hidden">
        {/* Swipe Indicator for Mobile */}
        <div className="md:hidden flex items-center gap-2 text-on-surface-variant/60 text-sm font-medium mb-4 animate-pulse">
          <ArrowRight className="w-4 h-4" />
          <span>Swipe to explore</span>
        </div>

        <div className="flex md:grid md:grid-cols-12 gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 w-[calc(100vw-3rem)] md:w-full md:pb-0">
          {/* Large Feature Card - Global Debate */}
          <motion.div 
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[85vw] shrink-0 md:w-auto md:col-span-8 snap-center group relative overflow-hidden rounded-lg bg-surface-container-low p-8 md:p-12 flex flex-col justify-between h-[500px] border border-outline-variant/20 hover:border-outline-variant/40 transition-colors"
          >
            <div className="absolute inset-0 z-0">
              <img 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzTicZQfoqIhvyIDG2wbn2V_nWpaVqambiyHlabWvPRbfnQeAgMDHOGxfXJsJ2ALfbzYS7rRu56Y9x-TO9_4nzJDPTcwC-C0j_5BWIzsvJ56Tsyu9OPwU6Xs1BSWbdlKW18CK2bKoUTHhpDW5lg0_isL9e8tFl2NnOPQrOdzsd7SyEUKAEQYDDw_XA0SsokjuI6mvuVCPNrlc7l25Q_bFl3onQx9zkboFsWUrbEv-BKkTtsMle_gqXCk7aASqdoLvTMVJQoV63dFM"
                alt="Modern geometric conference hall"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
            </div>
            <ScrollTextAnimation delay={0.4} className="relative z-10">
              <motion.div 
                animate={{ y: [0, -6, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="inline-block mb-6 relative"
              >
                <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse"></div>
                <Globe className="relative text-primary w-10 h-10 icon-glow" strokeWidth={1.5} />
              </motion.div>
              <h3 className="split-target text-4xl font-headline font-bold mb-4 group-hover:font-black transition-all duration-500">The Architecture of Discourse</h3>
              <p className="split-target max-w-md text-on-surface-variant text-lg">Tackle international crises with sophisticated resolution frameworks in a world-class environment.</p>
            </ScrollTextAnimation>
            <div className="relative z-10 flex gap-3">
              <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">United Nations</span>
              <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">Crisis Cabinet</span>
            </div>
          </motion.div>

          {/* Small Feature Card 1 - Elite Networking */}
          <motion.div 
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-[85vw] shrink-0 md:w-auto md:col-span-4 snap-center group relative overflow-hidden rounded-lg bg-surface-container-low p-8 md:p-12 flex flex-col h-[500px] border border-outline-variant/20 hover:border-outline-variant/40 transition-colors"
          >
            <div className="absolute top-0 right-0 p-8">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Users className="text-primary w-12 h-12 opacity-20 icon-glow" />
              </motion.div>
            </div>
            <ScrollTextAnimation delay={0.6} className="mt-auto relative z-10">
              <h3 className="split-target text-3xl font-headline font-bold mb-4 group-hover:font-black transition-all duration-500">The Nexus of Influence</h3>
              <p className="split-target text-on-surface-variant text-base mb-6">Connect with the most ambitious students from across the GCC and beyond at our exclusive gala event.</p>
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDek4H2uo2-vhGsO0WEZLF4pN0ujsZfpWZNrYhMczHEu42l8Fgn6kdU1nymld25IBGACwI8W8OQkT5QC0W0B8BXVwW1Ot8rGpd9L5Roi5mf75JSYgguZvQ1kz6QkSFVVLtzcwOMPBLxHZ6JerfKXq5GumaquMDodinJaviZXrqQqExbMYogSfGOQrfLpP_jIPpDx53YkvLFJHQpQ2q_1ZZNcEZDHDNy9gS0c-YYWvYajmdTKNy4JWaZLXuvaB7ONtB6orYCud28Y18" alt="Delegate" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw8pDX5wVBc_fiDBAM3LM2wNhOQST5fokSU19spAPMXJXLaG1vT8xADIDkbFI2jLhUt_Ot3wqSx7jFTwHLbtU19nm6l2rrr1_my6heTRPJ1A0N27idTrxyI5I7XoOOaw112_1vveNja4UlDrz6f0TyjYFFwx_ZMOg4iEneafrJZr7A5WbPuBPGAQYObwn2HI0pboatgE5wmLq8bclTBTUe_IbevVOgIv90ghmnjelqRedb1uVGl8PC5mYk7yG58F-0YVBv34RTZCY" alt="Delegate" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfN8hfNRIhuotzm_xFdk8ofMjKU2LGustEXHqj1ZJxQk0yr14Rq9hd0hRYEttDJR450OnVtGYNadpPjgZNs_ibhFOft6jUoLZUWi8qJNgKZidMcoS7-Yg7HJy8Z4Y9BoFrWdNelh0u92zxXDb5Ng5-KlJ_NOBTsMhbqhtxgYbkcv3hJj8YPYzkwPrGLHZETqL4d9GkOJR7lkxokP-0cityeGwGaC6P9-MquroFUg0T9SbjodcPpUgdQF77843deZ6a4X6Q4A657nQ" alt="Delegate" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center text-xs font-bold text-primary">
                  +250
                </div>
              </div>
            </ScrollTextAnimation>
          </motion.div>

          {/* Academic Excellence Card */}
          <div className="w-[85vw] shrink-0 md:w-auto md:col-span-12 snap-center group relative overflow-hidden rounded-lg bg-surface-container-low p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
            <div className="w-full md:w-1/2">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="inline-block mb-6"
              >
                <GraduationCap className="text-primary w-10 h-10 icon-glow" />
              </motion.div>
              <ScrollTextAnimation delay={0.2}>
                <h3 className="split-target text-4xl font-headline font-bold mb-4 group-hover:font-black transition-all duration-500">The Pinnacle of Diplomacy</h3>
                <p className="split-target text-on-surface-variant text-lg leading-relaxed mb-8">
                  Hosted at Downe House Muscat, our conference maintains the highest standards of research and debate, supported by expert chairs and prestigious keynote speakers.
                </p>
              </ScrollTextAnimation>
              <div className="grid grid-cols-2 gap-8">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
                >
                  <div className="text-3xl font-headline font-bold text-primary">12+</div>
                  <div className="text-sm uppercase tracking-widest text-on-surface-variant">Committees</div>
                </motion.div>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
                >
                  <div className="text-3xl font-headline font-bold text-primary">30+</div>
                  <div className="text-sm uppercase tracking-widest text-on-surface-variant">Countries</div>
                </motion.div>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ16id5t3XBTdSG5o2ZPSkAPVWJz5MAZ_IAGxiftZKOGbZ5F4XlNCVTaaJ06uvmc8uUVu_L3XFR6HcjuPsQVXJeAhDaop-I7gkATXRS636OGQQg1c42z6FvO6eYumgVU9bOKfVhWWO-T4aVtmVL8MXtbVC0DfDAFQ6qELoXnq3UojCtVMhY18534dYYQ8PXDi49pqkAY0qkRVxTjrRb7_n3CrVDBkG6IjhGOOD9uaKo49sItqUp1Jow3TdzYb0_UsZkQKhimJBywc" alt="Fountain pen" />
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 md:py-32 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/2 space-y-8 group"
          >
            <h2 className="text-5xl font-headline font-bold tracking-tight group-hover:font-black transition-all duration-500">The Venue</h2>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              Downe House Muscat offers an architectural masterpiece as the backdrop for our delegates. A fusion of Omani heritage and modern educational excellence.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-on-surface">
                <MapPin className="text-primary w-6 h-6" />
                <span>Muscat, Oman</span>
              </li>
              <li className="flex items-center gap-4 text-on-surface">
                <Building className="text-primary w-6 h-6" />
                <span>State-of-the-Art Facilities</span>
              </li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full md:w-1/2 aspect-video rounded-lg overflow-hidden border border-outline-variant/20"
            style={{ boxShadow: 'var(--image-shadow)' }}
          >
            <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMxn6LYxHpdxETolh1oUHgd5xYzGaGRXCut0uPgHw7MciOsbw_1Exf2PNMga8f_HvE2DU02eXABQfwFiSsjh0RZJGeK0HOcIxhjtY5Bxvc51iURZVf6ibQbiEMvHhHYn2-bSX2RevN5apNJVghUZ4mRxQtumqyWpGCsBihIB6ygOkb-E24BcDxhwsGm7KpiYoly7hx63vV5mDto7p0_CnDZt1UDEGNdW_ZTAOEymPN_QLItX0JHwR3y86OJ9xLzQyWl4qs8EI6bsY" alt="Muscat" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
