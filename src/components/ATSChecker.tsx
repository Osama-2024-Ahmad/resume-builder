"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { translations } from "@/lib/translations";

export default function ATSChecker() {
    const { language } = useResumeStore();
    const t = translations[language].ats;

    return (
        <Button
            variant="outline"
            size="sm"
            asChild
        >
            <a
                href="https://resume-checker-pi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Search className="h-4 w-4 mr-2" />
                {t.title}
            </a>
        </Button>
    );
}
