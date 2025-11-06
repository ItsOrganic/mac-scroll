"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Brain,
    ArrowLeft,
    Save,
    Play,
    MessageSquare,
    Zap,
    Plus,
    Settings,
    Trash2,
    ChevronRight,
    Sparkles
} from "lucide-react";
import Link from "next/link";

interface WorkflowStep {
    id: string;
    type: 'trigger' | 'action' | 'condition' | 'transform';
    name: string;
    description: string;
    config: Record<string, any>;
}

export default function NewWorkflowPage() {
    const [workflowName, setWorkflowName] = useState("");
    const [workflowDescription, setWorkflowDescription] = useState("");
    const [aiPrompt, setAiPrompt] = useState("");
    const [steps, setSteps] = useState<WorkflowStep[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState<'ai' | 'visual'>('ai');

    const availableSteps = [
        {
            type: 'trigger',
            name: 'Slack Message',
            description: 'Trigger when a new message is posted',
            icon: '💬',
            service: 'slack'
        },
        {
            type: 'trigger',
            name: 'Gmail Email',
            description: 'Trigger when a new email arrives',
            icon: '📧',
            service: 'gmail'
        },
        {
            type: 'action',
            name: 'Send Slack Message',
            description: 'Send a message to a Slack channel',
            icon: '📤',
            service: 'slack'
        },
        {
            type: 'action',
            name: 'Send Gmail',
            description: 'Send an email via Gmail',
            icon: '📨',
            service: 'gmail'
        },
        {
            type: 'transform',
            name: 'Summarize Text',
            description: 'AI-powered text summarization',
            icon: '📝',
            service: 'ai'
        },
        {
            type: 'condition',
            name: 'If/Else Logic',
            description: 'Add conditional branching',
            icon: '🔀',
            service: 'logic'
        }
    ];

    const generateWorkflowFromAI = async () => {
        if (!aiPrompt.trim()) return;

        setIsGenerating(true);

        // Simulate AI processing
        setTimeout(() => {
            const generatedSteps: WorkflowStep[] = [
                {
                    id: '1',
                    type: 'trigger',
                    name: 'New Slack Message',
                    description: 'Trigger when a new message is posted in #general',
                    config: { channel: '#general', keywords: ['urgent'] }
                },
                {
                    id: '2',
                    type: 'transform',
                    name: 'Summarize Message',
                    description: 'Summarize the message content',
                    config: { maxLength: 200 }
                },
                {
                    id: '3',
                    type: 'action',
                    name: 'Send Gmail Notification',
                    description: 'Send email notification to admin',
                    config: { to: 'admin@company.com', subject: 'Urgent Slack Message' }
                }
            ];

            setSteps(generatedSteps);
            setWorkflowName("Slack to Gmail Notifications");
            setWorkflowDescription("Automatically notify admin via email when urgent messages are posted in Slack");
            setIsGenerating(false);
        }, 2000);
    };

    const addStep = (stepTemplate: any) => {
        const newStep: WorkflowStep = {
            id: Date.now().toString(),
            type: stepTemplate.type,
            name: stepTemplate.name,
            description: stepTemplate.description,
            config: {}
        };
        setSteps([...steps, newStep]);
    };

    const removeStep = (stepId: string) => {
        setSteps(steps.filter(step => step.id !== stepId));
    };

    const saveWorkflow = () => {
        // Simulate saving workflow
        console.log('Saving workflow:', {
            name: workflowName,
            description: workflowDescription,
            steps
        });
        // Redirect to workflows page
        window.location.href = '/workflows';
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/workflows">
                                <Button variant="ghost" className="text-gray-300 hover:text-white">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Workflows
                                </Button>
                            </Link>
                            <div className="flex items-center space-x-2">
                                <Brain className="h-8 w-8 text-blue-600" />
                                <span className="text-xl font-bold">Concatinate</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                <Save className="h-4 w-4 mr-2" />
                                Save Draft
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Play className="h-4 w-4 mr-2" />
                                Test Workflow
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create New Workflow</h1>
                    <p className="text-gray-400">Build powerful automations with AI assistance or visual drag-and-drop</p>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 mb-8">
                    <button
                        onClick={() => setActiveTab('ai')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'ai'
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Sparkles className="h-4 w-4 inline mr-2" />
                        AI Builder
                    </button>
                    <button
                        onClick={() => setActiveTab('visual')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'visual'
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Zap className="h-4 w-4 inline mr-2" />
                        Visual Builder
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Workflow Details */}
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white">Workflow Details</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Basic information about your workflow
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Workflow Name
                                    </label>
                                    <input
                                        type="text"
                                        value={workflowName}
                                        onChange={(e) => setWorkflowName(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Enter workflow name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={workflowDescription}
                                        onChange={(e) => setWorkflowDescription(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Describe what this workflow does"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI Builder */}
                        {activeTab === 'ai' && (
                            <Card className="bg-gray-900 border-gray-800">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                                        AI Workflow Builder
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        Describe your workflow in plain English and let AI build it for you
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Describe your workflow
                                        </label>
                                        <textarea
                                            value={aiPrompt}
                                            onChange={(e) => setAiPrompt(e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Example: When a new message is posted in Slack #general channel, summarize it and send an email notification to admin@company.com"
                                        />
                                    </div>
                                    <Button
                                        onClick={generateWorkflowFromAI}
                                        disabled={!aiPrompt.trim() || isGenerating}
                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="h-4 w-4 mr-2" />
                                                Generate Workflow
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Visual Builder */}
                        {activeTab === 'visual' && (
                            <Card className="bg-gray-900 border-gray-800">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <Zap className="h-5 w-5 mr-2 text-purple-400" />
                                        Visual Workflow Builder
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        Drag and drop steps to build your workflow
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="min-h-[400px] border-2 border-dashed border-gray-700 rounded-lg p-6">
                                        {steps.length === 0 ? (
                                            <div className="text-center py-12">
                                                <Zap className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-gray-300 mb-2">No steps added yet</h3>
                                                <p className="text-gray-500">Add steps from the sidebar to build your workflow</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {steps.map((step, index) => (
                                                    <div key={step.id} className="flex items-center space-x-4">
                                                        <div className="flex-1 bg-gray-800 rounded-lg p-4 border border-gray-700">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h4 className="font-medium text-white">{step.name}</h4>
                                                                    <p className="text-sm text-gray-400">{step.description}</p>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                                                                        {step.type}
                                                                    </Badge>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        onClick={() => removeStep(step.id)}
                                                                        className="text-gray-400 hover:text-red-400"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {index < steps.length - 1 && (
                                                            <ChevronRight className="h-5 w-5 text-gray-500" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Available Steps */}
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white">Available Steps</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Drag steps to build your workflow
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {availableSteps.map((step, index) => (
                                        <div
                                            key={index}
                                            onClick={() => addStep(step)}
                                            className="p-3 bg-gray-800 rounded-lg border border-gray-700 cursor-pointer hover:border-purple-500/50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span className="text-lg">{step.icon}</span>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-white text-sm">{step.name}</h4>
                                                    <p className="text-xs text-gray-400">{step.description}</p>
                                                </div>
                                                <Plus className="h-4 w-4 text-gray-400" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Workflow Actions */}
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    onClick={saveWorkflow}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                    disabled={!workflowName.trim() || steps.length === 0}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Workflow
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                                    disabled={steps.length === 0}
                                >
                                    <Play className="h-4 w-4 mr-2" />
                                    Test Workflow
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

