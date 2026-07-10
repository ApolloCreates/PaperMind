                 Supervisor Agent
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
 PDF Parser      Knowledge Agent   Project Agent
        │
        ▼
 Document Processor
        │
        ▼
 Embedding Generator
        │
        ▼
 Vector Store (Qdrant)
        │
        ▼
 Research Orchestrator
        │
 ┌──────┼────────┬────────┬───────────┐
 ▼      ▼        ▼        ▼           ▼
Summary Gap   Topic    Writer     Reviewer
Agent   Agent  Agent    Agent      Agent