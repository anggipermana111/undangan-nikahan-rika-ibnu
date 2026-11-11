'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, Heart, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured, defaultWishes, WishRecord } from '@/lib/supabase';

interface RsvpWishesSectionProps {
  guestName?: string;
}

export default function RsvpWishesSection({ guestName }: RsvpWishesSectionProps) {
  const [name, setName] = useState(guestName || '');
  const [status, setStatus] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [pax, setPax] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [wishes, setWishes] = useState<WishRecord[]>(defaultWishes);

  // Sync if guestName changes
  useEffect(() => {
    if (guestName) setName(guestName);
  }, [guestName]);

  // Load and subscribe from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const fetchWishes = async () => {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data && data.length > 0) {
        setWishes(data);
      }
    };

    fetchWishes();

    const channel = supabase
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          setWishes((prev) => [payload.new as WishRecord, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);

    const newWish: WishRecord = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `wish-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      status,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('wishes').insert([
          {
            name: newWish.name,
            message: newWish.message,
            status: newWish.status,
            pax: status === 'hadir' ? pax : 0,
          },
        ]);
        await supabase.from('rsvps').insert([
          {
            name: newWish.name,
            status: newWish.status,
            pax: status === 'hadir' ? pax : 0,
            message: newWish.message,
          },
        ]);
      } catch (err) {
        console.warn('Supabase insert failed, using local fallback:', err);
      }
    }

    // Always update local list immediately for instant UI feedback
    setWishes((prev) => [newWish, ...prev]);
    setMessage('');
    setSubmitting(false);
    setSubmitted(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // Ignore if confetti fails in test env
    }
  };

  const formatRelativeTime = (isoString: string) => {
    const diffSeconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diffSeconds < 60) return 'Baru saja';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} hari lalu`;
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-champagne-light/50 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-primary-700 font-medium mb-3">
          Konfirmasi Kehadiran & Doa
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary-900 mb-4">
          RSVP & Wishes
        </h2>
        <p className="text-sm text-stone-600 mb-12 max-w-md mx-auto">
          Kehadiran dan doa restu Anda merupakan kehormatan dan kebahagiaan yang tak ternilai bagi kami.
        </p>

        {/* RSVP Form Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-primary-200 shadow-xl shadow-primary-900/5 text-left mb-16">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-stone-800 text-sm transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus('hadir')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium tracking-wider uppercase border transition-all cursor-pointer ${
                      status === 'hadir'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('tidak_hadir')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium tracking-wider uppercase border transition-all cursor-pointer ${
                      status === 'tidak_hadir'
                        ? 'bg-stone-800 text-white border-stone-800 shadow-sm'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Berhalangan
                  </button>
                </div>
              </div>

              {status === 'hadir' && (
                <div>
                  <label htmlFor="pax" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Jumlah Tamu (Pax)
                  </label>
                  <div className="relative">
                    <select
                      id="pax"
                      value={pax}
                      onChange={(e) => setPax(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-stone-800 text-sm transition-all appearance-none bg-white"
                    >
                      <option value={1}>1 Orang</option>
                      <option value={2}>2 Orang</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang</option>
                    </select>
                    <Users className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Doa & Ucapan
              </label>
              <textarea
                id="message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan doa dan ucapan selamat untuk kedua mempelai..."
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-stone-800 text-sm transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-primary-800 hover:bg-primary-900 active:bg-primary-950 text-white font-medium text-xs tracking-widest uppercase rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Mengirim...' : 'Kirim Ucapan & Konfirmasi'}</span>
            </button>
          </form>

          {submitted && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Terima kasih! Ucapan dan konfirmasi kehadiran Anda telah tersimpan.</span>
            </div>
          )}
        </div>

        {/* Wishes Feed List */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-primary-700" />
            <h3 className="font-serif text-xl font-semibold text-primary-900">
              Doa & Ucapan ({wishes.length})
            </h3>
          </div>

          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white/90 border border-primary-100 shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-serif font-bold text-xs flex items-center justify-center">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-sm text-primary-950">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-stone-400">
                        {formatRelativeTime(item.created_at)}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium ${
                      item.status === 'hadir'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-stone-100 text-stone-600 border border-stone-200'
                    }`}
                  >
                    {item.status === 'hadir' ? 'Hadir' : 'Berhalangan'}
                  </span>
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed pl-10">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
