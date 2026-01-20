/** @format */

"use client";

import CustomDropdown from "./CustomDropdown";

interface FilterBarProps {
  genres: { id: number; name: string }[];
  selectedGenre: string;
  selectedLanguage: string;
  selectedYear: string;
  selectedRating: string;
  selectedSort: string;
  onGenreChange: (genre: string) => void;
  onLanguageChange: (language: string) => void;
  onYearChange: (year: string) => void;
  onRatingChange: (rating: string) => void;
  onSortChange: (sort: string) => void;
}

const languages = [
  { value: "", label: "All Languages" },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
  { value: "hi", label: "Hindi" },
];

const currentYear = new Date().getFullYear();
const years = [
  { value: "", label: "All Years" },
  ...Array.from({ length: 30 }, (_, i) => {
    const year = currentYear - i;
    return { value: year.toString(), label: year.toString() };
  }),
];

const ratings = [
  { value: "", label: "Any Rating" },
  { value: "8", label: "8+ Stars" },
  { value: "7", label: "7+ Stars" },
  { value: "6", label: "6+ Stars" },
  { value: "5", label: "5+ Stars" },
];

const sortOptions = [
  { value: "vote_average.desc", label: "Rating ↓" },
  { value: "vote_average.asc", label: "Rating ↑" },
  { value: "primary_release_date.desc", label: "Newest First" },
  { value: "primary_release_date.asc", label: "Oldest First" },
];

export default function FilterBar({
  genres,
  selectedGenre,
  selectedLanguage,
  selectedYear,
  selectedRating,
  selectedSort,
  onGenreChange,
  onLanguageChange,
  onYearChange,
  onRatingChange,
  onSortChange,
}: FilterBarProps) {
  const genreOptions = [
    { value: "", label: "All Genres" },
    ...genres.map((genre) => ({
      value: genre.id.toString(),
      label: genre.name,
    })),
  ];

  return (
    <div className="bg-black/90 backdrop-blur-md py-6 relative z-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap gap-4">
          <CustomDropdown
            options={genreOptions}
            value={selectedGenre}
            onChange={onGenreChange}
            placeholder="All Genres"
          />

          <CustomDropdown
            options={languages}
            value={selectedLanguage}
            onChange={onLanguageChange}
            placeholder="Language"
          />

          <CustomDropdown
            options={years}
            value={selectedYear}
            onChange={onYearChange}
            placeholder="All Years"
          />

          <CustomDropdown
            options={ratings}
            value={selectedRating}
            onChange={onRatingChange}
            placeholder="Any Rating"
          />

          <CustomDropdown
            options={sortOptions}
            value={selectedSort}
            onChange={onSortChange}
            placeholder="Sort By"
          />
        </div>
      </div>
    </div>
  );
}
