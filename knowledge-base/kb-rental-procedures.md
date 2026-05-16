# United Rentals — Rental Procedures & Lifecycle

> **Last Updated:** March 2026
> **Source of Truth for:** ISR Co-Pilot Rental Workflow, Contract Management, Customer Onboarding

---

## 1. Rental Lifecycle Overview

Every United Rentals transaction follows a standardized lifecycle:

```
Inquiry → Quote → Contract → Delivery/Pickup → Active Rental → Off-Rent → Return/Pickup → Invoice → Close
```

Each phase has specific system actions, customer touchpoints, and documentation requirements. ISRs are involved across the full lifecycle but play the most critical role in the Inquiry-to-Contract and Off-Rent phases.

---

## 2. Reservation & Booking Channels

### 2.1 Phone (ISR-Handled)

1. Customer calls the local branch or national 1-800 number.
2. Call routes to the Inside Sales Representative (ISR) queue.
3. ISR qualifies the request:
   - What equipment is needed? (type, size, capacity)
   - What is the job application? (helps ensure right machine)
   - Where is the jobsite? (delivery address, site access constraints)
   - When is it needed? (start date, estimated duration)
   - Does the customer have an existing account?
4. ISR searches RentalMan for branch availability.
   - If not available locally, check neighboring branches (transfer) or regional fleet.
5. ISR generates a quote or proceeds directly to contract.

### 2.2 Walk-In (Branch Counter)

1. Customer arrives at the branch.
2. Counter staff or OSR (Outside Sales Representative) handles the transaction.
3. Same qualification steps as phone — equipment, application, dates, account verification.
4. Customer may take equipment via **will-call** (customer picks up) or schedule delivery.

### 2.3 Online (UnitedRentals.com)

1. Customer browses the equipment catalog on the website.
2. Selects equipment, enters jobsite zip code for availability.
3. Submits a reservation request online.
4. System assigns the reservation to the nearest available branch.
5. Branch ISR or OSR contacts the customer to confirm details and finalize the contract.
6. Online reservations are **not binding contracts** — they are requests that require branch confirmation.

### 2.4 Mobile App (UR Control / United Rentals App)

1. Existing account holders can request equipment through the mobile app.
2. App shows real-time account information: active rentals, invoices, payments.
3. Customers can submit off-rent requests, request service, and view contracts.
4. New reservations via the app follow the same branch-confirmation workflow as online.

### 2.5 RentalMan (Internal System)

RentalMan is United Rentals' proprietary enterprise rental management system. All transactions — regardless of origination channel — are processed through RentalMan.

**Key RentalMan Functions for ISRs:**
- Equipment availability search (by branch, region, or national)
- Customer account lookup and creation
- Quote generation and emailing
- Contract creation, modification, and closure
- Off-rent scheduling
- Delivery/pickup dispatch
- Service ticket creation
- Invoice lookup and credit memo processing

---

## 3. Quote Generation

### 3.1 When to Quote vs. Direct Contract

| Scenario | Action |
|---|---|
| Customer is comparing options or needs internal approval | Generate a Quote |
| Customer is ready to proceed immediately | Create a Contract directly |
| National Account with pre-negotiated rates | Create Contract using NA rate schedule |
| Walk-in / COD customer picking up today | Create Contract at counter |

### 3.2 Quote Details

A standard UR quote includes:
- Equipment description and quantity
- Rental rate (daily, weekly, or monthly — see Rate Structures)
- Estimated rental duration
- Delivery and pickup fees (if applicable)
- RPP (Rental Protection Plan) charge — quoted as a line item
- Environmental Service Charge
- Estimated taxes
- Quote expiration date (typically 30 days)

### 3.3 Quote Delivery

- Quotes can be emailed directly from RentalMan to the customer.
- PDF format with UR branding and terms & conditions.
- ISRs should follow up on open quotes within 24–48 hours.
- Quotes do **not** reserve equipment — availability is not guaranteed until a contract is created.

---

## 4. Rate Structures

### 4.1 Standard Rate Tiers

United Rentals uses a tiered rate structure:

