export const useSmoothScroll = () => {
  const scrollTo = (elementId: string, offset: number = 0) => {
    if (typeof window === 'undefined') return; // Prevent SSR errors

    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`[use-scroll-sense]: Element with id '${elementId}' not found.`);
      return;
    }

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return { scrollTo };
};