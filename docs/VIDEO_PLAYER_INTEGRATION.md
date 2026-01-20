# Video Player Integration Guide

This guide covers how to integrate the VidFast video player into your movie and TV show detail pages.

## Overview

The video player uses an iframe-based embed system from VidFast that provides streaming capabilities for movies and TV shows. The player automatically handles video quality, subtitles, and playback controls.

## Basic Implementation

### Simple Iframe Embed

```html
<iframe
  src="https://vidfast.pro/movie/533535"
  width="100%"
  height="100%"
  frameborder="0"
  allowfullscreen
  allow="encrypted-media"
></iframe>
```

Replace `533535` with the actual TMDB movie ID.

## Responsive Implementation

### HTML with Inline Styles (16:9 Aspect Ratio)

```html
<!-- 16:9 Aspect Ratio Container -->
<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe
    src="https://vidfast.pro/movie/533535"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0"
    allowfullscreen
    allow="encrypted-media"
  ></iframe>
</div>
```

### React/Next.js with Tailwind CSS

```tsx
<div className="relative w-full pt-[56.25%]">
  <iframe
    src="https://vidfast.pro/movie/533535"
    className="absolute top-0 left-0 w-full h-full"
    frameBorder="0"
    allowFullScreen
    allow="encrypted-media"
  ></iframe>
</div>
```

## Component Implementation

### Basic Movie Player Component

Create a simple reusable component for movie playback:

```tsx
// src/components/MoviePlayer.tsx
interface MoviePlayerProps {
  movieId: number;
  className?: string;
}

export default function MoviePlayer({ movieId, className = '' }: MoviePlayerProps) {
  return (
    <div className={`relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={`https://vidfast.pro/movie/${movieId}`}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="encrypted-media"
        title={`Movie Player - ${movieId}`}
      ></iframe>
    </div>
  );
}
```

### Basic TV Show Player Component

For TV shows, you'll need to handle seasons and episodes:

```tsx
// src/components/TVPlayer.tsx
interface TVPlayerProps {
  showId: number;
  season: number;
  episode: number;
  className?: string;
}

export default function TVPlayer({ 
  showId, 
  season, 
  episode, 
  className = '' 
}: TVPlayerProps) {
  return (
    <div className={`relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={`https://vidfast.pro/tv/${showId}/${season}/${episode}`}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="encrypted-media"
        title={`TV Player - S${season}E${episode}`}
      ></iframe>
    </div>
  );
}
```

## Integration with Detail Pages

### Movie Detail Page

```tsx
// src/app/movie/[id]/page.tsx
import MoviePlayer from '@/components/MoviePlayer';

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movieId = parseInt(params.id);
  
  // Fetch movie details from TMDB
  const movie = await getMovieDetails(movieId);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{movie.title}</h1>
      
      {/* Video Player */}
      <MoviePlayer movieId={movieId} className="mb-8" />
      
      {/* Movie Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add your movie details here */}
      </div>
    </div>
  );
}
```

### TV Show Detail Page

```tsx
// src/app/tv/[id]/page.tsx
import { useState } from 'react';
import TVPlayer from '@/components/TVPlayer';

export default function TVShowDetailPage({ params }: { params: { id: string } }) {
  const showId = parseInt(params.id);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Video Player */}
      <TVPlayer 
        showId={showId} 
        season={selectedSeason} 
        episode={selectedEpisode}
        className="mb-8" 
      />
      
      {/* Season/Episode Selector */}
      <div className="mb-8">
        {/* Add season and episode selection UI */}
      </div>
    </div>
  );
}
```

## URL Patterns

### Movies
```
https://vidfast.pro/movie/{tmdb_id}
```

### TV Shows
```
https://vidfast.pro/tv/{tmdb_id}/{season}/{episode}
```

## Theme Customization

Customize the player's appearance by adding the `theme` parameter with a hex color code (without the `#`).

### Available Themes

