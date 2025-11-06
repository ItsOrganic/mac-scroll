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
    MoreVertical,
    Search,
    Filter,
    Zap,
    Clock,
    CheckCircle,
    XCircle,
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
    createdAt: string;
    steps: number;
}

export default function WorkflowsPage() {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    useEffect(() => {
        // Simulate loading workflows
        setWorkflows([
            {
                id: "1",
                name: "Slack to Gmail Notifications",
                description: "Send email notifications when new messages arrive in Slack channels",
                status: "active",
                lastRun: "2 minutes ago",
                runCount: 45,
                successRate: 98,
                createdAt: "2024-01-15",
                steps: 3
            },
            {
                id: "2",
                name: "Lead Processing Automation",
                description: "Process new leads from forms and automatically add them to CRM",
                status: "active",
                lastRun: "1 hour ago",
                runCount: 23,
                successRate: 95,
                createdAt: "2024-01-10",
                steps: 5
            },
            {
                id: "3",
                name: "Weekly Report Generator",
                description: "Generate and send weekly analytics reports to stakeholders",
                status: "inactive",
                lastRun: "3 days ago",
                runCount: 12,
                successRate: 100,
                createdAt: "2024-01-05",
                steps: 4
            },
            {
                id: "4",
                name: "Customer Support Triage",
                description: "Automatically categorize and route customer support tickets",
                status: "error",
                lastRun: "1 day ago",
                runCount: 8,
                successRate: 75,
                createdAt: "2024-01-12",
                steps: 6
            },
            {
                id: "5",
                name: "Inventory Management",
                description: "Monitor inventory levels and send alerts when stock is low",
                status: "active",
                lastRun: "30 minutes ago",
                runCount: 67,
                successRate: 99,
                createdAt: "2024-01-08",
                steps: 3
            }
        ]);
    }, []);

    const filteredWorkflows = workflows.filter(workflow => {
        const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || workflow.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'inactive':
                return <Pause className="h-4 w-4 text-gray-500" />;
            case 'error':
                return <XCircle className="h-4 w-4 text-red-500" />;
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

    const toggleWorkflowStatus = (workflowId: string) => {
        setWorkflows(workflows.map(workflow => {
            if (workflow.id === workflowId) {
                return {
                    ...workflow,
                    status: workflow.status === 'active' ? 'inactive' : 'active'
                };
            }
            return workflow;
        }));
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Brain className="h-8 w-8 text-blue-600" />
                                <span className="text-xl font-bold">Concatinate</span>
                            </div>
                            <nav className="hidden md:flex space-x-8">
                                <Link href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
                                <Link href="/workflows" className="text-blue-400 font-medium">Workflows</Link>
                                <Link href="/executions" className="text-gray-300 hover:text-white">Executions</Link>
                                <Link href="/integrations" className="text-gray-300 hover:text-white">Integrations</Link>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </Button>
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">JD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Workflows</h1>
                        <p className="text-gray-400">Manage and monitor your automation workflows</p>
                    </div>
                    <Link href="/workflows/new">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Workflow
                        </Button>
                    </Link>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search workflows..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="error">Error</option>
                        </select>
                    </div>
                </div>

                {/* Workflows Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkflows.map((workflow) => (
                        <Card key={workflow.id} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-colors">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            {getStatusIcon(workflow.status)}
                                            <CardTitle className="text-lg text-white">{workflow.name}</CardTitle>
                                        </div>
                                        <CardDescription className="text-gray-400 text-sm">
                                            {workflow.description}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        {getStatusBadge(workflow.status)}
                                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-400">Steps</p>
                                            <p className="text-white font-medium">{workflow.steps}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Runs</p>
                                            <p className="text-white font-medium">{workflow.runCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Success Rate</p>
                                            <p className="text-white font-medium">{workflow.successRate}%</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Last Run</p>
                                            <p className="text-white font-medium">{workflow.lastRun}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center space-x-2 pt-3 border-t border-gray-800">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                                            onClick={() => toggleWorkflowStatus(workflow.id)}
                                        >
                                            {workflow.status === 'active' ? (
                                                <>
                                                    <Pause className="h-3 w-3 mr-1" />
                                                    Pause
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="h-3 w-3 mr-1" />
                                                    Start
                                                </>
                                            )}
                                        </Button>
                                        <Link href={`/workflows/${workflow.id}`}>
                                            <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                                <Settings className="h-3 w-3" />
                                            </Button>
                                        </Link>
                                        <Link href={`/workflows/${workflow.id}/execute`}>
                                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                                <Zap className="h-3 w-3" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredWorkflows.length === 0 && (
                    <div className="text-center py-12">
                        <Zap className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">No workflows found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm || filterStatus !== "all"
                                ? "Try adjusting your search or filter criteria"
                                : "Get started by creating your first workflow"
                            }
                        </p>
                        {!searchTerm && filterStatus === "all" && (
                            <Link href="/workflows/new">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Workflow
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

