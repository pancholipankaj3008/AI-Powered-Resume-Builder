import { useEffect } from "react";
import { Link, useParams, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { templates as templateData } from "../data/templateData";
import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    LayoutTemplate,
    Pencil,
    Trash2,
    Download,
    FileX2,
} from "lucide-react";

import {
    GetResumeById,
    UpdateResume,
    DeleteResume,
} from "../redux/resume/resumeSlice";

import ATSClassic from "../components/templates/ATSClassic";
import ATSProfessional from "../components/templates/ATSProfessional";
import BoldAccentSidebar from "../components/templates/BoldAccentSidebar";
import CorporateElite from "../components/templates/CorporateElite";
import CreativeDesigner from "../components/templates/CreativeDesigner";
import CreativePortfolio from "../components/templates/CreativePortfolio";
import DeveloperPortfolio from "../components/templates/DeveloperPortfolio";
import Executive from "../components/templates/Executive";
import ExecutiveCorporate from "../components/templates/ExecutiveCorporate";
import InfographicStyle from "../components/templates/InfographicStyle";
import Minimal from "../components/templates/Minimal";
import MinimalElegant from "../components/templates/MinimalElegant";
import MinimalistBoldAccent from "../components/templates/MinimalistBoldAccent";
import MinimalTechBlocks from "../components/templates/MinimalTechBlocks";
import Modern from "../components/templates/Modern";
import ModernBorder from "../components/templates/ModernBorder";
import ModernProfessional from "../components/templates/ModernProfessional";
import SlateGrid from "../components/templates/SlateGrid";
import TechStartup from "../components/templates/TechStartup";


import { useRef } from "react";
import Loader from "../components/common/Loader";
import axiosInstance from "../services/axiosInstance";

const isPdf = new URLSearchParams(window.location.search).get("pdf") === "true";
const ResumePreview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const resumeRef = useRef();

    const { selectedResume, loading } = useSelector(
        (state) => state.resume
    );

    useEffect(() => {
        dispatch(GetResumeById(id));
    }, [dispatch, id]);

    const templates = {
        "ats-professional": ATSProfessional,
        "ats-classic": ATSClassic,
        "modern": Modern,
        "modern-border": ModernBorder,
        "modern-professional": ModernProfessional,
        "minimal": Minimal,
        "minimal-elegant": MinimalElegant,
        "minimal-tech-blocks": MinimalTechBlocks,
        "minimalist-bold-accent": MinimalistBoldAccent,
        "creative-designer": CreativeDesigner,
        "creative-portfolio": CreativePortfolio,
        "developer-portfolio": DeveloperPortfolio,
        "corporate-elite": CorporateElite,
        "executive": Executive,
        "executive-corporate": ExecutiveCorporate,
        "infographic-style": InfographicStyle,
        "slate-grid": SlateGrid,
        "tech-startup": TechStartup,
        "bold-accent-sidebar": BoldAccentSidebar,
    };



    const handleTemplateChange = async (e) => {
        const template = e.target.value;

        await dispatch(
            UpdateResume({
                id: selectedResume._id,
                resumeData: {
                    template,
                },
            })
        );

        dispatch(GetResumeById(selectedResume._id));
    };

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmDelete) return;

        await dispatch(DeleteResume(selectedResume._id));

        navigate("/dashboard");
    };

    const downloadPDF = async () => {
        try {
            const response = await axiosInstance.get(
                `/pdf/download/${selectedResume._id}`,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedResume.title || "resume"}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        } catch (error) {
            console.error("PDF download failed:", error);
        }
    };

    // Shared page shell (background + ambient glow) for loading / empty / main states
    const PageShell = ({ children }) => (
        <div className="min-h-screen bg-[#07080a] text-[#e4e6eb] font-sans relative overflow-hidden selection:bg-[#fbbf24] selection:text-[#0b0c0e]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-[#fbbf24] rounded-full opacity-[0.06] blur-[140px]"></div>
                <div className="absolute top-1/4 -right-40 w-[32rem] h-[32rem] bg-[#d97706] rounded-full opacity-[0.08] blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-1/3 w-[28rem] h-[28rem] bg-[#f59e0b] rounded-full opacity-[0.05] blur-[130px]"></div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-70 pointer-events-none"></div>
            <div className="relative z-10">{children}</div>
        </div>
    );

    if (loading) {
        return <Loader text="Loading your resume..." />;
    }

    if (!selectedResume) {
        return (
            <PageShell>
                <div className="flex flex-col justify-center items-center h-screen gap-4 px-4 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#fbbf24]">
                        <FileX2 className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">Resume not found.</p>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
                        Back to Dashboard
                    </Link>
                </div>
            </PageShell>
        );
    }

    const Template =
        templates[selectedResume.template] || ATSProfessional;

    if (isPdf) {
        return (
            <div
                style={{
                    background: "#fff",
                    width: "794px",
                    margin: "0 auto",
                }}
            >
                <Template resume={selectedResume} />
            </div>
        );
    }

    return (
        <PageShell>
            <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10">

                {/* Back to Dashboard */}
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-gray-500 hover:text-[#fbbf24] mb-6 transition-colors group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
                    Back to Dashboard
                </Link>

                {/* Header */}
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden mb-8">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                                Resume Preview
                            </h1>
                            <p className="mt-1 text-sm text-gray-400 font-medium truncate">
                                {selectedResume.title || "Untitled Resume"}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 items-center">

                            <div className="relative">
                                <LayoutTemplate className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                                <select
                                    value={selectedResume.template}
                                    onChange={handleTemplateChange}
                                    className="appearance-none cursor-pointer bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl pl-11 pr-9 py-2.5 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] transition-all shadow-inner"
                                >
                                    {templateData.map((template) => (
                                        <option
                                            key={template.id}
                                            value={template.id}
                                            className="bg-[#0b0c0e]"
                                        >
                                            {template.name}
                                        </option>
                                    ))}
                                </select>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>

                            <Link
                                to={`/resume/${selectedResume._id}`}
                                className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                            >
                                <Pencil className="w-4 h-4" strokeWidth={2} />
                                Edit
                            </Link>

                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 text-red-400 hover:text-red-300 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                            >
                                <Trash2 className="w-4 h-4" strokeWidth={2} />
                                Delete
                            </button>

                            <button
                                onClick={downloadPDF}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-4 py-2.5 rounded-xl text-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                            >
                                <Download className="w-4 h-4" strokeWidth={2.5} />
                                Download PDF
                            </button>

                        </div>

                    </div>

                </div>

                {/* Resume */}
                <div className="rounded-2xl p-1.5 bg-gradient-to-br from-[#fbbf24]/20 via-white/10 to-transparent shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    <div ref={resumeRef} className="bg-white rounded-xl overflow-hidden">
                        <Template resume={selectedResume} />
                    </div>
                </div>

            </div>
        </PageShell>
    );
};

export default ResumePreview;
