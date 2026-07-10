# ResearchAI - Frontend Integration Specification

**Document Version:** 1.0  
**Date:** July 2, 2026  
**Status:** Final  
**Audience:** Backend Engineers, DevOps, System Architects

---

## Executive Summary

ResearchAI is an AI-powered research coordination platform enabling collaborative multi-agent research workflows. This document provides complete specifications for backend integration without requiring frontend source code access. It covers all pages, components, data structures, APIs, and system architecture.

---

## 1. COMPLETE PROJECT STRUCTURE

### Folder Architecture

```
researchai/
├── app/                           # Next.js App Router pages
│   ├── dashboard/                # Dashboard landing page
│   │   ├── layout.tsx            # Shared layout with sidebar+topnav
│   │   └── page.tsx              # Dashboard with stats, charts, agents
│   ├── projects/                 # Project management
│   │   ├── layout.tsx
│   │   └── page.tsx              # Project grid/list with CRUD
│   ├── research-library/         # PDF research papers management
│   │   ├── layout.tsx
│   │   └── page.tsx              # Paper upload, search, filtering
│   ├── paper-editor/             # Scientific paper writing
│   │   ├── layout.tsx
│   │   └── page.tsx              # Rich text editor with AI assistant
│   ├── agent-workflow/           # Multi-agent orchestration
│   │   ├── layout.tsx
│   │   └── page.tsx              # Workflow DAG visualization
│   ├── reviewer/                 # Paper peer review
│   │   ├── layout.tsx
│   │   └── page.tsx              # Review cards with scoring
│   ├── knowledge-base/           # AI memory system
│   │   ├── layout.tsx
│   │   └── page.tsx              # Knowledge graph + semantic search
│   ├── settings/                 # User settings/config
│   │   ├── layout.tsx
│   │   └── page.tsx              # Profile, workspace, API keys
│   ├── layout.tsx                # Root layout (theme, analytics)
│   ├── page.tsx                  # Entry point (redirects to /dashboard)
│   └── globals.css               # Tailwind v4 theme tokens
├── components/                    # Reusable UI components
│   ├── ui/                       # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx             # Recharts wrapper
│   │   └── modal.tsx             # Overlay modal with backdrop
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── welcome-header.tsx    # Time-based greeting
│   │   ├── stat-card.tsx         # KPI cards with trends
│   │   ├── research-progress-chart.tsx  # Bar chart
│   │   ├── active-agents.tsx     # Agent status cards
│   │   ├── recent-papers.tsx     # Paper list cards
│   │   ├── research-ideas.tsx    # AI suggestion cards
│   │   ├── recent-reviews.tsx    # Review summary cards
│   │   ├── quick-actions-interactive.tsx  # Action buttons + modals
│   │   ├── activity-timeline.tsx # Event feed
│   │   └── quick-actions.tsx     # Static action buttons
│   ├── sidebar.tsx               # Main navigation sidebar
│   ├── top-nav.tsx               # Header with search/profile
│   ├── right-panel.tsx           # Context sidebar
│   ├── theme-provider.tsx        # Light mode default enforcer
│   ├── theme-toggle.tsx          # Dark/light mode switcher
│   ├── main-workspace.tsx        # Content area wrapper
│   └── research-library-interactive.tsx  # Paper upload modal
├── lib/
│   └── utils.ts                  # Utility functions (cn, etc.)
├── components.json               # shadcn config
├── tsconfig.json                 # TypeScript config
├── next.config.mjs               # Next.js config
├── package.json                  # Dependencies
└── FRONTEND_INTEGRATION_SPEC.md   # This document
```

### Component Purposes

#### Layout Components
- **Sidebar**: 8-item navigation menu with active state tracking via `usePathname()`
- **TopNav**: Search bar, notifications, theme toggle, profile avatar
- **RightPanel**: Collapsible context panel with 5 tabs (agent status, tasks, papers, memory, jobs)
- **MainWorkspace**: Flex container for main content

#### Dashboard Components
- **WelcomeHeader**: Time-aware greeting ("Good morning/afternoon/evening")
- **StatCard**: 4 metric cards (Active Projects=12, Papers=487, Agents=3, Performance=98.2%)
- **ResearchProgressChart**: Bar chart showing research stages (completed/in-progress/planned)
- **ActiveAgents**: 3 agent cards with real-time progress bars
- **RecentPapers**: 4 paper cards with metadata and action buttons
- **ResearchIdeas**: 4 AI-generated ideas with confidence scores
- **RecentReviews**: Review summary cards with star ratings
- **QuickActionsInteractive**: 4 modal-triggering buttons (New Project, Upload Papers, Run Analysis, Agent Config)
- **ActivityTimeline**: Chronological event feed with 5 recent activities

#### Other Components
- **ThemeProvider**: Forces light mode as default
- **ThemeToggle**: Manual theme switcher in TopNav
- **Modal**: Reusable modal wrapper with overlay

---

## 2. PAGE INVENTORY

### 2.1 Dashboard Page (`/dashboard`)

**Purpose:** Primary overview of research activity, agent status, and quick actions

**Route:** `/dashboard`  
**Default Route:** App redirects `/` → `/dashboard`

**Primary Components:**
- WelcomeHeader
- StatCard (×4)
- ResearchProgressChart
- ActiveAgents
- RecentPapers
- ResearchIdeas
- RecentReviews
- QuickActionsInteractive
- ActivityTimeline

**Secondary Components:**
- Sidebar, TopNav, RightPanel

**Expected Backend APIs:**
```
GET /api/dashboard/stats
  - Returns: { activeProjects: 12, papersProcessed: 487, activeAgents: 3, performance: 98.2 }

GET /api/dashboard/research-progress
  - Returns: Weekly data { week: string, completed: number, inProgress: number, planned: number }

GET /api/dashboard/agents
  - Returns: Array of { id, name, status, progress, runtime, tokensUsed, confidence }

GET /api/dashboard/papers
  - Returns: Array of { id, title, authors, year, journal, citations, status }

GET /api/dashboard/ideas
  - Returns: Array of { id, topic, description, confidence, relevance, researchGap }

GET /api/dashboard/reviews
  - Returns: Array of { id, paperTitle, overallScore, stars, strengthCount, weaknessCount }

GET /api/dashboard/activity
  - Returns: Array of { id, timestamp, type, message, status }

WebSocket: /ws/dashboard
  - Events: stats_updated, agents_updated, activity_added
```

**Expected Loading States:** Skeleton loaders for each card section

**Expected Error States:** Toast notifications for failed API calls

**Expected Empty States:** "No projects yet" prompts with CTA

**Navigation Flow:** 
- Click sidebar "Dashboard" → /dashboard
- Click project card → /projects (modal or route)
- Click agent → /agent-workflow

**User Journey:** 
1. User logs in
2. Lands on Dashboard
3. Reviews KPIs and recent activity
4. Clicks "New Project" → New Project modal
5. Clicks agent card → Agent Workflow page
6. Checks paper list → Research Library page

---

### 2.2 Projects Page (`/projects`)

**Purpose:** Centralized project management with CRUD operations

**Route:** `/projects`

**Primary Components:**
- Search bar
- Filter dropdown (by domain: AI, Healthcare, NLP, ML, Quantum)
- View toggle (Grid/List)
- Project cards with:
  - Name, domain, description
  - Owner, team members (×1-4)
  - Progress bar
  - Completion date
  - Status badge
  - Action buttons (View, Edit, Delete)

**Secondary Components:**
- CreateProjectModal
- ViewProjectModal
- EditProjectModal
- DeleteConfirmationModal

**Expected Backend APIs:**
```
GET /api/projects?skip=0&take=10&domain=&search=
  - Returns: { projects: Project[], total: number }
  - Supports filtering by domain, search by name/description
  - Pagination: 10 per page

GET /api/projects/:id
  - Returns: Project with full details

POST /api/projects
  - Body: { name, description, domain, team }
  - Returns: { id, name, ... }

PATCH /api/projects/:id
  - Body: { name, description, team, status }
  - Returns: Updated Project

DELETE /api/projects/:id
  - Returns: { success: true }
```

**Mock Data Structure:**
```
Project {
  id: 1-5
  name: string
  domain: "AI" | "Healthcare" | "NLP" | "ML" | "Quantum Computing"
  description: string
  created: ISO date
  updated: ISO date
  owner: string (Dr. Sarah Chen, Dr. Michael Roberts, etc.)
  team: string[]
  papers: number
  summaries: number
  agents: number
  progress: 0-100
  status: "Planning" | "Analysis" | "Writing" | "Reviewing"
  completion: ISO date
  confidence: 75-92
}
```

**Expected Loading States:** Grid skeleton with 5 placeholder cards

**Expected Error States:** "Failed to load projects" with retry button

**Expected Empty States:** "No projects found" with "Create Project" CTA

**Navigation Flow:**
- Sidebar "Projects" → /projects
- Click project card → ViewProjectModal
- Click Edit → EditProjectModal
- Click Delete → DeleteConfirmationModal
- Click "+ New Project" → CreateProjectModal

---

### 2.3 Research Library Page (`/research-library`)

**Purpose:** PDF paper management with upload, search, tagging, embedding tracking

**Route:** `/research-library`

**Primary Components:**
- Drag-and-drop upload area (supports up to 100 files)
- Search bar
- Tag filters (6 tags: ML, NLP, Computer Vision, Healthcare, Quantum, Ethics)
- Status filter (Indexed, Processing, Uploaded, Archived)
- Sort options (Recent, Citations, Year)
- Paper cards with:
  - Title, authors, year, journal, citations
  - Status badge
  - Embedding progress
  - Action buttons (Open, Share, Delete)

**Secondary Components:**
- PaperDetailModal
- DeletePaperConfirmationModal
- SharePaperModal

