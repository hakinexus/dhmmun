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

    // Call the View Transition API safely
    const transition = (document as any).startViewTransition(async () => {
      // Synchronously apply the theme change to the DOM
      toggleTheme();
      // Added a tiny simulated delay as DOM changes can be microscopic, ensuring snapshot completes
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 500,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)", 
          pseudoElement: "::view-transition-new(root)"
        }
      );
    });
  };

  return { theme, toggleWithTransition };
}
