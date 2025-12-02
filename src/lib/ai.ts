export async function generateContent(apiKey: string, prompt: string) {
    try {
        console.log("Making API request to OpenRouter...");
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
                'X-Title': 'Resume Builder'
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

        console.log("API Response Status:", response.status, response.statusText);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API Error Response:", errorData);
            throw new Error(`API request failed (${response.status}): ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response received successfully");
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
