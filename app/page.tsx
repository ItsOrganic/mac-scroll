"use client"
import { MacbookScroll } from "@/components/ui/macbook-scroll"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Zap,
  Brain,
  Sparkles,
  ArrowRight,
  Star,
  Play,
  Shield,
  Globe,
  Rocket,
  Target,
  TrendingUp,
  Clock,
  Award,
  Users,
  BarChart3,
  Workflow,
  Bot,
  Database,
  Lock,
  ChevronRight,
  CheckCircle2,
  Infinity,
  Zap as Lightning,
  Sun,
  Moon
} from "lucide-react"
import NavbarDemo from "@/components/resizable-navbar-demo";
import GridSmallBackgroundDemo from "@/components/ui/grid-small-background-demo"
import { useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50">
        <NavbarDemo />
      </nav>

      {/* Hero Section with MacBook - Mozilla-inspired design */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>

        <div className="relative">
          <MacbookScroll
            title={
              <div className="text-center">
                {/* <Badge className={`${isDark ? 'bg-zinc-800/50 text-zinc-200 border-zinc-700/50' : 'bg-zinc-100 text-zinc-800 border-zinc-200/50'} px-4 py-2 text-sm font-medium backdrop-blur-sm`}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Workflow Automation
                </Badge> */}
                <h1 className={`text-4xl md:text-6xl font-bold leading-tight p-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  Automate Everything
                  {/* <br /> */}
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"> with AI</span>
                </h1>
                <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  Connect your apps, automate workflows, and transform data with AI-powered integrations.
                  <br />
                  <span className="text-emerald-500 font-medium">Build complex automations in plain English.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-emerald-600/25">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className={`${isDark ? 'border-zinc-600 text-white hover:bg-zinc-800/50' : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'} px-8 py-4 text-lg font-semibold backdrop-blur-sm`}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-zinc-500">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                    No credit card required
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                    50 free runs/month
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                    Cancel anytime
                  </div>
                </div>
              </div>
            }
            // badge={
            //   <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-full shadow-lg shadow-emerald-600/25">
            //     <Brain className="h-8 w-8 text-white" />
            //   </div>
            // }
            src="/placeholder.svg?height=600&width=1200"
            showGradient={false}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 ${isDark ? 'bg-zinc-950/50' : 'bg-white'} border-y ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className={`text-sm md:text-base ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Aligned with Hero Theme */}
      <section
        id="features"
        className={`relative py-28 ${isDark
          ? "bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
          : "bg-gradient-to-b from-white via-emerald-50/30 to-white"
          } overflow-hidden`}
      >
        {/* Decorative background gradient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge
              className={`${isDark
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-600/20"
                : "bg-emerald-100 text-emerald-800 border-emerald-200"
                } mb-4 backdrop-blur-sm`}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-zinc-900"
                }`}
            >
              Everything You Need to Automate
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
            >
              From simple triggers to complex AI transformations, Concatinate gives
              you the tools to build intelligent automations — fast.
            </p>
          </div>

          {/* Modern Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large feature card */}
            <Card
              className={`lg:col-span-2 lg:row-span-2 backdrop-blur-xl transition-all duration-300 border ${isDark
                ? "bg-zinc-900/60 border-emerald-900/30 hover:border-emerald-600/40"
                : "bg-white/70 border-emerald-200/60 hover:border-emerald-400/60"
                } shadow-md hover:shadow-emerald-500/10`}
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Bot className="h-8 w-8 text-emerald-500" />
                </div>
                <CardTitle
                  className={`text-2xl mb-4 ${isDark ? "text-white" : "text-zinc-900"
                    }`}
                >
                  AI Workflow Builder
                </CardTitle>
                <CardDescription
                  className={`text-lg leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-600"
                    }`}
                >
                  Describe your workflow in plain English — and let AI turn it into a
                  working automation. Smart suggestions, zero code.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-emerald-500 text-sm font-medium">
                  Learn more
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            {/* Other feature cards */}
            {[
              {
                icon: <Globe className="h-6 w-6 text-emerald-500" />,
                title: "10+ Integrations",
                desc: "Connect Slack, Gmail, Notion, Sheets, and more.",
                gradient: "from-emerald-500/20 to-teal-500/20",
              },
              {
                icon: <Sparkles className="h-6 w-6 text-purple-500" />,
                title: "Smart Transformations",
                desc: "AI-powered summarization, extraction, classification, and more.",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                icon: <Workflow className="h-6 w-6 text-orange-500" />,
                title: "Conditional Logic",
                desc: "Add dynamic branches and complex logic with ease.",
                gradient: "from-orange-500/20 to-red-500/20",
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
                title: "Real-time Analytics",
                desc: "View logs, track runs, and monitor automation health.",
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
            ].map((f, i) => (
              <Card
                key={i}
                className={`backdrop-blur-xl transition-all duration-300 border ${isDark
                  ? "bg-zinc-900/60 border-zinc-800 hover:border-emerald-700/40"
                  : "bg-white/70 border-zinc-200 hover:border-emerald-300/60"
                  }`}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${f.gradient} rounded-xl flex items-center justify-center mb-4`}
                  >
                    {f.icon}
                  </div>
                  <CardTitle
                    className={`text-xl mb-2 ${isDark ? "text-white" : "text-zinc-900"
                      }`}
                  >
                    {f.title}
                  </CardTitle>
                  <CardDescription
                    className={`${isDark ? "text-zinc-300" : "text-zinc-600"}`}
                  >
                    {f.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section - Unified with Theme */}
      <section
        className={`relative py-28 ${isDark
          ? "bg-gradient-to-b from-zinc-950 via-zinc-900/80 to-zinc-950"
          : "bg-gradient-to-b from-white via-emerald-50/20 to-white"
          }`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge
              className={`${isDark
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-600/20"
                : "bg-emerald-100 text-emerald-800 border-emerald-200"
                } mb-4 backdrop-blur-sm`}
            >
              <Globe className="w-4 h-4 mr-2" />
              10+ Integrations
            </Badge>
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-zinc-900"
                }`}
            >
              Connect Your Favorite Apps
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
            >
              Seamlessly integrate with the tools you already use — from productivity
              to communication, all in one place.
            </p>
          </div>

          {/* Integration Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <Card
                key={index}
                className={`group p-8 backdrop-blur-xl border transition-all duration-300 ${isDark
                  ? "bg-zinc-900/60 border-zinc-800 hover:border-emerald-600/40"
                  : "bg-white/70 border-zinc-200 hover:border-emerald-400/60"
                  }`}
              >
                <CardContent className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <img
                      src={integration.logo}
                      alt={integration.name}
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div
                    className={`font-medium transition-colors ${isDark
                      ? "text-zinc-300 group-hover:text-emerald-400"
                      : "text-zinc-700 group-hover:text-emerald-600"
                      }`}
                  >
                    {integration.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {/* <section className={`py-24 ${isDark ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className={`${isDark ? 'bg-zinc-800/50 text-zinc-200 border-zinc-700/50' : 'bg-zinc-100 text-zinc-800 border-zinc-200/50'} mb-4 backdrop-blur-sm`}>
              <Workflow className="w-4 h-4 mr-2" />
              How It Works
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              From Idea to Automation in Minutes
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Our AI-powered platform makes it incredibly easy to create sophisticated workflows without any coding.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/25 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transform translate-x-4"></div>
                  )}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{step.title}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Pricing Section */}
      <section id="pricing" className={`py-24 ${isDark ? 'bg-zinc-900/50' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className={`${isDark ? 'bg-zinc-800/50 text-zinc-200 border-zinc-700/50' : 'bg-zinc-100 text-zinc-800 border-zinc-200/50'} mb-4 backdrop-blur-sm`}>
              <Award className="w-4 h-4 mr-2" />
              Simple Pricing
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Choose Your Perfect Plan
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${isDark ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white/50 border-zinc-200/50'} transition-all duration-300 hover:shadow-xl backdrop-blur-sm ${plan.popular
                  ? "border-violet-500/50 scale-105 shadow-2xl shadow-violet-500/20"
                  : "hover:border-zinc-400/50"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className={`text-2xl mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">${plan.price}</span>
                    <span className={`text-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>/month</span>
                  </div>
                  <CardDescription className={`text-base ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className={`w-full mb-8 py-3 text-lg font-semibold ${plan.popular
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-emerald-500/25"
                      : isDark ? "bg-zinc-800 hover:bg-zinc-700" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
                      }`}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-start ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        <Check className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section
      <section className="py-24 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-violet-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of companies already using Concatinate to automate processes,
            gain insights, and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-2xl">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer
        className={`relative py-16 border-t ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
          }`}
      >
        {/* COMING SOON overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1
            className={`text-5xl md:text-7xl font-extrabold tracking-tight ${isDark ? 'text-zinc-800' : 'text-zinc-200'
              } opacity-70 select-none`}
          >
            COMING SOON
          </h1>
        </div>

        <div className="relative z-0 opacity-40 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand & Description */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  {/* New Logo */}
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M4 12a8 8 0 0 1 8-8" />
                      <path d="M20 12a8 8 0 0 1-8 8" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Concatinate
                  </span>
                </div>
                <p
                  className={`leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                >
                  Connecting apps, automating workflows, and transforming data with
                  AI-powered integrations.
                </p>

                {/* Socials (inactive) */}
                <div className="flex space-x-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'
                      }`}
                  >
                    <span className="text-zinc-500">📧</span>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'
                      }`}
                  >
                    <span className="text-zinc-500">🐦</span>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'
                      }`}
                  >
                    <span className="text-zinc-500">💼</span>
                  </div>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h3
                  className={`font-semibold mb-6 text-lg ${isDark ? 'text-white' : 'text-zinc-900'
                    }`}
                >
                  Product
                </h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <span
                        className={`transition-opacity ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                          }`}
                      >
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3
                  className={`font-semibold mb-6 text-lg ${isDark ? 'text-white' : 'text-zinc-900'
                    }`}
                >
                  Company
                </h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <span
                        className={`transition-opacity ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                          }`}
                      >
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3
                  className={`font-semibold mb-6 text-lg ${isDark ? 'text-white' : 'text-zinc-900'
                    }`}
                >
                  Support
                </h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <span
                        className={`transition-opacity ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                          }`}
                      >
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div
              className={`border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center ${isDark ? 'border-zinc-800' : 'border-zinc-200'
                }`}
            >
              <p
                className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
              >
                &copy; 2024 Concatinate. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span
                  className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                >
                  Privacy Policy
                </span>
                <span
                  className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                >
                  Terms of Service
                </span>
                <span
                  className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                >
                  Cookie Policy
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>


      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isDark ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-white text-zinc-900 hover:bg-zinc-100'
          }`}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  )
}

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "1M+", label: "Workflows Created" },
  { value: "99.9%", label: "Uptime" },
  { value: "10+", label: "Integrations" },
]

const howItWorks = [
  {
    icon: Brain,
    title: "Describe Your Workflow",
    description: "Simply tell our AI what you want to automate in plain English. No coding required.",
  },
  {
    icon: Zap,
    title: "AI Builds It",
    description: "Our AI converts your description into a structured workflow with all the necessary steps and logic.",
  },
  {
    icon: Rocket,
    title: "Deploy & Monitor",
    description: "Deploy your workflow instantly and monitor its performance with real-time analytics and logs.",
  },
]

const integrations = [
  { name: "Slack", logo: "https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png" },
  { name: "Gmail", logo: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" },
  { name: "Notion", logo: "https://www.notion.so/images/logo-ios.png" },
  // { name: "Google Sheets", logo: "https://ssl.gstatic.com/docs/spreadsheets/favicon_qp2.png" },
  { name: "Trello", logo: "https://trello.com/favicon.ico" },
  { name: "Salesforce", logo: "https://www.salesforce.com/favicon.ico" },
  { name: "HubSpot", logo: "https://www.hubspot.com/favicon.ico" },
  // { name: "Airtable", logo: "https://static.airtable.com/images/favicon.ico" },
  { name: "Discord", logo: "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d80db9971f10a9757c99_Symbol.svg" },
  { name: "GitHub", logo: "https://github.com/favicon.ico" },
]

const pricingPlans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small teams getting started with automation",
    popular: false,
    features: [
      "Up to 50 workflow runs/month",
      "Basic integrations (Slack, Gmail)",
      "Email support",
      "Workflow analytics",
      "AI transformations",
      "Community access",
    ],
  },
  {
    name: "Professional",
    price: 99,
    description: "Ideal for growing businesses and teams",
    popular: true,
    features: [
      "Unlimited workflow runs",
      "All integrations (10+ apps)",
      "Priority support",
      "Advanced analytics",
      "Team collaboration",
      "Custom AI transformations",
      "Webhook endpoints",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: 299,
    description: "For large organizations with custom needs",
    popular: false,
    features: [
      "Unlimited everything",
      "Custom integrations",
      "Dedicated support",
      "Advanced security",
      "SLA guarantee",
      "On-premise deployment",
      "Custom AI models",
      "White-label options",
    ],
  },
]

const footerLinks = {
  product: ["Features", "Pricing", "Integrations", "API", "Documentation", "Changelog"],
  company: ["About", "Blog", "Careers", "Press", "Partners", "Contact"],
  support: ["Help Center", "Community", "Status", "Security", "Privacy", "Terms"],
}