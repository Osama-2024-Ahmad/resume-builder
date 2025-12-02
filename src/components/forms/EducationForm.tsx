"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationBaseSchema } from "@/lib/schemas";
import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { translations } from "@/lib/translations";

const educationListSchema = z.object({
    education: z.array(educationBaseSchema.extend({ id: z.string() }))
});

type EducationListValues = z.infer<typeof educationListSchema>;

interface EducationFormProps {
    onNext: () => void;
}

export default function EducationForm({ onNext }: EducationFormProps) {
    const { resumeData, addEducation, updateEducation, removeEducation, language } = useResumeStore();
    const t = translations[language].builder.education;

    const form = useForm<EducationListValues>({
        resolver: zodResolver(educationListSchema),
        defaultValues: {
            education: resumeData.education
        },
        mode: "onChange"
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "education"
    });

    const handleAdd = () => {
        const newEdu = {
            id: uuidv4(),
            school: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            current: false,
            description: ""
        };
        append(newEdu);
        addEducation(newEdu);
    };

    const handleRemove = (index: number, id: string) => {
        remove(index);
        removeEducation(id);
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
                                    {t.school} {index + 1}
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => {
                                        const id = form.getValues(`education.${index}.id`);
                                        handleRemove(index, id);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.school}</label>
                                        <Input
                                            placeholder="University of Technology"
                                            value={form.watch(`education.${index}.school`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`education.${index}.school`, e.target.value);
                                                const id = form.getValues(`education.${index}.id`);
                                                updateEducation(id, { school: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.degree}</label>
                                        <Input
                                            placeholder="Bachelor of Science"
                                            value={form.watch(`education.${index}.degree`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`education.${index}.degree`, e.target.value);
                                                const id = form.getValues(`education.${index}.id`);
                                                updateEducation(id, { degree: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.field}</label>
                                        <Input
                                            placeholder="Computer Science"
                                            value={form.watch(`education.${index}.field`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`education.${index}.field`, e.target.value);
                                                const id = form.getValues(`education.${index}.id`);
                                                updateEducation(id, { field: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.startDate}</label>
                                        <Input
                                            placeholder="YYYY"
                                            value={form.watch(`education.${index}.startDate`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`education.${index}.startDate`, e.target.value);
                                                const id = form.getValues(`education.${index}.id`);
                                                updateEducation(id, { startDate: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.endDate}</label>
                                        <Input
                                            placeholder="YYYY"
                                            disabled={form.watch(`education.${index}.current`)}
                                            value={form.watch(`education.${index}.endDate`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`education.${index}.endDate`, e.target.value);
                                                const id = form.getValues(`education.${index}.id`);
                                                updateEducation(id, { endDate: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`edu-current-${field.id}`}
                                        className="h-4 w-4 rounded border-gray-300"
                                        checked={form.watch(`education.${index}.current`) || false}
                                        onChange={(e) => {
                                            form.setValue(`education.${index}.current`, e.target.checked);
                                            const id = form.getValues(`education.${index}.id`);
                                            updateEducation(id, { current: e.target.checked });
                                        }}
                                    />
                                    <label htmlFor={`edu-current-${field.id}`} className="text-sm font-medium">
                                        {t.current}
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t.description}</label>
                                    <textarea
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Honors, activities, etc."
                                        value={form.watch(`education.${index}.description`) || ""}
                                        onChange={(e) => {
                                            form.setValue(`education.${index}.description`, e.target.value);
                                            const id = form.getValues(`education.${index}.id`);
                                            updateEducation(id, { description: e.target.value });
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
