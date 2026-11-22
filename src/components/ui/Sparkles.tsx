// Fixed positions so server and client render the same markup.
const DOTS = [
  { top: '8%', left: '12%', delay: '0s', size: 3 },
  { top: '15%', left: '78%', delay: '1.2s', size: 2 },
  { top: '24%', left: '40%', delay: '2.4s', size: 2 },
  { top: '33%', left: '88%', delay: '0.6s', size: 3 },
  { top: '42%', left: '6%', delay: '3s', size: 2 },
  { top: '50%', left: '60%', delay: '1.8s', size: 3 },
  { top: '58%', left: '25%', delay: '4.2s', size: 2 },
  { top: '66%', left: '82%', delay: '2.1s', size: 2 },
  { top: '74%', left: '48%', delay: '3.6s', size: 3 },
  { top: '82%', left: '15%', delay: '0.9s', size: 2 },
  { top: '88%', left: '70%', delay: '2.7s', size: 3 },
  { top: '94%', left: '35%', delay: '4.8s', size: 2 },
];

interface SparklesProps {
  count?: number;
}

export default function Sparkles({ count = 12 }: SparklesProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {DOTS.slice(0, Math.min(count, DOTS.length)).map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cream-50 animate-sparkle"
          style={{ top: d.top, left: d.left, width: d.size, height: d.size, animationDelay: d.delay }}
        />
      ))}
    </div>
  );
}
