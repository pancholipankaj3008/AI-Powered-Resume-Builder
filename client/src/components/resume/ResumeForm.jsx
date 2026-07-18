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

// console.log(formData);
    // };

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


    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <div>

                <label className="block mb-2 font-medium">
                    Resume Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    placeholder="Resume Title"
                />

            </div>

            <div>

                <label className="block mb-2 font-medium">
                    Profession
                </label>

                <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    placeholder="Software Developer"
                />

            </div>

                <PersonalInfo
    formData={formData}
    setFormData={setFormData}
/>
    <div>

                <Summary
    formData={formData}
    setFormData={setFormData}
/>
            </div>
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

            <button
    type="submit"
    disabled={loading}
    className="bg-blue-600 text-white px-6 py-3 rounded"
>

    {loading
        ? "Saving..."
        : id === "new"
        ? "Create Resume"
        : "Update Resume"}

</button>

        </form>
    );
};

export default ResumeForm;