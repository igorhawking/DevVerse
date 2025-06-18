import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ApiKeySettings() {
  const { apiKey, setApiKey } = useAIStore();
  const [value, setValue] = useState(apiKey || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiKey(value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-2">
      <label className="font-semibold">OpenAI API Key</label>
      <Input
        type="password"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="sk-..."
        className="max-w-md"
      />
      <Button onClick={handleSave} className="mt-2">Salvar</Button>
      {saved && <span className="text-green-600 ml-2">Salvo!</span>}
      <p className="text-xs text-muted-foreground mt-1">Nunca compartilhe sua chave. Ela é salva apenas localmente no Zustand store.</p>
    </div>
  );
}
