# Painel Processo Seletivo PGE-SP

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white&labelColor=20232a)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite&logoColor=white&labelColor=111827)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript&logoColor=white&labelColor=000000)](https://www.typescriptlang.org/)
[![Google Gemini API](https://img.shields.io/badge/Google%20Gemini%20API-1.25.0-1a73e8?logo=google&logoColor=white&labelColor=000000)](https://www.npmjs.com/package/@google/genai)
[![Node.js >= 18](https://img.shields.io/badge/Node.js-%E2%89%A5%2018-339933?logo=node.js&logoColor=white&labelColor=000000)](https://nodejs.org/)

[![Last Commit](https://img.shields.io/github/last-commit/patrickcruzutfpr/processo-seletivo-pge-2)](https://github.com/patrickcruzutfpr/processo-seletivo-pge-2/commits)
[![Open Issues](https://img.shields.io/github/issues/patrickcruzutfpr/processo-seletivo-pge-2)](https://github.com/patrickcruzutfpr/processo-seletivo-pge-2/issues)
[![Repo Size](https://img.shields.io/github/repo-size/patrickcruzutfpr/processo-seletivo-pge-2)](https://github.com/patrickcruzutfpr/processo-seletivo-pge-2)
[![Contributors](https://img.shields.io/github/contributors/patrickcruzutfpr/processo-seletivo-pge-2)](https://github.com/patrickcruzutfpr/processo-seletivo-pge-2/graphs/contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/patrickcruzutfpr/processo-seletivo-pge-2/pulls)

An interactive and AI-powered job board designed to explore positions and functions available in a public selection process for the Procuradoria Geral do Estado de São Paulo (PGE-SP). This application provides a modern, user-friendly interface for potential candidates to search, filter, and understand the available roles in detail.

![Project Screenshot](screenshot-painel-processo-seletivo-pge-spo.png)

---

## 📑 Index

- [Key Features](#key-features)
- [Features in Detail](#features-in-detail)
    - [Dynamic Job List](#dynamic-job-list)
    - [Advanced Search & Filtering](#advanced-search--filtering)
    - [Flexible Sorting](#flexible-sorting)
    - [Detailed Job View](#detailed-job-view)
    - [AI-Powered Chatbot](#ai-powered-chatbot)
    - [Integrated Document Viewer](#integrated-document-viewer)
    - [Responsive Design and Theming](#responsive-design-and-theming)
    - [Data, Types, and Utilities](#data-types-and-utilities)
    - [Loading and Error States](#loading-and-error-states)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
    - [Key Architectural Concepts](#key-architectural-concepts)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Local Development](#local-development)
- [AI Service Abstraction](#ai-service-abstraction)

## ✨ Key Features

- **Dynamic Job List**: Browse all available positions with key information at a glance.
- **Advanced Search & Filtering**: Quickly find relevant jobs by searching for keywords or filtering by level (`CCESP` or `FCESP`).
- **Flexible Sorting**: Sort positions by title or remuneration (`asc`/`desc`).
- **Detailed Job View**: Select a job to see a comprehensive breakdown of its responsibilities, requirements, competencies, and salary.
- **AI-Powered Chatbot**: Ask questions in natural language about the job roles. The chatbot uses Google Gemini to understand the query and provide answers based on the context of the available positions.
- **Integrated Document Viewer**: Access and view official documents, such as the "Processo Seletivo" notice and the salary table ("Anexo I"), directly within the application.
- **Responsive Design**: A fully responsive layout that works seamlessly on desktop, tablet, and mobile devices.
- **Light & Dark Mode**: Switch between themes for comfortable viewing in any lighting condition.

## 🧭 Features in Detail

### Dynamic Job List
- Displays all positions with key fields (title, level, remuneration) and a concise summary.
- Selecting a card opens the full details view; the list preserves your current search, filter, and sort state.
- Implementation: `src/components/Job/JobList.tsx`.

### Advanced Search & Filtering
- Free-text search finds matches across relevant job fields (title, description, requirements, competencies).
- Search is normalized to handle casing and common diacritics.
- Filter by level to narrow positions: `CCESP` or `FCESP`.
- Implementation: `src/utils/jobSearch.ts` (scoring/normalization), wiring in `JobList.tsx`.

### Flexible Sorting
- Sort by job title (A→Z / Z→A) or by remuneration (asc/desc).
- Sorting works together with current search and filters.
- Implementation: sort helpers within `src/components/Job/JobList.tsx` and currency helpers in `src/utils/currency.ts`.

### Detailed Job View
- Rich breakdown including: responsibilities, requirements, competencies, and remuneration.
- Clear layout for quick scanning; long sections are split into readable blocks.
- Implementation: `src/components/Job/JobDetails.tsx`.

### AI‑Powered Chatbot
- Ask natural‑language questions like “Which roles require leadership experience?” or “Compare salaries for CCESP vs FCESP.”
- Uses Google Gemini through a small abstraction layer so providers can be swapped easily.
- Context awareness: the chatbot can use the current list of jobs as context for more precise answers.
- Implementation: UI in `src/components/Chatbot/Chatbot.tsx`; abstraction in `src/services/aiService.ts`; provider in `src/services/providers/gemini.ts`.

### Integrated Document Viewer
- Open official documents directly in the app: the Process Notice and the Salary Table (Anexo I).
- A lightweight PDF viewer component handles display; a mock layout is available for development.
- Implementation: documents in `src/components/documents/ProcessoSeletivoPdf.tsx` and `src/components/documents/Anexo1SalarioPdf.tsx`; viewer in `src/components/common/PdfViewer.tsx` and mock in `src/components/common/MockPdfLayout.tsx`.

### Responsive Design and Theming
- Tailwind CSS utility classes ensure a fluid, responsive layout across desktop, tablet, and mobile.
- Light/Dark theme support for comfortable viewing; theme selection persists during a session.
- Implementation: layout/styles across components (e.g., `src/components/common/Header.tsx`).

### Data, Types, and Utilities
- Job data source: `src/data/jobs.ts` with TypeScript types in `src/types/index.ts`.
- Currency helpers: `src/utils/currency.ts` for consistent remuneration formatting.
- Search utilities: `src/utils/jobSearch.ts` centralizes text normalization and scoring.

### Loading and Error States
- Dedicated loading spinner for async UI states (e.g., chatbot requests).
- Implementation: `src/components/Chatbot/Spinner.tsx`.

## 🚀 Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Generative AI**: Google Gemini API (`@google/genai`)

## 📂 Project Structure

The project follows a modular and scalable architecture, designed for maintainability and future expansion.

```
/src
|-- /components
|   |-- /Chatbot        # Chatbot specific components
|   |-- /Job            # Job list and details components
|   |-- /common         # Shared components (Header, Logo, etc.)
|   `-- /documents      # PDF viewer/mockup components
|-- /data
|   `-- jobs.ts         # Static job data
|-- /services
|   |-- /providers
|   |   `-- gemini.ts   # Gemini API implementation
|   `-- aiService.ts    # AI service abstraction layer
|-- /types
|   `-- index.ts        # TypeScript type definitions
|-- /utils
|   |-- currency.ts     # Currency formatting helpers
|   `-- jobSearch.ts    # Job searching and scoring logic
|-- App.tsx             # Main application component
`-- index.tsx           # Application entry point
```

### Key Architectural Concepts

- **Separation of Concerns**: Logic is separated from the UI. For instance, AI communication logic is in `/services`, while the chat UI is in `/components/Chatbot`.
- **Modularity**: Components are grouped by feature, making them easy to find and manage.
- **AI Service Abstraction**: The `aiService.ts` file provides a generic interface for interacting with any AI model. This makes it simple to swap `Gemini` with another provider like `OpenAI` in the future without refactoring the components that use it.

## ⚙️ Getting Started

### Prerequisites

- An active API key for the Google Gemini API.

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/patrickcruzutfpr/processo-seletivo-pge-2
    cd processo-seletivo-pge-2
    ```

2.  **Set up environment variables:**
    The application requires a Google Gemini API key to be available as an environment variable named `API_KEY`. The application is configured to access this key via `process.env.API_KEY`.

3.  **Run the application:**
    This project is ready to run in a compatible web development environment. Once the environment is set up and the API key is configured, the application can be served locally.

## 🤖 AI Service Abstraction

To ensure the application is not tightly coupled to a single AI provider, we use a service abstraction layer.

**`src/services/aiService.ts`** defines a generic `AiChatProvider` interface:

```typescript
export interface AiChatProvider {
  chat(query: string, contextJobs: Job[]): Promise<string>;
}
```

This allows us to create different provider implementations. The current Gemini implementation is in `src/services/providers/gemini.ts`.

To add a new provider (e.g., OpenAI), you would simply:
1.  Create a new file `src/services/providers/openai.ts`.
2.  Implement the `chat` method using the OpenAI API.
3.  Register the new provider in `aiService.ts`.

This design makes the application flexible and future-proof.
