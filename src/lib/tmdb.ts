/** @format */

// TMDB API Configuration and Helper Functions

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
const BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";

// Image size configurations
export const IMAGE_SIZES = {
  poster: {
    small: "w185",
    medium: "w342",
    large: "w500",
    original: "original",
  },
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280",
    original: "original",
  },
  profile: {
    small: "w45",
    medium: "w185",
    large: "h632",
    original: "original",
  },
};

// Helper function to build image URL
export const getImageUrl = (
  path: string | null,
  type: "poster" | "backdrop" | "profile" = "poster",
  size: "small" | "medium" | "large" | "original" = "medium",
): string => {
  if (!path) return "/placeholder-movie.jpg"; // You can add a placeholder image
  return `${IMAGE_BASE_URL}/${IMAGE_SIZES[type][size]}${path}`;
};

// Generic fetch function for TMDB API
async function fetchFromTMDB(
  endpoint: string,
  params: Record<string, string> = {},
) {
  if (!ACCESS_TOKEN) {
    throw new Error(
      "TMDB Access Token is not configured. Please check your .env.local file.",
    );
  }

  const url = new URL(`${BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    next: { revalidate: 3600 },
  };

  try {
    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      throw new Error(
        `TMDB API Error: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error("TMDB Fetch Error:", error);
    console.error("URL:", url.toString());
    throw error;
  }
}

// Movie APIs
export const tmdbApi = {
  // Trending
  getTrendingMovies: (timeWindow: "day" | "week" = "day") =>
    fetchFromTMDB(`/trending/movie/${timeWindow}`),

  getTrendingTV: (timeWindow: "day" | "week" = "day") =>
    fetchFromTMDB(`/trending/tv/${timeWindow}`),

  getTrendingAll: (timeWindow: "day" | "week" = "day") =>
    fetchFromTMDB(`/trending/all/${timeWindow}`),

  // Movies
  getPopularMovies: (page: number = 1) =>
    fetchFromTMDB("/movie/popular", { page: page.toString() }),

  getTopRatedMovies: (page: number = 1) =>
    fetchFromTMDB("/movie/top_rated", { page: page.toString() }),

  getNowPlayingMovies: (page: number = 1) =>
    fetchFromTMDB("/movie/now_playing", { page: page.toString() }),

  getUpcomingMovies: (page: number = 1) =>
    fetchFromTMDB("/movie/upcoming", { page: page.toString() }),

  getMovieDetails: (movieId: number) =>
    fetchFromTMDB(`/movie/${movieId}`, {
      append_to_response: "credits,videos,similar",
    }),

  // TV Shows
  getPopularTV: (page: number = 1) =>
    fetchFromTMDB("/tv/popular", { page: page.toString() }),

  getTopRatedTV: (page: number = 1) =>
    fetchFromTMDB("/tv/top_rated", { page: page.toString() }),

  getAiringTodayTV: (page: number = 1) =>
    fetchFromTMDB("/tv/airing_today", { page: page.toString() }),

  getOnTheAirTV: (page: number = 1) =>
    fetchFromTMDB("/tv/on_the_air", { page: page.toString() }),

  getTVDetails: (tvId: number) =>
    fetchFromTMDB(`/tv/${tvId}`, {
      append_to_response: "credits,videos,similar",
    }),

  // Anime (using genre filter for animation from Japan)
  getPopularAnime: (page: number = 1) =>
    fetchFromTMDB("/discover/tv", {
      page: page.toString(),
      with_genres: "16", // Animation genre
      with_origin_country: "JP",
      sort_by: "popularity.desc",
    }),

  getTopRatedAnime: (page: number = 1) =>
    fetchFromTMDB("/discover/tv", {
      page: page.toString(),
      with_genres: "16",
      with_origin_country: "JP",
      sort_by: "vote_average.desc",
      "vote_count.gte": "100",
    }),

  // Search
  searchMulti: (query: string, page: number = 1) =>
    fetchFromTMDB("/search/multi", { query, page: page.toString() }),

  searchMovies: (query: string, page: number = 1) =>
    fetchFromTMDB("/search/movie", { query, page: page.toString() }),

  searchTV: (query: string, page: number = 1) =>
    fetchFromTMDB("/search/tv", { query, page: page.toString() }),

  // Discover with filters
  discoverMovies: (params: {
    page?: number;
    with_genres?: string;
    with_original_language?: string;
    primary_release_year?: string;
    "vote_average.gte"?: string;
    sort_by?: string;
  }) => fetchFromTMDB("/discover/movie", params as Record<string, string>),

  discoverTV: (params: {
    page?: number;
    with_genres?: string;
    with_original_language?: string;
    first_air_date_year?: string;
    "vote_average.gte"?: string;
    sort_by?: string;
  }) => fetchFromTMDB("/discover/tv", params as Record<string, string>),

  // Genres
  getMovieGenres: () => fetchFromTMDB("/genre/movie/list"),
  getTVGenres: () => fetchFromTMDB("/genre/tv/list"),
};

// Type definitions for TMDB responses
export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface TMDBTVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  credits: {
    cast: TMDBCast[];
    crew: TMDBCrew[];
  };
  videos: {
    results: TMDBVideo[];
  };
  similar: {
    results: TMDBMovie[];
  };
}

export interface TMDBTVDetails extends TMDBTVShow {
  episode_run_time: number[];
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  credits: {
    cast: TMDBCast[];
    crew: TMDBCrew[];
  };
  videos: {
    results: TMDBVideo[];
  };
  similar: {
    results: TMDBTVShow[];
  };
}

export interface TMDBCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBCrew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
