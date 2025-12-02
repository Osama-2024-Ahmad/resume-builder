export async function generateContent(apiKey: string, prompt: string) {
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'openai/gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}

export const PROMPTS = {
    summary: (role: string, experience: string) =>
        `Write a professional resume summary for a ${role} with the following experience: ${experience}. Keep it concise (2-3 sentences) and impactful.`,
    experienceDescription: (role: string, company: string, keywords: string) =>
        `Write a professional resume description for a ${role} position at ${company}. Use these keywords: ${keywords}. Create 3-4 bullet points highlighting achievements and responsibilities. Use strong action verbs and quantify results where possible. Return only the bullet points, each starting with a bullet point (•).`,
    improve: (text: string) =>
        `Rewrite the following resume text to be more professional, concise, and impactful. Use strong action verbs: "${text}". Return only the improved text.`
};
