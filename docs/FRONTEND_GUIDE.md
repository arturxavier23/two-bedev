# 📱 Guia de Desenvolvimento Frontend

## Estrutura do App Mobile (React Native + Expo)

O frontend do Two-BeDev seguirá a estrutura abaixo:

```
app/
├── (auth)/           # Telas sem autenticação
│   ├── login.tsx
│   ├── register.tsx
│   └── onboarding.tsx
├── (tabs)/           # Telas autenticadas
│   ├── home.tsx
│   ├── lessons.tsx
│   ├── challenges.tsx
│   ├── leaderboard.tsx
│   └── profile.tsx
└── _layout.tsx
```

## Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| React Native | Framework mobile |
| Expo SDK 51+ | Tooling e build |
| TypeScript | Tipagem estática |
| Expo Router | Navegação |
| Zustand | Estado global |
| Axios | Requisições HTTP |

## Padrões de Código

- Componentes em `PascalCase`
- Arquivos de componentes: `NomeComponente.tsx`
- Hooks customizados: `useNomeDoHook.ts`
- Estilização inline com `StyleSheet.create()`

## Comandos Úteis

```bash
# Iniciar o app
npx expo start

# Rodar no Android
npx expo start --android

# Rodar no iOS
npx expo start --ios
```

---

*Documento criado por João Pedro Faccio — Dev Frontend*
