/** @format */

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-accent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
