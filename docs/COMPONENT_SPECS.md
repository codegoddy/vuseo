# Component Specifications

## Detailed Component Specifications

This document provides detailed specifications for key components in the movie app.

---

## VideoPlayer Component

### Purpose
Embed and control the VidFast Pro video player for movies and TV shows.

### Props

```typescript
interface VideoPlayerProps {
  // Required
  type: 'movie' | 'tv';
  id: string;
  
  // Required for TV shows
  season?: number;
  episode?: number;
  
  // Optional player configuration
  options?: VideoPlayerOptions;
  
  // Optional callbacks
  onReady?: () => void;
  onError?: (error: Error) => void;
}

interface VideoPlayerOptions {
  title?: boolean;           // Default: true
  poster?: boolean;          // Default: true
  autoPlay?: boolean;        // Default: false
  startAt?: number;          // Default: 0
  theme?: string;            // Hex color without #
  nextButton?: boolean;      // Default: false (TV only)
  autoNext?: boolean;        // Default: false (TV only)
  server?: string;           // Default: auto
  hideServer?: boolean;      // Default: false
  fullscreenButton?: boolean; // Default: true
  chromecast?: boolean;      // Default: true
  sub?: string;              // Language code (e.g., 'en')
}
```

### Implementation Notes

```typescript
// components/media/VideoPlayer.tsx
'use client';

export function VideoPlayer({ type, id, season, episode, options }: VideoPlayerProps) {
  const embedUrl = useMemo(() => {
    if (type === 'movie') {
      return buildMovieEmbedUrl(id, options);
    }
    return buildTVEmbedUrl(id, season!, episode!, options);
  }, [type, id, season, episode, options]);

  return (
    <div className="relative aspect-video w-full">
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </div>
  );
}
```

### Usage Examples

```typescript
// Movie player
<VideoPlayer 
  type="movie" 
  id="tt6263850" 
  options={{ autoPlay: true, theme: '16A085' }}
/>

// TV show player with auto-next
<VideoPlayer 
  type="tv" 
  id="tt4052886" 
  season={1} 
  episode={5}
  options={{ nextButton: true, autoNext: true }}
/>
```

---

## MovieCard Component

### Purpose
Display movie information in a card format for browsing.

### Props

```typescript
interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
  };
  variant?: 'default' | 'compact' | 'featured';
  showRating?: boolean;
  showYear?: boolean;
  onClick?: () => void;
}
```

### Features
- Responsive image loading
- Hover effects
- Rating display
- Release year
- Click to navigate

### Implementation Notes

```typescript
// components/media/MovieCard.tsx
import Image from 'next/image';
import Link from 'next/link';

export function MovieCard({ movie, variant = 'default', showRating = true }: MovieCardProps) {
  const year = new Date(movie.releaseDate).getFullYear();
  
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="group relative overflow-hidden rounded-lg transition-transform hover:scale-105">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
          alt={movie.title}
          width={500}
          height={750}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 p-4">
            <h3 className="text-white font-semibold">{movie.title}</h3>
            {showRating && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-400">★</span>
                <span className="text-white">{movie.voteAverage.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
```

---

## TVShowCard Component

### Purpose
Display TV show information in a card format.

### Props

```typescript
interface TVShowCardProps {
  show: {
    id: string;
    name: string;
    posterPath: string;
    firstAirDate: string;
    voteAverage: number;
  };
  variant?: 'default' | 'compact';
  showRating?: boolean;
  onClick?: () => void;
}
```

### Similar to MovieCard
- Same visual treatment
- Links to `/tv/[id]`
- Shows first air date instead of release date

---

## MediaGrid Component

### Purpose
Display a grid of movies or TV shows with responsive layout.

### Props

```typescript
interface MediaGridProps {
  items: (Movie | TVShow)[];
  type: 'movie' | 'tv';
  loading?: boolean;
  emptyMessage?: string;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}
```

### Features
- Responsive grid layout
- Loading skeletons
- Empty state
- Infinite scroll support (optional)

### Implementation Notes

