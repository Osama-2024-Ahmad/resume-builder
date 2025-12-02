"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/lib/store";

export default function APIKeyInitializer() {
    const { apiKey, setApiKey } = useResumeStore();

    useEffect(() => {
        // Auto-set the default API key if not already set
        // This allows users to use the app without providing their own API key
        const defaultApiKey = "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";
        const envKey = process.env.NEXT_PUBLIC_OPENAI_KEY || defaultApiKey;

        console.log("API Key Initialization:", {
            envKey: envKey ? "Available" : "Not available",
            currentApiKey: apiKey ? "Already set" : "Not set",
            usingDefault: !process.env.NEXT_PUBLIC_OPENAI_KEY
        });

        if (!apiKey && envKey) {
            setApiKey(envKey);
            console.log("API key initialized successfully");
        }
    }, [apiKey, setApiKey]);

    return null; // This component doesn't render anything
}
