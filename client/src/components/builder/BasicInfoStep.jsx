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
            <h2 className="text-3xl font-bold mb-3">
                Basic Information
            </h2>

            <p className="text-gray-500 mb-8">
                Give your resume a title and choose your profession.
            </p>

            <div className="space-y-6">

                <div>
                    <label className="block mb-2 font-medium">
                        Resume Title <span className="text-red-500">*</span>
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
                        className={`w-full rounded-lg p-3 border ${
                            errors.title
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Frontend Resume"
                    />

                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Profession <span className="text-red-500">*</span>
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
                        className={`w-full rounded-lg p-3 border ${
                            errors.profession
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Full Stack MERN Developer"
                    />

                    {errors.profession && (
                        <p className="text-red-500 text-sm mt-1">
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