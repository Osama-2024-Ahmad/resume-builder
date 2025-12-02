import { ResumeData } from "@/lib/types";

export default function ClassicTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, experience, education, skills } = data;

    return (
        <div className="w-full h-full bg-white text-black p-10 font-serif" id="resume-content">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {personalInfo.fullName || "Your Name"}
                </h1>
                <div className="text-sm text-gray-600 space-x-2">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.email && <span>| {personalInfo.email}</span>}
                    {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                </div>
                <div className="text-sm text-gray-600 space-x-2 mt-1">
                    {personalInfo.website && <span>{personalInfo.website}</span>}
                    {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
                </div>
            </div>

            {/* Summary */}
            {personalInfo.summary && (
                <div className="mb-6">
                    <h2 className="text-base font-bold uppercase border-b border-gray-400 mb-2">Professional Summary</h2>
                    <p className="text-sm text-gray-800 leading-relaxed text-justify">
                        {personalInfo.summary}
                    </p>
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-base font-bold uppercase border-b border-gray-400 mb-4">Experience</h2>
                    <div className="space-y-5">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between font-bold text-gray-900 text-sm">
                                    <span>{exp.company}</span>
                                    <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                                </div>
                                <div className="text-sm italic text-gray-700 mb-1">{exp.position}</div>
                                <div className="text-sm text-gray-800 whitespace-pre-line pl-4">
                                    {exp.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-base font-bold uppercase border-b border-gray-400 mb-4">Education</h2>
                    <div className="space-y-3">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between font-bold text-gray-900 text-sm">
                                    <span>{edu.school}</span>
                                    <span>{edu.startDate} - {edu.current ? "Present" : edu.endDate}</span>
                                </div>
                                <div className="text-sm text-gray-800 mt-2">
                                    {edu.degree}, {edu.field}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div>
                    <h2 className="text-base font-bold uppercase border-b border-gray-400 mb-2">Skills</h2>
                    <p className="text-sm text-gray-800">
                        {skills.map(s => s.name).join(", ")}
                    </p>
                </div>
            )}
        </div>
    );
}
