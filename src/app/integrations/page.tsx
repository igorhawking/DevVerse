import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Github,
  GitlabIcon,
  Figma,
  Terminal,
  Database,
  Globe,
} from "lucide-react";

const INTEGRATIONS = [
  {
    id: "github",
    name: "GitHub",
    description: "Connect your repositories for seamless code integration",
    icon: <Github className="h-8 w-8" />,
    connected: true,
  },
  {
    id: "gitlab",
    name: "GitLab",
    description: "Access your GitLab projects and CI/CD pipelines",
    icon: <GitlabIcon className="h-8 w-8" />,
    connected: false,
  },
  {
    id: "figma",
    name: "Figma",
    description: "Import designs directly from your Figma projects",
    icon: <Figma className="h-8 w-8" />,
    connected: false,
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Deploy your projects with one-click integration",
    icon: <Globe className="h-8 w-8" />,
    connected: false,
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Connect to your Supabase projects for database access",
    icon: <Database className="h-8 w-8" />,
    connected: false,
  },
  {
    id: "terminal",
    name: "SSH Connections",
    description: "Manage your remote server connections",
    icon: <Terminal className="h-8 w-8" />,
    connected: true,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your favorite tools and services
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Available Integrations</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map((integration) => (
            <Card key={integration.id}>
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                  {integration.icon}
                </div>
                <CardTitle>{integration.name}</CardTitle>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant={integration.connected ? "outline" : "default"}
                  className={
                    integration.connected
                      ? "w-full"
                      : "w-full bg-[#9F5BFF] hover:bg-[#8A4AE0]"
                  }
                >
                  {integration.connected ? "Manage Connection" : "Connect"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Active Connections</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {INTEGRATIONS.filter((i) => i.connected).map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Settings
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              ))}

              {INTEGRATIONS.filter((i) => i.connected).length === 0 && (
                <div className="flex h-20 items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    No active connections
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
