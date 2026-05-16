"use client";

import type { ReactNode } from "react";
import {
  Brain,
  CheckCircle,
  Loader2,
  Package,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type {
  CallRecord,
  ResolutionSuggestion,
} from "@/types/call-records";
import type { FirstTimeCallerSuggestionState } from "@/mock/new-customer-scenario";
import type { ProductOption } from "@/mock/product-catalog";
import { Tooltip } from "@/components/ui/tooltip";
import { EQUIPMENT_DETAILS } from "@/mock/new-customer-scenario";
import {
  getCustomerInfoForPersona,
  type PersonaCustomerProfile,
} from "@/mock/customer-personas";
import {
  getRentalProfileByAccount,
  searchEquipmentCatalog,
} from "@/mock/equipment-and-rentals";

interface SuggestionsPanelProps {
  /** New (preferred): append-only history of suggestions. */
  suggestions?: ResolutionSuggestion[];
  /** Back-compat: single suggestion (legacy). */
  suggestion?: ResolutionSuggestion | null;
  isLoading: boolean;
  isActive: boolean;
  /** True after at least one customer utterance is present in the transcript. */
  hasCustomerSpoken?: boolean;
  /** When user clicks "Say this" on the whisper/read-this-out line, send as agent response (audio + text) */
  onSayWhisper?: (text: string) => void;
  /** Demo-only product cards to help selling for new customers. */
  productRecommendations?: ProductOption[];
  /** Scenario-specific guidance for the scripted first-time caller experience. */
  firstTimeCustomerState?: FirstTimeCallerSuggestionState | null;
  /** Persona label for account snapshot (matches Customer Info). */
  personaLabel?: string;
  /** Call record when available for account fields. */
  callRecord?: CallRecord | null;
}

/** Shared panel chrome for Next steps / Equipment / Account — one color system. */
const SECTION_SHELL =
  "rounded-xl border border-slate-200 bg-slate-50/95 shadow-sm";

function toEquipmentIdFallback(label: string): string {
  const raw = String(label || "")
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return raw ? `custom-${raw}` : "custom-equipment";
}

function resolveEquipmentDetails(label: string): {
  id: string;
  title: string;
  description?: string;
  href: string;
} {
  const raw = (label || "").trim();
  const fromScenario = raw ? EQUIPMENT_DETAILS[raw] : undefined;

  const catalogHit = raw ? searchEquipmentCatalog(raw)[0] : undefined;
  const id = catalogHit?.id ?? toEquipmentIdFallback(fromScenario?.name ?? raw);
  const title = (fromScenario?.name ?? catalogHit?.name ?? raw) || "Equipment";
  const description = fromScenario?.description ?? catalogHit?.description;

  const lower = title.toLowerCase();
  const href =
    lower.includes("scissor") && lower.includes("lift")
      ? "https://www.unitedrentals.com/marketplace/equipment/aerial-work-platforms/scissor-lifts"
      : lower.includes("boom") && lower.includes("lift")
        ? "https://www.unitedrentals.com/marketplace/equipment/aerial-work-platforms/boom-lifts"
        : "https://www.unitedrentals.com/marketplace/equipment";

  return {
    id,
    title,
    description,
    href,
  };
}

function getFirstTimeOfferLink(label: string): string | null {
  const lower = String(label || "").toLowerCase();
  if (lower.includes("mini excavator")) {
    return "https://www.unitedrentals.com/marketplace/equipment/earthmoving-equipment/mini-excavators/3700-3900-lb-mini-excavator";
  }
  if (lower.includes("skid steer")) {
    return "https://www.unitedrentals.com/marketplace/equipment/earthmoving-equipment/skid-steers-compact-track-loaders/1700-1900-lb-skid-steer";
  }
  if (lower.includes("bucket")) {
    return "https://www.unitedrentals.com/marketplace/equipment/concrete-masonry/power-buggies-buckets/concrete-bucket-1-cubic-yd";
  }
  return null;
}

function AiSectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={cn(SECTION_SHELL, "p-3")}>
      <div className="flex items-center gap-2.5 pb-2.5 mb-2 border-b border-slate-200">
        <Icon
          className="size-[18px] shrink-0 text-indigo-600"
          strokeWidth={2.25}
          aria-hidden
        />
        <span className="text-[15px] font-bold text-slate-900 tracking-tight leading-tight">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function buildPersonaCustomer(
  record: CallRecord | null | undefined,
  personaOverride: PersonaCustomerProfile | null
): {
  name: string;
  account: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  memberSince: string | null;
  tier: string;
} {
  if (personaOverride) {
    return {
      name: personaOverride.name,
      account: personaOverride.account ?? null,
      email: personaOverride.email ?? null,
      phone: personaOverride.phone ?? null,
      location: personaOverride.location ?? null,
      memberSince: personaOverride.memberSince ?? null,
      tier: personaOverride.tier ?? "Premium",
    };
  }
  if (!record) {
    return {
      name: "Customer",
      account: "UR-001",
      email: "customer@example.com",
      phone: "+1 (555) 010-0000",
      location: "—",
      memberSince: "Jan 2024",
      tier: "Premium",
    };
  }
  const meta = record.call_summary;
  const name =
    meta.customer_name || record.account_name || "United Rentals Customer";
  const account = meta.customer_account ?? record.account_id ?? null;
  return {
    name,
    account,
    email: meta.customer_email ?? null,
    phone: meta.customer_phone ?? null,
    location: meta.branch ?? record.job_site ?? null,
    memberSince: meta.call_date ?? null,
    tier: "Premium",
  };
}

function AccountInformationSection({
  personaLabel,
  callRecord,
}: {
  personaLabel?: string;
  callRecord?: CallRecord | null;
}) {
  const personaCustomer = !callRecord
    ? getCustomerInfoForPersona(personaLabel)
    : null;
  const customer = buildPersonaCustomer(callRecord, personaCustomer);
  const accountId =
    callRecord?.call_summary?.customer_account ??
    callRecord?.account_id ??
    personaCustomer?.account ??
    null;
  const profile = accountId ? getRentalProfileByAccount(accountId) : null;

  const displayName = profile?.customer_name ?? customer.name;
  const branch = profile?.branch ?? customer.location;
  const accountType = profile?.account_type ?? null;
  const activeCount = profile?.active_rentals?.length ?? 0;
  const primaryJobsite = profile?.jobsites?.[0] ?? null;

  return (
    <div className={cn(SECTION_SHELL, "p-3")}>
      <div className="flex items-center gap-2.5 pb-2.5 mb-2 border-b border-slate-200">
        <UserRound
          className="size-[18px] shrink-0 text-indigo-600"
          strokeWidth={2.25}
          aria-hidden
        />
        <span className="text-[15px] font-bold text-slate-900 tracking-tight leading-tight">
          Account Information
        </span>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-2.5 mb-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-slate-900 leading-tight truncate">
              {displayName}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
              {accountId ? `Account #${accountId}` : "Account"}
              {customer.memberSince ? ` · ${customer.memberSince}` : ""}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="inline-flex rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 text-[9px] font-semibold">
              Active
            </span>
            {accountType === "national" ||
            (customer.tier && /national/i.test(customer.tier)) ? (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/90 px-2 py-0.5 text-[9px] font-semibold">
                National Account
              </span>
            ) : customer.tier ? (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200/80 px-2 py-0.5 text-[9px] font-semibold">
                {customer.tier}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Account overview
          </p>
          <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px]">
            {accountType && (
              <>
                <dt className="text-slate-500">Account type</dt>
                <dd className="text-slate-800 text-right capitalize">
                  {accountType === "national"
                    ? "National Account"
                    : accountType}
                </dd>
              </>
            )}
            {branch && (
              <>
                <dt className="text-slate-500">Assigned branch</dt>
                <dd className="text-slate-800 text-right truncate" title={branch}>
                  {branch}
                </dd>
              </>
            )}
            {customer.memberSince && (
              <>
                <dt className="text-slate-500">Customer since</dt>
                <dd className="text-slate-800 text-right truncate">
                  {customer.memberSince}
                </dd>
              </>
            )}
            {profile?.credit_limit != null && (
              <>
                <dt className="text-slate-500">Credit limit</dt>
                <dd className="text-slate-800 text-right tabular-nums">
                  ${profile.credit_limit.toLocaleString()}
                </dd>
              </>
            )}
          </dl>
        </div>

        <div className="border-t border-slate-200/90 pt-2">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Primary contact
          </p>
          <dl className="space-y-1 text-[11px]">
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500 shrink-0">Name</dt>
              <dd className="text-slate-800 text-right truncate">{customer.name}</dd>
            </div>
            {customer.phone && (
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500 shrink-0">Phone</dt>
                <dd className="text-primary text-right font-medium truncate">
                  {customer.phone}
                </dd>
              </div>
            )}
            {customer.email && (
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500 shrink-0">Email</dt>
                <dd className="text-primary text-right font-medium truncate">
                  {customer.email}
                </dd>
              </div>
            )}
            {primaryJobsite && (
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500 shrink-0">Primary job site</dt>
                <dd className="text-slate-800 text-right line-clamp-2">
                  {primaryJobsite}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {profile && (activeCount > 0 || profile.jobsites.length > 0) && (
          <div className="border-t border-slate-200/90 pt-2">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Rental activity
            </p>
            <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
              <dt className="text-slate-500">Active rentals</dt>
              <dd className="text-slate-800 text-right tabular-nums">
                {activeCount} unit{activeCount === 1 ? "" : "s"}
              </dd>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

export function SuggestionsPanel({
  suggestions,
  suggestion,
  isLoading,
  isActive,
  hasCustomerSpoken = false,
  productRecommendations: _productRecommendations = [],
  firstTimeCustomerState,
  personaLabel,
  callRecord,
}: SuggestionsPanelProps) {
  const suggestionList =
    suggestions ??
    (suggestion ? [suggestion] : []);
  const s =
    suggestionList.length > 0
      ? suggestionList[suggestionList.length - 1]
      : null;
  const isNewCustomerGuidanceMode = !!firstTimeCustomerState;
  // In "first time caller" scripted mode, the resolution agent can sometimes emit
  // identical suggestion text across consecutive turns. Keep the append-only
  // history behavior, but hide exact duplicates so the user always sees variety.
  const displaySuggestionList = (() => {
    if (!isNewCustomerGuidanceMode) return suggestionList;
    const seen = new Set<string>();
    const unique: ResolutionSuggestion[] = [];
    for (const item of suggestionList) {
      const rawText = item.off_topic
        ? (item.message || "").trim()
        : (item.whisper_response || "").trim();
      const key = rawText.replace(/\s+/g, " ").trim().toLowerCase();
      if (!key) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(item);
    }
    return unique;
  })();

  const showEmpty = !isActive && displaySuggestionList.length === 0;
  const showWaitingForCustomer =
    isActive && displaySuggestionList.length === 0 && !hasCustomerSpoken;
  const showAnalyzing =
    isActive &&
    displaySuggestionList.length === 0 &&
    hasCustomerSpoken &&
    !firstTimeCustomerState;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div className="shrink-0 h-11 px-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="size-4 text-indigo-600" strokeWidth={2.25} />
          <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">
            Live Assist
          </h3>
        </div>
        {isLoading && (
          <Loader2 className="size-4 animate-spin text-indigo-600" />
        )}
      </div>

      {/* Body */}
      {showEmpty ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-gray-400 text-center px-6">
            Start a call to receive real-time AI suggestions.
          </p>
        </div>
      ) : showWaitingForCustomer ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
          <p className="text-sm text-gray-500 text-center">
            Waiting for the customer to speak.
          </p>
          <p className="text-xs text-gray-400 text-center">
            Once the customer talks, AI suggestions will begin.
          </p>
        </div>
      ) : showAnalyzing ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
          <Loader2 className="size-6 animate-spin text-primary/40" />
          <p className="text-sm text-gray-500 text-center">
            Analyzing transcript...
          </p>
          <p className="text-xs text-gray-400 text-center">
            Suggestions will appear here as the conversation progresses.
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4 space-y-3">
            {firstTimeCustomerState && (
              <div className="space-y-3">
                <AiSectionCard icon={CheckCircle} title="Next steps">
                  {displaySuggestionList.length > 0 ||
                  firstTimeCustomerState.clarifyingQuestions.length > 0 ? (
                    <ol className="list-decimal pl-5 space-y-1.5 text-[13px] leading-relaxed break-words marker:font-semibold marker:text-indigo-600 text-slate-800">
                      {displaySuggestionList.map((item, idx) => {
                        const text = item.off_topic
                          ? (item.message || "").trim()
                          : (item.whisper_response || "").trim();
                        if (!text) return null;
                        return (
                          <li
                            key={`s-${idx}`}
                            className={cn(
                              "whitespace-pre-line",
                              item.off_topic ? "text-amber-800" : "text-slate-800"
                            )}
                          >
                            {text}
                          </li>
                        );
                      })}
                      {firstTimeCustomerState.clarifyingQuestions.map((q, idx) => (
                        <li
                          key={`q-${idx}`}
                          className="text-xs font-medium text-slate-800 break-words"
                        >
                          {q}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-[13px] leading-relaxed text-slate-800 break-words">
                      {firstTimeCustomerState.intentSummary}
                    </p>
                  )}
                </AiSectionCard>

                <AiSectionCard icon={Package} title="Equipment to offer">
                  {firstTimeCustomerState.equipmentToOffer.length > 0 ? (
                    <ol className="list-decimal pl-4 space-y-2">
                      {firstTimeCustomerState.equipmentToOffer.map(
                        (item, idx) => {
                          const details = EQUIPMENT_DETAILS[item];
                          const label = details?.name ?? item;
                          const description = details?.description;
                          const tooltipText = description || item;
                          const link = getFirstTimeOfferLink(label);
                          return (
                            <li
                              key={idx}
                              className="text-xs text-slate-800 break-words"
                            >
                              <div className="font-medium">
                                <Tooltip content={tooltipText} side="right">
                                  {link ? (
                                    <a
                                      href={link}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-indigo-700 hover:text-indigo-900 hover:underline"
                                    >
                                      {label}
                                    </a>
                                  ) : (
                                    <span>{label}</span>
                                  )}
                                </Tooltip>
                              </div>
                            </li>
                          );
                        }
                      )}
                    </ol>
                  ) : (
                    <p className="text-[11px] text-slate-500">
                      No equipment listed yet.
                    </p>
                  )}
                </AiSectionCard>

                <AccountInformationSection
                  personaLabel={personaLabel}
                  callRecord={callRecord}
                />
              </div>
            )}

            {!isNewCustomerGuidanceMode && suggestionList.length > 0 && s && (
              <div className="space-y-3">
                <AiSectionCard icon={CheckCircle} title="Next steps">
                  {s.off_topic && (s.message || "").trim() ? (
                    <p className="text-[13px] leading-relaxed text-amber-800 break-words whitespace-pre-line">
                      {(s.message || "").trim()}
                    </p>
                  ) : (
                    (() => {
                      const steps =
                        Array.isArray(s.resolution_steps) &&
                        s.resolution_steps.filter(
                          (step) =>
                            (step.action || "").trim() ||
                            (step.detail || "").trim()
                        );
                      return steps && steps.length > 0 ? (
                        <div className="space-y-2">
                          {steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-xs font-bold text-indigo-600 mt-0.5 shrink-0 tabular-nums">
                                {step.step}.
                              </span>
                              <div className="min-w-0">
                                <div className="text-xs font-medium text-slate-800 break-words">
                                  {(step.action || "").trim() || "—"}
                                </div>
                                {(step.detail || "").trim() ? (
                                  <div className="text-[11px] text-slate-500 mt-0.5 break-words">
                                    {step.detail}
                                  </div>
                                ) : null}
                                {step.system_reference &&
                                  step.system_reference !== "null" && (
                                    <Badge
                                      variant="outline"
                                      className="mt-1 text-[9px] h-[16px] bg-white border-slate-200"
                                    >
                                      {step.system_reference}
                                    </Badge>
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-500">
                          No resolution steps yet.
                        </p>
                      );
                    })()
                  )}
                </AiSectionCard>

                <AiSectionCard icon={Package} title="Equipment Information">
                  {s.equipment_info &&
                  Array.isArray(s.equipment_info.mentioned) &&
                  s.equipment_info.mentioned.length > 0 ? (
                    <>
                      <div className="space-y-2">
                        {s.equipment_info.mentioned.map((eq, i) => {
                          const details = resolveEquipmentDetails(eq);
                          return (
                            <div
                              key={i}
                              className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <Badge
                                      variant="outline"
                                      className="text-[10px] bg-white border-slate-200 shrink-0"
                                    >
                                      Equipment
                                    </Badge>
                                    <p
                                      className="text-xs font-semibold text-slate-900 truncate"
                                      title={details.title}
                                    >
                                      {details.title}
                                    </p>
                                  </div>
                                  {details.description ? (
                                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                                      {details.description}
                                    </p>
                                  ) : null}
                                </div>
                                <a
                                  href={details.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 hover:underline shrink-0"
                                >
                                  View equipment →
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {s.equipment_info.certification_required && (
                        <p className="text-[11px] text-amber-700 mt-2 break-words">
                          Certification required:{" "}
                          {s.equipment_info.certification_required}
                        </p>
                      )}
                      {Array.isArray(s.equipment_info.accessories_to_suggest) &&
                        s.equipment_info.accessories_to_suggest.length > 0 && (
                          <p className="text-[11px] text-gray-500 mt-1 break-words">
                            Accessories:{" "}
                            {s.equipment_info.accessories_to_suggest.join(", ")}
                          </p>
                        )}
                    </>
                  ) : (
                    <p className="text-[11px] text-slate-500">
                      No equipment identified in this conversation yet.
                    </p>
                  )}
                </AiSectionCard>

                <AccountInformationSection
                  personaLabel={personaLabel}
                  callRecord={callRecord}
                />
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
