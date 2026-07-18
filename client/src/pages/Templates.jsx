import { useState } from "react";
import { useNavigate } from "react-router-dom";

const templates = [
    {
        id: "ats-professional",
        name: "ATS Professional",
    },
    {
        id: "modern",
        name: "Modern",
    },
    {
        id: "minimal",
        name: "Minimal",
    },
    {
        id: "executive-corporate",
        name: "Executive Corporate",
    },
];

const Templates = () => {
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const navigate = useNavigate();

    const handleContinue = () => {
        if (!selectedTemplate) return;

        navigate(`/resume/new?template=${selectedTemplate}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-2">
                Choose Resume Template
            </h1>

            <p className="text-gray-600 mb-8">
                Select a template to start building your resume.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {templates.map((template) => (

                    <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`border rounded-lg p-5 cursor-pointer transition-all hover:shadow-lg ${
                            selectedTemplate === template.id
                                ? "border-blue-600 ring-2 ring-blue-300"
                                : "border-gray-300"
                        }`}
                    >

                        <div className="h-56 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-500">
                            Preview
                        </div>

                        <h2 className="text-lg font-semibold text-center">
                            {template.name}
                        </h2>

                    </div>

                ))}

            </div>

            <div className="mt-8 text-center">

                <button
                    onClick={handleContinue}
                    disabled={!selectedTemplate}
                    className="bg-blue-600 text-white px-8 py-3 rounded disabled:bg-gray-400"
                >
                    Continue
                </button>

            </div>

        </div>
    );
};

export default Templates;