/**
 * Mock equipment catalog and rental detail structures aligned with ur_kb_markdown.md.
 * Used by chat assist and CustomerInfoCard for equipment lookups and rental context.
 */

export type EquipmentCategory =
  | "earthmoving"
  | "aerial"
  | "forklifts"
  | "power_hvac"
  | "trench_safety"
  | "tools"
  | "trucks"
  | "specialty";

export type ActiveRental = {
  contract_number: string;
  equipment: string;
  equipment_category?: EquipmentCategory;
  start_date: string;
  scheduled_in?: string;
  jobsite: string;
  rate_tier?: "daily" | "weekly" | "monthly";
  rpp_included?: boolean;
};

export type EquipmentCatalogEntry = {
  id: string;
  name: string;
  category: EquipmentCategory;
  categoryLabel: string;
  description?: string;
  /** Indicative daily rate range (market reference from KB) */
  rate_daily_min?: number;
  rate_daily_max?: number;
  rate_weekly_min?: number;
  rate_weekly_max?: number;
  rate_monthly_min?: number;
  rate_monthly_max?: number;
  operator_cert_required?: boolean;
};

/** Sample catalog entries from KB §2 Product Catalog & §3 Rental Rates */
export const EQUIPMENT_CATALOG_SAMPLES: EquipmentCatalogEntry[] = [
  {
    id: "scissor-small",
    name: "Small Scissor Lift (19–20 ft)",
    category: "aerial",
    categoryLabel: "Aerial Work Platforms",
    description: "Electric; ideal for indoor/slab surfaces.",
    rate_daily_min: 100,
    rate_daily_max: 150,
    rate_weekly_min: 200,
    rate_weekly_max: 300,
    rate_monthly_min: 500,
    rate_monthly_max: 700,
    operator_cert_required: true,
  },
  {
    id: "scissor-large",
    name: "Large Scissor Lift (40–46 ft)",
    category: "aerial",
    categoryLabel: "Aerial Work Platforms",
    rate_daily_min: 250,
    rate_daily_max: 400,
    rate_weekly_min: 500,
    rate_weekly_max: 700,
    rate_monthly_min: 1200,
    rate_monthly_max: 1800,
    operator_cert_required: true,
  },
  {
    id: "boom-articulating",
    name: "Articulating Boom Lift (45–60 ft)",
    category: "aerial",
    categoryLabel: "Aerial Work Platforms",
    rate_daily_min: 350,
    rate_daily_max: 600,
    rate_weekly_min: 700,
    rate_weekly_max: 1200,
    rate_monthly_min: 2500,
    rate_monthly_max: 4000,
    operator_cert_required: true,
  },
  {
    id: "boom-telescopic",
    name: "Telescopic Boom Lift (80–185 ft)",
    category: "aerial",
    categoryLabel: "Aerial Work Platforms",
    rate_daily_min: 600,
    rate_daily_max: 1200,
    rate_weekly_min: 1500,
    rate_weekly_max: 3000,
    rate_monthly_min: 5000,
    rate_monthly_max: 10000,
    operator_cert_required: true,
  },
  {
    id: "mini-excavator",
    name: "Mini Excavator",
    category: "earthmoving",
    categoryLabel: "Earthmoving Equipment",
    rate_daily_min: 300,
    rate_daily_max: 500,
    rate_weekly_min: 700,
    rate_weekly_max: 1200,
    rate_monthly_min: 1800,
    rate_monthly_max: 3000,
  },
  {
    id: "excavator-full",
    name: "Full-Size Excavator",
    category: "earthmoving",
    categoryLabel: "Earthmoving Equipment",
    rate_daily_min: 800,
    rate_daily_max: 2000,
    rate_weekly_min: 2500,
    rate_weekly_max: 5000,
    rate_monthly_min: 8000,
    rate_monthly_max: 15000,
  },
  {
    id: "telehandler",
    name: "Telehandler / Reach Forklift",
    category: "forklifts",
    categoryLabel: "Forklifts & Material Handling",
    rate_daily_min: 400,
    rate_daily_max: 700,
    rate_weekly_min: 1000,
    rate_weekly_max: 2000,
    rate_monthly_min: 3000,
    rate_monthly_max: 5500,
    operator_cert_required: true,
  },
  {
    id: "generator-portable",
    name: "Portable Generator",
    category: "power_hvac",
    categoryLabel: "Power & HVAC",
    rate_daily_min: 150,
    rate_daily_max: 500,
    rate_weekly_min: 400,
    rate_weekly_max: 1200,
    rate_monthly_min: 1200,
    rate_monthly_max: 3500,
  },
  {
    id: "trench-box",
    name: "Trench Box 8ft x 20ft",
    category: "trench_safety",
    categoryLabel: "Trench Safety",
  },
  {
    id: "skid-steer",
    name: "Skid Steer Loader",
    category: "earthmoving",
    categoryLabel: "Earthmoving Equipment",
  },
];

/** Get active rentals for an account (mock). Used when we have account_id from persona or call record. */
export type CustomerRentalProfile = {
  account_id: string;
  customer_name: string;
  branch: string;
  account_type: "local" | "national" | "government" | "cash";
  credit_limit?: number;
  active_rentals: ActiveRental[];
  jobsites: string[];
};

const MOCK_RENTAL_PROFILES: Record<string, CustomerRentalProfile> = {
  "UR-10042": {
    account_id: "UR-10042",
    customer_name: "Marcus Rivera",
    branch: "Austin South #1247",
    account_type: "national",
    credit_limit: 75000,
    active_rentals: [
      {
        contract_number: "CNT-882910",
        equipment: "60ft Boom Lift",
        equipment_category: "aerial",
        start_date: "2026-02-28",
        scheduled_in: "2026-03-15",
        jobsite: "I-35 Overpass - Lot C",
        rate_tier: "monthly",
        rpp_included: true,
      },
      {
        contract_number: "CNT-882911",
        equipment: "Skid Steer Loader",
        equipment_category: "earthmoving",
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
    branch: "Columbus East #0834",
    account_type: "national",
    credit_limit: 250000,
    active_rentals: [
      {
        contract_number: "CNT-990412",
        equipment: "Trench Box 8ft x 20ft",
        equipment_category: "trench_safety",
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
    branch: "Portland NW #0291",
    account_type: "local",
    credit_limit: 25000,
    active_rentals: [],
    jobsites: ["Cedar Hills Residential Phase 2"],
  },
  "UR-45210": {
    account_id: "UR-45210",
    customer_name: "Sarah Lopez",
    branch: "Denver Central #0912",
    account_type: "local",
    credit_limit: 50000,
    active_rentals: [
      {
        contract_number: "CNT-771203",
        equipment: "32ft Electric Scissor Lift",
        equipment_category: "aerial",
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

export function getRentalProfileByAccount(
  accountId: string
): CustomerRentalProfile | null {
  return MOCK_RENTAL_PROFILES[accountId] ?? null;
}

export function searchEquipmentCatalog(query: string): EquipmentCatalogEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return EQUIPMENT_CATALOG_SAMPLES.slice(0, 5);
  return EQUIPMENT_CATALOG_SAMPLES.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.categoryLabel.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
  );
}

export function getEquipmentCatalogEntryById(
  id: string
): EquipmentCatalogEntry | null {
  const key = String(id || "").trim();
  if (!key) return null;
  return EQUIPMENT_CATALOG_SAMPLES.find((e) => e.id === key) ?? null;
}
