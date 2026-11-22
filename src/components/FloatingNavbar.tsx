'use client';

import React, { useState, useEffect } from 'react';
import { Users, Calendar, Heart, Image, Gift, MessageSquare } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'couple', label: 'Mempelai', icon: Users },
  { id: 'event', label: 'Acara', icon: Calendar },
  { id: 'story', label: 'Cerita', icon: Heart },
  { id: 'gallery', label: 'Galeri', icon: Image },
  { id: 'gift', label: 'Kado', icon: Gift },
  { id: 'rsvp', label: 'RSVP', icon: MessageSquare },
];

export default function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_ITEMS[i].id);
        if (section && section.offsetTop - 200 <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
          return;
        }
      }
      setActiveSection(NAV_ITEMS[0].id);
    };

    handleScroll();
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
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-lg px-2 py-2 rounded-full border border-white/90 shadow-2xl shadow-[#1e3325]/15 flex items-center gap-0.5 sm:gap-1.5 max-w-[94vw]"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'true' : undefined}
            className={`flex flex-col items-center justify-center py-1.5 px-2 sm:px-3.5 rounded-full transition-all cursor-pointer ${
              isActive
                ? 'bg-[#2d4234] text-white shadow-md'
                : 'text-stone-500 hover:text-[#2d4234] hover:bg-[#edf4f0]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[9px] sm:text-[10px] font-sans font-medium tracking-tight mt-0.5 hidden xs:inline">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
