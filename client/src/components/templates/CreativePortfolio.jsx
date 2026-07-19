import React from "react";

const CreativePortfolio = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden font-sans text-slate-800 flex flex-col md:flex-row min-h-[1000px] selection:bg-rose-100 selection:text-rose-950">
            
            {/* Left Aesthetic Identity Column */}
            <aside className="md:w-[35%] bg-slate-950 text-slate-200 p-8 flex flex-col justify-between border-r border-slate-900">
                <div className="space-y-8">
                    {/* Brand Identifier */}
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-white leading-tight uppercase">
                            {personalInfo?.firstName} <br />
                            <span className="text-rose-400 font-light">{personalInfo?.lastName}</span>
                        </h1>
                        <p className="text-[11px] font-bold tracking-[0.2em] text-slate-400 mt-3 uppercase bg-slate-900 border border-slate-800 px-3 py-1.5 rounded inline-block">
                            {resume.profession}
                        </p>
                    </div>

                    {/* Contact Grid Block */}
                    <div className="text-[12px] space-y-3 pt-6 border-t border-slate-800/80 text-slate-300">
                        {personalInfo?.phone && <p className="flex items-center gap-2"><span>✦</span> {personalInfo.phone}</p>}
                        {personalInfo?.email && <p className="flex items-center gap-2 truncate"><span>✦</span> {personalInfo.email}</p>}
                        {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                            <p className="flex items-start gap-2">
                                <span className="mt-0.5">✦</span> 
                                <span>{[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}</span>
                            </p>
                        )}
                    </div>

                    {/* Skill Matrices Arrays */}
                    {hasSkills && (
                        <div className="space-y-3 pt-6 border-t border-slate-800/80">
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-rose-400">// Skills</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span key={index} className="text-[11px] bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Global Communication Networks */}
                    {hasLanguages && (
                        <div className="space-y-2 pt-6 border-t border-slate-800/80">
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-rose-400">// Locales</h2>
                            <div className="text-[12px] space-y-1.5">
                                {languages.map((lang, index) => lang.language?.trim() && (
                                    <div key={index} className="flex justify-between text-slate-400">
                                        <span className="font-medium text-slate-200">{lang.language}</span>
                                        <span className="italic text-[11px] text-slate-500">[{lang.proficiency}]</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Network Coordinates Hub */}
                <div className="flex flex-col gap-2 pt-8 text-[11px] font-mono mt-8 border-t border-slate-800/80">
                    {[
                        { name: "linkedin", url: personalInfo?.linkedin },
                        { name: "github", url: personalInfo?.github },
                        { name: "portfolio", url: personalInfo?.portfolio },
                        { name: "website", url: personalInfo?.website }
                    ].map((link, idx) => link.url && (
                        <a
                            key={idx}
                            href={withProtocol(link.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white border-b border-dashed border-slate-800 pb-1 hover:border-slate-600 transition-colors"
                        >
                            /{link.name}
                        </a>
                    ))}
                </div>
            </aside>

            {/* Right Asymmetrical Content Canvas */}
            <main className="md:w-[65%] bg-slate-50/50 p-8 md:p-12 space-y-8">
                
                {/* Profile Architecture */}
                {hasSummary && (
                    <section className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-rose-400 block rounded-full" /> About Vision
                        </h2>
                        <p className="text-[13.5px] text-slate-600 leading-relaxed text-justify font-light">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Operations History Track */}
                {hasExperience && (
                    <section className="space-y-4">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 flex items-center gap-2 px-2">
                            <span className="w-1.5 h-1.5 bg-rose-400 block rounded-full" /> Career Track
                        </h2>
                        
                        <div className="space-y-4">
                            {experience.map((exp, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-2 group">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                        <h3 className="font-extrabold text-[15px] text-slate-900 group-hover:text-rose-500 transition-colors">
                                            {exp.position}
                                        </h3>
                                        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-100">
                                            {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                                        🏢 {exp.company} {exp.location && <span>| {exp.location}</span>}
                                    </p>
                                    <ul className="space-y-2 text-[13px] text-slate-600 list-none pt-1">
                                        {(exp.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="flex items-start gap-2.5 text-justify">
                                                <span className="text-rose-400 shrink-0 mt-1.5 text-[5px]">■</span>
                                                <span className="font-light">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Shipped Systems Portfolio */}
                {hasProjects && (
                    <section className="space-y-4">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 flex items-center gap-2 px-2">
                            <span className="w-1.5 h-1.5 bg-rose-400 block rounded-full" /> Shipped Projects
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            {projects.map((project, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
                                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                                        {project.github || project.liveDemo ? (
                                            <a
                                                href={withProtocol(project.github || project.liveDemo)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-extrabold text-[14px] text-slate-900 hover:text-rose-500 transition-colors"
                                            >
                                                🚀 {project.title}
                                            </a>
                                        ) : (
                                            <h3 className="font-extrabold text-[14px] text-slate-900">
                                                🚀 {project.title}
                                            </h3>
                                        )}
                                        <div className="flex gap-2.5 text-[11px] font-bold text-slate-400">
                                            {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">[Source]</a>}
                                            {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">[Live]</a>}
                                        </div>
                                    </div>

                                    {(project.techStack || []).length > 0 && (
                                        <div className="flex flex-wrap gap-1 pt-0.5">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <ul className="space-y-1.5 text-[13px] text-slate-600 list-none pt-1">
                                        {(project.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="flex items-start gap-2 text-justify font-light">
                                                <span className="text-slate-300 select-none font-mono">-</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Academic & Credentials Matrix Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Education Card Block */}
                    {hasEducation && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
                            <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-950">// Education</h3>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-[13px] space-y-0.5">
                                        <p className="font-extrabold text-slate-900">{edu.degree}</p>
                                        <p className="text-slate-500 text-[12px] font-light">{edu.school}</p>
                                        <p className="text-[11px] font-bold text-slate-400 mt-1">
                                            {formatMonthYear(edu.startDate)} – {formatMonthYear(edu.endDate)}
                                        </p>
                                        {edu.grade && <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-2 py-0.5 rounded inline-block mt-1">GPA: {edu.grade}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Verification Records Block */}
                    {(hasCertifications || hasHighlights) && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
                            <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-950">// Credentials</h3>
                            <div className="space-y-3 text-[12px]">
                                {certifications.map((cert, index) => cert.title?.trim() && (
                                    <div key={index} className="leading-tight">
                                        <p className="font-bold text-slate-800">■ {cert.title}</p>
                                        <p className="text-[11px] text-slate-400 font-light mt-0.5">{cert.issuer}</p>
                                    </div>
                                ))}
                                {resume.achievements?.map((item, index) => item.trim() && (
                                    <p key={index} className="text-slate-600 font-light leading-snug">
                                        <span className="text-rose-400 font-bold mr-1">▪</span> {item}
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

export default CreativePortfolio;