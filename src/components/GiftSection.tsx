'use client';

import React, { useState } from 'react';
import { Copy, Check, Gift } from 'lucide-react';
import { BankAccount, GiftAddress } from '@/types/wedding';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import Card from './ui/Card';
import Sparkles from './ui/Sparkles';
import FadeUp from './FadeUp';

interface GiftSectionProps {
  bankAccounts: BankAccount[];
  giftAddress: GiftAddress;
}

function CopyButton({ copied, onClick, label }: { copied: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-forest-900 px-4 py-2 font-sans text-xs font-semibold text-cream-50 transition-all hover:bg-forest-700 active:scale-95"
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      {copied ? 'Tersalin' : 'Copy'}
    </button>
  );
}

export default function GiftSection({ bankAccounts, giftAddress }: GiftSectionProps) {
  const [open, setOpen] = useState(false);
  const { copiedText, copy } = useCopyToClipboard();
  const addressText = `${giftAddress.recipientName} (${giftAddress.phoneNumber})\n${giftAddress.fullAddress}`;

  return (
    <section id="gift" className="relative overflow-hidden bg-forest-900 px-5 py-16">
      <Sparkles />
      <FadeUp className="relative z-10">
        <Card className="px-6 py-10 text-center">
          <img src="/themes/forest/sprig.webp" alt="" aria-hidden="true" className="mx-auto mb-3 w-10" />
          <h2 className="font-script text-4xl text-forest-900">Amplop Digital</h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-sage-500">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda
            kasih, Anda dapat memberi kado secara cashless.
          </p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="gift-details"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-2.5 font-sans text-xs font-semibold text-cream-50 shadow-md transition-all hover:bg-forest-700 active:scale-95"
          >
            <Gift className="h-4 w-4" aria-hidden="true" />
            Klik Disini
          </button>

          {open && (
            <div id="gift-details" className="mt-8 space-y-4 text-left animate-fade-in">
              {bankAccounts.map((account) => (
                <div key={account.accountNumber} className="rounded-2xl border border-cream-100 bg-white/60 p-5">
                  <p className="font-display text-lg text-forest-900">{account.bankName}</p>
                  <p className="mt-2 font-mono text-xl tracking-wider text-ink">{account.accountNumber}</p>
                  <p className="font-sans text-sm text-sage-500">a.n {account.accountHolder}</p>
                  <CopyButton
                    copied={copiedText === account.accountNumber}
                    onClick={() => copy(account.accountNumber)}
                    label="Salin Nomor Rekening"
                  />
                </div>
              ))}

              <div className="rounded-2xl border border-cream-100 bg-white/60 p-5 font-sans text-sm">
                <p className="font-display text-lg text-forest-900">Kirim Kado</p>
                <p className="mt-2 text-xs text-sage-500">Nama Penerima</p>
                <p className="text-ink">{giftAddress.recipientName}</p>
                <p className="mt-2 text-xs text-sage-500">No. HP</p>
                <p className="text-ink">{giftAddress.phoneNumber}</p>
                <p className="mt-2 text-xs text-sage-500">Alamat</p>
                <p className="leading-relaxed text-ink">{giftAddress.fullAddress}</p>
                {giftAddress.notes && <p className="mt-2 text-xs italic text-sage-500">{giftAddress.notes}</p>}
                <CopyButton copied={copiedText === addressText} onClick={() => copy(addressText)} label="Salin Alamat Kado" />
              </div>
            </div>
          )}
        </Card>
      </FadeUp>

      {copiedText && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-forest-900 px-6 py-3 font-sans text-xs text-cream-50 shadow-2xl animate-slide-up"
        >
          <Check className="h-4 w-4 text-gold-500" aria-hidden="true" />
          Berhasil disalin!
        </div>
      )}
    </section>
  );
}
