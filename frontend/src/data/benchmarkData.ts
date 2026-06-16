export const benchmarkData = [
  {
    status: "ACTIVE",
    model: "XGBoost",
    rocAuc: 0.860,
    precision: 0.212,
    recall: 0.765,
    f1: 0.332,
  },
  {
    status: "SHORTLISTED",
    model: "Balanced LR",
    rocAuc: 0.814,
    precision: 0.258,
    recall: 0.611,
    f1: 0.363,
  },
  {
    status: "SHORTLISTED",
    model: "SMOTE LR",
    rocAuc: 0.812,
    precision: 0.247,
    recall: 0.619,
    f1: 0.353,
  },
  {
    status: "ARCHIVED",
    model: "Baseline LR",
    rocAuc: 0.807,
    precision: 0.620,
    recall: 0.140,
    f1: 0.230,
  },
];