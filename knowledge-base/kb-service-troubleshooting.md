# United Rentals — Service & Equipment Troubleshooting Guide

> **Last Updated:** March 2026
> **Source of Truth for:** ISR Co-Pilot Equipment Issue Resolution, Field Service Coordination, Escalation Procedures

---

## 1. Troubleshooting Philosophy

When a customer reports an equipment issue, the ISR's goal is to **minimize downtime** for the customer. The resolution path follows this priority order:

1. **Resolve by phone** — Walk the customer through a simple fix (operator error, reset procedure).
2. **Dispatch field service** — Send a mechanic to the jobsite to repair on-site.
3. **Swap the equipment** — Deliver a replacement unit and pick up the non-functional one.
4. **Escalate** — Involve the Branch Manager, Service Manager, or Specialty team for complex situations.

> **Key Principle:** Never leave a customer without a working solution. If field service cannot fix the issue same-day, offer a swap.

---

## 2. Universal Troubleshooting Steps (All Equipment)

Before diving into category-specific troubleshooting, run through these universal checks with the customer:

### 2.1 Pre-Diagnostic Checklist

| Step | Question / Action | Why |
|---|---|---|
| 1 | "Is the operator trained and certified on this equipment?" | Many issues stem from operator unfamiliarity |
| 2 | "When did the issue first occur? Was the machine working earlier today?" | Identifies intermittent vs. sudden failure |
| 3 | "Are there any warning lights, fault codes, or alarms displayed?" | Fault codes narrow the diagnosis significantly |
| 4 | "Has the machine been involved in any impact, tip-over, or unusual event?" | Damage-related issues require different handling |
| 5 | "Is the fuel tank at least 1/4 full?" | Low fuel causes many startup and power issues |
| 6 | "Are all safety devices in their normal position (outriggers, guardrails, pins)?" | Safety interlocks prevent operation when not set |
| 7 | "Has the machine been sitting idle for more than 48 hours?" | Cold weather, dead batteries, condensation |

### 2.2 Resolution Decision Tree

```
Customer Reports Equipment Issue
│
├─ Is it operator error or training gap?
│   ├─ YES → Guide the operator through correct procedure
│   │         Offer United Academy training if needed
│   │         Document in RentalMan notes
│   └─ NO ↓
│
├─ Can the issue be resolved over the phone?
│   ├─ YES → Walk through troubleshooting steps
│   │         Document resolution in RentalMan
│   │         Follow up within 2 hours to confirm
│   └─ NO ↓
│
├─ Does it require field service?
│   ├─ YES → Create a Service Ticket in RentalMan
│   │         Provide customer with estimated response time
│   │         If ETA > 4 hours and customer is critical, offer swap
│   └─ NO ↓
│
├─ Does it need an immediate equipment swap?
│   ├─ YES → Check branch availability for replacement
│   │         If available → schedule swap delivery
│   │         If not available → check neighboring branches
│   │         If no availability → escalate to Branch Manager
│   └─ NO ↓
│
└─ Escalate to Branch Manager / Service Manager
    └─ Complex issues, repeat failures, safety concerns, customer dissatisfaction
```

---

## 3. Aerial Work Platforms — Common Issues

### 3.1 Platform Will Not Elevate