**Expected Backend APIs:**
```
GET /api/research-library?tags=&status=&sort=recent&skip=0&take=20
  - Returns: { papers: Paper[], total: number, stats: { total, indexed, processing } }

GET /api/research-library/:id
  - Returns: Paper with full metadata

POST /api/research-library/upload
  - Multipart: files[] (up to 100)
  - Returns: { uploadId, papers: PaperPreview[] }

POST /api/research-library/:id/embed
  - Triggers embedding generation
  - Returns: { id, status: "embedding_started" }

DELETE /api/research-library/:id
  - Returns: { success: true }

GET /api/research-library/search?q=
  - Full-text search on papers
  - Returns: Paper[]
```

**Mock Data Structure:**
```
Paper {
  id: 1-20+
  title: string
  authors: string[]
  year: 2024-2026
  journal: string
  doi: string
  citations: number
  abstract: string
  url: string
  uploadDate: ISO date
  status: "indexed" | "processing" | "uploaded" | "archived"
  embedding: { status: "pending" | "in_progress" | "completed", progress: 0-100 }
  tags: string[]
  fileUrl: string
  fileSize: number
}
```

**Expected Loading States:** Paper card skeletons

**Expected Error States:** "Upload failed" or "PDF processing error" toasts

**Expected Empty States:** Empty upload zone with drag-drop instructions

---

### 2.4 Paper Editor Page (`/paper-editor`)

**Purpose:** Rich text scientific paper editing with AI assistance

**Route:** `/paper-editor`

**Primary Components:**
- Markdown editor with formatting toolbar
- Word count and reading time
- Auto-save indicator
- Save button
- AI Assistant sidebar with:
  - Table of contents
  - AI suggestions (when text selected)
  - Citation panel
  - Version history
  - Quick actions (Rewrite, Improve, Generate References, Grammar Check)

**Secondary Components:**
- CitationModal
- GenerateReferencesModal
- VersionHistoryModal

**Expected Backend APIs:**
```
GET /api/papers/editor/:id
  - Returns: { id, content, title, metadata, versions: Version[] }

PATCH /api/papers/editor/:id
  - Body: { content, title }
  - Debounced auto-save

POST /api/papers/editor/:id/versions
  - Creates version snapshot
  - Returns: Version

POST /api/papers/ai/suggestions
  - Body: { selectedText, context }
  - Returns: { suggestions: string[] }

POST /api/papers/ai/improve
  - Body: { text }
  - Returns: { improvedText }

POST /api/papers/ai/rewrite
  - Body: { text, style }
  - Returns: { rewrittenText }

POST /api/papers/ai/generate-references
  - Body: { topics: string[] }
  - Returns: { references: Citation[] }

POST /api/papers/ai/grammar-check
  - Body: { content }
  - Returns: { issues: GrammarIssue[] }
```

**Expected Loading States:** Content skeleton with spinner

**Expected Error States:** "Failed to save" with manual save fallback

**Expected Empty States:** New document template

---

### 2.5 Agent Workflow Page (`/agent-workflow`)

**Purpose:** Real-time visualization of multi-agent research orchestration

**Route:** `/agent-workflow`

**Primary Components:**
- Workflow DAG visualization with 10 agent nodes
- Node statuses: idle, running, completed, error (color coded)
- Connection arrows
- Metrics display: elapsed time, tokens used, active agent count
- Control buttons: Play, Pause, Reset
- Active agents sidebar showing real-time stats
- Execution logs panel with color-coded messages

**Secondary Components:**
- AgentDetailModal
- WorkflowLogModal

**Expected Backend APIs:**
```
GET /api/workflows/:id
  - Returns: Workflow with nodes, edges, metadata

WebSocket: /ws/workflows/:id
  - Events:
    - node_started { nodeId, timestamp }
    - node_progress { nodeId, progress: 0-100 }
    - node_completed { nodeId, output, timestamp }
    - node_error { nodeId, error }
    - log_entry { type: "info"|"success"|"error"|"warning", message }
    - metrics_updated { elapsedTime, tokensUsed, activeAgents }

POST /api/workflows/:id/execute
  - Returns: { executionId, status: "running" }

PATCH /api/workflows/:id/pause
  - Returns: { status: "paused" }

PATCH /api/workflows/:id/resume
  - Returns: { status: "running" }

POST /api/workflows/:id/reset
  - Returns: { status: "idle" }
```

**Mock Data Structure:**
```
Workflow {
  id: string
  nodes: [
    {
      id: string
      name: string (Literature Synthesizer, Insight Extractor, etc.)
      type: "agent"
      status: "idle" | "running" | "completed" | "error"
      progress: 0-100
      output: any
    }
  ]
  edges: [
    { from: nodeId, to: nodeId }
  ]
}

AgentStatus {
  id: string
  name: string
  status: string
  runtime: number (seconds)
  tokensUsed: number
  confidence: 70-95
}

ExecutionLog {
  id: string
  timestamp: ISO date
  type: "info" | "success" | "error" | "warning"
  message: string
  agent: string (optional)
}
```

---

### 2.6 Reviewer Dashboard (`/reviewer`)

**Purpose:** View AI-generated peer reviews with detailed scoring

**Route:** `/reviewer`

**Primary Components:**
- Search/filter bar
- Expandable review cards showing:
  - Overall score (0-10)
  - Star rating
  - Methodology score
  - References quality
  - Technical quality
  - Confidence score
  - Detailed sections:
    - Strengths (with ✓ icons)
    - Weaknesses (with ⚠ icons)
    - Suggestions
    - Missing citations
    - Grammar/hallucination issues
  - Action buttons: Accept, Request Changes

**Secondary Components:**
- ReviewDetailModal
- EditReviewModal

**Expected Backend APIs:**
```
GET /api/reviews?skip=0&take=10&status=
  - Returns: { reviews: Review[], total: number }

GET /api/reviews/:id
  - Returns: Review with full details

POST /api/reviews/:id/accept
  - Returns: { id, status: "accepted" }

POST /api/reviews/:id/request-changes
  - Body: { changes: string }
  - Returns: { id, status: "requested_changes" }

GET /api/reviews/stats
  - Returns: { averageScore, hallucyFree, totalReviews, accepted, rejected }
```

**Mock Data Structure:**
```
Review {
  id: string
  paperTitle: string
  paperId: string
  overallScore: 0-10
  stars: 1-5
  scores: {
    methodology: 1-10
    references: 1-10
    technicalQuality: 1-10
    confidence: 1-10
  }
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  missingCitations: string[]
  grammarIssues: string[]
  hallucinations: number
  status: "pending" | "accepted" | "rejected"
  generatedAt: ISO date
}
```

---

### 2.7 Knowledge Base (`/knowledge-base`)

**Purpose:** AI memory system with semantic search and knowledge graph

**Route:** `/knowledge-base`

**Primary Components:**
- Semantic search bar
- Tabbed interface:
  - **Concepts Tab**: Knowledge cards showing:
    - Concept name
    - Definition
    - Confidence score (0-100)
    - Related papers count
    - Frequency
  - **Graph Tab**: Interactive knowledge graph visualization
  - **Statistics Tab**: KB metrics
- Recently learned concepts
- Frequently referenced papers

**Secondary Components:**
- ConceptDetailModal
- KnowledgeGraphModal

**Expected Backend APIs:**
```
GET /api/knowledge-base/concepts?skip=0&take=10
  - Returns: { concepts: Concept[], total: number }

GET /api/knowledge-base/concepts/:id
  - Returns: Concept with related papers

POST /api/knowledge-base/concepts
  - Body: { name, definition, confidence }
  - Returns: Concept

DELETE /api/knowledge-base/concepts/:id
  - Returns: { success: true }

GET /api/knowledge-base/graph
  - Returns: { nodes: Concept[], edges: Relationship[] }

GET /api/knowledge-base/search
  - Query param: q (semantic search)
  - Returns: { concepts: Concept[], papers: Paper[] }

GET /api/knowledge-base/stats
  - Returns: { totalConcepts, totalRelationships, avgConfidence, recentlyLearned: [] }
```

**Mock Data Structure:**
```
Concept {
  id: string
  name: string
  definition: string
  confidence: 24-67 (percentage)
  relatedPapers: number
  frequency: number
  firstLearned: ISO date
  lastReferenced: ISO date
}

KnowledgeEdge {
  from: string (conceptId)
  to: string (conceptId)
  relationship: string ("related", "causes", "explained_by", etc.)
  strength: 0-1
}
```

---

### 2.8 Settings Page (`/settings`)

**Purpose:** Comprehensive user, workspace, and system configuration

**Route:** `/settings`

**Primary Components:**
- Sidebar with 12 sections (Profile, Workspace, AI Models, Agents, Knowledge Base, Integrations, Notifications, Security, Appearance, Billing, API Keys, Experimental)
- Each section has specific forms/toggles:
  - **Profile**: Avatar, name, email, organization, bio
  - **Workspace**: Default agent selection, auto-save interval
  - **AI Models**: OpenAI, Anthropic, Google, Groq, Ollama, Azure API keys/configs
  - **Agents**: Toggle 10+ agents (enable/disable)
  - **Knowledge Base**: Embedding model selection, chunk size
  - **Integrations**: Connect 8+ services
  - **Notifications**: Email/push toggles for different events
  - **Security**: Password, 2FA, login activity
  - **Appearance**: Theme, font size, density
  - **Billing**: Plan info, usage, payment methods
  - **API Keys**: CRUD operations on API keys
  - **Experimental**: Beta feature toggles

**Secondary Components:**
- ChangePasswordModal
- Enable2FAModal
- APIKeyModal
- BillingModal

**Expected Backend APIs:**
```
GET /api/users/profile
  - Returns: User profile

PATCH /api/users/profile
  - Body: { name, email, bio, organization }
  - Returns: Updated User

PATCH /api/users/settings
  - Body: { preferences: {} }
  - Returns: Updated settings

POST /api/users/password
  - Body: { oldPassword, newPassword }
  - Returns: { success: true }

POST /api/users/2fa/enable
  - Returns: { qrCode, secret }

POST /api/users/2fa/verify
  - Body: { code }
  - Returns: { success: true }

GET /api/users/integrations
  - Returns: Integration[]

POST /api/users/integrations/:service
  - Body: { apiKey, config }
  - Returns: Integration

DELETE /api/users/integrations/:service
  - Returns: { success: true }

GET /api/users/api-keys
  - Returns: APIKey[]

POST /api/users/api-keys
  - Body: { name, permissions }
  - Returns: APIKey

DELETE /api/users/api-keys/:id
  - Returns: { success: true }
```

