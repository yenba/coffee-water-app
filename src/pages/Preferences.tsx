import { usePreferences, type Theme } from "../utils/PreferencesContext";

export default function Preferences() {
    const { unit, setUnit, theme, setTheme, resetToDefaults } = usePreferences();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold">Preferences</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Global application settings
                </p>
            </div>

            <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">

                {/* Units */}
                <div className="space-y-3">
                    <h2 className="text-lg font-bold text-sky-400">Units</h2>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => setUnit("liters")}
                            className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${unit === "liters"
                                ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:border-slate-500"
                                }`}
                        >
                            Liters
                        </button>
                        <button
                            type="button"
                            onClick={() => setUnit("gallons")}
                            className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${unit === "gallons"
                                ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:border-slate-500"
                                }`}
                        >
                            Gallons
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        This unit defaults for all calculations and charts.
                    </p>
                </div>

                {/* Themes */}
                <div className="space-y-3">
                    <h2 className="text-lg font-bold text-sky-400">Theme</h2>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {[
                            { id: "system", label: "System Auto" },
                            { id: "light", label: "Light" },
                            { id: "dark", label: "Dark" },
                        ].map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTheme(t.id as Theme)}
                                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${theme === t.id
                                    ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400"
                                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:border-slate-500"
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reset */}
                <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
                    <button
                        type="button"
                        onClick={resetToDefaults}
                        className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                        Reset to defaults
                    </button>
                </div>

            </div>
        </div>
    );
}
