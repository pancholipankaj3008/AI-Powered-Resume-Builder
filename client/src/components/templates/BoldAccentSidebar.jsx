import React from "react";

const BoldAccentSidebar = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden font-sans text-slate-800 flex flex-col md:flex-row min-h-[950px] selection:bg-indigo-100 selection:text-indigo-950">
            
            {/* Dark Accent Left Pillar */}
            <aside className="md:w-[32%] bg-slate-900 text-slate-200 p-6 md:p-8 flex flex-col justify-between border-r border-slate-950">
                <div className="space-y-6">
                    {/* Identification block */}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-none">
                            {personalInfo?.firstName} <br />
                            <span className="text-indigo-400 font-medium">{personalInfo?.lastName}</span>
                        </h1>
                        <p className="text-[11px] font-bold tracking-[0.15em] text-slate-400 mt-2.5 uppercase">
                            {resume.profession}
                        </p>
                    </div>

                    {/* Coordinates Grid */}
                    <div className="text-[12px] space-y-2 pt-4 border-t border-slate-800 text-slate-300">
                        {personalInfo?.phone && <p className="truncate">📞 {personalInfo.phone}</p>}
                        {personalInfo?.email && <p className="underline underline-offset-2 truncate">✉️ {personalInfo.email}</p>}
                        {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                            <p className="leading-tight text-slate-400">
                                📍 {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}
                            </p>
                        )}
                    </div>

                    {/* Core Competency Framework */}
                    {hasSkills && (
                        <div className="space-y-2 pt-4 border-t border-slate-800">
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-indigo-400">Core Toolkit</h2>
                            <div className="flex flex-wrap gap-1">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span key={index} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono uppercase">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Localization Layers */}
                    {hasLanguages && (
                        <div className="space-y-2 pt-4 border-t border-slate-800">
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-indigo-400">Languages</h2>
                            <div className="text-[12px] space-y-1">
                                {languages.map((lang, index) => lang.language?.trim() && (
                                    <div key={index} className="flex justify-between text-slate-400">
                                        <span className="font-medium text-slate-200">{lang.language}</span>
                                        <span className="italic text-[11px] text-slate-500">{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Handles coordinates grid links */}
                <div className="flex flex-col gap-1.5 pt-6 text-[11px] font-mono mt-6 border-t border-slate-800">
                    {[
                        { name: "linkedin", url: personalInfo?.linkedin },
                        { name: "github", url: personalInfo?.github },
                        { name: "portfolio", url: personalInfo?.portfolio },
                        { name: "website", url: personalInfo?.website }
                    ].map((link, idx) => link.url && (
                        <a key={idx} href={withProtocol(link.url)} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors truncate">
                            🔗 /{link.name}
                        </a>
                    ))}
                </div>
            </aside>

            {/* Pristine Canvas Main Body */}
            <main className="md:w-[68%] p-6 md:p-10 space-y-6">
                
                {/* Executive Summary */}
                {hasSummary && (
                    <section className="space-y-1.5">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1">
                            Executive Overview
                        </h2>
                        <p className="text-[13.5px] text-slate-600 leading-relaxed text-justify pt-1 font-normal">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Engineering Track Timeline */}
                {hasExperience && (
                    <section className="space-y-3">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1">
                            Professional Timeline
                        </h2>
                        
                        <div className="space-y-4 pt-1">
                            {experience.map((exp, index) => (
                                <div key={index} className="space-y-0.5">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                                        <h3 className="font-extrabold text-[14px] text-slate-900 uppercase">
                                            {exp.position}
                                        </h3>
                                        <span className="text-[11px] font-bold text-indigo-600 whitespace-nowrap bg-indigo-50 px-2 py-0.2 rounded">
                                            {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "PRESENT" : formatMonthYear(exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">
                                        {exp.company} {exp.location && <span className="text-slate-300 font-normal">({exp.location})</span>}
                                    </p>
                                    <ul className="list-disc ml-4 space-y-1 text-[13px] text-slate-600 marker:text-indigo-400 pt-1">
                                        {(exp.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="text-justify">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Key Deliverables Projects */}
                {hasProjects && (
                    <section className="space-y-3">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1">
                            Engineering Projects
                        </h2>

                        <div className="space-y-3 pt-1">
                            {projects.map((project, index) => (
                                <div key={index} className="border-l-2 border-indigo-400 pl-4 space-y-1">
                                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                                        <h3 className="font-extrabold text-[14px] text-slate-900 uppercase">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-2 text-[11px] font-bold uppercase text-slate-400">
                                            {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Source</a>}
                                            {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Live</a>}
                                        </div>
                                    </div>

                                    {(project.techStack || []).length > 0 && (
                                        <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                                            Stack: {project.techStack.join(" / ")}
                                        </p>
                                    )}

                                    <ul className="list-disc ml-4 space-y-0.5 text-[12px] text-slate-600 marker:text-slate-300">
                                        {(project.description || []).map((item, i) => item.trim() && (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Subsections Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Education Card Track */}
                    {hasEducation && (
                        <div className="space-y-2">
                            <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1">Education</h3>
                            <div className="space-y-2 pt-1">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-[13px] space-y-0.5">
                                        <p className="font-extrabold text-slate-900 uppercase">{edu.degree}</p>
                                        <p className="text-slate-500 text-[12px]">{edu.school}</p>
                                        <p className="text-[11px] font-bold text-slate-400 font-mono">
                                            {formatMonthYear(edu.startDate)} – {formatMonthYear(edu.endDate)}
                                        </p>
                                        {edu.grade && <span className="text-[11px] text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded inline-block">Grade: {edu.grade}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Verification Records highlights */}
                    {(hasCertifications || hasHighlights) && (
                        <div className="space-y-2">
                            <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1">Credentials</h3>
                            <div className="space-y-1.5 pt-1 text-[12px]">
                                {certifications.map((cert, index) => cert.title?.trim() && (
                                    <div key={index} className="leading-tight">
                                        <p className="font-bold text-slate-800">■ {cert.title}</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{cert.issuer}</p>
                                    </div>
                                ))}
                                {resume.achievements?.map((item, index) => item.trim() && (
                                    <p key={index} className="text-slate-600 leading-tight">
                                        <span className="text-indigo-400 font-bold mr-1">▪</span> {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default BoldAccentSidebar;