# RAG Agent Portfolio

A hands-on portfolio of enterprise Generative AI, Retrieval-Augmented Generation (RAG), evaluation, and grounding projects.

## Featured Project

### Enterprise Insurance Knowledge Graph + GraphRAG

Built an enterprise insurance Knowledge Graph and grounded GraphRAG prototype spanning CRM, policy, claims, billing, and document-derived evidence.

**Highlights**
- 255 graph nodes
- 317 relationships
- Type-aware entity resolution
- Adaptive graph traversal
- Qwen2.5-1.5B-Instruct for synthesis
- Deterministic validation and safe fallback
- Risk-aware answer routing for structured financial and claims facts
- 100% entity resolution accuracy on a curated 4-query evaluation set
- 100% required-fact retrieval recall on the same evaluation set

The evaluation figures above apply only to the current curated test set and are not production-wide accuracy claims.

Project files:

- [Project README](projects/enterprise-insurance-graphrag/README.md)
- [Evaluation results](projects/enterprise-insurance-graphrag/graphrag_evaluation.csv)
- [Project summary](projects/enterprise-insurance-graphrag/project_summary.json)

## Architecture

```text
Enterprise Sources
      |
      v
Canonical Insurance Knowledge Graph
      |
      v
Type-Aware Entity Resolution
      |
      v
Adaptive Graph Traversal
      |
      v
Relevant Evidence Subgraph
      |
      +------------------------------+
      |                              |
      v                              v
High-Risk Structured Facts      Synthesis Questions
Claim / Invoice / Billing            |
      |                              v
      |                        Qwen2.5-1.5B
      |                              |
      |                              v
      |                      Grounding Validation
      |                              |
      v                              v
Deterministic Answer         Answer or Safe Fallback
```

## Key Design Principle

The Knowledge Graph remains the source of truth.

For structured, financially sensitive facts, the system prefers deterministic rendering. Generative answering is reserved for synthesis-oriented questions where an LLM adds value.

## Repository

More project notebooks and artifacts will be added as they are finalized.
