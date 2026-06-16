"use client";

import { useMemo, useState, useEffect, useRef, } from "react";
import ReactMarkdown from "react-markdown";

import DashboardLayout from "@/components/DashboardLayout";


import {
  useCreditIQ,
  CopilotSession,
} from "@/context/CreditIQContext";

import {
  Bot,
  Menu,
  X,
  Sparkles,
  Clock3,
  Send,
  User,
  ChevronRight,
} from "lucide-react";

export default function CopilotPage() {

  const {
    copilotSessions,

    activeSessionId,
    setActiveSessionId,

    addCopilotMessage,
  } = useCreditIQ();

  /* Drawer */

  const [
    isHistoryOpen,
    setIsHistoryOpen,
  ] = useState(false);

  /* Chat Input */

  const [
    question,
    setQuestion,
  ] = useState("");

  /* Gemini Loading */

  const [
    loading,
    setLoading,
  ] = useState(false);

  /* Auto Scroll */

   const messagesEndRef =
   useRef<HTMLDivElement>(null);

  /* Active Session */

  const activeSession =
    useMemo<CopilotSession | null>(() => {

      if (!activeSessionId) {
        return null;
      }

      return (
        copilotSessions.find(
          (session) =>
            session.id === activeSessionId
        ) || null
      );

    }, [
      copilotSessions,
      activeSessionId,
    ]);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
    });

    }, [
    activeSession?.messages.length,
    loading,
   ]);

  /* Suggested Questions */

  const suggestedQuestions = [

    "Why rejected?",

    "Biggest risk drivers?",

    "Improve approval chances?",

    "Summarize assessment.",

  ];

  const handleSend = async (
    text?: string
    ) => {

    const message =
        text || question;

    if (
        loading ||
        !message.trim() ||
        !activeSession
    ) {
        return;
    }

    addCopilotMessage(
        activeSession.id,
        "user",
        message
    );

    setQuestion("");

    setLoading(true);

    try {

        const response =
        await fetch(
            "https://creditiq-backend-w3cv.onrender.com/copilot",
            {
            method: "POST",

            headers: {
                "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
                question: message,

                borrower:
                activeSession.borrower,

                prediction:
                activeSession.prediction,

                explanation:
                activeSession.explanation,

                strategy:
                activeSession.strategy,
            }),
            }
        );

        const data =
        await response.json();

        addCopilotMessage(
        activeSession.id,
        "assistant",
        data.response || "No response generated."
        );

    } catch {

        addCopilotMessage(
        activeSession.id,
        "assistant",
        "Sorry, I couldn't generate a response."
        );

    }

    setLoading(false);
    };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <section className="mb-8">

           <div className="flex items-start justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-white">
                        CreditIQ Copilot
                    </h1>

                    <p className="mt-3 text-slate-400 max-w-3xl leading-8">
                        Explain, challenge and explore borrower decisions using AI.
                    </p>

                </div>

                <button
                    onClick={() => setIsHistoryOpen(true)}
                    className="
                        lg:hidden
                        p-3
                        rounded-2xl
                        bg-slate-800
                    "
                >
                    <Menu
                        size={22}
                        className="text-white"
                    />
                </button>

            </div>

        </section>
        
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">

            {/* Desktop History */}

            <div
                className="
                    hidden lg:block
                    bg-slate-900
                    border border-slate-800
                    rounded-3xl
                    overflow-hidden
                    h-[calc(100vh-180px)]
                "
            >

                <div className="p-5 border-b border-slate-800">

                    <h2 className="text-xl font-semibold text-white">
                        Borrower History
                    </h2>

                </div>

                <div className="overflow-y-auto h-full p-4 space-y-3">

                    {copilotSessions.map((session) => (

                        <button
                            key={session.id}
                            onClick={() =>
                                setActiveSessionId(session.id)
                            }
                            className={`
                                w-full
                                text-left
                                rounded-2xl
                                p-4
                                border
                                transition

                                ${
                                    activeSessionId === session.id
                                    ? "border-[#00D09C] bg-[#00D09C]/10"
                                    : "border-slate-800 bg-slate-950"
                                }
                            `}
                        >

                            <p
                                className={`
                                    inline-block
                                    px-3 py-1
                                    rounded-full
                                    text-sm font-medium

                                    ${
                                        session.prediction.decision === "Approve"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                    }
                                `}
                            >
                                {session.prediction.decision}
                            </p>

                            <p className="text-white mt-3 font-semibold">
                                {(
                                    session.prediction.probability * 100
                                ).toFixed(1)}%
                                {" "}Default Risk
                            </p>

                            <p className="text-slate-400 mt-2">
                                {session.strategy}
                            </p>

                        </button>

                    ))}

                </div>

            </div>
        

        <div>
        {/* Empty State */}

        {copilotSessions.length === 0 && (

          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-12
              text-center
            "
          >

            <div
              className="
                inline-flex
                p-5
                rounded-full
                bg-[#00D09C]/10
              "
            >

              <Bot
                size={48}
                className="
                  text-[#00D09C]
                "
              />

            </div>

            <h2
              className="
                text-3xl
                font-semibold
                text-white
                mt-6
              "
            >
              No Borrower Sessions Yet
            </h2>

            <p
              className="
                text-slate-400
                mt-4
                max-w-xl
                mx-auto
                leading-8
              "
            >
              Analyze a borrower in the
              Simulator to create an AI
              Copilot session. Each
              borrower assessment gets
              its own conversation history.
            </p>

          </div>

        )}

        {/* Drawer */}

        {isHistoryOpen && (

          <>

            {/* Overlay */}

            <div
              className="
                fixed
                inset-0
                bg-black/50
                z-40
              "
              onClick={() =>
                setIsHistoryOpen(false)
              }
            />

            {/* Sidebar */}

            <div
              className="
                fixed
                top-0
                left-0
                h-screen
                w-[360px]
                bg-slate-900
                border-r
                border-slate-800
                z-50
                flex
                flex-col
              "
            >

              {/* Drawer Header */}

              <div
                className="
                  p-6
                  border-b
                  border-slate-800
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Clock3
                    className="
                      text-[#00D09C]
                    "
                    size={24}
                  />

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-white
                    "
                  >
                    Borrower History
                  </h2>

                </div>

                <button
                  onClick={() =>
                    setIsHistoryOpen(false)
                  }
                  className="
                    p-2
                    rounded-xl
                    hover:bg-slate-800
                  "
                >

                  <X
                    className="
                      text-white
                    "
                    size={22}
                  />

                </button>

              </div>

              {/* Sessions */}

              <div
                className="
                  flex-1
                  overflow-y-auto
                  p-4
                  space-y-4
                "
              >

                {copilotSessions.map(
                  (session) => (

                    <button
                      key={session.id}
                      onClick={() => {

                        setActiveSessionId(
                          session.id
                        );

                        setIsHistoryOpen(
                          false
                        );

                      }}
                      className={`
                        w-full
                        text-left
                        rounded-2xl
                        p-5
                        border
                        transition

                        ${
                          activeSessionId ===
                          session.id
                            ? `
                              border-[#00D09C]
                              bg-[#00D09C]/10
                            `
                            : `
                              border-slate-800
                              bg-slate-950
                              hover:bg-slate-800
                            `
                        }
                      `}
                    >

                      
                        <div className="space-y-3">

                        <div className="flex justify-between">

                            <span
                            className={`
                                px-3 py-1 rounded-full text-sm font-medium

                                ${
                                session.prediction
                                    ?.decision === "Approve"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                }
                            `}
                            >
                            {session.prediction?.decision}
                            </span>

                            <ChevronRight
                            size={18}
                            className="text-slate-500"
                            />

                        </div>

                        <p className="text-white font-medium">
                            {(session.prediction?.probability * 100).toFixed(1)}%
                            {" "}Default Risk
                        </p>

                        <p className="text-slate-400 text-sm">
                            {session.strategy}
                        </p>

                        </div>
                    

                    </button>

                  )
                )}

              </div>

            </div>

          </>

        )}

        {activeSession && (

            <div
                className="
                bg-slate-900
                border border-slate-800
                rounded-3xl
                flex flex-col
                h-[70vh]
                "
            >

                {/* Suggestions */}

                <div className="p-6 border-b border-slate-800">

                <div className="flex items-center gap-2 mb-4">

                    <Sparkles
                    className="text-[#00D09C]"
                    size={18}
                    />

                    <span className="text-white font-medium">
                    Suggested Questions
                    </span>

                </div>

                <div className="flex flex-wrap gap-3">

                    {suggestedQuestions.map((item) => (

                    <button
                        key={item}
                        onClick={() =>
                        handleSend(item)
                        }
                        className="
                        px-4 py-2
                        rounded-xl
                        bg-slate-800
                        text-slate-300
                        hover:bg-slate-700
                        transition
                        "
                    >
                        {item}
                    </button>

                    ))}

                </div>

                </div>

                {/* Messages */}

                <div
                className="
                    flex-1
                    overflow-y-auto
                    p-6
                    space-y-6
                "
                >

                {activeSession.messages.map(
                    (message, index) => (

                    <div
                        key={index}
                        className={`
                            flex gap-4

                            ${
                                message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }
                        `}
                    >

                        <div
                        className={`
                            p-3 rounded-2xl h-fit

                            ${
                            message.role === "user"
                                ? "bg-[#00D09C]"
                                : "bg-[#00D09C]/20"
                            }
                        `}
                        >

                        {message.role === "user" ? (

                            <User
                            size={20}
                            className="text-slate-950"
                            />

                        ) : (

                            <Bot
                            size={20}
                            className="text-[#00D09C]"
                            />

                        )}

                        </div>

                        <div
                            className={`
                                rounded-2xl
                                px-5
                                py-4
                                text-[15px]
                                leading-7
                                max-w-4xl

                                ${
                                    message.role === "user"
                                    ? "bg-[#00D09C] text-slate-950"
                                    : "bg-slate-950 border border-slate-800 text-slate-200"
                                }
                            `}
                        >
                        <div
                            className="
                                prose
                                prose-sm
                                prose-invert
                                max-w-none
                                prose-p:text-slate-200
                                prose-strong:text-white
                                prose-li:text-slate-200
                            "
                        >
                            <ReactMarkdown>
                                {message.content}
                            </ReactMarkdown>
                        </div>
                        </div>

                    </div>

                    )
                )}

                {loading && (

                    <div className="flex gap-4">

                    <div
                        className="
                        p-3 rounded-2xl
                        bg-[#00D09C]/20
                        "
                    >
                        <Bot
                        size={20}
                        className="text-[#00D09C]"
                        />
                    </div>

                    <div
                        className="
                        bg-slate-950
                        border border-slate-800
                        rounded-2xl
                        px-5 py-4
                        text-slate-400
                        "
                    >
                        Thinking...
                    </div>

                    </div>

                )}

                <div ref={messagesEndRef} />

                </div>

                {/* Input */}

                <div
                className="
                    border-t border-slate-800
                    p-6
                "
                >

                <div className="flex gap-4">

                    <input
                    value={question}
                    onChange={(e) =>
                        setQuestion(
                        e.target.value
                        )
                    }
                    onKeyDown={(e) => {

                        if (
                        e.key === "Enter"
                        ) {
                        handleSend();
                        }

                    }}
                    placeholder="Ask CreditIQ Copilot..."
                    className="
                        flex-1
                        bg-slate-950
                        border border-slate-700
                        rounded-2xl
                        px-5 py-4
                        text-white
                        focus:outline-none
                        focus:border-[#00D09C]
                    "
                    />

                    <button
                    onClick={() =>
                        handleSend()
                    }
                    disabled={loading}
                    className="
                        px-6
                        rounded-2xl
                        bg-[#00D09C]
                        text-slate-950
                        hover:scale-105
                        transition
                    "
                    >

                    <Send size={20} />

                    </button>

                </div>

                </div>

            </div>

        )}
        </div>
        </div>
      </div>

    </DashboardLayout>
  );
}