---

## 3. COMPONENT INVENTORY

### UI Base Components

#### Modal (`components/ui/modal.tsx`)
- **Purpose**: Overlay dialog with backdrop
- **Props**: `isOpen: boolean, onClose: () => void, children: React.ReactNode, title?: string`
- **State**: Internal Framer Motion animation state
- **Events**: onClose callback
- **Backend Dependencies**: None (pure UI)

#### Card (`components/ui/card.tsx`)
- **Purpose**: Rounded container with shadow
- **Props**: `children, className?`
- **State**: None
- **Events**: None
- **Backend Dependencies**: None

#### Button (`components/ui/button.tsx`)
- **Purpose**: Interactive button with variants
- **Props**: `variant, size, disabled, onClick, children`
- **State**: None
- **Events**: onClick

#### Chart (`components/ui/chart.tsx`)
- **Purpose**: Recharts wrapper with theme tokens
- **Props**: `config, children`
- **State**: None
- **Events**: None

### Dashboard Components

#### WelcomeHeader
- **Purpose**: Time-based greeting + system status
- **Props**: None
- **State**: `greeting: string` (set via useEffect on client)
- **Events**: None
- **Backend Dependencies**: None (calculated client-side)

#### StatCard
- **Purpose**: KPI card with trend indicator
- **Props**: `label, value, subtext, icon, trend, trendValue, index`
- **State**: None
- **Events**: None
- **Backend Dependencies**: None (mock data)

#### ResearchProgressChart
- **Purpose**: Bar chart of research stages over time
- **Props**: None
- **State**: None
- **Events**: None
- **Backend Dependencies**: `GET /api/dashboard/research-progress`

#### ActiveAgents
- **Purpose**: Agent status cards with progress
- **Props**: None
- **State**: None
- **Events**: None
- **Backend Dependencies**: `GET /api/dashboard/agents`, WebSocket `/ws/dashboard`

#### RecentPapers
- **Purpose**: Paper list with metadata and actions
- **Props**: None
- **State**: None
- **Events**: Click (Open, Share, Delete)
- **Backend Dependencies**: `GET /api/dashboard/papers`, `DELETE /api/research-library/:id`

#### RecentReviews
- **Purpose**: Review summary cards
- **Props**: None
- **State**: None
- **Events**: Click (expand card)
- **Backend Dependencies**: `GET /api/dashboard/reviews`

#### ResearchIdeas
- **Purpose**: AI suggestion cards
- **Props**: None
- **State**: None
- **Events**: None
- **Backend Dependencies**: `GET /api/dashboard/ideas`

#### QuickActionsInteractive
- **Purpose**: 4 action buttons that trigger modals
- **Props**: None
- **State**: 
  - `isNewProjectOpen: boolean`
  - `isUploadOpen: boolean`
  - `isAnalysisOpen: boolean`
  - `isAgentOpen: boolean`
  - Form states for each modal
- **Events**: Modal open/close, form submission
- **Backend Dependencies**: 
  - `POST /api/projects` (New Project)
  - `POST /api/research-library/upload` (Upload Papers)
  - `POST /api/workflows/:id/execute` (Run Analysis)
  - `PATCH /api/agents/config` (Agent Config)

#### ActivityTimeline
- **Purpose**: Chronological event feed
- **Props**: None
- **State**: None
- **Events**: None
- **Backend Dependencies**: `GET /api/dashboard/activity`, WebSocket `/ws/dashboard`

### Layout Components

#### Sidebar
- **Purpose**: Main navigation with 8 items
- **Props**: None
- **State**: `isCollapsed: boolean`
- **Events**: Click navigation items
- **Backend Dependencies**: None (client-side routing)
- **Special Logic**: Uses `usePathname()` to highlight current route

#### TopNav
- **Purpose**: Header with search, notifications, profile
- **Props**: None
- **State**: `isSearchFocused: boolean`
- **Events**: Search submit, theme toggle, profile click
- **Backend Dependencies**: `GET /api/search` (global search)

#### RightPanel
- **Purpose**: Collapsible context sidebar with 5 tabs
- **Props**: None
- **State**: `activeTab: string`
- **Events**: Tab click, collapse/expand
- **Backend Dependencies**: Multiple API calls per tab

#### ThemeProvider
- **Purpose**: Enforce light mode as default
- **Props**: `children`
- **State**: Theme preference (localStorage)
- **Events**: None
- **Backend Dependencies**: None

#### ThemeToggle
- **Purpose**: Dark/light mode switcher
- **Props**: None
- **State**: `isDark: boolean`
- **Events**: onClick toggle
- **Backend Dependencies**: None

---

## 4. COMPLETE MOCK DATA

### Projects Mock Data

```json
{
  "projects": [
    {
      "id": 1,
      "name": "Neural Architecture Search",
      "domain": "AI",
      "description": "Exploring efficient NAS techniques for mobile deployment",
      "created": "2026-01-15T00:00:00Z",
      "updated": "2026-07-02T00:00:00Z",
      "owner": "Dr. Sarah Chen",
      "team": ["Alex", "Maria", "James"],
      "papers": 24,
      "summaries": 18,
      "agents": 3,
      "progress": 65,
      "status": "Writing",
      "completion": "2026-08-15T00:00:00Z",
      "confidence": 92
    },
    {
      "id": 2,
      "name": "Vision Transformers for Medical Imaging",
      "domain": "Healthcare",
      "description": "ViT applications in CT and MRI scan analysis",
      "created": "2026-02-01T00:00:00Z",
      "updated": "2026-07-01T00:00:00Z",
      "owner": "Dr. Michael Roberts",
      "team": ["Emma", "David"],
      "papers": 31,
      "summaries": 28,
      "agents": 4,
      "progress": 78,
      "status": "Reviewing",
      "completion": "2026-07-30T00:00:00Z",
      "confidence": 88
    },
    {
      "id": 3,
      "name": "Large Language Models for Code Generation",
      "domain": "NLP",
      "description": "LLM fine-tuning strategies for programming tasks",
      "created": "2026-03-10T00:00:00Z",
      "updated": "2026-06-28T00:00:00Z",
      "owner": "Dr. Lisa Wang",
      "team": ["Tom", "Rachel", "Chris", "Maya"],
      "papers": 45,
      "summaries": 42,
      "agents": 5,
      "progress": 82,
      "status": "Analysis",
      "completion": "2026-07-25T00:00:00Z",
      "confidence": 91
    },
    {
      "id": 4,
      "name": "Federated Learning for Healthcare",
      "domain": "ML",
      "description": "Privacy-preserving ML techniques for distributed medical data",
      "created": "2026-04-05T00:00:00Z",
      "updated": "2026-06-30T00:00:00Z",
      "owner": "Dr. James Wilson",
      "team": ["Nina", "Oliver"],
      "papers": 18,
      "summaries": 14,
      "agents": 2,
      "progress": 45,
      "status": "Planning",
      "completion": "2026-09-10T00:00:00Z",
      "confidence": 75
    },
    {
      "id": 5,
      "name": "Quantum Machine Learning Applications",
      "domain": "Quantum Computing",
      "description": "QAOA and VQE applications for optimization problems",
      "created": "2026-05-20T00:00:00Z",
      "updated": "2026-06-25T00:00:00Z",
      "owner": "Dr. Robert Zhang",
      "team": ["Sophie", "Marcus"],
      "papers": 12,
      "summaries": 8,
      "agents": 2,
      "progress": 32,
      "status": "Planning",
      "completion": "2026-10-01T00:00:00Z",
      "confidence": 68
    }
  ],
  "stats": {
    "total": 5,
    "active": 4,
    "completed": 0
  }
}
```

### Papers Mock Data

```json
{
  "papers": [
    {
      "id": 1,
      "title": "Attention Is All You Need",
      "authors": ["Vaswani et al."],
      "year": 2017,
      "journal": "NeurIPS",
      "doi": "10.5555/3295222.3295349",
      "citations": 72000,
      "abstract": "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...",
      "url": "https://arxiv.org/abs/1706.03762",
      "uploadDate": "2026-01-10T00:00:00Z",
      "status": "indexed",
      "embedding": {
        "status": "completed",
        "progress": 100
      },
      "tags": ["NLP", "Transformer", "Attention"],
      "fileUrl": "/uploads/papers/attention-all-you-need.pdf",
      "fileSize": 2100000
    },
    {
      "id": 2,
      "title": "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      "authors": ["Devlin et al."],
      "year": 2018,
      "journal": "arXiv",
      "doi": "10.48550/arXiv.1810.04805",
      "citations": 45000,
      "abstract": "We introduce BERT, a new method of pre-training language representations...",
      "url": "https://arxiv.org/abs/1810.04805",
      "uploadDate": "2026-01-15T00:00:00Z",
      "status": "indexed",
      "embedding": {
        "status": "completed",
        "progress": 100
      },
      "tags": ["NLP", "BERT", "Language Model"],
      "fileUrl": "/uploads/papers/bert.pdf",
      "fileSize": 1800000
    },
    {
      "id": 3,
      "title": "Vision Transformers for Image Classification",
      "authors": ["Dosovitskiy et al."],
      "year": 2020,
      "journal": "ICLR",
      "doi": "10.48550/arXiv.2010.11929",
      "citations": 18000,
      "abstract": "While the Transformer architecture has become the de-facto standard for natural language processing tasks...",
      "url": "https://arxiv.org/abs/2010.11929",
      "uploadDate": "2026-02-01T00:00:00Z",
      "status": "indexed",
      "embedding": {
        "status": "completed",
        "progress": 100
      },
      "tags": ["Computer Vision", "Transformer", "Vision"],
      "fileUrl": "/uploads/papers/vision-transformers.pdf",
      "fileSize": 2300000
    }
  ],
  "stats": {
    "total": 487,
    "indexed": 420,
    "processing": 45,
    "totalCitations": 135000
  }
}
```

