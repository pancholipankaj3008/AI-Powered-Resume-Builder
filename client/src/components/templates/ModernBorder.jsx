import React from "react";

const ModernBorder = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 border-4 border-slate-900 shadow-xl font-sans text-slate-800 selection:bg-slate-900 selection:text-white">
            
            {/* Header Box */}
            <header className="border-b-4 border-slate-900 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
                        {personalInfo?.firstName} {personalInfo?.lastName}
                    </h1>
                    <p className="text-[13px] font-extrabold tracking-[0.2em] text-indigo-600 mt-2 uppercase">
                        {resume.profession}
                    </p>
                </div>

                <div className="text-[12px] font-mono space-y-1 text-slate-600">
                    {personalInfo?.phone && <p>P: {personalInfo.phone}</p>}
                    {personalInfo?.email && <p>E: {personalInfo.email}</p>}
                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                        <p>L: {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}</p>
                    )}
                </div>
            </header>

            {/* Links Block */}
            <div className="flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-wider mb-8">
                {[
                    { name: "LinkedIn", url: personalInfo?.linkedin },
                    { name: "GitHub", url: personalInfo?.github },
                    { name: "Portfolio", url: personalInfo?.portfolio },
                    { name: "Website", url: personalInfo?.website }
                ].map((link, idx) => link.url && (
                    <a key={idx} href={withProtocol(link.url)} target="_blank" rel="noopener noreferrer" className="bg-slate-100 border border-slate-300 px-3 py-1 rounded hover:bg-slate-900 hover:text-white transition-colors">
                        {link.name} ↗
                    </a>
                ))}
            </div>

            <div className="space-y-8">
                {/* Summary */}
                {hasSummary && (
                    <section className="space-y-2">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-900 bg-slate-100 inline-block px-2 py-0.5 border border-slate-300">
                            01 / Profile Summary
                        </h2>
                        <p className="text-[13.5px] text-slate-600 leading-relaxed text-justify pt-1">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {hasExperience && (
                    <section className="space-y-4">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-900 bg-slate-100 inline-block px-2 py-0.5 border border-slate-300">
                            02 / Professional Timeline
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp, index) => (
                                <div key={index} className="border-l-2 border-slate-300 pl-4 space-y-1">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                        <h3 className="font-extrabold text-[14px] text-slate-900 uppercase">
                                            {exp.position}
                                        </h3>
                                        <span className="text-[11px] font-mono text-slate-500 font-bold whitespace-nowrap">
                                            {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "PRESENT" : formatMonthYear(exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-[12px] font-bold text-indigo-600 uppercase">
                                        {exp.company} {exp.location && <span className="text-slate-400 font-normal">({exp.location})</span>}
                                    </p>
                                    <ul className="list-disc ml-4 space-y-1 text-[13px] text-slate-600 marker:text-slate-300 pt-1">
                                        {(exp.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="text-justify">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {hasProjects && (
                    <section className="space-y-4">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-900 bg-slate-100 inline-block px-2 py-0.5 border border-slate-300">
                            03 / Engineering Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((project, index) => (
                                <div key={index} className="border-2 border-slate-200 p-4 rounded space-y-2 flex flex-col justify-between">
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-extrabold text-[14px] text-slate-900 uppercase">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-2 text-[10px] font-bold uppercase text-slate-400">
                                                {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Git</a>}
                                                {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Live</a>}
                                            </div>
                                        </div>
                                        {(project.techStack || []).length > 0 && (
                                            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                                                [{project.techStack.join(" , ")}]
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

                {/* Core Grid Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Education Matrix */}
                    {hasEducation && (
                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-900 bg-slate-100 inline-block px-2 py-0.5 border border-slate-300">
                                04 / Academic Setup
                            </h2>
                            <div className="space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-[13px] border-l-2 border-slate-300 pl-4">
                                        <p className="font-extrabold text-slate-900 uppercase">{edu.degree}</p>
                                        <p className="text-slate-600 text-[12px]">{edu.school}</p>
                                        <p className="text-[11px] font-mono text-slate-400 font-bold mt-0.5">
                                            {formatMonthYear(edu.startDate)} – {formatMonthYear(edu.endDate)}
                                            {edu.grade && <span className="text-slate-700 ml-2">| Grade: {edu.grade}</span>}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skill Arrays */}
                    {hasSkills && (
                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-900 bg-slate-100 inline-block px-2 py-0.5 border border-slate-300">
                                05 / Technical Skills
                            </h2>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span key={index} className="text-[11px] font-bold border-2 border-slate-900 px-2.5 py-0.5 uppercase">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Credentials / Languages */}
                {(hasCertifications || hasLanguages || hasHighlights) && (
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t-2 border-slate-200">
                        {hasCertifications && (
                            <div className="text-[12px]">
                                <h4 className="font-extrabold text-slate-900 uppercase mb-2">Certifications</h4>
                                {certifications.map((c, i) => c.title?.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="text-indigo-600 font-bold">▪</span> {c.title}</p>
                                ))}
                            </div>
                        )}
                        {hasLanguages && (
                            <div className="text-[12px]">
                                <h4 className="font-extrabold text-slate-900 uppercase mb-2">Languages</h4>
                                {languages.map((l, i) => l.language?.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="text-indigo-600 font-bold">▪</span> {l.language} ({l.proficiency})</p>
                                ))}
                            </div>
                        )}
                        {hasHighlights && (
                            <div className="text-[12px]">
                                <h4 className="font-extrabold text-slate-900 uppercase mb-2">Highlights</h4>
                                {resume.achievements.map((a, i) => a.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="text-indigo-600 font-bold">▪</span> {a}</p>
                                ))}
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default ModernBorder;