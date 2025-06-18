"use client";
import { useState } from 'react';
import { useAI, AIAction } from '@/hooks/useAI';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function AIAssistant() {
  const [tab, setTab] = useState<AIAction>('code');
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const { apiKey, addHistory, history } = useAppStore();
  const { loading, error, result, runAI } = useAI(apiKey);

  const handleRun = () => {
    runAI({ action: tab, prompt, context, language });
    addHistory({ action: tab, prompt, context, language, date: new Date().toISOString() });
  };

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>IA Assistente</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={value => setTab(value as AIAction)} className="mb-4">
          <TabsList>
            <TabsTrigger value="code">Gerar Código</TabsTrigger>
            <TabsTrigger value="task">Gerar Tarefas</TabsTrigger>
            <TabsTrigger value="doc">Gerar Documentação</TabsTrigger>
          </TabsList>
          <TabsContent value="code" />
          <TabsContent value="task" />
          <TabsContent value="doc" />
        </Tabs>
        <div className="flex flex-col gap-2 mb-4">
          <Input
            placeholder="Descreva o que deseja..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          {tab === 'code' && (
            <Input
              placeholder="Linguagem (ex: JavaScript, Python...)"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            />
          )}
          <Input
            placeholder="Contexto adicional (opcional)"
            value={context}
            onChange={e => setContext(e.target.value)}
          />
          <Button onClick={handleRun} disabled={loading || !prompt} className="mt-2">
            {loading ? 'Gerando...' : 'Gerar com IA'}
          </Button>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {result && (
          <div className="bg-muted rounded p-3 whitespace-pre-wrap font-mono text-sm mb-4 border">
            {result}
          </div>
        )}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Histórico</h3>
          <ul className="space-y-2 max-h-40 overflow-auto">
            {history.slice().reverse().map((item, idx) => (
              <li key={idx} className="text-xs text-muted-foreground">
                <b>{item.action}</b>: {item.prompt} <span className="text-[10px]">{new Date(item.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
