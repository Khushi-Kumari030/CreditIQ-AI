"use client";

type Driver = {
  feature: string;
  shap: number;
};

export default function RiskDrivers({
  drivers,
}: {
  drivers: Driver[];
}) {

  const increasedRisk = drivers.filter(
    (d) => d.shap > 0
  );

  const protectiveFactors = drivers.filter(
    (d) => d.shap < 0
  );

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Key Risk Drivers
        </h2>

        <p className="mt-3 text-slate-400 max-w-3xl leading-7">
          SHAP explanations identify which borrower characteristics
          increased or reduced the predicted risk level.
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Increased Risk */}

        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6">

          <h3 className="text-2xl font-semibold text-white">
            Increased Risk
          </h3>

          <p className="mt-2 text-slate-400">
            Features contributing towards higher predicted risk.
          </p>

          <div className="mt-6 space-y-4">

            {increasedRisk.length === 0 ? (

              <p className="text-slate-500">
                No risk-increasing factors identified.
              </p>

            ) : (

              increasedRisk.map((item) => (

                <div
                  key={item.feature}
                  className="
                    flex justify-between items-center
                    bg-slate-900/70
                    border border-slate-700
                    rounded-2xl
                    p-4
                  "
                >

                  <span className="text-white">
                    {item.feature}
                  </span>

                  <span className="font-semibold text-red-400">
                    +{item.shap.toFixed(3)}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

        {/* Protective Factors */}

        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6">

          <h3 className="text-2xl font-semibold text-white">
            Protective Factors
          </h3>

          <p className="mt-2 text-slate-400">
            Features contributing towards lower predicted risk.
          </p>

          <div className="mt-6 space-y-4">

            {protectiveFactors.length === 0 ? (

              <p className="text-slate-500">
                No protective factors identified.
              </p>

            ) : (

              protectiveFactors.map((item) => (

                <div
                  key={item.feature}
                  className="
                    flex justify-between items-center
                    bg-slate-900/70
                    border border-slate-700
                    rounded-2xl
                    p-4
                  "
                >

                  <span className="text-white">
                    {item.feature}
                  </span>

                  <span className="font-semibold text-[#00D09C]">
                    {item.shap.toFixed(3)}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </section>
  );
}