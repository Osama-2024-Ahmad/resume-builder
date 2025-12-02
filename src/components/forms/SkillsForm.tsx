"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema } from "@/lib/schemas";
import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { translations } from "@/lib/translations";

const skillListSchema = z.object({
    skills: z.array(skillSchema.extend({ id: z.string() }))
});

type SkillListValues = z.infer<typeof skillListSchema>;

interface SkillsFormProps {
    onNext: () => void;
}

export default function SkillsForm({ onNext }: SkillsFormProps) {
    const { resumeData, addSkill, updateSkill, removeSkill, language } = useResumeStore();
    const t = translations[language].builder.skills;

    const form = useForm<SkillListValues>({
        resolver: zodResolver(skillListSchema),
        defaultValues: {
            skills: resumeData.skills
        },
        mode: "onChange"
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "skills"
    });

    const handleAdd = () => {
        const newSkill = {
            id: uuidv4(),
            name: "",
            level: 3
        };
        append(newSkill);
        addSkill(newSkill);
    };

    const handleRemove = (index: number, id: string) => {
        remove(index);
        removeSkill(id);
    };

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
                                    {t.name} {index + 1}
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => {
                                        const id = form.getValues(`skills.${index}.id`);
                                        handleRemove(index, id);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t.name}</label>
                                    <Input
                                        placeholder="e.g., JavaScript, React, Python"
                                        value={form.watch(`skills.${index}.name`) || ""}
                                        onChange={(e) => {
                                            form.setValue(`skills.${index}.name`, e.target.value);
                                            const id = form.getValues(`skills.${index}.id`);
                                            updateSkill(id, { name: e.target.value });
                                        }}
                                    />
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
