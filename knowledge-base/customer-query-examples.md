# United Rentals — Customer Query Examples, Personas & Tone Guide

> **Purpose:** Reference library of realistic customer interactions for testing, training, and demoing the UR ISR Co-Pilot system.
> **Last Updated:** March 2026

---

## Customer Personas

### Persona 1 — Marcus Rivera

| Attribute | Detail |
|---|---|
| **Company** | Rivera Commercial Contractors |
| **Account** | UR-10042 (Local Credit Account) |
| **Industry** | Non-residential construction |
| **Branch** | Austin South #1247 |
| **Profile** | Mid-sized GC running 3–5 active jobsites at any time. Rents aerial equipment, earthmoving, and general tools regularly. Loyal UR customer for 4 years. |
| **Communication Style** | Direct, no-nonsense, time-conscious. Expects fast answers. Friendly when things are going well, but firm and urgent when there's a problem. Uses some industry jargon. |
| **Typical Tone** | Neutral to positive when placing orders; urgent and concerned when reporting issues. Rarely angry — prefers solutions over complaints. |
| **Key Context** | Has a large warehouse renovation coming in Q2. Repeat renter of scissor lifts and boom lifts. His crew holds current aerial certifications. |

---

### Persona 2 — Jennifer Park

| Attribute | Detail |
|---|---|
| **Company** | Meridian Industrial Group |
| **Account** | UR-20078 (National Account) |
| **Industry** | Industrial / manufacturing |
| **Branch** | Columbus East #0834 (home branch), multi-branch nationally |
| **Profile** | Procurement manager for a national industrial firm. Manages UR spend across 8 branches. Highly detail-oriented on invoicing. Has quarterly rate reviews with UR. |
| **Communication Style** | Professional, precise, data-driven. References specific invoice numbers, contract terms, and charge line items. Escalates calmly but firmly. |
| **Typical Tone** | Neutral when verifying details; frustrated when charges are unexplained or when she feels information was withheld. Never rude, but will insist on speaking with a manager if unsatisfied. |
| **Key Context** | Recently disputed an Environmental Service Charge. Has a quarterly rate review in April. High-value account — retention-sensitive. |

---

### Persona 3 — David Chen

| Attribute | Detail |
|---|---|
| **Company** | Chen Landscape & Design |
| **Account** | UR-30155 (Local Credit Account) |
| **Industry** | Residential landscaping / construction |
| **Branch** | Portland NW #0291 |
| **Profile** | Small business owner who rents seasonally (heavy spring through fall). Primarily rents earthmoving equipment and general tools. Careful with costs, asks about charges upfront. |
| **Communication Style** | Polite, soft-spoken, asks clarifying questions. Appreciates when ISRs proactively explain fees. Not confrontational — will accept charges if they're explained clearly. |
| **Typical Tone** | Consistently positive to neutral. Grateful for good service. Occasionally confused about billing line items but never angry. |
| **Key Context** | Seasonal renter — follows up in spring. Recently returned a skid steer. Cares about fuel charges and cleaning charges because he's cost-conscious. |

---

### Persona 4 — Angela Torres

| Attribute | Detail |
|---|---|
| **Company** | TorresBuild LLC |
| **Account** | UR-40289 (Local Credit Account) |
| **Industry** | Non-residential construction (tenant improvements, retail fit-outs) |
| **Branch** | Miami Central #0512 |
| **Profile** | Growing GC specializing in commercial interiors. Has been ramping up UR rentals over the past 18 months. Frequently needs electric slab scissor lifts, material handling (forklifts), and general tools. First-time credit application 18 months ago. |
| **Communication Style** | Warm, conversational, relationship-oriented. Likes to chat briefly before getting to business. Uses a mix of English and occasional Spanish terms. Prefers phone over digital channels. |
| **Typical Tone** | Almost always positive. Expressive when happy ("You guys are lifesavers!") and expressive when worried ("I'm really counting on this delivery"). Trusting but will push back if something feels off. |
| **Key Context** | Has 3 active jobsites in the Miami area. Growing account — expansion opportunity. Recently asked about United Academy training for her crew. |

