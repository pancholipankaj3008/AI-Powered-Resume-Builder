import React from "react";

const ATSClassic = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 font-sans text-slate-900 selection:bg-slate-200">
            
            {/* Header / Central Contact Wrapper */}
            <header className="text-center border-b border-slate-900 pb-5 mb-6">
                <h1 className="text-3xl font-bold tracking-tight uppercase text-slate-900">
                    {personalInfo?.firstName} {personalInfo?.lastName}
                </h1>
                <p className="text-[14px] font-medium tracking-wide text-slate-700 mt-1 uppercase">
                    {resume.profession}
                </p>
                
                {/* Contact & Links Inline Breakdown for ATS Parsing */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[13px] text-slate-600 mt-3 font-mono">
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.email && (
                        <>
                            <span className="text-slate-300">|</span>
                            <span>{personalInfo.email}</span>
                        </>
                    )}
                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                        <>
                            <span className="text-slate-300">|</span>
                            <span>
                                {[personalInfo?.city, personalInfo?.state, personalInfo?.country]
                                    .filter(Boolean)
                                    .join(", ")}
                            </span>
                        </>
                    )}
                </div>

                {/* Hyperlinks Grid Line */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[12px] text-slate-800 mt-2 font-medium underline decoration-slate-400 decoration-1 underline-offset-2">
                    {[
                        { name: "LinkedIn", url: personalInfo?.linkedin },
                        { name: "GitHub", url: personalInfo?.github },
                        { name: "Portfolio", url: personalInfo?.portfolio },
                        { name: "Website", url: personalInfo?.website }
                    ].map((link, idx) => link.url && (
                        <React.Fragment key={idx}>
                            {idx > 0 && <span className="text-slate-300 no-underline">|</span>}
                            <a href={withProtocol(link.url)} target="_blank" rel="noopener noreferrer">
                                {link.name}
                            </a>
                        </React.Fragment>
                    ))}
                </div>
            </header>

            {/* Profile Summary */}
            {hasSummary && (
                <section className="mb-6">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                        Professional Summary
                    </h2>
                    <p className="text-[13.5px] text-slate-800 leading-relaxed text-justify">
                        {summary}
                    </p>
                </section>
            )}

            {/* Core Competencies / Skills Section */}
            {hasSkills && (
                <section className="mb-6">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                        Core Competencies
                    </h2>
                    <p className="text-[13.5px] text-slate-800 leading-relaxed font-mono tracking-tight">
                        {skills.filter(skill => skill.trim()).join(" • ")}
                    </p>
                </section>
            )}

            {/* Professional Experience */}
            {hasExperience && (
                <section className="mb-6">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-3">
                        Professional Experience
                    </h2>
                    
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-[14px] text-slate-900">
                                        {exp.position} <span className="font-normal text-slate-500">— {exp.company}</span>
                                    </h3>
                                    <span className="text-[12.5px] font-medium text-slate-700 whitespace-nowrap font-mono">
                                        {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                    </span>
                                </div>
                                {exp.location && (
                                    <p className="text-[12px] italic text-slate-500 mb-1.5">{exp.location}</p>
                                )}
                                
                                <ul className="list-disc ml-5 space-y-1 text-[13.5px] text-slate-800 marker:text-slate-900">
                                    {(exp.description || []).map((item, i) => item.trim() && (
                                        <li key={i} className="pl-0.5 text-justify">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Technical Projects */}
            {hasProjects && (
                <section className="mb-6">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-3">
                        Key Projects
                    </h2>

                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="flex items-center gap-1.5">
                                        {project.github || project.liveDemo ? (
                                            <a
                                                href={withProtocol(project.github || project.liveDemo)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-bold text-[14px] text-slate-900 hover:underline inline-flex items-center gap-1"
                                            >
                                                {project.title}
                                            </a>
                                        ) : (
                                            <h3 className="font-bold text-[14px] text-slate-900">
                                                {project.title}
                                            </h3>
                                        )}
                                        
                                        {(project.techStack || []).length > 0 && (
                                            <span className="text-[12px] text-slate-500 font-normal italic">
                                                ({project.techStack.join(", ")})
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex gap-2 text-[12px] font-mono text-slate-600">
                                        {project.github && (
                                            <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="underline">Source</a>
                                        )}
                                        {project.liveDemo && (
                                            <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="underline">Live</a>
                                        )}
                                    </div>
                                </div>

                                <ul className="list-disc ml-5 space-y-1 text-[13.5px] text-slate-800 marker:text-slate-900">
                                    {(project.description || []).map((item, i) => item.trim() && (
                                        <li key={i} className="pl-0.5 text-justify">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education History */}
            {hasEducation && (
                <section className="mb-6">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-3">
                        Education History
                    </h2>

                    <div className="space-y-3">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[14px] text-slate-900">
                                        {edu.degree}{edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                                    </h3>
                                    <span className="text-[12.5px] font-medium text-slate-700 whitespace-nowrap font-mono">
                                        {formatMonthYear(edu.startDate)} – {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[13px] text-slate-600 mt-0.5">
                                    <span>{edu.school}</span>
                                    {edu.grade && <span className="font-mono">Grade: {edu.grade}</span>}
                                </div>
                                {edu.description && <p className="text-[13px] text-slate-500 mt-1 italic">{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Bottom Supplementary Row (Languages & Certifications combined to save space) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-2 border-t border-slate-200">
                {/* Certifications Block */}
                {hasCertifications && (
                    <div>
                        <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-900 mb-2">
                            Certifications
                        </h2>
                        <ul className="text-[13px] space-y-1 text-slate-700 list-none">
                            {certifications.map((cert, index) => cert.title?.trim() && (
                                <li key={index}>
                                    <strong>{cert.title}</strong> — <span className="text-slate-500">{cert.issuer}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Languages Block */}
                {hasLanguages && (
                    <div>
                        <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-900 mb-2">
                            Languages
                        </h2>
                        <p className="text-[13px] text-slate-700 font-mono">
                            {languages
                                .filter(lang => lang.language?.trim())
                                .map(lang => `${lang.language} (${lang.proficiency || 'Native'})`)
                                .join(", ")}
                        </p>
                    </div>
                )}
            </div>

            {/* Key Achievements Grid Row */}
            {hasHighlights && (
                <section className="mt-6">
                    <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-900 mb-2">
                        Key Accomplishments
                    </h2>
                    <ul className="list-disc ml-5 space-y-1 text-[13px] text-slate-700">
                        {resume.achievements.map((item, index) => item.trim() && (
                            <li key={index} className="pl-0.5">{item}</li>
                        ))}
                    </ul>
                </section>
            )}

        </div>
    );
};

export default ATSClassic;