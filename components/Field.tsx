import type { LucideIcon } from "lucide-react";
interface Props {
  label: string;
  error?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}
export default function Field({ label, error, icon: Icon, children }: Props) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      <span className="relative block">
        {Icon && (
          <Icon
            size={17}
            className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 opacity-50"
          />
        )}
        {children}
      </span>
      {error && (
        <span role="alert" className="block text-[13px] text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}
