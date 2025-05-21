"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, FolderTree, Plus, Search } from "lucide-react";
import { useState } from "react";

const DOCS = [
  {
    id: "1",
    title: "Getting Started",
    content: `# Getting Started with DevVerse

Welcome to DevVerse! This guide will help you set up your development environment and get started with the platform.

## Installation

\`\`\`bash
npm install devverse
\`\`\`

## Basic Usage

\`\`\`javascript
import { Workspace } from 'devverse';

const myWorkspace = new Workspace({
  name: 'My Project',
  modules: ['editor', 'terminal', 'preview'],
  theme: 'dark',
  autoSave: true
});

myWorkspace.init();
\`\`\`

## Next Steps

- Explore the Workspace module
- Set up your first project
- Configure your preferences
`,
    lastUpdated: "2023-12-01",
    author: "Alex Johnson",
  },
  {
    id: "2",
    title: "Workspace Configuration",
    content: `# Workspace Configuration

Learn how to configure your DevVerse workspace for optimal productivity.

## Layout Options

DevVerse supports multiple layout configurations:

- Default Layout
- Coding Focus
- Preview Mode
- Terminal Focus

## Saving Custom Layouts

\`\`\`javascript
// Save the current layout
workspace.saveLayout({
  id: 'my-custom-layout',
  name: 'My Custom Layout',
  config: workspace.getCurrentConfig()
});

// Load a saved layout
workspace.loadLayout('my-custom-layout');
\`\`\`

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Save | Ctrl+S |
| New File | Ctrl+N |
| Find | Ctrl+F |
| Command Palette | Ctrl+K |
`,
    lastUpdated: "2023-12-03",
    author: "Sarah Chen",
  },
  {
    id: "3",
    title: "API Reference",
    content: `# API Reference

Complete reference for the DevVerse API.

## Workspace

### Methods

\`\`\`typescript
interface Workspace {
  init(): void;
  saveLayout(layout: Layout): void;
  loadLayout(id: string): void;
  getCurrentConfig(): LayoutConfig;
  addModule(module: Module): void;
  removeModule(moduleId: string): void;
  setTheme(theme: 'light' | 'dark' | 'system'): void;
}
\`\`\`

### Events

\`\`\`typescript
workspace.on('layout-changed', (layout) => {
  console.log('Layout changed:', layout);
});

workspace.on('module-added', (module) => {
  console.log('Module added:', module);
});
\`\`\`

## Module System

### Creating Custom Modules

\`\`\`typescript
import { createModule } from 'devverse';

const myCustomModule = createModule({
  id: 'my-module',
  name: 'My Custom Module',
  render: (container) => {
    // Render your module content
  }
});
\`\`\`
`,
    lastUpdated: "2023-12-05",
    author: "Miguel Santos",
  },
];

export default function DocsPage() {
  const [docs, setDocs] = useState(DOCS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDoc, setActiveDoc] = useState(DOCS[0]);
  const [activeTab, setActiveTab] = useState("preview");

  const filteredDocs = docs.filter((doc) => {
    return (
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-muted-foreground">
            Create and manage project documentation
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#9F5BFF] hover:bg-[#8A4AE0]">
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
          <Button variant="outline">
            <FolderTree className="mr-2 h-4 w-4" />
            Generate from Project
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search docs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Documents</h3>
            <div className="max-h-[calc(100vh-16rem)] space-y-2 overflow-auto pr-2">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <Card
                    key={doc.id}
                    className={`cursor-pointer transition-all hover:bg-accent ${activeDoc.id === doc.id ? "border-[#9F5BFF]" : ""}`}
                    onClick={() => setActiveDoc(doc)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{doc.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            Updated {doc.lastUpdated}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">
                    No documents found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {activeDoc && (
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>{activeDoc.title}</CardTitle>
                  <Tabs
                    defaultValue="preview"
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    <TabsList>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="edit">Edit</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <TabsContent value="preview" className="m-0 outline-none">
                  <div className="prose prose-invert max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdown(activeDoc.content),
                      }}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="edit" className="m-0 outline-none">
                  <textarea
                    className="h-[calc(100vh-20rem)] w-full rounded-md border border-input bg-transparent p-3 font-mono text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={activeDoc.content}
                    onChange={(e) => {
                      const updatedDocs = docs.map((doc) =>
                        doc.id === activeDoc.id
                          ? { ...doc, content: e.target.value }
                          : doc,
                      );
                      setDocs(updatedDocs);
                      setActiveDoc({ ...activeDoc, content: e.target.value });
                    }}
                  />
                </TabsContent>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple markdown formatter (in a real app, use a proper markdown library)
function formatMarkdown(markdown: string): string {
  // This is a very simplified version - in a real app use a proper markdown parser
  let html = markdown
    // Headers
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    // Code blocks
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    // Tables
    .replace(/\|(.+)\|\n\|[-:\s]+\|\n([\s\S]*?)(?=\n\n|$)/g, (match) => {
      const lines = match.split("\n");
      const headers = lines[0].split("|").filter((cell) => cell.trim());
      const rows = lines
        .slice(2)
        .map((line) => line.split("|").filter((cell) => cell.trim()));

      let table = "<table><thead><tr>";
      headers.forEach((header) => {
        table += `<th>${header.trim()}</th>`;
      });
      table += "</tr></thead><tbody>";

      rows.forEach((row) => {
        table += "<tr>";
        row.forEach((cell) => {
          table += `<td>${cell.trim()}</td>`;
        });
        table += "</tr>";
      });

      table += "</tbody></table>";
      return table;
    })
    // Paragraphs
    .replace(/^(?!<h|<pre|<table)(.+)$/gm, "<p>$1</p>");

  return html;
}
