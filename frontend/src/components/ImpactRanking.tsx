"use client";

type Driver = {
  feature: string;
  shap: number;
};

export default function ImpactRanking({
  drivers,
}: {
  drivers: Driver[];
}) {

  const rankedDrivers = [...drivers].sort(
    (a, b) =>
      Math.abs(b.shap) - Math.abs(a.shap)
  );

  const maxImpact =
    rankedDrivers.length > 0
      ? Math.max(
          ...rankedDrivers.map((d) =>
            Math.abs(d.shap)
          )
        )
      : 1;

  return (
    <section
      className="
        bg-slate-900
        border border-slate-800
        rounded-3xl
        p-8
      "
    >
      {/* Header */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Feature Impact Ranking
        </h2>

        <p className="mt-3 text-slate-400 max-w-3xl leading-7">
          Features are ranked according to the magnitude of
          their contribution to the prediction outcome.
        </p>

      </div>

      {/* Empty State */}

      {rankedDrivers.length === 0 ? (

        <div
          className="
            bg-slate-800/40
            border border-slate-700
            rounded-2xl
            p-8
            text-center
          "
        >

          <p className="text-slate-400">
            No feature impact information available.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {rankedDrivers.map((item, index) => {

            const percentage =
              (Math.abs(item.shap) / maxImpact) * 100;

            return (

              <div
                key={item.feature}
                className="
                  bg-slate-800/50
                  border border-slate-700
                  rounded-2xl
                  p-5
                "
              >

                {/* Top Row */}

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-4">

                    <span
                      className="
                        w-8 h-8
                        rounded-full
                        bg-slate-700
                        flex items-center justify-center
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {index + 1}
                    </span>

                    <span className="text-white font-medium">
                      {item.feature}
                    </span>

                  </div>

                  <span
                    className={`
                      font-semibold
                      ${
                        item.shap > 0
                          ? "text-red-400"
                          : "text-[#00D09C]"
                      }
                    `}
                  >
                    {item.shap > 0 ? "+" : ""}
                    {item.shap.toFixed(3)}
                  </span>

                </div>

                {/* Impact Bar */}

                <div
                  className="
                    mt-4
                    h-3
                    rounded-full
                    bg-slate-700
                    overflow-hidden
                  "
                >

                  <div
                    className={`
                      h-full
                      rounded-full
                      transition-all
                      duration-500
                      ${
                        item.shap > 0
                          ? "bg-red-400"
                          : "bg-[#00D09C]"
                      }
                    `}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>

            );

          })}

        </div>

      )}

    </section>
  );
}