// ============================================================================
// AN FOCUS — Section Heading Component
// Editorial, oversized typography with optional label and subtitle.
// ============================================================================

import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  heading: string;
  subtitle?: string;
  label?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const alignmentMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export default function SectionHeading({
  heading,
  subtitle,
  label,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={cn('relative', alignmentMap[align], className)}>
      {/* Label / Number */}
      {label && (
        <span
          className={cn(
            'mb-4 inline-block font-mono text-xs uppercase tracking-[0.3em]',
            'text-[#A0A0A0]'
          )}
        >
          {label}
        </span>
      )}

      {/* Heading */}
      <h2
        className={cn(
          'whitespace-pre-line font-bold leading-[0.95] tracking-tight',
          'text-[#F5F5F5]',
          // Responsive sizing — editorial oversized
          'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
        )}
      >
        {heading}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl',
            'text-[#A0A0A0]',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
