import { useTheme } from '../context/ThemeContext';

export function useThemeTransition() {
  const { theme, toggleTheme } = useTheme();

  const toggleWithTransition = (event: React.MouseEvent | React.KeyboardEvent | { clientX: number, clientY: number }) => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Fallback if browser doesn't support View Transitions or reduced motion is preferred
    if (!('startViewTransition' in document) || isReducedMotion) {
      toggleTheme();
      return;
    }

    // Get click/interaction coordinates. Default to center if triggered by keyboard without explicit mouse coords
    const x = 'clientX' in event ? (event as React.MouseEvent).clientX : window.innerWidth / 2;
    const y = 'clientY' in event ? (event as React.MouseEvent).clientY : window.innerHeight / 2;

    // Calculate hypotenuse to find the maximum radius needed to cover the entire viewport from the click origin
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Determine direction of transition animation:
    // If we're light going to dark -> Expand dark mode outward
    // If we're dark going to light -> Shrink dark mode inward to the toggle button
    const isSwitchingToDark = theme === 'light';
    const isShrink = !isSwitchingToDark;
    
    // Set a class to handle precise z-index overrides for the shrinking animation
    if (isShrink) {
      document.documentElement.classList.add('theme-transition-shrink');
    }

    // Call the View Transition API safely
    const transition = (document as any).startViewTransition(() => {
      // Synchronously apply the theme change to the DOM
      toggleTheme();
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: isShrink ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 850, // Extended cinematic duration for high-end feel
          easing: isShrink ? "cubic-bezier(0.8, 0, 0.2, 1)" : "cubic-bezier(0.25, 1, 0.5, 1)",
          fill: "forwards", // Prevents the clip-path from reverting and causing a black flash at the end
          pseudoElement: isShrink ? "::view-transition-old(root)" : "::view-transition-new(root)"
        }
      );
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-transition-shrink');
    });
  };

  return { theme, toggleWithTransition };
}