---

### Persona 5 — Robert "Big Bob" Kowalski

| Attribute | Detail |
|---|---|
| **Company** | Kowalski Heavy Civil Inc. |
| **Account** | UR-55012 (National Account) |
| **Industry** | Heavy civil / infrastructure (highways, bridges, utilities) |
| **Branch** | Chicago West #0193 (home branch), 4 other branches regionally |
| **Profile** | VP of Operations for a large heavy civil firm. Manages a fleet of 30+ rental units across multiple jobsites. Uses Total Control extensively. Expects white-glove service as a top-tier national account. |
| **Communication Style** | Blunt, assertive, expects people to keep up with his pace. Uses heavy construction jargon (grade, CY, MOT, excavation). Doesn't repeat himself. Will call the ISR by name and expect them to know his account. |
| **Typical Tone** | Businesslike and commanding when things are normal; outright angry when equipment fails or deliveries are missed. Takes delays personally because they cost him thousands per hour in crew downtime. |
| **Key Context** | Currently running a $4.2M highway bridge project with a tight DOT deadline. Rents excavators, boom lifts, trench safety, generators, and light towers. Has a dedicated UR account manager but still calls the branch ISRs for day-to-day needs. |

---

### Persona 6 — Priya Sharma

| Attribute | Detail |
|---|---|
| **Company** | NovaTech Facilities Services |
| **Account** | NEW (First-time caller, no account yet) |
| **Industry** | Facility management / maintenance |
| **Branch** | N/A — calling the national 1-800 number |
| **Profile** | Facilities director for a tech campus. First time renting from UR. Needs aerial equipment for a one-time HVAC retrofit project. Researched UR online and is comparing with Sunbelt. |
| **Communication Style** | Analytical, asks many questions, compares options systematically. Not familiar with rental industry terminology. Needs things explained in plain language. |
| **Typical Tone** | Curious and cautious. Neither warm nor cold — purely transactional until trust is established. Will ask about RPP, delivery fees, and total cost before committing. |
| **Key Context** | Comparing UR vs. Sunbelt. Needs a 32ft electric scissor lift for 2 weeks. Wants to understand all-in costs before making a decision. Has never rented construction equipment before. |

---

## Query Examples by Intent

---

### 1. New Reservation

**Persona: Angela Torres | Tone: Warm, Positive**

> **Customer:** "Hey! How are you? Listen, I've got a new retail fit-out starting on the 24th over on Brickell Avenue — it's a big one, about 12,000 square feet. I'm going to need two of those electric scissor lifts, the 26-foot ones, for probably three weeks. And I'll also need a forklift to move materials around the site. Can you set that up for me?"

**Expected Agent Behavior:**
- Intent: `new_reservation`
- Sentiment: `positive`
- Resolution steps: Check 26ft electric slab scissor lift availability (x2) and forklift availability in RentalMan for Miami Central branch. Verify operator certification for both aerial and forklift. Generate quote with RPP, delivery, and pickup fees.
- Cross-sell: Ground protection mats for the retail space, general tool package.

---

**Persona: Priya Sharma | Tone: Cautious, Analytical**

> **Customer:** "Hi, I'm calling for the first time. I manage facilities for a tech campus in Raleigh, and we have an HVAC retrofit project coming up. I need some kind of lift — I think a scissor lift? — that can reach about 30 feet inside our building. The floors are polished concrete so I need something that won't mark them up. I've been looking at Sunbelt too, so I'm comparing options. Can you tell me what you have and what the total cost would be for two weeks, including delivery and everything?"

**Expected Agent Behavior:**
- Intent: `new_reservation`
- Sentiment: `neutral`
- Competitor mention: Flag Sunbelt comparison — focus on UR value (largest fleet, Total Control visibility, United Academy training).
- Equipment suggestion: 32ft Electric Slab Scissor Lift — non-marking tires, suitable for finished floors.
- Resolution steps: Explain rate structure (daily/weekly/monthly), RPP (15%), delivery/pickup fees, environmental service charge. Offer a detailed quote. Begin new account setup process.
- Translate jargon: "RPP" → "our equipment protection plan", explain Environmental Service Charge proactively.

