# Architecture Guide

## Application Architecture

This document outlines the recommended architecture for the movie app.

---

## Folder Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (routes)/              # Route groups
│   │   ├── movies/
│   │   │   ├── page.tsx       # Movies listing
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Movie detail page
│   │   ├── tv/
│   │   │   ├── page.tsx       # TV shows listing
│   │   │   └── [id]/
│   │   │       ├── page.tsx   # TV show detail
│   │   │       └── [season]/
│   │   │           └── [episode]/
│   │   │               └── page.tsx  # Episode player
│   │   ├── search/
│   │   │   └── page.tsx       # Search results
│   │   └── watchlist/
│   │       └── page.tsx       # User watchlist
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css
├── components/                 # React components
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/                # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   ├── media/                 # Media-specific components
│   │   ├── MovieCard.tsx
│   │   ├── TVShowCard.tsx
│   │   ├── MediaGrid.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── EpisodeSelector.tsx
│   └── features/              # Feature-specific components
│       ├── SearchBar.tsx
│       ├── FilterPanel.tsx
│       └── WatchlistButton.tsx
├── lib/                       # Utilities and helpers
│   ├── api/                   # API clients
│   │   ├── tmdb.ts           # TMDB API client
│   │   └── vidfast.ts        # VidFast URL builder
│   ├── utils/                 # Utility functions
│   │   ├── format.ts         # Formatting helpers
│   │   └── validation.ts     # Validation helpers
│   └── constants.ts           # App constants
├── types/                     # TypeScript types
│   ├── movie.ts
│   ├── tv.ts
│   └── api.ts
└── hooks/                     # Custom React hooks
    ├── useMovies.ts
    ├── useTVShows.ts
    └── useSearch.ts
```

---

## Component Architecture

### 1. VideoPlayer Component

The core component for embedding VidFast Pro player.

```typescript
interface VideoPlayerProps {
  type: 'movie' | 'tv';
  id: string;
  season?: number;
  episode?: number;
  options?: {
    title?: boolean;
    poster?: boolean;
    autoPlay?: boolean;
    startAt?: number;
    theme?: string;
    nextButton?: boolean;
    autoNext?: boolean;
    server?: string;
    hideServer?: boolean;
    fullscreenButton?: boolean;
    chromecast?: boolean;
    sub?: string;
  };
}
```

### 2. MediaCard Component

Reusable card for displaying movies/TV shows.

```typescript
interface MediaCardProps {
  id: string;
  title: string;
  posterPath: string;
  releaseDate?: string;
  rating?: number;
  type: 'movie' | 'tv';
  onClick?: () => void;
}
```

### 3. MediaGrid Component

Grid layout for displaying multiple media items.

```typescript
interface MediaGridProps {
  items: MediaItem[];
  type: 'movie' | 'tv';
  loading?: boolean;
  onLoadMore?: () => void;
}
```

---

## Data Flow

### 1. Server Components (Default)
- Fetch data on the server
- Better SEO and initial load performance
- Use for listing pages and detail pages

### 2. Client Components
- Interactive components
- Use 'use client' directive
- Examples: VideoPlayer, SearchBar, WatchlistButton

### 3. API Routes (Optional)
- For server-side operations
- Proxy requests to external APIs
- Handle authentication/authorization

---

## State Management

### Local State
- Use React useState for component-level state
- Examples: form inputs, UI toggles

### URL State
- Use Next.js searchParams for filters, pagination
- Shareable and bookmarkable

### Server State
- Use React Server Components for data fetching
- Consider React Query/SWR for client-side caching (if needed)

### Global State (If Needed)
- Context API for theme, user preferences
- Zustand or Jotai for more complex state

---

## API Integration

### TMDB API Client

```typescript
// lib/api/tmdb.ts
export class TMDBClient {
  private baseUrl: string;
  private apiKey: string;

  async getPopularMovies(page: number): Promise<Movie[]>
  async getMovieDetails(id: string): Promise<MovieDetails>
  async searchMovies(query: string): Promise<Movie[]>
  async getTVShowDetails(id: string): Promise<TVShowDetails>
  async getSeasonDetails(id: string, season: number): Promise<Season>
}
```

### VidFast URL Builder

```typescript
// lib/api/vidfast.ts
export class VidFastBuilder {
  static buildMovieUrl(id: string, options?: VideoOptions): string
  static buildTVUrl(
    id: string, 
    season: number, 
    episode: number, 
    options?: VideoOptions
  ): string
}
```

---

## Type Definitions

### Movie Types

```typescript
// types/movie.ts
export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  genres: Genre[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  imdbId: string;
}
```

### TV Show Types

```typescript
// types/tv.ts
export interface TVShow {
  id: string;
  name: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  firstAirDate: string;
  voteAverage: number;
  genres: Genre[];
}

export interface Season {
  seasonNumber: number;
  episodeCount: number;
  episodes: Episode[];
}

export interface Episode {
  episodeNumber: number;
  name: string;
  overview: string;
  stillPath: string;
  airDate: string;
}
```

---

## Routing Strategy

### Movie Routes
- `/` - Home page (featured content)
- `/movies` - Browse movies
- `/movies/[id]` - Movie detail with player

### TV Show Routes
- `/tv` - Browse TV shows
- `/tv/[id]` - TV show detail (seasons overview)
- `/tv/[id]/[season]/[episode]` - Episode player

### Utility Routes
- `/search` - Search results
- `/watchlist` - User's watchlist
- `/trending` - Trending content

---

## Performance Considerations

### Image Optimization
- Use Next.js Image component
- Lazy load images below the fold
- Use appropriate image sizes from TMDB

### Code Splitting
- Automatic with Next.js App Router
- Dynamic imports for heavy components

### Caching
- Server-side caching with Next.js
- Revalidate data at appropriate intervals
- Client-side caching for user interactions

### SEO
- Generate metadata for each page
- Use semantic HTML
- Implement structured data (JSON-LD)

---

## Error Handling

### API Errors
- Graceful fallbacks for failed requests
- Retry logic for transient failures
- User-friendly error messages

### Player Errors
- Handle unavailable content
- Server fallback options
- Clear error states

### Loading States
- Skeleton screens for content loading
- Suspense boundaries
- Progressive enhancement
