import {
    GraduationCap,
    Building2,
    BookOpen,
    Award,
    Calendar,
    Trash2,
    Plus,
} from "lucide-react";

const Education = ({ formData, setFormData }) => {

    const handleChange = (index, e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => {

            const updatedEducation = [...prev.education];

            updatedEducation[index] = {
                ...updatedEducation[index],
                [name]: type === "checkbox" ? checked : value,
            };

            return {
                ...prev,
                education: updatedEducation,
            };
        });
    };

    const addEducation = () => {

        setFormData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    school: "",
                    degree: "",
                    fieldOfStudy: "",
                    startDate: "",
                    endDate: "",
                    currentlyStudying: false,
                    grade: "",
                    description: "",
                },
            ],
        }));
    };

    const removeEducation = (index) => {

        setFormData((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

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
                        Education
                    </h2>

                    <button
                        type="button"
                        onClick={addEducation}
                        className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        Add Education
                    </button>
                </div>

                <p className="text-sm text-gray-400 font-medium mb-6">
                    List your academic background, most recent first.
                </p>

                {(formData?.education || []).length === 0 && (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                        <p className="text-gray-500 text-sm">No education added yet.</p>
                    </div>
                )}

                <div className="space-y-5">
                    {(formData.education || []).map((edu, index) => (

                        <div
                            key={index}
                            className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 relative"
                        >
                            <button
                                type="button"
                                onClick={() => removeEducation(index)}
                                title="Remove this education"
                                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-900/30 transition-all"
                            >
                                <Trash2 className="w-4 h-4" strokeWidth={2} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">

                                <div className="md:col-span-2">
                                    <label className={labelClass}>School / College</label>
                                    <div className="relative">
                                        <Building2 className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="school"
                                            placeholder="Stanford University"
                                            value={edu.school || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Degree</label>
                                    <div className="relative">
                                        <GraduationCap className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="degree"
                                            placeholder="Bachelor of Technology"
                                            value={edu.degree || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Field of Study</label>
                                    <div className="relative">
                                        <BookOpen className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="fieldOfStudy"
                                            placeholder="Computer Science"
                                            value={edu.fieldOfStudy || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Grade / CGPA</label>
                                    <div className="relative">
                                        <Award className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="grade"
                                            placeholder="8.9 CGPA"
                                            value={edu.grade || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Start Date</label>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={edu.startDate ? edu.startDate.slice(0, 10) : ""}
                                            onChange={(e) => handleChange(index, e)}
                                            className={`${inputClass} [color-scheme:dark]`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>End Date</label>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={edu.endDate ? edu.endDate.slice(0, 10) : ""}
                                            disabled={edu.currentlyStudying}
                                            onChange={(e) => handleChange(index, e)}
                                            className={`${inputClass} [color-scheme:dark] disabled:opacity-40 disabled:cursor-not-allowed`}
                                        />
                                    </div>
                                </div>

                            </div>

                            <label className="flex items-center gap-2.5 mt-4 px-1 cursor-pointer w-fit group">
                                <input
                                    type="checkbox"
                                    name="currentlyStudying"
                                    checked={edu.currentlyStudying || false}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-4 h-4 rounded accent-[#fbbf24] bg-white/[0.04] border-white/10 cursor-pointer"
                                />
                                <span className="text-sm text-gray-400 font-medium group-hover:text-gray-200 transition-colors">
                                    Currently studying here
                                </span>
                            </label>

                            <div className="mt-5">
                                <label className={labelClass}>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Relevant coursework, achievements, activities..."
                                    value={edu.description || ""}
                                    onChange={(e) => handleChange(index, e)}
                                    rows={4}
                                    className="w-full bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner resize-none"
                                />
                            </div>

                        </div>

                    ))}
                </div>

            </div>

        </div>
    );
};

export default Education;