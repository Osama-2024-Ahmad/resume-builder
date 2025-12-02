import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, ResumeData, Experience, Education, Skill, PersonalInfo } from './types';

const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
};

export const useResumeStore = create<AppState>()(
    persist(
        (set) => ({
            resumeData: initialResumeData,
            selectedTemplate: 'modern',
            apiKey: null,
            language: 'en',

            setResumeData: (data) => set({ resumeData: data }),

            updatePersonalInfo: (info) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        personalInfo: { ...state.resumeData.personalInfo, ...info },
                    },
                })),

            addExperience: (exp) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: [...state.resumeData.experience, exp],
                    },
                })),

            updateExperience: (id, exp) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: state.resumeData.experience.map((e) =>
                            e.id === id ? { ...e, ...exp } : e
                        ),
                    },
                })),

            removeExperience: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: state.resumeData.experience.filter((e) => e.id !== id),
                    },
                })),

            addEducation: (edu) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: [...state.resumeData.education, edu],
                    },
                })),

            updateEducation: (id, edu) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: state.resumeData.education.map((e) =>
                            e.id === id ? { ...e, ...edu } : e
                        ),
                    },
                })),

            removeEducation: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: state.resumeData.education.filter((e) => e.id !== id),
                    },
                })),

            addSkill: (skill) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: [...state.resumeData.skills, skill],
                    },
                })),

            updateSkill: (id, skill) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: state.resumeData.skills.map((s) =>
                            s.id === id ? { ...s, ...skill } : s
                        ),
                    },
                })),

            removeSkill: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: state.resumeData.skills.filter((s) => s.id !== id),
                    },
                })),

            addProject: (project) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        projects: [...(state.resumeData.projects || []), project],
                    },
                })),

            updateProject: (id, project) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        projects: (state.resumeData.projects || []).map((p) =>
                            p.id === id ? { ...p, ...project } : p
                        ),
                    },
                })),

            removeProject: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        projects: (state.resumeData.projects || []).filter((p) => p.id !== id),
                    },
                })),

            setTemplate: (id) => set({ selectedTemplate: id }),

            setApiKey: (key) => set({ apiKey: key }),

            setLanguage: (lang) => set({ language: lang }),

            reset: () => set({
                resumeData: JSON.parse(JSON.stringify(initialResumeData)),
                selectedTemplate: 'modern',
                apiKey: null,
                language: 'en'
            }),
        }),
        {
            name: 'resume-builder-storage',
        }
    )
);
