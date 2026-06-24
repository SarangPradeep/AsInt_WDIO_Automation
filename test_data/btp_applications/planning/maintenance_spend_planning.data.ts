export const mspTestData = {
    bulkStatuses: [
        "Funded",
        "Deferred",
        "Ready for Funding",
        "Reviewing",
        "Planning"
    ],
    bulkUpdate: {
        processStages: [
            "Stage 1: Planner Review",
            "Stage 2: Technical Review",
            "Stage 3: Final Review",
            "Stage 4: Final Decision"
        ],
        regionsOnChart: ["Curve", "Flat"],
        deferralFollowups: ["Need Further Details", "Re-Evaluate"]
    }
} as const;
