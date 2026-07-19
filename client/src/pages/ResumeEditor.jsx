import { Link } from "react-router-dom";
import { ArrowLeft, FileEdit } from "lucide-react";
import ResumeForm from "../components/resume/ResumeForm";

const ResumeEditor = () => {
    return (
        <div className="min-h-screen bg-[#07080a] text-[#e4e6eb] font-sans relative overflow-hidden selection:bg-[#fbbf24] selection:text-[#0b0c0e]">

            {/* Ambient Background Glow Layer */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-[#fbbf24] rounded-full opacity-[0.06] blur-[140px]"></div>
                <div className="absolute top-1/4 -right-40 w-[32rem] h-[32rem] bg-[#d97706] rounded-full opacity-[0.08] blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-1/3 w-[28rem] h-[28rem] bg-[#f59e0b] rounded-full opacity-[0.05] blur-[130px]"></div>
            </div>

            {/* Tech Layout Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-70 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10 relative z-10">

                {/* Back to Dashboard */}
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-gray-500 hover:text-[#fbbf24] mb-6 transition-colors group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
                    Back to Dashboard
                </Link>

                {/* --- HEADER --- */}
                <div className="mb-8 md:mb-10 relative overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] px-5 py-8 sm:px-8 sm:py-10">

                    <div className="absolute inset-0 bg-gradient-to-br from-[#fbbf24]/[0.06] via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#fbbf24] rounded-full opacity-[0.08] blur-[100px] pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">

                        <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#d97706] flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.35)]">
                            <FileEdit className="w-7 h-7 sm:w-8 sm:h-8 text-[#0b0c0e]" strokeWidth={2} />
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                                Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706]">Editor</span>
                            </h1>
                            <p className="mt-2 text-sm text-gray-400 font-medium max-w-xl leading-relaxed">
                                Fill in your details below and let our AI engine help polish every section into an ATS-ready resume.
                            </p>
                        </div>

                    </div>

                </div>

                <ResumeForm />

            </div>

        </div>
    );
};

export default ResumeEditor;