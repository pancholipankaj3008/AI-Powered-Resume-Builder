import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Languages from "./Languages";
import Achievements from "./Achievements";
import Summary from "./Summary";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FileText, Briefcase, Loader2, Save } from "lucide-react";

import {
    CreateResume,
    GetResumeById,
    UpdateResume,
    ResetResumeState,
} from "../../redux/resume/resumeSlice";


const ResumeForm = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const selectedTemplate =
        searchParams.get("template") || "ats-professional";

    const { id } = useParams();

    const { loading, success, selectedResume } = useSelector(
        (state) => state.resume
    );

    const [formData, setFormData] = useState({
        title: "",
        profession: "",
        template: selectedTemplate,
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
                proficiency: "",
            },
        ],

        achievements: [""],
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (id === "new") {

            dispatch(CreateResume(formData));

        } else {

            dispatch(
                UpdateResume({
                    id,
                    resumeData: formData,
                })
            );

        }

    };

    useEffect(() => {

        if (id && id !== "new") {
            dispatch(GetResumeById(id));
        }

    }, [dispatch, id]);

    useEffect(() => {

        if (selectedResume && id !== "new") {

            setFormData(selectedResume);

        }

    }, [selectedResume, id]);



    useEffect(() => {

        if (success) {

            dispatch(ResetResumeState());

            navigate("/dashboard");

        }

    }, [success, dispatch, navigate]);


    const inputClass =
        "w-full bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner";

    const labelClass =
        "block text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1";

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 pb-8"
        >

            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

                <div className="relative z-10">

                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1">
                        Resume Basics
                    </h2>
                    <p className="text-sm text-gray-400 font-medium mb-6">
                        Give this resume a name and target role to get started.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className={labelClass}>Resume Title</label>
                            <div className="relative">
                                <FileText className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Software Engineer Resume"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Profession</label>
                            <div className="relative">
                                <Briefcase className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                <input
                                    type="text"
                                    name="profession"
                                    value={formData.profession}
                                    onChange={handleChange}
                                    placeholder="Software Developer"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <PersonalInfo
                formData={formData}
                setFormData={setFormData}
            />

            <Summary
                formData={formData}
                setFormData={setFormData}
            />

            <Education
                formData={formData}
                setFormData={setFormData}
            />

            <Experience
                formData={formData}
                setFormData={setFormData}
            />

            <Projects
                formData={formData}
                setFormData={setFormData}
            />

            <Skills
                formData={formData}
                setFormData={setFormData}
            />

            <Certifications
                formData={formData}
                setFormData={setFormData}
            />

            <Languages
                formData={formData}
                setFormData={setFormData}
            />

            <Achievements
                formData={formData}
                setFormData={setFormData}
            />

            <div className="sticky bottom-4 z-20 flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-8 py-3.5 rounded-xl text-sm shadow-[0_10px_40px_rgba(251,191,36,0.35)] hover:shadow-[0_10px_50px_rgba(251,191,36,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                    ) : (
                        <Save className="w-4 h-4" strokeWidth={2.5} />
                    )}
                    {loading
                        ? "Saving..."
                        : id === "new"
                        ? "Create Resume"
                        : "Update Resume"}
                </button>
            </div>

        </form>
    );
};

export default ResumeForm;