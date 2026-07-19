import { useEffect, useState } from "react";

import { templates } from "../../data/templateData";


const TemplateStep = ({
    selectedTemplate,
    setSelectedTemplate,
    errors,
    setErrors,
    onPrevious,
    onNext,
}) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-2 bg- relative">

            {/* Ambient gradient backdrop */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] bg-[#fbbf24] rounded-full opacity-[0.06] blur-[150px]"></div>
                <div className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] bg-[#d97706] rounded-full opacity-[0.07] blur-[150px]"></div>
            </div>

            <div className="relative z-10">
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                        Choose Template
                    </h2>
                    <p className="text-sm text-gray-400 font-medium">
                        Select your favorite configuration layout to instantly populate your workspace data.
                    </p>
                </div>

                {/* Responsive Grid: min 2 cols on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                    {templates.map((item) => {
                        const isSelected = selectedTemplate === item.id;
                        return (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setSelectedTemplate(item.id);
                                    setErrors((prev) => ({
                                        ...prev,
                                        template: "",
                                    }));
                                }}
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
                                    {item.badge}
                                </span>

                                {/* Fixed A4-ratio resume preview (real image, no skeleton) */}
                                <div className="w-full aspect-[210/297] rounded-xl mb-3 overflow-hidden border border-white/10 relative bg-[#0d0e12] group-hover:border-white/20 transition-colors">
                                    <img
                                        src={item.image}
                                        alt={`${item.name} resume template preview`}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />

                                    {/* subtle gradient wash for text/badge legibility, not a skeleton */}
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
                                        {item.name}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Error Message Layout */}
                {errors.template && (
                    <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2 max-w-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                        {errors.template}
                    </div>
                )}

                {/* Action Buttons Interface */}
                <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
                    <button
                        onClick={onPrevious}
                        className="border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                    >
                        Previous
                    </button>

                    <button
                        onClick={onNext}
                        className="bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-8 py-2.5 rounded-xl text-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TemplateStep;