'use client';

import React from 'react';
import { CreditCard, Copy, Check, Gift, MapPin } from 'lucide-react';
import { BankAccount, GiftAddress } from '@/types/wedding';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface GiftSectionProps {
  bankAccounts: BankAccount[];
  giftAddress: GiftAddress;
}

export default function GiftSection({ bankAccounts, giftAddress }: GiftSectionProps) {
  const { copiedText, copy } = useCopyToClipboard();

  return (
    <section id="gift" className="relative py-24 px-4 bg-[#f8faf9] text-center overflow-hidden">
      {/* Soft Sky & Floral Illustration Accent */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{ backgroundImage: `url('/themes/dreamy/gift-bg.webp')` }}
      />

      <div className="relative max-w-2xl mx-auto z-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#3f5d4a] font-medium font-sans mb-2">
          Tanda Kasih
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1e3325] mb-4">
          Wedding Gift
        </h2>
        <p className="text-sm text-stone-600 mb-14 leading-relaxed font-sans max-w-md mx-auto">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, dapat melalui:
        </p>

        {/* Bank Account Cards */}
        <div className="space-y-6 mb-12">
          {bankAccounts.map((account, index) => {
            const isCopied = copiedText === account.accountNumber;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-[#263b2e] via-[#31483a] to-[#1e2f24] text-white rounded-3xl p-7 shadow-xl shadow-[#1e3325]/15 text-left relative overflow-hidden border border-[#526f5d]/40"
              >
                {/* Decorative subtle watermarks */}
                <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
                <div className="absolute right-16 -top-10 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-300" />
                    <span className="font-mono text-xs uppercase tracking-widest text-emerald-200">
                      Cashless Gift
                    </span>
                  </div>
                  <span className="font-serif font-bold text-2xl tracking-wider text-white">
                    {account.bankName}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-[11px] text-stone-300 uppercase tracking-widest mb-1.5 font-sans">
                    Nomor Rekening
                  </p>
                  <p className="font-mono text-2xl sm:text-3xl tracking-widest font-semibold text-white">
                    {account.accountNumber}
                  </p>
                  <p className="text-sm text-emerald-100/90 mt-1.5 font-sans">
                    a.n {account.accountHolder}
                  </p>
                </div>

                <button
                  onClick={() => copy(account.accountNumber)}
                  aria-label="Salin Nomor Rekening"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md border border-white/25 text-white rounded-full text-xs font-sans font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span className="text-emerald-200 font-semibold">Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-300" />
                      <span>Salin Rekening</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Physical Gift Card */}
        {giftAddress && (
          <div className="bg-white/85 backdrop-blur-md border border-[#cde0d5] rounded-3xl p-7 text-left shadow-lg shadow-[#1e3325]/5">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="p-3 rounded-2xl bg-[#edf4f0] text-[#2d4234]">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#1e3325]">
                  Kirim Kado Fisik
                </h3>
                <p className="text-xs text-stone-500 font-sans">
                  Alamat Pengiriman Hadiah Pernikahan
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-stone-700 mb-6 font-sans">
              <p className="font-semibold text-[#1e3325]">
                Penerima: {giftAddress.recipientName} ({giftAddress.phoneNumber})
              </p>
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#3b5945] shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-stone-600">
                  {giftAddress.fullAddress}
                </p>
              </div>
              {giftAddress.notes && (
                <p className="text-xs italic text-stone-500 pt-1">
                  Catatan: {giftAddress.notes}
                </p>
              )}
            </div>

            <button
              onClick={() => copy(`${giftAddress.recipientName} (${giftAddress.phoneNumber})\n${giftAddress.fullAddress}`)}
              aria-label="Salin Alamat Kado"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2d4234] hover:bg-[#1e2f24] active:scale-95 text-white rounded-full text-xs font-sans font-medium tracking-wider uppercase transition-all shadow-md cursor-pointer"
            >
              {copiedText?.includes(giftAddress.recipientName) ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Alamat Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-300" />
                  <span>Salin Alamat</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Floating Toast Notification */}
        {copiedText && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#1e2f24] text-white text-xs px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-slide-up border border-[#446250]">
            <Check className="w-4 h-4 text-emerald-300" />
            <span className="font-sans font-medium">Teks berhasil disalin ke clipboard!</span>
          </div>
        )}
      </div>
    </section>
  );
}