---

**Persona: Robert Kowalski | Tone: Commanding, Fast-Paced**

> **Customer:** "Sarah, it's Bob Kowalski. I need a 45-ton excavator at the I-290 bridge site by Thursday morning, 6 AM sharp. We're starting deep foundations and I need a machine that can handle 20-foot cuts in clay. Also throw in a trench box — the 8-by-24. And I'll need a light tower out there too, we're running second shift starting next week. Don't bother quoting me RPP, we've got our own coverage through Zurich."

**Expected Agent Behavior:**
- Intent: `new_reservation`
- Sentiment: `neutral` (businesslike)
- Resolution steps: Look up 45-ton excavator availability across Chicago-area branches, check trench box (8x24) and light tower availability. Confirm delivery logistics for 6 AM Thursday. Note customer's RPP waiver — verify insurance documentation is on file (Zurich policy).
- Certification: Verify excavator operator certification. Trench safety competent person certification may be needed.
- Flag: Large equipment delivery (lowboy trailer), potential permit requirements.

---

### 2. Billing Inquiry

**Persona: Jennifer Park | Tone: Professional, Slightly Frustrated**

> **Customer:** "Hi, I'm looking at invoice INV-501238 for our Charlotte jobsite, and I'm seeing a line item for $847 labeled 'Fuel Convenience Charge.' That seems extremely high for a single generator rental. Can you explain how that's calculated? Because when we signed the contract, nobody mentioned that the generator would need to be returned with a full tank of diesel — we assumed you'd handle fueling."

**Expected Agent Behavior:**
- Intent: `billing_inquiry`
- Sentiment: `frustrated`
- De-escalation: Acknowledge the concern first — "I understand that's a significant charge, and I want to make sure we're transparent about how it was calculated."
- Knowledge reference: Fuel Convenience Charge is applied when equipment is returned without a full fuel tank, charged at per-gallon retail rate at time of return. For generators, fuel consumption can be substantial depending on load and runtime.
- Resolution steps: Pull the contract details in RentalMan to check fuel level at return, verify the per-gallon rate applied, and confirm the charge calculation. If the charge is correct, explain clearly. If the customer's contract has special terms, review them.
- Escalation: If the customer pushes back further, offer to have the branch manager review.

---

**Persona: David Chen | Tone: Polite, Confused**

> **Customer:** "Hi there, I just got my final invoice for the skid steer I returned last week, and there's a charge on here I don't understand. It says 'Environmental Service Charge' for $62. What is that exactly? Is that something I can opt out of next time?"

**Expected Agent Behavior:**
- Intent: `billing_inquiry`
- Sentiment: `neutral`
- Resolution steps: Explain that the Environmental Service Charge is a mandatory fee that covers compliance with federal and state environmental regulations regarding hazardous waste and products used in equipment maintenance. It is not optional and cannot be waived.
- Tone: Patient, clear explanation. David appreciates transparency — explain it simply: "It's a standard charge that's applied to all rentals. It covers the cost of properly handling and disposing of fluids and materials used to maintain the equipment."

---

### 3. Invoice Dispute

**Persona: Jennifer Park | Tone: Firm, Data-Driven**

> **Customer:** "I need to escalate something. Invoice INV-498203 has a cleaning charge of $425 on the trench box we returned to your Columbus branch on February 28th. My crew cleaned that equipment before it was picked up — I have photos with timestamps. This charge shouldn't be here. I'd like this reviewed and removed. If I don't hear back by end of day tomorrow, I'll need to bring this up in our quarterly review."

**Expected Agent Behavior:**
- Intent: `invoice_dispute`
- Sentiment: `frustrated`
- Escalation: Flag for branch manager immediately — national account, explicit deadline, quarterly review leverage.
- Resolution steps: Log the dispute in RentalMan, pull the return inspection notes from Columbus East branch, request the customer email the timestamped photos for documentation. Branch manager to review and respond within 24 hours.
- Retention risk: Medium — national account using quarterly review as leverage. Handle with care.

