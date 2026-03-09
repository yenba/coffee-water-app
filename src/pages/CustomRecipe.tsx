import { useState, useMemo } from "react";
import { HARDNESS_SALTS, BUFFER_SALTS, getSaltById } from "../data/salts";
import { calcGrams, toliters, formatNumber } from "../utils/calculations";
import { usePreferences } from "../utils/PreferencesContext";
import SolutionSelect from "../components/SolutionSelect";
import NumberInput from "../components/NumberInput";
import WaterAmountInput from "../components/WaterAmountInput";

export default function CustomRecipe() {
  const { unit, setUnit, addCustomRecipe } = usePreferences();
  const [waterAmount, setWaterAmount] = useState(1.0);
  const [hardnessSaltId, setHardnessSaltId] = useState("epsom-salt");
  const [bufferSaltId, setBufferSaltId] = useState("baking-soda");
  const [desiredGH, setDesiredGH] = useState(30.0);
  const [desiredKH, setDesiredKH] = useState(70.0);
  const [recipeName, setRecipeName] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "success">("idle");

  const handleSaveRecipe = () => {
    if (!recipeName.trim()) return;
    addCustomRecipe({
      name: recipeName.trim(),
      gh: desiredGH,
      kh: desiredKH,
    });
    setSaveStatus("success");
    setTimeout(() => {
      setSaveStatus("idle");
      setRecipeName("");
    }, 2000);
  };

  const hardnessSalt = getSaltById(hardnessSaltId)!;
  const bufferSalt = getSaltById(bufferSaltId)!;

  const results = useMemo(() => {
    const waterLiters = toliters(waterAmount, unit);
    return {
      hardnessGrams: calcGrams(hardnessSalt.calcAmount, desiredGH, waterLiters),
      bufferGrams: calcGrams(bufferSalt.calcAmount, desiredKH, waterLiters),
    };
  }, [unit, waterAmount, hardnessSalt, bufferSalt, desiredGH, desiredKH]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold">Coffee Water Recipe Builder</h1>
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

      {/* Recipe Name — prominent at top */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 dark:border-sky-800/60 dark:bg-sky-950/30">
        <label className="block text-sm font-semibold text-sky-700 dark:text-sky-400 mb-2">
          Recipe Name
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveRecipe()}
            placeholder="e.g., My Espresso Blend, TWW Inspired..."
            className="flex-1 rounded-lg border border-sky-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-sky-800/60 dark:bg-slate-800 dark:placeholder:text-slate-500"
          />
          <button
            type="button"
            onClick={handleSaveRecipe}
            disabled={!recipeName.trim() || saveStatus === "success"}
            className="rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 disabled:opacity-40 transition-all active:scale-95"
          >
            {saveStatus === "success" ? "✓ Saved!" : "Save Recipe"}
          </button>
        </div>
      </div>

      {/* Two-column layout: controls on left, live results on right */}
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
              label="Desired GH (General Hardness)"
              value={desiredGH}
              onChange={setDesiredGH}
              step={1}
            />
            <NumberInput
              label="Desired KH (Buffer)"
              value={desiredKH}
              onChange={setDesiredKH}
              step={1}
            />
          </div>
        </div>

        {/* Right: Live Results panel */}
        <div className="flex flex-col gap-4 min-w-[220px] lg:min-w-[260px]">

          {/* GH Result */}
          <div className="flex flex-col flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500"></div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Hardness</p>
            <p className="text-2xl font-black text-sky-500 dark:text-sky-400 mb-2">GH <span className="tabular-nums">{desiredGH}</span></p>
            <p className="text-5xl font-black text-sky-500 dark:text-sky-400 tabular-nums">
              {formatNumber(results.hardnessGrams)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">grams</p>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-3">{hardnessSalt.commonName}</p>
            <p className="text-[10px] text-gray-300 dark:text-slate-600 font-mono mt-0.5">{hardnessSalt.formula}</p>
          </div>

          {/* KH Result */}
          <div className="flex flex-col flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 to-purple-500"></div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Buffer</p>
            <p className="text-2xl font-black text-violet-500 dark:text-violet-400 mb-2">KH <span className="tabular-nums">{desiredKH}</span></p>
            <p className="text-5xl font-black text-violet-500 dark:text-violet-400 tabular-nums">
              {formatNumber(results.bufferGrams)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">grams</p>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-3">{bufferSalt.commonName}</p>
            <p className="text-[10px] text-gray-300 dark:text-slate-600 font-mono mt-0.5">{bufferSalt.formula}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
