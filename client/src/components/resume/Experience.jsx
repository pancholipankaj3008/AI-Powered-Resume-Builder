import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
    Building2,
    Briefcase,
    MapPin,
    Calendar,
    Sparkles,
    Loader2,
    Plus,
    Trash2,
    X,
} from "lucide-react";

import {
    GenerateExperience,
    ResetAIState,
} from "../../redux/ai/aiSlice";

const Experience = ({ formData, setFormData }) => {

    const dispatch = useDispatch();

    const { loading, experience, error } = useSelector(
        (state) => state.ai
    );

    const [bullet, setBullet] = useState({});
    const [generatingIndex, setGeneratingIndex] = useState(null);

    const handleChange = (index, e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            const updatedExperience = [...prev.experience];

            updatedExperience[index] = {
                ...updatedExperience[index],
                [name]: type === "checkbox" ? checked : value,
            };

            return {
                ...prev,
                experience: updatedExperience,
            };
        });
    };

    const addExperience = () => {
        setFormData((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                {
                    company: "",
                    position: "",
                    employmentType: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    currentlyWorking: false,
                    description: [],
                },
            ],
        }));
    };

    const removeExperience = (index) => {
        setFormData((prev) => ({
            ...prev,
            experience: prev.experience.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const addBullet = (index) => {

        const text = bullet[index]?.trim();

        if (!text) return;

        setFormData((prev) => {

            const updatedExperience = [...prev.experience];

            updatedExperience[index] = {
                ...updatedExperience[index],
                description: [
                    ...updatedExperience[index].description,
                    text,
                ],
            };

            return {
                ...prev,
                experience: updatedExperience,
            };

        });

        setBullet((prev) => ({
            ...prev,
            [index]: "",
        }));

    };

    const removeBullet = (expIndex, bulletIndex) => {

        setFormData((prev) => {

            const updatedExperience = [...prev.experience];

            updatedExperience[expIndex] = {
                ...updatedExperience[expIndex],
                description:
                    updatedExperience[
                        expIndex
                    ].description.filter(
                        (_, i) => i !== bulletIndex
                    ),
            };

            return {
                ...prev,
                experience: updatedExperience,
            };

        });

    };

    const handleGenerate = (index, exp) => {
        setGeneratingIndex(index);
        dispatch(
            GenerateExperience({
                index,
                profession: formData.profession,
                company: exp.company,
                position: exp.position,
                technologies: formData.skills.join(", "),
            })
        );
    };

    useEffect(() => {

        if (
            experience &&
            experience.index !== null &&
            experience.bullets.length
        ) {

            setFormData((prev) => {

                const updatedExperience = [...prev.experience];

                updatedExperience[
                    experience.index
                ] = {
                    ...updatedExperience[
                        experience.index
                    ],
                    description:
                        experience.bullets,
                };

                return {
                    ...prev,
                    experience:
                        updatedExperience,
                };

            });

            toast.success("Responsibilities generated!");
            setGeneratingIndex(null);
            dispatch(ResetAIState());

        }

    }, [experience, dispatch, setFormData]);

    useEffect(() => {

        if (error) {

            toast.error(error);
            setGeneratingIndex(null);
            dispatch(ResetAIState());

        }

    }, [error, dispatch]);

    const inputClass =
        "w-full bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner";

    const labelClass =
        "block text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1";

    return (
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10">

                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                        Experience
                    </h2>

                    <button
                        type="button"
                        onClick={addExperience}
                        className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        Add Experience
                    </button>
                </div>

                <p className="text-sm text-gray-400 font-medium mb-6">
                    List your work history, most recent role first.
                </p>

                {(formData.experience || []).length === 0 && (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                        <p className="text-gray-500 text-sm">No experience added yet.</p>
                    </div>
                )}

                <div className="space-y-5">
                    {(formData.experience || []).map((exp, index) => (

                        <div
                            key={index}
                            className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 relative"
                        >
                            <button
                                type="button"
                                onClick={() => removeExperience(index)}
                                title="Remove this experience"
                                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-900/30 transition-all"
                            >
                                <Trash2 className="w-4 h-4" strokeWidth={2} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">

                                <div>
                                    <label className={labelClass}>Company</label>
                                    <div className="relative">
                                        <Building2 className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="company"
                                            placeholder="Acme Corp"
                                            value={exp.company || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Position</label>
                                    <div className="relative">
                                        <Briefcase className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="position"
                                            placeholder="Frontend Developer"
                                            value={exp.position || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Employment Type</label>
                                    <div className="relative">
                                        <Briefcase className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="employmentType"
                                            placeholder="Full-time"
                                            value={exp.employmentType || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Location</label>
                                    <div className="relative">
                                        <MapPin className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Remote / City"
                                            value={exp.location || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Start Date</label>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={
                                                exp.startDate
                                                    ? exp.startDate.slice(0, 10)
                                                    : ""
                                            }
                                            onChange={(e) => handleChange(index, e)}
                                            className={`${inputClass} [color-scheme:dark]`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>End Date</label>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={
                                                exp.endDate
                                                    ? exp.endDate.slice(0, 10)
                                                    : ""
                                            }
                                            disabled={exp.currentlyWorking}
                                            onChange={(e) => handleChange(index, e)}
                                            className={`${inputClass} [color-scheme:dark] disabled:opacity-40 disabled:cursor-not-allowed`}
                                        />
                                    </div>
                                </div>

                            </div>

                            <label className="flex items-center gap-2.5 mt-4 px-1 cursor-pointer w-fit">
                                <input
                                    type="checkbox"
                                    name="currentlyWorking"
                                    checked={exp.currentlyWorking}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-4 h-4 rounded accent-[#fbbf24] bg-white/[0.04] border-white/10 cursor-pointer"
                                />
                                <span className="text-sm text-gray-300 font-medium">Currently working here</span>
                            </label>

                            <div className="mt-5">
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => handleGenerate(index, exp)}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-4 py-2 rounded-xl text-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
                                >
                                    {loading && generatingIndex === index ? (
                                        <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                                    ) : (
                                        <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                                    )}
                                    {loading && generatingIndex === index ? "Generating..." : "Generate AI Responsibilities"}
                                </button>
                            </div>

                            <div className="mt-5">

                                <h3 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1">
                                    Responsibilities
                                </h3>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Write a responsibility..."
                                        value={bullet[index] || ""}
                                        onChange={(e) =>
                                            setBullet((prev) => ({
                                                ...prev,
                                                [index]: e.target.value,
                                            }))
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addBullet(index);
                                            }
                                        }}
                                        className="flex-1 bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => addBullet(index)}
                                        className="shrink-0 inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 rounded-xl text-sm font-bold transition-all"
                                    >
                                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                                        Add
                                    </button>
                                </div>

                                <ul className="mt-3 space-y-2">

                                    {(exp.description || []).map(
                                        (item, bulletIndex) => (

                                            <li
                                                key={bulletIndex}
                                                className="flex justify-between items-start gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5"
                                            >
                                                <span className="text-sm text-gray-300 flex gap-2">
                                                    <span className="text-[#fbbf24] shrink-0">•</span>
                                                    {item}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeBullet(
                                                            index,
                                                            bulletIndex
                                                        )
                                                    }
                                                    title="Remove"
                                                    className="shrink-0 p-1 rounded-md text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-all"
                                                >
                                                    <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                                                </button>

                                            </li>

                                        )
                                    )}

                                </ul>

                            </div>

                        </div>

                    ))}
                </div>

            </div>

        </div>
    );
};

export default Experience;