---

**Persona: Robert Kowalski | Tone: Angry, Demanding**

> **Customer:** "Mike, I just got hit with $3,200 in damage charges on invoice INV-512044 for the 60-foot boom lift we had at the I-290 site. The report says 'hydraulic hose damage and platform guardrail dent.' That machine had a hydraulic leak WHEN YOU DELIVERED IT — I reported it on day one and your field service guy came out and patched it. Now you're charging ME for the hose? And the guardrail dent was there at delivery too. I'm not paying this. Get your branch manager on the phone."

**Expected Agent Behavior:**
- Intent: `invoice_dispute`
- Sentiment: `angry`
- De-escalation: "Mr. Kowalski, I hear you, and I take this seriously. You reported that hydraulic issue on day one and we have the field service record. Let me pull that up right now."
- Escalation: Immediate — customer requesting manager, charge exceeds $3,000, prior field service record supports customer's claim.
- Resolution steps: Pull field service ticket from day 1, cross-reference with delivery inspection report, review the return inspection report. If field service record confirms pre-existing hydraulic issue, credit should be issued. Branch manager to call customer same day.
- Retention risk: High — top-tier national account, angry, large dollar amount, prior documented issue supports his position.

---

### 4. Equipment Troubleshooting

**Persona: Marcus Rivera | Tone: Urgent, Concerned**

> **Customer:** "Hey, I've got a problem. The 26-foot scissor lift at our Riverside Warehouse site won't go up. The platform goes up about 4 feet and then stops — there's a beeping alarm and a red light on the control panel. My painter is standing here with nothing to do. We've got a deadline on Thursday and I can't afford to lose today. Can you walk me through something or get somebody out here?"

**Expected Agent Behavior:**
- Intent: `equipment_troubleshooting`
- Sentiment: `urgent`
- Troubleshooting steps: Red light + alarm on scissor lift platform usually indicates a tilt sensor or overload condition. Ask: (1) Is the machine on a level surface? (2) Is there anything on the platform besides the operator? (3) Are the outriggers/stabilizers fully deployed? (4) Try lowering fully, power cycling (key off for 30 seconds, restart). If the issue persists, the tilt sensor or potentiometer may need calibration — requires field service.
- Resolution: If phone troubleshooting fails, dispatch field service immediately. Offer equipment swap if field service can't arrive within 2 hours given the Thursday deadline.
- Cross-sell: If the customer is doing a lot of painting work, suggest adding a second scissor lift as backup for critical deadline jobs.

---

**Persona: Angela Torres | Tone: Worried, Expressive**

> **Customer:** "Oh my God, the forklift just stopped working right in the middle of moving our drywall into the building! It was running fine this morning and then it just died — no warning lights, no beeping, nothing. It just went completely dead. We have 40 pallets of drywall sitting on the truck and the driver needs to leave by 2 PM. I'm really counting on you guys to help me here."

