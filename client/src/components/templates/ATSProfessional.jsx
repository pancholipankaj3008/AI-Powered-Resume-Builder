import { useEffect, useState } from "react";

const ATSProfessional = ({ resume }) => {
    const {
        personalInfo,
        summary,
        education,
        experience,
        projects,
        skills,
        certifications,
        languages,
    } = resume;

    const formatMonthYear = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    const hasExperience = experience?.some(
        (exp) =>
            exp.company?.trim() ||
            exp.position?.trim() ||
            exp.location?.trim() ||
            exp.description?.some((item) => item.trim()) ||
            exp.startDate ||
            exp.endDate
    );

    const hasProjects = projects?.some(
        (project) =>
            project.title?.trim() ||
            project.techStack?.length > 0 ||
            project.description?.some((item) => item.trim()) ||
            project.github?.trim() ||
            project.liveDemo?.trim()
    );

    const hasEducation = education?.some(
        (edu) =>
            edu.school?.trim() ||
            edu.degree?.trim() ||
            edu.fieldOfStudy?.trim() ||
            edu.grade?.trim() ||
            edu.description?.trim() ||
            edu.startDate ||
            edu.endDate
    );

    const hasSkills = skills?.some((skill) => skill.trim());

    const hasCertifications = certifications?.some(
        (cert) =>
            cert.title?.trim() ||
            cert.issuer?.trim() ||
            cert.issueDate
    );

    const hasLanguages = languages?.some(
        (lang) =>
            lang.language?.trim() ||
            lang.proficiency?.trim()
    );

    const hasHighlights = resume.achievements?.some(
        (item) => item.trim()
    );

    const hasSummary = summary?.trim();

    const withProtocol = (url) =>
        /^https?:\/\//i.test(url) ? url : `https://${url}`;

    return (
        <div className="max-w-4xl mx-auto bg-white text-slate-800 p-8 md:p-12 shadow-md font-sans leading-relaxed tracking-normal select-text">
            
            {/* Header: Optimized for clear parsing hierarchy */}
            <div className="text-center pb-5 border-b border-slate-200">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                    {personalInfo?.firstName} {personalInfo?.lastName}
                </h1>
                
                {resume.profession && (
                    <p className="text-sm font-semibold tracking-wider text-slate-600 mt-1 uppercase">
                        {resume.profession}
                    </p>
                )}

                {/* Contact metadata array grouped securely */}
                <div className="text-xs text-slate-600 mt-3 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 font-medium">
                    <span>
                        {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}
                    </span>
                    
                    {personalInfo?.email && (
                        <>
                            <span className="text-slate-300 hidden sm:inline">|</span>
                            <a href={`mailto:${personalInfo.email}`} className="text-slate-800 hover:text-blue-700 transition-colors font-semibold">{personalInfo.email}</a>
                        </>
                    )}

                    {personalInfo?.phone && (
                        <>
                            <span className="text-slate-300">|</span>
                            <span className="font-semibold">{personalInfo.phone}</span>
                        </>
                    )}

                    {/* Social/Portfolio Links mapping */}
                    {[
                        { label: "Portfolio", val: personalInfo?.portfolio },
                        { label: "LinkedIn", val: personalInfo?.linkedin },
                        { label: "GitHub", val: personalInfo?.github },
                        { label: "Website", val: personalInfo?.website }
                    ].map((link, idx) => link.val && (
                        <span key={idx} className="flex items-center gap-x-2">
                            <span className="text-slate-300">|</span>
                            <a href={withProtocol(link.val)} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-blue-700 transition-colors underline font-medium decoration-slate-300 hover:decoration-blue-700">
                                {link.label}
                            </a>
                        </span>
                    ))}
                </div>
            </div>

            {/* Professional Summary */}
            {hasSummary && (
                <section className="mt-6">
                    <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-800 pb-0.5 mb-2.5">
                        Professional Summary
                    </h2>
                    <p className="text-[13.5px] text-slate-700 text-justify leading-normal">
                        {summary}
                    </p>
                </section>
            )}

            {/* Technical Skills: ATS reads multi-row text line strings perfectly */}
            {hasSkills && (
                <section className="mt-6">
                    <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-800 pb-0.5 mb-2.5">
                        Technical Skills
                    </h2>
                    <p className="text-[13.5px] text-slate-700 leading-normal tracking-wide">
                        {skills.join("  •  ")}
                    </p>
                </section>
            )}

            {/* Professional Experience */}
            {hasExperience && (
                <section className="mt-6">
                    <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-800 pb-0.5 mb-3">
                        Professional Experience
                    </h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-baseline flex-wrap gap-x-3">
                                <h3 className="font-bold text-[14px] text-slate-900">
                                    {exp.position} <span className="font-normal text-slate-400">|</span> <span className="font-semibold text-slate-700">{exp.company}</span>
                                </h3>
                                <span className="text-xs font-semibold text-slate-600 whitespace-nowrap uppercase">
                                    {formatMonthYear(exp.startDate)} — {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                </span>
                            </div>
                            
                            {exp.location && (
                                <p className="text-xs text-slate-500 font-medium mt-0.5 italic">{exp.location}</p>
                            )}

                            <ul className="list-disc ml-4 mt-1.5 space-y-1 text-[13.5px] text-slate-700 plan-list">
                                {(exp.description || []).map((item, i) => item.trim() && (
                                    <li key={i} className="pl-0.5">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Technical Projects */}
            {hasProjects && (
                <section className="mt-6">
                    <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-800 pb-0.5 mb-3">
                        Key Projects
                    </h2>
                    {projects.map((project, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-baseline flex-wrap gap-x-2">
                                <h3 className="font-bold text-[14px] text-slate-900">
                                    {project.title}
                                </h3>
                                
                                {/* Live links tracking info rendered gracefully */}
                                {(project.github || project.liveDemo) && (
                                    <div className="text-xs space-x-2 font-medium">
                                        {project.github && (
                                            <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-700 underline decoration-slate-300">GitHub</a>
                                        )}
                                        {project.github && project.liveDemo && <span className="text-slate-300">|</span>}
                                        {project.liveDemo && (
                                            <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-700 underline decoration-slate-300">Live Demo</a>
                                        )}
                                    </div>
                                )}
                            </div>

                            {(project.techStack || []).length > 0 && (
                                <p className="text-xs text-slate-600 mt-0.5">
                                    <span className="font-semibold text-slate-700">Technologies:</span> {project.techStack.join(", ")}
                                </p>
                            )}

                            <ul className="list-disc ml-4 mt-1.5 space-y-1 text-[13.5px] text-slate-700">
                                {(project.description || []).map((item, i) => item.trim() && (
                                    <li key={i} className="pl-0.5">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Academic Education */}
            {hasEducation && (
                <section className="mt-6">
                    <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-800 pb-0.5 mb-3">
                        Education
                    </h2>
                    {education.map((edu, index) => (
                        <div key={index} className="mb-3.5 last:mb-0">
                            <div className="flex justify-between items-baseline flex-wrap gap-x-3">
                                <h3 className="font-bold text-[14px] text-slate-900">
                                    {edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                                </h3>
                                <span className="text-xs font-semibold text-slate-600 whitespace-nowrap uppercase">
                                    {formatMonthYear(edu.startDate)} — {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-[13px] text-slate-600 mt-0.5 font-medium">
                                <span>{edu.school}</span>
                                {edu.grade && <span className="text-xs bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">Grade: {edu.grade}</span>}
                            </div>
                            {edu.description && (
                                <p className="text-[13px] text-slate-600 mt-1 italic">{edu.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications */}
            {hasCertifications && (
                <section className="mt-6">
                    <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-800 pb-0.5 mb-3">
                        Certifications
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {certifications.map((cert, index) => (
                            <div key={index} className="text-[13.5px] text-slate-700 border-l-2 border-slate-200 pl-2.5 py-0.5">
                                <div className="flex justify-between items-baseline gap-x-2">
                                    <span className="font-bold text-slate-900">{cert.title}</span>
                                    {cert.issueDate && (
                                        <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">{formatMonthYear(cert.issueDate)}</span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 font-medium">{cert.issuer}{cert.credentialId && ` • ID: ${cert.credentialId}`}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages & Highlights Meta Section */}
            {(hasLanguages || hasHighlights) && (
                <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 mt-6 pt-2">
                    {/* Languages Wrapper */}
                    {hasLanguages && (
                        <section>
                            <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-800 pb-0.5 mb-2.5">
                                Languages
                            </h2>
                            <ul className="list-disc ml-4 space-y-1 text-[13.5px] text-slate-700">
                                {languages.map((lang, index) => (
                                    <li key={index}>
                                        <span className="font-semibold text-slate-900">{lang.language}</span> — <span className="text-xs text-slate-500 font-medium italic">{lang.proficiency}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Key Achievements/Highlights Wrapper */}
                    {hasHighlights && (
                        <section className="mt-6 md:mt-6">
                            <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-800 pb-0.5 mb-2.5">
                                Key Highlights
                            </h2>
                            <ul className="list-disc ml-4 space-y-1 text-[13.5px] text-slate-700">
                                {resume.achievements.map((item, index) => item.trim() && (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default ATSProfessional;