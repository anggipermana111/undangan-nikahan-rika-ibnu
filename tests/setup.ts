import '@testing-library/react';

// Setup basic global mocks for DOM if needed in JSDOM
if (typeof window !== 'undefined') {
  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  window.HTMLMediaElement.prototype.pause = () => {};
}

if (typeof document !== 'undefined') {
  document.execCommand = () => true;
}

