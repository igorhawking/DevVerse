"use client";

import { useAppStore } from "@/lib/store";
import { WORKSPACE_LAYOUTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Save, Download, Plus, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface WorkspaceEditorProps {
  id?: string;
  className?: string;
}

export default function WorkspaceEditor({
  id = "default",
  className,
}: WorkspaceEditorProps) {
  const { currentWorkspaceLayout, setWorkspaceLayout } = useAppStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className={cn("flex h-full w-full flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Select
            value={currentWorkspaceLayout}
            onValueChange={setWorkspaceLayout}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              {WORKSPACE_LAYOUTS.map((layout) => (
                <SelectItem key={layout.id} value={layout.id}>
                  {layout.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Layout
          </Button>

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Setup
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="h-[calc(100%-60px)] rounded-lg border"
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <Card className="h-full rounded-none border-0 bg-background">
            <div className="flex h-10 items-center justify-between border-b px-4">
              <div className="font-medium">Code Editor</div>
            </div>
            <div className="h-[calc(100%-40px)] w-full overflow-auto bg-[#1E1E1E] p-4 font-mono text-sm text-white">
              <pre>
                {`// Welcome to DevVerse Code Editor

function helloWorld() {
  console.log("Hello, DevVerse!");
}

helloWorld();
`}
              </pre>
            </div>
          </Card>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <Card className="h-full rounded-none border-0">
                <div className="flex h-10 items-center justify-between border-b px-4">
                  <div className="font-medium">Preview</div>
                </div>
                <div className="flex h-[calc(100%-40px)] items-center justify-center p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Preview Content</h3>
                    <p className="text-muted-foreground">
                      Your preview will appear here
                    </p>
                  </div>
                </div>
              </Card>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={30}>
              <Card className="h-full rounded-none border-0">
                <div className="flex h-10 items-center justify-between border-b px-4">
                  <div className="font-medium">Terminal</div>
                </div>
                <div className="h-[calc(100%-40px)] w-full overflow-auto bg-black p-4 font-mono text-sm text-green-400">
                  <pre>
                    {`$ npm start
> devverse@1.0.0 start
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
`}
                  </pre>
                </div>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