### Dashboard Stats Mock Data

```json
{
  "stats": {
    "activeProjects": 12,
    "papersProcessed": 487,
    "activeAgents": 3,
    "systemPerformance": 98.2
  },
  "projectsNearCompletion": 3,
  "newPapersThisMonth": 184,
  "agentUptime": "100%",
  "avgResponseTime": 342
}
```

### Research Progress Chart Data

```json
{
  "data": [
    {
      "week": "Week 1",
      "completed": 12,
      "inProgress": 8,
      "planned": 5
    },
    {
      "week": "Week 2",
      "completed": 15,
      "inProgress": 10,
      "planned": 6
    },
    {
      "week": "Week 3",
      "completed": 18,
      "inProgress": 12,
      "planned": 7
    },
    {
      "week": "Week 4",
      "completed": 22,
      "inProgress": 14,
      "planned": 8
    },
    {
      "week": "Week 5",
      "completed": 25,
      "inProgress": 16,
      "planned": 9
    },
    {
      "week": "Week 6",
      "completed": 28,
      "inProgress": 18,
      "planned": 10
    }
  ]
}
```

### Agents Mock Data

```json
{
  "agents": [
    {
      "id": "agent-1",
      "name": "Literature Synthesizer",
      "status": "running",
      "progress": 75,
      "runtime": 3600,
      "tokensUsed": 45000,
      "confidence": 92
    },
    {
      "id": "agent-2",
      "name": "Insight Extractor",
      "status": "idle",
      "progress": 0,
      "runtime": 1800,
      "tokensUsed": 22000,
      "confidence": 88
    },
    {
      "id": "agent-3",
      "name": "Citation Mapper",
      "status": "completed",
      "progress": 100,
      "runtime": 2400,
      "tokensUsed": 31000,
      "confidence": 95
    }
  ]
}
```

### Reviews Mock Data

```json
{
  "reviews": [
    {
      "id": "review-1",
      "paperTitle": "Attention Is All You Need",
      "paperId": 1,
      "overallScore": 9,
      "stars": 5,
      "scores": {
        "methodology": 10,
        "references": 9,
        "technicalQuality": 9,
        "confidence": 92
      },
      "strengths": [
        "Novel attention mechanism clearly explained",
        "Comprehensive experimental validation",
        "Strong mathematical foundations"
      ],
      "weaknesses": [
        "Limited discussion of computational costs",
        "Few ablation studies on hyperparameters"
      ],
      "suggestions": [
        "Include memory usage comparisons",
        "Add discussion on hardware requirements"
      ],
      "missingCitations": ["Bahdanau et al. 2014"],
      "grammarIssues": 0,
      "hallucinations": 0,
      "status": "accepted",
      "generatedAt": "2026-06-30T10:30:00Z"
    },
    {
      "id": "review-2",
      "paperTitle": "BERT: Pre-training of Deep Bidirectional Transformers",
      "paperId": 2,
      "overallScore": 8,
      "stars": 4,
      "scores": {
        "methodology": 9,
        "references": 8,
        "technicalQuality": 8,
        "confidence": 88
      },
      "strengths": [
        "Bidirectional pre-training is innovative",
        "Excellent performance on downstream tasks",
        "Well-structured paper"
      ],
      "weaknesses": [
        "Pre-training details could be clearer",
        "Limited error analysis"
      ],
      "suggestions": [
        "Provide failure case analysis",
        "Compare with other pre-training strategies"
      ],
      "missingCitations": [],
      "grammarIssues": 0,
      "hallucinations": 0,
      "status": "pending",
      "generatedAt": "2026-06-28T14:20:00Z"
    }
  ]
}
```

### Knowledge Base Mock Data

```json
{
  "concepts": [
    {
      "id": "concept-1",
      "name": "Transformer",
      "definition": "A neural network architecture based on self-attention mechanism that processes sequences in parallel",
      "confidence": 97,
      "relatedPapers": 67,
      "frequency": 243,
      "firstLearned": "2026-01-10T00:00:00Z",
      "lastReferenced": "2026-07-02T14:30:00Z"
    },
    {
      "id": "concept-2",
      "name": "Attention Mechanism",
      "definition": "A mechanism that allows models to focus on specific parts of input sequences",
      "confidence": 94,
      "relatedPapers": 54,
      "frequency": 189,
      "firstLearned": "2026-01-10T00:00:00Z",
      "lastReferenced": "2026-07-02T13:15:00Z"
    },
    {
      "id": "concept-3",
      "name": "Vision Transformer",
      "definition": "Application of Transformer architecture to image classification by dividing images into patches",
      "confidence": 91,
      "relatedPapers": 34,
      "frequency": 112,
      "firstLearned": "2026-02-01T00:00:00Z",
      "lastReferenced": "2026-07-02T11:45:00Z"
    },
    {
      "id": "concept-4",
      "name": "Pre-training",
      "definition": "Initial training on large unlabeled datasets before fine-tuning on specific tasks",
      "confidence": 89,
      "relatedPapers": 42,
      "frequency": 156,
      "firstLearned": "2026-01-15T00:00:00Z",
      "lastReferenced": "2026-07-01T16:20:00Z"
    },
    {
      "id": "concept-5",
      "name": "Fine-tuning",
      "definition": "Adapting a pre-trained model to a specific downstream task with limited labeled data",
      "confidence": 88,
      "relatedPapers": 38,
      "frequency": 145,
      "firstLearned": "2026-01-15T00:00:00Z",
      "lastReferenced": "2026-06-30T09:10:00Z"
    },
    {
      "id": "concept-6",
      "name": "Multi-head Attention",
      "definition": "Parallel attention mechanisms that allow models to attend to multiple representation subspaces",
      "confidence": 86,
      "relatedPapers": 29,
      "frequency": 98,
      "firstLearned": "2026-01-10T00:00:00Z",
      "lastReferenced": "2026-07-01T13:40:00Z"
    }
  ],
  "edges": [
    {
      "from": "concept-1",
      "to": "concept-2",
      "relationship": "based_on",
      "strength": 0.95
    },
    {
      "from": "concept-1",
      "to": "concept-3",
      "relationship": "applied_to",
      "strength": 0.88
    },
    {
      "from": "concept-2",
      "to": "concept-6",
      "relationship": "variant_of",
      "strength": 0.92
    },
    {
      "from": "concept-4",
      "to": "concept-5",
      "relationship": "precedes",
      "strength": 0.98
    }
  ]
}
```

### Activity Timeline Mock Data

```json
{
  "activities": [
    {
      "id": 1,
      "timestamp": "2026-07-02T14:30:00Z",
      "type": "paper_uploaded",
      "message": "Dr. Sarah Chen uploaded 3 new research papers",
      "status": "success"
    },
    {
      "id": 2,
      "timestamp": "2026-07-02T13:15:00Z",
      "type": "analysis_completed",
      "message": "Literature synthesis analysis completed for Neural Architecture Search",
      "status": "success"
    },
    {
      "id": 3,
      "timestamp": "2026-07-02T11:45:00Z",
      "type": "review_generated",
      "message": "AI review generated for Vision Transformers paper",
      "status": "success"
    },
    {
      "id": 4,
      "timestamp": "2026-07-02T10:20:00Z",
      "type": "project_created",
      "message": "New project created: Federated Learning Applications",
      "status": "success"
    },
    {
      "id": 5,
      "timestamp": "2026-07-02T09:00:00Z",
      "type": "knowledge_updated",
      "message": "Knowledge base updated with 5 new concepts",
      "status": "success"
    }
  ]
}
```

---

## 5. TYPESCRIPT INTERFACES

```typescript
// User & Auth
interface User {
  id: string;
  email: string;
  name: string;
  organization: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Projects
interface Project {
  id: string;
  name: string;
  description: string;
  domain: "AI" | "Healthcare" | "NLP" | "ML" | "Quantum Computing";
  owner: string;
  team: string[];
  papers: number;
  summaries: number;
  agents: number;
  progress: number; // 0-100
  status: "Planning" | "Analysis" | "Writing" | "Reviewing";
  completion: Date;
  confidence: number; // 0-100
  created: Date;
  updated: Date;
}

interface CreateProjectInput {
  name: string;
  description: string;
  domain: string;
  team: string[];
}

// Papers
interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  doi: string;
  citations: number;
  abstract: string;
  url: string;
  uploadDate: Date;
  status: "indexed" | "processing" | "uploaded" | "archived";
  embedding: {
    status: "pending" | "in_progress" | "completed";
    progress: number; // 0-100
  };
  tags: string[];
  fileUrl: string;
  fileSize: number;
}

// Reviews
interface Review {
  id: string;
  paperTitle: string;
  paperId: string;
  overallScore: number; // 0-10
  stars: number; // 1-5
  scores: {
    methodology: number;
    references: number;
    technicalQuality: number;
    confidence: number;
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingCitations: string[];
  grammarIssues: number;
  hallucinations: number;
  status: "pending" | "accepted" | "rejected";
  generatedAt: Date;
}

// Agents
interface Agent {
  id: string;
  name: string;
  status: "idle" | "running" | "completed" | "error";
  progress: number; // 0-100
  runtime: number; // seconds
  tokensUsed: number;
  confidence: number; // 0-100
}

// Workflows
interface Workflow {
  id: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: "idle" | "running" | "paused" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

interface WorkflowNode {
  id: string;
  name: string;
  type: "agent" | "condition" | "output";
  status: "idle" | "running" | "completed" | "error";
  progress: number; // 0-100
  output?: any;
}

interface WorkflowEdge {
  from: string;
  to: string;
}

// Knowledge Base
interface Concept {
  id: string;
  name: string;
  definition: string;
  confidence: number; // 0-100
  relatedPapers: number;
  frequency: number;
  firstLearned: Date;
  lastReferenced: Date;
}

interface KnowledgeEdge {
  from: string;
  to: string;
  relationship: string;
  strength: number; // 0-1
}

// Dashboard
interface DashboardStats {
  activeProjects: number;
  papersProcessed: number;
  activeAgents: number;
  systemPerformance: number;
}

interface ResearchProgress {
  week: string;
  completed: number;
  inProgress: number;
  planned: number;
}

// Activity & Timeline
interface Activity {
  id: string;
  timestamp: Date;
  type: string;
  message: string;
  status: "success" | "error" | "pending";
  metadata?: Record<string, any>;
}

// Settings
interface UserSettings {
  defaultAgent: string;
  autoSaveInterval: number;
  theme: "light" | "dark";
  fontSize: "small" | "medium" | "large";
  density: "compact" | "normal" | "spacious";
  emailNotifications: boolean;
  pushNotifications: boolean;
  integrations: Integration[];
  apiKeys: APIKey[];
}

interface Integration {
  id: string;
  service: string;
  apiKey: string;
  config: Record<string, any>;
  createdAt: Date;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: Date;
  lastUsed?: Date;
}
```

