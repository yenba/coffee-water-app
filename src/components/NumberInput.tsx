import { useState, useEffect } from "react";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 0.1,
}: NumberInputProps) {
  // Track raw string so user can clear the field and retype freely
  const [raw, setRaw] = useState(String(value));

  // Sync raw display if the external value changes (e.g. preset button clicked)
  useEffect(() => {
    setRaw(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setRaw(str);
    const parsed = parseFloat(str);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseFloat(raw);
    if (isNaN(parsed)) {
      // Reset to last valid value
      setRaw(String(value));
    } else {
      // Normalize display (removes trailing dots / leading zeros)
      setRaw(String(parsed));
      onChange(parsed);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <input
        type="number"
        value={raw}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
      />
    </div>
  );
}
