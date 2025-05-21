"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Plus, Search, Star, StarOff, Tag } from "lucide-react";
import { useState } from "react";

const LANGUAGES = [
  "All",
  "JavaScript",
  "TypeScript",
  "Python",
  "HTML/CSS",
  "SQL",
  "Bash",
];

const SNIPPETS = [
  {
    id: "1",
    title: "React useState Hook",
    description: "Basic usage of the useState hook in React",
    language: "JavaScript",
    code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    tags: ["react", "hooks", "state"],
    isFavorite: true,
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Fetch API with Async/Await",
    description: "Example of using fetch with async/await",
    language: "JavaScript",
    code: `async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}`,
    tags: ["fetch", "async", "api"],
    isFavorite: false,
    createdAt: "2023-11-02",
  },
  {
    id: "3",
    title: "Python List Comprehension",
    description: "Examples of list comprehension in Python",
    language: "Python",
    code: `# Basic list comprehension
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(squared)  # [1, 4, 9, 16, 25]

# With condition
even_squared = [x**2 for x in numbers if x % 2 == 0]
print(even_squared)  # [4, 16]

# Nested list comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
    tags: ["python", "list", "comprehension"],
    isFavorite: true,
    createdAt: "2023-09-28",
  },
];

export default function SnippetsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [snippets, setSnippets] = useState(SNIPPETS);
  const [selectedSnippet, setSelectedSnippet] = useState(SNIPPETS[0]);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesLanguage =
      selectedLanguage === "All" || snippet.language === selectedLanguage;

    const matchesTab =
      activeTab === "all" || (activeTab === "favorites" && snippet.isFavorite);

    return matchesSearch && matchesLanguage && matchesTab;
  });

  const toggleFavorite = (id: string) => {
    setSnippets(
      snippets.map((snippet) =>
        snippet.id === id
          ? { ...snippet, isFavorite: !snippet.isFavorite }
          : snippet,
      ),
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Snippets</h1>
          <p className="text-muted-foreground">
            Manage and organize your code snippets
          </p>
        </div>
        <Button className="bg-[#9F5BFF] hover:bg-[#8A4AE0]">
          <Plus className="mr-2 h-4 w-4" />
          New Snippet
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search snippets..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex-1">
                Favorites
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((language) => (
                <Button
                  key={language}
                  variant={
                    selectedLanguage === language ? "secondary" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedLanguage(language)}
                >
                  {language}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Snippets</h3>
            <div className="max-h-[500px] space-y-2 overflow-auto pr-2">
              {filteredSnippets.length > 0 ? (
                filteredSnippets.map((snippet) => (
                  <Card
                    key={snippet.id}
                    className={`cursor-pointer transition-all hover:bg-accent ${selectedSnippet.id === snippet.id ? "border-[#9F5BFF]" : ""}`}
                    onClick={() => setSelectedSnippet(snippet)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{snippet.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {snippet.language}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(snippet.id);
                          }}
                        >
                          {snippet.isFavorite ? (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">
                    No snippets found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {selectedSnippet && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedSnippet.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedSnippet.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(selectedSnippet.id)}
                    >
                      {selectedSnippet.isFavorite ? (
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
                      <Code className="h-3 w-3" />
                      {selectedSnippet.language}
                    </div>
                    {selectedSnippet.tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </div>
                    ))}
                    <div className="ml-auto text-xs text-muted-foreground">
                      Created: {selectedSnippet.createdAt}
                    </div>
                  </div>
                  <div className="rounded-md bg-black p-4 font-mono text-sm text-green-400">
                    <pre>{selectedSnippet.code}</pre>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Edit</Button>
                <Button variant="outline">Copy</Button>
                <Button variant="outline">Share</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
