# AN FOCUS — Media Dropzone

This directory holds the media assets for the website. The frontend has been architected so you **never have to touch code** to replace media.

## Directory Structure

```text
/public/media/
├── hero/
│   ├── hero-reel.mp4           <- Primary hero background video
│   ├── hero-poster.jpg         <- Video poster frame
│   └── hero-fallback.jpg       <- Fallback image for low-bandwidth
├── events/
│   └── events-hero.jpg         <- Live Events chapter preview
├── production/
│   └── production-hero.jpg     <- Creative Production chapter preview
├── marketing/
│   └── marketing-hero.jpg      <- Digital Marketing chapter preview
├── technology/
│   └── technology-hero.jpg     <- Technology chapter preview
├── team/
│   ├── member-1.jpg            <- Team member 1 photo
│   ├── member-2.jpg            <- Team member 2 photo
│   └── ... up to member-8.jpg
└── work/
    ├── sample-event-01.jpg
    ├── sample-production-01.jpg
    ├── sample-marketing-01.jpg
    └── sample-technology-01.jpg
```

## How to replace media
1. Save your files with the exact names listed above in their respective folders.
2. If you prefer custom file names, simply update the paths in `src/config/media.ts`.
3. If no file is placed in a folder, the site automatically renders an elegant abstract architectural placeholder — ensuring the design never breaks or looks broken.