| Rate Tier | Typical Multiplier | Description |
|---|---|---|
| Daily Rate | 1x (base) | Standard charge for a single calendar day |
| Weekly Rate | 3x daily rate | Applies when rental exceeds 3 days in a week; customer pays the lesser of accumulated dailies or the weekly rate |
| Monthly Rate (4-week) | 3x weekly rate (≈ 9x daily) | Applies for rentals of 4 weeks or more; customer pays the lesser of accumulated weeklies or the monthly rate |

**Key Points:**
- The system automatically applies the most favorable rate for the customer based on duration.
- Rates vary by branch, region, and equipment category.
- National Account customers have pre-negotiated rates that may differ from standard local rates.
- Rates do **not** include RPP, Environmental Service Charge, fuel, delivery, or taxes.

### 4.2 Shift Rates

- Some equipment categories (particularly large earthmoving and cranes) may be quoted on a **shift rate** basis.
- A standard shift is 8 hours of operation (meter hours).
- Overtime charges apply for usage beyond the shift allowance.

### 4.3 National Account Rates

- National Accounts have a master agreement with negotiated rates, terms, and conditions.
- Rates are loaded into RentalMan and auto-apply when the NA account number is used.
- ISRs should **always verify** the correct NA account is linked before creating a contract.
- NA rate adjustments require approval from the NA Account Manager or Branch Manager.

### 4.4 Seasonal & Promotional Rates

- Periodically, UR offers seasonal promotions (e.g., winter heating, summer cooling).
- Promotional rates are communicated through internal bulletins and are pre-loaded in RentalMan.
- ISRs should check for active promotions before quoting standard rates.

---

## 5. Contract Creation

### 5.1 Required Information

To create a rental contract in RentalMan, the following information is required:

| Field | Details |
|---|---|
| Customer Account | Existing account number or new account setup |
| Billing Contact | Name, email, phone |
| Jobsite Address | Full delivery address with site contact name and phone |
| Equipment | Item number, quantity, requested attachments |
| Rental Start Date | Date equipment is needed on site |
| Estimated Return Date | Best estimate of rental duration |
| Rate | Confirmed rate (daily/weekly/monthly) |
| RPP Election | Customer elects or declines RPP |
| PO Number | Customer purchase order (required for most commercial accounts) |
| Delivery Instructions | Gate codes, site access hours, placement location, unloading requirements |

### 5.2 Customer Requirements

