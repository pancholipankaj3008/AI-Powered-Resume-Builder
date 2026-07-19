import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles, Loader2, Plus, Trash2, Star } from "lucide-react";
import {
    GenerateHighlights,
    ResetAIState,
} from "../../redux/ai/aiSlice";


const Achievements = ({ formData, setFormData }) => {

    const dispatch = useDispatch();

    const {
        loading,
        highlights,
    } = useSelector((state) => state.ai);

    const handleChange = (index, value) => {

        const updatedAchievements = [...formData.achievements];
        updatedAchievements[index] = value;

        setFormData((prev) => ({
            ...prev,
            achievements: updatedAchievements,
        }));
    };

    const addAchievement = () => {

        setFormData((prev) => ({
            ...prev,
            achievements: [...prev.achievements, ""],
        }));
    };

    const removeAchievement = (index) => {

        const updatedAchievements = formData.achievements.filter(
            (_, i) => i !== index
        );

        setFormData((prev) => ({
            ...prev,
            achievements: updatedAchievements,
        }));
    };


    useEffect(() => {

        if (highlights.length > 0) {

            setFormData((prev) => ({
                ...prev,
                achievements: highlights,
            }));

            dispatch(ResetAIState());

        }

    }, [
        highlights,
        dispatch,
        setFormData,
    ]);

    return (
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">

                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                        Key Highlights
                    </h2>

                    <div className="flex gap-2 shrink-0">

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                dispatch(
                                    GenerateHighlights({

                                        profession: formData.profession,

                                        summary: formData.summary,

                                        skills: formData.skills.join(", "),

                                        experience: formData.experience
                                            .map(
                                                (exp) =>
                                                    `${exp.position} at ${exp.company}. ${exp.description.join(", ")}`
                                            )
                                            .join("\n"),

                                        projects: formData.projects
                                            .map(
                                                (project) =>
                                                    `${project.title}. ${project.description.join(", ")}`
                                            )
                                            .join("\n"),

                                    })
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-4 py-2 rounded-xl text-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                            ) : (
                                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                            )}
                            {loading ? "Generating..." : "Generate AI Highlights"}
                        </button>

                        <button
                            type="button"
                            onClick={addAchievement}
                            className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                        >
                            <Plus className="w-4 h-4" strokeWidth={2.5} />
                            Add
                        </button>

                    </div>

                </div>

                <p className="text-sm text-gray-400 font-medium mb-6">
                    Highlight the wins that make your resume stand out.
                </p>

                {(formData?.achievements || []).length === 0 && (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                        <p className="text-gray-500 text-sm">No highlights added yet.</p>
                    </div>
                )}

                <div className="space-y-3">
                    {formData.achievements.map((achievement, index) => (

                        <div
                            key={index}
                            className="flex gap-3 items-start bg-white/[0.02] border border-white/10 rounded-2xl p-4"
                        >

                            <Star className="w-4 h-4 text-[#fbbf24]/60 mt-3 shrink-0" strokeWidth={1.5} />

                            <textarea
                                rows={2}
                                placeholder="e.g. Built AI Resume Builder using MERN Stack"
                                value={achievement}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                className="flex-1 bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner resize-none"
                            />

                            {formData.achievements.length > 1 && (

                                <button
                                    type="button"
                                    onClick={() => removeAchievement(index)}
                                    title="Remove this highlight"
                                    className="shrink-0 p-2.5 mt-0.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-900/30 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                                </button>

                            )}

                        </div>

                    ))}
                </div>

            </div>

        </div>

    );
};

export default Achievements;