# Om Prakash · AI Product Portfolio

### Enterprise problems → practical AI workflows → measurable product quality

**AI product strategy · Enterprise solutioning · RAG & agents · Commercial execution**

I work at the intersection of enterprise customer problems, AI solution design and commercial strategy. My background combines consulting at Hexaware, business analysis at TCS, an MBA from IIFT Kolkata and a B.Tech in Biotechnology from NIT Calicut.

This portfolio brings together my public GitHub projects and explains the product decisions behind their technical design.

[GitHub](https://github.com/omp8595) · [LinkedIn](https://www.linkedin.com/in/om-prakash-067235104/) · [Email](mailto:omp8595@yahoo.com)

---

## Start here

| Project | Product problem | What it demonstrates |
|---|---|---|
| [Customer Support RAG Assistant](#1-customer-support-rag-assistant) | Answer questions from an enterprise knowledge base | Customer-facing LLM workflows, hybrid retrieval, streaming and API integration |
| [Enterprise Insurance GraphRAG](#2-enterprise-insurance-knowledge-graph--graphrag) | Connect fragmented customer, policy, claims and billing facts | Risk-based automation, grounded answers and scoped evaluation |
| [Regulated Life Sciences Platform](#3-regulated-life-sciences-graphrag-platform) | Retrieve evidence with governance and review controls | End-to-end workflow design, multi-tenant APIs and human review |
| [Enterprise Context Layer](#4-life-sciences-enterprise-context-layer) | Give different agents appropriate context about the same entity | Reusable platform contracts, access boundaries and agent configuration |
| [AI GTM Dashboard](#5-ai-gtm-pipeline-dashboard) | Turn inconsistent spreadsheets into a usable sales pipeline | Operational product design, data normalization and business judgment |
| [Power BI Accelerator](#7-power-bi-accelerator-for-insurance) | Accelerate insurance reporting from requirements to documented reports | AI-assisted delivery design, human accountability and pilot evidence |
| [Fantasy Sports App](#6-supporting-project-fantasy-sports-application) | Connect team selection, contests and changing match data | Consumer workflows, external APIs and deterministic automation |

## 1. Customer Support RAG Assistant

**Focus:** Support automation and knowledge-assisted conversations  
**Status:** Code prototype; no production adoption or business-impact metrics claimed.

### Problem and intended users
Support teams and customers need answers grounded in product or service documentation. A conversational interface needs to connect knowledge ingestion, retrieval and answer generation while making sources visible.

### Implemented workflow
Document ingestion and chunking → BM25 and vector retrieval → reciprocal rank fusion → context assembly → Claude response → chat interface / API.

The code includes conversation history, source metadata, an ingestion endpoint, a health endpoint and Socket.IO streaming.

### Product decisions visible in the code
- Combine lexical and vector search to cover exact terms and semantic questions.
- Prompt the assistant to cite its context and acknowledge missing information. This is a prompt instruction, not a verified guarantee against hallucination.
- Support both request-response chat and streaming interaction.
- Expose reusable ingestion and chat APIs instead of coupling retrieval to one interface.

### How I would measure success
**Proposed measures:** answer correctness, citation support, retrieval recall, escalation rate, response latency and cost per resolved conversation. These are measurement priorities, not reported results.

**Relevance to commerce:** The same pattern can support product FAQs, policy questions and customer support knowledge. Order-specific answers would additionally require authenticated commerce integrations and appropriate access controls.

**Explore:** [Agent implementation](https://github.com/omp8595/rag-agent-clean/blob/main/src/agents/ragAgent.ts) · [Hybrid retrieval](https://github.com/omp8595/rag-agent-clean/blob/main/src/rag/hybridSearch.ts) · [API and streaming](https://github.com/omp8595/rag-agent-clean/blob/main/src/api/server.ts) · [Repository](https://github.com/omp8595/rag-agent-clean)

## 2. Enterprise Insurance Knowledge Graph + GraphRAG

**Focus:** Connected enterprise data and reliable answers  
**Status:** Documented prototype with evaluation artifacts; full notebook and serialized graph are not included in the project folder.

### Problem and intended users
Insurance operations depend on facts spread across CRM, policy, claims, billing and document-derived evidence. A plausible generated answer can be harmful when the underlying question concerns financial amounts or dates.

### Solution design
Type-aware entity resolution → adaptive graph traversal → relevant evidence subgraph → risk-aware answer routing.

High-risk structured facts use deterministic rendering. Synthesis-oriented questions use Qwen2.5-1.5B-Instruct with grounding validation and safe fallback.

### Product decisions
- Treat the graph as the authoritative source.
- Use generative AI where synthesis adds value.
- Prefer deterministic answers for financially sensitive facts.
- Evaluate entity resolution and required-fact retrieval separately from general answer quality.

### Recorded evidence
- **255 graph nodes and 317 relationships**
- **4/4 correct entity resolutions**
- **100% average required-fact retrieval recall on the same four curated queries**

These are repository-reported results from a small evaluation set, not production-wide accuracy. They were not independently rerun for this portfolio.

**Explore:** [Case study](https://github.com/omp8595/rag-agent-clean/blob/main/projects/enterprise-insurance-graphrag/README.md) · [Evaluation CSV](https://github.com/omp8595/rag-agent-clean/blob/main/projects/enterprise-insurance-graphrag/graphrag_evaluation.csv) · [Project summary](https://github.com/omp8595/rag-agent-clean/blob/main/projects/enterprise-insurance-graphrag/project_summary.json)

## 3. Regulated Life Sciences GraphRAG Platform

**Focus:** Governed evidence workflows, APIs and human review  
**Status:** Technical prototype using public BRUKINSA / zanubrutinib and ALPINE evidence; not a validated production GxP system.

### Problem and intended users
Medical, commercial and regulatory users need different permissions and different evidence states. Uploading a document should not automatically make its content a validated claim or an approved promotional answer.

### Implemented workflow
Quarantined upload → security checks and extraction → tenant-scoped chunks → semantic normalization → governed retrieval → SME review → MLR review → versioned claims and audit trail.

The repository includes a FastAPI product API and a unified Gradio workspace for ingestion, queries, SME review, MLR review and governance.

### Product decisions
- Apply tenant, role, purpose, market and document-state filters before returning evidence.
- Normalize brand and molecule aliases through versioned semantic master data.
- Separate evidence discovery, SME validation and promotional approval.
- Require independent review for semantic changes.
- Record decisions in a hash-linked audit trail.

### Recorded evidence
The README reports **21/21 core governance checks**, **14/14 GraphRAG governance checks**, **221 indexed chunks**, **244 graph nodes** and **521 edges**. These are prototype checks and artifact counts, not clinical validity or regulatory certification.

### Product-management relevance
Demonstrates how a complex enterprise requirement becomes a connected product workflow across data ingestion, retrieval, APIs, reviewer roles and operating controls.

**Explore:** [Repository and quickstart](https://github.com/omp8595/regulated-life-sciences-graphrag) · [Product API](https://github.com/omp8595/regulated-life-sciences-graphrag/blob/main/product_api/README.md) · [Semantic architecture](https://github.com/omp8595/regulated-life-sciences-graphrag/blob/main/docs/semantic_layer.md) · [Unified interface](https://github.com/omp8595/regulated-life-sciences-graphrag/blob/main/product_ui.py)

## 4. Life Sciences Enterprise Context Layer

**Focus:** Reusable context infrastructure for multiple agents  
**Status:** Offline prototype with synthetic data.

### Problem
The same healthcare professional can be relevant to commercial engagement and clinical site selection. Each agent should receive only the context appropriate to its purpose.

### Implemented workflow
Synthetic source records → semantic mapping → partitioned knowledge graph → policy-scoped retrieval → audited Context Package → configured agent.

The demo shows different context packages for the same HCP under an engagement agent and a site-selection agent.

### Product decisions
- Bind purpose to the agent at publish time instead of accepting arbitrary caller overrides.
- Use a bridge whitelist to control crossings between data domains.
- Fail closed for unrecognized purposes or unauthorized roles.
- Keep a reusable Context API and MCP interface.
- Use NetworkX and per-domain TF-IDF indexes so the prototype runs locally without external infrastructure.

### Evidence and limits
Synthetic fixtures include **50 HCPs, 10 institutions, 30 content items, 100 interactions, 40 publications and 5 studies**. Repository tests cover policy, bridge and scope isolation. Its GraphRAG component is a minimal extractive stub; it is not an LLM-based community-summary engine.

**Explore:** [Repository](https://github.com/omp8595/rag-agent) · [Design document](https://github.com/omp8595/rag-agent/blob/main/docs/design.md) · [Demo](https://github.com/omp8595/rag-agent/blob/main/scripts/demo.py) · [Tests](https://github.com/omp8595/rag-agent/tree/main/tests)

## 5. AI GTM Pipeline Dashboard

**Focus:** Sales operations and decision visibility  
**Status:** Application code; no measured commercial uplift claimed.

### Problem and intended users
Sales and offering teams need a consistent pipeline view when spreadsheet headers, offering names, stages and vertical labels vary.

### Implemented workflow
Excel upload → column matching → offering and stage normalization → deal records → pipeline management → dashboard views by stage, offering and vertical.

The Next.js / TypeScript application includes dashboard, upload and pipeline pages. Parsing uses rules, Jaccard similarity and Levenshtein distance.

### Product decisions
- Solve data consistency with deterministic matching rather than introducing an LLM unnecessarily.
- Separate demand generation from demand capture.
- Keep unmatched-row counts visible in parsing logs.
- Provide an upload path and manual pipeline management.

### Next validation priorities
Measure mapping accuracy, unmatched-row frequency, silent default classifications and time saved preparing pipeline reviews. Review fallback defaults before using the parser with decision-critical data.

**Explore:** [Repository](https://github.com/omp8595/AI-GTM-DASHBOARD) · [Dashboard](https://github.com/omp8595/AI-GTM-DASHBOARD/blob/main/app/page.tsx) · [Parser](https://github.com/omp8595/AI-GTM-DASHBOARD/blob/main/app/lib/parser.ts) · [Pipeline](https://github.com/omp8595/AI-GTM-DASHBOARD/blob/main/app/pipeline/page.tsx)

## 6. Supporting Project: Fantasy Sports Application

**Focus:** Consumer product flows and integrations  
**Status:** Application code; supporting product-engineering example, not an AI project.

The repository includes authentication, team selection, contests, leaderboards, admin operations and a scoring workflow. The scheduled scoring handler integrates CricketData scorecards, calculates fantasy points and updates Firestore records and rankings.

**Why it belongs here:** It demonstrates a complete user journey, external API integration, changing data and rules-based automation. It complements the enterprise AI projects with consumer product implementation.

**Explore:** [Repository](https://github.com/omp8595/ipl-fantasy-2026) · [Team selection](https://github.com/omp8595/ipl-fantasy-2026/blob/master/src/pages/SelectTeamPage.jsx) · [Scoring integration](https://github.com/omp8595/ipl-fantasy-2026/blob/master/pages/api/cron/score-engine.js)

## 7. Power BI Accelerator for Insurance

**Focus:** AI-assisted reporting delivery and repeatable enterprise solution design  
**Status:** Offering and pilot case study documented in a supplied Hexaware presentation. Supporting Power BI model, report files and implementation code are not published in this portfolio.

### Problem and intended users
Insurance business teams need reporting that reflects domain-specific questions, while BI specialists face complex DAX, repeated review cycles and poorly documented model logic. The accelerator addresses the gap between a business requirement and a maintainable report.

### Delivery framework
The framework covers requirements gathering, semantic model design, DAX development, data preparation, report design and build, documentation, deployment and maintenance.

Humans retain responsibility for business requirements, domain context, governance, technical QA and stakeholder sign-off. AI assists with requirement documentation, gap analysis, SQL / M / DAX generation, model design, report drafts, optimization and documentation.

### Product decisions reflected in the framework
- Establish a signed-off reporting agreement covering KPIs and data requirements before the build.
- Inject insurance domain context so generated calculations reflect the intended business meaning.
- Use reusable semantic models, report baselines and documentation to reduce repeated setup.
- Keep technical review and business acceptance with accountable human owners.
- Separate the core delivery framework from optional custom capabilities such as self-service Q&A and report-usage analytics.

### Reported pilot evidence
The supplied deck describes an underwriting performance pilot with:

| Deliverable | Deck-reported result |
|---|---|
| Semantic model | 12 tables, 13 relationships, star schema and a Date table |
| Calculations | 31 DAX measures across 10 KPI groups, with inline documentation |
| Report | Three-page report canvas and technical documentation |
| Build cycle | Two working sessions from schema to report |
| First load | Zero DAX syntax errors reported |

These are presentation-reported pilot results, not an independently reproduced benchmark. Syntax validity alone does not establish calculation correctness. The deck's production productivity estimates are prospective and are not presented here as achieved outcomes.

### AI product-management relevance
This case demonstrates translating a specialist-heavy enterprise process into a repeatable AI-assisted offering: define the business agreement, allocate responsibilities between AI and humans, specify deliverables, establish acceptance criteria and distinguish core scope from optional extensions.

### Success measures for a broader rollout
**Proposed measures:** time to an accepted first report, KPI calculation accuracy, review and rework effort, model performance, documentation coverage and user adoption.

**Source:** Supplied “Power BI Accelerator for Insurance” presentation, Hexaware Technologies, 2026. This portfolio includes a written case-study summary.

---

## My approach to AI product problems

1. **Clarify the decision:** Which user needs to do what differently?
2. **Map the workflow:** Identify systems, data, exceptions and ownership.
3. **Choose the intervention:** Automate, assist or redesign the process.
4. **Define the product boundary:** Separate reusable capability from customer-specific integration.
5. **Measure quality and value:** Evaluate technical behavior alongside adoption and business impact.
6. **Keep humans accountable:** Design review and escalation where the consequences demand it.

## Portfolio scope

These case studies describe public repository code and documentation, plus a supplied Power BI accelerator presentation, reviewed in October 2026. Features described as implemented are visible in their cited repository sources; the Power BI case uses presentation-reported evidence. they have not all been executed or independently benchmarked for this portfolio. Suggested success metrics and commerce applications are explicitly prospective.

Earlier Elucidata assignment repositories are outside this curated AI PM selection; the empty Assignment repository is also omitted.

**Contact:** [omp8595@yahoo.com](mailto:omp8595@yahoo.com) · [LinkedIn](https://www.linkedin.com/in/om-prakash-067235104/)
