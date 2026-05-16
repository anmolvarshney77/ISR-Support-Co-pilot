# United Rentals — AI Agent System Context

> **Version:** 1.0
> **Last Updated:** March 2026
> **Platform:** Lyzr AI Agent Studio

---

## 1. Business Overview

**United Rentals, Inc.** is the world's largest equipment rental company, operating approximately 1,181 branches across North America with the industry's largest rental fleet.

### Customer Segments

| Segment | Share |
|---|---|
| Non-residential construction | ~48% |
| Industrial / non-construction | ~47% |
| Other | ~5% |

### Equipment Categories

- **Aerial Work Platforms** — Scissor lifts (19–60 ft), boom lifts (articulating 30–80 ft, telescopic 40–185 ft)
- **Earthmoving** — Excavators (mini to 80,000 lb), skid steers, backhoe loaders, compact track loaders, wheel loaders, bulldozers
- **Air Compressors & Air Tools** — Portable compressors (185–1,600 CFM), jackhammers, breakers, sandblasters
- **Power & HVAC** — Generators (6 kW–2 MW), light towers, temporary heating/cooling
- **Trench Safety & Shoring** — Trench boxes, hydraulic shores, slide rail systems, manhole boxes
- **Material Handling** — Forklifts (5,000–36,000 lb), telehandlers (5,500–12,000 lb)
- **Pumps, Tanks & Filtration** — Submersible pumps, trash pumps, water treatment
- **General Tools** — Concrete saws, pressure washers, welders, hand tools
- **Site Infrastructure** — Storage containers, mobile offices, ground protection mats

### Key Internal Systems

| System | Purpose |
|---|---|
| **RentalMan** | Internal system for reservations, contracts, pricing, customer records, dispatch coordination |
| **Total Control** | Customer-facing fleet management portal with telematics, invoicing, and analytics |
| **United Rentals Mobile App** | Customer self-service for reservations, off-rent, invoices |
| **United Academy** | Operator certification training platform (730,000+ trained, 486+ locations) |

### Billing & Fee Structure

| Fee | Description |
|---|---|
| Equipment Rental | Daily (1x), Weekly (3x daily), Monthly (3x weekly) — rates vary by branch, season, customer tier, and contract |
| Rental Protection Plan (RPP) | Optional damage waiver at 15% of rental charges. NOT insurance. Limits liability to lesser of 10% replacement value, 10% repair costs, or $500 |
| Environmental Service Charge | Mandatory — covers compliance with federal/state environmental regulations |
| Fuel Convenience Charge | Applied when equipment returned without a full fuel tank |
| Delivery / Pickup Fees | Separate charges; vary by branch and distance |
| Cleaning Charge | Applied when equipment returned with excessive dirt, concrete, or paint |
| Damage Charges | Repair/replacement costs beyond normal wear (may be offset by RPP) |

---

## 2. Agent Architecture

The system consists of two operational agents governed by a shared Responsible AI (RAI) policy. Both agents are deployed on the **Lyzr AI Agent Studio** platform.

