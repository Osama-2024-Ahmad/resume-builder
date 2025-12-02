import { ResumeData } from "@/lib/types";

export default function ModernTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, experience, education, skills } = data;

    return (
        <div className="w-full h-full bg-white text-black p-8" id="resume-content">
            {/* Header */}
            <div className="border-b-2 border-gray-800 pb-6 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900 mb-2">
                    {personalInfo.fullName || "Your Name"}
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.website && <span>• {personalInfo.website}</span>}
                    {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                </div>
            </div>

            {/* Summary */}
            {personalInfo.summary && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b mb-3 pb-1">Summary</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {personalInfo.summary}
                    </p>
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b mb-4 pb-1">Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                                    <span className="text-sm text-gray-600 font-medium">
                                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-700 font-semibold mb-2">{exp.company}</div>
                                <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                                    {exp.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b mb-4 pb-1">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{edu.school}</h3>
                                    <span className="text-sm text-gray-600 font-medium">
                                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-700">
                                    <span className="font-semibold">{edu.degree}</span> in {edu.field}
                                </div>
                                {edu.description && (
                                    <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b mb-4 pb-1">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span
                                key={skill.id}
                                className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-white"
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
