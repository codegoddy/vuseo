# Implementation Guide

## Step-by-Step Implementation Guide

This guide provides a recommended order for implementing features in your movie app.

---

## Prerequisites

### 1. TMDB API Setup
1. Create account at [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Navigate to Settings > API
3. Request an API key (free)
4. Copy your API key and API Read Access Token

### 2. Environment Configuration

Create `.env.local`:

```env
# TMDB API
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN=your_token_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# VidFast Pro
NEXT_PUBLIC_VIDFAST_BASE_URL=https://vidfast.pro

# App Configuration
NEXT_PUBLIC_APP_NAME=Movie App
NEXT_PUBLIC_DEFAULT_THEME=16A085
```

---

## Phase 1: Foundation (Day 1-2)

### Step 1: Set Up Type Definitions

Create TypeScript types for your data models.

**Files to create:**
- `src/types/movie.ts`
- `src/types/tv.ts`
- `src/types/api.ts`

**Key types:**
```typescript
// Movie, TVShow, Genre, Season, Episode
// TMDBResponse, VideoPlayerOptions
```

### Step 2: Create Utility Functions

**Files to create:**
- `src/lib/constants.ts` - App constants
- `src/lib/utils/format.ts` - Date, number formatting
- `src/lib/api/vidfast.ts` - VidFast URL builder

**Example:**
```typescript
// lib/api/vidfast.ts
export function buildMovieEmbedUrl(id: string, options?: VideoPlayerOptions): string {
  const baseUrl = `${process.env.NEXT_PUBLIC_VIDFAST_BASE_URL}/movie/${id}`;
  const params = new URLSearchParams();
  
  if (options?.autoPlay) params.append('autoPlay', 'true');
  if (options?.theme) params.append('theme', options.theme);
  // ... add other options
  
  return `${baseUrl}?${params.toString()}`;
}
```

### Step 3: Create TMDB API Client

**File to create:**
- `src/lib/api/tmdb.ts`

**Key methods:**
```typescript
export async function getPopularMovies(page = 1): Promise<Movie[]>
export async function getMovieDetails(id: string): Promise<MovieDetails>
export async function searchMovies(query: string): Promise<Movie[]>
export async function getTrendingMovies(): Promise<Movie[]>
```

---

## Phase 2: UI Components (Day 3-4)

### Step 4: Create Base UI Components

**Files to create:**
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Skeleton.tsx`

Use Tailwind CSS for styling.

### Step 5: Create Layout Components

**Files to create:**
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Container.tsx`

**Update:**
- `src/app/layout.tsx` - Add Header and Footer

### Step 6: Create Media Components

**Files to create:**
- `src/components/media/MovieCard.tsx`
- `src/components/media/TVShowCard.tsx`
- `src/components/media/MediaGrid.tsx`
- `src/components/media/VideoPlayer.tsx`

---

## Phase 3: Core Pages (Day 5-7)

### Step 7: Home Page

**File to update:**
- `src/app/page.tsx`

**Features:**
- Hero section with featured content
- Trending movies section
- Popular movies section
- Popular TV shows section

**Example structure:**
```typescript
export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();
  const popularMovies = await getPopularMovies();
  
  return (
    <main>
      <HeroSection movie={trendingMovies[0]} />
      <Section title="Trending Now">
        <MediaGrid items={trendingMovies} type="movie" />
      </Section>
      <Section title="Popular Movies">
        <MediaGrid items={popularMovies} type="movie" />
      </Section>
    </main>
  );
}
```

### Step 8: Movies Listing Page

**Files to create:**
- `src/app/movies/page.tsx`

**Features:**
- Grid of popular movies
- Filter by genre (optional)
- Pagination or infinite scroll
- Sort options (popular, top rated, latest)

### Step 9: Movie Detail Page

**Files to create:**
- `src/app/movies/[id]/page.tsx`

**Features:**
- Movie metadata (title, overview, rating, etc.)
- Backdrop image
- Embedded video player
- Cast information (optional)
- Similar movies (optional)

**Example structure:**
```typescript
export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);
  
  return (
    <main>
      <div className="relative">
        {/* Backdrop */}
        <BackdropImage src={movie.backdropPath} />
        
        {/* Content */}
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Poster */}
            <div>
              <Image src={movie.posterPath} alt={movie.title} />
            </div>
            
            {/* Details */}
            <div className="md:col-span-2">
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
              <div>Rating: {movie.voteAverage}</div>
              <div>Release: {movie.releaseDate}</div>
            </div>
          </div>
          
          {/* Video Player */}
          <VideoPlayer 
            type="movie" 
            id={movie.imdbId || movie.id}
            options={{ theme: '16A085' }}
          />
        </Container>
      </div>
    </main>
  );
}
```

### Step 10: TV Shows Pages

**Files to create:**
- `src/app/tv/page.tsx` - TV shows listing
- `src/app/tv/[id]/page.tsx` - TV show detail with seasons
- `src/app/tv/[id]/[season]/[episode]/page.tsx` - Episode player

**TV Show Detail Features:**
- Show metadata
- Season selector
- Episode list with thumbnails
- Link to episode player

**Episode Player Features:**
- Video player with episode
- Episode information
- Next/previous episode navigation
- Auto-play next episode option

---

## Phase 4: Search & Discovery (Day 8-9)

### Step 11: Search Functionality

**Files to create:**
- `src/components/features/SearchBar.tsx`
- `src/app/search/page.tsx`

**Features:**
- Search input with debouncing
- Search results page
- Filter by type (movies/TV shows)
- Empty state handling

**Update Header:**
Add SearchBar to the header component.

### Step 12: Trending Page

**Files to create:**
- `src/app/trending/page.tsx`

**Features:**
- Trending movies and TV shows
- Time window selector (day/week)
- Combined or separate views

---

## Phase 5: Enhanced Features (Day 10-12)

### Step 13: Watchlist (Client-Side)

**Files to create:**
- `src/hooks/useWatchlist.ts`
- `src/components/features/WatchlistButton.tsx`
- `src/app/watchlist/page.tsx`

**Implementation:**
- Use localStorage for persistence
- Add/remove from watchlist
- Display watchlist page

**Example hook:**
```typescript
export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('watchlist');
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);
  
  const addToWatchlist = (id: string) => {
    const updated = [...watchlist, id];
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };
  
  const removeFromWatchlist = (id: string) => {
    const updated = watchlist.filter(item => item !== id);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };
  
  return { watchlist, addToWatchlist, removeFromWatchlist };
}
```

### Step 14: Continue Watching

**Files to create:**
- `src/hooks/useWatchHistory.ts`
- `src/components/features/ContinueWatching.tsx`

**Features:**
- Track viewing progress
- Display on home page
- Resume from last position

### Step 15: Theme Customization

**Files to create:**
- `src/components/features/ThemeToggle.tsx`
- `src/hooks/useTheme.ts`

**Features:**
- Dark/light mode toggle
- Custom player theme color picker
- Persist preferences

---

## Phase 6: Polish & Optimization (Day 13-14)

### Step 16: Loading States

**Add to all pages:**
- Skeleton screens
- Loading spinners
- Suspense boundaries

**Example:**
```typescript
// app/movies/loading.tsx
export default function Loading() {
  return <MediaGridSkeleton count={12} />;
}
```

### Step 17: Error Handling

**Add to all pages:**
- Error boundaries
- Fallback UI
- Retry mechanisms

**Example:**
```typescript
// app/movies/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorBoundary error={error} reset={reset} />;
}
```

### Step 18: SEO Optimization

**Add to all pages:**
- Metadata generation
- Open Graph tags
- Structured data

**Example:**
```typescript
// app/movies/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);
  
  return {
    title: `${movie.title} - Movie App`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [movie.posterPath],
    },
  };
}
```

### Step 19: Performance Optimization

**Optimizations:**
- Image optimization (Next.js Image)
- Code splitting
- Caching strategies
- Lazy loading

**Example caching:**
```typescript
// lib/api/tmdb.ts
export async function getPopularMovies(page = 1) {
  const res = await fetch(`${TMDB_BASE_URL}/movie/popular?page=${page}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  return res.json();
}
```

### Step 20: Responsive Design

**Ensure all components are responsive:**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized layouts for different screen sizes

---

## Testing Checklist

### Functionality
- [ ] Movies listing loads correctly
- [ ] TV shows listing loads correctly
- [ ] Search returns relevant results
- [ ] Video player embeds correctly
- [ ] Episode navigation works
- [ ] Watchlist add/remove works
- [ ] Theme toggle works

### Performance
- [ ] Images load optimally
- [ ] Pages load quickly
- [ ] No layout shifts
- [ ] Smooth scrolling

### Responsive Design
- [ ] Works on mobile (320px+)
- [ ] Works on tablet (768px+)
- [ ] Works on desktop (1024px+)
- [ ] Touch interactions work

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Alternative Platforms
- Netlify
- AWS Amplify
- Railway
- Render

---

## Post-Launch Enhancements

### Future Features
- User authentication
- Personal ratings and reviews
- Advanced filters (year, rating, genre)
- Recommendations engine
- Social features (share, discuss)
- Download/offline viewing
- Multi-language support
- Accessibility improvements

### Analytics
- Track popular content
- Monitor search queries
- Analyze user behavior
- Performance monitoring

### Maintenance
- Update dependencies regularly
- Monitor API rate limits
- Handle deprecated features
- Collect user feedback
