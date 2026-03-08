interface ResultCardProps {
  title: string;
  children: React.ReactNode;
}

export default function ResultCard({ title, children }: ResultCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-sky-500 dark:text-sky-400">
        {title}
      </h3>
      {children}
    </div>
  );
}
