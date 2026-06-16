"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type FormDataType = {
  RevolvingUtilizationOfUnsecuredLines: number;
  age: number;
  NumberOfTime30_59DaysPastDueNotWorse: number;
  DebtRatio: number;
  MonthlyIncome: number;
  NumberOfOpenCreditLinesAndLoans: number;
  NumberOfTimes90DaysLate: number;
  NumberRealEstateLoansOrLines: number;
  NumberOfTime60_89DaysPastDueNotWorse: number;
  NumberOfDependents: number;
};


const defaultFormData: FormDataType = {
  RevolvingUtilizationOfUnsecuredLines: 0.4,
  age: 35,
  NumberOfTime30_59DaysPastDueNotWorse: 0,
  DebtRatio: 0.3,
  MonthlyIncome: 6000,
  NumberOfOpenCreditLinesAndLoans: 5,
  NumberOfTimes90DaysLate: 0,
  NumberRealEstateLoansOrLines: 1,
  NumberOfTime60_89DaysPastDueNotWorse: 0,
  NumberOfDependents: 2,
};

export type CopilotMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export type CopilotSession = {
  id: string;
  createdAt: string;

  borrower: FormDataType;

  prediction: any;
  explanation: any;

  strategy: string;

  messages: CopilotMessage[];
};

type CreditIQContextType = {
  sidebarCollapsed: boolean;

  setSidebarCollapsed: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  formData: FormDataType;
  setFormData: React.Dispatch<
    React.SetStateAction<FormDataType>
  >;

  strategy: string;
  setStrategy: React.Dispatch<
    React.SetStateAction<string>
  >;

  result: any;
  setResult: React.Dispatch<any>;

  prediction: any;
  setPrediction: React.Dispatch<any>;

  explanation: any;
  setExplanation: React.Dispatch<any>;

  resetAnalysis: () => void;

  /* Copilot */

  copilotSessions: CopilotSession[];


  activeSessionId: string | null;

  setActiveSessionId: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  createCopilotSession: (
    borrower: FormDataType,
    prediction: any,
    explanation: any,
    strategy: string
  ) => string;

  addCopilotMessage: (
    sessionId: string,
    role: "user" | "assistant",
    content: string
  ) => void;
};

const CreditIQContext =
  createContext<CreditIQContextType | null>(null);

export function CreditIQProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [formData, setFormData] =
    useState(defaultFormData);

  const [strategy, setStrategy] =
    useState("Lead");

  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false);

  const [result, setResult] =
    useState<any>(null);

  const [prediction, setPrediction] =
    useState<any>(null);

  const [explanation, setExplanation] =
    useState<any>(null);

  /* Copilot */

  /* Copilot */

  const [
    copilotSessions,
    setCopilotSessions,
  ] = useState<CopilotSession[]>([]);

  const [
    activeSessionId,
    setActiveSessionId,
  ] = useState<string | null>(null);

  const createCopilotSession = (
    borrower: FormDataType,
    predictionData: any,
    explanationData: any,
    strategyName: string
  ) => {

    const sessionId =
      Date.now().toString();

    const newSession: CopilotSession = {
      id: sessionId,

      createdAt:
        new Date().toISOString(),

      borrower: {
        ...borrower,
      },

      prediction: predictionData,

      explanation: explanationData,

      strategy: strategyName,

      messages: [],
    };

    setCopilotSessions((prev) => [
      newSession,
      ...prev,
    ]);

    setActiveSessionId(sessionId);

    

    return sessionId;
  };

  const addCopilotMessage = (
    sessionId: string,
    role: "user" | "assistant",
    content: string
  ) => {
    setCopilotSessions((prev) =>
      prev.map((session) => {

        if (session.id !== sessionId) {
          return session;
        }

        return {
          ...session,

          messages: [
            ...session.messages,

            {
              role,
              content,

              timestamp:
                new Date().toISOString(),
            },
          ],
        };
      })
    );

  };

  /* IMPORTANT */

  const resetAnalysis = () => {

    setResult(null);

    setPrediction(null);

    setExplanation(null);

    /*
      DO NOT clear copilotSessions.

      Previous borrower analyses
      should remain accessible
      during the same session.
    */
  };

  return (
    <CreditIQContext.Provider
      value={{

        sidebarCollapsed,
        setSidebarCollapsed,

        formData,
        setFormData,

        strategy,
        setStrategy,

        result,
        setResult,

        prediction,
        setPrediction,

        explanation,
        setExplanation,

        resetAnalysis,

        copilotSessions,
        

        activeSessionId,
        setActiveSessionId,

        createCopilotSession,

        addCopilotMessage,
      }}
    >
      {children}
    </CreditIQContext.Provider>
  );
}

export function useCreditIQ() {

  const context =
    useContext(CreditIQContext);

  if (!context) {
    throw new Error(
      "useCreditIQ must be used within CreditIQProvider"
    );
  }

  return context;
}