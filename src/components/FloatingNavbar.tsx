'use client';

import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, Image, Gift, MessageSquare } from 'lucide-react';

export default function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'couple', label: 'Mempelai', icon: Users },
    { id: 'event', label: 'Acara', icon: Calendar },
    { id: 'gallery', label: 'Galeri', icon: Image },
    { id: 'gift', label: 'Kado', icon: Gift },
    { id: 'rsvp', label: 'RSVP', icon: MessageSquare },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = navItems.map((item) => document.getElementById(item.id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop - 200 <= scrollY) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav
      aria-label="Bottom Navigation Dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-lg px-3 py-2 rounded-full border border-white/90 shadow-2xl shadow-[#1e3325]/15 flex items-center gap-1 sm:gap-2 max-w-[92vw]"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            aria-label={item.label}
            className={`flex flex-col items-center justify-center py-1.5 px-3 sm:px-3.5 rounded-full transition-all cursor-pointer ${
              isActive
                ? 'bg-[#2d4234] text-white shadow-md'
                : 'text-stone-500 hover:text-[#2d4234] hover:bg-[#edf4f0]'
            }`}
          >
            <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            <span className="text-[9px] sm:text-[10px] font-sans font-medium tracking-tight mt-0.5 hidden xs:inline">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
