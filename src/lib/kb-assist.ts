/**
 * Knowledge-base assist: builds chat assist answers from ur_kb_markdown.md content.
 * Used by CustomerAssistChat to return comprehensive, KB-aligned responses.
 */

import {
  getRentalProfileByAccount,
  searchEquipmentCatalog,
  type CustomerRentalProfile,
} from "@/mock/equipment-and-rentals";

export type CustomerContext = {
  name?: string;
  accountId?: string;
  personaLabel?: string;
};

/** Match user question to KB topic and return a rich answer. */
export function buildKbAnswer(
  question: string,
  customerContext?: CustomerContext | null
): string {
  const q = question.trim().toLowerCase();
  const hasAccount = Boolean(customerContext?.accountId);
  const profile: CustomerRentalProfile | null = hasAccount
    ? getRentalProfileByAccount(customerContext!.accountId!)
    : null;

  // --- Billing & off-rent (KB §3.5, §15.1) ---
  if (
    /off-rent|off rent|stop billing|when does billing stop|confirmation number|grace period/.test(
      q
    )
  ) {
    let msg =
      "**Off-rent & billing (from KB)**\n\n" +
      "• Billing **stops when the customer calls** to put equipment off rent — not when it is physically picked up.\n" +
      "• The customer receives an **Off-Rent Confirmation Number** on that call — always note it.\n" +
      "• Equipment may sit on the jobsite after the off-rent call with **zero additional charge**.\n" +
      "• Grace period = time between off-rent call and actual pickup (free to customer).\n" +
      "• **#1 dispute cause:** Verbal \"grace period\" promises — always obtain the confirmation number in writing.\n" +
      "• Escalation: Account Services **1-833-459-9575**.";
    if (profile?.active_rentals?.length) {
      msg += `\n\n*For ${profile.customer_name} (${profile.account_id}), current active rentals: ${profile.active_rentals.map((r) => r.contract_number).join(", ")}. Remind them to call off-rent when done.*`;
    }
    return msg;
  }

  if (
    /overcharg|unexpected fee|invoice dispute|billing dispute|refueling charge|environmental charge|late payment fee/.test(
      q
    )
  ) {
    return (
      "**Billing disputes (KB §15.1)**\n\n" +
      "• **Overcharged after return:** Ask for Off-Rent Confirmation Number; verify Rental Out / Scheduled In dates; check if equipment was used after off-rent. Escalate to Account Services 1-833-459-9575.\n" +
      "• **Unexpected fees:** Identify fee type (Environmental, Refueling, Delivery, Tolling, Mileage); cross-reference rental agreement. Refueling: confirm if equipment was returned with full tank.\n" +
      "• **Late payment fee:** 2% per month (24% p.a.) after 30 days — contractual. Goodwill waiver → branch manager.\n" +
      "• **RPP damage charge:** Confirm RPP was purchased; limits are 10% replacement value, 10% repair cost, or $500 (whichever is lesser). Exclusions: tire, misuse. Escalate for inspection report."
    );
  }

  // --- Rental rates & fees (KB §3) ---
  if (
    /rate|pricing|price|cost|how much|fee|daily|weekly|monthly|tier/.test(q) &&
    !/off-rent|dispute|invoice/.test(q)
  ) {
    let msg =
      "**Rental rates & fees (KB §3)**\n\n" +
      "• **Rate tiers:** Daily (8 hr), Weekly (40 hr), Monthly (28 days / 160 hr). Rates are **location-dependent** — use ZIP in catalog for exact pricing.\n" +
      "• Online/app orders get **exclusive discounted rates**. Corporate accounts may have custom pricing.\n" +
      "• **Mandatory fees:** Delivery & Pickup Service Charge, Environmental Service Charge (certain rentals; work orders 2% of service fees, max $99), state/local taxes, transportation surcharges for oversized equipment.\n" +
      "• **Avoidable fees:** Refueling (return full tank); Late payment (pay on time); Credit card surcharge 2% (use ACH/check); Tolling (+ $3.30 admin); Excess cleaning (return clean).\n" +
      "• **Cost savings:** Book online/app; weekly beats 4+ daily; monthly beats ~18 daily; Total Control users save 15–35% annually; call off-rent as soon as equipment not needed.";
    const equipmentMatch = q.match(/scissor|boom|excavator|generator|telehandler|trench|lift/i);
    if (equipmentMatch) {
      const results = searchEquipmentCatalog(equipmentMatch[0]);
      if (results.length) {
        const e = results[0];
        msg += `\n\n*Indicative rates for **${e.name}**:* Daily ~$${e.rate_daily_min}–${e.rate_daily_max}; Weekly ~$${e.rate_weekly_min}–${e.rate_weekly_max}; Monthly ~$${e.rate_monthly_min}–${e.rate_monthly_max}. (Verify with branch or catalog by ZIP.)`;
      }
    }
    return msg;
  }

  // --- Equipment catalog & availability (KB §2, §4) ---
  if (
    /equipment|availability|inventory|catalog|scissor|boom|excavator|forklift|generator|trench|rent/.test(
      q
    ) &&
    !/rate|price|cost|billing|invoice/.test(q)
  ) {
    const results = searchEquipmentCatalog(q);
    let msg =
      "**Equipment catalog & availability (KB §2, §4)**\n\n" +
      "• United Rentals offers **4,800+ equipment classes**, ~690,000+ units. Catalog: unitedrentals.com/marketplace/equipment — filter by ZIP + dates for real-time availability and rates.\n" +
      "• **Availability:** Enter ZIP + dates online; low-inventory alert in cart; date flexibility and substitution engine (e.g. 19-ft vs 20-ft scissor). Branch can source from network. Phone: **844-873-4948**.\n" +
      "• **OSHA:** Operator certification required for aerial lifts (boom, scissor). CDL may be required for large trucks per state.";
    if (results.length) {
      msg += "\n\n*Sample matches from catalog:*\n";
      results.slice(0, 3).forEach((e) => {
        const rateStr =
          e.rate_daily_min != null
            ? ` — Daily ~$${e.rate_daily_min}–${e.rate_daily_max}`
            : "";
        msg += `• ${e.name} (${e.categoryLabel})${rateStr}\n`;
      });
    }
    return msg;
  }

  // --- Delivery & ETA (KB §5) ---
  if (
    /delivery|eta|pickup|lead time|when will|not delivered|wrong equipment|breakdown/.test(
      q
    )
  ) {
    return (
      "**Delivery, ETA & pickup (KB §5, §15.2)**\n\n" +
      "• **Lead times:** Standard guarantee for orders with **72+ hours' notice** (enterprise). Short-notice (<24 hrs) possible but not guaranteed. Same-day not standard SLA.\n" +
      "• **ETA tracking:** Mobile app shows Preparing → En Route → Delivered for deliveries within 24 hours.\n" +
      "• **Pickup (off-rent):** Customer calls off-rent → billing stops; confirmation number issued. Physical pickup timing varies; customer not charged for days equipment sits after off-rent. Expedite pickup: **1-833-459-9575**.\n" +
      "• **Equipment not delivered on time:** Check app status; verify 72-hr lead time; escalate 1-833-459-9575.\n" +
      "• **Wrong equipment delivered:** Do not use; call 844-873-4948 immediately; document with photos.\n" +
      "• **Breakdown on jobsite:** Service request via app with photos, or call 844-873-4948 (24/7); track tech ETA in app."
    );
  }

  // --- RPP & protection (KB §8) ---
  if (
    /rpp|rental protection|insurance|damage waiver|warranty|united guard/.test(
      q
    )
  ) {
    return (
      "**Rental Protection & warranty (KB §8, §12)**\n\n" +
      "**Rental Protection Plan (RPP)**\n" +
      "• Damage waiver product (not insurance). Mandatory unless customer has qualifying property insurance (per Section 22 US Rental Service Terms).\n" +
      "• **With RPP:** Customer liability = lesser of 10% replacement value, 10% repair cost, or $500 (+tax). Passenger vehicles: amounts above first $7,500 per period; RPP rate 25% of rental.\n" +
      "• Exclusions: tires (most states), misuse, unauthorized operator, willful misconduct. Claim: local store or **844-873-4948**.\n\n" +
      "**United Guard™ (purchased equipment)**\n" +
      "• Service contract for new/used equipment from UR. Equipment >$2,500, ≤9 years old. Enroll **within 72 hours** of purchase. Terms: 3, 6, or 12 months. Vehicles not eligible."
    );
  }

  // --- Total Control & digital (KB §6, §7) ---
  if (
    /total control|mobile app|login|portal|can't find|invoice not showing|web pin/.test(
      q
    )
  ) {
    return (
      "**Total Control® & mobile app (KB §6, §7)**\n\n" +
      "• **Portal:** totalcontrol.ur.com | Support: **844-474-8520** | totalcontrol@ur.com\n" +
      "• **Login:** Use same email/password as main UR account. If account not linked, use **Web PIN** from sales rep or email totalcontrol@ur.com with name, phone, email, account number(s).\n" +
      "• **Can't find a rental:** Confirm account is linked; check cost center or PO. Contact TC support.\n" +
      "• **Invoice not in portal:** Check Invoices tab (filter Paid/Unpaid); confirm billing cycle. Account Services **1-833-459-9575**.\n" +
      "• **Mobile app:** 24/7 browse, reserve, track delivery (Preparing → En Route → Delivered), service requests with photos, one-tap return/extension, on-demand pickup."
    );
  }

  // --- Account & credit (KB §6) ---
  if (/credit application|account type|apply|new account/.test(q)) {
    return (
      "**Account & credit (KB §6)**\n\n" +
      "• **Apply:** unitedrentals.com/services/credit-application or any branch.\n" +
      "• **Account types:** Cash (confirm with branch); Credit (invoice, 30-day terms); Corporate/Enterprise (multi-site, custom pricing, PO); Government (contract pricing).\n" +
      "• Credit account: 2% surcharge on credit card payments (where permitted); late payment 2%/month (24% p.a.) after 30 days. Questions: **1-833-459-9575**."
    );
  }

  // --- Training (KB §13) ---
  if (/training|certification|united academy|operator cert|osha/.test(q)) {
    return (
      "**Training – United Academy (KB §13)**\n\n" +
      "• North America's largest safety training provider for equipment rental. 730,000+ trained; 100+ certified trainers.\n" +
      "• **Delivery:** Online (24/7), in-person (customer site or 486+ UR locations), virtual classroom, VR/AR simulators (MEWP, forklift).\n" +
      "• **Courses:** Aerial/MEWP & forklift certification, OSHA 10/30, fall protection, trench/excavation, confined space, first aid/CPR, ANSI A92, train-the-trainer. English, Spanish, French.\n" +
      "• **Support:** **1-844-222-2345** Option #1 | Mon–Fri 8am–6:30pm EST."
    );
  }

  // --- Escalation & contacts (KB §16) ---
  if (
    /escalat|contact|phone number|customer care|support|who do i call/.test(
      q
    )
  ) {
    return (
      "**Support contacts (KB §16)**\n\n" +
      "| Contact | Number | Hours |\n" +
      "|---------|--------|-------|\n" +
      "| Main Customer Care | **844-873-4948** | 24/7 |\n" +
      "| Account Services | **1-833-459-9575** | Business (24/7 emergencies) |\n" +
      "| Total Control Support | **844-474-8520** | Business |\n" +
      "| United Academy | **1-844-222-2345** Opt #1 | Mon–Fri 8am–6:30pm EST |\n\n" +
      "**Escalation path:** Branch manager → Account Services → Main Customer Care. Online requests get 2× faster response than email/fax."
    );
  }

  // --- Customer-specific: active rentals & profile ---
  if (
    (hasAccount && profile && /rental|active|current|equipment|contract|jobsite/.test(q)) ||
    /my rental|my equipment|what do i have/.test(q)
  ) {
    if (profile?.active_rentals?.length) {
      let msg = `**Active rentals for ${profile.customer_name} (${profile.account_id})**\n\n`;
      msg += `Branch: ${profile.branch} | Account: ${profile.account_type} | Credit limit: $${profile.credit_limit?.toLocaleString() ?? "—"}\n\n`;
      profile.active_rentals.forEach((r) => {
        msg += `• **${r.contract_number}** — ${r.equipment}\n  Jobsite: ${r.jobsite} | Out: ${r.start_date}${r.scheduled_in ? ` | Scheduled in: ${r.scheduled_in}` : ""} | RPP: ${r.rpp_included ? "Yes" : "No"}\n`;
      });
      msg += "\n*Remind customer to call off-rent when equipment is no longer needed; billing stops at that call.*";
      return msg;
    }
    if (profile) {
      return (
        `**Profile for ${profile.customer_name} (${profile.account_id})**\n\n` +
        `Branch: ${profile.branch} | Account type: ${profile.account_type} | Credit limit: $${profile.credit_limit?.toLocaleString() ?? "—"}\n` +
        `Jobsites: ${profile.jobsites.join(", ")}\n\n` +
        `No active rentals on file. They can reserve at unitedrentals.com/marketplace/equipment or call **844-873-4948**.*`
      );
    }
  }

  // --- Company overview (KB §1) ---
  if (/company|who is united|overview|fleet|locations/.test(q)) {
    return (
      "**Company overview (KB §1)**\n\n" +
      "United Rentals, Inc. (NYSE: URI) — world's largest equipment rental company (~16% NA market share).\n" +
      "• **Fleet:** ~4,800 equipment classes, ~690,000+ units, ~$20.59B OEC (2025).\n" +
      "• **Locations:** 1,625+ (1,504 NA, 38 Europe, 23 Australia, 19 NZ). 49 US states + Puerto Rico + all Canadian provinces.\n" +
      "• **Revenue 2024:** $15.35B. HQ: Stamford, CT. CEO: Matthew Flannery.\n" +
      "• Key competitors: Sunbelt Rentals, Herc Holdings."
    );
  }

  // --- Used equipment & financing (KB §10, §11) ---
  if (/used equipment|buy|purchase|financing|lease|rpo|efa/.test(q)) {
    return (
      "**Used equipment & financing (KB §10, §11)**\n\n" +
      "**Used sales:** used.unitedrentals.com — 4,000+ classes; inspected & serviced; UR guarantee. Delivery & financing in US/Canada. Spring Sale / Blue Thursday events.\n\n" +
      "**Financing:** Equipment Finance Agreement (EFA) 12–60 mo; Rental Purchase Option (RPO) 6 or 12 mo (min $10K, United Guard required). Lease options: $1 purchase, 10% purchase, seasonal, lease-to-own. 1-hour approvals; up to 100% financing via Captive Capital. Apply: unitedrentals.com/services/credit-application."
    );
  }

  // Default: acknowledge and point to main resources
  let fallback =
    "I didn’t find an exact match in the knowledge base for that question. Here are useful resources:\n\n" +
    "• **Equipment & rates:** unitedrentals.com/marketplace/equipment (ZIP + dates)\n" +
    "• **Customer Care (24/7):** 844-873-4948\n" +
    "• **Account Services:** 1-833-459-9575\n" +
    "• **Total Control:** totalcontrol.ur.com | 844-474-8520\n" +
    "• **Off-rent / billing:** Billing stops when customer *calls* off-rent; get confirmation number.\n\n" +
    "Try asking about **rates**, **off-rent**, **delivery**, **RPP**, **Total Control**, or **escalation** for detailed answers.";
  if (customerContext?.name) {
    fallback = `*Context: Customer ${customerContext.name}${customerContext.accountId ? ` (${customerContext.accountId})` : ""}.*\n\n` + fallback;
  }
  return fallback;
}
