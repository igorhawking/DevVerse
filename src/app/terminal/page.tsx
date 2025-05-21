"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Settings, Terminal as TerminalIcon, X } from "lucide-react";
import { useState } from "react";

const TERMINAL_HISTORY = [
  {
    command: "ls -la",
    output:
      "total 32\ndrwxr-xr-x  5 user  staff   160 Dec  5 10:23 .\ndrwxr-xr-x  3 user  staff    96 Dec  5 10:22 ..\n-rw-r--r--  1 user  staff  1420 Dec  5 10:23 package.json\ndrwxr-xr-x 12 user  staff   384 Dec  5 10:23 node_modules\ndrwxr-xr-x  4 user  staff   128 Dec  5 10:23 src",
  },
  {
    command: "npm run dev",
    output:
      "> devverse@1.0.0 dev\n> next dev\n\n- ready started server on 0.0.0.0:3000, url: http://localhost:3000",
  },
  {
    command: "git status",
    output:
      'On branch main\nYour branch is up to date with \'origin/main\'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git checkout -- <file>..." to discard changes in working directory)\n\n\tmodified:   src/components/workspace/WorkspaceEditor.tsx\n\nno changes added to commit (use "git add" and/or "git commit -a")',
  },
];

const CONNECTIONS = [
  { id: "local", name: "Local Terminal", host: "localhost" },
  { id: "dev-server", name: "Development Server", host: "dev.example.com" },
  { id: "prod-server", name: "Production Server", host: "prod.example.com" },
];

export default function TerminalPage() {
  const [activeTab, setActiveTab] = useState("local");
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState(TERMINAL_HISTORY);
  const [connections, setConnections] = useState(CONNECTIONS);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    // Simulate command execution
    const newEntry = {
      command,
      output: `Executing: ${command}\n\nCommand output would appear here in a real terminal.`,
    };

    setHistory([...history, newEntry]);
    setCommand("");
  };

  const addNewTab = () => {
    const newId = `connection-${connections.length + 1}`;
    const newConnection = {
      id: newId,
      name: `New Connection`,
      host: "hostname",
    };

    setConnections([...connections, newConnection]);
    setActiveTab(newId);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Terminal</h1>
          <p className="text-muted-foreground">
            Access your remote and local terminals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewTab}>
            <Plus className="mr-2 h-4 w-4" />
            New Connection
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <Tabs
          defaultValue="local"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex items-center justify-between border-b px-4">
            <TabsList className="h-12">
              {connections.map((conn) => (
                <TabsTrigger
                  key={conn.id}
                  value={conn.id}
                  className="flex items-center gap-2"
                >
                  <TerminalIcon className="h-4 w-4" />
                  <span>{conn.name}</span>
                  {conn.id !== "local" && (
                    <button
                      className="ml-1 rounded-full p-1 hover:bg-muted"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConnections(
                          connections.filter((c) => c.id !== conn.id),
                        );
                        if (activeTab === conn.id) {
                          setActiveTab("local");
                        }
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {connections.map((conn) => (
            <TabsContent
              key={conn.id}
              value={conn.id}
              className="m-0 outline-none"
            >
              <CardHeader className="border-b bg-black p-2">
                <CardTitle className="text-sm font-mono text-green-400">
                  {conn.name} ({conn.host})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[calc(100vh-16rem)] bg-black p-4 font-mono text-sm text-green-400 overflow-auto">
                  {history.map((entry, index) => (
                    <div key={index} className="mb-4">
                      <div className="mb-1 flex items-center">
                        <span className="mr-2 text-blue-400">$</span>
                        <span>{entry.command}</span>
                      </div>
                      <pre className="whitespace-pre-wrap">{entry.output}</pre>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleCommand}
                  className="border-t border-white/10 bg-black p-2"
                >
                  <div className="flex items-center">
                    <span className="mr-2 text-blue-400 font-mono">$</span>
                    <Input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      className="border-0 bg-transparent font-mono text-green-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Type your command..."
                      autoFocus
                    />
                  </div>
                </form>
              </CardContent>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