```
┌──────────────────────────────────────────────────────────────┐
│                      LIVE CUSTOMER CALL                      │
│                                                              │
│  Customer ←──phone──→ ISR (Inside Sales Rep)                │
│                         │                                    │
│                    [live transcript]                          │
│                         ▼                                    │
│          ┌──────────────────────────────┐                    │
│          │  Agent 1: Resolution Co-Pilot │                   │
│          │  (GPT-4o-mini, temp 0.3)      │                   │
│          │  Real-time whisper suggestions │                   │
│          └──────────────┬───────────────┘                    │
│                         │                                    │
│              [intent, sentiment, steps,                      │
│               response suggestions]                          │
│                         ▼                                    │
│              ISR Co-Pilot Dashboard                          │
└──────────────────────────────────────────────────────────────┘
                          │
                    [call ends]
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│          ┌──────────────────────────────┐                    │
│          │  Agent 2: Post-Call Processor │                    │
│          │  (GPT-4o, temp 0.2)           │                   │
│          │  Summary, action items, CRM    │                   │
│          └──────────────┬───────────────┘                    │
│                         │                                    │
│              [call summary, action items,                    │
│               customer record update,                        │
│               follow-up email]                               │
│                         ▼                                    │
│              Call History / CRM / Email                       │
└──────────────────────────────────────────────────────────────┘

Both agents are governed by:
┌──────────────────────────────────────────────────────────────┐
│          Agent 3: RAI Safety Policy                           │
│          Allowed/banned topics, PII handling,                 │
│          toxicity checks, prompt injection defense             │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Agent 1 — UR Call Resolution Co-Pilot

### Purpose

Provides real-time, actionable suggestions to Inside Sales Representatives (ISRs) **during live customer phone calls**. The agent acts as a "whisper" assistant — it never speaks to the customer directly.

### Configuration

| Parameter | Value |
|---|---|
| Agent Name | UR Call Resolution Co-Pilot |
| Model | GPT-4o-mini |
| Temperature | 0.3 |
| Top-P | 0.9 |
| Role | Real-Time Customer Success Co-Pilot for Inside Sales Representatives |

### Features

| Feature | Enabled |
|---|---|
| Knowledge Base | Yes |
| Short-Term Memory | Yes |
| Long-Term Memory | No |
| Humanizer | Yes |
| Reflection | Yes |
| Toxicity Check | Yes |
| Fairness & Bias | Yes |

### Tools

1. **Perplexity AI** — External search for supplementary information
2. **Knowledge Base Search** — RAG retrieval over the 7-document United Rentals knowledge base

### Knowledge Base Configuration

| Setting | Value |
|---|---|
| Vector Store | Weaviate |
| Embedding Model | text-embedding-3-large |
| Retrieval Type | MMR (Maximal Marginal Relevance) |
| Top K | 5 |
| Score Threshold | 0.7 |

### Supported Intents

The agent classifies each transcript segment into one of these intents:

| Intent | Description |
|---|---|
| `new_reservation` | Customer wants to rent new equipment |
| `existing_reservation` | Questions about an active reservation |
| `quote` | Customer requesting a price quote |
| `off_rent` | Customer wants to return/schedule pickup of equipment |
| `rental_extension` | Customer wants to extend an active rental |
| `branch_transfer` | Equipment transfer between branches |
| `billing_inquiry` | Questions about invoices, charges, or payments |
| `invoice_dispute` | Customer disputing specific charges |
| `rpp_question` | Questions about Rental Protection Plan |
| `delivery_scheduling` | Delivery coordination |
| `pickup_request` | Equipment pickup scheduling |
| `equipment_swap` | Replacing faulty equipment with a working unit |
| `field_service` | On-site repair request |
| `equipment_troubleshooting` | Equipment malfunction diagnosis |
| `operator_certification` | United Academy training inquiries |
| `account_setup` | New customer account creation |
| `credit_application` | Credit application processing |
| `total_control_support` | Digital platform support |
| `merchandise_purchase` | Purchase of merchandise/consumables |
| `contract_inquiry` | Contract terms questions |
| `general_inquiry` | Catch-all for other UR business topics |

### Sentiment Detection

The agent evaluates customer sentiment on each exchange:

`positive` | `neutral` | `concerned` | `frustrated` | `urgent` | `angry`

### Escalation Triggers

The agent flags escalation when:

- Equipment malfunction causing project downtime → Field Service Dispatch
- Charge disputes exceeding $5,000 or contract pricing questions → Billing Specialist / National Accounts
- Customer requests to speak with a manager → Branch Manager (honor immediately)
- Customer mentions competitor quote with signal of switching → Branch Manager (retention risk)
- Equipment arrived damaged or unsafe → Field Service + Branch Manager
- Contract or credit exceptions needed → Branch Manager
- National account with multi-branch coordination → National Accounts Team

### Response Format

The agent returns a structured JSON object containing:

```json
{
  "off_topic": false,
  "intent_detected": "new_reservation",
  "confidence": 0.92,
  "customer_sentiment": "neutral",
  "sentiment_cues": "Customer is straightforward and business-like",
  "suggested_response": "...",
  "de_escalation_tip": null,
  "resolution_steps": [
    {
      "step": 1,
      "action": "...",
      "detail": "...",
      "system_reference": "RentalMan"
    }
  ],
  "knowledge_references": [
    {
      "title": "...",
      "relevant_excerpt": "..."
    }
  ],
  "equipment_info": {
    "mentioned": ["26ft Scissor Lift"],
    "specs_available": true,
    "certification_required": "Aerial Boom Lift & Scissor Lift",
    "accessories_to_suggest": ["Harness & lanyard"]
  },
  "escalation": {
    "needed": false,
    "reason": "",
    "escalate_to": null
  },
  "cross_sell_opportunity": "...",
  "next_best_action": "..."
}
```

---

## 4. Agent 2 — UR Post-Call Processor

### Purpose

Processes the full call transcript after the call ends. Generates a structured call summary, extracts action items, defines follow-up next steps, assesses customer health, and updates the customer record in the CRM.

### Configuration

| Parameter | Value |
|---|---|
| Agent Name | UR Post-Call Processor |
| Model | GPT-4o |
| Temperature | 0.2 |
| Top-P | 0.85 |
| Role | Post-Call Analysis and Customer Record Management Agent |

### Features

| Feature | Enabled |
|---|---|
| Knowledge Base | Yes |
| Short-Term Memory | No |
| Long-Term Memory | No |
| Reflection | Yes |
| Toxicity Check | Yes |

### Tools

1. **Customer Record Update (Custom OpenAPI)** — Updates customer records via the CRM API
2. **Gmail** — Sends follow-up emails to customers and internal stakeholders
3. **Knowledge Base Search** — RAG retrieval over the knowledge base

### Call Categories

The agent classifies calls into categories that match ISR daily workflows:

- `new_reservation` — New equipment rental booking
- `existing_reservation` — Modification to active reservation
- `off_rent` — Equipment return / pickup scheduling
- `invoice_dispute` — Billing dispute resolution
- `equipment_troubleshooting` — Equipment malfunction handling
- `operator_certification` — United Academy training
- `account_setup` — New account creation
- `billing_inquiry` — General billing questions
- `delivery_scheduling` — Delivery coordination
- `general_inquiry` — Other business inquiries

### Action Item Extraction Rules

Every verbal commitment by the ISR becomes a tracked action item:

- "I'll email you a quote" → Action item, owner: ISR, deadline: today
- "Let me check on that" → Action item, owner: ISR, deadline: same-day
- "I'll get back to you" → Action item with specific follow-up timeline
- Implicit items: if customer mentions an upcoming project start date, the agent suggests a proactive follow-up before that date

Each action item includes: `id`, `action`, `owner`, `priority`, `deadline`, `status`, `notes`

### Customer Health Assessment

The agent evaluates retention risk using these signals:

| Signal | Risk Level |
|---|---|
| Frustrated sentiment + unresolved issue | Medium–High |
| Mentions competitors (Sunbelt, Herc, BlueLine) | Medium–High |
| Repeated calls about the same problem | High |
| National account with upcoming rate review | Medium |
| Equipment failure causing project downtime | Low–Medium |
| Positive sentiment, issue resolved on call | None |

### Response Format

```json
{
  "call_summary": {
    "call_id": "CALL-YYYYMMDD-XXXX",
    "call_date": "ISO-8601",
    "call_duration_estimate": "X minutes",
    "call_category": "...",
    "subcategory": "...",
    "customer_name": "...",
    "customer_account": "UR-XXXXX",
    "isr_name": "...",
    "branch": "..."
  },
  "summary": "Concise call narrative...",
  "key_topics": ["topic1", "topic2"],
  "equipment_discussed": [...],
  "action_items": [...],
  "next_steps": [...],
  "customer_health": {
    "sentiment": "satisfied|neutral|concerned|frustrated|angry|at_risk",
    "sentiment_triggers": [...],
    "retention_risk": "none|low|medium|high",
    "retention_risk_reason": "...",
    "expansion_opportunity": "...",
    "nps_estimate": "1-10"
  },
  "billing_details": {...},
  "customer_record_update": {
    "should_update": true,
    "fields_to_update": {...}
  },
  "follow_up_required": true,
  "follow_up_details": "...",
  "internal_notes": "..."
}
```

---

## 5. Agent 3 — RAI Safety Policy

### Purpose

Governance layer that constrains both operational agents to safe, accurate, and compliant behavior. This is not a standalone agent — it is a policy configuration applied to Agents 1 and 2.

### Allowed Topics

- Equipment rental reservations and quotes
- Equipment specifications and availability
- Billing, invoicing, RPP, and charges
- Equipment troubleshooting and service
- Delivery and pickup scheduling
- Customer account management
- Jobsite management
- Branch operations and transfers
- Operator certification and United Academy training
- Total Control platform support
- Rental Protection Plan
- Off-rent and equipment return
- Credit applications and payment terms
- Equipment swap and field service
- National accounts and contract management
- Worksite Performance Solutions

### Banned Topics

- Politics and elections
- Religion and religious beliefs
- Personal medical advice
- Legal counsel or legal opinions
- Investment or financial advice
- Competitor internal operations
- United Rentals employee salaries or HR matters
- Internal profit margins or cost structures
- Personal relationship advice
- Sports, entertainment, or pop culture
- Weather and general chit-chat
- Topics unrelated to equipment rental or United Rentals business

### Banned Keywords

Phrases that must never appear in agent output:

- "guaranteed lowest price"
- "we promise you will never"
- "Sunbelt is worse" / "Herc is terrible" / "BlueLine can't compete"
- "off the record" / "between you and me"
- "don't tell my manager"
- "I'll waive all charges" / "free rental"

### Safety Checks

| Check | Enabled | Threshold |
|---|---|---|
| Toxicity Detection | Yes | 0.7 |
| Prompt Injection Defense | Yes | 0.8 |
| Secrets Detection | Yes | Action: mask |

### PII Handling

| PII Type | Action |
|---|---|
| Credit card numbers | Mask |
| SSN | Mask |
| Email addresses | Allow (needed for follow-up) |
| Phone numbers | Allow (needed for callbacks) |
| Account numbers | Redact → `[ACCOUNT-REDACTED]` |

### RAI Facts (Hard-Coded Business Rules)

These rules override any knowledge base content:

1. **Pricing Accuracy** — Never quote specific rental rates. Rates vary by branch, season, customer tier, and contract terms. Always verify in RentalMan first.

2. **Availability Accuracy** — Never confirm equipment availability. Fleet allocation changes constantly across 1,181 branches. Always check RentalMan in real-time.

3. **RPP Accuracy** — RPP costs 15% of rental charges. It is NOT insurance. Liability limited to lesser of 10% replacement value, 10% repair costs, or $500. Does NOT cover tire damage from blowouts/punctures (except vehicles rented ≤60 days) or intentional abuse/misuse.

4. **Commitment Tracking** — Every verbal commitment by the ISR must be captured as a tracked action item with a specific deadline.

5. **Scope Restriction** — Only respond to United Rentals business topics. Refuse off-topic queries with a clear indicator.

6. **Competitor Neutrality** — Never disparage competitors. If a customer mentions a competitor, focus on UR value: largest fleet, 1,181+ branches, 375,000+ telematics units, Total Control platform, United Academy.

7. **Charge Transparency** — Explain all charges accurately. Environmental Service Charge is mandatory. Fuel Convenience Charge applies only for non-full tanks. Never suggest waiving mandatory charges without branch manager approval.

---

## 6. Knowledge Base

The knowledge base consists of 7 markdown documents covering the full scope of United Rentals ISR operations. These documents are indexed in a Weaviate vector store using `text-embedding-3-large` embeddings and retrieved via MMR with a top-k of 5 and a 0.7 score threshold.

### Document Inventory

| Document | File | Scope | Approximate Size |
|---|---|---|---|
| Billing, Fees & RPP | `kb-billing-fees-rpp.md` | Invoice components, RPP coverage/exclusions, environmental charges, fuel charges, cleaning charges, rate tiers, billing disputes | ~409 lines |
| Customer Account Management | `kb-customer-account-management.md` | New account setup (walk-in, call-in, online), credit applications, authorized users, jobsite management, Total Control, UR Mobile App | ~408 lines |
| Equipment Catalog | `kb-equipment-catalog.md` | Full equipment directory with specs (aerial, earthmoving, compressors, power, trench safety, material handling, pumps, general tools, site infrastructure) | ~403 lines |
| Policies, Terms & Conditions | `kb-policies-terms-conditions.md` | Rental period definitions, billing cycles, customer obligations, damage policies, insurance requirements, return standards, dispute resolution | ~476 lines |
| Rental Procedures | `kb-rental-procedures.md` | Rental lifecycle (inquiry → close), reservation channels, quoting, contract creation, delivery/pickup, off-rent, extensions, branch transfers | ~405 lines |
| Service & Troubleshooting | `kb-service-troubleshooting.md` | Troubleshooting philosophy, universal diagnostic checklist, category-specific troubleshooting (aerial, earthmoving, power, compressors), field service dispatch, equipment swaps, escalation | ~463 lines |
| United Academy Training | `kb-united-academy-training.md` | Training program overview, course catalog (aerial 4hrs, forklift 3hrs, excavator 5hrs, skid steer 3hrs), certification validity, scheduling, pricing, group bookings, renewal process | ~534 lines |

### Retrieval Strategy

- **MMR (Maximal Marginal Relevance)** — Balances relevance with diversity to avoid returning redundant chunks from the same section
- **Top K = 5** — Returns up to 5 relevant chunks per query
- **Score Threshold = 0.7** — Filters out low-relevance results to reduce hallucination risk

---

## 7. Tools & Integrations

### Agent 1 Tools (Resolution Co-Pilot)

| Tool | Type | Purpose |
|---|---|---|
| Knowledge Base Search | RAG | Retrieves relevant policy, procedure, and equipment information from the 7-document knowledge base |
| Perplexity AI | External Search | Supplements knowledge base for edge-case queries (e.g., OSHA regulation lookups, industry standards) |

### Agent 2 Tools (Post-Call Processor)

| Tool | Type | Purpose |
|---|---|---|
| Knowledge Base Search | RAG | Cross-references call content against UR policies for accuracy validation |
| Customer Record Update | Custom OpenAPI | Updates customer records in the CRM after each call (last contact date, contact reason, summary, equipment of interest, follow-up dates) |
| Gmail | Email | Sends follow-up emails — confirmation to customers, internal action item notifications to ISRs and managers |

### Customer Record API

The Customer Record Update tool exposes a REST API (OpenAPI spec at `public/openapi-customer-records.json`) with the following capabilities:

- **GET** `/api/customer-records?account_id={id}` — Retrieve customer record
- **POST** `/api/customer-records` — Create a new customer record
- **PATCH** `/api/customer-records` — Update fields on an existing customer record

Update fields include:
- `last_contact_date`, `last_contact_reason`, `last_contact_summary`
- `notes_to_add`
- `equipment_of_interest`
- `status_change`
- `new_jobsite`
- `call_id`, `follow_up_date`

---

## 8. Application Architecture

### Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5.7 |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (New York style) + Radix UI |
| Language | TypeScript (strict mode) |
| Deployment | Vercel (region: iad1) |
| AI Platform | Lyzr AI Agent Studio |
| API | Lyzr Inference Chat API (`agent-prod.studio.lyzr.ai/v3/inference/chat/`) |

### Application Pages

| Route | Description |
|---|---|
| `/` | Main co-pilot interface — live call view with real-time transcript feed, AI suggestions panel, and call controls |
| `/call-history` | Call history dashboard — browse past calls with summaries, action items, and customer health indicators |

### Key UI Components

| Component | Location | Purpose |
|---|---|---|
| `TranscriptFeed` | `src/components/copilot/` | Displays real-time call transcript with speaker labels |
| `SuggestionsPanel` | `src/components/copilot/` | Shows AI-generated suggestions, resolution steps, and equipment info |
| `CallControls` | `src/components/copilot/` | Start/stop call, mute, end call actions |
| `CallHistoryList` | `src/components/call-history/` | Paginated list of past calls with summaries |
| `AppSidebar` | `src/components/` | Navigation sidebar |

### Data Flow

```
1. ISR starts a call → CallControls triggers voice capture
2. Voice is transcribed in real-time → TranscriptFeed displays entries
3. Transcript segments are sent to Agent 1 (Resolution Co-Pilot)
4. Agent 1 returns structured suggestions → SuggestionsPanel renders them
5. ISR uses suggestions to guide the conversation
6. Call ends → Full transcript is sent to Agent 2 (Post-Call Processor)
7. Agent 2 generates call summary, action items, and customer health
8. Agent 2 updates customer record via CRM API
9. Agent 2 sends follow-up emails via Gmail
10. Call record is stored and displayed in Call History
```

---

## 9. Tone & Communication Guidelines

### ISR Co-Pilot Tone (Agent 1 Output)

- **Professional but warm** — ISRs are consultants, not order-takers
- **Active voice** — "I'll get that scheduled for you" not "That can be scheduled"
- **Acknowledge before solving** — "I understand the urgency with your project timeline. Let me..." not "Here's what you need to do."
- **Empathy for frustrated customers** — Lead with validation, then pivot to resolution
- **Translate jargon** — "RPP" → "our equipment protection plan", "off-rent" → "schedule a pickup"

### What the Agents Must Never Do

- Quote specific rental rates without RentalMan verification
- Guarantee delivery windows without dispatch confirmation
- Waive RPP or environmental charges without branch manager approval
- Make commitments about insurance or liability claims
- Respond to topics outside United Rentals business
- Discuss competitor pricing, make competitive claims, or disparage competitors
- Share internal margin, cost, or employee information
- Fabricate equipment specs, rates, or availability
- Include PII (SSN, full credit card numbers) in summaries
- Skip action items, even minor ones

---

## 10. Agent IDs & API Configuration

### Lyzr API Endpoint

```
POST https://agent-prod.studio.lyzr.ai/v3/inference/chat/
```

### Request Headers

```
Content-Type: application/json
x-api-key: <API_KEY>
```

### Request Body

```json
{
  "message": "<transcript or prompt>",
  "session_id": "<unique session ID>",
  "user_id": "<user email>",
  "agent_id": "<agent ID from Lyzr Studio>"
}
```

### Agent ID Placeholders

| Agent | Constant | Value |
|---|---|---|
| Resolution Co-Pilot | `RESOLUTION_AGENT_ID` | To be configured after agent creation in Lyzr Studio |
| Post-Call Processor | `SUMMARY_AGENT_ID` | To be configured after agent creation in Lyzr Studio |

Update agent IDs in `src/lib/ur-agents.ts` after creating the agents in Lyzr AI Agent Studio.

---

## 11. Setup Checklist

1. **Create Agent 1** in Lyzr Studio using `lyzr-agents/01-resolution-agent.json`
   - Upload all 7 knowledge base documents
   - Configure Weaviate vector store with `text-embedding-3-large` embeddings
   - Enable Perplexity AI tool
   - Apply RAI policy from `lyzr-agents/03-rai-policy.json`

2. **Create Agent 2** in Lyzr Studio using `lyzr-agents/02-post-call-summary-agent.json`
   - Upload the same 7 knowledge base documents
   - Configure Customer Record Update tool with OpenAPI spec (`public/openapi-customer-records.json`)
   - Configure Gmail integration for follow-up emails
   - Apply RAI policy from `lyzr-agents/03-rai-policy.json`

3. **Update Agent IDs** in `src/lib/ur-agents.ts`:
   - Replace `PLACEHOLDER_RESOLUTION_AGENT_ID` with Agent 1's ID
   - Replace `PLACEHOLDER_SUMMARY_AGENT_ID` with Agent 2's ID

4. **Deploy the application** — `npm run build && vercel deploy`

5. **Test the workflow**:
   - Start a simulated call on `/`
   - Verify Agent 1 returns structured suggestions in the SuggestionsPanel
   - End the call and verify Agent 2 generates a summary in Call History
   - Verify customer record updates via the API

---

## 12. Demo Data

The application includes 4 pre-built demo call records in `src/lib/ur-agents.ts` covering representative scenarios:

| Call ID | Category | Customer | Scenario | Sentiment |
|---|---|---|---|---|
| CALL-20260310-4821 | New Reservation | Marcus Rivera | 26ft scissor lift reservation, RPP discussion, delivery scheduling | Satisfied |
| CALL-20260309-7734 | Invoice Dispute | Jennifer Park | Environmental charge dispute, national account, escalated to manager | Frustrated |
| CALL-20260308-2156 | Off-Rent | David Chen | Skid steer pickup scheduling, fuel charge reminder | Satisfied |
| CALL-20260307-9903 | Equipment Troubleshooting | Marcus Rivera | Boom lift hydraulic leak, field service dispatch, swap offered | Concerned |
