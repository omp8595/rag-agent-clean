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
| [Insurance Servicing Copilot](#8-insurance-servicing-copilot) | Answer customer-specific coverage questions | Enterprise case-study presentation |
| [Customer Support RAG Assistant](#1-customer-support-rag-assistant) | Answer questions from approved knowledge | Agent, retrieval and API code |
| [AI-Native Contact Center](#9-ai-native-contact-center-product-and-commercial-strategy) | Coordinate AI, systems and human intervention | Draft offering strategy and operating model |
| [Voice AI for IT Service Desks](#10-voice-ai-for-it-service-desks) | Reduce repetitive support workload | Operational examples and illustrative ROI model |
| [Insurance Quote Intake](#11-ai-assisted-insurance-quote-intake) | Extract information from broker documents | Professional experience and reported outcomes |
| [Power BI Accelerator](#7-power-bi-accelerator-for-insurance) | Accelerate reporting delivery | Framework and reported pilot evidence |
| [Enterprise Insurance GraphRAG](#2-enterprise-insurance-knowledge-graph--graphrag) | Connect customer, policy, claims and billing facts | Design and four-query evaluation artifacts |
| [Regulated Life Sciences Platform](#3-regulated-life-sciences-graphrag-platform) | Govern evidence retrieval and review | Product API, UI, policies and test artifacts |
| [Enterprise Context Layer](#4-life-sciences-enterprise-context-layer) | Give different agents appropriate context | Offline prototype, design, demo and tests |
| [AI GTM Dashboard](#5-ai-gtm-pipeline-dashboard) | Normalize spreadsheets into a sales pipeline | Next.js application and parser code |
| [Fantasy Sports App](#6-supporting-project-fantasy-sports-application) | Connect contests, teams and match data | Consumer application and integration code |
| [Additional Product & Strategy Work](#additional-product-and-strategy-experience) | Position offerings and plan enterprise transformation | Professional experience summaries |

**Evidence guide:** Repository projects link to public artifacts. Enterprise case studies summarize supplied materials. Professional experience entries describe the contribution recorded in my CV. Reported outcomes are attributed to their sources; estimates and proposed measures remain separate. Case-study inclusion does not imply sole authorship or implementation ownership.

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

## 8. Insurance Servicing Copilot

**Focus:** Customer-specific answers across documents and enterprise records  
**Evidence:** Supplied NN insurance case-study slides. The materials describe operations servicing as in production, while other slides describe the original POC. No live client deployment or source code is linked here.

### Business problem
A servicing employee needs to answer questions whose answers depend on both general policy wording and the customer's actual coverages. General document search alone cannot establish what that customer has purchased.

### Users and scope
The materials cover operations staff, servicing agents and customers, with operations prioritized. The example asks whether a customer's dog is covered while travelling.

### Solution described
An agent-centric chat interface combines static product information with dynamic policyholder and policy details retrieved through APIs. Azure OpenAI supports attention points and recommendations. The described stack includes React, Python, LangChain, a vector database and SQLite.

### Product decisions reflected in the case
- Restrict responses to the insurer's products and insurance topics.
- Apply the Belgium / European operating context.
- Combine customer policy records with retrieved document evidence.
- Specify UI, integrations, security, data protection, performance and scalability requirements.
- Include a session-end vector-data purge requirement for session-indexed content.
- Plan testing, deployment and hypercare as part of delivery.

### Business value and evidence
The slides report response-time, productivity and customer-satisfaction improvements. Measurement definitions, baselines and sample sizes are not supplied here, so this portfolio does not reproduce the percentages as independently verified results.

### Relevance to an AI PM role
Shows the need to translate an enterprise servicing question into a connected workflow spanning user experience, APIs, retrieval and privacy requirements. The same design pattern can inform commerce support that combines brand policies with authenticated customer or order records.

**Source:** Supplied NN insurance case-study presentation. This is a case-study summary, not a newly built prototype.

## 9. AI-Native Contact Center: Product and Commercial Strategy

**Focus:** Enterprise CX, workflow orchestration and commercialization  
**Evidence:** Supplied July 2025 draft offering deck. This entry describes a proposed platform and operating model.

### Business problem
The draft identifies fragmented tools, manual handoffs, after-contact work and limited automation as obstacles to efficient service. It proposes coordinating customer interactions, enterprise systems and human intervention in one workflow.

### Product concept
The offering spans voice and digital interactions, AI engagement, orchestration, knowledge retrieval, human oversight, analytics and enterprise connectors.

A proposed interaction flow identifies intent, retrieves CRM and knowledge context, invokes relevant workflows, records the outcome and transfers to a human when requested or required.

### Product decisions
- Use modular capabilities so customers can adopt selected workflows.
- Support existing contact center and CRM environments.
- Provide human monitoring, correction and warm handoffs.
- Capture resolution, escalation, latency and intervention data.
- Include PII handling, access control, audit trails and residency requirements.
- Begin with selected intents and expand based on readiness and observed performance.

### Commercial strategy
The draft considers interaction-based pricing, outcome incentives, managed human-oversight services and self-hosted licensing. Its pricing figures and retail-bank transformation scenario are illustrative commercial assumptions rather than demonstrated portfolio revenue or savings.

### Success measures
Resolution quality, first-contact resolution, customer effort, escalation rate, handling time and cost per resolved interaction. Automation should be assessed alongside repeat contacts and successful completion.

### AI PM relevance
Demonstrates how product scope connects to an operating model, integration strategy, buyer requirements and monetization.

**Source:** Supplied “AI-Native Contact Center” draft. Market statistics, autonomy percentages and competitor claims in the draft have not been independently validated for this portfolio.

## 10. Voice AI for IT Service Desks

**Focus:** Repetitive support workflows, structured intake and business cases  
**Evidence:** Supplied TensaiV presentation for IQVIA. Operational examples and future estimates are treated separately.

### Business problem
Service desks handle repeated requests such as password resets, access issues, VPN troubleshooting and ticket-status questions. These tasks compete with work requiring specialist attention.

### Solution described
Voice-led intent capture, structured authentication, guided troubleshooting, selected L1 resolution, ticket creation and escalation with conversation context.

### Product decisions
- Choose repeatable intents with clear resolution steps.
- Authenticate the user before protected lookups or actions.
- Capture the information needed for a complete ticket.
- Preserve context when handing off to an analyst.
- Define which actions can execute automatically and which need additional approval.

### Deck-reported operational evidence
The slides report approximately **30% reduction in L1 volume** and **15% productivity gains** at a global service desk after six months. They also describe client examples involving automated authentication, case creation and work-order intake. Future containment commitments are not achieved results.

### Illustrative business case
The IQVIA example assumes 10,000 tickets per month, 40% repetitive tickets and an 80% automation scenario:

| Assumption or calculation | Illustrative value |
|---|---:|
| Repetitive tickets | 4,000 per month |
| Automated tickets | 3,200 per month |
| Assumed avoided cost per ticket | $12 |
| Gross modeled cost avoidance | $38,400 per month / $460,800 per year |
| Assumed handling time recovered | 7 minutes per automated ticket |
| Modeled capacity recovery | 373 hours per month |

This is a gross opportunity model, not realized savings or net ROI. A complete business case would account for AI and integration costs, exception handling and whether recovered capacity translates into cash savings.

**Source:** Supplied TensaiV slides for IQVIA. Operational figures are presentation-reported and have not been independently reproduced.

## 11. AI-Assisted Insurance Quote Intake

**Focus:** Document intelligence and measurable workflow improvement  
**Evidence:** Professional experience recorded in my CV. No client data or deployment artifacts are published here.

### Business problem
Unstructured broker documents need to become usable quote-intake information. The solution must extract relevant fields and structure the output for the downstream process.

### My contribution
Designed and deployed a GenAI quote-intake solution, selecting document intelligence, retrieval and structured-output techniques for unstructured broker documents.

### Reported outcomes
My CV records **98% extraction accuracy**, **50% faster turnaround** and **50% productivity improvement**. The underlying measurement dataset and client verification are not public in this portfolio.

### AI PM relevance
Connects technique selection to a business workflow and measurable quality and efficiency outcomes. A transferable product design would define field schemas, validation rules, exception handling and downstream integration requirements.

## Additional Product and Strategy Experience

These summaries describe the professional contribution recorded in my CV. They complement the public implementations above.

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

## Portfolio scope

Updated October 2026. Public repository artifacts support the implementation case studies. The Power BI, NN insurance, AI-native contact center and TensaiV entries draw on supplied presentation materials. Additional professional experience draws on my CV.

No client source presentations, customer records or proprietary implementation files are published with these summaries. Repository tests and reported results have not all been independently rerun. Proposed extensions and success measures describe future validation.

Earlier Elucidata assignment repositories and the empty Assignment repository are outside this AI PM selection.

**Contact:** [omp8595@yahoo.com](mailto:omp8595@yahoo.com) · [LinkedIn](https://www.linkedin.com/in/om-prakash-067235104/) · [GitHub](https://github.com/omp8595)
