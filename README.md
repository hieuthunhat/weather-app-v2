# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Based on your app's weather-focused design with aqua/cyan accents and the existing color palette, here's my suggestion:

Light Theme — clean, airy, sky-inspired:

┌──────────────────────┬──────────────────┬───────────────────────────────┐                                                                                                                                                             
│        Token         │      Color       │             Usage             │                                                                                                                                                             
├──────────────────────┼──────────────────┼───────────────────────────────┤                                                                                                                                                             
│ Primary              │ #0288D1          │ Buttons, active states, links │                                                                                                                                                             
├──────────────────────┼──────────────────┼───────────────────────────────┤                                                                                                                                                             
│ Secondary            │ #4FC3F7          │ Accents, weather icons, chips │
├──────────────────────┼──────────────────┼───────────────────────────────┤                                                                                                                                                             
│ Background (default) │ #F5F7FA          │ Page background               │                                                                                                                                                             
├──────────────────────┼──────────────────┼───────────────────────────────┤                                                                                                                                                             
│ Background (paper)   │ #FFFFFF          │ Cards, surfaces               │                                                                                                                                                             
├──────────────────────┼──────────────────┼───────────────────────────────┤                                                                                                                                                             
│ Text primary         │ #1A2138          │ Headings, body                │
├──────────────────────┼──────────────────┼───────────────────────────────┤
│ Text secondary       │ #5F6B7A          │ Subtitles, labels             │
├──────────────────────┼──────────────────┼───────────────────────────────┤
│ Divider              │ rgba(0,0,0,0.08) │ Separators                    │
└──────────────────────┴──────────────────┴───────────────────────────────┘

Dark Theme — deep night sky:

┌──────────────────────┬────────────────────────┬───────────────────────────────┐
│        Token         │         Color          │             Usage             │
├──────────────────────┼────────────────────────┼───────────────────────────────┤
│ Primary              │ #4FC3F7                │ Buttons, active states, links │
├──────────────────────┼────────────────────────┼───────────────────────────────┤
│ Secondary            │ #81D4FA                │ Accents, weather icons, chips │
├──────────────────────┼────────────────────────┼───────────────────────────────┤
│ Background (default) │ #0D1117                │ Page background               │
├──────────────────────┼────────────────────────┼───────────────────────────────┤
│ Background (paper)   │ #161B22                │ Cards, surfaces               │
├──────────────────────┼────────────────────────┼───────────────────────────────┤
│ Text primary         │ #E6EDF3                │ Headings, body                │
├──────────────────────┼────────────────────────┼───────────────────────────────┤
│ Text secondary       │ #8B949E                │ Subtitles, labels             │
├──────────────────────┼────────────────────────┼───────────────────────────────┤
│ Divider              │ rgba(255,255,255,0.08) │ Separators                    │
└──────────────────────┴────────────────────────┴───────────────────────────────┘