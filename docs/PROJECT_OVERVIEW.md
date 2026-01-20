# Project Overview

## Movie App

A Next.js-based movie and TV show streaming application that integrates with the VidFast Pro embed API.

---

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Video Player**: VidFast Pro Embed API

---

## Project Structure

```
movie-app/
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout
│       ├── page.tsx            # Home page
│       └── globals.css         # Global styles
├── public/                     # Static assets
├── docs/                       # Documentation
└── package.json               # Dependencies
```

---

## Core Features (Planned)

### 1. Movie Browsing
- Browse popular, trending, and top-rated movies
- Search functionality
- Movie details page with metadata
- Embedded video player

### 2. TV Show Browsing
- Browse popular TV shows
- Season and episode navigation
- Auto-play next episode
- Episode tracking

### 3. Video Player
- Embedded VidFast Pro player
- Customizable theme
- Subtitle support
- Multiple server options
- Chromecast support

### 4. User Experience
- Responsive design
- Dark/light theme
- Continue watching
- Watchlist/favorites

---

## Development Phases

### Phase 1: Foundation
- [ ] Set up project structure
- [ ] Create reusable components
- [ ] Implement routing structure
- [ ] Design system and theme

### Phase 2: Data Integration
- [ ] Integrate movie/TV show metadata API (TMDB recommended)
- [ ] Create data fetching utilities
- [ ] Implement caching strategy

### Phase 3: Core Features
- [ ] Movie listing pages
- [ ] TV show listing pages
- [ ] Search functionality
- [ ] Detail pages with video player

### Phase 4: Enhanced Features
- [ ] User preferences
- [ ] Continue watching
- [ ] Watchlist
- [ ] Recommendations

### Phase 5: Polish
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Error handling
- [ ] Loading states

---

## External APIs

### VidFast Pro (Video Streaming)
- Provides embedded video player
- Handles video hosting and streaming
- See `API_REFERENCE.md` for details

### TMDB (The Movie Database) - Recommended
- Movie and TV show metadata
- Images, posters, backdrops
- Search functionality
- Trending and popular content
- Free API with registration

---

## Environment Variables (To Be Configured)

```env
# TMDB API
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3

# VidFast Pro
NEXT_PUBLIC_VIDFAST_BASE_URL=https://vidfast.pro

# App Configuration
NEXT_PUBLIC_APP_NAME=Movie App
NEXT_PUBLIC_DEFAULT_THEME=16A085
```

---

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (create `.env.local`)

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

---

## Next Steps

1. Review `API_REFERENCE.md` for VidFast Pro integration details
2. Review `ARCHITECTURE.md` for component structure
3. Set up TMDB API account for movie metadata
4. Begin implementing core components
