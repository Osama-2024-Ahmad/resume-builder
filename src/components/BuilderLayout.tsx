"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, GraduationCap, Wrench, FileText, LayoutTemplate, Code, FolderGit2, RotateCcw, Menu, X, Download } from "lucide-react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import TemplateForm from "./forms/TemplateForm";
import ResumePreview from "./ResumePreview";
import Link from "next/link";
import { exportToPdf } from "@/lib/pdf";
import { useResumeStore } from "@/lib/store";
import ATSChecker from "./ATSChecker";
import LanguageSwitcher from "./LanguageSwitcher";
import APIKeyInitializer from "./APIKeyInitializer";
import { translations } from "@/lib/translations";

export default function BuilderLayout() {
    const [activeTab, setActiveTab] = useState("personal");
    const [resetKey, setResetKey] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { language, reset, resumeData } = useResumeStore();
    const t = translations[language].builder;

    const handleExport = async () => {
        const fullName = resumeData.personalInfo.fullName || "resume";
        const sanitizedName = fullName.trim().replace(/\s+/g, "-");
        const fileName = `${sanitizedName}-resume.pdf`;
        await exportToPdf('resume-preview', fileName);
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all data? This action cannot be undone.")) {
            try {
                // Clear ALL localStorage to ensure complete reset
                localStorage.clear();
                // Use a hard navigation instead of reload to ensure fresh state
                window.location.href = window.location.pathname;
            } catch (error) {
                console.error("Error during reset:", error);
                alert("Failed to reset. Please try again.");
            }
        }
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        setMobileMenuOpen(false); // Close mobile menu when tab is selected
    };

    const tabs = [
        { value: "personal", icon: User, label: t.tabs.personal },
        { value: "experience", icon: Briefcase, label: t.tabs.experience },
        { value: "projects", icon: FolderGit2, label: "Projects" },
        { value: "education", icon: GraduationCap, label: t.tabs.education },
        { value: "skills", icon: Code, label: t.tabs.skills },
        { value: "templates", icon: LayoutTemplate, label: t.tabs.templates },
    ];

    return (
        <>
            <APIKeyInitializer />
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <header className="border-b px-3 sm:px-6 py-3 bg-background sticky top-0 z-50">
                    <div className="flex items-center justify-between">
                        {/* Left side - Logo and Reset */}
                        <div className="flex items-center gap-2">
                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="md:hidden"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>

                            <Link href="/" className="font-bold text-lg sm:text-xl flex items-center gap-2">
                                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                <span className="hidden sm:inline">Resume Builder</span>
                                <span className="sm:hidden">RB</span>
                            </Link>

                            <div className="h-6 w-px bg-gray-200 mx-1 sm:mx-2 hidden sm:block" />

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors hidden sm:flex"
                            >
                                <RotateCcw className="h-4 w-4 sm:mr-2" />
                                <span className="hidden sm:inline">Reset Data</span>
                            </Button>
                        </div>

                        {/* Right side - Actions */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            <div className="hidden sm:block">
                                <LanguageSwitcher />
                            </div>

                            <div className="hidden lg:block">
                                <ATSChecker />
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleExport}
                                className="text-xs sm:text-sm"
                            >
                                <Download className="h-4 w-4 sm:mr-2" />
                                <span className="hidden sm:inline">{t.header.export}</span>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-2 border-t pt-4">
                            <div className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.value}
                                            onClick={() => handleTabChange(tab.value)}
                                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${activeTab === tab.value
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted"
                                                }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}

                                <div className="pt-2 border-t space-y-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleReset}
                                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                                    >
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        Reset Data
                                    </Button>

                                    <div className="flex gap-2">
                                        <LanguageSwitcher />
                                        <ATSChecker />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                <main className="flex-1 flex overflow-hidden">
                    {/* Desktop Sidebar */}
                    <aside className="w-64 border-r bg-muted/30 overflow-y-auto hidden md:block">
                        <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="h-full">
                            <TabsList className="flex flex-col h-full justify-start space-y-1 p-2 bg-transparent">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <TabsTrigger
                                            key={tab.value}
                                            value={tab.value}
                                            className="w-full justify-start px-3 py-2"
                                        >
                                            <Icon className="h-4 w-4 mr-2" />
                                            {tab.label}
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>
                        </Tabs>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                            <div key={resetKey} className="max-w-3xl mx-auto space-y-6 pb-20">
                                {activeTab === "personal" && <PersonalInfoForm onNext={() => setActiveTab("experience")} />}
                                {activeTab === "experience" && <ExperienceForm onNext={() => setActiveTab("projects")} />}
                                {activeTab === "education" && <EducationForm onNext={() => setActiveTab("skills")} />}
                                {activeTab === "skills" && <SkillsForm onNext={() => setActiveTab("templates")} />}
                                {activeTab === "projects" && <ProjectsForm onNext={() => setActiveTab("education")} />}
                                {activeTab === "templates" && <TemplateForm />}
                            </div>
                        </div>
                    </div>

                    {/* Preview Area (Hidden on mobile and tablet, visible on large screens) */}
                    <div className="w-[45%] bg-muted/30 border-l hidden lg:block overflow-y-auto p-6">
                        <div className="sticky top-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-semibold text-sm text-muted-foreground">Live Preview</h3>
                            </div>
                            <div className="border rounded-lg shadow-sm bg-white overflow-auto min-h-[800px] origin-top transform scale-[0.85] transition-transform">
                                <ResumePreview />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
