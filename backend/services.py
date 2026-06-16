import json
import joblib
import pandas as pd
from pathlib import Path
import shap
import numpy as np

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"

# Load config
with open(MODELS_DIR / "config.json", "r") as f:
    config = json.load(f)

# Feature order
FEATURE_ORDER = config["feature_order"]
FEATURE_MAP = {
    "RevolvingUtilizationOfUnsecuredLines": "Credit Utilisation Ratio",
    "age": "Age",
    "NumberOfTime30-59DaysPastDueNotWorse": "30–59 Days Past Due",
    "DebtRatio": "Debt Ratio",
    "MonthlyIncome": "Monthly Income",
    "NumberOfOpenCreditLinesAndLoans": "Open Credit Lines",
    "NumberOfTimes90DaysLate": "90+ Days Late",
    "NumberRealEstateLoansOrLines": "Real Estate Loans",
    "NumberOfTime60-89DaysPastDueNotWorse": "60–89 Days Past Due",
    "NumberOfDependents": "Dependents",
}

# Load models
xgb_model = joblib.load(MODELS_DIR / config["xgboost_model"])
xgb_explainer = shap.TreeExplainer(xgb_model)

logistic_models = {
    name: joblib.load(MODELS_DIR / path)
    for name, path in config["logistic_models"].items()
}

scaler = joblib.load(MODELS_DIR / config["scaler"])


def predict_risk(data: dict):
    """
    Predict risk using selected model and strategy.
    """

    model_name = data.pop("model")
    strategy = data.pop("strategy")

    # Convert schema names to training feature names
    data["NumberOfTime30-59DaysPastDueNotWorse"] = data.pop(
        "NumberOfTime30_59DaysPastDueNotWorse"
    )

    data["NumberOfTime60-89DaysPastDueNotWorse"] = data.pop(
        "NumberOfTime60_89DaysPastDueNotWorse"
    )

    X = pd.DataFrame([data])[FEATURE_ORDER]

    # Select model
    if model_name == "XGBoost":
        model = xgb_model
        prob = model.predict_proba(X)[0][1]

    else:
        model = logistic_models[model_name]

        X_scaled = scaler.transform(X)

        prob = model.predict_proba(X_scaled)[0][1]

    threshold = config["thresholds"][strategy]

    prediction = int(prob >= threshold)

    # Risk categories
    if prob < 0.30:
        risk = "Low Risk"
    elif prob < 0.60:
        risk = "Moderate Risk"
    else:
        risk = "High Risk"

    decision = "Reject" if prediction == 1 else "Approve"

    return {
        "probability": round(float(prob), 3),
        "prediction": prediction,
        "threshold": threshold,
        "risk_category": risk,
        "decision": decision,
        "model": model_name,
        "strategy": strategy,
    }
def explain_prediction(data: dict):
    """
    Generate SHAP explanations for XGBoost predictions.
    """

    data.pop("model", None)
    data.pop("strategy", None)

    data["NumberOfTime30-59DaysPastDueNotWorse"] = data.pop(
        "NumberOfTime30_59DaysPastDueNotWorse"
    )

    data["NumberOfTime60-89DaysPastDueNotWorse"] = data.pop(
        "NumberOfTime60_89DaysPastDueNotWorse"
    )

    X = pd.DataFrame([data])[FEATURE_ORDER]

    shap_values = xgb_explainer.shap_values(X)

    drivers = []

    for feature, value in zip(FEATURE_ORDER, shap_values[0]):

        drivers.append({
            "feature": FEATURE_MAP[feature],
            "shap": round(float(value), 4),
        })

    drivers = sorted(
        drivers,
        key=lambda x: abs(x["shap"]),
        reverse=True,
    )

    base_value = xgb_explainer.expected_value

    if isinstance(base_value, np.ndarray):
        base_value = float(base_value[0])

    return {
        "base_value": round(float(base_value), 4),
        "drivers": drivers,
    }