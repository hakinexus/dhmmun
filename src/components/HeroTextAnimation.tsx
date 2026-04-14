import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';

export default function HeroTextAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cursorRef.current) return;

    // Initialize SplitType to break text into characters
    const split = new SplitType(containerRef.current.querySelectorAll('.split-target'), { 
      types: 'lines, words, chars',
      tagName: 'span'
    });
    
    const chars = split.chars;
    if (!chars || chars.length === 0) return;

    // Initial setup: hide all characters and cursor
    gsap.set(chars, { opacity: 0 });
    gsap.set(cursorRef.current, { opacity: 0 });

    // Create a GSAP timeline for the sequence with a premium 0.5s initial delay
    const tl = gsap.timeline({ delay: 0.5 });

    // Position cursor at the first character initially
    const firstChar = chars[0];
    gsap.set(cursorRef.current, {
      left: firstChar.offsetLeft,
      top: firstChar.offsetTop + firstChar.offsetHeight - 4,
      width: firstChar.offsetWidth,
      opacity: 1
    });

    // Animate each character and move the cursor
    chars.forEach((char, index) => {
      const left = char.offsetLeft;
      // Adjust the top position slightly based on screen size/line height
      const topOffset = window.innerWidth < 768 ? -2 : -8;
      const top = char.offsetTop + char.offsetHeight + topOffset;
      const width = char.offsetWidth;

      // Reveal the character instantly (typewriter style)
      tl.to(char, {
        opacity: 1,
        duration: 0.01,
        onStart: () => {
          // Trigger a very small, cute vibration for each character
          triggerHaptic(hapticPatterns.typewriter);
        }
      }, index * 0.075); // Premium pace: 75ms per character

      // Move the cursor fluidly to the new character
      tl.to(cursorRef.current, {
        left: left,
        top: top,
        width: width,
        duration: 0.075,
        ease: "power2.out"
      }, index * 0.075);
    });

    // After typing is complete, make the cursor blink rhythmically
    tl.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.4,
      ease: "steps(1)" // Sharp, rhythmic blink instead of smooth fade
    }, "+=0.1");

    // Handle resize to keep cursor positioned correctly at the end
    const handleResize = () => {
      split.split({ types: 'lines, words, chars' });
      tl.progress(1); // Jump to end of animation
      const lastChar = split.chars![split.chars!.length - 1];
      if (lastChar) {
         const topOffset = window.innerWidth < 768 ? -2 : -8;
         gsap.set(cursorRef.current, {
            left: lastChar.offsetLeft,
            top: lastChar.offsetTop + lastChar.offsetHeight + topOffset,
            width: lastChar.offsetWidth,
            opacity: 1 // Ensure it's visible if it was in the middle of a blink
         });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      split.revert();
      tl.kill();
    };
  }, []);

  return (
    <div className="relative w-full group" ref={containerRef}>
      <h1 className="font-headline text-7xl md:text-[10rem] tracking-tighter text-on-surface mb-6 leading-[0.9] chromatic-hover">
        <div className="split-target font-black text-glow drop-shadow-2xl pb-2 md:pb-4">DHMMUN</div>
        <div className="split-target font-medium hover:font-black transition-all duration-700 text-transparent bg-clip-text bg-gradient-to-r from-primary via-on-primary-container to-secondary text-5xl md:text-8xl tracking-tight">
          The Fluidity of Diplomacy
        </div>
      </h1>
      
      {/* The Active Underline Cursor */}
      <div 
        ref={cursorRef} 
        className="absolute h-1.5 md:h-2.5 bg-primary rounded-full icon-glow z-20"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
