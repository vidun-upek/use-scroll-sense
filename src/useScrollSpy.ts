import { useState, useEffect, useRef } from 'react';

export interface UseScrollSpyOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export const useScrollSpy = (
  sectionIds: string[],
  options: UseScrollSpyOptions = { rootMargin: '0px', threshold: 0.5 }
): string => {
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Grab the element taking up the most viewport space
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveId(visibleEntries[0].target.id);
      }
    }, options);

    elements.forEach((el) => observer.current?.observe(el));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [sectionIds, options.rootMargin, options.threshold]);

  return activeId;
};