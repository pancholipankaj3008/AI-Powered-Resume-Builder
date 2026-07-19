import React from "react";

const ModernProfessional = ({ resume }) => {
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

    const initials = `${personalInfo?.firstName?.[0] || ""}${personalInfo?.lastName?.[0] || ""}`;

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden font-sans flex flex-col md:flex-row selection:bg-blue-100 selection:text-blue-900">
            
            {/* Left Sidebar (Blue Accent / Subtle Off-White Background) */}
            <aside className="md:w-[32%] bg-slate-50 border-r border-slate-100 p-8 md:p-10 flex flex-col">
                
                {/* Profile Circle with Initials */}
                <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-md shadow-blue-600/10">
                    {initials}
                </div>

                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    {personalInfo?.firstName} <span className="text-blue-600">{personalInfo?.lastName}</span>
                </h1>

                <p className="text-slate-500 text-[14px] mt-2 font-medium tracking-wide border-b border-slate-200 pb-4">
                    {resume.profession}
                </p>

                {/* Contact Section */}
                <div className="mt-6">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600 mb-3">
                        Contact
                    </h2>
                    <ul className="text-[13px] space-y-2.5 text-slate-600 break-words">
                        {personalInfo?.email && (
                            <li className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                {personalInfo.email}
                            </li>
                        )}
                        {personalInfo?.phone && (
                            <li className="flex items-center gap-2">
                                {personalInfo.phone}
                            </li>
                        )}
                        {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                            <li className="flex items-center gap-2">
                                {[personalInfo?.city, personalInfo?.state, personalInfo?.country]
                                    .filter(Boolean)
                                    .join(", ")}
                            </li>
                        )}
                        
                        {/* Interactive Dynamic Hyperlink Mapping */}
                        {[
                            { name: "LinkedIn", url: personalInfo?.linkedin },
                            { name: "GitHub", url: personalInfo?.github },
                            { name: "Portfolio", url: personalInfo?.portfolio },
                            { name: "Website", url: personalInfo?.website }
                        ].map((link, idx) => link.url && (
                            <li key={idx}>
                                <a
                                    href={withProtocol(link.url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4 transition-colors"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Skills Component */}
                {hasSkills && (
                    <div className="mt-8">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600 mb-3">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.map((skill, index) => skill.trim() && (
                                <span
                                    key={index}
                                    className="text-[12px] bg-blue-50 border border-blue-100 rounded px-2.5 py-1 text-blue-700 font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages Component */}
                {hasLanguages && (
                    <div className="mt-8">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600 mb-3">
                            Languages
                        </h2>
                        <ul className="text-[13px] space-y-2 text-slate-600">
                            {languages.map((lang, index) => lang.language?.trim() && (
                                <li key={index} className="flex justify-between items-center border-b border-slate-200/60 pb-1.5 last:border-0">
                                    <span className="font-medium text-slate-700">{lang.language}</span>
                                    <span className="text-[11px] text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">{lang.proficiency}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Certifications Component */}
                {hasCertifications && (
                    <div className="mt-8">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600 mb-3">
                            Certifications
                        </h2>
                        <ul className="text-[13px] space-y-3.5 text-slate-600">
                            {certifications.map((cert, index) => cert.title?.trim() && (
                                <li key={index} className="leading-tight">
                                    <p className="font-semibold text-slate-800">{cert.title}</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{cert.issuer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>

            {/* Main Content Area */}
            <main className="md:w-[68%] p-8 md:p-10 bg-white flex flex-col justify-between">
                <div>
                    {/* Summary Section */}
                    {hasSummary && (
                        <section className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Professional Summary</h2>
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </div>
                            <p className="text-[14px] text-slate-600 leading-relaxed text-justify">
                                {summary}
                            </p>
                        </section>
                    )}

                    {/* Experience Section */}
                    {hasExperience && (
                        <section className="mb-8">
                            <div className="flex items-center gap-3 mb-5">
                                <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Work History</h2>
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </div>
                            
                            <div className="space-y-5">
                                {experience.map((exp, index) => (
                                    <div key={index} className="group">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1.5">
                                            <div>
                                                <h3 className="font-bold text-[15px] text-slate-800 group-hover:text-blue-600 transition-colors">
                                                    {exp.position}
                                                </h3>
                                                <p className="text-[13px] font-semibold text-slate-500 mt-0.5">
                                                    {exp.company} {exp.location && <span className="text-slate-400 font-normal">| {exp.location}</span>}
                                                </p>
                                            </div>
                                            <span className="text-[12px] font-medium text-slate-400 whitespace-nowrap">
                                                {formatMonthYear(exp.startDate)} - {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                            </span>
                                        </div>
                                        
                                        <ul className="list-disc ml-4 space-y-1 text-[13px] text-slate-600 marker:text-blue-400">
                                            {(exp.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="pl-0.5">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects Section */}
                    {hasProjects && (
                        <section className="mb-8">
                            <div className="flex items-center gap-3 mb-5">
                                <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Key Projects</h2>
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </div>

                            <div className="space-y-5">
                                {projects.map((project, index) => (
                                    <div key={index}>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1.5">
                                            <div className="flex items-center flex-wrap gap-2">
                                                {project.github || project.liveDemo ? (
                                                    <a
                                                        href={withProtocol(project.github || project.liveDemo)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-bold text-[15px] text-slate-800 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                                                    >
                                                        {project.title}
                                                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                ) : (
                                                    <h3 className="font-bold text-[15px] text-slate-800">
                                                        {project.title}
                                                    </h3>
                                                )}
                                            </div>
                                        </div>

                                        {(project.techStack || []).length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1 mb-2">
                                                {project.techStack.map((tech, i) => (
                                                    <span key={i} className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <ul className="list-disc ml-4 space-y-1 text-[13px] text-slate-600 marker:text-blue-400">
                                            {(project.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="pl-0.5">{item}</li>
                                            ))}
                                        </ul>

                                        {(project.github || project.liveDemo) && (
                                            <div className="flex gap-3 mt-2 text-[12px] font-semibold">
                                                {project.github && (
                                                    <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Code Repository</a>
                                                )}
                                                {project.liveDemo && (
                                                    <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Live Application</a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education Section */}
                    {hasEducation && (
                        <section className="mb-8">
                            <div className="flex items-center gap-3 mb-5">
                                <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Education</h2>
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </div>

                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                            <h3 className="font-bold text-[14px] text-slate-800">
                                                {edu.degree}{edu.fieldOfStudy && <span className="font-medium text-slate-500"> in {edu.fieldOfStudy}</span>}
                                            </h3>
                                            <span className="text-[12px] font-medium text-slate-400 whitespace-nowrap">
                                                {formatMonthYear(edu.startDate)} - {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-slate-600 mt-0.5">{edu.school}</p>
                                        {edu.grade && <p className="text-[12px] text-blue-600 font-semibold mt-0.5">Grade/GPA: {edu.grade}</p>}
                                        {edu.description && <p className="text-[13px] text-slate-500 mt-1.5">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements Section */}
                    {hasHighlights && (
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Achievements</h2>
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </div>

                            <ul className="space-y-1.5 text-[13px] text-slate-600 list-none">
                                {resume.achievements.map((item, index) => item.trim() && (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ModernProfessional;