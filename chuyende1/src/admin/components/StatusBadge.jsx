function StatusBadge({ status }) {
  const map = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Draft: "bg-amber-50 text-amber-700 ring-amber-200",
    Inactive: "bg-zinc-100 text-zinc-600 ring-zinc-200",
    Sale: "bg-rose-50 text-rose-700 ring-rose-200",
  };

  const cls =
    map[status] ??
    "bg-zinc-100 text-zinc-600 ring-zinc-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${cls}`}
    >
      {status}
    </span>
  );
}
