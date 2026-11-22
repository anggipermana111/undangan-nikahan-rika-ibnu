'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Users, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './ui/Card';
import Sparkles from './ui/Sparkles';
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
export const WISHES_PAGE_SIZE = 5;

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
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(wishes.length / WISHES_PAGE_SIZE));
  // Clamp so a shrinking list never leaves us past the last page
  const currentPage = Math.min(page, totalPages - 1);
  const visibleWishes = wishes.slice(currentPage * WISHES_PAGE_SIZE, (currentPage + 1) * WISHES_PAGE_SIZE);

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
    setPage(0);
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

  const label = 'mb-2 block font-sans text-xs font-semibold text-ink';
  const field =
    'w-full rounded-xl border border-cream-100 bg-white px-4 py-3 font-sans text-sm text-ink focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-700/20';

  return (
    <section id="rsvp" className="relative overflow-hidden bg-forest-900 px-5 py-16">
      <Sparkles />
      <div className="relative z-10">
        <Card className="px-6 py-10">
          <img src="/themes/forest/sprig.webp" alt="" aria-hidden="true" className="mx-auto mb-3 w-10" />
          <h2 className="text-center font-script text-4xl text-forest-900">Ucapkan Sesuatu</h2>
          <p className="mt-2 text-center font-sans text-xs text-sage-500">
            Konfirmasi kehadiran dan kirimkan doa terbaik untuk kedua mempelai.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className={label}>Nama Lengkap</label>
              <input
                id="name"
                type="text"
                required
                maxLength={WISH_NAME_MAX}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className={field}
              />
            </div>

            <div>
              <label htmlFor="message" className={label}>Doa &amp; Ucapan</label>
              <textarea
                id="message"
                required
                rows={4}
                maxLength={WISH_MESSAGE_MAX}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Berikan ucapan & doa untuk Rika & Ibnu"
                className={`${field} resize-none`}
              />
              <p className="mt-1 text-right font-sans text-[10px] text-sage-500">
                {message.length}/{WISH_MESSAGE_MAX}
              </p>
            </div>

            <div>
              <span className={label}>Konfirmasi Kehadiran</span>
              <div className="grid grid-cols-2 gap-2">
                {(['hadir', 'tidak_hadir'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    aria-pressed={status === s}
                    className={`rounded-xl border py-2.5 font-sans text-xs font-semibold transition-all ${
                      status === s
                        ? 'border-forest-900 bg-forest-900 text-cream-50'
                        : 'border-cream-100 bg-white text-sage-500 hover:border-forest-700'
                    }`}
                  >
                    {s === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                  </button>
                ))}
              </div>
            </div>

            {status === 'hadir' && (
              <div>
                <label htmlFor="pax" className={label}>Jumlah Tamu</label>
                <div className="relative">
                  <select
                    id="pax"
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value))}
                    className={`${field} appearance-none`}
                  >
                    {Array.from({ length: WISH_PAX_MAX }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} Orang</option>
                    ))}
                  </select>
                  <Users className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sage-500" aria-hidden="true" />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || cooldown}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest-900 py-3 font-sans text-sm font-semibold text-cream-50 shadow-md transition-all hover:bg-forest-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {buttonLabel}
            </button>
          </form>

          {submitted && (
            <div role="status" className="mt-5 flex items-center gap-3 rounded-xl border border-forest-700/30 bg-forest-900/5 p-4 font-sans text-xs text-forest-900 animate-fade-in">
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Terima kasih! Ucapan dan konfirmasi kehadiran Anda telah berhasil tersimpan.</span>
            </div>
          )}

          {error && (
            <div role="alert" className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 font-sans text-xs text-red-800 animate-fade-in">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-10 border-t border-cream-100 pt-6">
            <h3 className="font-display text-sm uppercase tracking-wider text-forest-900">
              Doa &amp; Ucapan ({wishes.length})
            </h3>

            <div className="mt-4 space-y-5">
              {loading ? (
                <p className="py-6 text-center font-sans text-sm text-sage-500">Memuat doa &amp; ucapan...</p>
              ) : wishes.length === 0 ? (
                <p className="py-6 text-center font-sans text-sm text-sage-500">
                  Belum ada doa &amp; ucapan. Jadilah yang pertama memberikan doa restu untuk kedua mempelai!
                </p>
              ) : (
                visibleWishes.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-900 font-display text-sm text-cream-50">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="truncate font-sans text-sm font-semibold text-ink">{item.name}</h4>
                        <span className="font-sans text-[10px] text-gold-500">
                          • {item.status === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                      </div>
                      <span className="font-sans text-[10px] text-sage-500">{formatRelativeTime(item.created_at)}</span>
                      <p className="mt-1 whitespace-pre-line break-words font-sans text-sm leading-relaxed text-ink">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!loading && totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4 font-sans text-sm text-ink">
                <button
                  type="button"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  aria-label="Halaman sebelumnya"
                  className="rounded-full p-1.5 hover:bg-cream-100 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <span>{currentPage + 1} / {totalPages}</span>
                <button
                  type="button"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="Halaman berikutnya"
                  className="rounded-full p-1.5 hover:bg-cream-100 disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
