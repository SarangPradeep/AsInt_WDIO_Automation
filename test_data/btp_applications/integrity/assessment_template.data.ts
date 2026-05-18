export const assessmentTempData = {

    randomNum: Math.floor(1000 + Math.random() * 9000),

    description: `Automation assessment template ${Math.floor(1000 + Math.random() * 9000)}`,

    relevantFor:
        new Date().getDate() % 2 === 0
            ? "Equipment"
            : "Functional Location",

    categories: [
        "Asset RCM Analysis",
        "Asset Strategy Analysis for Classes",
        "Asset Strategy Development",
        "Functional Safety",
        "Highest Consequence Analysis",
        "Optimization",
        "Process Hazard Analysis",
        "Stream Template"
    ],

    randomCategory: ""
};

assessmentTempData.randomCategory =
    assessmentTempData.categories[
        Math.floor(Math.random() * assessmentTempData.categories.length)
    ];