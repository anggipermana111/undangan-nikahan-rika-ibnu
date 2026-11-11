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
    <section id="gift" className="py-20 px-4 bg-white/70 text-center relative">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-primary-700 font-medium mb-3">
          Tanda Kasih
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary-900 mb-4">
          Wedding Gift
        </h2>
        <p className="text-sm text-stone-600 mb-12 leading-relaxed">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat menyampaikannya melalui:
        </p>

        {/* Bank Account Cards */}
        <div className="space-y-6 mb-12">
          {bankAccounts.map((account, index) => {
            const isCopied = copiedText === account.accountNumber;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-900 via-primary-800 to-stone-900 text-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-primary-950/15 text-left relative overflow-hidden"
              >
                {/* Decorative background circles */}
                <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
                <div className="absolute right-12 -bottom-16 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-champagne-DEFAULT" />
                    <span className="font-mono text-xs uppercase tracking-widest text-champagne-DEFAULT">
                      Cashless Gift
                    </span>
                  </div>
                  <span className="font-serif font-bold text-xl tracking-wider text-white">
                    {account.bankName}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-stone-300 uppercase tracking-widest mb-1">
                    Nomor Rekening
                  </p>
                  <p className="font-mono text-2xl sm:text-3xl tracking-widest font-semibold text-white">
                    {account.accountNumber}
                  </p>
                  <p className="text-sm text-stone-300 mt-1">
                    a.n {account.accountHolder}
                  </p>
                </div>

                <button
                  onClick={() => copy(account.accountNumber)}
                  aria-label="Salin Nomor Rekening"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-sm border border-white/20 text-white rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Berhasil Disalin!</span>
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
          <div className="bg-primary-50/70 border border-primary-200/80 rounded-2xl p-6 sm:p-7 text-left shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary-100 text-primary-800">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-primary-900">
                  Kirim Kado Fisik
                </h3>
                <p className="text-xs text-stone-500">
                  Alamat Pengiriman Hadiah Pernikahan
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-stone-700 mb-6">
              <p className="font-medium text-stone-900">
                Penerima: {giftAddress.recipientName} ({giftAddress.phoneNumber})
              </p>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-stone-600">
                  {giftAddress.fullAddress}
                </p>
              </div>
              {giftAddress.notes && (
                <p className="text-xs italic text-stone-500">
                  Catatan: {giftAddress.notes}
                </p>
              )}
            </div>

            <button
              onClick={() => copy(`${giftAddress.recipientName} (${giftAddress.phoneNumber})\n${giftAddress.fullAddress}`)}
              aria-label="Salin Alamat Kado"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-800 hover:bg-primary-900 active:bg-primary-950 text-white rounded-xl text-xs font-medium tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
            >
              {copiedText?.includes(giftAddress.recipientName) ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Alamat Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Alamat</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Global Toast Notification */}
        {copiedText && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-slide-up">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Teks berhasil disalin ke clipboard!</span>
          </div>
        )}
      </div>
    </section>
  );
}
