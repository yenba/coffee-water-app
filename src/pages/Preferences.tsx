import { useState } from "react";
import { usePreferences, type Theme } from "../utils/PreferencesContext";

export default function Preferences() {
    const { unit, setUnit, theme, setTheme, resetToDefaults, exportData, importData } = usePreferences();
    const [importText, setImportText] = useState("");
    const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
    const [copied, setCopied] = useState(false);

    const handleCopyExport = async () => {
        try {
            await navigator.clipboard.writeText(exportData());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    const handleImport = () => {
        if (!importText.trim()) return;
        const success = importData(importText.trim());
        if (success) {
            setImportStatus("success");
            setImportText("");
            setTimeout(() => setImportStatus("idle"), 3000);
        } else {
            setImportStatus("error");
            setTimeout(() => setImportStatus("idle"), 3000);
        }
    };

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

                {/* Data & Backup */}
                <div className="pt-4 border-t border-gray-200 dark:border-slate-800 space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-lg font-bold text-sky-400">Data & Backup</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Export your preferences and custom recipes to copy them to another device or browser.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <button
                                type="button"
                                onClick={handleCopyExport}
                                className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 transition-colors"
                            >
                                {copied ? "Copied to Clipboard!" : "Copy Export Data"}
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Import Data
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={importText}
                                    onChange={(e) => setImportText(e.target.value)}
                                    placeholder="Paste exported data string here..."
                                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                                />
                                <button
                                    type="button"
                                    onClick={handleImport}
                                    disabled={!importText.trim()}
                                    className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 disabled:opacity-50 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600 transition-colors"
                                >
                                    Import
                                </button>
                            </div>
                            {importStatus === "success" && (
                                <p className="text-xs font-medium text-green-600 dark:text-green-400">Data imported successfully!</p>
                            )}
                            {importStatus === "error" && (
                                <p className="text-xs font-medium text-red-600 dark:text-red-400">Invalid data format.</p>
                            )}
                        </div>
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
