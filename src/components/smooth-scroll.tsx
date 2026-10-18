'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import React, { useEffect, useSyncExternalStore } from 'react';

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getSnapshotReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshotReducedMotion() {
  return false;
}

function LenisAnchorHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Expose lenis instance globally if needed
    (window as unknown as { lenisInstance?: typeof lenis }).lenisInstance = lenis;

    // Handle initial hash on page load (e.g. /#contact)
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 });
        }, 150);
      }
    }

    // Delegated smooth scroll for anchor links with sticky header offset
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const isHomepage = window.location.pathname === '/';
      const isAnchor = href.startsWith('#') || (isHomepage && href.startsWith('/#'));

      if (isAnchor) {
        const hash = href.startsWith('/#') ? href.slice(1) : href;
        if (hash === '#' || hash === '') return;
        try {
          const target = document.querySelector(hash);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 });
            window.history.pushState(null, '', hash);
          }
        } catch {
          // Ignore invalid selector
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getSnapshotReducedMotion,
    getServerSnapshotReducedMotion
  );

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      <LenisAnchorHandler />
      {children}
    </ReactLenis>
  );
}

