# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## API Environment Setup

The frontend reads `VITE_CODESPACE_NAME` via `import.meta.env` to build the API base URL.

1. Create `.env.local` in this folder.
2. Add your Codespace name:

```bash
VITE_CODESPACE_NAME=cautious-guide-7v6wgjvqjr9hxx6w
```

With `VITE_CODESPACE_NAME` set, requests use:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set, the app uses a safe fallback:

```text
http://localhost:8000/api/[component]/
```

This avoids invalid URLs such as `https://undefined-8000...`.

The data layer supports both direct array payloads and paginated/object payloads (for example `items`, `results`, or `data`).
