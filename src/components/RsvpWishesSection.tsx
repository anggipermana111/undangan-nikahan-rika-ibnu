'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, Users, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  supabase,
  isSupabaseConfigured,
  WishRecord,
  AttendanceStatus,
  WISH_NAME_MAX,
  WISH_MESSAGE_MAX,
  WISH_PAX_MAX,
} from '@/lib/supabase';

interface RsvpWishesSectionProps {
  guestName?: string;
}

const WISHES_LIMIT = 100;
// Short cooldown after a successful submit to discourage accidental double posts.
const SUBMIT_COOLDOWN_MS = 30_000;

function prependUnique(list: WishRecord[], wish: WishRecord): WishRecord[] {
  if (list.some((w) => w.id === wish.id)) return list;
  return [wish, ...list];
}

function formatRelativeTime(isoString: string) {
  const diffSeconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diffSeconds < 60) return 'Baru saja';
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} jam lalu`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} hari lalu`;
}

export default function RsvpWishesSection({ guestName }: RsvpWishesSectionProps) {
  const [name, setName] = useState((guestName || '').slice(0, WISH_NAME_MAX));
  const [status, setStatus] = useState<AttendanceStatus>('hadir');
  const [pax, setPax] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wishes, setWishes] = useState<WishRecord[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (guestName) setName(guestName.slice(0, WISH_NAME_MAX));
  }, [guestName]);

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    let cancelled = false;

    client
      .from('wishes')
      .select('id, name, message, status, pax, created_at')
      .order('created_at', { ascending: false })
      .limit(WISHES_LIMIT)
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) {
          console.error('Failed to load wishes:', fetchError);
        } else if (data) {
          setWishes(data as WishRecord[]);
        }
        setLoading(false);
      });

    const channel = client
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          setWishes((prev) => prependUnique(prev, payload.new as WishRecord));
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      client.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!cooldown) return;
    const t = setTimeout(() => setCooldown(false), SUBMIT_COOLDOWN_MS);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage || submitting || cooldown) return;

    setError(null);
    setSubmitted(false);

    const client = supabase;
    if (!client) {
      setError('Layanan ucapan sedang tidak tersedia. Silakan coba lagi nanti.');
      return;
    }

    setSubmitting(true);
    const { data, error: insertError } = await client
      .from('wishes')
      .insert({
        name: trimmedName,
        message: trimmedMessage,
        status,
        pax: status === 'hadir' ? pax : 0,
      })
      .select('id, name, message, status, pax, created_at')
      .single();
    setSubmitting(false);

    if (insertError || !data) {
      console.error('Failed to save wish:', insertError);
      setError('Maaf, ucapan gagal terkirim. Periksa koneksi internet Anda lalu coba lagi.');
      return;
    }

    setWishes((prev) => prependUnique(prev, data as WishRecord));
    setMessage('');
    setSubmitted(true);
    setCooldown(true);

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } catch {}
  };

  const buttonLabel = submitting
    ? 'Mengirim...'
    : cooldown
      ? 'Terima Kasih!'
      : 'Kirim Ucapan & Konfirmasi';

  return (
    <section id="rsvp" className="relative py-24 px-4 text-center overflow-hidden bg-transparent">
      <div className="relative max-w-3xl mx-auto z-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#3f5d4a] font-medium font-sans mb-2">
          Konfirmasi Kehadiran & Doa
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1e3325] mb-4">
          RSVP & Wishes
        </h2>
        <p className="text-sm text-stone-600 mb-14 max-w-md mx-auto font-sans leading-relaxed">
          Kehadiran dan doa restu Anda merupakan kehormatan dan kebahagiaan yang tak ternilai bagi kami.
        </p>

        {/* RSVP Form Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-[#cde0d5] shadow-xl shadow-[#1e3325]/5 text-left mb-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs font-sans font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                required
                maxLength={WISH_NAME_MAX}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#3b5945]/30 focus:border-[#3b5945] text-stone-800 text-sm font-sans transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-sans font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Konfirmasi Kehadiran
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus('hadir')}
                    aria-pressed={status === 'hadir'}
                    className={`py-3 px-3 rounded-2xl text-xs font-sans font-medium tracking-wider uppercase border transition-all cursor-pointer ${
                      status === 'hadir'
                        ? 'bg-[#2d4234] text-white border-[#2d4234] shadow-sm'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('tidak_hadir')}
                    aria-pressed={status === 'tidak_hadir'}
                    className={`py-3 px-3 rounded-2xl text-xs font-sans font-medium tracking-wider uppercase border transition-all cursor-pointer ${
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
                  <label htmlFor="pax" className="block text-xs font-sans font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Jumlah Tamu (Pax)
                  </label>
                  <div className="relative">
                    <select
                      id="pax"
                      value={pax}
                      onChange={(e) => setPax(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#3b5945]/30 focus:border-[#3b5945] text-stone-800 text-sm font-sans transition-all appearance-none bg-white"
                    >
                      {Array.from({ length: WISH_PAX_MAX }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} Orang</option>
                      ))}
                    </select>
                    <Users className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-sans font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Doa & Ucapan
              </label>
              <textarea
                id="message"
                required
                rows={3}
                maxLength={WISH_MESSAGE_MAX}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan doa dan ucapan selamat untuk Rika & Ibnu..."
                className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#3b5945]/30 focus:border-[#3b5945] text-stone-800 text-sm font-sans transition-all resize-none"
              />
              <p className="mt-1 text-right text-[10px] text-stone-400 font-sans">
                {message.length}/{WISH_MESSAGE_MAX}
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting || cooldown}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#2d4234] hover:bg-[#1e2f24] active:scale-95 text-white font-sans font-medium text-xs tracking-widest uppercase rounded-full shadow-lg shadow-[#2d4234]/20 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-emerald-200" />
              <span>{buttonLabel}</span>
            </button>
          </form>

          {submitted && (
            <div role="status" className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-sans animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Terima kasih! Ucapan dan konfirmasi kehadiran Anda telah berhasil tersimpan.</span>
            </div>
          )}

          {error && (
            <div role="alert" className="mt-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-800 text-xs font-sans animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Wishes Feed List */}
        <div className="text-left">
          <div className="flex items-center gap-2.5 mb-6">
            <MessageSquare className="w-5 h-5 text-[#2d4234]" />
            <h3 className="font-serif text-2xl font-semibold text-[#1e3325]">
              Doa & Ucapan ({wishes.length})
            </h3>
          </div>

          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
            {loading ? (
              <div className="py-8 px-6 text-center rounded-3xl bg-white/70 border border-[#d6e5dd] text-stone-500 font-sans text-sm">
                Memuat doa & ucapan...
              </div>
            ) : wishes.length === 0 ? (
              <div className="py-8 px-6 text-center rounded-3xl bg-white/70 border border-[#d6e5dd] text-stone-500 font-sans text-sm">
                Belum ada doa & ucapan. Jadilah yang pertama memberikan doa restu untuk kedua mempelai! ✨
              </div>
            ) : (
              wishes.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl bg-white/90 border border-[#d6e5dd] shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 shrink-0 rounded-full bg-[#edf4f0] text-[#2d4234] font-serif font-bold text-sm flex items-center justify-center border border-[#cbdcd2]">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif font-semibold text-base text-[#1c2e22] truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-stone-400 font-sans">
                          {formatRelativeTime(item.created_at)}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 text-[10px] uppercase font-sans tracking-wider px-3 py-1 rounded-full font-medium ${
                        item.status === 'hadir'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-stone-100 text-stone-600 border border-stone-200'
                      }`}
                    >
                      {item.status === 'hadir' ? 'Hadir' : 'Berhalangan'}
                    </span>
                  </div>

                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed pl-12 font-sans whitespace-pre-line break-words">
                    {item.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
