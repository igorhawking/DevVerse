# 🚀 DevVerse

**DevVerse** é um ambiente digital integrado e revolucionário, criado para transformar o dia a dia de quem desenvolve.  
Mais do que uma simples IDE ou organizador de tarefas, o DevVerse é um **hub completo** de produtividade, personalização e automação para desenvolvedores de qualquer stack.

> 🧠 Feito por devs, para devs — com foco em inovação, performance e experiência real.

## ✨ O que é o DevVerse?

DevVerse é um **ecossistema digital completo** para desenvolvedores, com:

- 🎯 **Dashboard Modular** para acessar tudo em um só lugar  
- 📂 **Workspaces customizáveis** com editor, terminal, prévia e drag-and-drop  
- 🧩 **Snippets inteligentes** com filtros, tags e editor de código embutido  
- ✅ **Gestor de tarefas tipo Kanban**, com status visuais e integração com GitHub  
- 🧪 **Terminal remoto e local**, com temas e histórico  
- 📜 **Gerador de documentação**, direto dos seus comentários e estrutura  
- 🔌 **Integrações com GitHub, GitLab, Vercel, Supabase e muito mais**  
- 🧠 *(Em breve)* **IA para geração de código, tarefas e documentações**

## 🌐 Tech Stack

- ⚡️ **Next.js (App Router)**  
- 🎨 **Tailwind CSS**  
- 🧩 **shadcn/ui**  
- 📦 **Zustand**  
- 💻 **Monaco Editor**  
- 🎬 **Framer Motion**  
- ☁️ **Supabase (client-side only)**  

## 📁 Estrutura do Projeto

```
.
├── app/                # Rotas com App Router
├── components/         # Componentes reutilizáveis
├── hooks/              # Hooks customizados
├── lib/                # Funções utilitárias, stores Zustand
├── public/             # Assets estáticos
├── styles/             # Estilos globais
└── README.md
```

## ⚙️ Setup e Instalação

Pré-requisitos: **Node.js v18+**, **pnpm** ou **yarn**

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/devverse.git
cd devverse
```

2. Instale as dependências:

```bash
pnpm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env.local` baseado em `.env.example`.

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

4. Rode o projeto localmente:

```bash
pnpm dev
# ou
yarn dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🧪 Scripts úteis

```bash
pnpm dev         # Inicia o projeto em desenvolvimento
pnpm build       # Build de produção
pnpm lint        # Lint com ESLint
pnpm format      # Formata com Prettier
```

## 🛡️ Boas práticas

- Código limpo, modular e responsivo  
- Componentes isolados e reutilizáveis  
- Lógica separada da apresentação  
- Escalável e pronto para produção  
- Tipado com TypeScript  

## 💡 Futuro do DevVerse

- [ ] Suporte a extensões da comunidade  
- [ ] Ambiente multi-dev colaborativo  
- [ ] IA integrada para geração e refatoração  
- [ ] Marketplace de setups  
- [ ] Deploy direto via CLI e UI  

## 👨‍💻 Contribuições

Futuramente o DevVerse será open-source.  
Se quiser contribuir desde já, mande um café, um PR ou uma ideia no Discord.  
Contribuições são super bem-vindas!

## 📜 Licença

MIT © IGTECH

## 🧠 "DevVerse não é só onde você trabalha. É onde você evolui."

# Back-end DevVerse (Supabase)

## Estrutura

- `backend/sql/` — Scripts SQL para criação de tabelas, índices, constraints e policies RLS
- `backend/seeds/` — Seeds SQL com dados realistas
- `backend/edge-functions/` — Exemplos de edge functions (TypeScript)

## Como usar

1. Importe os scripts SQL em seu projeto Supabase (via SQL Editor ou CLI)
2. Execute os seeds para popular dados de exemplo
3. Implemente as edge functions no diretório `supabase/functions/` do seu projeto Supabase