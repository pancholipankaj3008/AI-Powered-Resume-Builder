import React from "react";

const SlateGrid = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 shadow-2xl font-sans text-slate-800 selection:bg-cyan-100 selection:text-cyan-950">
            
            {/* Header Matrix Block */}
            <header className="bg-slate-900 text-slate-100 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
                        {personalInfo?.firstName} {personalInfo?.lastName}
                    </h1>
                    <p className="text-[13px] font-bold tracking-[0.2em] text-cyan-400 mt-2 uppercase">
                        {resume.profession}
                    </p>
                </div>

                <div className="text-[12px] space-y-1 md:text-right text-slate-300 font-medium">
                    {personalInfo?.phone && <p>📞 {personalInfo.phone}</p>}
                    {personalInfo?.email && <p className="underline underline-offset-2">✉️ {personalInfo.email}</p>}
                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                        <p>📍 {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}</p>
                    )}
                </div>
            </header>

            {/* Link Coordinates Pill Box */}
            <div className="flex flex-wrap gap-2.5 mb-8">
                {[
                    { name: "LinkedIn", url: personalInfo?.linkedin },
                    { name: "GitHub", url: personalInfo?.github },
                    { name: "Portfolio", url: personalInfo?.portfolio },
                    { name: "Website", url: personalInfo?.website }
                ].map((link, idx) => link.url && (
                    <a key={idx} href={withProtocol(link.url)} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-600 px-3.5 py-1.5 rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                        {link.name} ↗
                    </a>
                ))}
            </div>

            {/* Core Blueprint Stack */}
            <div className="space-y-8">
                
                {/* Profile Overview */}
                {hasSummary && (
                    <section className="space-y-3">
                        <h2 className="text-[11px] font-black uppercase tracking-widest text-white bg-slate-900 px-3 py-1 rounded-md inline-block">
                            01 / Core Profile
                        </h2>
                        <p className="text-[13.5px] text-slate-600 leading-relaxed text-justify bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Professional Engine */}
                {hasExperience && (
                    <section className="space-y-4">
                        <h2 className="text-[11px] font-black uppercase tracking-widest text-white bg-slate-900 px-3 py-1 rounded-md inline-block">
                            02 / Work History
                        </h2>
                        
                        <div className="space-y-4">
                            {experience.map((exp, index) => (
                                <div key={index} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                        <h3 className="font-extrabold text-[14px] text-slate-900 uppercase">
                                            {exp.position}
                                        </h3>
                                        <span className="text-[11px] font-mono font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                                            {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "PRESENT" : formatMonthYear(exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">
                                        {exp.company} {exp.location && <span>({exp.location})</span>}
                                    </p>
                                    <ul className="list-disc ml-4 space-y-1.5 text-[13px] text-slate-600 marker:text-cyan-400">
                                        {(exp.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="text-justify pl-0.5">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Shipped Architectures */}
                {hasProjects && (
                    <section className="space-y-4">
                        <h2 className="text-[11px] font-black uppercase tracking-widest text-white bg-slate-900 px-3 py-1 rounded-md inline-block">
                            03 / Systems & Projects
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((project, index) => (
                                <div key={index} className="bg-slate-50/40 border border-slate-200 p-5 rounded-xl flex flex-col justify-between space-y-3">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-baseline gap-2">
                                            <h3 className="font-extrabold text-[14px] text-slate-900 uppercase tracking-wide truncate">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-2 text-[10px] font-bold uppercase text-slate-400 shrink-0">
                                                {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Code</a>}
                                                {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Live</a>}
                                            </div>
                                        </div>

                                        {(project.techStack || []).length > 0 && (
                                            <p className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                                                // {project.techStack.join(", ")}
                                            </p>
                                        )}

                                        <ul className="list-disc ml-4 space-y-1 text-[12px] text-slate-600 marker:text-slate-300">
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

                {/* Modular Layout Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Education Setup */}
                    {hasEducation && (
                        <div className="space-y-3">
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-white bg-slate-900 px-3 py-1 rounded-md inline-block">
                                04 / Education Track
                            </h2>
                            <div className="space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm text-[13px]">
                                        <p className="font-extrabold text-slate-900 uppercase">{edu.degree}</p>
                                        <p className="text-slate-500 text-[12px] font-medium mt-0.5">{edu.school}</p>
                                        <div className="flex justify-between items-center mt-2 text-[11px] font-bold text-slate-400">
                                            <span>{formatMonthYear(edu.startDate)} – {formatMonthYear(edu.endDate)}</span>
                                            {edu.grade && <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Grade: {edu.grade}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stack Arrays */}
                    {hasSkills && (
                        <div className="space-y-3">
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-white bg-slate-900 px-3 py-1 rounded-md inline-block">
                                05 / Technical Tools
                            </h2>
                            <div className="flex flex-wrap gap-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/40">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span key={index} className="text-[11px] font-bold bg-white border border-slate-200 text-slate-800 px-2.5 py-1 rounded-lg shadow-sm uppercase">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Credentials Arrays */}
                {(hasCertifications || hasLanguages || hasHighlights) && (
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                        {hasCertifications && (
                            <div className="bg-slate-50/40 p-4 rounded-xl border border-slate-200/60 text-[12px]">
                                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider mb-2">Certifications</h4>
                                {certifications.map((c, i) => c.title?.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="text-cyan-500 font-bold">▪</span> {c.title}</p>
                                ))}
                            </div>
                        )}
                        {hasLanguages && (
                            <div className="bg-slate-50/40 p-4 rounded-xl border border-slate-200/60 text-[12px]">
                                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider mb-2">Languages</h4>
                                {languages.map((l, i) => l.language?.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="text-cyan-500 font-bold">▪</span> {l.language} ({l.proficiency})</p>
                                ))}
                            </div>
                        )}
                        {hasHighlights && (
                            <div className="bg-slate-50/40 p-4 rounded-xl border border-slate-200/60 text-[12px]">
                                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider mb-2">Achievements</h4>
                                {resume.achievements.map((a, i) => a.trim() && (
                                    <p key={i} className="text-slate-600 mb-1"><span className="text-cyan-500 font-bold">▪</span> {a}</p>
                                ))}
                            </div>
                        )}
                    </section>
                )}

            </div>
        </div>
    );
};

export default SlateGrid;