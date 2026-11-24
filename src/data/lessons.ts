type Practice = {
  id: string;
  from: string;
  appliesTo: string[];
  title: string;
  method: string;
} & ({ status: "proposed"; check: string } | { status: "verified"; evidence: string; result: string });

export const lessons: Practice[] = [
  {
    id: "approval-before-production",
    from: "soul-forge-studio",
    appliesTo: ["front-street", "web-forge"],
    title: "Agree on the deliverable before production",
    method: "The studio uses a story brief. A storefront project can use the same checkpoint to agree on the customer problem, the remedy, and what the owner will review.",
    status: "proposed",
    check: "Compare approved scope with delivered scope on a completed project and record any rework.",
  },
  {
    id: "test-one-remedy",
    from: "front-street",
    appliesTo: ["soul-forge-studio", "knowledge-forge"],
    title: "Test one change before expanding the offer",
    method: "Start with one observable customer action. The studio could test one release page before applying the same design to an album campaign.",
    status: "proposed",
    check: "Record the starting measurement, the change, and the follow-up measurement with permission to share.",
  },
];
