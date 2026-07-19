import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { templates } from "../data/templateData";


const Templates = () => {
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const navigate = useNavigate();

    const handleContinue = () => {
        if (!selectedTemplate) return;

        navigate(`/resume/new?template=${selectedTemplate}`);
    };

    return (
        <div className="min-h-screen bg-[#07080a] text-[#e4e6eb] font-sans relative overflow-hidden selection:bg-[#fbbf24] selection:text-[#0b0c0e] pb-15">

            {/* Ambient Background Glow Layer */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-[#fbbf24] rounded-full opacity-[0.06] blur-[140px]"></div>
                <div className="absolute top-1/4 -right-40 w-[32rem] h-[32rem] bg-[#d97706] rounded-full opacity-[0.08] blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-1/3 w-[28rem] h-[28rem] bg-[#f59e0b] rounded-full opacity-[0.05] blur-[130px]"></div>
            </div>

            {/* Tech Layout Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-70 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10 relative z-10 pb-32">

                <div className="mb-8 md:mb-10">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-1.5 h-4 bg-gradient-to-b from-[#fbbf24] to-[#d97706] rounded-full"></div>
                        <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">Step 1 of 2</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                        Choose a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706]">Template</span>
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-400 font-medium max-w-xl">
                        Select a design to start building your resume. You can switch templates anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {templates.map((template) => {

                        const isSelected = selectedTemplate === template.id;

                        return (
                            <div
                                key={template.id}
                                onClick={() => setSelectedTemplate(template.id)}
                                className={`group relative bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-3xl border rounded-2xl p-2.5 sm:p-4 cursor-pointer transition-all duration-300 flex flex-col ${
                                    isSelected
                                        ? "border-[#fbbf24] shadow-[0_0_25px_rgba(251,191,36,0.18)] bg-white/[0.05]"
                                        : "border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                                }`}
                            >
                                {/* Dynamic Badge */}
                                <span className={`absolute top-2 right-2 sm:top-3 sm:right-3 text-[9px] sm:text-[10px] font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-md uppercase z-10 ${
                                    isSelected
                                        ? "bg-[#fbbf24] text-[#0b0c0e]"
                                        : "bg-black/40 text-gray-300 backdrop-blur-md group-hover:bg-black/60"
                                }`}>
                                    {template.badge}
                                </span>

                                {/* Fixed A4-ratio resume preview */}
                                <div className="w-full aspect-[210/297] rounded-xl mb-3 overflow-hidden border border-white/10 relative bg-[#0d0e12] group-hover:border-white/20 transition-colors">
                                    <img
                                        src={template.image}
                                        alt={`${template.name} resume template preview`}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>

                                    {isSelected && (
                                        <div className="absolute inset-0 ring-2 ring-inset ring-[#fbbf24]/60 rounded-xl pointer-events-none"></div>
                                    )}
                                </div>

                                {/* Template Identity Info */}
                                <div className="text-center pt-0.5 pb-0.5">
                                    <h3 className={`font-bold text-xs sm:text-sm tracking-tight transition-colors truncate ${
                                        isSelected ? "text-[#fbbf24]" : "text-gray-300 group-hover:text-white"
                                    }`}>
                                        {template.name}
                                    </h3>
                                </div>
                            </div>
                        );

                    })}

                </div>

            </div>

            {/* Sticky Continue Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#07080a]/80 backdrop-blur-2xl">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-gray-500 font-medium hidden sm:block">
                        {selectedTemplate
                            ? `Selected: ${templates.find((t) => t.id === selectedTemplate)?.name}`
                            : "Pick a template to continue"}
                    </p>

                    <button
                        onClick={handleContinue}
                        disabled={!selectedTemplate}
                        className="ml-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-8 py-3 rounded-xl text-sm shadow-[0_0_25px_rgba(251,191,36,0.2)] hover:shadow-[0_0_35px_rgba(251,191,36,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none disabled:hover:scale-100 disabled:shadow-none"
                    >
                        Continue
                        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Templates;