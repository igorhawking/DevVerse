"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Filter, Plus, Search, Tag } from "lucide-react";
import { useState } from "react";
import AIModal from "@/components/ai/AIModal";

const TASKS = [
  {
    id: "1",
    title: "Implement authentication flow",
    description: "Create login, register, and forgot password pages",
    status: "TODO",
    priority: "High",
    tags: ["frontend", "auth"],
    assignee: "Alex Johnson",
    dueDate: "2023-12-15",
  },
  {
    id: "2",
    title: "Fix responsive layout issues",
    description: "Address mobile view problems in dashboard",
    status: "WIP",
    priority: "Medium",
    tags: ["frontend", "ui"],
    assignee: "Sarah Chen",
    dueDate: "2023-12-10",
  },
  {
    id: "3",
    title: "Set up CI/CD pipeline",
    description:
      "Configure GitHub Actions for automated testing and deployment",
    status: "TEST",
    priority: "High",
    tags: ["devops"],
    assignee: "Miguel Santos",
    dueDate: "2023-12-08",
  },
  {
    id: "4",
    title: "Optimize database queries",
    description: "Improve performance of dashboard analytics",
    status: "DONE",
    priority: "Medium",
    tags: ["backend", "performance"],
    assignee: "Alex Johnson",
    dueDate: "2023-12-05",
  },
  {
    id: "5",
    title: "Update documentation",
    description: "Add API endpoints and update setup instructions",
    status: "TODO",
    priority: "Low",
    tags: ["docs"],
    assignee: "Sarah Chen",
    dueDate: "2023-12-20",
  },
];

const STATUS_COLORS = {
  TODO: "bg-blue-500/20 text-blue-500 border-blue-500/50",
  WIP: "bg-amber-500/20 text-amber-500 border-amber-500/50",
  TEST: "bg-purple-500/20 text-purple-500 border-purple-500/50",
  DONE: "bg-green-500/20 text-green-500 border-green-500/50",
};

const PRIORITY_COLORS = {
  High: "bg-red-500/20 text-red-500",
  Medium: "bg-amber-500/20 text-amber-500",
  Low: "bg-green-500/20 text-green-500",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState(TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "todo" && task.status === "TODO") ||
      (activeTab === "wip" && task.status === "WIP") ||
      (activeTab === "test" && task.status === "TEST") ||
      (activeTab === "done" && task.status === "DONE");

    return matchesSearch && matchesTab;
  });

  return (
    <div className="container mx-auto p-6">
      <AIModal />
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage your project tasks</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#9F5BFF] hover:bg-[#8A4AE0]">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
          <Button variant="outline" onClick={() => useAppStore.getState().setAIModalOpen(true)}>
            Gerar com IA
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="todo" className="text-blue-500">
            To Do
          </TabsTrigger>
          <TabsTrigger value="wip" className="text-amber-500">
            In Progress
          </TabsTrigger>
          <TabsTrigger value="test" className="text-purple-500">
            Testing
          </TabsTrigger>
          <TabsTrigger value="done" className="text-green-500">
            Done
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        {["todo", "wip", "test", "done"].map((status) => (
          <TabsContent key={status} value={status} className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks
                .filter((task) => task.status === status.toUpperCase())
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function TaskCard({ task }: { task: (typeof TASKS)[0] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <div
            className={`rounded border px-2 py-1 text-xs font-medium ${STATUS_COLORS[task.status as keyof typeof STATUS_COLORS]}`}
          >
            {task.status}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="mb-4 text-sm text-muted-foreground">{task.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          <div
            className={`rounded px-2 py-1 text-xs font-medium ${PRIORITY_COLORS[task.priority as keyof typeof PRIORITY_COLORS]}`}
          >
            {task.priority}
          </div>
          {task.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <div className="h-6 w-6 rounded-full bg-[#9F5BFF]/20 flex items-center justify-center">
              {task.assignee
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span>{task.assignee}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Due {task.dueDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
