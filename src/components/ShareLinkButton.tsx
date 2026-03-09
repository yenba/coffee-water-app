import { useState } from "react";
import type { Recipe } from "../data/recipes";

interface ShareLinkButtonProps {
    recipe: Pick<Recipe, "name" | "gh" | "kh">;
}

export default function ShareLinkButton({ recipe }: ShareLinkButtonProps) {
    const [shared, setShared] = useState(false);

    const handleShare = async () => {
        const params = new URLSearchParams();
        params.set("name", recipe.name);
        params.set("gh", recipe.gh.toString());
        params.set("kh", recipe.kh.toString());
        const shareUrl = `${window.location.origin}/#/custom?${params.toString()}`;

        try {
            await navigator.clipboard.writeText(shareUrl);
            setShared(true);
            setTimeout(() => setShared(false), 2000);
        } catch (err) {
            console.error("Failed to copy share link", err);
        }
    };

    return (
        <button
            type="button"
            onClick={handleShare}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${shared
                    ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700"
                }`}
            title="Copy Shareable Link"
        >
            {shared ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    <span>Share</span>
                </>
            )}
        </button>
    );
}
