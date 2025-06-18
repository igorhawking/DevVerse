"use client";
import Link from "next/link";
import { MODULE_CARDS } from "@/lib/constants";
import ModuleCard from "@/components/dashboard/ModuleCard";
import AIModal from "@/components/ai/AIModal";
import { useAppStore } from "@/lib/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  Code,
  GitBranch,
  CheckCircle,
  Code2,
  FileCode,
  CheckSquare,
  Terminal,
  FileText,
  Plug,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  // Map icon names to components
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Code2: <Code2 size={24} />,
      FileCode: <FileCode size={24} />,
      CheckSquare: <CheckSquare size={24} />,
      Terminal: <Terminal size={24} />,
      FileText: <FileText size={24} />,
      Plug: <Plug size={24} />,
    };
    return icons[iconName] || <Code2 size={24} />;
  };

  const { setAIModalOpen } = useAppStore();
  return (
    <>
      <AIModal />
      <div className="container mx-auto px-2 py-4 sm:px-4 md:px-6 lg:px-8 max-w-full">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your DevVerse workspace
            </p>
          </div>
          <Button className="bg-[#9F5BFF] hover:bg-[#8A4AE0] w-full sm:w-auto text-white font-semibold shadow-md transition-colors" onClick={() => setAIModalOpen(true)}>
            Assistente IA
          </Button>
        </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Code Snippets</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sessions
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active now</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
  <h2 className="mb-4 text-lg sm:text-xl font-semibold">Recent Activity</h2>
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-muted-foreground/20">
              {[
                {
                  action: "Updated project",
                  project: "Frontend Dashboard",
                  time: "2 hours ago",
                },
                {
                  action: "Created snippet",
                  project: "API Authentication",
                  time: "5 hours ago",
                },
                {
                  action: "Completed task",
                  project: "Fix Navigation Bug",
                  time: "Yesterday",
                },
                {
                  action: "Started project",
                  project: "Mobile App",
                  time: "2 days ago",
                },
              ].map((activity, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.project}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules */}
      <div>
        <h2 className="mb-4 text-lg sm:text-xl font-semibold">Modules</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {MODULE_CARDS.map((module) => (
            <Card
              key={module.path}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardHeader className="p-4 pb-0 bg-gradient-to-b from-[#9F5BFF]/10 to-transparent">
                <div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-md ${module.color}`}
                >
                  <div className="text-white">{getIcon(module.icon)}</div>
                </div>
                <CardTitle className="text-base sm:text-xl">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {/* Content can be added here */}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={module.path} className="w-full">
                  <Button variant="outline" className="w-full justify-between border-[#9F5BFF] hover:bg-[#f6f0ff] transition-colors">
                    <span>Open {module.title}</span>
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </>
  );
}
