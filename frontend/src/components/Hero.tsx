"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative overflow-hidden
        rounded-[32px]
        border border-slate-800
        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950
        p-6 md:p-8
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          -top-32
          -right-32
          w-96
          h-96
          rounded-full
          bg-[#00D09C]
          opacity-10
          blur-3xl
        "
      />

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div>

          <span
            className="
              inline-flex
              items-center
              gap-2
              bg-slate-800
              text-[#00D09C]
              px-4 py-2
              rounded-full
              text-sm
            "
          >
            <Sparkles size={18} /> AI-Powered Lending Intelligence
          </span>

          <h1
            className="
              mt-8
              text-3xl
              md:text-4xl
              font-bold
              text-white
              leading-tight
              max-w-4xl
            "
          >
            Make smarter lending decisions
            with{" "}
            <span className="text-[#00D09C]">
              explainable AI.
            </span>
          </h1>

          <p
            className="
              mt-6
              text-slate-400
              text-lg
              max-w-2xl
            "
          >
            CreditIQ AI combines machine learning,
            explainability and AI copilots to help
            financial institutions assess risk
            confidently.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/simulator"
              className="
                bg-[#00D09C]
                text-slate-950
                px-6 py-3
                rounded-2xl
                font-semibold
                hover:scale-105
                transition
              "
            >
              Analyze Applicant
            </Link>

            <Link
              href="/models"
              className="
                border border-slate-700
                px-6 py-3
                rounded-2xl
                text-white
                hover:bg-slate-800
                transition
              "
            >
              Explore Models
            </Link>

          </div>

        </div>

        {/* RIGHT SIDE - Risk Card */}
        <div
          className="
            bg-slate-900
            border border-slate-800
            rounded-3xl
            p-6
            text-center
            max-w-md
            mx-auto
            w-full
          "
        >

          <p className="text-slate-400">
            Sample Risk Score
          </p>

          <h2 className="text-5xl font-bold mt-4 text-[#00D09C]">
            32%
          </h2>

          <p className="mt-2 text-white">
            Low Risk
          </p>

          {/* Progress Bar */}
          <div className="mt-8">

            <div className="w-full bg-slate-700 rounded-full h-4">

              <div
                className="bg-[#00D09C] h-4 rounded-full"
                style={{ width: "32%" }}
              />

            </div>

          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4">

            <div
              className="
                bg-slate-800
                rounded-2xl
                p-4
              "
            >

              <p className="text-slate-400 text-sm">
                Lead Model
              </p>

              <p className="font-semibold mt-2 text-white">
                XGBoost
              </p>

            </div>

            <div
              className="
                bg-slate-800
                rounded-2xl
                p-4
              "
            >

              <p className="text-slate-400 text-sm">
                ROC-AUC
              </p>

              <p className="font-semibold mt-2 text-white">
                0.860
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}