import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#9F5BFF] flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <span className="text-xl font-bold">DevVerse</span>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <a
              href="#features"
              className="text-sm text-white/70 hover:text-white"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm text-white/70 hover:text-white"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm text-white/70 hover:text-white"
            >
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-[#9F5BFF] hover:bg-[#8A4AE0] text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                Your Complete{" "}
                <span className="text-[#9F5BFF]">Developer Workspace</span> in
                the Cloud
              </h1>
              <p className="max-w-[600px] text-xl text-white/70">
                A comprehensive, modular development environment with integrated
                tools and customizable workspaces designed to enhance developer
                productivity.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-[#9F5BFF] hover:bg-[#8A4AE0] text-white"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg border border-white/10 bg-black/50 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9F5BFF]/20 to-transparent"></div>
                <div className="code-editor h-full w-full overflow-hidden p-4 font-mono text-sm">
                  <pre className="animate-float text-green-400">
                    {`// Welcome to DevVerse
import { Workspace } from 'devverse';

const myWorkspace = new Workspace({
  name: 'My Project',
  modules: ['editor', 'terminal', 'preview'],
  theme: 'dark',
  autoSave: true
});

myWorkspace.init();

// Start coding now!
function helloDevVerse() {
  console.log('Hello, DevVerse!');
}

helloDevVerse();`}
                  </pre>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-[#9F5BFF]/30 blur-2xl"></div>
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#9F5BFF]/20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Powerful Features
            </h2>
            <p className="mx-auto max-w-2xl text-white/70">
              Everything you need to code, collaborate, and ship faster
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#9F5BFF]/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9F5BFF]/20">
                <Code className="h-6 w-6 text-[#9F5BFF]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Modular Workspace</h3>
              <p className="text-white/70">
                Customize your development environment with drag-and-drop
                modules and save your layouts.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#9F5BFF]/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9F5BFF]/20">
                <Zap className="h-6 w-6 text-[#9F5BFF]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Integrated Tools</h3>
              <p className="text-white/70">
                Access terminal, code editor, preview, and more in one unified
                interface.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#9F5BFF]/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9F5BFF]/20">
                <Shield className="h-6 w-6 text-[#9F5BFF]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Secure Collaboration
              </h3>
              <p className="text-white/70">
                Work together with your team in real-time with built-in version
                control and permissions.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#9F5BFF]/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9F5BFF]/20">
                <Sparkles className="h-6 w-6 text-[#9F5BFF]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI Assistance</h3>
              <p className="text-white/70">
                Get intelligent code suggestions and automate repetitive tasks
                with built-in AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="bg-gradient-to-b from-black to-[#0A0014] py-20"
      >
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Loved by Developers
            </h2>
            <p className="mx-auto max-w-2xl text-white/70">
              See what our users have to say about DevVerse
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-[#9F5BFF]/20">
                  <Image
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                    alt="User"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Alex Johnson</h4>
                  <p className="text-sm text-white/70">Senior Developer</p>
                </div>
              </div>
              <p className="text-white/80">
                "DevVerse has completely transformed my workflow. The modular
                workspace is a game-changer for productivity."
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-[#9F5BFF]/20">
                  <Image
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                    alt="User"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-white/70">Full-Stack Engineer</p>
                </div>
              </div>
              <p className="text-white/80">
                "The integrated terminal and preview features save me so much
                time. I can't imagine going back to my old setup."
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-[#9F5BFF]/20">
                  <Image
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel"
                    alt="User"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Miguel Santos</h4>
                  <p className="text-sm text-white/70">Lead Developer</p>
                </div>
              </div>
              <p className="text-white/80">
                "DevVerse's snippet management and task tracking have made our
                team collaboration seamless and efficient."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A0014] py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Transform Your Development Experience?
            </h2>
            <p className="mb-8 text-xl text-white/70">
              Join thousands of developers who have already upgraded their
              workflow with DevVerse.
            </p>
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-[#9F5BFF] hover:bg-[#8A4AE0] text-white"
              >
                Start for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0014] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#9F5BFF] flex items-center justify-center">
                <span className="text-white text-sm font-bold">D</span>
              </div>
              <span className="text-xl font-bold">DevVerse</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-white/70 hover:text-white">
                Terms
              </a>
              <a href="#" className="text-sm text-white/70 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-sm text-white/70 hover:text-white">
                Contact
              </a>
            </div>
            <div className="text-sm text-white/50">
              © {new Date().getFullYear()} DevVerse. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
