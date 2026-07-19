import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#07080a] text-[#e4e6eb] font-sans flex items-center justify-center overflow-hidden relative selection:bg-[#fbbf24] selection:text-[#0b0c0e] px-4">

            {/* Ambient gradient backdrop */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] bg-[#fbbf24] rounded-full opacity-[0.06] blur-[150px]"></div>
                <div className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] bg-[#d97706] rounded-full opacity-[0.07] blur-[150px]"></div>
            </div>

            {/* Tech grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(circle_at_center,#000_60%,transparent_100%)] opacity-70 pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-xl">

                {/* Brand Logo */}
                <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#d97706] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                        <span className="text-[#0b0c0e] font-black text-base">R</span>
                    </div>
                    <span className="text-xl font-black tracking-tight text-white">Resume<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fde68a] to-[#d97706]">AI</span></span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                    Build resumes that
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706]">
                        actually get noticed
                    </span>
                </h1>

                <p className="text-sm sm:text-base text-gray-400 font-medium max-w-md">
                    ATS-optimized, professionally structured resumes — built with AI in minutes, not hours.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">

                    <Link
                        to="/register"
                        className="bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-7 py-3 rounded-xl text-sm shadow-[0_0_25px_rgba(251,191,36,0.25)] hover:shadow-[0_0_35px_rgba(251,191,36,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Get Started Free
                    </Link>

                    <Link
                        to="/login"
                        className="bg-white/[0.04] backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.07] hover:border-white/20 px-7 py-3 rounded-xl text-sm font-bold transition-all"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default Home;