import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f0f4f3] flex flex-col items-center justify-center px-6 text-center">

      <div className="mb-8">
        <h1 className="text-[120px] font-black text-[#234e44] leading-none tracking-tight">
          404
        </h1>
        <div className="w-24 h-1 bg-[#234e44] mx-auto rounded-full mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate("/")}
          className="bg-[#234e44] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1a3a32] transition-colors"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-white text-[#234e44] border border-[#234e44] px-8 py-3 rounded-lg font-semibold hover:bg-[#f0f4f3] transition-colors"
        >
          Go Back
        </button>
      </div>

    </div>
  );
}