import { MacbookScroll } from "@/components/ui/macbook-scroll"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Brain, Sparkles, ArrowRight, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold">NeuralAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                Testimonials
              </a>
              <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent">
                Sign In
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with MacBook */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="relative">
          <MacbookScroll
            title={
              <div className="text-center space-y-4">
                <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Powered by Advanced AI
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                  Transform Your Business with AI
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Harness the power of artificial intelligence to automate workflows, generate insights, and accelerate
                  your growth like never before.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                  >
                    Watch Demo
                  </Button>
                </div>
              </div>
            }
            badge={
              <div className="bg-purple-600 p-2 rounded-full">
                <Brain className="h-6 w-6 text-white" />
              </div>
            }
            src="/placeholder.svg?height=600&width=1200"
            showGradient={false}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful AI Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to integrate AI into your workflow and supercharge your productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-gray-900 border-gray-800 relative ${plan.popular ? "border-purple-500 scale-105" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <CardDescription className="text-gray-400 mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className={`w-full mb-6 ${plan.popular ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-800 hover:bg-gray-700"}`}
                  >
                    Get Started
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what our customers are saying about their AI transformation journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold">
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.author}</p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using NeuralAI to automate processes, gain insights, and accelerate
            growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-300 text-white hover:bg-purple-800 bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-purple-500" />
                <span className="text-xl font-bold">NeuralAI</span>
              </div>
              <p className="text-gray-400">Transforming businesses with the power of artificial intelligence.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NeuralAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: Brain,
    title: "Smart Automation",
    description: "Automate complex workflows with AI-powered decision making and intelligent process optimization.",
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description: "Get instant insights from your data with advanced AI analytics and predictive modeling.",
  },
  {
    icon: Sparkles,
    title: "Natural Language Processing",
    description: "Process and understand text data at scale with state-of-the-art NLP capabilities.",
  },
  {
    icon: Brain,
    title: "Machine Learning Models",
    description: "Deploy custom ML models tailored to your specific business needs and requirements.",
  },
  {
    icon: Zap,
    title: "API Integration",
    description: "Seamlessly integrate AI capabilities into your existing systems with our robust API.",
  },
  {
    icon: Sparkles,
    title: "24/7 Support",
    description: "Get round-the-clock support from our team of AI experts and technical specialists.",
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small teams getting started with AI",
    popular: false,
    features: [
      "Up to 10,000 API calls/month",
      "Basic AI models",
      "Email support",
      "Dashboard analytics",
      "Standard integrations",
    ],
  },
  {
    name: "Professional",
    price: 99,
    description: "Ideal for growing businesses and teams",
    popular: true,
    features: [
      "Up to 100,000 API calls/month",
      "Advanced AI models",
      "Priority support",
      "Custom analytics",
      "Advanced integrations",
      "Team collaboration tools",
    ],
  },
  {
    name: "Enterprise",
    price: 299,
    description: "For large organizations with custom needs",
    popular: false,
    features: [
      "Unlimited API calls",
      "Custom AI models",
      "Dedicated support",
      "Advanced security",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment",
    ],
  },
]

const testimonials = [
  {
    content:
      "NeuralAI has completely transformed how we handle customer support. Our response times improved by 80% and customer satisfaction is at an all-time high.",
    author: "Sarah Johnson",
    role: "CTO, TechCorp",
  },
  {
    content:
      "The automation capabilities are incredible. We've saved countless hours on manual processes and can now focus on strategic initiatives.",
    author: "Michael Chen",
    role: "Operations Director, StartupXYZ",
  },
  {
    content:
      "The insights we get from NeuralAI's analytics have helped us make better business decisions and increase our revenue by 35%.",
    author: "Emily Rodriguez",
    role: "CEO, GrowthCo",
  },
  {
    content:
      "Implementation was seamless and the support team is outstanding. We were up and running with AI capabilities in just a few days.",
    author: "David Kim",
    role: "Head of Engineering, InnovateLab",
  },
  {
    content:
      "The natural language processing features have revolutionized how we analyze customer feedback and market research data.",
    author: "Lisa Thompson",
    role: "Marketing Director, BrandForward",
  },
  {
    content:
      "NeuralAI's custom models perfectly fit our unique business requirements. The ROI has been exceptional from day one.",
    author: "James Wilson",
    role: "VP of Technology, Enterprise Solutions",
  },
]
