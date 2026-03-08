import type { Salt } from "../data/salts";

interface SolutionSelectProps {
  label: string;
  salts: Salt[];
  value: string;
  onChange: (saltId: string) => void;
}

export default function SolutionSelect({
  label,
  salts,
  value,
  onChange,
}: SolutionSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
      >
        {salts.map((salt) => (
          <option key={salt.id} value={salt.id}>
            {salt.commonName}
          </option>
        ))}
      </select>
    </div>
  );
}
