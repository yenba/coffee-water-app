import type { Unit } from "../utils/calculations";

interface UnitToggleProps {
  value: Unit;
  onChange: (unit: Unit) => void;
}

export default function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-slate-800">
      <button
        type="button"
        onClick={() => onChange("liters")}
        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
          value === "liters"
            ? "bg-white text-gray-900 shadow-sm dark:bg-slate-700 dark:text-white"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        }`}
      >
        Liters
      </button>
      <button
        type="button"
        onClick={() => onChange("gallons")}
        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
          value === "gallons"
            ? "bg-white text-gray-900 shadow-sm dark:bg-slate-700 dark:text-white"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        }`}
      >
        Gallons
      </button>
    </div>
  );
}
