import type { Unit } from "../utils/PreferencesContext";

interface WaterAmountInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    unit: Unit;
    min?: number;
    max?: number;
    step?: number;
}

export default function WaterAmountInput({
    label,
    value,
    onChange,
    unit,
    min = 0,
    max,
    step = 0.5,
}: WaterAmountInputProps) {
    const presets = unit === "gallons" ? [1, 2.5, 5, 10] : [1, 2, 5, 10];
    const unitLabel = unit === "gallons" ? "gal" : "L";

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {label}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex flex-wrap gap-2">
                    {presets.map((preset) => (
                        <button
                            key={preset}
                            type="button"
                            onClick={() => onChange(preset)}
                            className={`rounded-lg px-3 py-2 text-sm font-medium transition-all min-w-[3rem] ${value === preset
                                ? "bg-sky-500 text-white shadow-sm ring-2 ring-sky-500 ring-offset-1 dark:ring-offset-slate-900"
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white dark:hover:border-slate-500"
                                }`}
                        >
                            {preset}{unitLabel}
                        </button>
                    ))}
                </div>
                <div className="flex-1 relative min-w-[6rem]">
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                        min={min}
                        max={max}
                        step={step}
                        placeholder="Custom"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                    />
                </div>
            </div>
        </div>
    );
}
