'use client';

import { useState, useCallback } from 'react';

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string) => {
    if (!text) return false;

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
      } else if (typeof document !== 'undefined') {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        if (typeof document.execCommand === 'function') {
          document.execCommand('copy');
        }
        document.body.removeChild(textArea);
      }
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 3000);
      return true;
    } catch (err) {
      console.warn('Copy to clipboard failed:', err);
      return false;
    }
  }, []);

  return { copiedText, copy };
}
