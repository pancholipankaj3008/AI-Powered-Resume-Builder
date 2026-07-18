const templates = [
    "ATS Professional",
    "Modern",
    "Minimal",
    "Executive",
];

const TemplateStep = ({
    selectedTemplate,
    setSelectedTemplate,
    errors,
    setErrors,
    onPrevious,
    onNext,
}) => {
    return (
        <div>

            <h2 className="text-3xl font-bold mb-3">
                Choose Template
            </h2>

            <p className="text-gray-600 mb-10">
                Select your favorite template.
            </p>

            <div className="grid grid-cols-2 gap-6">

                {templates.map((item) => (

                    <div
                        key={item}
                        onClick={() => {
                            setSelectedTemplate(item);
                            setErrors((prev) => ({
                                ...prev,
                                template: "",
                            }));
                        }}
                        className={`border rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg ${
                            selectedTemplate === item
                                ? "border-blue-600 ring-2 ring-blue-200"
                                : "border-gray-300"
                        }`}
                    >

                        <div className="h-56 bg-gray-100 rounded mb-4 flex items-center justify-center">

                            Preview

                        </div>

                        <h3 className="text-center font-semibold">
                            {item}
                        </h3>

                    </div>

                ))}

            </div>

            {errors.template && (

                <p className="text-red-500 text-sm mt-5">

                    {errors.template}

                </p>

            )}

            <div className="flex justify-between mt-10">

                <button
                    onClick={onPrevious}
                    className="border px-6 py-3 rounded"
                >
                    Previous
                </button>

                <button
                    onClick={onNext}
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default TemplateStep;