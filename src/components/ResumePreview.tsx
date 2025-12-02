"use client";

import { useResumeStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { translations } from "@/lib/translations";

export default function ResumePreview() {
    const { resumeData, selectedTemplate, language } = useResumeStore();
    const { personalInfo, experience, education, skills, projects = [] } = resumeData;
    const t = translations[language].builder.preview;

    console.log("ResumePreview Rendered:", { projects, resumeData });

    // Template Styles
    const templates = {
        modern: {
            container: "bg-white text-gray-800 font-sans p-8 h-full",
            header: "border-b-2 border-blue-600 pb-4 mb-6",
            name: "text-4xl font-bold text-blue-800 uppercase tracking-wide",
            contact: "flex flex-wrap gap-3 text-sm text-gray-600 mt-2",
            sectionTitle: "text-lg font-bold text-blue-700 uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 mt-6",
            jobTitle: "font-bold text-gray-800",
            company: "text-gray-600 font-medium",
            date: "text-sm text-gray-500 italic",
            list: "list-disc list-outside ml-4 space-y-1 text-sm text-gray-700 mt-2",
            skillTag: "inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium mr-2 mb-2"
        },
        classic: {
            container: "bg-white text-gray-900 font-serif p-8 h-full",
            header: "text-center border-b-2 border-gray-800 pb-6 mb-6",
            name: "text-3xl font-bold text-gray-900 mb-2",
            contact: "flex justify-center flex-wrap gap-4 text-sm text-gray-600",
            sectionTitle: "text-xl font-bold text-gray-800 border-b border-gray-400 pb-1 mb-4 mt-8",
            jobTitle: "font-bold text-lg",
            company: "font-semibold text-gray-700",
            date: "text-gray-600",
            list: "list-disc ml-5 space-y-1 text-gray-800 mt-2",
            skillTag: "mr-4 mb-1 inline-block text-gray-800"
        },
        minimal: {
            container: "bg-white text-gray-800 font-sans p-8 h-full",
            header: "mb-8",
            name: "text-4xl font-light text-gray-900 mb-2",
            contact: "text-sm text-gray-500 space-y-1",
            sectionTitle: "text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 mt-8",
            jobTitle: "font-medium text-gray-900",
            company: "text-gray-500",
            date: "text-xs text-gray-400",
            list: "space-y-2 text-sm text-gray-600 mt-2",
            skillTag: "block text-sm text-gray-600 mb-1"
        }
    };

    const style = templates[selectedTemplate];

    return (
        <div id="resume-preview" className={`${style.container} w-[210mm] mx-auto relative shadow-2xl pb-16`} style={{ backgroundColor: "#ffffff", color: "#000000", minHeight: "297mm" }}>
            {/* Visual Page Gaps to simulate separate A4 sheets */}
            <div className="absolute top-[297mm] left-0 w-full h-[10mm] bg-gray-200 z-50 print:hidden flex items-center justify-center border-y border-gray-300">
                <span className="text-xs text-gray-500 font-medium">Page Break</span>
            </div>
            <div className="absolute top-[604mm] left-0 w-full h-[10mm] bg-gray-200 z-50 print:hidden flex items-center justify-center border-y border-gray-300">
                <span className="text-xs text-gray-500 font-medium">Page Break</span>
            </div>
            <div className="absolute top-[911mm] left-0 w-full h-[10mm] bg-gray-200 z-50 print:hidden flex items-center justify-center border-y border-gray-300">
                <span className="text-xs text-gray-500 font-medium">Page Break</span>
            </div>

            {/* Header */}
            <header className={style.header}>
                <h1 className={style.name}>{personalInfo.fullName || "Your Name"}</h1>
                <div className={style.contact}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.website && <span>• {personalInfo.website}</span>}
                    {personalInfo.linkedin && <span>• LinkedIn: {personalInfo.linkedin}</span>}
                    {personalInfo.github && <span>• GitHub: {personalInfo.github}</span>}
                </div>
                {personalInfo.summary && (
                    <p className="mt-4 text-sm leading-relaxed opacity-90">
                        {personalInfo.summary}
                    </p>
                )}
            </header>

            {/* Experience */}
            {experience.length > 0 && (
                <section>
                    <h2 className={style.sectionTitle}>{t.experience}</h2>
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline">
                                    <div>
                                        <div className={style.jobTitle}>{exp.position}</div>
                                        <div className={style.company}>{exp.company}</div>
                                    </div>
                                    <div className={style.date}>
                                        {exp.startDate} - {exp.current ? t.current : exp.endDate}
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="mt-2 text-sm whitespace-pre-line opacity-90">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section>
                    <h2 className={style.sectionTitle}>{t.projects}</h2>
                    <div className="space-y-6">
                        {projects.map((project, index) => (
                            <div key={project.id} className="break-inside-avoid">
                                <div className="flex justify-between items-baseline">
                                    <div className="flex-1">
                                        <div className={style.jobTitle}>{project.name}</div>
                                        <div className="flex flex-col gap-0.5 mt-1">
                                            {project.link && (
                                                <div className="text-xs text-blue-600">
                                                    <span className="font-medium">Live-demo: </span>
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                                                        {project.link}
                                                    </a>
                                                </div>
                                            )}
                                            {project.github && (
                                                <div className="text-xs text-gray-600">
                                                    <span className="font-medium">GitHub: </span>
                                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                                                        {project.github}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {project.technologies && (
                                        <div className={style.date}>{project.technologies}</div>
                                    )}
                                </div>
                                <div className="mt-1 text-sm opacity-90 whitespace-pre-line">
                                    {project.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Spacer to prevent content from getting too close to page break */}
            <div className="h-4 print:hidden" />

            {/* Education */}
            {education.length > 0 && (
                <section>
                    <h2 className={style.sectionTitle}>{t.education}</h2>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline">
                                    <div>
                                        <div className={style.jobTitle}>{edu.school}</div>
                                        <div className={style.company}>{edu.degree} {edu.field && `in ${edu.field}`}</div>
                                    </div>
                                    <div className={style.date}>
                                        {edu.startDate} - {edu.current ? t.current : edu.endDate}
                                    </div>
                                </div>
                                {edu.description && (
                                    <p className="mt-1 text-sm opacity-90">{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <h2 className={style.sectionTitle}>{t.skills}</h2>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        {skills.map((skill, index) => (
                            <span key={skill.id}>
                                {skill.name}
                                {index < skills.length - 1 && ", "}
                            </span>
                        ))}
                    </p>
                </section>
            )}
        </div>
    );
}
