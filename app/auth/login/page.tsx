"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowRight, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login API call
        setTimeout(() => {
            setIsLoading(false);
            // Redirect to dashboard
            window.location.href = "/dashboard";
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Brain className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold text-white">Concatinate</span>
                    </div>
                    <p className="text-gray-400">Welcome back to your automation platform</p>
                </div>

                <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-white">Sign In</CardTitle>
                        <CardDescription className="text-gray-400">
                            Enter your credentials to access your workflows
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-300">Remember me</span>
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-purple-400 hover:text-purple-300"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        Sign In
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    href="/auth/signup"
                                    className="text-purple-400 hover:text-purple-300 font-medium"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Demo credentials */}
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Demo Credentials</h3>
                    <p className="text-xs text-gray-400 mb-1">Email: demo@concatinate.com</p>
                    <p className="text-xs text-gray-400">Password: demo123</p>
                </div>
            </div>
        </div>
    );
}

