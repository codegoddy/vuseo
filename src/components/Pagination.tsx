/** @format */

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxVisiblePages = 7;

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    if (currentPage <= 4) {
      // Show first 5 pages, then ... and last page
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // Show first page, ..., then last 5 pages
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      // Show first page, ..., current-1, current, current+1, ..., last page
      pages.push(1);
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 py-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-4 py-2 text-white/50"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`min-w-[44px] px-4 py-2 rounded-lg font-medium transition-all ${
                isActive ?
                  "bg-accent text-white shadow-lg shadow-accent/30"
                : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
