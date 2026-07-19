import StepNavigation from "./StepNavigation";

const BasicInfoStep = ({
    formData,
    setFormData,
    errors,
    onPrevious,
    onNext,
}) => {
    return (
        <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                Basic Information
            </h2>

            <p className="text-sm text-gray-400 font-medium mb-8">
                Give your resume a title and choose your profession.
            </p>

            <div className="space-y-6">

                <div>
                    <label className="block text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1">
                        Resume Title <span className="text-red-400">*</span>
                    </label>

                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                title: e.target.value,
                            })
                        }
                        className={`w-full bg-white/[0.04] border text-sm text-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner ${
                            errors.title
                                ? "border-red-500/50 focus:border-red-500/70"
                                : "border-white/10 focus:border-[#fbbf24]/50"
                        }`}
                        placeholder="Frontend Resume"
                    />

                    {errors.title && (
                        <p className="text-red-400 text-xs font-semibold mt-1.5 px-1">
                            {errors.title}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1">
                        Profession <span className="text-red-400">*</span>
                    </label>

                    <input
                        type="text"
                        value={formData.profession}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                profession: e.target.value,
                            })
                        }
                        className={`w-full bg-white/[0.04] border text-sm text-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner ${
                            errors.profession
                                ? "border-red-500/50 focus:border-red-500/70"
                                : "border-white/10 focus:border-[#fbbf24]/50"
                        }`}
                        placeholder="Full Stack MERN Developer"
                    />

                    {errors.profession && (
                        <p className="text-red-400 text-xs font-semibold mt-1.5 px-1">
                            {errors.profession}
                        </p>
                    )}
                </div>
            </div>

            <StepNavigation
                onPrevious={onPrevious}
                onNext={onNext}
            />
        </div>
    );
};

export default BasicInfoStep;