"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Brain,
    Plus,
    Play,
    Pause,
    Settings,
    BarChart3,
    Clock,
    CheckCircle,
    XCircle,
    Zap,
    Users,
    Activity
} from "lucide-react";
import Link from "next/link";

interface Workflow {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'error';
    lastRun: string;
    runCount: number;
    successRate: number;
}

interface Execution {
    id: string;
    workflowName: string;
    status: 'success' | 'failed' | 'running';
    startedAt: string;
    duration: string;
}

export default function DashboardPage() {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [recentExecutions, setRecentExecutions] = useState<Execution[]>([]);
    const [stats, setStats] = useState({
        totalWorkflows: 0,
        activeWorkflows: 0,
        totalRuns: 0,
        successRate: 0
    });

    useEffect(() => {
        // Simulate loading data
        setWorkflows([
            {
                id: "1",
                name: "Slack to Gmail Notifications",
                description: "Send email notifications when new messages arrive in Slack",
                status: "active",
                lastRun: "2 minutes ago",
                runCount: 45,
                successRate: 98
            },
            {
                id: "2",
                name: "Lead Processing Automation",
                description: "Process new leads from forms and add to CRM",
                status: "active",
                lastRun: "1 hour ago",
                runCount: 23,
                successRate: 95
            },
            {
                id: "3",
                name: "Weekly Report Generator",
                description: "Generate and send weekly analytics reports",
                status: "inactive",
                lastRun: "3 days ago",
                runCount: 12,
                successRate: 100
            }
        ]);

        setRecentExecutions([
            {
                id: "1",
                workflowName: "Slack to Gmail Notifications",
                status: "success",
                startedAt: "2 minutes ago",
                duration: "1.2s"
            },
            {
                id: "2",
                workflowName: "Lead Processing Automation",
                status: "success",
                startedAt: "1 hour ago",
                duration: "3.4s"
            },
            {
                id: "3",
                workflowName: "Weekly Report Generator",
                status: "failed",
                startedAt: "3 days ago",
                duration: "0.8s"
            }
        ]);

        setStats({
            totalWorkflows: 3,
            activeWorkflows: 2,
            totalRuns: 80,
            successRate: 97
        });
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'failed':
                return <XCircle className="h-4 w-4 text-red-500" />;
            case 'running':
                return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-600/20 text-green-300 border-green-500/30">Active</Badge>;
            case 'inactive':
                return <Badge className="bg-gray-600/20 text-gray-300 border-gray-500/30">Inactive</Badge>;
            case 'error':
                return <Badge className="bg-red-600/20 text-red-300 border-red-500/30">Error</Badge>;
            default:
                return <Badge className="bg-gray-600/20 text-gray-300 border-gray-500/30">Unknown</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Header */}
            <header className="bg-zinc-900/50 border-b border-zinc-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Brain className="h-8 w-8 text-violet-600" />
                                <span className="text-xl font-bold">Concatinate</span>
                            </div>
                            <nav className="hidden md:flex space-x-8">
                                <Link href="/dashboard" className="text-violet-400 font-medium">Dashboard</Link>
                                <Link href="/workflows" className="text-gray-300 hover:text-white">Workflows</Link>
                                <Link href="/executions" className="text-gray-300 hover:text-white">Executions</Link>
                                <Link href="/integrations" className="text-gray-300 hover:text-white">Integrations</Link>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </Button>
                            <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">JD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
                    <p className="text-gray-400">Here's what's happening with your automations today.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-400">Total Workflows</p>
                                    <p className="text-2xl font-bold text-white">{stats.totalWorkflows}</p>
                                </div>
                                <div className="p-3 bg-purple-600/20 rounded-lg">
                                    <Zap className="h-6 w-6 text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-400">Active Workflows</p>
                                    <p className="text-2xl font-bold text-white">{stats.activeWorkflows}</p>
                                </div>
                                <div className="p-3 bg-green-600/20 rounded-lg">
                                    <Activity className="h-6 w-6 text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-400">Total Runs</p>
                                    <p className="text-2xl font-bold text-white">{stats.totalRuns}</p>
                                </div>
                                <div className="p-3 bg-blue-600/20 rounded-lg">
                                    <BarChart3 className="h-6 w-6 text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-400">Success Rate</p>
                                    <p className="text-2xl font-bold text-white">{stats.successRate}%</p>
                                </div>
                                <div className="p-3 bg-green-600/20 rounded-lg">
                                    <CheckCircle className="h-6 w-6 text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Workflows */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-white">Recent Workflows</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Your most recently used workflows
                                </CardDescription>
                            </div>
                            <Link href="/workflows">
                                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                    View All
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {workflows.map((workflow) => (
                                    <div key={workflow.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="font-medium text-white">{workflow.name}</h3>
                                                {getStatusBadge(workflow.status)}
                                            </div>
                                            <p className="text-sm text-gray-400 mb-2">{workflow.description}</p>
                                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                <span>Last run: {workflow.lastRun}</span>
                                                <span>{workflow.runCount} runs</span>
                                                <span>{workflow.successRate}% success</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                                <Play className="h-3 w-3" />
                                            </Button>
                                            <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                                <Settings className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Executions */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-white">Recent Executions</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Latest workflow runs and their status
                                </CardDescription>
                            </div>
                            <Link href="/executions">
                                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                    View All
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentExecutions.map((execution) => (
                                    <div key={execution.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            {getStatusIcon(execution.status)}
                                            <div>
                                                <h3 className="font-medium text-white">{execution.workflowName}</h3>
                                                <p className="text-sm text-gray-400">{execution.startedAt}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-400">{execution.duration}</p>
                                            <Badge
                                                className={
                                                    execution.status === 'success'
                                                        ? "bg-green-600/20 text-green-300 border-green-500/30"
                                                        : execution.status === 'failed'
                                                            ? "bg-red-600/20 text-red-300 border-red-500/30"
                                                            : "bg-blue-600/20 text-blue-300 border-blue-500/30"
                                                }
                                            >
                                                {execution.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white">Quick Actions</CardTitle>
                            <CardDescription className="text-gray-400">
                                Get started with common automation tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Link href="/workflows/new">
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white h-20 flex flex-col items-center justify-center">
                                        <Plus className="h-6 w-6 mb-2" />
                                        Create Workflow
                                    </Button>
                                </Link>
                                <Link href="/integrations">
                                    <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 h-20 flex flex-col items-center justify-center">
                                        <Users className="h-6 w-6 mb-2" />
                                        Connect Apps
                                    </Button>
                                </Link>
                                <Link href="/templates">
                                    <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 h-20 flex flex-col items-center justify-center">
                                        <Zap className="h-6 w-6 mb-2" />
                                        Browse Templates
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