---

## 6. GLOBAL STATE MANAGEMENT

### Recommended Zustand Store Structure

```typescript
// stores/authStore.ts
interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  setUser: (user: User) => void;
}

// stores/projectStore.ts
interface ProjectStore {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  filter: { domain?: string; search?: string };
  
  // Actions
  fetchProjects: (filter?) => Promise<void>;
  selectProject: (id: string) => void;
  createProject: (input: CreateProjectInput) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setFilter: (filter: any) => void;
}

// stores/paperStore.ts
interface PaperStore {
  papers: Paper[];
  isLoading: boolean;
  filter: { tags?: string[]; status?: string; sort?: string };
  pagination: { skip: number; take: number; total: number };
  
  // Actions
  fetchPapers: (filter?, pagination?) => Promise<void>;
  uploadPapers: (files: File[]) => Promise<void>;
  deletePaper: (id: string) => Promise<void>;
  setPagination: (skip: number, take: number) => void;
}

// stores/uiStore.ts
interface UIStore {
  isSidebarCollapsed: boolean;
  theme: "light" | "dark";
  activeTab: string;
  modals: {
    newProject: boolean;
    uploadPapers: boolean;
    runAnalysis: boolean;
    agentConfig: boolean;
  };
  
  // Actions
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark") => void;
  setActiveTab: (tab: string) => void;
  openModal: (modal: string) => void;
  closeModal: (modal: string) => void;
}
```

**Persistence:** Use localStorage for auth tokens and user preferences
**Dependencies:** Zustand + Zustand Persist middleware

---

## 7. SERVER STATE MANAGEMENT

### Recommended TanStack Query Structure

```typescript
// React Query Keys
export const queryKeys = {
  auth: ['auth'],
  projects: ['projects'],
  project: (id: string) => ['projects', id],
  papers: ['papers'],
  paper: (id: string) => ['papers', id],
  reviews: ['reviews'],
  review: (id: string) => ['reviews', id],
  agents: ['agents'],
  workflows: ['workflows'],
  workflow: (id: string) => ['workflows', id],
  knowledge: ['knowledge'],
  concept: (id: string) => ['knowledge', 'concepts', id],
  dashboard: ['dashboard'],
  settings: ['settings'],
};

// Query Hooks
useGetProjects(filter?, pagination?) // GET /api/projects
useGetProjectById(id) // GET /api/projects/:id
useGetPapers(filter?, pagination?) // GET /api/research-library
useGetPaperById(id) // GET /api/research-library/:id
useGetReviews(pagination?) // GET /api/reviews
useGetReviewById(id) // GET /api/reviews/:id
useGetDashboardStats() // GET /api/dashboard/stats
useGetAgents() // GET /api/dashboard/agents
useGetKnowledgeBase() // GET /api/knowledge-base/concepts

// Mutation Hooks
useCreateProject() // POST /api/projects
useUpdateProject(id) // PATCH /api/projects/:id
useDeleteProject(id) // DELETE /api/projects/:id
useUploadPapers() // POST /api/research-library/upload
useDeletePaper(id) // DELETE /api/research-library/:id
useAcceptReview(id) // POST /api/reviews/:id/accept
useRequestChanges(id) // POST /api/reviews/:id/request-changes
useExecuteWorkflow(id) // POST /api/workflows/:id/execute

// Cache Strategy
- Stale time: 5 minutes for dashboard data
- Cache time: 30 minutes
- Background refetch on window focus
- Automatic invalidation on mutations
- Optimistic updates for user actions
```

---

## 8. API CONTRACT

### Complete API Specification

#### Dashboard APIs

```
GET /api/dashboard/stats
Response 200:
{
  "activeProjects": 12,
  "papersProcessed": 487,
  "activeAgents": 3,
  "systemPerformance": 98.2,
  "projectsNearCompletion": 3
}

GET /api/dashboard/research-progress
Response 200:
{
  "data": [
    { "week": "Week 1", "completed": 12, "inProgress": 8, "planned": 5 },
    ...
  ]
}

GET /api/dashboard/agents
Response 200:
{
  "agents": [Agent]
}

GET /api/dashboard/papers
Response 200:
{
  "papers": [Paper]
}

GET /api/dashboard/reviews
Response 200:
{
  "reviews": [Review]
}

GET /api/dashboard/ideas
Response 200:
{
  "ideas": [
    { "id", "topic", "description", "confidence", "relevance", "researchGap" }
  ]
}

GET /api/dashboard/activity
Response 200:
{
  "activities": [Activity]
}

WebSocket /ws/dashboard
Events:
- stats_updated { stats }
- agents_updated { agents }
- activity_added { activity }
```

#### Projects APIs

```
GET /api/projects?skip=0&take=10&domain=&search=
Response 200:
{
  "projects": [Project],
  "total": 5
}
Auth: Required (Bearer token)
Pagination: offset/limit
Filters: domain, search

GET /api/projects/:id
Response 200: Project
Response 404: { error: "Project not found" }

POST /api/projects
Body: { "name", "description", "domain", "team": [] }
Response 201: Project
Validation:
  - name: required, min 3 chars
  - description: required, min 10 chars
  - domain: enum
  - team: array of user IDs

PATCH /api/projects/:id
Body: { "name"?, "description"?, "status"?, "team"? }
Response 200: Project
Response 404: Not found
Response 403: Unauthorized (only owner/team)

DELETE /api/projects/:id
Response 204: No content
Response 403: Unauthorized
```

#### Research Library APIs

```
GET /api/research-library?tags=&status=&sort=recent&skip=0&take=20
Response 200:
{
  "papers": [Paper],
  "total": 487,
  "stats": { "total", "indexed", "processing" }
}
Filters: tags (array), status, sort
Pagination: offset/limit

GET /api/research-library/:id
Response 200: Paper with full metadata

POST /api/research-library/upload
Content-Type: multipart/form-data
Body: files[] (max 100 files, 2GB total)
Response 202: { "uploadId", "papers": [PaperPreview] }
Error 413: Payload too large
Error 400: Invalid file type (only PDF)

POST /api/research-library/:id/embed
Body: { }
Response 202: { "id", "status": "embedding_started" }
WebSocket: stream updates

GET /api/research-library/search?q=
Query: semantic search term
Response 200: { "papers": [Paper], "concepts": [Concept] }

DELETE /api/research-library/:id
Response 204: No content
Response 404: Not found
```

#### Paper Editor APIs

```
GET /api/papers/editor/:id
Response 200:
{
  "id", "content", "title", "metadata",
  "versions": [{ "id", "createdAt", "content" }]
}

PATCH /api/papers/editor/:id
Body: { "content", "title" }
Response 200: Paper
Debounced: server side debouncing recommended (500ms)

POST /api/papers/editor/:id/versions
Body: { }
Response 201: Version

POST /api/papers/ai/suggestions
Body: { "selectedText", "context" }
Response 200: { "suggestions": [string] }
Streaming: SSE response recommended

POST /api/papers/ai/improve
Body: { "text" }
Response 200: { "improvedText" }

POST /api/papers/ai/rewrite
Body: { "text", "style" }
Response 200: { "rewrittenText" }

POST /api/papers/ai/generate-references
Body: { "topics": [string] }
Response 200: { "references": [Citation] }

POST /api/papers/ai/grammar-check
Body: { "content" }
Response 200: { "issues": [GrammarIssue] }
```

#### Agent Workflow APIs

```
GET /api/workflows/:id
Response 200: Workflow with nodes, edges, metadata

WebSocket /ws/workflows/:id
Events:
- node_started { nodeId, timestamp }
- node_progress { nodeId, progress: 0-100 }
- node_completed { nodeId, output, timestamp }
- node_error { nodeId, error }
- log_entry { type, message, agent? }
- metrics_updated { elapsedTime, tokensUsed, activeAgents }

POST /api/workflows/:id/execute
Body: { }
Response 202: { "executionId", "status": "running" }

PATCH /api/workflows/:id/pause
Response 200: { "status": "paused" }

PATCH /api/workflows/:id/resume
Response 200: { "status": "running" }

POST /api/workflows/:id/reset
Response 200: { "status": "idle" }
```

#### Reviewer APIs

```
GET /api/reviews?skip=0&take=10&status=
Response 200:
{
  "reviews": [Review],
  "total": number
}

GET /api/reviews/:id
Response 200: Review

POST /api/reviews/:id/accept
Response 200: { "id", "status": "accepted" }

POST /api/reviews/:id/request-changes
Body: { "changes": string }
Response 200: { "id", "status": "requested_changes" }

GET /api/reviews/stats
Response 200:
{
  "averageScore": number,
  "hallucyFreeCount": number,
  "totalReviews": number,
  "accepted": number,
  "rejected": number
}
```

#### Knowledge Base APIs

