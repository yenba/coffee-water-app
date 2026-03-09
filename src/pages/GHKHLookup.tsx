import { useMemo } from "react";
import { HARDNESS_SALTS, BUFFER_SALTS, getSaltById } from "../data/salts";
import { calcGHKH, toliters, formatNumber } from "../utils/calculations";
import { usePreferences } from "../utils/PreferencesContext";
import { usePersistedState } from "../utils/usePersistedState";
import SolutionSelect from "../components/SolutionSelect";
import NumberInput from "../components/NumberInput";
import WaterAmountInput from "../components/WaterAmountInput";

export default function GHKHLookup() {
  const {
    unit, setUnit,
    waterAmount, setWaterAmount,
    hardnessSaltId, setHardnessSaltId,
    bufferSaltId, setBufferSaltId,
  } = usePreferences();
  const [hardnessGrams, setHardnessGrams] = usePersistedState("coffee_water_lookup_hardness_grams", 1.97);
  const [bufferGrams, setBufferGrams] = usePersistedState("coffee_water_lookup_buffer_grams", 0.671);

  const hardnessSalt = getSaltById(hardnessSaltId)!;
  const bufferSalt = getSaltById(bufferSaltId)!;

  const results = useMemo(() => {
    const waterLiters = toliters(waterAmount, unit);
    return {
      gh: calcGHKH(hardnessGrams, hardnessSalt.calcAmount, waterLiters),
      kh: calcGHKH(bufferGrams, bufferSalt.calcAmount, waterLiters),
    };
  }, [unit, waterAmount, hardnessSalt, bufferSalt, hardnessGrams, bufferGrams]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold">GH / KH Lookup</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <a
            href="https://espressoaf.com/guides/water.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 hover:underline transition-colors"
          >
            Take zero or low TDS water, add minerals, shake!
          </a>
        </p>
      </div>

      {/* Two-column layout on wider screens */}
      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">

        {/* Left: Controls */}
        <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          {/* Unit toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Volume Unit: <strong className="capitalize text-sky-500 dark:text-sky-400">{unit}</strong>
            </span>
            <button
              type="button"
              onClick={() => setUnit(unit === "liters" ? "gallons" : "liters")}
              className="text-xs font-medium text-sky-500 hover:underline dark:text-sky-400 cursor-pointer"
            >
              Switch to {unit === "liters" ? "Gallons" : "Liters"}
            </button>
          </div>

          <WaterAmountInput
            label="Water Amount"
            value={waterAmount}
            onChange={setWaterAmount}
            unit={unit}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <SolutionSelect
              label="Hardness Solution"
              salts={HARDNESS_SALTS}
              value={hardnessSaltId}
              onChange={setHardnessSaltId}
            />
            <SolutionSelect
              label="Buffer Solution"
              salts={BUFFER_SALTS}
              value={bufferSaltId}
              onChange={setBufferSaltId}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label={`${hardnessSalt.commonName} used (g)`}
              value={hardnessGrams}
              onChange={setHardnessGrams}
              step={0.001}
            />
            <NumberInput
              label={`${bufferSalt.commonName} used (g)`}
              value={bufferGrams}
              onChange={setBufferGrams}
              step={0.001}
            />
          </div>
        </div>

        {/* Right: Results */}
        <div className="flex flex-col gap-4 min-w-[220px] lg:min-w-[260px]">

          {/* GH Result */}
          <div className="flex flex-col flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500"></div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">General Hardness</p>
            <p className="text-2xl font-black text-sky-500 dark:text-sky-400 mb-2">GH</p>
            <p className="text-5xl font-black text-sky-500 dark:text-sky-400 tabular-nums">
              {formatNumber(results.gh, 1)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">° dGH</p>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-3">{hardnessSalt.commonName}</p>
            <p className="text-[10px] text-gray-300 dark:text-slate-600 font-mono mt-0.5">{hardnessSalt.formula}</p>
          </div>

          {/* KH Result */}
          <div className="flex flex-col flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 to-purple-500"></div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Alkalinity (Buffer)</p>
            <p className="text-2xl font-black text-violet-500 dark:text-violet-400 mb-2">KH</p>
            <p className="text-5xl font-black text-violet-500 dark:text-violet-400 tabular-nums">
              {formatNumber(results.kh, 1)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">° dKH</p>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-3">{bufferSalt.commonName}</p>
            <p className="text-[10px] text-gray-300 dark:text-slate-600 font-mono mt-0.5">{bufferSalt.formula}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
