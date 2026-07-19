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

            default:
                return null;

        }

    };

    return (

        <div className="min-h-screen bg-[#07080a] text-[#e4e6eb] font-sans relative overflow-hidden">

            {/* Ambient gradient backdrop */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] bg-[#fbbf24] rounded-full opacity-[0.06] blur-[150px]"></div>
                <div className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] bg-[#d97706] rounded-full opacity-[0.07] blur-[150px]"></div>
            </div>

            {/* Tech grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(circle_at_center,#000_60%,transparent_100%)] opacity-70 pointer-events-none z-0"></div>

            <div className="max-w-5xl mx-auto py-10 px-6 relative z-10">

                <div className="mb-8">

                    <div className="flex justify-between items-center text-sm text-gray-400 mb-2 font-medium">
                        <span>
                            Step {steps.indexOf(currentStep) + 1} of {steps.length}
                        </span>

                        <span className="text-[#fbbf24] font-bold">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden border border-white/5">

                        <div
                            className="h-full bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] transition-all duration-300 shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                </div>

                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        {renderStep()}
                    </div>
                </div>

            </div>
        </div>

    );

};

export default ResumeBuilder;