# Om Prakash · AI Product Portfolio

### Enterprise AI solutioning, product strategy and commercial execution

**AI product strategy · Enterprise solutioning · RAG & agents · Commercial execution**

I work at the intersection of enterprise customer problems, AI solution design and commercial strategy. My background combines consulting at Hexaware, business analysis at TCS, an MBA from IIFT Kolkata and a B.Tech in Biotechnology from NIT Calicut.

This portfolio brings together public GitHub implementations, professional product-strategy experience and selected enterprise case studies. Each entry explains the business problem, solution scope, product decisions and available evidence.

[GitHub](https://github.com/omp8595) · [LinkedIn](https://www.linkedin.com/in/om-prakash-067235104/) · [Email](mailto:omp8595@yahoo.com)

---

## Start here

**For enterprise AI PM roles:** start with the insurance servicing copilot, customer support RAG assistant and AI-native contact center strategy. Together they cover customer problems, connected data, workflow design and commercial thinking.

| Project | Business problem | Portfolio evidence |
|---|---|---|
| [Insurance Servicing Copilot](#8-insurance-servicing-copilot) | Answer customer-specific coverage questions | Solution strategy and servicing workflow |
| [Customer Support RAG Assistant](#1-customer-support-rag-assistant) | Answer questions from approved knowledge | Agent, retrieval and API code |
| [AI-Native Contact Center](#9-ai-native-contact-center-product-and-commercial-strategy) | Coordinate AI, systems and human intervention | Product strategy, operating model and pricing |
| [Voice AI for IT Service Desks](#10-voice-ai-for-it-service-desks) | Reduce repetitive support workload | Use-case strategy and business-case modeling |
| [Insurance Quote Intake](#11-ai-assisted-insurance-quote-intake) | Extract information from broker documents | Delivered solution and business outcomes |
| [Power BI Accelerator](#7-power-bi-accelerator-for-insurance) | Accelerate reporting delivery | Delivery framework and pilot results |
| [Enterprise Insurance GraphRAG](#2-enterprise-insurance-knowledge-graph--graphrag) | Connect customer, policy, claims and billing facts | Design and four-query evaluation artifacts |
| [Regulated Life Sciences Platform](#3-regulated-life-sciences-graphrag-platform) | Govern evidence retrieval and review | Product API, UI, policies and test artifacts |
| [Enterprise Context Layer](#4-life-sciences-enterprise-context-layer) | Give different agents appropriate context | Offline prototype, design, demo and tests |
| [AI GTM Dashboard](#5-ai-gtm-pipeline-dashboard) | Normalize spreadsheets into a sales pipeline | Next.js application and parser code |
| [Fantasy Sports App](#6-supporting-project-fantasy-sports-application) | Connect contests, teams and match data | Consumer application and integration code |
| [Additional Product & Strategy Work](#additional-product-and-strategy-experience) | Position offerings and plan enterprise transformation | Product positioning, roadmaps and commercialization |

**Portfolio guide:** Explore my hands-on implementations, enterprise solution designs and product strategy work. Each case explains the problem, my contribution and the outcome. Pilot results and projected business benefits are labeled where applicable.

## 1. Customer Support RAG Assistant

**Focus:** Support automation and knowledge-assisted conversations  
**Stage:** Working-code prototype.

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
**Stage:** GraphRAG prototype with design and evaluation artifacts.

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

Evaluation scope: four curated queries across claims, invoices, policies and billing statements.

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
Prototype validation: **21/21 core governance checks**, **14/14 GraphRAG governance checks**, **221 indexed chunks**, **244 graph nodes** and **521 edges**.

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
**Stage:** Application implementation.

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
**Stage:** Consumer application implementation.

The repository includes authentication, team selection, contests, leaderboards, admin operations and a scoring workflow. The scheduled scoring handler integrates CricketData scorecards, calculates fantasy points and updates Firestore records and rankings.

**Why it belongs here:** It demonstrates a complete user journey, external API integration, changing data and rules-based automation. It complements the enterprise AI projects with consumer product implementation.

**Explore:** [Repository](https://github.com/omp8595/ipl-fantasy-2026) · [Team selection](https://github.com/omp8595/ipl-fantasy-2026/blob/master/src/pages/SelectTeamPage.jsx) · [Scoring integration](https://github.com/omp8595/ipl-fantasy-2026/blob/master/pages/api/cron/score-engine.js)

## 7. Power BI Accelerator for Insurance

**Focus:** AI-assisted delivery, insurance analytics and repeatable solution design  
**Stage:** Delivery framework with an underwriting reporting pilot.

### Business problem
Insurance reporting depends on specialists who can translate business requirements into semantic models and complex DAX. Slow first drafts, repeated rework and undocumented model logic increase delivery effort.

### My contribution
I developed the accelerator's delivery framework and value proposition, mapping how AI can assist requirements documentation, data preparation, semantic modeling, DAX authoring, report design and documentation. I defined the responsibilities retained by humans, including domain context, governance, technical QA and stakeholder acceptance.

### Product decisions
- Establish a reporting agreement covering KPIs and data requirements before building.
- Inject insurance domain context into the development workflow.
- Reuse semantic-model and report baselines.
- Include documentation and performance review in the delivery process.
- Treat self-service Q&A and report-usage analytics as optional extensions.

### Pilot results
The underwriting pilot produced:

| Deliverable | Result |
|---|---|
| Semantic model | 12 tables, 13 relationships, star schema and a Date table |
| Calculations | 31 DAX measures across 10 KPI groups, documented inline |
| Report | Three-page report canvas with technical documentation |
| Build cycle | Two working sessions from schema to report |
| First load | Zero DAX syntax errors |

These results describe the pilot. Broader rollout success should track calculation correctness, review effort, delivery time, report performance and adoption.

## 8. Insurance Servicing Copilot

**Focus:** Customer-specific answers across policy documents and enterprise records  
**Stage:** Enterprise solution case, with operations servicing deployed.

### Business problem
Servicing employees need to answer coverage questions using both general policy wording and the customer's selected coverages. Searching a document alone cannot establish whether a particular customer is covered.

### My contribution
I shaped the solution requirements and servicing workflow around combining static product knowledge with dynamic policyholder and policy information. I defined the scope across operations, agents and customers, with operations as the priority audience, and translated the need into requirements for the interface, integrations and data handling.

### Solution
An agent-centric chat interface combines retrieved policy knowledge with customer-specific information supplied through APIs. Azure OpenAI supports attention points and recommendations. The solution stack includes React, Python, LangChain, a vector database and SQLite.

### Product decisions
- Keep answers within the insurer's products and insurance topics.
- Apply the relevant Belgium / European context.
- Combine actual customer policy records with policy wording.
- Include data protection, performance and scalability requirements.
- Define session-end purging for session-indexed vector data.
- Include testing, deployment and hypercare in the delivery plan.

### Business value
The solution supports faster servicing responses, improved productivity and customer satisfaction. The core product pattern is reusable: connect general knowledge with customer-specific records to produce contextual answers.

**Example:** “Is my dog covered while travelling?” requires the customer's selected coverage and the applicable territorial conditions, rather than a generic answer about pets.

## 9. AI-Native Contact Center: Product and Commercial Strategy

**Focus:** Enterprise CX, workflow orchestration and commercialization  
**Stage:** Offering design and target operating model.

### Business problem
Fragmented tools, manual handoffs and after-contact work increase service effort. Enterprise buyers need automation that integrates with their existing systems and preserves effective human intervention.

### My contribution
I developed the offering strategy across interaction channels, AI engagement, orchestration, knowledge retrieval, human oversight and analytics. I connected the product architecture to buyer needs, an operating model, a phased adoption approach and commercial pricing options.

### Solution design
The interaction workflow identifies intent, retrieves CRM and knowledge context, invokes the relevant workflow, records the outcome and transfers to a human when requested or required.

### Product decisions
- Offer modular capabilities for selected customer workflows.
- Integrate with existing contact center and CRM environments.
- Provide monitoring, correction and warm handoffs.
- Track resolution, escalation, latency and intervention.
- Address PII handling, permissions, auditability and data residency.
- Sequence adoption around data readiness and workflow performance.

### Commercial strategy
I structured pricing options around AI interactions, outcome incentives, managed human-oversight services and self-hosted licensing. I also developed an illustrative transformation business case to connect automation, operating costs and customer-experience outcomes.

### Success measures
Resolution quality, first-contact resolution, customer effort, repeat contacts, handling time and cost per resolved interaction.

## 10. Voice AI for IT Service Desks

**Focus:** Repetitive support workflows, structured intake and business cases  
**Stage:** Enterprise use-case and commercial solutioning.

### Business problem
Repeated password resets, access issues, VPN questions and ticket-status requests consume analyst capacity and interrupt specialist work.

### My contribution
I developed the IT service-desk use-case narrative and business case for Voice AI, connecting intent capture, authentication, guided resolution and contextual escalation to operational value. I translated operational reference cases into a quantified opportunity model for an enterprise service desk.

### Solution design
Voice-led intent capture, structured authentication, guided troubleshooting, selected L1 resolution, complete ticket creation and escalation with conversation context.

### Product decisions
- Prioritize repeatable intents with clear resolution steps.
- Authenticate before protected lookups or actions.
- Capture complete information for unresolved tickets.
- Preserve context during analyst handoff.
- Specify action permissions and approval requirements.

### Operational reference outcomes
The global service-desk reference case achieved approximately **30% reduction in L1 volume** and **15% productivity gains** after six months. I used these reference outcomes to support the value proposition and rollout discussion.

### Business case I developed
For an illustrative enterprise service desk with 10,000 monthly tickets, I modeled 40% repetitive demand and 80% automation of that segment.

| Assumption or calculation | Modeled value |
|---|---:|
| Repetitive tickets | 4,000 per month |
| Automated tickets | 3,200 per month |
| Avoided handling cost assumed | $12 per ticket |
| Gross potential cost avoidance | $38,400 per month / $460,800 per year |
| Handling time recovered assumed | 7 minutes per automated ticket |
| Potential capacity recovery | 373 hours per month |

These are projected benefits before AI, integration and ongoing operating costs. The model distinguishes recovered capacity from cash savings.

## 11. AI-Assisted Insurance Quote Intake

**Focus:** Document intelligence and workflow improvement  
**Stage:** Delivered enterprise solution.

### Business problem
Unstructured broker documents need to become usable quote-intake information for downstream processing.

### My contribution
I designed and deployed a GenAI quote-intake solution, selecting document intelligence, retrieval and structured-output techniques for unstructured broker documents.

### Outcomes
- **98% extraction accuracy**
- **50% faster turnaround**
- **50% productivity improvement**

### Product judgment
I selected techniques around the intake workflow and the need for structured information. The solution connects extraction quality to business turnaround and productivity.

## Additional Product and Strategy Experience

My broader work covers product positioning, use-case prioritization, commercialization and enterprise transformation.

| Project | My contribution | Product or business decision |
|---|---|---|
| AgentVerse | Translated client pain points, market trends and 60+ competitor offerings into product strategy, buy-vs-build positioning, pricing and a repeatable commercial model | Decide how to package, differentiate and commercialize enterprise agent capabilities |
| Fiducia: Private Equity Investment Intelligence | Defined positioning and GTM strategy covering mandate-led sourcing, screening, analysis and explainable decision support | Align agent workflows to an investment team's decision process |
| Digital Client Onboarding | Positioned a wealth onboarding offering combining document processing, KYC / AML controls, orchestration and exception routing | Define the path to straight-through processing and the cases needing review |
| M&A Due-Diligence Solution | Defined extraction, cross-document reconciliation, risk identification and human-review scope, with quality criteria | Establish what constitutes supported evidence and acceptable output |
| Wealth Analytics Platform | Led product strategy across portfolio insights, reporting, personalization and compliance, with use-case sequencing around critical data elements | Connect the roadmap to data readiness, adoption and value |
| BioMirror | Drove strategy and commercialization for contactless health screening using rPPG / rBCG, with privacy, on-device AI and enterprise integration considerations | Shape deployment fit and the commercial proposition |
| UK Insurer Transformation | Structured priorities across underwriting, claims and contact center, shaping a target operating model and three-year roadmap | Connect use cases to business value, ownership and responsible AI |
| AI Asset Commercialization for a Storage / Semiconductor Manufacturer | Assessed desirability, viability and feasibility, with Go / Incubate / No-Go decisions and a four-week proof-of-value roadmap | Decide which capabilities merit further product investment |

**Professional foundation:** Consultant, AI Strategy & GTM at Hexaware Technologies (May 2023–present), following business analysis at TCS (January 2018–September 2021). MBA, IIFT Kolkata; B.Tech Biotechnology, NIT Calicut.

---

## My approach to AI product problems

1. **Clarify the decision:** Which user needs to do what differently?
2. **Map the workflow:** Identify systems, data, exceptions and ownership.
3. **Choose the intervention:** Automate, assist or redesign the process.
4. **Define the product boundary:** Separate reusable capability from customer-specific integration.
5. **Measure quality and value:** Evaluate technical behavior alongside adoption and business impact.
6. **Keep humans accountable:** Design review and escalation where the consequences demand it.

## About this portfolio

My work spans hands-on prototypes, enterprise solutioning, offering strategy and delivered client solutions. Project stages are identified in each case. Evaluation results apply to their stated test scope, and modeled benefits are labeled as projections.

**Contact:** [omp8595@yahoo.com](mailto:omp8595@yahoo.com) · [LinkedIn](https://www.linkedin.com/in/om-prakash-067235104/) · [GitHub](https://github.com/omp8595)