```
GET /api/knowledge-base/concepts?skip=0&take=10
Response 200: { "concepts": [Concept], "total": number }

GET /api/knowledge-base/concepts/:id
Response 200: Concept with related papers

POST /api/knowledge-base/concepts
Body: { "name", "definition", "confidence" }
Response 201: Concept

DELETE /api/knowledge-base/concepts/:id
Response 204: No content

GET /api/knowledge-base/graph
Response 200: { "nodes": [Concept], "edges": [KnowledgeEdge] }

GET /api/knowledge-base/search?q=
Query: semantic search
Response 200: { "concepts": [Concept], "papers": [Paper] }

GET /api/knowledge-base/stats
Response 200:
{
  "totalConcepts": number,
  "totalRelationships": number,
  "avgConfidence": number,
  "recentlyLearned": [Concept]
}
```

#### Settings APIs

```
GET /api/users/profile
Response 200: User

PATCH /api/users/profile
Body: { "name", "email", "bio", "organization", "avatar"? }
Response 200: User

PATCH /api/users/settings
Body: { "preferences": {} }
Response 200: Settings

POST /api/users/password
Body: { "oldPassword", "newPassword" }
Response 200: { "success": true }
Response 401: Invalid password

POST /api/users/2fa/enable
Response 200: { "qrCode", "secret" }

POST /api/users/2fa/verify
Body: { "code" }
Response 200: { "success": true }
Response 400: Invalid code

GET /api/users/integrations
Response 200: [Integration]

POST /api/users/integrations/:service
Body: { "apiKey", "config" }
Response 201: Integration

DELETE /api/users/integrations/:service
Response 204: No content

GET /api/users/api-keys
Response 200: [APIKey]

POST /api/users/api-keys
Body: { "name", "permissions": [] }
Response 201: APIKey

DELETE /api/users/api-keys/:id
Response 204: No content
```

#### Authentication APIs

```
POST /api/auth/login
Body: { "email", "password" }
Response 200: { "user": User, "token": AuthToken }
Response 401: { "error": "Invalid credentials" }

POST /api/auth/signup
Body: { "email", "password", "name", "organization" }
Response 201: { "user": User, "token": AuthToken }
Response 409: { "error": "Email already exists" }

POST /api/auth/refresh
Body: { "refreshToken" }
Response 200: { "token": AuthToken }
Response 401: { "error": "Invalid token" }

POST /api/auth/logout
Response 200: { "success": true }

POST /api/auth/forgot-password
Body: { "email" }
Response 200: { "message": "Reset link sent" }

POST /api/auth/reset-password
Body: { "token", "password" }
Response 200: { "success": true }
```

---

## 9. DATABASE REQUIREMENTS

### Inferred Entity Relationships

```
User (1) ← → (N) Project
User (1) ← → (N) Paper
User (1) ← → (N) Review
User (1) ← → (N) APIKey
User (1) ← → (N) Integration

Project (1) ← → (N) Paper
Project (1) ← → (N) Agent
Project (1) ← → (N) Activity

Paper (1) ← → (N) Review
Paper (1) ← → (N) Citation
Paper (1) ← → (N) Tag

Workflow (1) ← → (N) WorkflowNode
Workflow (1) ← → (N) WorkflowEdge

Concept (N) ← → (N) Paper (through Concept_Paper junction)
Concept (N) ← → (N) Concept (through KnowledgeEdge)
```

### Required Tables

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),
  organization VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_email (email)
);

CREATE TABLE projects (
  id UUID PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  description TEXT,
  domain ENUM('AI', 'Healthcare', 'NLP', 'ML', 'Quantum Computing'),
  owner_id UUID NOT NULL REFERENCES users(id),
  status ENUM('Planning', 'Analysis', 'Writing', 'Reviewing'),
  progress INT DEFAULT 0,
  confidence INT DEFAULT 0,
  completion_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_owner (owner_id),
  INDEX idx_domain (domain),
  INDEX idx_status (status)
);

CREATE TABLE project_members (
  project_id UUID NOT NULL REFERENCES projects(id),
  user_id UUID NOT NULL REFERENCES users(id),
  role VARCHAR(50),
  PRIMARY KEY (project_id, user_id)
);

CREATE TABLE papers (
  id UUID PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  authors TEXT[], -- array of author names
  year INT,
  journal VARCHAR(255),
  doi VARCHAR(100),
  citations INT DEFAULT 0,
  abstract TEXT,
  url VARCHAR(500),
  status ENUM('indexed', 'processing', 'uploaded', 'archived'),
  embedding_status ENUM('pending', 'in_progress', 'completed'),
  embedding_progress INT DEFAULT 0,
  file_url VARCHAR(500),
  file_size BIGINT,
  uploaded_by UUID REFERENCES users(id),
  upload_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_status (status),
  INDEX idx_year (year),
  FULLTEXT INDEX idx_title_abstract (title, abstract)
);

CREATE TABLE paper_projects (
  paper_id UUID NOT NULL REFERENCES papers(id),
  project_id UUID NOT NULL REFERENCES projects(id),
  PRIMARY KEY (paper_id, project_id)
);

