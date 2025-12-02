"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "@/lib/schemas";
import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect } from "react";
import { z } from "zod";
import AIButton from "@/components/AIButton";
import { PROMPTS } from "@/lib/ai";
import { translations } from "@/lib/translations";

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
    onNext: () => void;
}

export default function PersonalInfoForm({ onNext }: PersonalInfoFormProps) {
    const { resumeData, updatePersonalInfo, language } = useResumeStore();
    const t = translations[language].builder.personal;

    const form = useForm<PersonalInfoValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: resumeData.personalInfo,
        mode: "onChange",
    });

    // Update form when store changes (e.g. on load)
    // Removed to prevent infinite loop with auto-save
    // useEffect(() => {
    //     form.reset(resumeData.personalInfo);
    // }, [resumeData.personalInfo, form]);

    // Auto-save to store on change
    useEffect(() => {
        const subscription = form.watch((value) => {
            // We need to cast value because watch returns Partial<T> and we want to ensure it matches our store expectations
            // Ideally we should validate here too, but for auto-save we can be lenient or just save valid parts
            // For now, let's just save.
            if (value) {
                updatePersonalInfo(value as Partial<PersonalInfoValues>);
            }
        });
        return () => subscription.unsubscribe();
    }, [form, updatePersonalInfo]);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{t.title}</CardTitle>
                    <CardDescription>
                        {t.desc}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="text-sm font-medium">{t.fullName}</label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                {...form.register("fullName")}
                                className={form.formState.errors.fullName ? "border-red-500" : ""}
                            />
                            {form.formState.errors.fullName && (
                                <p className="text-xs text-red-500">{form.formState.errors.fullName.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">{t.email}</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                {...form.register("email")}
                                className={form.formState.errors.email ? "border-red-500" : ""}
                            />
                            {form.formState.errors.email && (
                                <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">{t.phone}</label>
                            <Input
                                id="phone"
                                placeholder="+1 (555) 000-0000"
                                {...form.register("phone")}
                                className={form.formState.errors.phone ? "border-red-500" : ""}
                            />
                            {form.formState.errors.phone && (
                                <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-medium">{t.location}</label>
                            <Input
                                id="location"
                                placeholder="New York, NY"
                                {...form.register("location")}
                                className={form.formState.errors.location ? "border-red-500" : ""}
                            />
                            {form.formState.errors.location && (
                                <p className="text-xs text-red-500">{form.formState.errors.location.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="summary" className="text-sm font-medium">{t.summary}</label>
                            <AIButton
                                prompt={PROMPTS.summary(
                                    form.watch("fullName") || "Professional",
                                    form.watch("summary") || "various roles"
                                )}
                                onGenerate={(text) => {
                                    form.setValue("summary", text);
                                    updatePersonalInfo({ summary: text });
                                }}
                                label={t.generateSummary}
                            />
                        </div>
                        <textarea
                            id="summary"
                            className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${form.formState.errors.summary ? "border-red-500" : ""}`}
                            placeholder="Experienced software engineer with a passion for..."
                            {...form.register("summary")}
                        />
                        {form.formState.errors.summary && (
                            <p className="text-xs text-red-500">{form.formState.errors.summary.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="website" className="text-sm font-medium">{t.website}</label>
                            <Input
                                id="website"
                                placeholder="https://johndoe.com"
                                {...form.register("website")}
                                className={form.formState.errors.website ? "border-red-500" : ""}
                            />
                            {form.formState.errors.website && (
                                <p className="text-xs text-red-500">{form.formState.errors.website.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="linkedin" className="text-sm font-medium">{t.linkedin}</label>
                            <Input
                                id="linkedin"
                                placeholder="https://linkedin.com/in/johndoe"
                                {...form.register("linkedin")}
                                className={form.formState.errors.linkedin ? "border-red-500" : ""}
                            />
                            {form.formState.errors.linkedin && (
                                <p className="text-xs text-red-500">{form.formState.errors.linkedin.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="github" className="text-sm font-medium">{t.github}</label>
                            <Input
                                id="github"
                                placeholder="https://github.com/johndoe"
                                {...form.register("github")}
                                className={form.formState.errors.github ? "border-red-500" : ""}
                            />
                            {form.formState.errors.github && (
                                <p className="text-xs text-red-500">{form.formState.errors.github.message}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end mt-4">
                <Button onClick={onNext} variant="outline" className="w-full sm:w-auto">
                    Next
                </Button>
            </div>
        </>
    );
}
