# Resolution Agent — Output Specification

> **Agent ID:** 69b1911c864a3af62e527787  
> **Purpose:** The app displays exactly two things from every response: **(1) Response suggestion** (what the ISR should say) and **(2) Insights** (intent, sentiment, steps, escalation, etc.). The agent **must** return a single JSON object that includes both.

---

## Required Response Format

Every response from the Resolution Agent must be **valid JSON** (no markdown code fences, no leading/trailing text). The front end parses this object and shows:

| Field | Used for | Required |
|-------|----------|----------|
| **suggested_response** (or **whisper_response**) | **Response suggestion** — exact words the ISR can say to the customer | Yes (when not off_topic) |
| **intent_detected** | Insights: call type | Yes |
| **customer_sentiment** | Insights: sentiment badge | Yes |
| **confidence** | Insights: confidence % | Optional |
| **sentiment_cues** | Insights: why this sentiment | Optional |
| **de_escalation_tip** | Insights: tip when customer is upset | Optional |
| **resolution_steps** | Insights: step-by-step actions | Optional |
| **knowledge_references** | Insights: policy/source excerpts | Optional |
| **equipment_info** | Insights: equipment mentioned, certs | Optional |
| **escalation** | Insights: escalate or not, to whom | Optional |
| **cross_sell_opportunity** | Insights: upsell hint | Optional |
| **next_best_action** | Insights: what to do next | Optional |
| **off_topic** | When true, **message** is shown instead of suggestion | When off-topic |
| **message** | Shown when off_topic is true | When off_topic |

---

## JSON Schema (for agent output)

```json
{
  "off_topic": false,
  "message": null,
  "intent_detected": "equipment_troubleshooting",
  "confidence": 0.92,
  "customer_sentiment": "urgent",
  "sentiment_cues": "Customer mentioned deadline and requested ASAP technician or swap.",
  "suggested_response": "I understand the urgency — you need to keep moving on that job. I'm going to get a technician dispatched to your site right away, and we'll also line up a replacement scissor lift in case we can't fix it on-site. Can you confirm the exact address and that someone will be there in about 15 minutes?",
  "de_escalation_tip": "Acknowledge the deadline and the fact they've already tried reset; commit to a clear next step (dispatch or swap) with a timeframe.",
  "resolution_steps": [
    {
      "step": 1,
      "action": "Confirm jobsite address and that someone will be on-site for the tech/swap.",
      "detail": "Customer said they can be on-site in ~15 min.",
      "system_reference": "RentalMan"
    },
    {
      "step": 2,
      "action": "Create field service ticket and/or schedule equipment swap for rental # UR-78321.",
      "detail": "Scissor lift won't raise past ~6 ft; emergency stop/reset already tried.",
      "system_reference": "Dispatch"
    }
  ],
  "knowledge_references": [
    {
      "title": "Service & Equipment Troubleshooting",
      "relevant_excerpt": "Resolution path: resolve by phone → dispatch field service → swap equipment. Never leave customer without a working solution."
    }
  ],
  "equipment_info": {
    "mentioned": ["scissor lift"],
    "specs_available": true,
    "certification_required": "Aerial Boom Lift & Scissor Lift",
    "accessories_to_suggest": []
  },
  "escalation": {
    "needed": true,
    "reason": "Equipment malfunction causing project downtime; customer has same-day deadline.",
    "escalate_to": "Field Service / Dispatch"
  },
  "cross_sell_opportunity": null,
  "next_best_action": "Dispatch field service and prepare swap option; confirm ETA with customer within 15 minutes."
}
```

---

## Example: Off-topic

When the conversation is not related to United Rentals:

```json
{
  "off_topic": true,
  "message": "Conversation is not related to United Rentals business. No suggestions available."
}
```

---

## Field Details (for agent logic)

- **suggested_response** (or **whisper_response**): One or two short sentences the ISR can say **verbatim or with light edits**. Must be customer-facing language (no internal jargon unless explained). Required whenever `off_topic` is false.
- **intent_detected**: One of the allowed intent values (e.g. `equipment_troubleshooting`, `new_reservation`, `invoice_dispute`). Used for badges and filtering.
- **customer_sentiment**: One of: `positive`, `neutral`, `concerned`, `frustrated`, `urgent`, `angry`. Used for sentiment badge and styling.
- **resolution_steps**: Array of `{ step, action, detail, system_reference }`. Ordered actions the ISR should take (RentalMan, Dispatch, etc.).
- **escalation**: When `needed` is true, the UI shows an escalation alert with `reason` and `escalate_to`.
- **equipment_info.mentioned**: List of equipment types or models mentioned (e.g. `["scissor lift", "26ft"]`).
- **knowledge_references**: Array of `{ title, relevant_excerpt }` from the knowledge base to support the suggestion.

The front end **always** shows the **Response suggestion** block when `suggested_response` (or `whisper_response`) is present, and shows each **Insight** (intent, sentiment, steps, escalation, etc.) when the corresponding field is present.
