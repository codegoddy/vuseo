# Quick Reference Guide

## Cheat Sheet for Common Tasks

---

## 🎬 VidFast Pro Embed URLs

### Movie
```
https://vidfast.pro/movie/{id}?autoPlay=true&theme=16A085&sub=en
```

### TV Show
```
https://vidfast.pro/tv/{id}/{season}/{episode}?nextButton=true&autoNext=true
```

---

## 🎨 Component Templates

### VideoPlayer
```typescript
<VideoPlayer 
  type="movie" 
  id="tt6263850" 
  options={{ 
    autoPlay: true, 
    theme: '16A085',
    sub: 'en'
  }}
/>
```

### MovieCard
```typescript
<MovieCard 
  movie={movie}
  showRating={true}
  onClick={() => router.push(`/movies/${movie.id}`)}
/>
```

### MediaGrid
```typescript
<MediaGrid 
  items={movies}
  type="movie"
  loading={isLoading}
/>
```

---

## 🔌 TMDB API Calls

### Get Popular Movies
```typescript
const response = await fetch(
  `${TMDB_BASE_URL}/movie/popular?page=1`,
  {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
    next: { revalidate: 3600 }
  }
);
```

### Get Movie Details
```typescript
const response = await fetch(
  `${TMDB_BASE_URL}/movie/${id}?append_to_response=credits,videos`,
  {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    }
  }
);
```

### Search Movies
```typescript
const response = await fetch(
  `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
  {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    }
  }
);
```

### Get TV Show Details
```typescript
const response = await fetch(
  `${TMDB_BASE_URL}/tv/${id}?append_to_response=credits`,
  {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    }
  }
);
```

### Get Season Details
```typescript
const response = await fetch(
  `${TMDB_BASE_URL}/tv/${id}/season/${seasonNumber}`,
  {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    }
  }
);
```

---

## 🖼️ TMDB Image URLs

### Poster (Movie/TV Card)
```typescript
`https://image.tmdb.org/t/p/w500${posterPath}`
```

### Backdrop (Hero/Detail Page)
```typescript
`https://image.tmdb.org/t/p/original${backdropPath}`
```

### Still (Episode Thumbnail)
```typescript
`https://image.tmdb.org/t/p/w300${stillPath}`
```

### Profile (Cast Photo)
```typescript
`https://image.tmdb.org/t/p/w185${profilePath}`
```

---

## 🎯 Common Tailwind Classes

### Grid Layouts
```css
/* Responsive movie grid */
grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4

/* Episode grid */
grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
```

### Card Styles
```css
/* Movie card */
rounded-lg overflow-hidden transition-transform hover:scale-105

/* Card with shadow */
rounded-lg shadow-lg hover:shadow-xl transition-shadow
```

### Text Styles
```css
/* Page title */
text-3xl md:text-4xl lg:text-5xl font-bold

/* Section title */
text-2xl md:text-3xl font-semibold mb-4

/* Body text */
text-base md:text-lg text-gray-600 dark:text-gray-400
```

### Buttons
```css
/* Primary button */
px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors

/* Secondary button */
px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors
```

---

## 🔄 Common Hooks

### useWatchlist
```typescript
const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

// Add to watchlist
addToWatchlist(movieId);

// Remove from watchlist
removeFromWatchlist(movieId);

// Check if in watchlist
const inWatchlist = isInWatchlist(movieId);
```

### useDebounce
```typescript
const debouncedValue = useDebounce(searchQuery, 300);

useEffect(() => {
  if (debouncedValue) {
    searchMovies(debouncedValue);
  }
}, [debouncedValue]);
```

### useLocalStorage
```typescript
const [theme, setTheme] = useLocalStorage('theme', 'dark');
```

---

## 📱 Responsive Breakpoints

```typescript
// Tailwind breakpoints
sm: 640px   // Small devices
md: 768px   // Medium devices (tablets)
lg: 1024px  // Large devices (desktops)
xl: 1280px  // Extra large devices
2xl: 1536px // 2X large devices
```

### Usage
```css
/* Mobile first */
text-sm md:text-base lg:text-lg

