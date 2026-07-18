import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CreateResume } from "../redux/resume/resumeSlice";

import BasicInfoStep from "../components/builder/BasicInfoStep";
import TemplateStep from "../components/builder/TemplateStep";
import PersonalStep from "../components/builder/PersonalStep";
import SummaryStep from "../components/builder/SummaryStep";
import ExperienceStep from "../components/builder/ExperienceStep";
import ProjectsStep from "../components/builder/ProjectsStep";
import SkillsStep from "../components/builder/SkillsStep";
import EducationStep from "../components/builder/EducationStep";
import CertificationStep from "../components/builder/CertificationStep";
import LanguageStep from "../components/builder/LanguageStep";
import HighlightsStep from "../components/builder/HighlightsStep";


const ResumeBuilder = () => {

    const [currentStep, setCurrentStep] = useState("template");
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.resume);
    const [formData, setFormData] = useState({

        title: "",

        profession: "",

        summary: "",

        personalInfo: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            country: "",
            linkedin: "",
            github: "",
            portfolio: "",
            website: "",
            profileImage: "",
        },


        experience: [
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

        projects: [
            {
                title: "",
                techStack: [],
                github: "",
                liveDemo: "",
                description: [],
            },
        ],

        skills: [],

        education: [
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

        certifications: [
            {
                title: "",
                issuer: "",
                issueDate: "",
                credentialId: "",
                credentialURL: "",
            },
        ],


        languages: [
            {
                language: "",
                proficiency: "Beginner",
            },
        ],
        achievements: [""],



    });

    const [errors, setErrors] = useState({});


    const steps = useMemo(
        () => [
            "template",
            "basic",
            "personal",
            "summary",
            "experience",
            "projects",
            "skills",
            "education",
            "certifications",
            "languages",
            "highlights"
        ],
        []
    );


    const progress = (steps.indexOf(currentStep) / (steps.length - 1)) * 100;

    const validateStep = () => {
        const newErrors = {};

        switch (currentStep) {
            case "template":
                if (!selectedTemplate) {
                    newErrors.template = "Please select a template.";
                }
                break;

            case "basic":
                if (!formData.title.trim()) {
                    newErrors.title = "Resume title is required.";
                }

                if (!formData.profession.trim()) {
                    newErrors.profession = "Profession is required.";
                }
                break;

            case "personal":

                if (!formData.personalInfo.firstName.trim()) {
                    newErrors.firstName = "First name is required.";
                }

                if (!formData.personalInfo.lastName.trim()) {
                    newErrors.lastName = "Last name is required.";
                }

                if (!formData.personalInfo.email.trim()) {

                    newErrors.email = "Email is required.";

                } else {

                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailRegex.test(formData.personalInfo.email)) {
                        newErrors.email = "Please enter a valid email.";
                    }

                }

                break;



            default:
                break;
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleNext = (nextStep) => {
        if (validateStep()) {
            setCurrentStep(nextStep);
        }
    };


    const handleCreateResume = async () => {

    const resumeData = {
        ...formData,
        template: selectedTemplate,
    };

    const result = await dispatch(CreateResume(resumeData));

    if (CreateResume.fulfilled.match(result)) {

        toast.success("Resume created successfully!");

        navigate(`/preview/${result.payload.resume._id}`);

    } else {

        toast.error(result.payload || "Failed to create resume.");

    }

};

    const renderStep = () => {

        switch (currentStep) {


            case "template":
                return (
                    <TemplateStep
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                        errors={errors}
                        setErrors={setErrors}
                        onPrevious={() => navigate("/dashboard")}
                        onNext={() => handleNext("basic")}
                    />
                );
            case "basic":
                return (
                    <BasicInfoStep
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                        onPrevious={() => setCurrentStep("template")}
                        onNext={() => handleNext("personal")}
                    />
                );

            case "personal":
                return (
                    <PersonalStep
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                        onPrevious={() => setCurrentStep("basic")}
                        onNext={() => handleNext("summary")}
                    />
                );

            case "summary":
                return (
                    <SummaryStep
                        formData={formData}
                        setFormData={setFormData}
                        onPrevious={() => setCurrentStep("personal")}
                        onSkip={() => setCurrentStep("experience")}
                        onNext={() => setCurrentStep("experience")}
                    />
                );

            case "experience":
                return (
                    <ExperienceStep
                        formData={formData}
                        setFormData={setFormData}
                        onPrevious={() => setCurrentStep("summary")}
                        onSkip={() => setCurrentStep("projects")}
                        onNext={() => setCurrentStep("projects")}
                    />
                );

            case "projects":
                return (
                    <ProjectsStep
                        formData={formData}
                        setFormData={setFormData}
                        onPrevious={() => setCurrentStep("experience")}
                        onSkip={() => setCurrentStep("skills")}
                        onNext={() => setCurrentStep("skills")}
                    />
                );

            case "skills":
                return (
                    <SkillsStep
                        formData={formData}
                        setFormData={setFormData}
                        onPrevious={() => setCurrentStep("projects")}
                        onSkip={() => setCurrentStep("education")}
                        onNext={() => setCurrentStep("education")}
                    />
                );


            case "education":
                return (
                    <EducationStep
                        formData={formData}
                        setFormData={setFormData}
                        onPrevious={() => setCurrentStep("skills")}
                        onNext={() => setCurrentStep("certifications")}
                    />
                );

            case "certifications":
                return (
                    <CertificationStep
                        formData={formData}
                        setFormData={setFormData}
                        onPrevious={() => setCurrentStep("education")}
                        onSkip={() => setCurrentStep("languages")}
                        onNext={() => setCurrentStep("languages")}
                    />
                );

            case "languages":
                return (
                    <LanguageStep
                        formData={formData}
                        setFormData={setFormData}
                        onPrevious={() => setCurrentStep("certifications")}
                        onSkip={() => setCurrentStep("highlights")}
                        onNext={() => setCurrentStep("highlights")}
                    />
                );

            case "highlights":
                return (
                    <HighlightsStep
                        formData={formData}
                        setFormData={setFormData}
                        loading={loading}
                        onPrevious={() => setCurrentStep("languages")}
                        onNext={handleCreateResume}
                    />
                );

                <button
    disabled={loading}
>
    {loading ? "Creating..." : "Create Resume"}
</button>

            default:
                return null;

        }

    };

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="max-w-5xl mx-auto py-10 px-6">

                <div className="mb-8">

                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                        <span>
                            Step {steps.indexOf(currentStep) + 1} of {steps.length}
                        </span>

                        <span>
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {renderStep()}
                </div>

            </div>
        </div>

    );

};

export default ResumeBuilder;