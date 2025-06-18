import { useState } from 'react';
import OpenAI from 'openai';

export type AIAction = 'code' | 'task' | 'doc';

export interface AIRequest {
  action: AIAction;
  prompt: string;
  context?: string;
  language?: string;
}

export function useAI(apiKey: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const runAI = async (req: AIRequest) => {
    if (!apiKey) {
      setError('API Key não configurada.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const openai = new OpenAI({ apiKey });
      let systemPrompt = '';
      if (req.action === 'code') {
        systemPrompt = `Você é um assistente de programação. Gere um código ${req.language || ''} para: ${req.prompt}`;
      } else if (req.action === 'task') {
        systemPrompt = `Você é um gerente de projetos. Gere uma lista de tarefas detalhadas para: ${req.prompt}`;
      } else if (req.action === 'doc') {
        systemPrompt = `Você é um gerador de documentação técnica. Gere uma documentação clara e detalhada para: ${req.prompt}`;
      }
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: "system" as const, content: systemPrompt },
          ...(req.context ? [{ role: "user" as const, content: req.context }] : []),
        ],
        max_tokens: 1024,
        temperature: 0.7,
      });
      setResult(completion.choices[0].message?.content || '');
    } catch (err: any) {
      setError(err.message || 'Erro ao chamar IA');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, result, runAI };
}
