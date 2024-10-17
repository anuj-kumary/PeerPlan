export const PageNotFound = () => {
  return (
    <div className="flex w-full flex-col items-center m-20 h-screen b">
    <div className="relative">
      <svg
        className="animate-bounce w-40 h-40 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M19 12c0 3.866-3.134 7-7 7s-7-3.134-7-7 3.134-7 7-7 7 3.134 7 7z"
        />
      </svg>
      <div className="absolute left-0 right-0">
        <h1 className="text-6xl text-gray-600 font-bold mb-4 text-center">404</h1>
        <p className="text-2xl text-gray-500 text-center">Page Not Found</p>
        <p className="text-gray-400 text-center">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  </div>
  );
};