**Expected Agent Behavior:**
- Intent: `equipment_troubleshooting`
- Sentiment: `urgent`
- Troubleshooting steps: Complete power loss with no warnings usually indicates battery/power issue. Ask: (1) Is this a propane or electric forklift? (2) If propane — is the tank empty? Check the gauge. (3) If electric — was it charged last night? Check the battery gauge or plug-in indicator. (4) Check the main fuse and emergency disconnect switch. (5) Check if the seat operator presence switch is functioning (some forklifts won't operate without weight on seat).
- Resolution: If quick fix doesn't work, given the 2 PM material delivery deadline, dispatch a swap unit immediately — don't wait for field service. Time-critical.
- Tone guidance: Match her energy with reassurance — "Angela, I'm on it right now. Let's get this sorted so your delivery stays on track."

---

### 5. Off-Rent / Equipment Return

**Persona: David Chen | Tone: Polite, Appreciative**

> **Customer:** "Hi, good morning. I'm calling to schedule a pickup for the compact track loader we've had at the Beaverton townhomes project. We finished grading yesterday and don't need it anymore. Could we get it picked up tomorrow afternoon, maybe between 1 and 3? Oh, and I filled the fuel tank this morning — I remembered you mentioned that last time about the fuel charge."

**Expected Agent Behavior:**
- Intent: `off_rent`
- Sentiment: `positive`
- Resolution steps: Process off-rent in RentalMan, coordinate with dispatch for tomorrow afternoon (1–3 PM window) at Beaverton townhomes. Note that fuel tank is full — no Fuel Convenience Charge should apply. Remind customer about the return condition (no excessive dirt/concrete to avoid cleaning charge).
- Customer health: Very positive — remembering prior advice about fuel is a loyalty signal. Note for future spring season follow-up.
- Cross-sell: David does seasonal landscaping — ask if he has any upcoming spring projects that might need equipment.

---

**Persona: Robert Kowalski | Tone: Businesslike, Rapid**

> **Customer:** "I need to off-rent the following at the I-290 site: the 80-foot telescopic boom, serial ending in 4472; the 20KW generator, serial ending in 8891; and two light towers. Everything can be picked up Monday. Make sure your driver coordinates with my foreman, Tony Russo — he'll be on site from 6 AM. The boom needs a lowboy so plan accordingly. And bill the final to the I-290 PO, not the general account."

**Expected Agent Behavior:**
- Intent: `off_rent`
- Sentiment: `neutral` (businesslike)
- Resolution steps: Process 4 off-rent transactions in RentalMan. (1) 80ft telescopic boom — arrange lowboy trailer for Monday. (2) 20KW generator — standard flatbed. (3) Two light towers — can go on a single flatbed. Coordinate all pickups through foreman Tony Russo, on-site from 6 AM. Confirm billing to I-290 PO number. Verify all serial numbers match active contracts.
- Important: Multi-unit off-rent for a national account — make sure all 4 items are tracked and none are missed. Confirm PO billing assignment.

---

### 6. Rental Extension

**Persona: Angela Torres | Tone: Positive, Conversational**

> **Customer:** "Hey, quick question — the two scissor lifts I have at the Brickell Avenue project, I was supposed to return them this Friday but we're a little behind on the ceiling work. Can I keep them for another two weeks? Same rate, right? And also, my guys' aerial certifications — one of them expires next month. Can you remind me how to set up the renewal training?"

**Expected Agent Behavior:**
- Intent: `rental_extension` + `operator_certification`
- Sentiment: `positive`
- Resolution steps: (1) Extend both 26ft scissor lifts for 2 additional weeks in RentalMan. The rate may shift depending on total rental duration — if crossing from weekly to monthly tier, the customer may get a better rate. Confirm the updated billing. (2) For aerial certification renewal: United Academy offers a 4-hour refresher course. Can be scheduled at the Miami Central branch or on-site at the customer's jobsite. Certifications are valid for 3 years. Current fee and scheduling details available through United Academy coordinator.
- Cross-sell: If the ceiling work is running behind, ask if she needs additional equipment to accelerate (additional scissor lift, material handling support).

---

### 7. Delivery Scheduling

**Persona: Marcus Rivera | Tone: Direct, Time-Conscious**

> **Customer:** "I need the 45-foot articulating boom lift delivered to a new jobsite — it's the Mueller Commercial Park, Building C, loading dock entrance off of 51st Street. I need it there by 7 AM Wednesday. There's a gate code: 4829. And make sure the driver knows it's a tight loading dock, so they'll need to come in from the east side. Last time your driver went to the wrong entrance and it cost me 45 minutes."

**Expected Agent Behavior:**
- Intent: `delivery_scheduling`
- Sentiment: `neutral` (with a hint of past frustration about previous delivery issue)
- Resolution steps: Schedule delivery in RentalMan for Wednesday 7 AM at Mueller Commercial Park, Building C. Add detailed notes: loading dock entrance off 51st Street, east side approach, gate code 4829. Flag the prior delivery issue so dispatch pays attention to the routing instructions.
- Acknowledge past issue: "Understood, Marcus. I'm putting detailed notes in for dispatch so they use the east entrance off 51st. I apologize about the last delivery — we'll make sure this one goes smoothly."

---

### 8. RPP / Rental Protection Plan

**Persona: Priya Sharma | Tone: Analytical, Cautious**

> **Customer:** "Before I finalize this rental, I want to understand the protection plan. What exactly does the RPP cover? Does it cover everything? Like if my employee accidentally drives the lift into a wall and damages it, am I covered? What about if someone steals it from our campus overnight? And you said it's 15% — is that 15% of the daily rate or the total rental charge?"

**Expected Agent Behavior:**
- Intent: `rpp_question`
- Sentiment: `neutral`
- Knowledge reference: RPP (15% of base rental charges only — not delivery, fuel, or other fees). Covers accidental loss or damage. Limits liability to the lesser of: 10% of replacement value, 10% of repair costs, or $500. Accidental collision with a wall — YES, covered under accidental damage (as long as it's not intentional abuse). Theft — YES, covered under accidental loss (customer must file a police report). Does NOT cover: tire damage from blowouts/punctures (except vehicles rented 60 days or less), intentional abuse or misuse.
- Clarify: RPP is NOT insurance. Customer may decline RPP only with proof of adequate property insurance.
- Tone: Patient, thorough. Priya is comparing options — a clear, confident RPP explanation builds trust and differentiation from competitors.

---

### 9. Account Setup / Credit Application

**Persona: Priya Sharma | Tone: Neutral, Process-Oriented**

> **Customer:** "OK, I think I'd like to go ahead and set up an account. What do I need to do? We're a large tech company so we'd want a corporate credit account rather than paying each time. What documents do you need, how long does it take, and can we rent in the meantime while the credit is being processed?"

**Expected Agent Behavior:**
- Intent: `account_setup` + `credit_application`
- Sentiment: `neutral`
- Resolution steps: (1) Collect company info: legal business name, EIN, business address, billing address. (2) Required documents: Articles of Incorporation, EIN verification letter, authorized signer ID. (3) Credit application: three trade references, bank reference, requested credit limit. (4) Processing time: 24–48 business hours (can be expedited). (5) Interim rentals: YES — customer can rent immediately on COD basis using a credit card while credit is being reviewed.
- Direct the customer to the online application at unitedrentals.com/credit-application for convenience, or email the PDF form.
- Tone: Welcoming and efficient — this is a new customer acquisition moment.

---

### 10. United Academy / Operator Certification

**Persona: Angela Torres | Tone: Warm, Inquisitive**

> **Customer:** "I've got three new guys starting next week and they need to get certified on scissor lifts and forklifts before I can put them on the Brickell job. Can you do the training at my jobsite or do they have to come to your branch? How long does it take? And do you do it in Spanish? Two of my guys are more comfortable in Spanish."

**Expected Agent Behavior:**
- Intent: `operator_certification`
- Sentiment: `positive`
- Knowledge reference: United Academy offers on-site training at the customer's jobsite. Scissor lift certification: 4 hours (classroom + practical). Forklift certification: 3 hours. For both certifications in one day: approximately 7 hours total. Classes available in English, Spanish, and French. Maximum 12 participants per class. Certifications valid for 3 years.
- Resolution steps: Contact the United Academy coordinator to schedule on-site training for 3 participants at the Brickell Avenue jobsite. Request bilingual instructor (Spanish). Need employer authorization for all 3 participants.
- Cross-sell: If she has more crew members who might need training in the future, mention group booking discounts for 6+ participants.

---

### 11. Equipment Swap

**Persona: Robert Kowalski | Tone: Angry, Demanding**

> **Customer:** "The generator you guys dropped off yesterday at the I-290 site is a piece of junk. It keeps tripping the breaker every time we run more than two concrete vibrators off of it. I told your guy I needed a 20KW minimum and this thing can barely handle 15KW before it craps out. I need a replacement out here TODAY — not tomorrow, not this afternoon. My crew is standing around and I'm burning $800 an hour in labor. Get it done."

**Expected Agent Behavior:**
- Intent: `equipment_swap`
- Sentiment: `angry`
- De-escalation: "Mr. Kowalski, I completely understand — that's unacceptable downtime and I'm going to fix this right now."
- Resolution steps: (1) Verify what unit was delivered — check if it's actually rated at 20KW or if a smaller unit was sent by mistake. (2) If wrong unit was sent, this is a UR error — prioritize immediate swap, no additional charges. (3) If the 20KW is undersized for his load (multiple concrete vibrators draw significant amperage), suggest upsizing to a 25KW or 30KW unit. (4) Dispatch swap TODAY — flag as critical priority. (5) Do NOT charge delivery/pickup for the swap if this was a UR fulfillment error.
- Escalation: Branch manager should be notified of the error and the customer's frustration level.
- Retention risk: High — national account, costly downtime, angry, UR may be at fault for wrong unit.

---

### 12. Total Control Platform Support

**Persona: Jennifer Park | Tone: Neutral, Methodical**

> **Customer:** "I'm having trouble pulling reports in Total Control. I need to generate a utilization report for all our rental equipment across three branches — Columbus, Charlotte, and Nashville — for the last quarter. When I try to filter by branch, it only shows Columbus. Is there a way to get a consolidated view? Also, can I export it to Excel? I need to present this to our CFO next week."

**Expected Agent Behavior:**
- Intent: `total_control_support`
- Sentiment: `neutral`
- Resolution steps: (1) Verify that Jennifer's Total Control login has multi-branch visibility enabled — national account users may need their branch access permissions updated by the UR account manager. (2) Walk through the report generation: Analytics > Utilization > select date range > filter by branch (should allow multi-select for national accounts). (3) Export: Total Control supports CSV and Excel export from the report view. (4) If multi-branch access isn't working, escalate to the Total Control support team or the national accounts team to update her portal permissions.
- Tone: Helpful, step-by-step. Jennifer is presenting to her CFO — getting this right matters to her.

---

### 13. Branch Transfer

**Persona: Robert Kowalski | Tone: Businesslike**

> **Customer:** "I've got an excavator at the I-290 site that I need moved to our new project on Route 83 in DuPage County. That's going to be a different branch territory, right? Can you handle the transfer or do I need to call the other branch separately? I need it at Route 83 by next Monday."

**Expected Agent Behavior:**
- Intent: `branch_transfer`
- Sentiment: `neutral`
- Resolution steps: (1) Confirm the current contract and equipment serial number at I-290 site. (2) Identify the receiving branch for Route 83 / DuPage County. (3) ISR can initiate the inter-branch transfer in RentalMan — customer does not need to call the other branch. (4) Coordinate transfer logistics: off-rent at current site, transport to new site, update contract with new jobsite address. (5) Confirm billing continuity — no gap in rental charges and no double delivery/pickup fees for the transfer.
- Flag: National account transfer — ensure both branches are aligned on the timing.

---

### 14. Competitor Mention / Retention Risk

**Persona: Priya Sharma | Tone: Direct, Comparing**

> **Customer:** "I'll be honest with you — Sunbelt quoted me $1,850 all-in for two weeks on a 32-foot scissor lift including delivery. That's with their protection plan included. Can you beat that or at least match it? If the pricing is close, I'd go with you because your locations are more convenient, but if there's a big gap I'll probably go with them."

**Expected Agent Behavior:**
- Intent: `new_reservation` (with competitor context)
- Sentiment: `neutral`
- Competitor handling: DO NOT disparage Sunbelt. DO NOT attempt to match the specific price without verifying in RentalMan. Focus on UR differentiators: largest fleet (better availability), Total Control platform (real-time fleet visibility), United Academy (operator training included in the relationship), 1,181+ branches for future flexibility.
- Resolution steps: (1) Generate a UR quote in RentalMan for the exact configuration (32ft electric slab scissor, 2 weeks, delivery, RPP). (2) Present the quote transparently with all line items. (3) If the price is competitive, highlight the value-adds. (4) If there's a significant gap, note the customer's price sensitivity and flag for branch manager to review potential pricing flexibility.
- Retention risk: The customer is openly comparing — this is an acquisition opportunity. If UR loses on price alone and doesn't differentiate on value, she'll go to Sunbelt.

---

### 15. Multi-Topic / Complex Call

**Persona: Marcus Rivera | Tone: Fast-Paced, Multi-Threaded**

> **Customer:** "Sarah, I've got a few things. First, I need to extend the boom lift at the I-35 site for another week — the structural guys aren't done yet. Second, I need a quote for two 43-foot rough terrain scissor lifts for a new project starting April 1st at the Domain. Third, I got a voicemail from your billing department about invoice INV-505220 but I haven't had a chance to look at it — can you pull it up and tell me what it's about? And last thing, my foreman told me one of the light towers at the Mueller site is flickering — probably just a bulb but can you have someone take a look?"

**Expected Agent Behavior:**
- Intent: Multiple — `rental_extension`, `quote`, `billing_inquiry`, `equipment_troubleshooting`
- Sentiment: `neutral` (busy, multi-tasking)
- Resolution steps: Handle sequentially, confirming each item:
  1. **Extension:** Extend boom lift at I-35 for 1 additional week in RentalMan. Confirm updated billing.
  2. **Quote:** Generate a quote for 2x 43ft RT scissor lifts for April 1 at the Domain. Include RPP, delivery/pickup, environmental charge. Rough terrain models require firm ground — confirm site conditions.
  3. **Billing:** Pull invoice INV-505220 in RentalMan and summarize the charges and any outstanding balance.
  4. **Light tower:** If it's just a bulb, walk the foreman through the replacement (most light towers have user-replaceable bulbs). If it's a ballast or electrical issue, dispatch field service. Not urgent — schedule within 48 hours.
- Tone: Match Marcus's pace. Efficient, organized. Summarize at the end: "OK Marcus, so I've got the boom lift extension, the Domain quote coming to your email, the invoice info, and a service check on the light tower. Anything else?"

---

## Tone Reference Matrix

| Persona | Default Tone | Under Stress | Trust Level | Preferred Resolution Style |
|---|---|---|---|---|
| Marcus Rivera | Direct, efficient | Urgent but reasonable | High (4-year customer) | Fast solutions, no fluff |
| Jennifer Park | Professional, precise | Firm, escalates calmly | Medium (trust but verify) | Data-driven, documented |
| David Chen | Polite, soft-spoken | Confused, asks questions | High (appreciative) | Patient explanations |
| Angela Torres | Warm, conversational | Worried, expressive | High (growing loyalty) | Reassurance + action |
| Robert Kowalski | Blunt, commanding | Angry, demanding | Medium (high expectations) | Immediate action, no excuses |
| Priya Sharma | Analytical, cautious | Measured, comparison-focused | Low (new, evaluating) | Thorough info, no pressure |

---

## Sentiment Escalation Patterns

Understanding how each persona escalates helps the co-pilot anticipate the right response:

| Stage | Signal Phrases | Recommended Approach |
|---|---|---|
| **Positive** | "Great, thanks!" / "You guys are lifesavers" / "I appreciate that" | Reinforce with confidence, suggest cross-sell |
| **Neutral** | "OK" / "What are my options?" / "Can you check on that?" | Provide clear information, be proactive |
| **Concerned** | "I'm worried about..." / "We can't afford delays" / "Is this going to be a problem?" | Acknowledge the concern, provide timeline commitment |
| **Frustrated** | "Nobody told me about this" / "This shouldn't have happened" / "I've been waiting for..." | Lead with empathy, validate their experience, then solution |
| **Urgent** | "I need this TODAY" / "My crew is standing around" / "We're losing money" | Skip empathy preamble — go straight to action with urgency match |
| **Angry** | "This is unacceptable" / "Get me your manager" / "I'm not paying for this" | Empathy first ("I hear you"), take ownership, escalate if needed, never argue |
