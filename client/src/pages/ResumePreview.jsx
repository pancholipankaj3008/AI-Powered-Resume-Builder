import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteResume } from "../redux/resume/resumeSlice";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";


import {
    GetResumeById,
    UpdateResume,
} from "../redux/resume/resumeSlice";

import ATSProfessional from "../components/templates/ATSProfessional";
import Modern from "../components/templates/Modern";
import Minimal from "../components/templates/Minimal";
import ExecutiveCorporate from "../components/templates/ExecutiveCorporate";
import { useRef } from "react";

const ResumePreview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const resumeRef = useRef();

    const { selectedResume, loading } = useSelector(
        (state) => state.resume
    );

    useEffect(() => {
        dispatch(GetResumeById(id));
    }, [dispatch, id]);

    const templates = {
        "ats-professional": ATSProfessional,
        modern: Modern,
        minimal: Minimal,
        "executive-corporate": ExecutiveCorporate,
    };

    const templateOptions = [
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

    const handleTemplateChange = async (e) => {
        const template = e.target.value;

        await dispatch(
            UpdateResume({
                id: selectedResume._id,
                resumeData: {
                    template,
                },
            })
        );

        dispatch(GetResumeById(selectedResume._id));
    };

    const handleDelete = async () => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    await dispatch(DeleteResume(selectedResume._id));

    navigate("/dashboard");
};

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Loading...
            </div>
        );
    }

    if (!selectedResume) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Resume not found.
            </div>
        );
    }

    const downloadPDF = async () => {
   const input = resumeRef.current;

    if (!input) return;

    try {
        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false,
            scrollX: 0,
            scrollY: -window.scrollY,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            position,
            imgWidth,
            imgHeight
        );

        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;

            pdf.addPage();

            pdf.addImage(
                imgData,
                "PNG",
                0,
                position,
                imgWidth,
                imgHeight
            );

            heightLeft -= pdfHeight;
        }

        const fileName =
            `${selectedResume?.title || "Resume"}`
                .replace(/\s+/g, "_") + ".pdf";

        pdf.save(fileName);
    } catch (error) {
        console.error("PDF Download Error:", error);
    }
}

    const Template =
        templates[selectedResume.template] || ATSProfessional;

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                <h1 className="text-3xl font-bold">
                    Resume Preview
                </h1>

                <div className="flex gap-3 items-center">

                    <select
                        value={selectedResume.template}
                        onChange={handleTemplateChange}
                        className="border rounded px-4 py-2"
                    >
                        {templateOptions.map((template) => (
                            <option
                                key={template.id}
                                value={template.id}
                            >
                                {template.name}
                            </option>
                        ))}
                    </select>

                    <Link
                        to={`/resume/${selectedResume._id}`}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        Edit Resume
                    </Link>

                    <button
    onClick={handleDelete}
    className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
>
    Delete Resume
</button>

                    <button onClick={downloadPDF}
                        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                    >
                        Download PDF
                    </button>

                </div>

            </div>

            {/* Resume */}

            <div ref={resumeRef} className="bg-white shadow rounded">

                <Template resume={selectedResume} />

            </div>

        </div>
    );
};

export default ResumePreview;