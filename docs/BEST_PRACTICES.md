# Best Practices

## Development Best Practices for Movie App

---

## Code Organization

### File Naming Conventions

```
Components: PascalCase (MovieCard.tsx)
Utilities: camelCase (formatDate.ts)
Types: PascalCase (Movie.ts)
Constants: UPPER_SNAKE_CASE or camelCase
Hooks: camelCase with 'use' prefix (useMovies.ts)
```

### Import Order

```typescript
// 1. React and Next.js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. External libraries
import { clsx } from 'clsx';

// 3. Internal utilities and types
import { formatDate } from '@/lib/utils/format';
import type { Movie } from '@/types/movie';

// 4. Internal components
import { MovieCard } from '@/components/media/MovieCard';

// 5. Styles
import styles from './styles.module.css';
```

### Barrel Exports

Create index files for cleaner imports:

```typescript
// components/media/index.ts
export { MovieCard } from './MovieCard';
export { TVShowCard } from './TVShowCard';
export { MediaGrid } from './MediaGrid';
export { VideoPlayer } from './VideoPlayer';

// Usage
import { MovieCard, MediaGrid } from '@/components/media';
```

---

## TypeScript Best Practices

### Use Strict Types

```typescript
// ❌ Avoid
function getMovie(id: any): any {
  // ...
}

// ✅ Prefer
function getMovie(id: string): Promise<Movie> {
  // ...
}
```

### Type vs Interface

```typescript
// Use 'type' for unions, primitives, tuples
type MediaType = 'movie' | 'tv';
type ID = string | number;

// Use 'interface' for object shapes
interface Movie {
  id: string;
  title: string;
  // ...
}

// Interfaces can be extended
interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
}
```

### Avoid Type Assertions

```typescript
// ❌ Avoid
const movie = data as Movie;

// ✅ Prefer type guards
function isMovie(data: unknown): data is Movie {
  return (
    typeof data === 'object' &&
    data !== null &&
    'title' in data &&
    'id' in data
  );
}

if (isMovie(data)) {
  // TypeScript knows data is Movie here
}
```

---

## React Best Practices

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react';
import type { Movie } from '@/types/movie';

// 2. Types/Interfaces
interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

// 3. Component
export function MovieCard({ movie, onClick }: MovieCardProps) {
  // 4. Hooks
  const [isHovered, setIsHovered] = useState(false);
  
  // 5. Event handlers
  const handleClick = () => {
    onClick?.();
  };
  
  // 6. Render
  return (
    <div onClick={handleClick}>
      {/* JSX */}
    </div>
  );
}
```

### Server vs Client Components

```typescript
// ✅ Server Component (default)
// - Fetch data
// - Access backend resources
// - Keep sensitive info on server
export default async function MoviesPage() {
  const movies = await getPopularMovies();
  return <MediaGrid items={movies} />;
}

// ✅ Client Component
// - Use hooks (useState, useEffect)
// - Handle interactivity
// - Access browser APIs
'use client';

export function SearchBar() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

### Avoid Prop Drilling

```typescript
// ❌ Avoid
<Parent>
  <Child theme={theme}>
    <GrandChild theme={theme}>
      <GreatGrandChild theme={theme} />
    </GrandChild>
  </Child>
</Parent>

// ✅ Use Context
const ThemeContext = createContext<Theme>(defaultTheme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Usage
function Component() {
  const { theme } = useContext(ThemeContext);
}
```

### Memoization

```typescript
// Use useMemo for expensive calculations
const sortedMovies = useMemo(() => {
  return movies.sort((a, b) => b.voteAverage - a.voteAverage);
}, [movies]);

// Use useCallback for functions passed as props
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);

// Use React.memo for expensive components
export const MovieCard = memo(function MovieCard({ movie }: MovieCardProps) {
  return <div>{movie.title}</div>;
});
```

---

## Next.js Best Practices

### Data Fetching

```typescript
// ✅ Server Component - fetch directly
export default async function MoviesPage() {
  const movies = await fetch('https://api.example.com/movies').then(r => r.json());
  return <MediaGrid items={movies} />;
}

// ✅ With caching
export default async function MoviesPage() {
  const movies = await fetch('https://api.example.com/movies', {
    next: { revalidate: 3600 } // Revalidate every hour
  }).then(r => r.json());
  return <MediaGrid items={movies} />;
}

// ✅ Client Component - use hooks
'use client';

export function SearchResults() {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    fetch('/api/search?q=query')
      .then(r => r.json())
      .then(setResults);
  }, []);
  
  return <MediaGrid items={results} />;
}
```

### Dynamic Routes

```typescript
// Generate static params for dynamic routes
export async function generateStaticParams() {
  const movies = await getPopularMovies();
  
  return movies.map((movie) => ({
    id: movie.id,
  }));
}

// This generates static pages at build time
export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);
  return <MovieDetails movie={movie} />;
}
```

### Metadata

