import React from "react";

const MinimalTechBlocks = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 border border-slate-200 shadow-xl font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-950">
            
            {/* Top Identity Block */}
            <header className="border border-slate-900 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        {personalInfo?.firstName} {personalInfo?.lastName}
                    </h1>
                    <p className="text-[12px] font-mono font-bold text-emerald-600 uppercase tracking-wider mt-1.5">
                        &lt;{resume.profession || "Software Engineer"} /&gt;
                    </p>
                </div>

                <div className="text-[12px] font-mono space-y-1 text-slate-500 md:text-right">
                    {personalInfo?.phone && <p>tel: {personalInfo.phone}</p>}
                    {personalInfo?.email && <p>email: {personalInfo.email}</p>}
                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                        <p>loc: {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}</p>
                    )}
                </div>
            </header>

            {/* Coordinates Link Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                {[
                    { name: "linkedin", url: personalInfo?.linkedin },
                    { name: "github", url: personalInfo?.github },
                    { name: "portfolio", url: personalInfo?.portfolio },
                    { name: "website", url: personalInfo?.website }
                ].map((link, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center font-mono text-[11px] truncate">
                        {link.url ? (
                            <a href={withProtocol(link.url)} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-emerald-600 block">
                                ~/{link.name}
                            </a>
                        ) : (
                            <span className="text-slate-300">~/{link.name}</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Modular Structure Stack */}
            <div className="space-y-6">
                
                {/* Profile Block */}
                {hasSummary && (
                    <section className="border border-slate-200 rounded-xl p-5 space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">01. Profile overview</h2>
                            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                        </div>
                        <p className="text-[13.5px] text-slate-600 leading-relaxed text-justify pt-1 font-normal">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Timeline History Block */}
                {hasExperience && (
                    <section className="border border-slate-200 rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">02. Career log</h2>
                            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                        </div>
                        
                        <div className="space-y-5">
                            {experience.map((exp, index) => (
                                <div key={index} className="space-y-1 group">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                        <h3 className="font-extrabold text-[14px] text-slate-900 uppercase">
                                            {exp.position}
                                        </h3>
                                        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded whitespace-nowrap border border-emerald-100">
                                            {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "PRESENT" : formatMonthYear(exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">
                                        @{exp.company} {exp.location && <span className="text-slate-300 font-normal">({exp.location})</span>}
                                    </p>
                                    <ul className="list-disc ml-4 space-y-1 text-[13px] text-slate-600 marker:text-emerald-400 pt-1">
                                        {(exp.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="text-justify pl-0.5">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Engineering Projects Block */}
                {hasProjects && (
                    <section className="border border-slate-200 rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">03. Shipped systems</h2>
                            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((project, index) => (
                                <div key={index} className="border border-slate-200 bg-slate-50/40 p-4 rounded-xl flex flex-col justify-between space-y-3">
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-baseline gap-2">
                                            <h3 className="font-extrabold text-[14px] text-slate-900 uppercase tracking-wide truncate">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-2 text-[10px] font-mono font-bold uppercase text-slate-400 shrink-0">
                                                {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-950">[src]</a>}
                                                {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-950">[url]</a>}
                                            </div>
                                        </div>

                                        {(project.techStack || []).length > 0 && (
                                            <p className="text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500 px-2 py-0.5 inline-block uppercase tracking-wide">
                                                {project.techStack.join(" / ")}
                                            </p>
                                        )}

                                        <ul className="list-disc ml-4 space-y-0.5 text-[12px] text-slate-600 marker:text-slate-300">
                                            {(project.description || []).map((item, i) => item.trim() && (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Subsections Splits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Academic Layout Block */}
                    {hasEducation && (
                        <div className="border border-slate-200 rounded-xl p-5 space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">04. Education</h2>
                                <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                            </div>
                            <div className="space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-[13px] space-y-0.5">
                                        <p className="font-extrabold text-slate-900 uppercase">{edu.degree}</p>
                                        <p className="text-slate-500 text-[12px]">{edu.school}</p>
                                        <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mt-1">
                                            <span>{formatMonthYear(edu.startDate)} – {formatMonthYear(edu.endDate)}</span>
                                            {edu.grade && <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 rounded">GPA: {edu.grade}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skill Lists Block */}
                    {hasSkills && (
                        <div className="border border-slate-200 rounded-xl p-5 space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">05. Stack array</h2>
                                <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span key={index} className="text-[11px] font-mono font-medium bg-slate-900 text-slate-100 px-2.5 py-0.5 rounded uppercase">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footnotes Extra Block */}
                {(hasCertifications || hasLanguages || hasHighlights) && (
                    <section className="border border-slate-200 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[12px]">
                        {hasCertifications && (
                            <div>
                                <h4 className="font-mono font-bold text-slate-400 uppercase tracking-wide mb-1.5">/* Credentials */</h4>
                                {certifications.map((c, i) => c.title?.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="text-emerald-500 font-bold">▪</span> {c.title}</p>
                                ))}
                            </div>
                        )}
                        {hasLanguages && (
                            <div>
                                <h4 className="font-mono font-bold text-slate-400 uppercase tracking-wide mb-1.5">/* Languages */</h4>
                                {languages.map((l, i) => l.language?.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="text-emerald-500 font-bold">▪</span> {l.language} ({l.proficiency})</p>
                                ))}
                            </div>
                        )}
                        {hasHighlights && (
                            <div>
                                <h4 className="font-mono font-bold text-slate-400 uppercase tracking-wide mb-1.5">/* Distinctions */</h4>
                                {resume.achievements.map((a, i) => a.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="text-emerald-500 font-bold">▪</span> {a}</p>
                                ))}
                            </div>
                        )}
                    </section>
                )}

            </div>
        </div>
    );
};

export default MinimalTechBlocks;