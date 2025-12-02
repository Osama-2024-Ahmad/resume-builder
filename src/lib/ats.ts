import { ResumeData } from "./types";

export interface ATSResult {
    score: number;
    missingKeywords: string[];
    suggestions: string[];
}

export function calculateATSScore(data: ResumeData, jobDescription: string): ATSResult {
    let score = 0;
    const suggestions: string[] = [];
    const missingKeywords: string[] = [];

    // 1. Basic Structure Check (30 points)
    if (data.personalInfo.fullName) score += 5;
    else suggestions.push("Add your full name.");

    if (data.personalInfo.email) score += 5;
    else suggestions.push("Add your email address.");

    if (data.personalInfo.phone) score += 5;
    else suggestions.push("Add your phone number.");

    if (data.experience.length > 0) score += 10;
    else suggestions.push("Add at least one work experience.");

    if (data.education.length > 0) score += 5;
    else suggestions.push("Add your education details.");

    // 2. Content Length Check (10 points)
    const totalText = JSON.stringify(data).length;
    if (totalText > 500) score += 10;
    else suggestions.push("Your resume seems a bit short. Add more details to your experience.");

    // 3. Keyword Matching (60 points)
    if (jobDescription) {
        const resumeText = JSON.stringify(data).toLowerCase();
        const jdText = jobDescription.toLowerCase();

        // Extract potential keywords (simple approach: words > 4 chars)
        // In a real app, we'd use NLP or a predefined list.
        const words = jdText.match(/\b\w{5,}\b/g) || [];
        const uniqueKeywords = Array.from(new Set(words));

        let matchedCount = 0;
        const importantKeywords = uniqueKeywords.slice(0, 20); // Top 20 long words

        importantKeywords.forEach(keyword => {
            if (resumeText.includes(keyword)) {
                matchedCount++;
            } else {
                missingKeywords.push(keyword);
            }
        });

        const matchScore = Math.min(60, (matchedCount / importantKeywords.length) * 60);
        score += matchScore;

        if (matchScore < 30) {
            suggestions.push("Try to include more keywords from the job description.");
        }
    } else {
        // If no JD, give full points for this section but suggest adding one
        score += 60;
        suggestions.push("Paste a Job Description to check for keyword matching.");
    }

    return {
        score: Math.round(score),
        missingKeywords,
        suggestions
    };
}
