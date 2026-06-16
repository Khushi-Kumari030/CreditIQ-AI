export const strategyData = [
  {
    name: "Primary Strategy",
    badge: "DEFAULT",
    threshold: 0.50,
    precision: 0.212,
    recall: 0.765,
    f1: 0.332,
    interpretation:
      "Prioritises the identification of high-risk borrowers through stronger recall performance.",
  },
  {
    name: "Balanced Strategy",
    badge: "ANALYST MODE",
    threshold: 0.60,
    precision: 0.263,
    recall: 0.655,
    f1: 0.375,
    interpretation:
      "Improves decision precision and overall balance while accepting a reduction in borrower identification sensitivity.",
  },
];