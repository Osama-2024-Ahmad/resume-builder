"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/lib/store";

export default function APIKeyInitializer() {
    const { apiKey, setApiKey } = useResumeStore();

    useEffect(() => {
        // Auto-set the API key from environment variable if not already set
        if (!apiKey) {
            const envKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
            if (envKey) {
                setApiKey(envKey);
                console.log("API key initialized from environment");
            }
        }
    }, [apiKey, setApiKey]);

    return null; // This component doesn't render anything
}
