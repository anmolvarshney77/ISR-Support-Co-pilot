import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Aligned with customer-personas.ts and ur_kb_markdown (account types, branches, rental details). */
const DUMMY_CUSTOMERS: Record<string, Record<string, unknown>> = {
  "UR-10042": {
    account_id: "UR-10042",
    customer_name: "Marcus Rivera",
    email: "marcus.rivera@riveracontracting.com",
    phone: "+1 (555) 019-8841",
    branch: "Austin South #1247",
    account_type: "national",
    account_status: "active",
    credit_limit: 75000,
    total_rentals: 34,
    last_contact_date: "2026-03-04",
    last_contact_reason: "new_reservation",
    notes: [
      "Prefers morning deliveries before 8 AM",
      "Has operator certs for aerial and forklift",
      "Recurring customer — highway overpass project Q1-Q3 2026",
    ],
    active_rentals: [
      {
        contract_number: "CNT-882910",
        equipment: "60ft Boom Lift",
        start_date: "2026-02-28",
        scheduled_in: "2026-03-15",
        jobsite: "I-35 Overpass - Lot C",
        rate_tier: "monthly",
        rpp_included: true,
      },
      {
        contract_number: "CNT-882911",
        equipment: "Skid Steer Loader",
        start_date: "2026-03-01",
        scheduled_in: "2026-03-20",
        jobsite: "I-35 Overpass - Lot C",
        rate_tier: "monthly",
        rpp_included: true,
      },
    ],
    jobsites: ["I-35 Overpass - Lot C", "Riverside Warehouse"],
  },
  "UR-20078": {
    account_id: "UR-20078",
    customer_name: "Jennifer Park",
    email: "jennifer.park@northwoodbuilders.com",
    phone: "+1 (555) 014-2289",
    branch: "Columbus East #0834",
    account_type: "national",
    account_status: "active",
    credit_limit: 250000,
    total_rentals: 187,
    last_contact_date: "2026-03-09",
    last_contact_reason: "billing_inquiry",
    notes: [
      "National account — 12 branches authorized",
      "Quarterly rate review scheduled April 2026",
      "Key contact for Midwest region projects",
    ],
    active_rentals: [
      {
        contract_number: "CNT-990412",
        equipment: "Trench Box 8ft x 20ft",
        start_date: "2026-02-15",
        scheduled_in: "2026-03-22",
        jobsite: "Dublin Water Main Replacement",
        rate_tier: "weekly",
        rpp_included: true,
      },
    ],
    jobsites: [
      "Dublin Water Main Replacement",
      "Westerville Sewer Line",
      "Hilliard Commercial Park",
    ],
  },
  "UR-30155": {
    account_id: "UR-30155",
    customer_name: "David Chen",
    email: "david.chen@cedarconstruction.com",
    phone: "+1 (555) 017-4432",
    branch: "Portland NW #0291",
    account_type: "local",
    account_status: "active",
    credit_limit: 25000,
    total_rentals: 12,
    last_contact_date: "2026-02-20",
    last_contact_reason: "quote",
    notes: [
      "Seasonal customer — busy March through October",
      "Needs operator certification for mini excavator",
    ],
    active_rentals: [],
    jobsites: ["Cedar Hills Residential Phase 2"],
  },
  "UR-45210": {
    account_id: "UR-45210",
    customer_name: "Sarah Lopez",
    email: "sarah.lopez@brightwaypainting.com",
    phone: "+1 (555) 018-3307",
    branch: "Denver Central #0912",
    account_type: "local",
    account_status: "active",
    credit_limit: 50000,
    total_rentals: 22,
    last_contact_date: "2026-03-10",
    last_contact_reason: "new_reservation",
    notes: [
      "Premium Plus tier",
      "Frequently rents electric scissor lifts for indoor work",
    ],
    active_rentals: [
      {
        contract_number: "CNT-771203",
        equipment: "32ft Electric Scissor Lift",
        start_date: "2026-03-10",
        scheduled_in: "2026-03-24",
        jobsite: "Brightway Painting - Downtown",
        rate_tier: "weekly",
        rpp_included: true,
      },
    ],
    jobsites: ["Brightway Painting - Downtown"],
  },
};

const updateLog: Record<string, unknown>[] = [];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accountId = searchParams.get("account_id");

  if (!accountId) {
    return NextResponse.json(
      { error: "account_id query parameter is required" },
      { status: 400 }
    );
  }

  const customer = DUMMY_CUSTOMERS[accountId];
  if (!customer) {
    return NextResponse.json(
      { error: `Customer ${accountId} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(customer, { status: 200 });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const accountId = body.account_id;

    if (!accountId) {
      return NextResponse.json(
        { error: "account_id is required in request body" },
        { status: 400 }
      );
    }

    const logEntry = {
      ...body,
      updated_at: new Date().toISOString(),
      _source: "post-call-summary-agent",
    };
    updateLog.push(logEntry);

    if (DUMMY_CUSTOMERS[accountId]) {
      const record = DUMMY_CUSTOMERS[accountId];
      if (body.last_contact_date) record.last_contact_date = body.last_contact_date;
      if (body.last_contact_reason) record.last_contact_reason = body.last_contact_reason;
      if (body.notes_to_add) {
        (record.notes as string[]).push(body.notes_to_add);
      }
      if (body.new_jobsite) {
        (record.jobsites as string[]).push(body.new_jobsite);
      }
      if (body.status_change) record.account_status = body.status_change;
    }

    console.log("[CRM Update]", JSON.stringify(logEntry, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: `Customer record ${accountId} updated successfully`,
        updated_at: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
