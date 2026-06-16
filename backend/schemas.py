from pydantic import BaseModel, Field


class Borrower(BaseModel):

    RevolvingUtilizationOfUnsecuredLines: float = Field(..., ge=0, le=1)

    age: int = Field(..., ge=18, le=120)

    NumberOfTime30_59DaysPastDueNotWorse: int = Field(..., ge=0)

    DebtRatio: float = Field(..., ge=0, le=1)

    MonthlyIncome: float = Field(..., ge=0)

    NumberOfOpenCreditLinesAndLoans: int = Field(..., ge=0)

    NumberOfTimes90DaysLate: int = Field(..., ge=0)

    NumberRealEstateLoansOrLines: int = Field(..., ge=0)

    NumberOfTime60_89DaysPastDueNotWorse: int = Field(..., ge=0)

    NumberOfDependents: int = Field(..., ge=0)

    model: str
    strategy: str