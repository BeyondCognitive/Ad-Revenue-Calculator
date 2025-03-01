import { useState } from "react";
import { useForm } from "react-hook-form";

const adRates = {
  US: 2.00,
  CA: 1.50,
  GB: 1.75,
  DE: 1.25,
  Other: 0.50,
};

const bannerRates = {
  "300x250": 1.0,
  "728x90": 1.2,
  "160x600": 0.9,
  "320x50": 0.7,
};

export default function Calculator() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      traffic: 1000,
      US: 50,
      CA: 20,
      GB: 15,
      DE: 10,
      Other: 5,
      bannerType: "300x250",
    }
  });

  const traffic = watch("traffic");
  const US = watch("US");
  const CA = watch("CA");
  const GB = watch("GB");
  const DE = watch("DE");
  const Other = watch("Other");
  const bannerType = watch("bannerType");

  const [revenue, setRevenue] = useState<string | null>(null);

  const calculateRevenue = () => {
    const totalPercentage = Number(US) + Number(CA) + Number(GB) + Number(DE) + Number(Other);
    if (totalPercentage !== 100) {
      return "Total GEO percentage must equal 100%";
    }

    let calculatedRevenue =
      (Number(traffic) * (Number(US) / 100) * adRates.US +
        Number(traffic) * (Number(CA) / 100) * adRates.CA +
        Number(traffic) * (Number(GB) / 100) * adRates.GB +
        Number(traffic) * (Number(DE) / 100) * adRates.DE +
        Number(traffic) * (Number(Other) / 100) * adRates.Other) *
      bannerRates[bannerType];

    setRevenue(`$${calculatedRevenue.toFixed(2)}`);
    return `$${calculatedRevenue.toFixed(2)}`;
  };

  const onSubmit = () => {
    calculateRevenue();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Ad Revenue Calculator
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="traffic"
            >
              Traffic Amount:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="traffic"
              type="number"
              placeholder="Enter traffic amount"
              {...register("traffic", { required: "Traffic amount is required", min: 0 })}
            />
            {errors.traffic && (
              <p className="text-red-500 text-xs italic">
                {errors.traffic.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="geos"
            >
              GEO Percentages:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  className="block text-gray-700 text-xs font-bold mb-1"
                  htmlFor="US"
                >
                  US:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                  id="US"
                  type="number"
                  placeholder="US %"
                  {...register("US", { required: "US percentage is required", min: 0, max: 100 })}
                />
                {errors.US && (
                  <p className="text-red-500 text-xs italic">
                    {errors.US.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-xs font-bold mb-1"
                  htmlFor="CA"
                >
                  CA:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                  id="CA"
                  type="number"
                  placeholder="CA %"
                  {...register("CA", { required: "CA percentage is required", min: 0, max: 100 })}
                />
                {errors.CA && (
                  <p className="text-red-500 text-xs italic">
                    {errors.CA.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-xs font-bold mb-1"
                  htmlFor="GB"
                >
                  GB:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                  id="GB"
                  type="number"
                  placeholder="GB %"
                  {...register("GB", { required: "GB percentage is required", min: 0, max: 100 })}
                />
                {errors.GB && (
                  <p className="text-red-500 text-xs italic">
                    {errors.GB.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-xs font-bold mb-1"
                  htmlFor="DE"
                >
                  DE:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                  id="DE"
                  type="number"
                  placeholder="DE %"
                  {...register("DE", { required: "DE percentage is required", min: 0, max: 100 })}
                />
                {errors.DE && (
                  <p className="text-red-500 text-xs italic">
                    {errors.DE.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-xs font-bold mb-1"
                  htmlFor="Other"
                >
                  Other:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                  id="Other"
                  type="number"
                  placeholder="Other %"
                  {...register("Other", { required: "Other percentage is required", min: 0, max: 100 })}
                />
                {errors.Other && (
                  <p className="text-red-500 text-xs italic">
                    {errors.Other.message}
                  </p>
                )}
              </div>
            </div>
            {(errors.US || errors.CA || errors.GB || errors.DE || errors.Other) && (
              <p className="text-red-500 text-xs italic">
                Please enter valid GEO percentages (0-100).
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bannerType"
            >
              IAB Banner Type:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bannerType"
              {...register("bannerType", { required: "Banner type is required" })}
            >
              <option value="300x250">300x250 - Medium Rectangle</option>
              <option value="728x90">728x90 - Leaderboard</option>
              <option value="160x600">160x600 - Wide Skyscraper</option>
              <option value="320x50">320x50 - Mobile Banner</option>
            </select>
            {errors.bannerType && (
              <p className="text-red-500 text-xs italic">
                {errors.bannerType.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Calculate Revenue
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          {revenue !== null ? (
            <div className="text-xl font-bold text-green-500">
              Estimated Revenue: {revenue}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
