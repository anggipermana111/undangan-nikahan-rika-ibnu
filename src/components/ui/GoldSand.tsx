interface GoldSandProps {
  className?: string;
}

export default function GoldSand({ className = '' }: GoldSandProps) {
  return (
    <img
      src="/themes/forest/gold-sand.webp"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full ${className}`}
    />
  );
}
