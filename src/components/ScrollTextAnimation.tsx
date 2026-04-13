import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollTextAnimation({ children, delay = 0, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const split = new SplitType(containerRef.current.querySelectorAll('.split-target'), { 
      types: 'lines, words, chars',
      tagName: 'span'
    });
    
    const chars = split.chars;
    if (!chars || chars.length === 0) return;

    gsap.set(chars, { opacity: 0 });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        
        gsap.to(chars, {
          opacity: 1,
          duration: 0.01,
          stagger: 0.015, // 15ms per character for a brisk, premium reading pace
          delay: delay,
          ease: "none"
        });
      }
    }, { threshold: 0.2 });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      split.revert();
    };
  }, [delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
