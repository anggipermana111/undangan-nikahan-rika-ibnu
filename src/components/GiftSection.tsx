'use client';

import React from 'react';
import { Copy, Check, Gift, MapPin, Phone } from 'lucide-react';
import { BankAccount, GiftAddress } from '@/types/wedding';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface GiftSectionProps {
  bankAccounts: BankAccount[];
  giftAddress: GiftAddress;
}

function FadeUpDiv({ children, delay = '', className = '' }: { children: React.ReactNode; delay?: string; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
}

export default function GiftSection({ bankAccounts, giftAddress }: GiftSectionProps) {
  const { copiedText, copy } = useCopyToClipboard();

  return (
    <section id="gift" className="relative py-24 px-4 text-center overflow-hidden">
      {/* Gift background image */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('/themes/dreamy/gift-bg.webp')` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#1e3325]/65 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto z-10">
        {/* Header */}
        <FadeUpDiv>
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <Gift className="w-5 h-5 text-emerald-200" />
            </div>
          </div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-emerald-200 font-semibold font-sans mb-2">
            Tanda Kasih
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal mb-4">
            Wedding Gift
          </h2>
          <p className="text-sm text-stone-200 mb-14 leading-relaxed font-sans max-w-sm mx-auto">
            Doa restu Anda merupakan karunia terindah. Namun jika berkenan memberikan tanda kasih, dapat melalui:
          </p>
        </FadeUpDiv>

        {/* Bank Account Cards */}
        <div className="space-y-5 mb-10">
          {bankAccounts.map((account, index) => {
            const isCopied = copiedText === account.accountNumber;
            return (
              <FadeUpDiv key={index} delay={`fade-up-delay-${index + 1}`}>
                <div className="bg-white/15 backdrop-blur-md rounded-3xl p-7 border border-white/30 shadow-xl text-left relative overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
                  <div className="absolute right-20 -top-10 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-[9px] text-emerald-200 uppercase tracking-widest font-sans mb-0.5">Digital Transfer</p>
                      <p className="font-serif text-2xl font-bold text-white tracking-wide">
                        {account.bankName}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#2d4234] border border-emerald-700/50 flex items-center justify-center">
                      <span className="text-emerald-200 font-serif font-bold text-sm">{account.bankName.slice(0, 2)}</span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="text-[10px] text-stone-300 uppercase tracking-widest mb-1 font-sans">
                      Nomor Rekening
                    </p>
                    <p className="font-mono text-2xl sm:text-3xl tracking-wider font-bold text-white">
                      {account.accountNumber}
                    </p>
                    <p className="text-sm text-emerald-100/90 mt-1 font-sans">
                      a.n {account.accountHolder}
                    </p>
                  </div>

                  <button
                    onClick={() => copy(account.accountNumber)}
                    aria-label="Salin Nomor Rekening"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-md border border-white/30 text-white rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span className="text-emerald-200">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </FadeUpDiv>
            );
          })}
        </div>

        {/* Physical Gift Address */}
        {giftAddress && (
          <FadeUpDiv delay="fade-up-delay-3">
            <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-7 text-left shadow-xl">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="p-3 rounded-2xl bg-white/20 border border-white/20">
                  <Gift className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-white">
                    Kirim Kado Fisik
                  </h3>
                  <p className="text-xs text-stone-300 font-sans">
                    Alamat Pengiriman
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6 font-sans">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                  <p className="text-white font-semibold">
                    {giftAddress.recipientName}
                    <span className="text-emerald-200 ml-2">({giftAddress.phoneNumber})</span>
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <p className="text-stone-200 text-sm leading-relaxed">
                    {giftAddress.fullAddress}
                  </p>
                </div>
                {giftAddress.notes && (
                  <p className="text-xs italic text-stone-400 pl-6">{giftAddress.notes}</p>
                )}
              </div>

              <button
                onClick={() => copy(`${giftAddress.recipientName} (${giftAddress.phoneNumber})\n${giftAddress.fullAddress}`)}
                aria-label="Salin Alamat Kado"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all border border-white/30 cursor-pointer"
              >
                {copiedText?.includes(giftAddress.recipientName) ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Alamat Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Alamat</span>
                  </>
                )}
              </button>
            </div>
          </FadeUpDiv>
        )}

        {/* Copy toast */}
        {copiedText && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#1e2f24] text-white text-xs px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-slide-up border border-[#446250]">
            <Check className="w-4 h-4 text-emerald-300" />
            <span className="font-sans font-medium">Berhasil disalin!</span>
          </div>
        )}
      </div>
    </section>
  );
}
