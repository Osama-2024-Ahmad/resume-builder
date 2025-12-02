
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceBaseSchema } from "@/lib/schemas";
import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import AIButton from "@/components/AIButton";
import { PROMPTS } from "@/lib/ai";
import { translations } from "@/lib/translations";

// Schema for the form, which is an array of experiences
// But we handle one by one or list? 
// The store has add/update/remove. 
// Let's make a list view and an edit view, or just a list of forms.
// A list of forms is easier for the user to see everything at once.

const experienceListSchema = z.object({
    experiences: z.array(experienceBaseSchema.extend({ id: z.string() }))
});

type ExperienceListValues = z.infer<typeof experienceListSchema>;

interface ExperienceFormProps {
    onNext: () => void;
}

export default function ExperienceForm({ onNext }: ExperienceFormProps) {
    const { resumeData, addExperience, updateExperience, removeExperience, language } = useResumeStore();
    const t = translations[language].builder.experience;

    // We'll manage the form state locally and sync to store on blur or submit?
    // Or just use the store directly?
    // Using react-hook-form with useFieldArray is best for dynamic lists.

    const form = useForm<ExperienceListValues>({
        resolver: zodResolver(experienceListSchema),
        defaultValues: {
            experiences: resumeData.experience
        },
        mode: "onChange"
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "experiences"
    });

    const handleAdd = () => {
        const newExp = {
            id: uuidv4(),
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            current: false,
            keywords: "",
            description: ""
        };
        append(newExp);
        addExperience(newExp);
    };

    const handleRemove = (index: number, id: string) => {
        remove(index);
        removeExperience(id);
    };

    // Watch for changes and update store
    // This might be heavy if we update on every keystroke for the whole array.
    // Instead, let's update individual items when they change.
    // But useFieldArray makes it tricky to track individual item updates without watching the whole array.
    // For simplicity, let's watch the whole array for now.

    // Actually, a better UX might be: List of items (summary view) + "Add New" button that opens a modal or expands a form.
    // But the requirement says "Resume builder with fields".
    // Let's stick to a list of expanded cards for now, it's simple and effective.

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{t.title}</h2>
                        <p className="text-muted-foreground">{t.desc}</p>
                    </div>
                    <Button onClick={handleAdd} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        {t.add}
                    </Button>
                </div>

                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <Card key={field.id}>
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium">
                                    {t.position} {index + 1}
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => {
                                        const id = form.getValues(`experiences.${index}.id`);
                                        handleRemove(index, id);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.company}</label>
                                        <Input
                                            placeholder="Company Name"
                                            value={form.watch(`experiences.${index}.company`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`experiences.${index}.company`, e.target.value);
                                                const id = form.getValues(`experiences.${index}.id`);
                                                updateExperience(id, { company: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.position}</label>
                                        <Input
                                            placeholder="Job Title"
                                            value={form.watch(`experiences.${index}.position`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`experiences.${index}.position`, e.target.value);
                                                const id = form.getValues(`experiences.${index}.id`);
                                                updateExperience(id, { position: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.startDate}</label>
                                        <Input
                                            placeholder="MM/YYYY"
                                            value={form.watch(`experiences.${index}.startDate`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`experiences.${index}.startDate`, e.target.value);
                                                const id = form.getValues(`experiences.${index}.id`);
                                                updateExperience(id, { startDate: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.endDate}</label>
                                        <Input
                                            placeholder="MM/YYYY"
                                            disabled={form.watch(`experiences.${index}.current`)}
                                            value={form.watch(`experiences.${index}.endDate`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`experiences.${index}.endDate`, e.target.value);
                                                const id = form.getValues(`experiences.${index}.id`);
                                                updateExperience(id, { endDate: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`current-${field.id}`}
                                        className="h-4 w-4 rounded border-gray-300"
                                        checked={form.watch(`experiences.${index}.current`) || false}
                                        onChange={(e) => {
                                            form.setValue(`experiences.${index}.current`, e.target.checked);
                                            const id = form.getValues(`experiences.${index}.id`);
                                            updateExperience(id, { current: e.target.checked });
                                        }}
                                    />
                                    <label htmlFor={`current-${field.id}`} className="text-sm font-medium">
                                        {t.current}
                                    </label>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium">{t.keywords}</label>
                                            <AIButton
                                                prompt={PROMPTS.experienceDescription(
                                                    form.watch(`experiences.${index}.position`) || "Professional",
                                                    form.watch(`experiences.${index}.company`) || "Company",
                                                    form.watch(`experiences.${index}.keywords`) || "achievements, responsibilities"
                                                )}
                                                onGenerate={(text) => {
                                                    form.setValue(`experiences.${index}.description`, text);
                                                    const id = form.getValues(`experiences.${index}.id`);
                                                    updateExperience(id, { description: text });
                                                }}
                                                label={t.generateAI}
                                            />
                                        </div>
                                        <Input
                                            placeholder={t.placeholderKeywords}
                                            value={form.watch(`experiences.${index}.keywords`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`experiences.${index}.keywords`, e.target.value);
                                                const id = form.getValues(`experiences.${index}.id`);
                                                updateExperience(id, { keywords: e.target.value });
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.description}</label>
                                        <textarea
                                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder={t.generatedText}
                                            value={form.watch(`experiences.${index}.description`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`experiences.${index}.description`, e.target.value);
                                                const id = form.getValues(`experiences.${index}.id`);
                                                updateExperience(id, { description: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {fields.length === 0 && (
                        <div className="text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground">
                            {t.add}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button onClick={onNext} variant="outline" className="w-full sm:w-auto">
                    Next
                </Button>
            </div>
        </>
    );
}
