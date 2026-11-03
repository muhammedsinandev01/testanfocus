'use client';

// ============================================================================
// AN FOCUS — Media Renderer Component
// Renders video or image based on MediaAsset config, with placeholder fallback.
// ============================================================================

import { useState, useCallback } from 'react';
import Image from 'next/image';
import type { MediaAsset } from '@/config/media';
import MediaPlaceholder from './MediaPlaceholder';
import { cn } from '@/lib/cn';

interface MediaRendererProps {
  media: MediaAsset;
  className?: string;
  priority?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:4';
}

export default function MediaRenderer({
  media,
  className,
  priority = false,
  aspectRatio = '16:9',
}: MediaRendererProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Fallback to placeholder on error or missing src
  if (hasError || !media.src) {
    return (
      <MediaPlaceholder
        aspectRatio={aspectRatio}
        label={media.alt || 'Media unavailable'}
        className={className}
      />
    );
  }

  // ── Video ──────────────────────────────────────────────────────────────
  if (media.type === 'video') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-sm bg-[#111111]',
          className
        )}
      >
        <video
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'none'}
          onError={handleError}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // ── Image ──────────────────────────────────────────────────────────────
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm bg-[#111111]',
        className
      )}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        onError={handleError}
        className="object-cover"
      />
    </div>
  );
}
