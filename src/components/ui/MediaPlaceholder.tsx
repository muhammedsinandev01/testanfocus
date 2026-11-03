// ============================================================================
// AN FOCUS — Media Placeholder Component
// Elegant placeholder with abstract pattern for missing media assets.
// ============================================================================

import { cn } from '@/lib/cn';

interface MediaPlaceholderProps {
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:4';
  label?: string;
  className?: string;
}

const aspectRatioMap = {
  '16:9': 'aspect-video',        // 16/9
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '3:4': 'aspect-[3/4]',
} as const;

export default function MediaPlaceholder({
  aspectRatio = '16:9',
  label = 'Media placeholder',
  className,
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-sm',
        'bg-[#111111] border border-white/[0.12]',
        aspectRatioMap[aspectRatio],
        className
      )}
    >
      {/* Diagonal lines pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            rgba(255, 255, 255, 0.5) 8px,
            rgba(255, 255, 255, 0.5) 9px
          )`,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Corner accents */}
      <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-white/[0.12]" />
      <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-white/[0.12]" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-white/[0.12]" />
      <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-white/[0.12]" />

      {/* Label */}
      <span className="relative z-10 select-none font-mono text-[11px] uppercase tracking-[0.25em] text-[#A0A0A0]/60">
        {label}
      </span>
    </div>
  );
}
