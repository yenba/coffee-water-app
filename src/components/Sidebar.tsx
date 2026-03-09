import { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
    { to: "/", label: "Recipe Picker" },
    { to: "/custom", label: "Recipe Builder" },
    { to: "/lookup", label: "GH/KH Lookup" },
    { to: "/about", label: "About" },
];

function HamburgerIcon({ open }: { open: boolean }) {
    return (
        <div className="flex h-5 w-5 flex-col justify-center gap-[5px]">
            <span
                className={`block h-[2px] w-5 bg-current transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""
                    }`}
            />
            <span
                className={`block h-[2px] w-5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""
                    }`}
            />
            <span
                className={`block h-[2px] w-5 bg-current transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
            />
        </div>
    );
}

export default function Sidebar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Header (visible only on narrow screens) */}
            <div className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-900/90">
                <NavLink to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    <img src="/favicon.svg" alt="Logo" className="h-6 w-6" />
                    <div>
                        coffee<span className="text-sky-500 dark:text-sky-400">water</span>
                    </div>
                </NavLink>
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
                    aria-label="Toggle menu"
                >
                    <HamburgerIcon open={menuOpen} />
                </button>
            </div>

            {/* Backdrop for mobile drawer */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/20 md:hidden dark:bg-black/40"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <nav
                className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 md:static md:translate-x-0 dark:border-slate-800 dark:bg-slate-900 ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="hidden h-16 shrink-0 items-center px-6 md:flex">
                    <NavLink to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <img src="/favicon.svg" alt="Logo" className="h-7 w-7" />
                        <div>
                            coffee<span className="text-sky-500 dark:text-sky-400">water</span>
                        </div>
                    </NavLink>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-4">
                    <div className="space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === "/"}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                        ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Preferences pinned to bottom */}
                <div className="shrink-0 p-4 pb-6 mt-auto border-t border-gray-200 dark:border-slate-800">
                    <NavLink
                        to="/preferences"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400"
                                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
                            }`
                        }
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        Preferences
                    </NavLink>
                </div>
            </nav>
        </>
    );
}