/* Hide on mobile */
hidden md:block

/* Show only on mobile */
block md:hidden
```

---

## 🎨 Color Palette

### Primary Colors
```typescript
// Tailwind config
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  }
}
```

### Usage
```css
bg-primary-500 text-primary-50
hover:bg-primary-600
```

---

## 🔐 Environment Variables

```env
# TMDB
NEXT_PUBLIC_TMDB_API_KEY=your_key
NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN=your_token
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# VidFast
NEXT_PUBLIC_VIDFAST_BASE_URL=https://vidfast.pro

# App
NEXT_PUBLIC_APP_NAME=Movie App
NEXT_PUBLIC_DEFAULT_THEME=16A085
```

---

## 🚀 Common Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Git
```bash
git checkout -b feature/movie-detail
git add .
git commit -m "feat: add movie detail page"
git push origin feature/movie-detail
```

---

## 📦 Type Definitions

### Movie
```typescript
interface Movie {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  genres: Genre[];
}
```

### TVShow
```typescript
interface TVShow {
  id: string;
  name: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  firstAirDate: string;
  voteAverage: number;
  numberOfSeasons: number;
}
```

### Episode
```typescript
interface Episode {
  episodeNumber: number;
  name: string;
  overview: string;
  stillPath: string;
  airDate: string;
  voteAverage: number;
}
```

---

## 🎯 Route Patterns

```typescript
/                              // Home
/movies                        // Movies listing
/movies/[id]                   // Movie detail
/tv                            // TV shows listing
/tv/[id]                       // TV show detail
/tv/[id]/[season]/[episode]    // Episode player
/search                        // Search results
/watchlist                     // User watchlist
/trending                      // Trending content
```

---

## 🔍 Search Params

### Movies Page
```typescript
/movies?genre=action&sort=popularity&page=2
```

### Search Page
```typescript
/search?q=inception&type=movie
```

### TV Show Page
```typescript
/tv/12345?season=1
```

---

## 💾 LocalStorage Keys

```typescript
'watchlist'           // Array of movie/show IDs
'theme'              // 'light' | 'dark'
'player-theme'       // Hex color for player
'continue-watching'  // Array of viewing progress
'preferences'        // User preferences object
```

---

## 🎬 Video Player Options

```typescript
interface VideoPlayerOptions {
  title?: boolean;           // Default: true
  poster?: boolean;          // Default: true
  autoPlay?: boolean;        // Default: false
  startAt?: number;          // Seconds
  theme?: string;            // Hex without #
  nextButton?: boolean;      // TV only
  autoNext?: boolean;        // TV only
  server?: string;           // Server name
  hideServer?: boolean;      // Default: false
  fullscreenButton?: boolean; // Default: true
  chromecast?: boolean;      // Default: true
  sub?: string;              // Language code
}
```

---

## 🎨 CSS Utilities

### Aspect Ratios
```css
aspect-video    /* 16:9 */
aspect-square   /* 1:1 */
aspect-[2/3]    /* Movie poster */
```

### Truncate Text
```css
truncate                    /* Single line */
line-clamp-2               /* 2 lines */
line-clamp-3               /* 3 lines */
```

### Transitions
```css
transition-all duration-300 ease-in-out
transition-transform hover:scale-105
transition-opacity hover:opacity-80
```

---

## 🐛 Common Issues & Solutions

### Issue: Images not loading
```typescript
// Solution: Add TMDB domain to next.config.ts
images: {
  domains: ['image.tmdb.org'],
}
```

### Issue: Video player not embedding
```typescript
// Solution: Add VidFast to CSP headers
frame-src https://vidfast.pro;
```

### Issue: API rate limit
```typescript
// Solution: Implement caching
next: { revalidate: 3600 }
```

---

## 📊 Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 90

---

## ✅ Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] Images optimized
- [ ] Error boundaries in place
- [ ] Loading states implemented
- [ ] SEO metadata added
- [ ] Accessibility tested
- [ ] Mobile responsive
- [ ] Build succeeds
- [ ] No console errors
- [ ] Analytics configured

---

## 🔗 Quick Links

- [TMDB API Docs](https://developer.themoviedb.org/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
