import { z } from 'zod';

export const personalInfoSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    location: z.string().min(1, 'Location is required'),
    website: z.string().url('Invalid URL').optional().or(z.literal('')),
    linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
    github: z.string().url('Invalid URL').optional().or(z.literal('')),
    summary: z.string().min(10, 'Summary must be at least 10 characters'),
});

export const experienceBaseSchema = z.object({
    company: z.string().min(1, 'Company name is required'),
    position: z.string().min(1, 'Position is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional().or(z.literal('')),
    current: z.boolean(),
    keywords: z.string().optional(),
    description: z.string().min(10, 'Description must be at least 10 characters'),
});

export const experienceSchema = experienceBaseSchema.refine((data) => data.current || data.endDate, {
    message: "End date is required if not current",
    path: ["endDate"],
});

export const educationBaseSchema = z.object({
    school: z.string().min(1, 'School name is required'),
    degree: z.string().min(1, 'Degree is required'),
    field: z.string().min(1, 'Field of study is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional().or(z.literal('')),
    current: z.boolean(),
    description: z.string().optional(),
});

export const educationSchema = educationBaseSchema.refine((data) => data.current || data.endDate, {
    message: "End date is required if not current",
    path: ["endDate"],
});

export const skillSchema = z.object({
    name: z.string().min(1, 'Skill name is required'),
    level: z.number().min(1).max(5),
});

export const projectSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    link: z.string().url('Invalid URL').optional().or(z.literal('')),
    github: z.string().url('Invalid URL').optional().or(z.literal('')),
    technologies: z.string().optional(),
});
