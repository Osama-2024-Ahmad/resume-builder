"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/lib/store";

export default function APIKeyInitializer() {
    const { apiKey, setApiKey } = useResumeStore();

    useEffect(() => {
        // Auto-set the API key from environment variable if not already set
        const envKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
        console.log("Environment variable check:", {
            envKey: envKey ? "Found" : "Not found",
            currentApiKey: apiKey ? "Already set" : "Not set"
        });

        if (!apiKey && envKey) {
            setApiKey(envKey);
            console.log("API key initialized from environment");
        }
    }, [apiKey, setApiKey]);

    return null; // This component doesn't render anything
}