| Possible Cause | Phone Troubleshooting | Field Service Needed? |
|---|---|---|
| Safety interlock not engaged | Guide operator to verify: outriggers fully deployed (booms), guardrails locked, platform gate closed, foot switch engaged | No |
| Emergency stop button pressed | Have operator check E-stop on platform AND ground controls — twist to release | No |
| Dead battery / low charge | For electric scissors: check battery charge indicator. If depleted, connect to charger for 30 min minimum. For engine-powered: check battery disconnect switch. | No (if charging resolves); Yes (if battery is dead/won't hold charge) |
| Hydraulic oil level low | Check hydraulic oil sight glass on the base — if below minimum, do NOT operate. Needs field service to add fluid and inspect for leaks. | Yes |
| Ground not level (tilt alarm) | Machine has a tilt sensor. Must be on level ground within specs (typically ≤3° for scissors, ≤5° for booms). Reposition machine. | No |
| Hydraulic leak | Visible oil leak under machine or on boom/cylinder. Do NOT operate. Requires field service. | Yes — Priority |
| Control system fault code | Note the fault code displayed. Some are resettable by cycling the key off/on. If code persists, field service needed. | Likely Yes |
| Weight overload warning | Reduce load in platform to within rated capacity. Check rating placard. | No |

### 3.2 Engine Will Not Start (Boom Lifts / RT Scissors)

| Possible Cause | Phone Troubleshooting | Field Service Needed? |
|---|---|---|
| Battery disconnect switch in OFF position | Locate the battery disconnect (usually near battery compartment on the base). Turn to ON. | No |
| Dead battery | Try jump-starting from ground-level jumper terminals (if equipped). | No (if jump works); Yes (if not) |
| Out of fuel | Check fuel gauge. If empty, customer must refuel with correct fuel type (diesel — NOT gasoline). | No |
| Air in fuel lines (after running dry) | Prime the fuel system per machine manual — ISR can guide if familiar with model. Otherwise field service. | Possibly |
| Cold weather — glow plug cycle | In cold weather, instruct operator to turn key to ON (not START) and wait for glow plug indicator to go out (15–30 sec), then start. Repeat 2–3 times if needed. | No |
| Engine kill switch / hour meter lockout | Some machines have fleet management lockouts. Check with branch if the machine has a utilization lockout set. | No (branch can remote-unlock some units) |

### 3.3 Hydraulic Leak

- **STOP operation immediately.**
- Note the location of the leak (boom cylinder, platform cylinder, hydraulic hose, fitting, valve).
- Place absorbent material under the leak to contain the spill.
- Do NOT attempt to tighten fittings under pressure.
- **Create a Priority Service Ticket.** Hydraulic leaks are environmental and safety concerns.
- If the leak is severe (large pool of oil, rapid loss), swap the machine immediately.

### 3.4 Safety Interlock Fault

Modern aerial platforms have multiple safety interlocks. If any is triggered, the machine will not function.

| Interlock | Location | Resolution |
|---|---|---|
| Platform gate switch | Platform entry gate | Ensure gate is fully closed and latched |
| Guardrail sensors | Platform guardrails | Ensure all guardrails are up and locked |
| Outrigger sensors (booms) | Base outrigger legs | Ensure all outriggers are fully deployed and on firm ground |
| Tilt sensor | Base of machine | Level the machine — use cribbing if needed |
| Foot switch (dead man) | Platform floor | Operator must stand on foot switch while operating controls |
| Descent alarm | Base controls | Alarm sounds during descent — this is normal. If it stays on, check for a fault code. |
| Overload sensor | Platform | Reduce platform load to within rated capacity |

---

## 4. Earthmoving Equipment — Common Issues

### 4.1 Track Tension Issues (Excavators / CTLs)

| Symptom | Possible Cause | Resolution |
|---|---|---|
| Track is loose / sagging | Normal track stretch over time | Field service to adjust track tension (grease tensioner) |
| Track came off (de-tracked) | Loose tension + turning on uneven ground | Field service required to re-track. Excavators can sometimes self-re-track using the boom/bucket. Guide experienced operators through this if appropriate. |
| Track is too tight | Over-tensioned | Field service to relieve tension (release grease from tensioner) |
| Track pads worn smooth | Normal wear | Assess wear level. If near end-of-life, swap machine or schedule pad replacement. |

### 4.2 Bucket Teeth Worn / Missing

| Situation | Resolution |
|---|---|
| Teeth worn but still functional | Schedule replacement at next service interval |
| Teeth worn to adapters (nubs visible) | Replace immediately — operating without teeth damages the adapter and reduces digging efficiency. Branch may have teeth in stock for customer to install, or dispatch field service. |
| Tooth missing (fell off in excavation) | Replace immediately. Inform customer that missing teeth in fill material can be hazardous. |

### 4.3 Overheating

| Possible Cause | Phone Troubleshooting | Field Service? |
|---|---|---|
| Radiator plugged with debris | Shut down engine. Let cool 30 min. Visually inspect radiator — remove leaves, mud, paper from fins. Restart. | No (if cleaning resolves) |
| Coolant level low | Check coolant overflow tank. If low, add appropriate coolant (NOT plain water in cold weather). | No (if no leak found) |
| Fan belt broken/loose | Visible inspection — if belt is broken or clearly loose, field service needed. | Yes |
| Operating in extreme heat with high load | Reduce duty cycle. Run engine at lower RPM when possible. | No |
| Thermostat failure | If coolant is full and radiator is clean but engine overheats quickly, likely thermostat. | Yes |
| Hydraulic oil overheating | Check hydraulic oil cooler for debris blockage. If clean, possible pump or relief valve issue. | Yes |

### 4.4 Hydraulic Attachment Not Working

| Check | Resolution |
|---|---|
| Auxiliary hydraulic switch/button | Ensure the auxiliary hydraulic circuit is activated (button/switch in cab) |
| Quick-coupler connections | Ensure hydraulic hoses are fully connected and couplers are locked (flat-face couplers require pushing in and twisting) |
| Flow / pressure settings | Some machines have adjustable auxiliary flow — ensure it's set for the attachment type |
| Wrong attachment size | Verify the attachment's hydraulic requirements match the machine's auxiliary circuit capacity |

---

## 5. Air Compressors — Common Issues

### 5.1 Low or No Pressure Output

| Possible Cause | Phone Troubleshooting | Field Service? |
|---|---|---|
| Air filter clogged | Check the intake air filter element — if visibly dirty/plugged, tap out loose debris or replace (branch can deliver a filter). | No (if filter resolves it) |
| Pressure regulator set too low | Adjust the outlet pressure regulator to desired PSI (most towable compressors have adjustable regulators). | No |
| Air hose leak | Inspect all connections and hose lengths for leaks (listen for hissing). Tighten connections or replace hose section. | No |
| Inlet valve stuck open | Engine runs but no pressure builds — likely inlet/unloader valve issue. | Yes |
| Minimum pressure valve failure | Pressure builds very slowly or not at all. | Yes |
| Separator element blocked | High outlet temperature + low pressure output. | Yes |

### 5.2 Oil in the Air Output (Oil Carryover)

| Possible Cause | Resolution |
|---|---|
| Overfilled oil reservoir | Check oil level sight glass — if above MAX, oil must be drained to proper level. Field service. |
| Separator element worn | Separator element needs replacement. Field service. |
| Operating at very low load | Compressor designed for full-load operation. Extended idle/low-load causes oil carryover. Consider downsizing the compressor. |
| Scavenge line plugged | Internal issue — field service required. |

### 5.3 Compressor Shuts Down Unexpectedly

| Possible Cause | Phone Troubleshooting | Field Service? |
|---|---|---|
| High temperature shutdown | Check for obstructed airflow around the cooler. Clear debris. Ensure compressor is in a well-ventilated area. Restart after cooldown. | No (if resolved) |
| Low oil pressure | Check oil level. If low, do NOT restart without adding oil. | Yes (to diagnose why oil is low) |
| Engine fault | Check for engine fault codes on the controller display. Some can be reset by cycling the key. | Likely Yes |
| Fuel level empty | Refuel with diesel. Prime the fuel system if needed. | No |

---

## 6. Generators — Common Issues

### 6.1 Voltage Irregularity / Fluctuation

| Possible Cause | Phone Troubleshooting | Field Service? |
|---|---|---|
| Overloaded | Check the total connected load vs. generator rating. Reduce load if necessary. Voltage drops under overload. | No (if load reduction resolves) |
| Loose connections | Inspect all output cable connections — tighten lugs at the distribution panel. | No |
| Automatic voltage regulator (AVR) fault | If voltage swings wildly at steady load, AVR may be failing. | Yes |
| Governor hunting | Engine RPM fluctuates audibly — governor may need adjustment. | Yes |
| Single-phase load on one leg of 3-phase | Unbalanced loading causes voltage irregularities. Distribute loads evenly across phases. | No |

### 6.2 Fuel Contamination

| Symptom | Possible Cause | Resolution |
|---|---|---|
| Engine runs rough, misfires | Water in fuel (condensation in tank) | If small amount, add fuel treatment additive. If significant, fuel tank must be drained and flushed — field service. |
| Black smoke from exhaust | Dirty fuel or wrong fuel type | Drain tank, replace fuel filters, refill with clean diesel. Field service. |
| Engine won't start after sitting | Fuel gelling (cold weather) or algae growth (long storage) | Add anti-gel treatment (winter). Drain and flush (algae). Field service recommended. |
| Fuel filters clogging frequently | Contaminated fuel supply on site | Advise customer to verify their fuel source quality. Install supplemental fuel filter. Field service. |

### 6.3 Generator Will Not Start

| Possible Cause | Phone Troubleshooting | Field Service? |
|---|---|---|
| Battery dead | Jump start from external source. Run for 30+ min to recharge. | No (if jump works) |
| Emergency stop engaged | Locate E-stop button (typically red mushroom button on control panel). Pull/twist to release. | No |
| Low coolant level | Check coolant level in overflow tank. Top off if low. | No (if no leak) |
| Block heater not plugged in (cold weather) | In freezing conditions, diesel generators need block heaters. Plug in for 2+ hours before attempting start. | No |
| Control panel in OFF or RESET mode | Set panel to AUTO or MANUAL RUN. Some panels require a fault reset sequence. | No |
| Fuel solenoid issue | If engine cranks but won't fire, fuel solenoid may not be opening. | Yes |

---

## 7. Equipment Malfunction Reporting

### 7.1 What to Document

When a customer reports an equipment malfunction, the ISR should collect:

| Information | Details |
|---|---|
| Contract number | The active rental contract |
| Equipment number | UR asset number (on the machine's UR identification plate) |
| Customer contact | Name and phone of the person on site |
| Description of the issue | Specific symptoms, what happened, when it started |
| Fault codes | Any codes displayed on the machine's screen/panel |
| Severity | Is the machine fully down? Partially functional? Safety concern? |
| Jobsite access | Hours of access, gate codes, directions for service tech |

### 7.2 Severity Classification

| Severity | Definition | Target Response Time |
|---|---|---|
| **Critical** | Safety hazard, machine fully inoperable, customer's project is stopped | 2–4 hours (same business day) |
| **High** | Machine partially inoperable, significant productivity impact | 4–8 hours (same or next business day) |
| **Medium** | Machine functional but with degraded performance | Next business day |
| **Low** | Minor issue, cosmetic, or non-urgent maintenance | Scheduled at next available service window |

---

## 8. Field Service Request Workflow

### 8.1 Creating a Service Ticket in RentalMan

1. **Navigate** to the contract in RentalMan.
2. **Select** the equipment line item with the issue.
3. **Click** "Create Service Ticket."
4. **Enter:**
   - Issue description (be specific and detailed)
   - Severity level (Critical / High / Medium / Low)
   - Customer site contact name and phone
   - Preferred service window (AM/PM, specific time if possible)
   - Site access instructions
5. **Submit** the ticket.
6. **Notify the customer:** "I've created a service ticket. Our field service team will contact you within [ETA based on severity] to schedule the repair."

### 8.2 Service Ticket Assignment

- The Service Manager or Dispatcher reviews incoming tickets.
- Tickets are assigned to field service technicians based on:
  - Technician availability
  - Technician location (minimize travel time)
  - Technician skill set (some techs specialize in electrical, hydraulic, engine, etc.)
- The assigned tech contacts the customer directly to confirm arrival time.

### 8.3 Service Ticket Escalation

If a service ticket is not resolved within the target response time:

| Escalation Level | Trigger | Action |
|---|---|---|
| Level 1 — Service Manager | Response time exceeded by 2+ hours | Service Manager re-prioritizes and reassigns |
| Level 2 — Branch Manager | Response time exceeded by 4+ hours OR customer complains | Branch Manager intervenes, may authorize overtime or swap |
| Level 3 — District/Regional Manager | Repeated failures, major customer impact, safety concern | Full review, potential fleet quality audit |

### 8.4 Tracking Service Tickets

- ISR should monitor open service tickets in RentalMan.
- Check status at least twice daily for Critical and High severity tickets.
- Proactively call the customer after the tech visit to confirm the issue is resolved.
- Close the ticket in RentalMan once confirmed resolved.

---

## 9. Equipment Swap Procedure

When field repair is not feasible or timely, a swap (replacement) is the preferred resolution.

### 9.1 Swap Decision Criteria

| Situation | Swap Recommended? |
|---|---|
| Field repair ETA > 4 hours and customer is critical | Yes |
| Recurring same issue (3rd+ breakdown on same machine) | Yes |
| Safety-related malfunction | Yes — mandatory immediate swap |
| Machine is uneconomical to repair in the field | Yes |
| Customer requests a swap | Yes (accommodate the customer) |

### 9.2 Swap Process

1. ISR checks branch availability for an equivalent replacement unit.
2. If available locally:
   - Create a new contract line for the replacement.
   - Schedule delivery of the replacement.
   - Schedule pickup of the non-functional unit (can be simultaneous with delivery).
   - Off-rent the non-functional unit — **customer is NOT charged for downtime on the non-functional unit** if the issue is a UR equipment malfunction (not customer-caused damage).
3. If not available locally:
   - Check neighboring branches (within 50-mile radius first, then expand).
   - Check regional availability in RentalMan.
   - If no equivalent is available, offer the next-size-up at the same rate (upgrade at no charge).
4. Document the swap reason in RentalMan notes on both the original and new contract lines.

### 9.3 Downtime Credit

- If a customer experiences significant downtime due to a UR equipment malfunction (not customer-caused), the ISR may offer a downtime credit.
- Credits require Branch Manager approval.
- Standard guideline: credit the rental charge for the documented downtime period (e.g., if the machine was down for 6 hours, credit half a day).
- Credits over $500 require District Manager approval.

---

## 10. When to Escalate to Branch Manager

The ISR should involve the Branch Manager in the following situations:

| Situation | Why Escalate |
|---|---|
| Customer is threatening to leave UR or go to a competitor | Customer retention — BM has authority for significant concessions |
| Safety incident or injury involving UR equipment | Mandatory — BM must report per UR safety protocol |
| Equipment swap needed but no availability in region | BM can authorize fleet transfers, rentals from other suppliers, or premium freight |
| Customer disputes over $2,500 | BM approval required per credit memo authority matrix |
| Repeated equipment failures (same customer, same machine) | Quality issue — BM needs to investigate fleet condition |
| National Account customer complaint | BM coordinates with NA Account Manager |
| Media or social media attention | BM must involve Corporate Communications |
| Environmental spill (oil, fuel, coolant) | BM must report per UR Environmental Response protocol |
| Any situation where the ISR is unsure of the right course of action | BM is the ISR's primary escalation point |

---

## 11. Preventive Maintenance Awareness

While ISRs don't perform maintenance, understanding the PM schedule helps set customer expectations:

### 11.1 Standard PM Intervals

| Interval | Service Actions |
|---|---|
| Daily (operator) | Walk-around inspection, fluid levels, tire/track condition, safety devices |
| 250 hours | Oil change, filter replacement, grease points, belt inspection |
| 500 hours | Hydraulic filter change, air filter replacement, coolant check |
| 1,000 hours | Major service — all filters, fluids, belts, hoses, safety system test |
| 2,000 hours | Comprehensive overhaul — cylinders, pumps, engine tune, structural inspection |

### 11.2 PM During Active Rentals

- For long-term rentals, UR performs scheduled PM at the jobsite at no charge to the customer.
- ISR should inform long-term customers that a service tech will periodically visit for PM.
- Coordinate PM visits with the customer to minimize disruption.
- If a customer reports that PM seems overdue, check the machine's service history in RentalMan and schedule accordingly.

---

## 12. ISR Troubleshooting Quick Reference Card

### Phone Fix — Try These First

| Equipment | First Things to Check |
|---|---|
| Any machine won't start | E-stop button, battery disconnect, fuel level, key position |
| Aerial won't elevate | Outriggers, guardrails, platform gate, foot switch, tilt alarm, weight limit |
| Compressor low pressure | Pressure regulator setting, air filter, hose connections |
| Generator voltage issue | Load balance, connections, total load vs. rating |
| Excavator overheating | Radiator debris, coolant level, duty cycle |
| Forklift won't lift | Weight exceeds capacity at that reach, hydraulic level, tilt/tip sensor |

### Create Service Ticket — Issue Cannot Be Resolved by Phone

- Hydraulic leaks (any equipment)
- Engine mechanical failures
- Electrical/wiring faults
- Structural damage (booms, frames, platforms)
- Persistent fault codes that won't clear
- Transmission/drivetrain issues

### Swap Immediately — Do Not Wait for Repair

- Any safety-related malfunction (brakes, steering, stability)
- Machine fully inoperable and customer's project is stopped
- Third (or more) breakdown on the same unit
- Customer specifically requests a swap

---

## 13. Safety Incident Protocol

If a customer reports a safety incident (injury, near-miss, or property damage) involving UR equipment:

1. **Ensure immediate safety** — Confirm no one is currently in danger.
2. **Instruct the customer to secure the scene** — Do not move the equipment until directed.
3. **Notify the Branch Manager immediately** — This is a mandatory escalation.
4. **Document** — Record everything the customer reports, verbatim. Do not speculate on cause.
5. **Do NOT admit fault or liability** — Use language like "I'm documenting what you've described" rather than "Our equipment failed."
6. **Do NOT discuss RPP coverage** in the context of a safety incident — insurance and liability are handled by UR Risk Management and Legal.
7. The Branch Manager will engage UR Environmental Health & Safety (EHS) and Risk Management per corporate protocol.

---

## 14. Common Fault Codes Quick Reference

> **Note:** Fault codes vary by manufacturer and model. The codes below are common patterns. Always reference the specific machine's operator manual or contact the Service Department for exact code interpretation.

### Aerial Platforms (JLG / Genie / Skyjack — Common Brands in UR Fleet)

| Code Pattern | Likely Meaning | ISR Action |
|---|---|---|
| Tilt alarm / code | Machine on uneven surface | Reposition to level ground |
| Platform overload | Weight exceeds capacity | Reduce platform load |
| Low battery | Battery needs charging | Charge for 30+ min, then retry |
| Ground fault | Electrical ground fault detected | Do not operate — field service |
| Hydraulic temp high | Hydraulic oil overheating | Let cool, check oil level, check for blocked cooler |
| Drive fault | Drive motor/controller issue | Field service required |

### Generators (Caterpillar / Cummins / Generac — Common Brands)

| Code Pattern | Likely Meaning | ISR Action |
|---|---|---|
| Over-crank / fail to start | Engine cranks but won't fire | Check fuel, filters, glow plugs; field service if no resolution |
| High coolant temp | Engine overheating | Check coolant level, radiator, fan belt |
| Low oil pressure | Oil level or oil pump issue | Check oil level — do NOT run if low |
| Over-speed | Engine RPM exceeded safe limit | Automatic shutdown — field service to inspect governor |
| Over-voltage / under-voltage | AVR or load issue | Check load balance; field service if AVR suspected |

### Compressors (Atlas Copco / Doosan / Sullair — Common Brands)

| Code Pattern | Likely Meaning | ISR Action |
|---|---|---|
| High air/oil temp | Overheating | Check airflow, oil level, ambient conditions |
| Low oil level | Oil consumption or leak | Check level, add oil if available — field service to inspect |
| High separator ΔP | Separator element clogged | Field service to replace separator |
| Emergency stop | E-stop button pressed | Release E-stop, restart |

---

*This document is maintained by the UR Service Operations & ISR Enablement teams. For equipment issues not covered here, contact your Branch Service Manager or the National Service Hotline.*
