"use client";

import { Button } from "@/components/ui/button";
import ApiKeySettings from "@/components/settings/ApiKeySettings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Laptop, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("dark");

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex flex-col items-center">
        <img src="/logo.png" alt="DevVerse Logo" width={96} height={96} className="mb-4 rounded-full shadow" />
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-[200px] flex-shrink-0"
          orientation="vertical"
        >
          <TabsList className="flex flex-col h-auto w-full justify-start">
            <TabsTrigger value="profile" className="justify-start w-full">
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="justify-start w-full">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security" className="justify-start w-full">
              Security
            </TabsTrigger>
            <TabsTrigger value="api" className="justify-start w-full">
              API Keys
            </TabsTrigger>
            <TabsTrigger value="notifications" className="justify-start w-full">
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Alex Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="alex@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="Senior Developer with 5+ years of experience in web development."
                  />
                </div>
                <Button className="bg-[#9F5BFF] hover:bg-[#8A4AE0]">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize your interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Label>Theme</Label>
                  <div className="flex gap-4">
                    <Card
                      className={`cursor-pointer border-2 ${theme === "light" ? "border-[#9F5BFF]" : "border-muted"}`}
                      onClick={() => setTheme("light")}
                    >
                      <CardContent className="p-4 flex flex-col items-center gap-2">
                        <Sun className="h-8 w-8" />
                        <span>Light</span>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer border-2 ${theme === "dark" ? "border-[#9F5BFF]" : "border-muted"}`}
                      onClick={() => setTheme("dark")}
                    >
                      <CardContent className="p-4 flex flex-col items-center gap-2">
                        <Moon className="h-8 w-8" />
                        <span>Dark</span>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer border-2 ${theme === "system" ? "border-[#9F5BFF]" : "border-muted"}`}
                      onClick={() => setTheme("system")}
                    >
                      <CardContent className="p-4 flex flex-col items-center gap-2">
                        <Laptop className="h-8 w-8" />
                        <span>System</span>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">A</span>
                    <input
                      type="range"
                      min="12"
                      max="20"
                      defaultValue="14"
                      className="w-full"
                    />
                    <span className="text-lg">A</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <Switch id="compact-mode" />
                </div>

                <Button className="bg-[#9F5BFF] hover:bg-[#8A4AE0]">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="bg-[#9F5BFF] hover:bg-[#8A4AE0]" onClick={() => toast({ title: "Senha atualizada!", description: "Sua senha foi alterada com sucesso." })}>
                  Update Password
                </Button>

                <div className="mt-8 pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">
                    Two-Factor Authentication
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage your API keys for external integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Active API Keys</Label>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium">Main API Key</p>
                            <p className="text-sm text-muted-foreground">
                              Created on Dec 1, 2023
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast({ title: "Chave copiada!", description: "A chave foi copiada para a área de transferência." })}>
                              Copy
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => toast({ title: "Chave revogada!", description: "A chave foi revogada com sucesso." })}
                            >
                              Revoke
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium">GitHub Integration</p>
                            <p className="text-sm text-muted-foreground">
                              Created on Nov 15, 2023
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast({ title: "Chave copiada!", description: "A chave foi copiada para a área de transferência." })}>
                              Copy
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => toast({ title: "Chave revogada!", description: "A chave foi revogada com sucesso." })}
                            >
                              Revoke
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Button className="bg-[#9F5BFF] hover:bg-[#8A4AE0]" onClick={() => toast({ title: "Nova chave gerada!", description: "Uma nova chave de API foi criada." })}>
                  Generate New API Key
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-updates">Product Updates</Label>
                      <Switch id="email-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-security">Security Alerts</Label>
                      <Switch id="email-security" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-marketing">Marketing</Label>
                      <Switch id="email-marketing" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-comments">Comments</Label>
                      <Switch id="app-comments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-mentions">Mentions</Label>
                      <Switch id="app-mentions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-deploys">Deployments</Label>
                      <Switch id="app-deploys" defaultChecked />
                    </div>
                  </div>
                </div>

                <Button className="bg-[#9F5BFF] hover:bg-[#8A4AE0]" onClick={() => toast({ title: "Preferências salvas!", description: "Suas preferências de notificação foram atualizadas." })}>
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex-1">
          {/* Rest of the component content remains unchanged */}
        </div>
      </div>
    </div>
  );
}
