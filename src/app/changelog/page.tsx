"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Search,
} from "lucide-react";
import { useState } from "react";

const CHANGELOG_ENTRIES = [
  {
    id: "1",
    type: "feat",
    scope: "auth",
    title: "Add social login with GitHub",
    description: "Implemented OAuth flow for GitHub authentication",
    author: "Alex Johnson",
    date: "2023-12-05",
    commit: "a1b2c3d",
    pr: "#123",
  },
  {
    id: "2",
    type: "fix",
    scope: "dashboard",
    title: "Fix chart rendering on mobile devices",
    description: "Resolved responsive layout issues with analytics charts",
    author: "Sarah Chen",
    date: "2023-12-04",
    commit: "e4f5g6h",
    pr: "#122",
  },
  {
    id: "3",
    type: "chore",
    scope: "deps",
    title: "Update dependencies",
    description: "Updated all packages to latest versions",
    author: "Miguel Santos",
    date: "2023-12-03",
    commit: "i7j8k9l",
    pr: "#121",
  },
  {
    id: "4",
    type: "feat",
    scope: "workspace",
    title: "Add layout saving functionality",
    description: "Users can now save and load custom workspace layouts",
    author: "Alex Johnson",
    date: "2023-12-02",
    commit: "m1n2o3p",
    pr: "#120",
  },
  {
    id: "5",
    type: "fix",
    scope: "snippets",
    title: "Fix syntax highlighting for Python",
    description: "Resolved issues with Python code highlighting in snippets",
    author: "Sarah Chen",
    date: "2023-12-01",
    commit: "q4r5s6t",
    pr: "#119",
  },
];

const TYPE_COLORS = {
  feat: "bg-green-500/20 text-green-500 border-green-500/50",
  fix: "bg-amber-500/20 text-amber-500 border-amber-500/50",
  chore: "bg-blue-500/20 text-blue-500 border-blue-500/50",
};

export default function ChangelogPage() {
  const [entries, setEntries] = useState(CHANGELOG_ENTRIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "all" || activeTab === entry.type;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Changelog</h1>
          <p className="text-muted-foreground">
            Track changes across your projects
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <GitPullRequest className="mr-2 h-4 w-4" />
            Import Commits
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Changelog
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search changelog..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="feat" className="text-green-500">
            Features
          </TabsTrigger>
          <TabsTrigger value="fix" className="text-amber-500">
            Fixes
          </TabsTrigger>
          <TabsTrigger value="chore" className="text-blue-500">
            Chores
          </TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <div key={entry.id} className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`rounded border px-2 py-1 text-xs font-medium ${TYPE_COLORS[entry.type as keyof typeof TYPE_COLORS]}`}
                        >
                          {entry.type}
                        </div>
                        {entry.scope && (
                          <div className="rounded bg-muted px-2 py-1 text-xs">
                            {entry.scope}
                          </div>
                        )}
                        <h3 className="text-base font-medium">{entry.title}</h3>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {entry.date}
                      </div>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {entry.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        By <span className="font-medium">{entry.author}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <GitCommit className="h-3 w-3" />
                          <span>{entry.commit}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <GitPullRequest className="h-3 w-3" />
                          <span>{entry.pr}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-20 items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    No changelog entries found
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
