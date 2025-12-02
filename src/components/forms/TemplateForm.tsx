"use client";

import { useResumeStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { translations } from "@/lib/translations";

export default function TemplateForm() {
    const { selectedTemplate, setTemplate, language } = useResumeStore();
    const t = translations[language].builder.templates;

    const templates = [
        { id: 'modern', name: 'Modern', color: 'bg-blue-500' },
        { id: 'classic', name: 'Classic', color: 'bg-gray-800' },
        { id: 'minimal', name: 'Minimal', color: 'bg-white border' },
    ] as const;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">{t.title}</h2>
                <p className="text-muted-foreground">{t.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <Card
                        key={template.id}
                        className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setTemplate(template.id)}
                    >
                        <CardContent className="p-4 space-y-4">
                            <div className={`aspect-[210/297] w-full rounded-md shadow-sm ${template.color} relative overflow-hidden`}>
                                {/* Mock preview of template structure */}
                                <div className="absolute inset-0 opacity-20 bg-current" />
                                <div className="p-2 space-y-2">
                                    <div className="h-2 w-1/2 bg-white/50 rounded" />
                                    <div className="h-1 w-3/4 bg-white/30 rounded" />
                                    <div className="h-1 w-full bg-white/30 rounded" />
                                    <div className="space-y-1 pt-2">
                                        <div className="h-1 w-full bg-white/20 rounded" />
                                        <div className="h-1 w-full bg-white/20 rounded" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{template.name}</span>
                                {selectedTemplate === template.id && (
                                    <Check className="h-4 w-4 text-primary" />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
