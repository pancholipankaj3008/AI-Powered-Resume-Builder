import React from "react";

const CorporateElite = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 border-t-8 border-slate-800 shadow-xl font-sans text-slate-800 selection:bg-slate-200 selection:text-slate-900">
            
            {/* Symmetrical Executive Header */}
            <header className="border-b-2 border-slate-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase">
                        {personalInfo?.firstName} {personalInfo?.lastName}
                    </h1>
                    <p className="text-[13px] font-bold tracking-[0.2em] text-slate-500 mt-1.5 uppercase">
                        {resume.profession}
                    </p>
                </div>

                {/* Grid Contact Block */}
                <div className="text-[12px] md:text-right space-y-1 font-medium text-slate-600">
                    {personalInfo?.phone && <p>Direct: {personalInfo.phone}</p>}
                    {personalInfo?.email && <p>Corporate: {personalInfo.email}</p>}
                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                        <p>Loc: {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}</p>
                    )}
                </div>
            </header>

            {/* Hyperlink Badges Line */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-bold text-slate-700 uppercase tracking-wider mb-8 bg-slate-50 p-3 rounded-lg border border-slate-100">
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
                        className="hover:text-slate-900 hover:underline underline-offset-4"
                    >
                        {link.name} ↗
                    </a>
                ))}
            </div>

            {/* Modular Structure */}
            <div className="space-y-8">
                
                {/* Executive Summary */}
                {hasSummary && (
                    <section className="border-l-4 border-slate-800 pl-4">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 mb-2">
                            I. Executive Summary
                        </h2>
                        <p className="text-[13.5px] text-slate-600 leading-relaxed text-justify">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Operations History */}
                {hasExperience && (
                    <section className="border-l-4 border-slate-800 pl-4">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 mb-4">
                            II. Professional Record
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                        <h3 className="font-extrabold text-[14px] text-slate-900 uppercase tracking-wide">
                                            {exp.position}
                                        </h3>
                                        <span className="text-[11px] font-bold text-slate-500 tracking-wider whitespace-nowrap">
                                            {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "PRESENT" : formatMonthYear(exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        {exp.company} {exp.location && <span>({exp.location})</span>}
                                    </p>
                                    <ul className="list-disc ml-4 space-y-1.5 text-[13px] text-slate-600 marker:text-slate-400">
                                        {(exp.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="text-justify pl-0.5">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Strategic Initiatives */}
                {hasProjects && (
                    <section className="border-l-4 border-slate-800 pl-4">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 mb-4">
                            III. Key Deliverables & Projects
                        </h2>
                        <div className="space-y-5">
                            {projects.map((project, index) => (
                                <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                                    <div className="flex justify-between items-baseline mb-1">
                                        {project.github || project.liveDemo ? (
                                            <a
                                                href={withProtocol(project.github || project.liveDemo)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-extrabold text-[14px] text-slate-900 hover:underline uppercase"
                                            >
                                                {project.title} 🔗
                                            </a>
                                        ) : (
                                            <h3 className="font-extrabold text-[14px] text-slate-900 uppercase">
                                                {project.title}
                                            </h3>
                                        )}
                                        <div className="flex gap-2 text-[11px] font-bold uppercase text-slate-400">
                                            {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-800">Source</a>}
                                            {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-800">Live</a>}
                                        </div>
                                    </div>
                                    {(project.techStack || []).length > 0 && (
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                                            Scope: {project.techStack.join(" / ")}
                                        </p>
                                    )}
                                    <ul className="list-disc ml-4 space-y-1 text-[13px] text-slate-600 marker:text-slate-400">
                                        {(project.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="pl-0.5">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Two Column Layout for Technical Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-l-4 border-slate-800 pl-4">
                    
                    {/* Education Matrix */}
                    {hasEducation && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 mb-3">
                                IV. Academic Framework
                            </h2>
                            <div className="space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-[13px]">
                                        <p className="font-extrabold text-slate-900 uppercase">{edu.degree}</p>
                                        <p className="text-slate-600 text-[12px] mt-0.5 font-medium">{edu.school}</p>
                                        <p className="text-[11px] text-slate-400 font-bold tracking-wider mt-0.5">
                                            {formatMonthYear(edu.startDate)} – {edu.currentlyStudying ? "PRESENT" : formatMonthYear(edu.endDate)}
                                            {edu.grade && <span className="text-slate-700 ml-2">| Grade: {edu.grade}</span>}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skill Arrays */}
                    {hasSkills && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 mb-3">
                                V. Expertise Domains
                            </h2>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span key={index} className="text-[11px] font-bold bg-slate-900 text-white px-2.5 py-1 rounded">
                                        {skill.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footnotes & Highlights */}
                {(hasCertifications || hasLanguages || hasHighlights) && (
                    <section className="border-l-4 border-slate-800 pl-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                        {hasCertifications && (
                            <div className="text-[12px]">
                                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Certifications</h4>
                                {certifications.map((c, i) => c.title?.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="font-bold text-slate-800">▪</span> {c.title}</p>
                                ))}
                            </div>
                        )}
                        {hasLanguages && (
                            <div className="text-[12px]">
                                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Languages</h4>
                                {languages.map((l, i) => l.language?.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="font-bold text-slate-800">▪</span> {l.language} ({l.proficiency})</p>
                                ))}
                            </div>
                        )}
                        {hasHighlights && (
                            <div className="text-[12px]">
                                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Distinctions</h4>
                                {resume.achievements.map((a, i) => a.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="font-bold text-slate-800">▪</span> {a}</p>
                                ))}
                            </div>
                        )}
                    </section>
                )}

            </div>
        </div>
    );
};

export default CorporateElite;