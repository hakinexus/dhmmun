import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';

export default function HeroTextAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cursorRef.current) return;

    let splitInstance: SplitType | null = null;
    let mainTimeline: gsap.core.Timeline | null = null;

    const initAnimation = () => {
      if (splitInstance) {
        splitInstance.revert();
      }
      if (mainTimeline) {
        mainTimeline.kill();
      }

      // Initialize SplitType to break text into characters
      splitInstance = new SplitType(containerRef.current!.querySelectorAll('.split-target'), { 
        types: 'lines,words,chars',
        tagName: 'span'
      });
      
      const chars = splitInstance.chars;
      if (!chars || chars.length === 0) return;

      // Initial setup: hide all characters and position/hide cursor
      gsap.set(chars, { opacity: 0 });
      gsap.set(cursorRef.current, { opacity: 0 });

      // Create a GSAP timeline for the sequence with a premium 0.5s initial delay
      mainTimeline = gsap.timeline({ delay: 0.5 });

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
        const topOffset = window.innerWidth < 768 ? -2 : -8;
        const top = char.offsetTop + char.offsetHeight + topOffset;
        const width = char.offsetWidth;

        // Reveal the character instantly (typewriter style)
        mainTimeline!.to(char, {
          opacity: 1,
          duration: 0.01,
          onStart: () => {
            triggerHaptic(hapticPatterns.typewriter);
          }
        }, index * 0.075);

        // Move the cursor fluidly to the new character
        mainTimeline!.to(cursorRef.current, {
          left: left,
          top: top,
          width: width,
          duration: 0.075,
          ease: "power2.out"
        }, index * 0.075);
      });

      // Bind interactive elastic hover effects
      chars.forEach((char) => {
        const el = char as HTMLElement;
        el.style.display = 'inline-block';
        el.style.transformOrigin = 'center bottom';
        el.style.cursor = 'pointer';

        // Detect if this character is part of a text-transparent gradient line
        const isGradient = el.closest('.split-target')?.classList.contains('text-transparent');

        const onEnter = () => {
          triggerHaptic(hapticPatterns.light);
          const animProps: gsap.TweenVars = {
            y: -28,
            scale: 1.16,
            rotation: gsap.utils.random(-14, 14),
            opacity: 1,
            duration: 0.18,
            ease: 'power2.out',
            overwrite: 'auto'
          };

          if (!isGradient) {
            animProps.color = 'var(--color-primary)';
          }

          gsap.to(el, animProps);
        };

        const onLeave = () => {
          const animProps: gsap.TweenVars = {
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'elastic.out(1.2, 0.4)',
            overwrite: 'auto',
            onComplete: () => {
              // Smooth cleanup of values to prevent browser layout-engine clashing
              gsap.set(el, { clearProps: 'y,scale,rotation,transform,color' });
            }
          };

          if (!isGradient) {
            animProps.color = 'inherit';
          }

          gsap.to(el, animProps);
        };

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        el.addEventListener('touchstart', onEnter, { passive: true });
        el.addEventListener('touchend', onLeave, { passive: true });
        el.addEventListener('touchmove', (e) => {
          if (e.touches.length > 0) {
            triggerHaptic(hapticPatterns.light);
          }
        }, { passive: true });
      });

      // Rhythmic blink cursor after typing finishes
      mainTimeline!.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.4,
        ease: "steps(1)"
      }, "+=0.1");
    };

    // Initialize on mount
    initAnimation();

    // Handle real screen width changes while ignoring vertical heights (like mobile browser toolbar changes)
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      
      initAnimation();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (splitInstance) {
        splitInstance.revert();
      }
      if (mainTimeline) {
        mainTimeline.kill();
      }
    };
  }, []);

  return (
    <div className="relative w-full group select-none" ref={containerRef}>
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
