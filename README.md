# NSTI Friend Group Personality Type
**Welcome to the Ultimate Friend-Group Personality Quiz!**<br>
Ever wondered why your friends call you weird, or why you only appear in the group chat once every three presidential terms? This quiz breaks you down into five extremely scientific, incredibly accurate personality axes.

Are you Chronically Online?<br>
A Racist or a literal Mein Führer?<br>
Do you get bullied, or are you the one throwing the digital punches?<br>
Are you just gay, or do they make your friends question your kinks?<br>
Do you radiate Rizz or do you fumble saying “hi”?<br>

Take the quiz and discover your True Self™.

---

## !!!NERD CORNER!!!

---

### Data modification
Source data is located in `public/data/json`.

### Framework
- **Frontend:** React TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Icons:** Bootstrap Icons
- **Rendering model:** Client-side only; there is no backend or server-side processing

The quiz runs entirely in the browser. Quiz data is loaded from static JSON files in
`public/data/json`, and results are calculated on the client.

## Getting started

### Prerequisites
- Node.js
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production build
```bash
npm run build
```

### Preview the production build
```bash
npm run preview
```

## Project structure
```
├── src/
│   ├── assets/         # static assets (images, icons, etc.)
│   ├── components/     # reusable UI components
│   ├── core/           # shared data and application logic
│   └── pages/          # page-level components and sections
└── public/             # static files served by the web server
    └── data/json       # quiz and personality data
```

## Notes

This project is a client-side personality quiz. It does not require a database,
API server, or user account. The personality results are intended for
entertainment and should not be treated as a professional psychological
assessment.