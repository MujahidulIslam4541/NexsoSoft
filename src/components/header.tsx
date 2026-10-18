'use client';
import Link from 'next/link';
import {Logo} from '@/components/logo';
import {Menu, X, Sun, Moon} from 'lucide-react';
import React from 'react';
import {useScroll, motion} from 'motion/react';
import {useLenis} from 'lenis/react';
import {cn} from '@/lib/utils';

import {NAV_MENU_ITEMS} from '@/constants/navigation';

const menuItems = NAV_MENU_ITEMS;

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const {scrollYProgress} = useScroll();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const lenis = useLenis();

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setTheme(nextTheme);
  };

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Lock scroll and pause Lenis when mobile menu is open
  React.useEffect(() => {
    if (menuState) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [menuState, lenis]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuState(false);
    if (lenis) {
      lenis.start();
      const isHomepage = window.location.pathname === '/';
      const isAnchor = href.startsWith('#') || (isHomepage && href.startsWith('/#'));
      if (isAnchor) {
        const hash = href.startsWith('/#') ? href.slice(1) : href;
        if (hash && hash !== '#') {
          const target = document.querySelector(hash);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 });
            window.history.pushState(null, '', hash);
          }
        }
      }
    }
  };

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed z-20 w-full pt-2 px-4">
        <div
          className={cn(
            'mx-auto max-w-7xl transition-all duration-300 ease-in-out',
            menuState
              ? 'rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-xl px-6'
              : scrolled
                ? 'rounded-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-200/40 dark:shadow-none px-6 lg:px-12'
                : 'rounded-full bg-transparent border-transparent px-6 lg:px-12',
          )}>
          <motion.div
            key={1}
            className={cn(
              'flex items-center justify-between py-3 duration-300 lg:py-6',
              scrolled && 'lg:py-3',
            )}>
            <div className="flex items-center">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2 shrink-0">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex gap-8 text-sm font-medium">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="relative text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-base group py-1">
                      {item.name}
                      {/* Animated underline */}
                      <span className="absolute bottom-0 left-0 h-px w-full bg-primary scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="relative size-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                aria-label="Toggle Theme">
                <Sun className="size-5 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0 text-slate-600 dark:text-slate-400" />
                <Moon className="absolute size-5 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100 text-slate-400 dark:text-yellow-400" />
              </button>

              {/* CTA Button */}
              <Link
                href="/#contact"
                id="nav-cta-btn"
                onClick={(e) => handleNavClick(e, '/#contact')}
                className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-full overflow-hidden
                  bg-primary
                  border border-primary
                  transition-all duration-300
                  hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]
                  hover:scale-[1.03]
                  active:scale-[0.98]
                  focus:outline-none focus:ring-2 focus:ring-primary/50">
                Contact Us
              </Link>
            </div>

            {/* Mobile Actions Container (Toggle & Hamburger) */}
            <div className="flex lg:hidden items-center gap-3">
              {/* Theme Toggle Button for Mobile */}
              <button
                onClick={toggleTheme}
                className="relative size-9 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                aria-label="Toggle Theme">
                <Sun className="size-4.5 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0 text-slate-600 dark:text-slate-400" />
                <Moon className="absolute size-4.5 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100 text-slate-400 dark:text-yellow-400" />
              </button>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 p-2 focus:outline-none text-slate-700 dark:text-slate-300">
                <Menu
                  className={cn(
                    'size-6 transition-all duration-300',
                    menuState
                      ? 'scale-0 opacity-0 rotate-90'
                      : 'scale-100 opacity-100 rotate-0',
                  )}
                />
                <X
                  className={cn(
                    'absolute inset-0 m-auto size-6 transition-all duration-300',
                    menuState
                      ? 'scale-100 opacity-100 rotate-0'
                      : 'scale-0 opacity-0 -rotate-90',
                  )}
                />
              </button>
            </div>
          </motion.div>

          {/* Mobile Navigation Dropdown */}
          <motion.div
            initial={false}
            animate={
              menuState ? {height: 'auto', opacity: 1} : {height: 0, opacity: 0}
            }
            data-lenis-prevent
            className="lg:hidden overflow-hidden">
            <ul className="space-y-3 pb-6 pt-2">
              {menuItems.map((item, index) => (
                <li key={index} className="px-4">
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary block py-2.5 border-b border-slate-100 dark:border-slate-800/60 last:border-none transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="px-4 pt-4">
                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, '/#contact')}
                  className="block w-full text-center bg-primary text-white rounded-full py-2.5 text-base font-semibold hover:bg-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};
