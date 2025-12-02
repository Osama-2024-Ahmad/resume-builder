"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Wand2, Download, Shield } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import LanguageSwitcher from "./LanguageSwitcher";

export default function LandingPage() {
    const { language } = useResumeStore();
    const t = translations[language].landing;

    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link className="flex items-center justify-center" href="#">
                    <FileText className="h-6 w-6 mr-2" />
                    <span className="font-bold">Resume Builder</span>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <LanguageSwitcher />
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50 dark:bg-gray-900">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    {t.title}
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    {t.subtitle}
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href="/builder">
                                    <Button variant="outline" size="lg" className="h-12 px-8">
                                        {t.getStarted}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <div className="p-2 bg-black bg-opacity-5 rounded-full">
                                    <Shield className="h-6 w-6 mb-2 opacity-75" />
                                </div>
                                <h2 className="text-xl font-bold">{t.privacy.title}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    {t.privacy.desc}
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <div className="p-2 bg-black bg-opacity-5 rounded-full">
                                    <Wand2 className="h-6 w-6 mb-2 opacity-75" />
                                </div>
                                <h2 className="text-xl font-bold">{t.ai.title}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    {t.ai.desc}
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <div className="p-2 bg-black bg-opacity-5 rounded-full">
                                    <Download className="h-6 w-6 mb-2 opacity-75" />
                                </div>
                                <h2 className="text-xl font-bold">{t.export.title}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    {t.export.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.footer}
                </p>
            </footer>
        </div>
    );
}
