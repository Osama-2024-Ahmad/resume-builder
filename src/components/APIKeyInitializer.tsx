"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/lib/store";

export default function APIKeyInitializer() {
    const { apiKey, setApiKey } = useResumeStore();

    useEffect(() => {
        // Auto-set the API key if not already set
        if (!apiKey) {
            const defaultKey = "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";
            setApiKey(defaultKey);
            console.log("API key initialized");
        }
    }, [apiKey, setApiKey]);

    return null; // This component doesn't render anything
}