**All customers must provide:**
1. **Valid Photo ID** — Government-issued (driver's license, passport, state ID).
2. **Proof of Insurance** — Certificate of Insurance (COI) naming United Rentals as additional insured and loss payee, with adequate coverage for the equipment value. OR purchase of the Rental Protection Plan (RPP).
3. **Credit Card** — Visa, MasterCard, American Express, or Discover for deposit/guarantee.
4. **Minimum Age** — Customer must be 18 years or older.

**Additional requirements by customer type:**

| Customer Type | Additional Requirements |
|---|---|
| New Local Account | Credit application, trade references, signed terms & conditions |
| Existing Local Account | Verify account is in good standing, PO if required |
| National Account | Verify NA number, confirm authorized users list |
| Walk-In / COD | Full prepayment or valid credit card hold, photo ID |

### 5.3 Contract Execution

1. ISR creates the contract in RentalMan.
2. System generates a unique Contract Number.
3. Contract is emailed to the customer for electronic signature (DocuSign integration) or signed at the counter.
4. Once signed, the contract is active and the equipment is allocated.
5. Dispatch is notified for delivery scheduling (if delivery is requested).

---

## 6. Rental Modifications

### 6.1 Equipment Exchanges

- Customer needs a different size or type of equipment.
- ISR creates a new contract line for the replacement and off-rents the original.
- No additional delivery/pickup fee if the exchange is simultaneous (swap).

### 6.2 Extensions

- Customer needs equipment longer than originally estimated.
- ISR updates the estimated return date in RentalMan.
- Rate automatically adjusts to the most favorable tier based on new duration.
- If the equipment is needed at another branch, a re-rent or transfer may be required.

### 6.3 Rate Changes

- Rate modifications mid-rental require Branch Manager or Sales Manager approval.
- Common scenarios: competitive rate match, long-term commitment discount, equipment issue goodwill adjustment.
- All rate changes are documented in RentalMan with approval notes.

### 6.4 Adding Equipment to Existing Contract

- Additional equipment can be added as new line items on the existing contract.
- Each line item has its own start/stop dates and rate.
- This is preferred over creating multiple contracts for the same jobsite.

### 6.5 Early Returns

- Customer returns equipment before the estimated return date.
- Billing is based on **actual rental days**, not estimated duration.
- The system applies the most favorable rate tier for the actual duration.
- If the customer committed to a minimum rental period (e.g., for a discounted rate), minimum charges may apply.
- ISR should confirm any minimum commitments before processing the early return.

---

## 7. Off-Rent Process

The off-rent process is how a customer signals they are done with the equipment and want to stop rental charges.

### 7.1 Off-Rent Request Methods

| Method | Process |
|---|---|
| Phone Call to ISR | ISR enters off-rent in RentalMan with the requested pickup date |
| Mobile App | Customer submits off-rent request; branch confirms and schedules pickup |
| Online (UnitedRentals.com) | Customer submits off-rent request through account portal |
| Walk-In | Customer returns equipment directly to the branch yard |
| Email / Fax | Customer sends written off-rent notice; ISR processes in RentalMan |

### 7.2 Off-Rent Timing Rules

- **Off-rent must be called in by the customer.** Equipment sitting idle at the jobsite continues to accrue rental charges.
- Off-rent date is the date the customer calls it in, **not** the date UR picks up the equipment (unless pickup delay is caused by UR).
- If UR cannot pick up the equipment on the requested date due to scheduling, the billing stops on the customer's requested off-rent date.
- ISRs should confirm the off-rent date clearly and document it in RentalMan.

### 7.3 Return Condition Expectations

When equipment is returned (either via pickup or customer drop-off), the following conditions are expected:

| Condition | Requirement |
|---|---|
| Fuel | Full tank (diesel and gasoline equipment). Fuel Convenience Charge applies if returned less than full. |
| Cleanliness | Reasonably clean, free of excessive mud/debris. Cleaning charges may apply. |
| Keys & Accessories | All keys, manuals, remote controls, and accessories returned. Missing item charges apply. |
| Damage | Normal wear and tear is expected. Damage beyond normal wear is assessed and charged (RPP may cover — see RPP terms). |
| Attachments | All rented attachments must be returned with the base machine. |
| Hours / Mileage | Meter reading is recorded at return for shift-rate equipment. |

### 7.4 Return Inspection

1. Branch mechanic or yard staff inspects the equipment upon return.
2. Any damage, missing items, or excessive wear is documented with photos.
3. If damage is found, the customer is notified and a damage claim is initiated.
4. RPP coverage is evaluated if the customer elected RPP.
5. Final charges (fuel, cleaning, damage) are added to the invoice.

---

## 8. Delivery & Pickup Logistics

### 8.1 Delivery Scheduling

1. ISR or dispatcher schedules delivery based on customer's requested date and time window.
2. Standard delivery windows are **AM (7:00–12:00)** or **PM (12:00–5:00)**.
3. Specific time requests are accommodated on a best-effort basis but cannot be guaranteed.
4. Customer must provide a site contact who will be present to accept delivery.
5. ISR should confirm:
   - Site access restrictions (gate codes, security check-in, weight limits)
   - Unloading requirements (forklift on site, crane needed, ground conditions)
   - Placement location (specific area on the jobsite)

### 8.2 Delivery Methods

| Equipment Size | Delivery Method |
|---|---|
| Small tools, compressors, small generators | UR flatbed truck or customer pickup |
| Scissor lifts, small boom lifts, skid steers | UR flatbed or tilt-deck trailer |
| Large boom lifts, excavators, dozers | Lowboy trailer (may require pilot car for oversized) |
| Trench boxes, large shoring systems | Flatbed with crane (boom truck) |
| Portable offices, containers | Tilt-deck or roll-off truck |

### 8.3 Delivery & Pickup Fees

- Fees are based on distance from the branch to the jobsite (mileage-based).
- Fees vary by equipment size and delivery method.
- Standard delivery fees are one-way — separate charges for delivery and pickup.
- National Account agreements may include negotiated delivery rates or free delivery thresholds.
- ISRs should always quote delivery fees as part of the total rental cost.

### 8.4 Dispatch Coordination

- Deliveries and pickups are coordinated through the branch dispatch function.
- Dispatch manages the daily delivery/pickup schedule and assigns drivers.
- ISRs communicate with dispatch through RentalMan and direct coordination.
- Priority deliveries (same-day, emergency) require Branch Manager or Dispatch Manager approval.

---

## 9. Account Types & Procedures

### 9.1 National Accounts (NA)

- Large customers with multi-branch, multi-region rental needs.
- Governed by a Master Rental Agreement (MRA) negotiated by the National Account team.
- Features:
  - Pre-negotiated rates across all branches
  - Centralized billing (consolidated invoicing)
  - Authorized user lists
  - Custom reporting
  - Dedicated NA Account Manager
- **ISR Responsibilities:**
  - Verify the NA account number and authorized user before every transaction.
  - Apply NA rates (auto-populated in RentalMan).
  - Do **not** modify NA rates without NA Account Manager approval.
  - Escalate NA billing disputes to the NA Account Manager.

### 9.2 Local Accounts

- Customers who rent primarily from one or a few branches.
- Established through a credit application process.
- Credit terms are typically Net 30, subject to credit approval.
- **ISR Responsibilities:**
  - Assist with credit application submission if needed.
  - Verify account is in good standing before creating contracts.
  - Collect PO numbers when required by the account settings.
  - Handle billing inquiries and routine account maintenance.

### 9.3 Walk-In / COD (Cash on Delivery)

- Customers without an established credit account.
- Must prepay the full estimated rental amount plus deposit.
- Accepted payment: credit card (Visa, MC, AmEx, Discover) or cash.
- **ISR Responsibilities:**
  - Collect full payment before releasing equipment.
  - Obtain valid photo ID and copy for file.
  - Ensure RPP is offered (walk-in customers are higher risk).
  - Process refund of deposit overages upon equipment return.

### 9.4 Credit Application Process

1. Customer completes the UR Credit Application (available online or at the branch).
2. Application requires:
   - Business name, address, phone, tax ID / EIN
   - Ownership information
   - Bank references (minimum 1)
   - Trade references (minimum 3)
   - Estimated monthly rental volume
3. Application is submitted to the UR Credit Department.
4. Credit review typically takes 2–5 business days.
5. Customer is notified of approval/denial and credit limit.
6. Once approved, account is created in RentalMan with assigned credit terms.

---

## 10. Contract Terms & Conditions

### 10.1 Key Terms

- **Rental Period:** Begins when equipment leaves the branch yard (or is dispatched for delivery) and ends when the customer calls off-rent.
- **Risk of Loss:** Customer is responsible for the equipment from delivery through return, unless RPP is purchased.
- **Permitted Use:** Equipment may only be used for its intended purpose and within rated capacities.
- **Subletting Prohibited:** Customer may not sub-rent equipment to third parties without written UR consent.
- **Indemnification:** Customer indemnifies UR against third-party claims arising from equipment use.

### 10.2 Cancellation Policy

- Reservations can be cancelled without penalty prior to dispatch.
- Once equipment is dispatched, delivery fees may apply even if the rental is cancelled.
- Contracts cancelled after the equipment has been on-site are subject to minimum rental charges (typically 1 day).

### 10.3 Force Majeure

- Rental charges may be suspended during force majeure events (natural disasters, government-ordered shutdowns) at UR's discretion.
- Customer should contact their ISR or branch immediately in force majeure situations.

---

## 11. ISR Best Practices

1. **Always confirm the right equipment for the application.** Ask probing questions about the job — a wrong-sized machine costs the customer time and money.
2. **Quote the total cost.** Include rental, delivery, RPP, environmental charge, and estimated taxes.
3. **Set return expectations early.** Explain fuel, cleaning, and damage policies at the time of rental.
4. **Follow up on open quotes within 24 hours.** Speed wins in equipment rental.
5. **Document everything in RentalMan.** Notes on contracts are critical for dispute resolution.
6. **Cross-sell and up-sell.** Suggest attachments, safety equipment, and complementary machines.
7. **Build relationships.** Remember customer names, job details, and preferences.

---

*This document is maintained by the UR ISR Enablement & Operations team. For procedural questions not covered here, contact your Branch Manager or Regional ISR Lead.*
