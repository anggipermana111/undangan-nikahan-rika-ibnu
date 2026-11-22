interface SectionTitleProps {
  kicker?: string;
  title: string;
  script?: string;
  tone?: 'dark' | 'light';
  as?: 'h1' | 'h2';
}

export default function SectionTitle({ kicker, title, script, tone = 'dark', as = 'h2' }: SectionTitleProps) {
  const Heading = as;
  const titleColor = tone === 'light' ? 'text-cream-50' : 'text-forest-900';
  const kickerColor = tone === 'light' ? 'text-cream-50/70' : 'text-sage-500';
  return (
    <div className="text-center">
      {kicker && (
        <p className={`mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.35em] ${kickerColor}`}>
          {kicker}
        </p>
      )}
      <Heading className={`font-display text-3xl uppercase tracking-wide ${titleColor}`}>{title}</Heading>
      {script && <p className="-mt-1 font-script text-4xl text-gold-500">{script}</p>}
    </div>
  );
}
