import React from "react";

const MinimalistBoldAccent = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white text-stone-800 p-8 md:p-12 shadow-md font-sans space-y-8 selection:bg-amber-100 selection:text-stone-900">
            
            {/* Split Symmetrical Info Grid */}
            <header className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b-2 border-stone-900">
                <div className="md:col-span-2">
                    <h1 className="text-4xl font-black text-stone-900 tracking-tight leading-none uppercase">
                        {personalInfo?.firstName} <span className="text-amber-600">{personalInfo?.lastName}</span>
                    </h1>
                    <p className="text-[13px] font-bold tracking-[0.15em] text-stone-500 mt-2 uppercase">
                        {resume.profession}
                    </p>
                </div>

                <div className="text-[12px] space-y-1 md:text-right text-stone-600 font-medium">
                    {personalInfo?.phone && <p>{personalInfo.phone}</p>}
                    {personalInfo?.email && <p className="underline underline-offset-2">{personalInfo.email}</p>}
                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                        <p>{[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}</p>
                    )}
                </div>
            </header>

            {/* Hyperlink Badges Line */}
            <div className="flex flex-wrap gap-4 text-[11px] font-bold text-stone-700 tracking-wider uppercase">
                {[
                    { name: "LinkedIn", url: personalInfo?.linkedin },
                    { name: "GitHub", url: personalInfo?.github },
                    { name: "Portfolio", url: personalInfo?.portfolio },
                    { name: "Website", url: personalInfo?.website }
                ].map((link, idx) => link.url && (
                    <a key={idx} href={withProtocol(link.url)} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 border-b border-stone-300 hover:border-amber-600 transition-colors pb-0.5">
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Asymmetrical Layout Split */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Main Content (Left + Middle Column) */}
                <main className="md:col-span-2 space-y-8">
                    
                    {/* Summary Statement */}
                    {hasSummary && (
                        <section className="space-y-2">
                            <h2 className="text-[12px] font-black tracking-widest text-stone-900 uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-amber-600 block rounded-full"></span> Profile
                            </h2>
                            <p className="text-[13.5px] text-stone-600 leading-relaxed text-justify">
                                {summary}
                            </p>
                        </section>
                    )}

                    {/* Timeline Based History */}
                    {hasExperience && (
                        <section className="space-y-4">
                            <h2 className="text-[12px] font-black tracking-widest text-stone-900 uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-amber-600 block rounded-full"></span> Experience
                            </h2>
                            
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div key={index} className="space-y-1">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                            <h3 className="font-extrabold text-[14px] text-stone-900">
                                                {exp.position}
                                            </h3>
                                            <span className="text-[11px] font-bold text-stone-400 whitespace-nowrap">
                                                {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                            </span>
                                        </div>
                                        <p className="text-[12px] font-bold text-amber-700 uppercase tracking-wide">
                                            {exp.company} {exp.location && <span className="text-stone-400 font-normal">({exp.location})</span>}
                                        </p>
                                        <ul className="space-y-1.5 text-[13px] text-stone-600 list-none pt-1">
                                            {(exp.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="flex items-start gap-2 text-justify">
                                                    <span className="text-amber-600 shrink-0 mt-1.5 text-[6px]">●</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Shipped Systems */}
                    {hasProjects && (
                        <section className="space-y-4">
                            <h2 className="text-[12px] font-black tracking-widest text-stone-900 uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-amber-600 block rounded-full"></span> Selected Work
                            </h2>

                            <div className="space-y-4">
                                {projects.map((project, index) => (
                                    <div key={index} className="group border-l border-stone-200 pl-4 space-y-1">
                                        <div className="flex justify-between items-baseline">
                                            {project.github || project.liveDemo ? (
                                                <a
                                                    href={withProtocol(project.github || project.liveDemo)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-extrabold text-[14px] text-stone-900 hover:text-amber-600 transition-colors"
                                                >
                                                    {project.title} ↗
                                                </a>
                                            ) : (
                                                <h3 className="font-extrabold text-[14px] text-stone-900">
                                                    {project.title}
                                                </h3>
                                            )}
                                            
                                            <div className="flex gap-2 text-[11px] font-bold text-stone-400">
                                                {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="hover:text-stone-800">[Source]</a>}
                                                {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="hover:text-stone-800">[Live]</a>}
                                            </div>
                                        </div>

                                        {(project.techStack || []).length > 0 && (
                                            <p className="text-[11px] font-mono text-stone-400">
                                                {project.techStack.join(" / ")}
                                            </p>
                                        )}

                                        <ul className="space-y-1 text-[13px] text-stone-600 list-none pt-0.5">
                                            {(project.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="flex items-start gap-1.5">
                                                    <span className="text-stone-300 shrink-0 mt-0.5">—</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Sidebar Column (Right Side Column) */}
                <aside className="space-y-6 md:border-l md:border-stone-100 md:pl-6">
                    
                    {/* Competency Array */}
                    {hasSkills && (
                        <div className="space-y-2">
                            <h2 className="text-[11px] font-black tracking-widest text-stone-950 uppercase">// Toolkit</h2>
                            <div className="flex flex-wrap gap-1">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span key={index} className="text-[11px] font-medium bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Academic Pipeline */}
                    {hasEducation && (
                        <div className="space-y-3">
                            <h2 className="text-[11px] font-black tracking-widest text-stone-950 uppercase">// Education</h2>
                            <div className="space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-[13px] space-y-0.5">
                                        <p className="font-extrabold text-stone-900">{edu.degree}</p>
                                        <p className="text-stone-600 text-[12px]">{edu.school}</p>
                                        <p className="text-[11px] font-semibold text-stone-400 font-mono">
                                            {formatMonthYear(edu.startDate)} – {formatMonthYear(edu.endDate)}
                                        </p>
                                        {edu.grade && <p className="text-[11px] text-amber-700 font-bold bg-amber-50 inline-block px-1.5 py-0.2 rounded mt-1">Grade: {edu.grade}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Credentials Matrix */}
                    {hasCertifications && (
                        <div className="space-y-2">
                            <h2 className="text-[11px] font-black tracking-widest text-stone-950 uppercase">// Verification</h2>
                            <div className="space-y-2 text-[12px]">
                                {certifications.map((cert, index) => cert.title?.trim() && (
                                    <div key={index} className="border-b border-stone-100 pb-2 last:border-0 last:pb-0">
                                        <p className="font-bold text-stone-900">{cert.title}</p>
                                        <p className="text-[11px] text-stone-400">{cert.issuer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Localization Framework */}
                    {hasLanguages && (
                        <div className="space-y-2">
                            <h2 className="text-[11px] font-black tracking-widest text-stone-950 uppercase">// Languages</h2>
                            <div className="text-[12px] space-y-1.5 font-medium">
                                {languages.map((lang, index) => lang.language?.trim() && (
                                    <div key={index} className="flex justify-between text-stone-600">
                                        <span>{lang.language}</span>
                                        <span className="text-stone-400 font-normal italic">{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Distinctions Log */}
                    {hasHighlights && (
                        <div className="space-y-2">
                            <h2 className="text-[11px] font-black tracking-widest text-stone-950 uppercase">// Highlights</h2>
                            <ul className="space-y-1.5 text-[12px] text-stone-600 list-none">
                                {resume.achievements.map((item, index) => item.trim() && (
                                    <li key={index} className="flex items-start gap-1.5">
                                        <span className="text-amber-600 font-bold mt-0.5">›</span>
                                        <span className="leading-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default MinimalistBoldAccent;