```typescript
// components/media/MediaGrid.tsx
export function MediaGrid({ 
  items, 
  type, 
  loading, 
  columns = { mobile: 2, tablet: 4, desktop: 6 } 
}: MediaGridProps) {
  if (loading) {
    return <MediaGridSkeleton columns={columns} />;
  }

  if (items.length === 0) {
    return <EmptyState message="No content found" />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((item) => (
        type === 'movie' 
          ? <MovieCard key={item.id} movie={item} />
          : <TVShowCard key={item.id} show={item} />
      ))}
    </div>
  );
}
```

---

## EpisodeSelector Component

### Purpose
Allow users to select season and episode for TV shows.

### Props

```typescript
interface EpisodeSelectorProps {
  showId: string;
  seasons: Season[];
  currentSeason: number;
  currentEpisode: number;
  onSelect: (season: number, episode: number) => void;
}

interface Season {
  seasonNumber: number;
  episodeCount: number;
  episodes: Episode[];
}

interface Episode {
  episodeNumber: number;
  name: string;
  stillPath: string;
  overview: string;
}
```

### Features
- Season dropdown/tabs
- Episode grid with thumbnails
- Current episode indicator
- Episode metadata on hover

### Implementation Notes

```typescript
// components/media/EpisodeSelector.tsx
'use client';

export function EpisodeSelector({ 
  seasons, 
  currentSeason, 
  currentEpisode, 
  onSelect 
}: EpisodeSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState(currentSeason);
  const season = seasons.find(s => s.seasonNumber === selectedSeason);

  return (
    <div className="space-y-4">
      {/* Season selector */}
      <select 
        value={selectedSeason}
        onChange={(e) => setSelectedSeason(Number(e.target.value))}
        className="w-full p-2 rounded"
      >
        {seasons.map(s => (
          <option key={s.seasonNumber} value={s.seasonNumber}>
            Season {s.seasonNumber}
          </option>
        ))}
      </select>

      {/* Episode grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {season?.episodes.map(episode => (
          <EpisodeCard
            key={episode.episodeNumber}
            episode={episode}
            isActive={
              selectedSeason === currentSeason && 
              episode.episodeNumber === currentEpisode
            }
            onClick={() => onSelect(selectedSeason, episode.episodeNumber)}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## SearchBar Component

### Purpose
Search for movies and TV shows.

### Props

```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
  autoFocus?: boolean;
}
```

### Features
- Debounced input
- Clear button
- Loading indicator
- Keyboard shortcuts (Cmd/Ctrl + K)

### Implementation Notes

```typescript
// components/features/SearchBar.tsx
'use client';

export function SearchBar({ 
  placeholder = 'Search movies and TV shows...', 
  onSearch,
  debounceMs = 300 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const debouncedSearch = useDebouncedCallback(onSearch, debounceMs);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 pl-10 rounded-lg border"
      />
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2" />
      {query && (
        <button 
          onClick={() => { setQuery(''); onSearch(''); }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
}
```

---

## Header Component

### Purpose
Main navigation header for the application.

### Features
- Logo/brand
- Navigation links
- Search bar
- Theme toggle
- User menu (if auth implemented)

### Structure

```typescript
// components/layout/Header.tsx
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            MovieApp
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/movies">Movies</Link>
            <Link href="/tv">TV Shows</Link>
            <Link href="/trending">Trending</Link>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <SearchBar onSearch={handleSearch} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

## Loading States

### Skeleton Components

```typescript
// components/ui/Skeleton.tsx
export function MovieCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] bg-gray-300 rounded-lg" />
      <div className="mt-2 h-4 bg-gray-300 rounded w-3/4" />
    </div>
  );
}

export function MediaGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
```

---

## Error States

### Error Boundary

```typescript
// components/ui/ErrorBoundary.tsx
'use client';

export function ErrorBoundary({ 
  error, 
  reset 
}: { 
  error: Error; 
  reset: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button 
        onClick={reset}
        className="px-4 py-2 bg-primary text-white rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}
```
