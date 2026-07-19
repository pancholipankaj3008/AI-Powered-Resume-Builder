import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles, Loader2, Plus, X, Zap } from "lucide-react";
import {
    GenerateSkills,
    ResetAIState,
} from "../../redux/ai/aiSlice";

const Skills = ({ formData, setFormData }) => {

    const dispatch = useDispatch();

    const {
        loading,
        skills: aiSkills,
    } = useSelector((state) => state.ai);

    const [skill, setSkill] = useState("");

    const addSkill = () => {

        const value = skill.trim();

        if (!value) return;

        if (
            (formData.skills || []).some(
                (item) => item.toLowerCase() === value.toLowerCase()
            )
        ) {
            setSkill("");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            skills: [...prev.skills, value],
        }));

        setSkill("");
    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    const removeSkill = (index) => {

        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    useEffect(() => {

        if (aiSkills.length > 0) {

            setFormData((prev) => {

                const mergedSkills = [
                    ...new Set([
                        ...prev.skills,
                        ...aiSkills,
                    ]),
                ];

                return {
                    ...prev,
                    skills: mergedSkills,
                };

            });

            dispatch(ResetAIState());

        }

    }, [
        aiSkills,
        dispatch,
        setFormData,
    ]);

    return (
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">

                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                        Skills
                    </h2>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                            dispatch(
                                GenerateSkills({
                                    profession: formData.profession,
                                })
                            )
                        }
                        className="shrink-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-4 py-2 rounded-xl text-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                        ) : (
                            <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                        )}
                        {loading ? "Generating..." : "Suggest AI Skills"}
                    </button>

                </div>

                <p className="text-sm text-gray-400 font-medium mb-6">
                    Add the skills that best match your target role.
                </p>

                <div className="flex gap-2">

                    <div className="relative flex-1">
                        <Zap className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                        <input
                            type="text"
                            placeholder="Type a skill..."
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={addSkill}
                        className="shrink-0 inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 rounded-xl text-sm font-bold transition-all"
                    >
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        Add
                    </button>

                </div>

                <div className="flex flex-wrap gap-2 mt-5">

                    {(formData.skills || []).length === 0 && (
                        <div className="w-full text-center py-8 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                            <p className="text-gray-500 text-sm">No skills added yet.</p>
                        </div>
                    )}

                    {(formData.skills || []).map((item, index) => (

                        <span
                            key={index}
                            className="inline-flex items-center gap-1.5 bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20 px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                            {item}

                            <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="hover:text-red-400 transition-colors"
                            >
                                <X className="w-3 h-3" strokeWidth={3} />
                            </button>
                        </span>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Skills;