CREATE TABLE tags (
  id UUID PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE paper_tags (
  paper_id UUID NOT NULL REFERENCES papers(id),
  tag_id UUID NOT NULL REFERENCES tags(id),
  PRIMARY KEY (paper_id, tag_id)
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  paper_id UUID NOT NULL REFERENCES papers(id),
  overall_score INT,
  methodology_score INT,
  references_score INT,
  technical_quality_score INT,
  confidence_score INT,
  strengths TEXT[],
  weaknesses TEXT[],
  suggestions TEXT[],
  missing_citations TEXT[],
  grammar_issues INT DEFAULT 0,
  hallucinations INT DEFAULT 0,
  status ENUM('pending', 'accepted', 'rejected'),
  generated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_paper (paper_id),
  INDEX idx_status (status)
);

CREATE TABLE agents (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE workflows (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  status ENUM('idle', 'running', 'paused', 'completed'),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_status (status)
);

CREATE TABLE workflow_nodes (
  id UUID PRIMARY KEY,
  workflow_id UUID NOT NULL REFERENCES workflows(id),
  agent_id UUID REFERENCES agents(id),
  status ENUM('idle', 'running', 'completed', 'error'),
  progress INT DEFAULT 0,
  output JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE workflow_edges (
  id UUID PRIMARY KEY,
  workflow_id UUID NOT NULL REFERENCES workflows(id),
  from_node_id UUID NOT NULL REFERENCES workflow_nodes(id),
  to_node_id UUID NOT NULL REFERENCES workflow_nodes(id),
  PRIMARY KEY (from_node_id, to_node_id)
);

CREATE TABLE concepts (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  definition TEXT,
  confidence INT,
  frequency INT DEFAULT 1,
  first_learned TIMESTAMP DEFAULT NOW(),
  last_referenced TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_confidence (confidence),
  FULLTEXT INDEX idx_name (name)
);

CREATE TABLE concept_papers (
  concept_id UUID NOT NULL REFERENCES concepts(id),
  paper_id UUID NOT NULL REFERENCES papers(id),
  PRIMARY KEY (concept_id, paper_id)
);

CREATE TABLE knowledge_edges (
  id UUID PRIMARY KEY,
  from_concept_id UUID NOT NULL REFERENCES concepts(id),
  to_concept_id UUID NOT NULL REFERENCES concepts(id),
  relationship VARCHAR(100),
  strength DECIMAL(3, 2),
  PRIMARY KEY (from_concept_id, to_concept_id)
);

CREATE TABLE activities (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(100),
  message TEXT,
  status ENUM('success', 'error', 'pending'),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user (user_id),
  INDEX idx_created (created_at)
);

CREATE TABLE api_keys (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(255),
  key_hash VARCHAR(255) UNIQUE,
  permissions TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  last_used TIMESTAMP,
  INDEX idx_user (user_id)
);

CREATE TABLE integrations (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  service VARCHAR(100),
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user (user_id),
  INDEX idx_service (service)
);
```

---

## 10. FILE STORAGE

### Storage Architecture

```
storage/
├── pdfs/                           # Research papers
│   ├── {userId}/
│   │   ├── {paperId}.pdf
│   │   └── {paperId}_metadata.json
├── embeddings/                     # Vector embeddings
│   ├── {paperId}.bin
├── exports/                        # Generated exports
│   ├── {projectId}/
│   │   ├── {timestamp}_paper.pdf
│   │   ├── {timestamp}_report.xlsx
│   │   └── {timestamp}_summary.docx
├── avatars/                        # User avatars
│   ├── {userId}.jpg
├── temp/                           # Temporary files
│   ├── uploads/
│   │   ├── {sessionId}/
│   │   │   ├── {fileName}.pdf
├── logs/                           # System logs
│   ├── {date}/
│   │   ├── agent-executions.log
│   │   ├── api-requests.log
│   │   └── errors.log
└── backups/                        # Database backups
    ├── daily/
    ├── weekly/
    └── monthly/
```

### Storage Details

- **PDFs**: `/pdfs/{userId}/{paperId}.pdf` (S3 or similar)
  - Max file size: 100MB per file, 2GB total per upload batch
  - Retention: Until explicitly deleted
  
- **Embeddings**: `/embeddings/{paperId}.bin` (Vector DB - Pinecone, Weaviate, etc.)
  - Generated asynchronously after upload
  - Model: Sentence-Transformers or OpenAI embeddings
  - Dimension: 384-1536 depending on model
  
- **Exports**: `/exports/{projectId}/{timestamp}_*.{format}` (PDF, XLSX, DOCX)
  - Generated on-demand
  - Retained for 30 days then deleted
  
- **Avatars**: `/avatars/{userId}.jpg` (CDN or S3)
  - Max size: 5MB
  - Supported formats: JPG, PNG, WebP
  
- **Logs**: `/logs/{date}/` (CloudWatch, ELK, or local filesystem)
  - Retention: 90 days
  - Levels: INFO, WARN, ERROR, DEBUG

---

## 11. AGENT COMMUNICATION

### Visible Agents in Frontend

**Agent 1: Literature Synthesizer**
- **Purpose**: Summarize and synthesize research papers
- **Inputs**: List of papers, focus areas, number of topics
- **Outputs**: Synthesis document, summary, key findings
- **Status**: Shows real-time progress bar
- **Logs**: Agent can output progress messages
- **Confidence**: 70-95% based on paper quality
- **Runtime**: 30-300 seconds per batch
- **Streaming**: Yes - real-time log updates

**Agent 2: Insight Extractor**
- **Purpose**: Extract key insights and novel findings
- **Inputs**: Paper collection, focus areas
- **Outputs**: Insight JSON, research gaps identified
- **Status**: Idle, Running, Completed, Error
- **Progress**: 0-100%
- **Tokens Used**: Tracked in real-time
- **Streaming**: Yes - findings stream as discovered

**Agent 3: Citation Mapper**
- **Purpose**: Build citation graphs and relationships
- **Inputs**: Papers with citations
- **Outputs**: Citation graph JSON, relationship strength scores
- **Status**: Running with progress
- **Confidence**: 80-98% based on metadata quality
- **Runtime**: 20-180 seconds
- **Streaming**: Yes - node/edge updates

### Agent Execution Flow

```
POST /api/workflows/:id/execute
  ↓
WebSocket /ws/workflows/:id connected
  ↓
node_started event { nodeId, timestamp }
  ↓
log_entry events { type, message } (streaming)
  ↓
node_progress events { nodeId, progress: 0-100 } (periodic)
  ↓
node_completed event { nodeId, output } OR node_error event { nodeId, error }
  ↓
metrics_updated event { elapsedTime, tokensUsed, activeAgents }
  ↓
workflow completes when all nodes done
```

---

## 12. WEBSOCKET EVENTS

### Event Schema

```typescript
interface WSEvent {
  type: string;
  timestamp: ISO8601;
  data: any;
  sourceId?: string;
}
```

### Event Catalog

```
// Dashboard Events
dashboard/stats_updated { stats: DashboardStats }
dashboard/agents_updated { agents: Agent[] }
dashboard/activity_added { activity: Activity }

// Paper Upload Events
paper/upload_started { uploadId, fileCount }
paper/upload_progress { uploadId, fileIndex, progress: 0-100, fileName }
paper/upload_completed { uploadId, papersCreated: [] }
paper/upload_failed { uploadId, error, failedFiles: [] }

// Embedding Events
embedding/started { paperId }
embedding/progress { paperId, progress: 0-100, percentComplete }
embedding/completed { paperId, vectorCount, dimension }
embedding/failed { paperId, error }

// Workflow Events
workflow/node_started { nodeId, timestamp }
workflow/node_progress { nodeId, progress: 0-100 }
workflow/node_completed { nodeId, output, tokensUsed, runtime }
workflow/node_error { nodeId, error, errorType }
workflow/log_entry { type: "info"|"success"|"error"|"warning", message, agent?, timestamp }
workflow/metrics_updated { elapsedTime, tokensUsed, activeAgents }

// Review Events
review/generated { reviewId, paperId, score }
review/accepted { reviewId }
review/rejected { reviewId }

// Knowledge Events
knowledge/concept_added { conceptId, name, confidence }
knowledge/concept_updated { conceptId, updates }
knowledge/relationship_added { from, to, relationship, strength }

// Notification Events
notification/created { id, type, message, timestamp }

// Project Events
project/created { projectId, name }
project/updated { projectId, updates }
project/member_joined { projectId, userId }
project/member_left { projectId, userId }
```

---

## 13. SEARCH

### Searchable Entities

**Projects**
- Fields: name, description, domain, owner, team members
- Type: Full-text + fuzzy matching
- API: `GET /api/projects?search=neural`

**Papers**
- Fields: title, authors, abstract, doi, journal
- Type: Full-text + semantic (embeddings)
- API: `GET /api/research-library/search?q=quantum`
- Advanced: Filter by year, citations, journal

**Knowledge Base**
- Fields: concept name, definition, related concepts
- Type: Semantic search using embeddings
- API: `GET /api/knowledge-base/search?q=attention`

**Users**
- Fields: name, email, organization
- Type: Exact match + fuzzy
- API: Internal use

**Reviews**
- Fields: paper title, review text, suggestions
- Type: Full-text
- API: `GET /api/reviews?search=...`

### Search Implementation

- Use PostgreSQL FULLTEXT for text search
- Use vector database (Pinecone, Weaviate) for semantic search
- Combine BM25 ranking + semantic similarity
- Cache popular searches

---

## 14. FILTERS

### Projects Page Filters

**Domain Filter**
- Values: "AI", "Healthcare", "NLP", "ML", "Quantum Computing"
- Multiple select: Yes
- API: `?domain=AI&domain=ML`

**Status Filter**
- Values: "Planning", "Analysis", "Writing", "Reviewing"
- Multiple select: Yes

**Sort Options**
- Created (newest/oldest)
- Updated (newest/oldest)
- Progress (high/low)
- Confidence (high/low)

### Research Library Filters

**Tags Filter**
- Values: "ML", "NLP", "Computer Vision", "Healthcare", "Quantum", "Ethics"
- Multiple select: Yes
- API: `?tags=ML&tags=NLP`

**Status Filter**
- Values: "indexed", "processing", "uploaded", "archived"

**Sort Options**
- Recent (upload date)
- Citations (highest)
- Year (newest)
- Title (A-Z)

### Knowledge Base Filters

**Confidence Filter**
- Range: 0-100%
- Type: Slider
- API: `?minConfidence=80&maxConfidence=100`

**Frequency Filter**
- Range: 1-1000+
- Type: Slider

---

## 15. PAGINATION

### Recommended Strategy: Cursor Pagination

**Why Cursor Pagination:**
- Handles insertions/deletions during pagination
- More efficient than offset
- Suitable for real-time data
- Prevents duplicate results

**Implementation:**

```
GET /api/projects?cursor=abc123&limit=10

Response:
{
  "data": [Project],
  "nextCursor": "xyz789",
  "hasMore": true
}
```

**Fallback: Offset Pagination** (for simplicity)

```
GET /api/papers?skip=0&take=20

Response:
{
  "data": [Paper],
  "total": 487,
  "skip": 0,
  "take": 20
}
```

**Pagination Settings**
- Default page size: 10-20 items
- Max page size: 100
- Supported strategies: cursor, offset, keyset

---

## 16. PERMISSIONS & ROLES

### Inferred Roles

```typescript
enum Role {
  ADMIN = "admin",
  RESEARCHER = "researcher",
  STUDENT = "student",
  REVIEWER = "reviewer",
  GUEST = "guest"
}
```

### Permission Matrix

```
                Admin  Researcher  Student  Reviewer  Guest
Projects:
  Create        ✓      ✓           ✗        ✗         ✗
  Read Own      ✓      ✓           ✓        ✗         ✗
  Read All      ✓      ✓           ✗        ✗         ✗
  Update Own    ✓      ✓           ✓        ✗         ✗
  Update All    ✓      ✗           ✗        ✗         ✗
  Delete Own    ✓      ✓           ✗        ✗         ✗
  Delete All    ✓      ✗           ✗        ✗         ✗

Papers:
  Upload        ✓      ✓           ✓        ✗         ✗
  Read          ✓      ✓           ✓        ✓         ✓
  Delete Own    ✓      ✓           ✓        ✗         ✗
  Delete All    ✓      ✗           ✗        ✗         ✗
  Search        ✓      ✓           ✓        ✓         ✓

Reviews:
  Create        ✓      ✓           ✗        ✓         ✗
  Read Own      ✓      ✓           ✓        ✓         ✗
  Read All      ✓      ✓           ✗        ✗         ✗
  Accept        ✓      ✓           ✗        ✓         ✗
  
Settings:
  Modify Own    ✓      ✓           ✓        ✓         ✗
  View All      ✓      ✗           ✗        ✗         ✗
  Manage Users  ✓      ✗           ✗        ✗         ✗
```

---

## 17. AUTHENTICATION

### Recommended Flow: JWT + Refresh Tokens

```
Login Flow:
1. POST /api/auth/login { email, password }
2. Server returns { accessToken (15 min), refreshToken (7 days) }
3. Store accessToken in memory
4. Store refreshToken in httpOnly cookie

API Request:
1. Include accessToken in Authorization header
2. Server validates JWT signature and expiry

Token Refresh:
1. On 401 response, POST /api/auth/refresh { refreshToken }
2. Server returns new accessToken
3. Retry original request

Logout:
1. Clear accessToken from memory
2. Clear refreshToken cookie
3. Optional: Invalidate refreshToken on server
```

### Optional Enhancements

**Social Login:**
- Google OAuth
- GitHub OAuth
- Microsoft OAuth

**Email Verification:**
- Send verification link on signup
- Prevent login until verified

**Forgot Password:**
1. POST /api/auth/forgot-password { email }
2. Send reset token via email (5-minute expiry)
3. User clicks link, enters new password
4. POST /api/auth/reset-password { token, password }

**Two-Factor Authentication:**
1. TOTP (Time-based OTP)
2. Backup codes
3. Stored securely

---

## 18. ERROR HANDLING

### HTTP Status Codes

| Code | Scenario |
|------|----------|
| 200 | Success |
| 201 | Created |
| 202 | Accepted (async operation) |
| 204 | No content (delete success) |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (missing/invalid auth) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not found |
| 409 | Conflict (duplicate email, etc.) |
| 413 | Payload too large |
| 500 | Internal server error |
| 503 | Service unavailable |

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Frontend Error Handling

```typescript
// Toast Messages
"Failed to load projects. Please try again."
"You don't have permission to edit this project."
"Upload failed. File size exceeds limit."
"Server error. Please contact support."

// Retry Behavior
- Automatic retry for 5xx errors (exponential backoff)
- Manual retry button for 4xx errors
- Offline error: "No internet connection"

// User-Facing Errors
- Validation errors: Inline form messages
- 404 errors: "Page not found" modal
- Permission errors: "You don't have access"
- Network errors: "Connection lost" banner
```

---

## 19. LOADING STATES

### Loading Animations

**Skeleton Loaders**
- Dashboard stat cards: 4 skeleton cards
- Project grid: 12 skeleton tiles
- Paper list: 10 skeleton rows
- Charts: Gradient skeleton

**Spinners**
- API loading: Centered spinner (Framer Motion)
- Button loading: Inline spinner + disabled state
- Modal loading: Overlay spinner

**Streaming UI**
- Workflow execution: Real-time node updates
- Paper upload: Progress bar + file list
- AI suggestions: Typing animation while generating

**Specific Loading States**

```typescript
// Dashboard
useGetDashboardStats() // Skeleton cards
useGetAgents() // Agent skeleton
useGetRecentPapers() // Paper skeleton

// Projects
useGetProjects() // Grid skeleton (12 tiles)
useCreateProject() // Loading button + modal spinner

// Research Library
useGetPapers() // Paper list skeleton
useUploadPapers() // Upload progress bar + file list

// Workflows
useExecuteWorkflow() // Node status spinner
WebSocket updates // Real-time progress

// Paper Editor
useGetPaperEditor() // Editor skeleton
useAutoSave() // Save indicator (dot animation)

// Reviews
useGetReviews() // Review card skeleton
useAcceptReview() // Button loading state

// Knowledge Base
useGetConcepts() // Concept card skeleton
useGetKnowledgeGraph() // Graph skeleton
```

---

## 20. ENVIRONMENT VARIABLES

### Frontend Environment Variables

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Auth
NEXT_PUBLIC_AUTH_DOMAIN=researchai.auth.com
NEXT_PUBLIC_OAUTH_GOOGLE_ID=...
NEXT_PUBLIC_OAUTH_GITHUB_ID=...

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=...
NEXT_PUBLIC_SENTRY_DSN=...

# Feature Flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_WORKFLOWS=true
NEXT_PUBLIC_ENABLE_AGENTS=true

# Services
NEXT_PUBLIC_FILESIZE_LIMIT=2gb
NEXT_PUBLIC_SESSION_TIMEOUT=15m
```

---

## 21. FEATURE FLAGS

### Current Features
- Dashboard analytics ✓
- Project management ✓
- Research library ✓
- Paper editor ✓
- Agent workflows ✓
- Peer reviews ✓
- Knowledge base ✓
- Settings management ✓

### Potential Future Features

```typescript
enum FeatureFlag {
  // Collaboration
  REAL_TIME_COLLABORATION = "real_time_collab",
  COMMENTS_ON_PAPERS = "comments_papers",
  TEAM_CHAT = "team_chat",
  
  // Advanced AI
  FINE_TUNE_MODELS = "fine_tune",
  CUSTOM_AGENTS = "custom_agents",
  RAG_SEARCH = "rag_search",
  
  // Integrations
  SLACK_INTEGRATION = "slack_integration",
  GITHUB_INTEGRATION = "github_integration",
  NOTION_INTEGRATION = "notion_integration",
  
  // Export/Import
  EXPORT_TO_PDF = "export_pdf",
  EXPORT_TO_DOCX = "export_docx",
  IMPORT_FROM_ARXIV = "import_arxiv",
  
  // Analytics
  ADVANCED_ANALYTICS = "advanced_analytics",
  PREDICTION_MODELS = "predictions",
  CITATION_TRACKING = "citation_tracking",
  
  // Quality
  PLAGIARISM_CHECK = "plagiarism",
  FACT_VERIFICATION = "fact_check",
  REFERENCE_VALIDATION = "ref_validation"
}
```

Implementation: Zustand store with server-side override capability

---

## 22. RECOMMENDED BACKEND MODULES

### Core Services

1. **Authentication Service**
   - JWT validation
   - Refresh token management
   - OAuth integration
   - 2FA/TOTP
   - Password hashing (bcrypt)

2. **User Service**
   - Profile management
   - Settings persistence
   - Permission management
   - Integration management

3. **Project Service**
   - CRUD operations
   - Team member management
   - Permission enforcement
   - Status tracking

4. **Paper Service**
   - Upload handling
   - PDF parsing
   - Metadata extraction
   - Embedding generation
   - Search indexing

5. **Agent Service**
   - Agent lifecycle management
   - Workflow execution
   - State persistence
   - WebSocket broadcasting
   - Logging/metrics

6. **Knowledge Service**
   - Concept management
   - Relationship graph
   - Semantic search
   - Embedding storage

7. **Review Service**
   - Review generation (via AI)
   - Review storage
   - Scoring logic
   - Acceptance tracking

8. **File Service**
   - S3/Cloud storage integration
   - File deletion
   - Temporary file cleanup
   - CDN integration

### Infrastructure Services

9. **WebSocket Service**
   - Real-time event broadcasting
   - Connection management
   - Message queuing

10. **Cache Service**
    - Redis for session storage
    - Query result caching
    - Rate limiting

11. **Queue Service**
    - Async job processing (Bull, RabbitMQ)
    - Embedding generation jobs
    - PDF processing
    - Export generation

12. **Vector Database Service**
    - Embedding storage/retrieval
    - Semantic search
    - Similarity computation

13. **Logging Service**
    - Request logging
    - Error tracking
    - Performance monitoring

14. **Email Service**
    - Password reset emails
    - Notifications
    - Report generation

---

## 23. DEVELOPMENT ROADMAP

### Phase 1: Core Backend (Weeks 1-4)
- [ ] Set up Node.js/Express or FastAPI server
- [ ] Database schema creation (PostgreSQL)
- [ ] Authentication system (JWT + refresh)
- [ ] User management endpoints
- [ ] Project CRUD endpoints
- [ ] Error handling middleware

### Phase 2: Data Management (Weeks 5-8)
- [ ] Paper upload & PDF parsing
- [ ] File storage (S3/similar)
- [ ] Metadata extraction
- [ ] Vector embedding generation (async)
- [ ] Paper search endpoints
- [ ] Tag management

### Phase 3: Agent System (Weeks 9-12)
- [ ] Workflow engine setup
- [ ] Agent communication protocol
- [ ] WebSocket infrastructure
- [ ] Workflow execution endpoints
- [ ] Real-time streaming logs
- [ ] Agent status tracking

### Phase 4: AI Integration (Weeks 13-16)
- [ ] OpenAI/Anthropic integration
- [ ] Review generation service
- [ ] Paper improvement suggestions
- [ ] Citation generation
- [ ] Grammar checking
- [ ] Concept extraction

### Phase 5: Knowledge System (Weeks 17-20)
- [ ] Concept management CRUD
- [ ] Knowledge graph storage
- [ ] Relationship inference
- [ ] Semantic search implementation
- [ ] Knowledge graph visualization

### Phase 6: Advanced Features (Weeks 21-24)
- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Permission matrix implementation
- [ ] Integration marketplace
- [ ] Monitoring/alerting
- [ ] Performance optimization

### Phase 7: Testing & DevOps (Weeks 25-26)
- [ ] Unit tests (>80% coverage)
- [ ] Integration tests
- [ ] Load testing
- [ ] CI/CD pipeline
- [ ] Deployment automation
- [ ] Documentation

---

## 24. MISSING FRONTEND ELEMENTS

### Critical Gaps

1. **Offline Support**
   - Service worker not implemented
   - No offline-first caching
   - Consider: Workbox integration

2. **Real-time Notifications**
   - Notification system not visible
   - No toast/alert component exposed
   - Consider: React-hot-toast or Sonner

3. **Export Functionality**
   - No PDF/DOCX export buttons
   - Consider: react-pdf, docx libraries

4. **Performance Monitoring**
   - No Web Vitals tracking
   - No error boundary
   - Consider: ErrorBoundary wrapper

5. **Accessibility**
   - Limited ARIA labels
   - Some buttons may lack keyboard support
   - Consider: Comprehensive a11y audit

6. **Rate Limiting UI**
   - No user-facing rate limit feedback
   - No API rate limit display
   - Consider: Rate limit headers in responses

### Recommended Additions

```typescript
// Error Boundary
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Toast Notifications
import { Toaster } from 'sonner';

// Performance Monitoring
import { AnalyticsWrapper } from '@/components/AnalyticsWrapper';

// Offline Indicator
<OfflineIndicator />

// Loading Suspense Boundary
<Suspense fallback={<Skeleton />}>
  <AsyncComponent />
</Suspense>

// Mobile Responsive
// Sidebar collapse on mobile
// Modal optimization for small screens
// Touch-friendly button sizing
```

---

## 25. PRODUCTION CHECKLIST

### Before Backend Goes Live

- [ ] Database backups configured
- [ ] Rate limiting implemented (50 req/min per IP)
- [ ] CORS properly configured
- [ ] HTTPS enforced
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] CSRF token validation
- [ ] Authentication token expiry
- [ ] Audit logging enabled
- [ ] Error tracking (Sentry) configured
- [ ] Performance monitoring (New Relic, DataDog)
- [ ] Alert rules set up
- [ ] Disaster recovery plan documented
- [ ] Load testing completed
- [ ] Security audit performed

---

## 26. DOCUMENT METADATA

- **Created:** July 2, 2026
- **Last Updated:** July 2, 2026
- **Frontend Framework:** Next.js 16 (App Router)
- **UI Library:** shadcn/ui + Tailwind CSS
- **State Management:** Zustand (recommended) + TanStack Query
- **Total Pages:** 8
- **Total API Endpoints:** 50+
- **Total Database Tables:** 14
- **Total Components:** 30+
- **Total Pages/Routes:** 8
- **Estimated Backend Complexity:** High (multi-agent orchestration)
- **Recommended Backend Stack:** Node.js + Express OR Python + FastAPI

---

**END OF DOCUMENT**

This Frontend Integration Specification is production-ready and provides complete architectural guidance for backend development. Refer to specific sections as needed during implementation.
