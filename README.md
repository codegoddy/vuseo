# Movie App 🎬

A modern movie and TV show streaming application built with Next.js, featuring the VidFast Pro embed API for seamless video playback.

## 📖 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Documentation Index](./docs/README.md)** - Start here for an overview
- **[API Reference](./docs/API_REFERENCE.md)** - VidFast Pro embed API documentation
- **[Project Overview](./docs/PROJECT_OVERVIEW.md)** - Project scope and features
- **[Architecture Guide](./docs/ARCHITECTURE.md)** - Application structure and patterns
- **[Component Specifications](./docs/COMPONENT_SPECS.md)** - Detailed component specs
- **[Implementation Guide](./docs/IMPLEMENTATION_GUIDE.md)** - Step-by-step build guide
- **[Best Practices](./docs/BEST_PRACTICES.md)** - Development best practices
- **[Quick Reference](./docs/QUICK_REFERENCE.md)** - Cheat sheet for common tasks

## 🚀 Quick Start

### Prerequisites

1. Node.js 18+ installed
2. TMDB API account (free) - [Sign up here](https://www.themoviedb.org/)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your TMDB API credentials to .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN=your_token_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_VIDFAST_BASE_URL=https://vidfast.pro
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## 🎯 Features

### Current
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design

### Planned
- Movie browsing and search
- TV show browsing with episode navigation
- Embedded video player (VidFast Pro)
- Watchlist functionality
- Continue watching
- Dark/light theme
- Customizable player themes

## 🛠️ Tech Stack

- **Framework**: Next.js 15+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Video Player**: VidFast Pro Embed API
- **Data Source**: TMDB API

## 📁 Project Structure

```
movie-app/
├── docs/                  # Comprehensive documentation
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and API clients
│   ├── types/            # TypeScript type definitions
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
└── package.json
```

## 🎓 Learning Resources

New to the project? Follow this path:

1. Read [Project Overview](./docs/PROJECT_OVERVIEW.md)
2. Review [Architecture Guide](./docs/ARCHITECTURE.md)
3. Follow [Implementation Guide](./docs/IMPLEMENTATION_GUIDE.md)
4. Reference [Quick Reference](./docs/QUICK_REFERENCE.md) while coding

## 🤝 Contributing

1. Follow the patterns in [Best Practices](./docs/BEST_PRACTICES.md)
2. Update documentation when adding features
3. Test thoroughly before committing
4. Use conventional commit messages

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔗 External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📄 License

This project is for educational purposes.

---

**Ready to build?** Start with the [Implementation Guide](./docs/IMPLEMENTATION_GUIDE.md)!
