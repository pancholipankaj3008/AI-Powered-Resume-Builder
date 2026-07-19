import React from "react";

const MinimalElegant = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 font-sans text-slate-800 tracking-normal selection:bg-slate-100 selection:text-slate-900">
            
            {/* Elegant Premium Top Header */}
            <header className="mb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-100">
                    <div>
                        <h1 className="text-4xl font-light tracking-tight text-slate-900">
                            {personalInfo?.firstName} <span className="font-medium text-slate-950">{personalInfo?.lastName}</span>
                        </h1>
                        <p className="text-[13px] font-medium tracking-[0.2em] text-slate-400 mt-2 uppercase">
                            {resume.profession}
                        </p>
                    </div>

                    {/* Meta Info Grid */}
                    <div className="text-[13px] text-slate-500 space-y-1 md:text-right font-light">
                        {personalInfo?.phone && <p>{personalInfo.phone}</p>}
                        {personalInfo?.email && <p className="font-normal text-slate-600">{personalInfo.email}</p>}
                        {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                            <p>
                                {[personalInfo?.city, personalInfo?.state, personalInfo?.country]
                                    .filter(Boolean)
                                    .join(", ")}
                            </p>
                        )}
                    </div>
                </div>

                {/* Hyperlinks Sub-row */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium text-slate-400 mt-4">
                    {[
                        { name: "LinkedIn", url: personalInfo?.linkedin },
                        { name: "GitHub", url: personalInfo?.github },
                        { name: "Portfolio", url: personalInfo?.portfolio },
                        { name: "Website", url: personalInfo?.website }
                    ].map((link, idx) => link.url && (
                        <a
                            key={idx}
                            href={withProtocol(link.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-slate-800 transition-colors underline underline-offset-4 decoration-slate-200 hover:decoration-slate-400"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </header>

            {/* Structured Content Grid Layout */}
            <div className="space-y-10">
                
                {/* Summary Section */}
                {hasSummary && (
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 md:pt-0.5">
                                Profile
                            </h2>
                        </div>
                        <div className="md:col-span-3">
                            <p className="text-[14px] text-slate-600 leading-relaxed text-justify font-light">
                                {summary}
                            </p>
                        </div>
                    </section>
                )}

                {/* Experience Segment */}
                {hasExperience && (
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 md:pt-0.5">
                                Experience
                            </h2>
                        </div>
                        <div className="md:col-span-3 space-y-8">
                            {experience.map((exp, index) => (
                                <div key={index} className="group">
                                    <div className="flex justify-between items-baseline gap-4 mb-1">
                                        <h3 className="font-medium text-[15px] text-slate-900">
                                            {exp.position}
                                        </h3>
                                        <span className="text-[12px] text-slate-400 font-light whitespace-nowrap">
                                            {formatMonthYear(exp.startDate)} — {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-slate-400 font-medium mb-3">
                                        {exp.company} {exp.location && <span>• {exp.location}</span>}
                                    </p>
                                    <ul className="space-y-2 text-[13.5px] text-slate-600 list-none font-light">
                                        {(exp.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="flex items-start gap-3 text-justify">
                                                <span className="text-slate-300 select-none md:pt-0.5">—</span>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects Showcase */}
                {hasProjects && (
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 md:pt-0.5">
                                Projects
                            </h2>
                        </div>
                        <div className="md:col-span-3 space-y-8">
                            {projects.map((project, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline gap-4 mb-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {project.github || project.liveDemo ? (
                                                <a
                                                    href={withProtocol(project.github || project.liveDemo)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-medium text-[15px] text-slate-900 hover:text-slate-600 transition-colors underline underline-offset-4 decoration-slate-200"
                                                >
                                                    {project.title}
                                                </a>
                                            ) : (
                                                <h3 className="font-medium text-[15px] text-slate-900">
                                                    {project.title}
                                                </h3>
                                            )}
                                        </div>
                                        <div className="flex gap-3 text-[11px] text-slate-400">
                                            {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-800">Code</a>}
                                            {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-800">Live</a>}
                                        </div>
                                    </div>

                                    {(project.techStack || []).length > 0 && (
                                        <p className="text-[11px] text-slate-400 tracking-wider font-light mb-3 italic">
                                            Frameworks: {project.techStack.join(", ")}
                                        </p>
                                    )}

                                    <ul className="space-y-1.5 text-[13.5px] text-slate-600 list-none font-light">
                                        {(project.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="text-slate-300 select-none">—</span>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {hasEducation && (
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 md:pt-0.5">
                                Education
                            </h2>
                        </div>
                        <div className="md:col-span-3 space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                    <div>
                                        <h3 className="font-medium text-[14px] text-slate-900">
                                            {edu.degree}{edu.fieldOfStudy && <span className="text-slate-500 font-light"> in {edu.fieldOfStudy}</span>}
                                        </h3>
                                        <p className="text-[13px] text-slate-400 font-light mt-0.5">{edu.school}</p>
                                        {edu.grade && <p className="text-[12px] text-slate-500 font-medium mt-0.5">GPA/Result: {edu.grade}</p>}
                                        {edu.description && <p className="text-[13px] text-slate-500 font-light mt-1">{edu.description}</p>}
                                    </div>
                                    <span className="text-[12px] text-slate-400 font-light whitespace-nowrap">
                                        {formatMonthYear(edu.startDate)} — {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Component Mapping */}
                {hasSkills && (
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                Expertise
                            </h2>
                        </div>
                        <div className="md:col-span-3">
                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-slate-600 font-light">
                                {skills.filter(skill => skill.trim()).map((skill, index) => (
                                    <span key={index} className="after:content-['•'] last:after:content-none after:ml-5 after:text-slate-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Certifications & Languages Combined Footer Line */}
                {(hasCertifications || hasLanguages || hasHighlights) && (
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
                        <div className="md:col-span-1">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                Credentials
                            </h2>
                        </div>
                        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[13px] font-light text-slate-600">
                            {/* Certifications list */}
                            {hasCertifications && (
                                <div className="space-y-2">
                                    {certifications.map((cert, index) => cert.title?.trim() && (
                                        <div key={index}>
                                            <p className="font-medium text-slate-800">{cert.title}</p>
                                            <p className="text-[11px] text-slate-400">{cert.issuer}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Languages & Accomplishments */}
                            <div className="space-y-4">
                                {hasLanguages && (
                                    <p>
                                        <span className="font-medium text-slate-800">Languages: </span>
                                        {languages.filter(l => l.language?.trim()).map(l => `${l.language} (${l.proficiency || 'Native'})`).join(", ")}
                                    </p>
                                )}
                                {hasHighlights && (
                                    <div className="space-y-1">
                                        <span className="font-medium text-slate-800 block">Distinctions:</span>
                                        {resume.achievements.map((item, idx) => item.trim() && (
                                            <p key={idx} className="text-slate-500">• {item}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default MinimalElegant;