**Green Theme**
```tsx
<iframe
  src="https://vidfast.pro/movie/533535?theme=16A085"
  className="absolute top-0 left-0 w-full h-full"
  frameBorder="0"
  allowFullScreen
  allow="encrypted-media"
></iframe>
```
Color: `#16A085`

**Blue Theme**
```tsx
<iframe
  src="https://vidfast.pro/movie/533535?theme=2980B9"
  className="absolute top-0 left-0 w-full h-full"
  frameBorder="0"
  allowFullScreen
  allow="encrypted-media"
></iframe>
```
Color: `#2980B9`

**Purple Theme**
```tsx
<iframe
  src="https://vidfast.pro/movie/533535?theme=9B59B6"
  className="absolute top-0 left-0 w-full h-full"
  frameBorder="0"
  allowFullScreen
  allow="encrypted-media"
></iframe>
```
Color: `#9B59B6`

### Custom Theme Component

```tsx
// src/components/MoviePlayer.tsx
interface MoviePlayerProps {
  movieId: number;
  theme?: string; // Hex color without #
  className?: string;
}

export default function MoviePlayer({ 
  movieId, 
  theme = '2980B9', 
  className = '' 
}: MoviePlayerProps) {
  const playerUrl = `https://vidfast.pro/movie/${movieId}?theme=${theme}`;
  
  return (
    <div className={`relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={playerUrl}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="encrypted-media"
        title={`Movie Player - ${movieId}`}
      ></iframe>
    </div>
  );
}
```

## Advanced Features

### Query Parameters

The player supports multiple query parameters for enhanced functionality:

| Parameter | Type | Description | Movies | TV Shows |
|-----------|------|-------------|--------|----------|
| `theme` | string | Hex color code (without #) | ✓ | ✓ |
| `autoPlay` | boolean | Auto-start playback | ✓ | ✓ |
| `startTime` | number | Start at specific time (seconds) | ✓ | ✓ |
| `poster` | boolean | Show poster image | ✓ | ✓ |
| `title` | boolean | Show title overlay | ✓ | ✓ |
| `nextButton` | boolean | Show next episode button | ✗ | ✓ |
| `autoNext` | boolean | Auto-play next episode | ✗ | ✓ |

### Complete Feature Example (TV Show)

```tsx
<iframe
  src="https://vidfast.pro/tv/tt4052886/1/5?autoPlay=true&title=true&poster=true&theme=16A085&nextButton=true&autoNext=true"
  width="100%"
  height="100%"
  frameBorder="0"
  allowFullScreen
  allow="encrypted-media"
></iframe>
```

### Advanced TV Player Component

```tsx
// src/components/TVPlayer.tsx
interface TVPlayerProps {
  showId: number;
  season: number;
  episode: number;
  theme?: string;
  autoPlay?: boolean;
  autoNext?: boolean;
  showTitle?: boolean;
  showPoster?: boolean;
  showNextButton?: boolean;
  startTime?: number;
  className?: string;
}

export default function TVPlayer({ 
  showId, 
  season, 
  episode,
  theme = '2980B9',
  autoPlay = false,
  autoNext = true,
  showTitle = true,
  showPoster = true,
  showNextButton = true,
  startTime,
  className = '' 
}: TVPlayerProps) {
  const params = new URLSearchParams({
    theme,
    autoPlay: autoPlay.toString(),
    title: showTitle.toString(),
    poster: showPoster.toString(),
    nextButton: showNextButton.toString(),
    autoNext: autoNext.toString(),
  });
  
  if (startTime) {
    params.append('startTime', startTime.toString());
  }
  
  const playerUrl = `https://vidfast.pro/tv/${showId}/${season}/${episode}?${params.toString()}`;
  
  return (
    <div className={`relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={playerUrl}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="encrypted-media"
        title={`TV Player - S${season}E${episode}`}
      ></iframe>
    </div>
  );
}
```

### Advanced Movie Player Component

```tsx
// src/components/MoviePlayer.tsx
interface MoviePlayerProps {
  movieId: number;
  theme?: string;
  autoPlay?: boolean;
  showTitle?: boolean;
  showPoster?: boolean;
  startTime?: number;
  className?: string;
}

export default function MoviePlayer({ 
  movieId,
  theme = '2980B9',
  autoPlay = false,
  showTitle = true,
  showPoster = true,
  startTime,
  className = '' 
}: MoviePlayerProps) {
  const params = new URLSearchParams({
    theme,
    autoPlay: autoPlay.toString(),
    title: showTitle.toString(),
    poster: showPoster.toString(),
  });
  
  if (startTime) {
    params.append('startTime', startTime.toString());
  }
  
  const playerUrl = `https://vidfast.pro/movie/${movieId}?${params.toString()}`;
  
  return (
    <div className={`relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={playerUrl}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="encrypted-media"
        title={`Movie Player - ${movieId}`}
      ></iframe>
    </div>
  );
}
```

### Usage Examples

**Movie with custom theme and autoplay:**
```tsx
<MoviePlayer 
  movieId={533535} 
  theme="16A085" 
  autoPlay={true}
/>
```

**TV show with all features enabled:**
```tsx
<TVPlayer 
  showId={4052886}
  season={1}
  episode={5}
  theme="9B59B6"
  autoPlay={true}
  autoNext={true}
  showNextButton={true}
/>
```

**Resume playback from specific time:**
```tsx
<MoviePlayer 
  movieId={533535}
  startTime={300} // Start at 5 minutes
/>
```

## Watch Progress Tracking

The player can send watch progress events to the parent window, allowing you to save progress to localStorage or your backend.

### Available Events

| Event | Description |
|-------|-------------|
| `play` | Triggered when video starts playing |
| `pause` | Triggered when video is paused |
| `seeked` | Triggered when user seeks to a different timestamp |
| `ended` | Triggered when video playback ends |
| `timeupdate` | Triggered periodically during playback |
| `playerstatus` | Triggered when getStatus is called |

### Event Data Structure

```typescript
interface PlayerEvent {
  type: "PLAYER_EVENT";
  data: {
    event: "play" | "pause" | "seeked" | "ended" | "timeupdate" | "playerstatus";
    currentTime: number;
    duration: number;
    tmdbId: number;
    mediaType: "movie" | "tv";
    season?: number;
    episode?: number;
    playing: boolean;
    muted: boolean;
    volume: number;
  };
}
```

### Basic Event Listener Implementation

Add this script where your iframe is located. For React/Next.js, place it in a `useEffect` hook.

```javascript
const vidfastOrigins = [
  'https://vidfast.pro',
  'https://vidfast.in',
  'https://vidfast.io',
  'https://vidfast.me',
  'https://vidfast.net',
  'https://vidfast.pm',
  'https://vidfast.xyz'
];

window.addEventListener('message', ({ origin, data }) => {
  if (!vidfastOrigins.includes(origin) || !data) {
    return;
  }

  if (data.type === 'PLAYER_EVENT') {
    const { event, currentTime, duration } = data.data;
    
    console.log(`Player ${event} at ${currentTime}s of ${duration}s`);
    
    // Add custom event handling logic here
  }
});
```

### Direct Media Data Event Listener

This simpler event listener directly captures and stores the complete media data structure:

```javascript
const vidfastOrigins = [
  'https://vidfast.pro',
  'https://vidfast.in',
  'https://vidfast.io',
  'https://vidfast.me',
  'https://vidfast.net',
  'https://vidfast.pm',
  'https://vidfast.xyz'
];

window.addEventListener('message', ({ origin, data }) => {
  if (!vidfastOrigins.includes(origin) || !data) {
    return;
  }

  if (data.type === 'MEDIA_DATA') {
    localStorage.setItem('vidFastProgress', JSON.stringify(data.data));
  }
});
```

### Stored Data Structure

The data is stored in localStorage and contains movie/show details, watch progress, and episode-specific progress for TV shows.

```json
{
  "t63174": {
    "id": 63174,
    "type": "tv",
    "title": "Lucifer",
    "poster_path": "/ekZobS8isE6mA53RAiGDG93hBxL.jpg",
    "backdrop_path": "/wbiPjTWpZMIB8ffBq7HvzAph4Ft.jpg",
    "progress": {
      "watched": 793.207692,
      "duration": 2695.3689
    },
    "last_season_watched": 1,
    "last_episode_watched": 1,
    "show_progress": {
      "s1e1": {
        "season": 1,
        "episode": 1,
        "progress": {
          "watched": 793.207692,
          "duration": 2695.3689
        },
        "last_updated": 1742578021768
      }
    },
    "last_updated": 1742578021768
  },
  "m533535": {
    "id": 533535,
    "type": "movie",
    "title": "Deadpool & Wolverine",
    "poster_path": "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    "backdrop_path": "/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
    "progress": {
      "watched": 353.530349,
      "duration": 7667.227
    },
    "last_updated": 1742577064433
  }
}
```

### React/Next.js Implementation

#### Progress Tracking Hook

```tsx
// src/hooks/usePlayerProgress.ts
import { useEffect } from 'react';

interface PlayerEventData {
  event: string;
  currentTime: number;
  duration: number;
  tmdbId: number;
  mediaType: 'movie' | 'tv';
  season?: number;
  episode?: number;
  playing: boolean;
  muted: boolean;
  volume: number;
}

const VIDFAST_ORIGINS = [
  'https://vidfast.pro',
  'https://vidfast.in',
  'https://vidfast.io',
  'https://vidfast.me',
  'https://vidfast.net',
  'https://vidfast.pm',
  'https://vidfast.xyz'
];

export function usePlayerProgress(
  onProgress?: (data: PlayerEventData) => void
) {
  useEffect(() => {
    const handleMessage = ({ origin, data }: MessageEvent) => {
      if (!VIDFAST_ORIGINS.includes(origin) || !data) {
        return;
      }

      if (data.type === 'PLAYER_EVENT') {
        const eventData = data.data as PlayerEventData;
        
        // Save to localStorage
        const storageKey = `progress_${eventData.mediaType}_${eventData.tmdbId}`;
        localStorage.setItem(storageKey, JSON.stringify({
          currentTime: eventData.currentTime,
          duration: eventData.duration,
          lastUpdated: Date.now()
        }));

        // Call custom handler
        onProgress?.(eventData);
      }

      if (data.type === 'MEDIA_DATA') {
        localStorage.setItem('vidFastProgress', JSON.stringify(data.data));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onProgress]);
}
```

#### Movie Player with Progress Tracking

```tsx
// src/components/MoviePlayer.tsx
'use client';

import { usePlayerProgress } from '@/hooks/usePlayerProgress';

interface MoviePlayerProps {
  movieId: number;
  theme?: string;
  autoPlay?: boolean;
  className?: string;
}

export default function MoviePlayer({ 
  movieId,
  theme = '2980B9',
  autoPlay = false,
  className = '' 
}: MoviePlayerProps) {
  usePlayerProgress((data) => {
    console.log('Movie progress:', data);
    
    // Optional: Send to backend
    // await fetch('/api/progress', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
  });

  const params = new URLSearchParams({
    theme,
    autoPlay: autoPlay.toString(),
  });

  const playerUrl = `https://vidfast.pro/movie/${movieId}?${params.toString()}`;

  return (
    <div className={`relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={playerUrl}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="encrypted-media"
        title={`Movie Player - ${movieId}`}
      ></iframe>
    </div>
  );
}
```

#### TV Player with Progress Tracking

```tsx
// src/components/TVPlayer.tsx
'use client';

import { usePlayerProgress } from '@/hooks/usePlayerProgress';

interface TVPlayerProps {
  showId: number;
  season: number;
  episode: number;
  theme?: string;
  autoPlay?: boolean;
  autoNext?: boolean;
  className?: string;
}

export default function TVPlayer({ 
  showId,
  season,
  episode,
  theme = '2980B9',
  autoPlay = false,
  autoNext = true,
  className = '' 
}: TVPlayerProps) {
  usePlayerProgress((data) => {
    console.log('TV show progress:', data);
    
    // Track episode completion
    if (data.event === 'ended') {
      console.log(`Completed S${season}E${episode}`);
    }
  });

  const params = new URLSearchParams({
    theme,
    autoPlay: autoPlay.toString(),
    autoNext: autoNext.toString(),
  });

  const playerUrl = `https://vidfast.pro/tv/${showId}/${season}/${episode}?${params.toString()}`;

  return (
    <div className={`relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={playerUrl}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="encrypted-media"
        title={`TV Player - S${season}E${episode}`}
      ></iframe>
    </div>
  );
}
```

### Backend Integration Example

#### API Route for Saving Progress

```tsx
// src/app/api/progress/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate data
    if (!data.tmdbId || !data.currentTime) {
      return NextResponse.json(
        { error: 'Invalid progress data' },
        { status: 400 }
      );
    }

    // Save to your database
    // await db.watchProgress.upsert({
    //   where: { userId_tmdbId: { userId: session.user.id, tmdbId: data.tmdbId } },
    //   update: { currentTime: data.currentTime, duration: data.duration },
    //   create: { userId: session.user.id, ...data }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving progress:', error);
    return NextResponse.json(
      { error: 'Failed to save progress' },
      { status: 500 }
    );
  }
}
```

### Retrieving Saved Progress

```typescript
// Get progress from localStorage
function getWatchProgress(tmdbId: number, mediaType: 'movie' | 'tv') {
  const storageKey = `progress_${mediaType}_${tmdbId}`;
  const stored = localStorage.getItem(storageKey);
  
  if (stored) {
    return JSON.parse(stored);
  }
  
  return null;
}

// Resume playback from saved progress
const savedProgress = getWatchProgress(533535, 'movie');
if (savedProgress) {
  // Use startTime parameter to resume
  const resumeTime = Math.floor(savedProgress.currentTime);
  // Add to player URL: ?startTime=${resumeTime}
}
```

### Progress Percentage Calculation

```typescript
function calculateProgress(watched: number, duration: number): number {
  if (!duration) return 0;
  return Math.min(Math.round((watched / duration) * 100), 100);
}

// Usage
const progress = calculateProgress(353.530349, 7667.227);
console.log(`${progress}% watched`); // "5% watched"
```

## Styling Options

### Full-Width Player

```tsx
<div className="w-full max-w-7xl mx-auto">
  <MoviePlayer movieId={movieId} />
</div>
```

### With Shadow and Border

```tsx
<div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
  <iframe
    src={`https://vidfast.pro/movie/${movieId}`}
    className="absolute top-0 left-0 w-full h-full"
    frameBorder="0"
    allowFullScreen
    allow="encrypted-media"
  ></iframe>
</div>
```

### Different Aspect Ratios

**21:9 (Ultrawide)**
```tsx
<div className="relative w-full pt-[42.86%]">
  {/* iframe */}
</div>
```

**4:3 (Classic)**
```tsx
<div className="relative w-full pt-[75%]">
  {/* iframe */}
</div>
```

## Programmatic Player Control

Control VidFast players programmatically using the PostMessage API. Perfect for watch party features and custom player integrations.

### Available Commands

#### play
Resume video playback

```javascript
iframe.contentWindow.postMessage({
  command: 'play'
}, '*');
```

#### pause
Pause video playback

```javascript
iframe.contentWindow.postMessage({
  command: 'pause'
}, '*');
```

#### seek
Jump to specific time in video (seconds)

```javascript
iframe.contentWindow.postMessage({
  command: 'seek',
  time: 120  // Jump to 2 minutes
}, '*');
```

#### volume
Set player volume (0.0 to 1.0)

```javascript
iframe.contentWindow.postMessage({
  command: 'volume',
  level: 0.5  // Set to 50% volume
}, '*');
```

#### mute
Toggle mute state

```javascript
iframe.contentWindow.postMessage({
  command: 'mute',
  muted: true  // true to mute, false to unmute
}, '*');
```

#### getStatus
Get current player status

```javascript
iframe.contentWindow.postMessage({
  command: 'getStatus'
}, '*');

// Listen for response
window.addEventListener('message', ({ data }) => {
  if (data.type === 'PLAYER_EVENT' && data.data.event === 'playerstatus') {
    console.log('Current time:', data.data.currentTime);
    console.log('Duration:', data.data.duration);
    console.log('Is playing:', data.data.playing);
    console.log('Is muted:', data.data.muted);
    console.log('Volume:', data.data.volume);
  }
});
```

### React/Next.js Player Control Hook

```tsx
// src/hooks/usePlayerControl.ts
import { useRef, useCallback } from 'react';

interface PlayerControlCommands {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (level: number) => void;
  mute: (muted: boolean) => void;
  getStatus: () => void;
}

export function usePlayerControl(): [
  React.RefObject<HTMLIFrameElement>,
  PlayerControlCommands
] {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendCommand = useCallback((command: any) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(command, '*');
    }
  }, []);

  const commands: PlayerControlCommands = {
    play: useCallback(() => {
      sendCommand({ command: 'play' });
    }, [sendCommand]),

    pause: useCallback(() => {
      sendCommand({ command: 'pause' });
    }, [sendCommand]),

    seek: useCallback((time: number) => {
      sendCommand({ command: 'seek', time });
    }, [sendCommand]),

    setVolume: useCallback((level: number) => {
      sendCommand({ command: 'volume', level });
    }, [sendCommand]),

    mute: useCallback((muted: boolean) => {
      sendCommand({ command: 'mute', muted });
    }, [sendCommand]),

    getStatus: useCallback(() => {
      sendCommand({ command: 'getStatus' });
    }, [sendCommand]),
  };

  return [iframeRef, commands];
}
```

### Controlled Movie Player Component

```tsx
// src/components/ControlledMoviePlayer.tsx
'use client';

import { usePlayerControl } from '@/hooks/usePlayerControl';
import { usePlayerProgress } from '@/hooks/usePlayerProgress';

interface ControlledMoviePlayerProps {
  movieId: number;
  theme?: string;
  className?: string;
  onPlayerReady?: (controls: any) => void;
}

export default function ControlledMoviePlayer({ 
  movieId,
  theme = '2980B9',
  className = '',
  onPlayerReady
}: ControlledMoviePlayerProps) {
  const [iframeRef, controls] = usePlayerControl();

  usePlayerProgress((data) => {
    console.log('Player event:', data.event, data.currentTime);
  });

  // Expose controls to parent component
  React.useEffect(() => {
    if (onPlayerReady) {
      onPlayerReady(controls);
    }
  }, [controls, onPlayerReady]);

  const playerUrl = `https://vidfast.pro/movie/${movieId}?theme=${theme}`;

  return (
    <div className={`relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        ref={iframeRef}
        src={playerUrl}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="encrypted-media"
        title={`Movie Player - ${movieId}`}
      ></iframe>
    </div>
  );
}
```

### Custom Player Controls Example

```tsx
// Usage example with custom controls
'use client';

import { useState } from 'react';
import ControlledMoviePlayer from '@/components/ControlledMoviePlayer';

export default function MovieWithControls() {
  const [playerControls, setPlayerControls] = useState<any>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div>
      <ControlledMoviePlayer
        movieId={533535}
        onPlayerReady={setPlayerControls}
      />

      {/* Custom Controls */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => playerControls?.play()}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Play
        </button>
        
        <button
          onClick={() => playerControls?.pause()}
          className="px-4 py-2 bg-red-600 rounded"
        >
          Pause
        </button>
        
        <button
          onClick={() => playerControls?.seek(300)}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Skip to 5:00
        </button>
        
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            playerControls?.mute(!isMuted);
          }}
          className="px-4 py-2 bg-gray-600 rounded"
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => {
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
            playerControls?.setVolume(newVolume);
          }}
          className="w-32"
        />
        
        <button
          onClick={() => playerControls?.getStatus()}
          className="px-4 py-2 bg-purple-600 rounded"
        >
          Get Status
        </button>
      </div>
    </div>
  );
}
```

## Watch Party Integration

Perfect for synchronizing video playback across multiple users in a watch party scenario.

### Watch Party Controller Class

```typescript
// src/lib/WatchPartyController.ts
interface PartyCommand {
  action: 'play' | 'pause' | 'seek';
  time?: number;
}

class WatchPartyController {
  private iframe: HTMLIFrameElement;
  private vidfastOrigins = [
    'https://vidfast.pro',
    'https://vidfast.in',
    'https://vidfast.io',
    'https://vidfast.me',
    'https://vidfast.net',
    'https://vidfast.pm',
    'https://vidfast.xyz'
  ];

  constructor(iframeElement: HTMLIFrameElement) {
    this.iframe = iframeElement;
    this.setupEventListeners();
  }

  // Sync play command to all participants
  syncPlay(time?: number) {
    this.iframe.contentWindow?.postMessage({
      command: 'play',
      time: time
    }, '*');

    // Broadcast to other participants
    this.broadcastToParty({
      action: 'play',
      time: time
    });
  }

  // Sync pause command to all participants
  syncPause(time?: number) {
    this.iframe.contentWindow?.postMessage({
      command: 'pause',
      time: time
    }, '*');

    this.broadcastToParty({
      action: 'pause',
      time: time
    });
  }

  // Sync seek to specific time for all participants
  syncSeek(time: number) {
    this.iframe.contentWindow?.postMessage({
      command: 'seek',
      time: time
    }, '*');

    this.broadcastToParty({
      action: 'seek',
      time: time
    });
  }

  // Handle incoming party commands
  handlePartyCommand(command: PartyCommand) {
    switch (command.action) {
      case 'play':
        this.iframe.contentWindow?.postMessage({
          command: 'play'
        }, '*');
        break;
      case 'pause':
        this.iframe.contentWindow?.postMessage({
          command: 'pause'
        }, '*');
        break;
      case 'seek':
        this.iframe.contentWindow?.postMessage({
          command: 'seek',
          time: command.time
        }, '*');
        break;
    }
  }

  broadcastToParty(command: PartyCommand) {
    // Your party synchronization logic here
    // (WebSocket, Socket.IO, etc.)
    console.log('Broadcasting to party:', command);
  }

  onPlayerStatusUpdate(status: any) {
    // Your status update logic here
    console.log('Player status:', status);
  }

  setupEventListeners() {
    // Listen for player events
    window.addEventListener('message', (event) => {
      if (!this.vidfastOrigins.includes(event.origin) || !event.data) {
        return;
      }

      if (event.data.type === 'PLAYER_EVENT') {
        const {
          event: playerEvent,
          currentTime
        } = event.data.data;

        switch (playerEvent) {
          case 'play':
            this.syncPlay(currentTime);
            break;
          case 'pause':
            this.syncPause(currentTime);
            break;
          case 'seeked':
            this.syncSeek(currentTime);
            break;
        }
      }

      if (event.data.type === 'PLAYER_EVENT' && event.data.data.event === 'playerstatus') {
        this.onPlayerStatusUpdate(event.data.data);
      }
    });
  }
}

export default WatchPartyController;
```

### React Watch Party Component

```tsx
// src/components/WatchParty.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import WatchPartyController from '@/lib/WatchPartyController';

interface WatchPartyProps {
  movieId: number;
  roomId: string;
  isHost: boolean;
}

export default function WatchParty({ movieId, roomId, isHost }: WatchPartyProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [controller, setController] = useState<WatchPartyController | null>(null);
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    if (iframeRef.current) {
      const partyController = new WatchPartyController(iframeRef.current);
      setController(partyController);

      // Connect to your WebSocket/Socket.IO server
      // const socket = io('your-server-url');
      // socket.emit('join-room', roomId);
      
      // socket.on('party-command', (command) => {
      //   partyController.handlePartyCommand(command);
      // });

      return () => {
        // socket.disconnect();
      };
    }
  }, [roomId]);

  const playerUrl = `https://vidfast.pro/movie/${movieId}?theme=2980B9`;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Video Player */}
        <div className="lg:col-span-3">
          <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
            <iframe
              ref={iframeRef}
              src={playerUrl}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="encrypted-media"
              title="Watch Party Player"
            ></iframe>
          </div>

          {/* Host Controls */}
          {isHost && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Host Controls</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => controller?.syncPlay()}
                  className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                >
                  Sync Play
                </button>
                <button
                  onClick={() => controller?.syncPause()}
                  className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                >
                  Sync Pause
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Participants Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">
              Participants ({participants.length})
            </h3>
            <div className="space-y-2">
              {participants.map((participant, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{participant}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat could go here */}
          <div className="mt-4 bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Chat</h3>
            {/* Chat implementation */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### WebSocket Integration Example

```typescript
// src/lib/watchPartySocket.ts
import { io, Socket } from 'socket.io-client';

interface WatchPartyEvents {
  'party-command': (command: any) => void;
  'user-joined': (userId: string) => void;
  'user-left': (userId: string) => void;
  'sync-time': (time: number) => void;
}

export class WatchPartySocket {
  private socket: Socket;
  private roomId: string;

  constructor(serverUrl: string, roomId: string) {
    this.roomId = roomId;
    this.socket = io(serverUrl);
    this.socket.emit('join-room', roomId);
  }

  sendCommand(command: any) {
    this.socket.emit('party-command', {
      roomId: this.roomId,
      command
    });
  }

  onCommand(callback: (command: any) => void) {
    this.socket.on('party-command', callback);
  }

  onUserJoined(callback: (userId: string) => void) {
    this.socket.on('user-joined', callback);
  }

  onUserLeft(callback: (userId: string) => void) {
    this.socket.on('user-left', callback);
  }

  requestSync() {
    this.socket.emit('request-sync', this.roomId);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
```

## Best Practices

1. **Always use responsive containers** - The padding-bottom technique ensures the player maintains aspect ratio on all screen sizes

2. **Add loading states** - Consider showing a skeleton or spinner while the iframe loads

3. **Error handling** - Wrap the player in an error boundary to handle loading failures gracefully

4. **Accessibility** - Always include a descriptive `title` attribute on the iframe

5. **Performance** - Consider lazy loading the player for content below the fold

6. **Progress tracking** - Implement watch progress tracking to enhance user experience

7. **Resume playback** - Use saved progress to allow users to continue where they left off

## Security Considerations

- The `allow="encrypted-media"` attribute enables DRM-protected content playback
- The `allowFullScreen` attribute enables fullscreen functionality
- Always validate movie/show IDs before embedding
- Verify message origins when handling postMessage events from the player

## Troubleshooting

### Player not loading
- Verify the TMDB ID is correct
- Check network connectivity
- Ensure the content is available on VidFast

### Aspect ratio issues
- Confirm the padding-bottom percentage matches your desired ratio
- Check for conflicting CSS styles on parent containers

### Fullscreen not working
- Ensure `allowFullScreen` attribute is present
- Check browser permissions for fullscreen API

### Progress not saving
- Verify the message event listener is properly set up
- Check that the origin validation includes all VidFast domains
- Ensure localStorage is available and not blocked

## Next Steps

1. Create the `MoviePlayer` and `TVPlayer` components
2. Implement the `usePlayerProgress` hook for progress tracking
3. Update movie and TV show detail pages to include the players
4. Add season/episode selection UI for TV shows
5. Implement loading states and error handling
6. Create API routes for backend progress storage (optional)
7. Add resume playback functionality
8. Test on various screen sizes and devices
