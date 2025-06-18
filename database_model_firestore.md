# Modelo de Banco de Dados Firestore – DevVerse

## 1. users (usuários)
- id (uid do Firebase)
- name
- email
- avatarUrl
- createdAt
- provider (github, google, etc)
- settings (objeto com preferências)

## 2. workspaces
- id
- name
- ownerId (referência a users)
- collaborators (array de userId)
- createdAt
- updatedAt
- config (json de layout, temas, etc)

## 3. tasks (Kanban)
- id
- workspaceId
- title
- description
- status (todo, doing, done)
- assignee (userId)
- labels (array)
- createdAt
- updatedAt

## 4. snippets
- id
- ownerId
- workspaceId
- title
- code
- language
- tags (array)
- createdAt

## 5. integrations
- id
- userId
- type (github, gitlab, vercel, etc)
- accessToken (criptografado)
- settings
- createdAt

## 6. terminal_history
- id
- workspaceId
- userId
- command
- output
- timestamp

## 7. docs (documentação gerada)
- id
- workspaceId
- content
- generatedAt
- generatedBy (userId)

---

## Exemplo de estrutura no Firestore
```
users/{userId}
  workspaces/{workspaceId}
    tasks/{taskId}
    snippets/{snippetId}
    terminal_history/{historyId}
    docs/{docId}
```

Ou, para facilitar queries, cada coleção pode ser root:
- users
- workspaces
- tasks
- snippets
- integrations
- terminal_history
- docs

---

## Regras de segurança (exemplo)
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /workspaces/{workspaceId} {
      allow read: if request.auth != null;
      allow write: if resource.data.ownerId == request.auth.uid;
    }
    // ... outras regras para cada coleção
  }
}
```
