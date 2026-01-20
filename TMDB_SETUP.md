# TMDB API Setup Guide

This project uses The Movie Database (TMDB) API to fetch real movie, TV show, and anime data.

## Getting Your Access Token

1. **Create a TMDB Account**
   - Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
   - Sign up for a free account

2. **Get Your Access Token**
   - Once logged in, go to your account settings
   - Navigate to the API section: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - If you don't have an API key yet, click "Request an API Key" and choose "Developer"
   - Once you have API access, you'll see your **API Read Access Token (v4 auth)** on the same page
   - Copy the long Bearer token (starts with "eyJ...")

3. **Configure Your Environment**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Open `.env.local` and replace `your_access_token_here` with your actual access token:
     ```
     NEXT_PUBLIC_TMDB_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9...your_token_here
     ```

4. **Restart Your Development Server**
   ```bash
   npm run dev
   ```

## API Features Available

The TMDB integration provides:

### Movies
- Trending movies (daily/weekly)
- Popular movies
- Top rated movies
- Now playing movies
- Upcoming movies
- Movie details with cast, crew, and trailers

### TV Shows
- Trending TV shows (daily/weekly)
- Popular TV shows
- Top rated TV shows
- Airing today
- On the air
- TV show details with cast, crew, and trailers

### Anime
- Popular anime (filtered by Japanese animation)
- Top rated anime
- Trending anime

### Search
- Multi-search (movies, TV shows, people)
- Movie-specific search
- TV show-specific search

### Images
- Poster images (multiple sizes)
- Backdrop images (multiple sizes)
- Profile images (multiple sizes)

## Usage Examples

```typescript
import { tmdbApi, getImageUrl } from '@/lib/tmdb';

// Fetch trending movies
const trendingMovies = await tmdbApi.getTrendingMovies('day');

// Fetch popular anime
const popularAnime = await tmdbApi.getPopularAnime();

// Get movie details
const movieDetails = await tmdbApi.getMovieDetails(550); // Fight Club

// Build image URL
const posterUrl = getImageUrl(movie.poster_path, 'poster', 'medium');
const backdropUrl = getImageUrl(movie.backdrop_path, 'backdrop', 'large');
```

## API Limits

TMDB API has the following limits for free accounts:
- 40 requests every 10 seconds
- No daily limit

This is more than sufficient for most applications.

## Documentation

For more information about TMDB API:
- API Documentation: [https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)
- API Reference: [https://developer.themoviedb.org/reference/intro/getting-started](https://developer.themoviedb.org/reference/intro/getting-started)

## Troubleshooting

### "Invalid API key" or authentication error
- Make sure you copied the Access Token (not the API Key v3)
- Use the "API Read Access Token (v4 auth)" from your TMDB settings
- Ensure there are no extra spaces in your `.env.local` file
- The token should start with "eyJ..."
- Restart your development server after adding the token

### Images not loading
- Check that the image paths are not null
- Verify the image base URL is correct
- Use the `getImageUrl` helper function to build proper URLs

### Rate limiting
- If you hit rate limits, implement caching
- Use Next.js built-in caching with `revalidate` option
- Consider implementing request throttling for heavy usage
