import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Sparkles, Loader2 } from "lucide-react";

import {
    GenerateSummary,
    ResetAIState,
} from "../../redux/ai/aiSlice";



const Summary = ({ formData, setFormData }) => {


    const dispatch = useDispatch();

    const { loading, summary, error } = useSelector(
        (state) => state.ai
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            summary: e.target.value,
        });
    };


    const handleGenerate = () => {
        dispatch(
            GenerateSummary({
                profession: formData.profession,
                skills: formData.skills,
                experience: formData.experience
                    .map(
                        (exp) =>
                            `${exp.position} at ${exp.company}. ${exp.description.join(", ")}`
                    )
                    .join("\n"),
            })
        );
    };


    useEffect(() => {

        if (summary) {

            setFormData((prev) => ({
                ...prev,
                summary,
            }));

            toast.success("Summary generated!");

            dispatch(ResetAIState());

        }

    }, [summary, dispatch, setFormData]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(ResetAIState());
        }
    }, [error, dispatch]);

    return (
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10 space-y-4">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                    <div>
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1">
                            Professional Summary
                        </h2>
                        <p className="text-sm text-gray-400 font-medium">
                            A short pitch that sits right below your name.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={loading}
                        className="shrink-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-5 py-2.5 rounded-xl text-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                        ) : (
                            <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                        )}
                        {loading ? "Generating..." : "Generate AI Summary"}
                    </button>

                </div>

                <textarea
                    rows={5}
                    value={formData.summary}
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl p-4 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner resize-none"
                    placeholder="Write a short professional summary, or let AI generate one from your experience and skills..."
                />

                <p className="text-xs text-gray-500 text-right px-1">
                    {formData.summary?.length || 0} characters
                </p>

            </div>

        </div>
    );
};

export default Summary;