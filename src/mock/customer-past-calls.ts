export type PastCallEntry = {
  id: string;
  date: string;
  subject: string;
  category: string;
  outcome: string;
  duration?: string;
};

/**
 * Mock past call history per persona (3–4 entries each) for the Customer Info card.
 */
export async function getPastCallsForPersona(
  personaLabel?: string
): Promise<PastCallEntry[]> {
  switch (personaLabel) {
    case "Angry customer":
      return [
        {
          id: "CL-8821",
          date: "Mar 10, 2025",
          subject: "Billing dispute – invoice UR-20078",
          category: "Billing",
          outcome: "Escalated to branch manager",
          duration: "12 min",
        },
        {
          id: "CL-8755",
          date: "Mar 3, 2025",
          subject: "Equipment breakdown – excavator",
          category: "Equipment issue",
          outcome: "Replacement arranged",
          duration: "8 min",
        },
        {
          id: "CL-8690",
          date: "Feb 24, 2025",
          subject: "Delivery delay complaint",
          category: "Logistics",
          outcome: "Resolved – credit applied",
          duration: "6 min",
        },
        {
          id: "CL-8612",
          date: "Feb 18, 2025",
          subject: "Contract terms clarification",
          category: "General inquiry",
          outcome: "Documentation sent",
          duration: "9 min",
        },
      ];
    case "Confused customer":
      return [
        {
          id: "CL-8910",
          date: "Mar 11, 2025",
          subject: "Total Control portal access",
          category: "Onboarding",
          outcome: "Walkthrough completed",
          duration: "15 min",
        },
        {
          id: "CL-8845",
          date: "Mar 5, 2025",
          subject: "Rental coverage clarification",
          category: "General inquiry",
          outcome: "Policy explained",
          duration: "10 min",
        },
        {
          id: "CL-8788",
          date: "Feb 27, 2025",
          subject: "Equipment reservation steps",
          category: "Reservation",
          outcome: "Reservation created",
          duration: "7 min",
        },
        {
          id: "CL-8722",
          date: "Feb 20, 2025",
          subject: "Invoice breakdown request",
          category: "Billing",
          outcome: "Itemized invoice sent",
          duration: "5 min",
        },
      ];
    case "Neutral customer":
      return [
        {
          id: "CL-8933",
          date: "Mar 12, 2025",
          subject: "Upcoming project reservation",
          category: "Reservation",
          outcome: "Quote sent for approval",
          duration: "6 min",
        },
        {
          id: "CL-8877",
          date: "Mar 6, 2025",
          subject: "Standard equipment availability",
          category: "Availability",
          outcome: "Confirmed – hold placed",
          duration: "4 min",
        },
        {
          id: "CL-8810",
          date: "Feb 28, 2025",
          subject: "Contract renewal inquiry",
          category: "General inquiry",
          outcome: "Renewal terms sent",
          duration: "8 min",
        },
        {
          id: "CL-8744",
          date: "Feb 21, 2025",
          subject: "Delivery window change",
          category: "Logistics",
          outcome: "Rescheduled",
          duration: "3 min",
        },
      ];
    case "Happy customer":
      return [
        {
          id: "CL-8955",
          date: "Mar 13, 2025",
          subject: "Referral program and discount",
          category: "General inquiry",
          outcome: "Discount applied to contract",
          duration: "7 min",
        },
        {
          id: "CL-8899",
          date: "Mar 7, 2025",
          subject: "Post-project feedback",
          category: "Feedback",
          outcome: "Thank-you note sent",
          duration: "5 min",
        },
        {
          id: "CL-8833",
          date: "Mar 1, 2025",
          subject: "Additional equipment for next job",
          category: "Reservation",
          outcome: "Quote created",
          duration: "6 min",
        },
        {
          id: "CL-8766",
          date: "Feb 22, 2025",
          subject: "Total Control training follow-up",
          category: "Onboarding",
          outcome: "Training completed",
          duration: "11 min",
        },
      ];
    default:
      return [
        {
          id: "CL-8001",
          date: "Mar 1, 2025",
          subject: "General inquiry",
          category: "General inquiry",
          outcome: "Resolved",
          duration: "5 min",
        },
        {
          id: "CL-8002",
          date: "Feb 15, 2025",
          subject: "Account support",
          category: "Support",
          outcome: "Completed",
          duration: "8 min",
        },
      ];
  }
}
