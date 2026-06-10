import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';

interface SpotlightInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  Icon: React.ElementType;
  error?: string;
  mask?: string;
  onFocusStateChange?: (id: string | null) => void;
}

export const SpotlightInput: React.FC<SpotlightInputProps> = ({
  id,
  label,
  Icon,
  type = "text",
  error,
  mask,
  value,
  onFocusStateChange,
  placeholder,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const isFloating = !!value || isFocused || type === "date";
  const hasMask = !!mask;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    triggerHaptic(hapticPatterns.light);
    if (onFocusStateChange) onFocusStateChange(id);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onFocusStateChange) onFocusStateChange(null);
    if (props.onBlur) props.onBlur(e);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative group w-full"
    >
      {/* Cinematic sensing spotlight overlay */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-[0.14] group-focus-within:opacity-[0.22] transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(110px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-primary) 0%, transparent 100%)`
        }}
      />

      <input 
        type={type} 
        id={id}
        value={value ?? ''}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`peer w-full bg-white/70 dark:bg-zinc-900/20 backdrop-blur-md border ${
          error ? 'border-error' : 'border-zinc-200/80 dark:border-zinc-800/40'
        } rounded-2xl px-5 pt-7 pb-3 text-sm md:text-base text-on-surface focus:outline-none focus:bg-white dark:focus:bg-zinc-950/40 transition-all duration-300 shadow-sm ${
          hasMask ? 'font-mono tracking-[0.1em] sm:tracking-[0.2em]' : ''
        }`}
        placeholder={isFloating ? placeholder : " "}
        aria-invalid={!!error}
        {...props}
      />
      
      {hasMask && isFloating && (
        <div 
          className="absolute inset-0 pointer-events-none px-5 pt-7 pb-3 border border-transparent text-sm md:text-base font-mono tracking-[0.1em] sm:tracking-[0.2em] text-transparent overflow-hidden whitespace-nowrap z-10 block"
          aria-hidden="true"
          style={{ lineHeight: 'normal' }}
        >
          <span className="opacity-0">{value}</span>
          <span className="text-on-surface-variant/40">{mask.slice(String(value).length)}</span>
        </div>
      )}

      <label 
        htmlFor={id}
        className={`absolute left-5 transition-all duration-300 pointer-events-none z-20 ${
          isFloating ? 'top-2 text-[10px] font-bold text-primary animate-[pulse_2s_infinite]' : 'top-5 text-base text-on-surface-variant/70'
        } ${error ? 'text-error' : ''}`}
      >
        {label}
      </label>

      <Icon className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 z-20 ${
        error ? 'text-error animate-[shake_0.4s_ease-in-out]' : 'text-on-surface-variant/40 peer-focus:text-primary'
      }`} />

      {/* Exquisite edge border lighting */}
      <div className={`absolute inset-0 rounded-2xl border-2 pointer-events-none transition-all duration-500 z-20 ${
        error ? 'border-error opacity-100 scale-100' : isFocused ? 'border-primary opacity-100 scale-100 blur-[1px]' : 'border-primary opacity-0 scale-105'
      }`}></div>

      {error && <span className="absolute -bottom-5 left-2 text-[10px] text-error font-medium">{error}</span>}
    </div>
  );
};

interface SpotlightSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  Icon: React.ElementType;
  error?: string;
  options: { value: string; label: string }[];
  onFocusStateChange?: (id: string | null) => void;
}

export const SpotlightSelect: React.FC<SpotlightSelectProps> = ({
  id,
  label,
  Icon,
  error,
  options,
  value,
  onFocusStateChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const isFloating = !!value || isFocused;

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    triggerHaptic(hapticPatterns.light);
    if (onFocusStateChange) onFocusStateChange(id);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    if (onFocusStateChange) onFocusStateChange(null);
    if (props.onBlur) props.onBlur(e);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative group w-full"
    >
      {/* Cinematic sensing spotlight overlay */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-[0.14] group-focus-within:opacity-[0.22] transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(110px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-primary) 0%, transparent 100%)`
        }}
      />

      <select 
        id={id}
        value={value ?? ''}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`peer w-full bg-white/70 dark:bg-zinc-900/20 backdrop-blur-md border ${
          error ? 'border-error' : 'border-zinc-200/80 dark:border-zinc-800/40'
        } rounded-2xl px-5 pt-7 pb-3 text-sm md:text-base ${
          value ? 'text-on-surface' : 'text-transparent'
        } focus:text-on-surface focus:outline-none focus:bg-white dark:focus:bg-zinc-950/40 transition-all duration-300 appearance-none cursor-pointer shadow-sm`}
        aria-invalid={!!error}
        {...props}
      >
        <option value="" disabled className="bg-white dark:bg-zinc-900 text-on-surface-variant hidden">Select option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-zinc-900 text-on-surface">{opt.label}</option>
        ))}
      </select>
      
      <label 
        htmlFor={id}
        className={`absolute left-5 transition-all duration-300 pointer-events-none ${
          isFloating ? 'top-2 text-[10px] font-bold text-primary' : 'top-5 text-base text-on-surface-variant/70'
        } ${error ? 'text-error' : ''}`}
      >
        {label}
      </label>
      
      <Icon className={`absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 z-20 ${
        error ? 'text-error animate-[shake_0.4s_ease-in-out]' : 'text-on-surface-variant/40 peer-focus:text-primary'
      }`} />

      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none z-20">
        <svg className={`w-4 h-4 transition-transform duration-300 ${isFocused ? 'rotate-180 text-primary' : 'text-on-surface-variant/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {/* Exquisite edge border lighting */}
      <div className={`absolute inset-0 rounded-2xl border-2 pointer-events-none transition-all duration-500 z-20 ${
        error ? 'border-error opacity-100 scale-100' : isFocused ? 'border-primary opacity-100 scale-100 blur-[1px]' : 'border-primary opacity-0 scale-105'
      }`}></div>

      {error && <span className="absolute -bottom-5 left-2 text-[10px] text-error font-medium">{error}</span>}
    </div>
  );
};
