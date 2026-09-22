# Enterprise Insurance Knowledge Graph + GraphRAG

## Overview

Enterprise insurance Knowledge Graph + GraphRAG prototype integrating CRM, policy, claims, billing, and document-derived evidence.

The system combines graph-based retrieval with constrained LLM generation and deterministic answering for high-risk structured facts.

## Final graph

- **255 nodes**
- **317 relationships**

Key modeled domains:

- CRM
- Policy administration
- Claims
- Billing
- Policy knowledge

Representative entities include:

`Customer`, `Account`, `Policy`, `PolicyPeriod`, `PolicyLine`, `Coverage`, `Claim`, `Incident`, `Exposure`, `Reserve`, `Payment`, `BillingAccount`, `Invoice`, `InvoiceItem`, `BillingStatement`, and `BillingAdjustment`.

## Architecture

```text
User Question
    |
    v
Type-Aware Entity Resolution
    |
    v
Adaptive Graph Traversal
    |
    v
Relevant Knowledge Subgraph
    |
    +-------------------------------+
    |                               |
    v                               v
High-risk structured facts      Synthesis query
Claim / Invoice / Billing           |
    |                               v
    |                         Qwen2.5-1.5B
    |                               |
    |                               v
    |                       Grounding validation
    |                               |
    v                               v
Deterministic answer        Answer or safe fallback
```

## Model

- `Qwen/Qwen2.5-1.5B-Instruct`

The LLM is not treated as the source of truth. The Knowledge Graph remains the authoritative source.

## Grounding strategy

During testing, the model produced plausible but unsupported statements, including:

- interpreting noisy OCR text
- normalizing ambiguous dates
- inventing policy-period dates
- changing the business meaning of existing dates
- deriving unsupported financial values

The final design therefore routes high-risk structured claim and billing facts through deterministic renderers. Generative GraphRAG is retained for synthesis-oriented questions.

## Evaluation

A curated four-query, multi-domain evaluation set covered:

1. Claim
2. Invoice
3. Policy
4. Billing statement

Results:

- **Entity Resolution Accuracy: 100% (4/4)**
- **Average Required-Fact Retrieval Recall: 100%**
- **Graph Size: 255 nodes / 317 relationships**

These results apply only to the current curated evaluation set and should not be interpreted as production-wide accuracy.

| Test | Entity correct | Facts retrieved | Facts expected | Retrieval recall | Final answer mode |
|---|---:|---:|---:|---:|---|
| Claim retrieval | Yes | 4 | 4 | 100% | Deterministic |
| Invoice retrieval | Yes | 4 | 4 | 100% | Deterministic |
| Policy retrieval | Yes | 1 | 1 | 100% | GraphRAG / LLM pass |
| Billing statement retrieval | Yes | 1 | 1 | 100% | Deterministic |

## Key finding

Reliable enterprise GraphRAG is not simply:

```text
Graph -> LLM -> Answer
```

A safer design is:

```text
Graph -> Evidence Retrieval -> Risk-Aware Answer Strategy
```

Structured, financially sensitive facts are rendered deterministically, while generative models are reserved for synthesis where their flexibility adds value.

## Artifacts

- `graphrag_evaluation.csv`
- `project_summary.json`

The full notebook and serialized graph artifact can be added separately when exported from Kaggle.
