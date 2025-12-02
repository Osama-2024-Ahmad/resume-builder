"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/lib/schemas";
import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { translations } from "@/lib/translations";

const projectListSchema = z.object({
    projects: z.array(projectSchema.extend({ id: z.string() }))
});

type ProjectListValues = z.infer<typeof projectListSchema>;

interface ProjectsFormProps {
    onNext: () => void;
}

export default function ProjectsForm({ onNext }: ProjectsFormProps) {
    const { resumeData, addProject, updateProject, removeProject, language } = useResumeStore();
    // Fallback to English if translation is missing for projects
    const t = translations[language]?.builder?.projects || {
        title: "Projects",
        desc: "Add your relevant projects",
        add: "Add Project",
        name: "Project Name",
        description: "Description",
        link: "Project Link",
        github: "GitHub Link",
        technologies: "Technologies"
    };

    const form = useForm<ProjectListValues>({
        resolver: zodResolver(projectListSchema),
        defaultValues: {
            projects: resumeData.projects || []
        },
        mode: "onChange"
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "projects"
    });

    const handleAdd = () => {
        const newProject = {
            id: uuidv4(),
            name: "",
            description: "",
            link: "",
            github: "",
            technologies: ""
        };
        append(newProject);
        addProject(newProject);
    };

    const handleRemove = (index: number, id: string) => {
        remove(index);
        removeProject(id);
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
                                        const id = form.getValues(`projects.${index}.id`);
                                        handleRemove(index, id);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.name}</label>
                                        <Input
                                            placeholder="Project Name"
                                            value={form.watch(`projects.${index}.name`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`projects.${index}.name`, e.target.value);
                                                const id = form.getValues(`projects.${index}.id`);
                                                updateProject(id, { name: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.technologies}</label>
                                        <Input
                                            placeholder="React, Node.js, etc."
                                            value={form.watch(`projects.${index}.technologies`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`projects.${index}.technologies`, e.target.value);
                                                const id = form.getValues(`projects.${index}.id`);
                                                updateProject(id, { technologies: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.link}</label>
                                        <Input
                                            placeholder="https://project.com"
                                            value={form.watch(`projects.${index}.link`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`projects.${index}.link`, e.target.value);
                                                const id = form.getValues(`projects.${index}.id`);
                                                updateProject(id, { link: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t.github}</label>
                                        <Input
                                            placeholder="https://github.com/user/project"
                                            value={form.watch(`projects.${index}.github`) || ""}
                                            onChange={(e) => {
                                                form.setValue(`projects.${index}.github`, e.target.value);
                                                const id = form.getValues(`projects.${index}.id`);
                                                updateProject(id, { github: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t.description}</label>
                                    <textarea
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Project description..."
                                        value={form.watch(`projects.${index}.description`) || ""}
                                        onChange={(e) => {
                                            form.setValue(`projects.${index}.description`, e.target.value);
                                            const id = form.getValues(`projects.${index}.id`);
                                            updateProject(id, { description: e.target.value });
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
