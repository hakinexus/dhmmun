export const triggerHaptic = (pattern: number | number[] = 2) => {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignore errors if vibration is not supported or blocked
    }
  }
};

export const hapticPatterns = {
  // Very small, cute vibration for typewriter characters
  typewriter: 2,
  // Slightly stronger vibration for form submission success
  success: [10, 30, 20],
  // Light tap for buttons
  tap: 5,
};
