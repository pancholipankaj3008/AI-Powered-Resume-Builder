import { Globe2, Gauge, Trash2, Plus } from "lucide-react";

const Languages = ({ formData, setFormData }) => {

    const handleChange = (index, e) => {

        const { name, value } = e.target;

        setFormData((prev) => {

            const updatedLanguages = [...prev.languages];

            updatedLanguages[index] = {
                ...updatedLanguages[index],
                [name]: value,
            };

            return {
                ...prev,
                languages: updatedLanguages,
            };
        });
    };

    const addLanguage = () => {

        setFormData((prev) => ({
            ...prev,
            languages: [
                ...prev.languages,
                {
                    language: "",
                    proficiency: "Beginner",
                },
            ],
        }));
    };

    const removeLanguage = (index) => {

        setFormData((prev) => ({
            ...prev,
            languages: prev.languages.filter((_, i) => i !== index),
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
                        Languages
                    </h2>

                    <button
                        type="button"
                        onClick={addLanguage}
                        className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        Add Language
                    </button>
                </div>

                <p className="text-sm text-gray-400 font-medium mb-6">
                    List the languages you speak and how fluently.
                </p>

                {(formData?.languages || []).length === 0 && (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                        <p className="text-gray-500 text-sm">No languages added yet.</p>
                    </div>
                )}

                <div className="space-y-5">
                    {(formData.languages || []).map((language, index) => (

                        <div
                            key={index}
                            className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 relative"
                        >
                            <button
                                type="button"
                                onClick={() => removeLanguage(index)}
                                title="Remove this language"
                                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-900/30 transition-all"
                            >
                                <Trash2 className="w-4 h-4" strokeWidth={2} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">

                                <div>
                                    <label className={labelClass}>Language</label>
                                    <div className="relative">
                                        <Globe2 className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="language"
                                            placeholder="Spanish"
                                            value={language.language}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Proficiency</label>
                                    <div className="relative">
                                        <Gauge className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                                        <select
                                            name="proficiency"
                                            value={language.proficiency}
                                            onChange={(e) => handleChange(index, e)}
                                            className={`${inputClass} appearance-none cursor-pointer`}
                                        >
                                            <option className="bg-[#0b0c0e]" value="Beginner">Beginner</option>
                                            <option className="bg-[#0b0c0e]" value="Intermediate">Intermediate</option>
                                            <option className="bg-[#0b0c0e]" value="Professional">Professional</option>
                                            <option className="bg-[#0b0c0e]" value="Native">Native</option>
                                        </select>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>

                            </div>

                        </div>

                    ))}
                </div>

            </div>

        </div>
    );
};

export default Languages;