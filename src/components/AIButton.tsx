"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { generateContent } from "@/lib/ai";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AIButtonProps {
    prompt: string;
    onGenerate: (text: string) => void;
    label?: string;
    context?: string; // e.g. "summary", "experience"
}

export default function AIButton({ prompt, onGenerate, label = "Generate with AI", context }: AIButtonProps) {
    const { apiKey, setApiKey } = useResumeStore();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [tempKey, setTempKey] = useState("");

    const handleGenerate = async () => {
        const keyToUse = apiKey || tempKey;
        if (!keyToUse) {
            setOpen(true);
            return;
        }

        setLoading(true);
        try {
            console.log("Generating content with API key:", keyToUse ? "Present" : "Missing");
            const text = await generateContent(keyToUse, prompt);
            onGenerate(text);
            if (tempKey) {
                setApiKey(tempKey);
                setTempKey("");
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            alert(`Failed to generate content. Please check your API key.\n\nError: ${errorMessage}`);
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={handleGenerate}
                disabled={loading}
                className="gap-2 text-purple-600 border-purple-200 hover:bg-purple-50"
                type="button"
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                {label}
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter OpenAI API Key</DialogTitle>
                        <DialogDescription>
                            To use AI features, you need an OpenAI-compatible API key. Your key is stored locally in your browser.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="apiKey" className="text-right">
                                API Key
                            </Label>
                            <Input
                                id="apiKey"
                                value={tempKey}
                                onChange={(e) => setTempKey(e.target.value)}
                                className="col-span-3"
                                placeholder="sk-or-v1-..."
                            />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            Using OpenRouter for OpenAI compatibility. Your key is stored locally.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => {
                            if (tempKey) {
                                setApiKey(tempKey);
                                setOpen(false);
                                handleGenerate();
                            }
                        }}>Save & Generate</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
