"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

import {
  useCreditIQ,
  CopilotSession,
} from "@/context/CreditIQContext";

export default function BorrowersPage() {

  const {
    copilotSessions,

    setFormData,
    setStrategy,

    setResult,
    setPrediction,
    setExplanation,

    setActiveSessionId,
  } = useCreditIQ();

  const [expandedId, setExpandedId] =
    useState<string | null>(null);

  const restoreBorrower = (
    session: CopilotSession
  ) => {

    setFormData(session.borrower);

    setStrategy(session.strategy);

    setResult(session.prediction);

    setPrediction(session.prediction);

    setExplanation(session.explanation);

    setActiveSessionId(session.id);
  };

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold text-white">
            Borrower Inputs
          </h1>

          <p className="text-slate-400 mt-2">
            Previously analyzed borrowers in this session.
          </p>

        </div>

        {/* Empty State */}

        {copilotSessions.length === 0 ? (

          <div
            className="
              bg-slate-900
              border border-slate-800
              rounded-3xl
              p-12
              text-center
            "
          >

            <h2 className="text-2xl text-white font-semibold">
              No borrowers analyzed yet
            </h2>

            <p className="text-slate-400 mt-3">
              Analyze borrowers from the Simulator
              to see them here.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {copilotSessions.map((session) => (

              <div
                key={session.id}

                onClick={() =>
                  setExpandedId(
                        expandedId === session.id
                        ? null
                        : session.id
                    )
                }

                className="
                  text-left
                  bg-slate-900
                  border border-slate-800
                  rounded-3xl
                  p-6
                  hover:border-[#00D09C]
                  transition
                "
              >

                {/* Top */}

                <div className="flex justify-between items-center">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm

                      ${
                        session.prediction.decision ===
                        "Approve"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    `}
                  >
                    {session.prediction.decision}
                  </span>

                  <span className="text-slate-400 text-sm">

                    {new Date(
                      session.createdAt
                    ).toLocaleTimeString()}

                  </span>

                  <span className="text-slate-400 text-xl">
                    {expandedId === session.id ? "−" : "+"}
                  </span>

                </div>

                {/* Probability */}

                <h2 className="text-3xl font-bold text-white mt-6">

                  {(
                    session.prediction.probability * 100
                  ).toFixed(1)}
                  %

                </h2>

                <p className="text-slate-400 mt-1">
                  Default Probability
                </p>

                {/* Details */}

                <div className="mt-6 grid grid-cols-2 gap-4">

                  <div>

                    <p className="text-slate-500 text-sm">
                      Strategy
                    </p>

                    <p className="text-white">
                      {session.strategy}
                    </p>

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">
                      Monthly Income
                    </p>

                    <p className="text-white">
                      $
                      {
                        session.borrower
                          .MonthlyIncome
                      }
                    </p>

                  </div>

                </div>
                

                {expandedId === session.id && (

                    <div
                        className="
                        mt-8
                        pt-6
                        border-t border-slate-700
                        space-y-3
                        "
                    >

                        <h3 className="text-white font-semibold">
                        Borrower Inputs
                        </h3>

                        <div className="grid grid-cols-2 gap-3 text-sm">

                        <div className="text-slate-400">
                            Age
                        </div>

                        <div className="text-white">
                            {session.borrower.age}
                        </div>

                        <div className="text-slate-400">
                            Monthly Income
                        </div>

                        <div className="text-white">
                            ${session.borrower.MonthlyIncome}
                        </div>

                        <div className="text-slate-400">
                            Debt Ratio
                        </div>

                        <div className="text-white">
                            {session.borrower.DebtRatio}
                        </div>

                        <div className="text-slate-400">
                            Credit Utilization
                        </div>

                        <div className="text-white">
                            {
                            session.borrower
                                .RevolvingUtilizationOfUnsecuredLines
                            }
                        </div>

                        <div className="text-slate-400">
                            Open Credit Lines
                        </div>

                        <div className="text-white">
                            {
                            session.borrower
                                .NumberOfOpenCreditLinesAndLoans
                            }
                        </div>

                        <div className="text-slate-400">
                            Dependents
                        </div>

                        <div className="text-white">
                            {
                            session.borrower
                                .NumberOfDependents
                            }
                        </div>

                        <div className="text-slate-400">
                            30–59 Days Late
                        </div>

                        <div className="text-white">
                            {
                            session.borrower
                                .NumberOfTime30_59DaysPastDueNotWorse
                            }
                        </div>

                        <div className="text-slate-400">
                            60–89 Days Late
                        </div>

                        <div className="text-white">
                            {
                            session.borrower
                                .NumberOfTime60_89DaysPastDueNotWorse
                            }
                        </div>

                        <div className="text-slate-400">
                            90+ Days Late
                        </div>

                        <div className="text-white">
                            {
                            session.borrower
                                .NumberOfTimes90DaysLate
                            }
                        </div>

                        <div className="text-slate-400">
                            Real Estate Loans
                        </div>

                        <div className="text-white">
                            {
                            session.borrower
                                .NumberRealEstateLoansOrLines
                            }
                        </div>

                        <div className="text-slate-400">
                            Risk Category
                        </div>

                        <div className="text-white">
                            {session.prediction.risk_category}
                        </div>

                        </div>

                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            restoreBorrower(session);
                        }}
                        className="
                            mt-4
                            w-full
                            bg-[#00D09C]
                            text-slate-950
                            py-3
                            rounded-2xl
                            font-semibold
                        "
                        >
                        Restore Analysis
                        </button>

                    </div>

                )}
                
              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}