```typescript
// Static metadata
export const metadata = {
  title: 'Movies - Movie App',
  description: 'Browse popular movies',
};

// Dynamic metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);
  
  return {
    title: `${movie.title} - Movie App`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [`https://image.tmdb.org/t/p/w500${movie.posterPath}`],
    },
  };
}
```

---

## API Integration Best Practices

### Error Handling

```typescript
export async function getMovieDetails(id: string): Promise<Movie> {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch movie: ${response.statusText}`);
    }
    
    const data = await response.json();
    return transformMovieData(data);
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
}
```

### Rate Limiting

```typescript
// Simple rate limiter
class RateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private requestsPerSecond = 4; // TMDB allows 40 requests per 10 seconds
  
  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      this.process();
    });
  }
  
  private async process() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    const fn = this.queue.shift()!;
    await fn();
    
    setTimeout(() => {
      this.processing = false;
      this.process();
    }, 1000 / this.requestsPerSecond);
  }
}

const rateLimiter = new RateLimiter();

export async function getMovieDetails(id: string) {
  return rateLimiter.add(() => fetchMovieDetails(id));
}
```

### Caching Strategy

```typescript
// In-memory cache for client-side
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  
  return data;
}

// Usage
const movies = await getCachedData('popular-movies', () => getPopularMovies());
```

---

## Performance Best Practices

### Image Optimization

```typescript
// ✅ Use Next.js Image component
import Image from 'next/image';

<Image
  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
  alt={movie.title}
  width={500}
  height={750}
  loading="lazy"
  placeholder="blur"
  blurDataURL="/placeholder.jpg"
/>

// ✅ Responsive images
<Image
  src={movie.posterPath}
  alt={movie.title}
  fill
  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
  className="object-cover"
/>
```

### Code Splitting

```typescript
// ✅ Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('@/components/media/VideoPlayer'), {
  loading: () => <VideoPlayerSkeleton />,
  ssr: false, // Don't render on server
});

// ✅ Lazy load below the fold
'use client';

export function LazySection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    
    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref}>
      {isVisible ? <HeavyComponent /> : <Placeholder />}
    </div>
  );
}
```

### Debouncing

```typescript
// Custom debounce hook
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage in search
function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);
  
  useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

---

## Styling Best Practices

### Tailwind CSS Patterns

```typescript
// ✅ Use clsx for conditional classes
import { clsx } from 'clsx';

<button
  className={clsx(
    'px-4 py-2 rounded-lg transition-colors',
    isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Click me
</button>

// ✅ Create reusable class utilities
// lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn('base-classes', conditionalClasses, props.className)} />
```

### Responsive Design

```typescript
// Mobile-first approach
<div className="
  grid 
  grid-cols-2          // Mobile: 2 columns
  md:grid-cols-4       // Tablet: 4 columns
  lg:grid-cols-6       // Desktop: 6 columns
  gap-4                // Consistent gap
">
  {items.map(item => <Card key={item.id} />)}
</div>

// Responsive text
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
  Title
</h1>

// Responsive padding
<div className="px-4 md:px-8 lg:px-16">
  Content
</div>
```

---

## Accessibility Best Practices

### Semantic HTML

```typescript
// ✅ Use semantic elements
<nav>
  <ul>
    <li><Link href="/movies">Movies</Link></li>
    <li><Link href="/tv">TV Shows</Link></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Movie Title</h1>
    <p>Description</p>
  </article>
</main>

<footer>
  <p>&copy; 2024 Movie App</p>
</footer>
```

### ARIA Labels

```typescript
// ✅ Add ARIA labels for screen readers
<button 
  aria-label="Add to watchlist"
  onClick={addToWatchlist}
>
  <HeartIcon />
</button>

<input
  type="search"
  placeholder="Search movies..."
  aria-label="Search movies and TV shows"
/>

<div role="status" aria-live="polite">
  {isLoading ? 'Loading...' : `${results.length} results found`}
</div>
```

### Keyboard Navigation

```typescript
// ✅ Support keyboard navigation
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</div>
```

---

## Security Best Practices

### Environment Variables

```typescript
// ✅ Never expose sensitive keys in client
// Server-side only (no NEXT_PUBLIC_ prefix)
const API_SECRET = process.env.TMDB_API_SECRET;

// ✅ Client-safe variables
const API_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
```

### Input Validation

```typescript
// ✅ Validate and sanitize user input
function validateSearchQuery(query: string): string {
  // Remove special characters
  const sanitized = query.replace(/[<>]/g, '');
  
  // Limit length
  return sanitized.slice(0, 100);
}
```

### Content Security Policy

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src https://vidfast.pro;",
          },
        ],
      },
    ];
  },
};
```

---

## Testing Best Practices

### Component Testing

```typescript
// Example with React Testing Library
import { render, screen } from '@testing-library/react';
import { MovieCard } from './MovieCard';

describe('MovieCard', () => {
  const mockMovie = {
    id: '1',
    title: 'Test Movie',
    posterPath: '/test.jpg',
    releaseDate: '2024-01-01',
    voteAverage: 8.5,
  };
  
  it('renders movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });
  
  it('displays rating', () => {
    render(<MovieCard movie={mockMovie} showRating />);
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });
});
```

---

## Git Best Practices

### Commit Messages

```
feat: add movie detail page
fix: correct video player autoplay
docs: update API documentation
style: format code with prettier
refactor: simplify search logic
test: add tests for MovieCard
chore: update dependencies
```

### Branch Strategy

```
main - production-ready code
develop - integration branch
feature/movie-detail - feature branches
fix/player-bug - bug fix branches
```
