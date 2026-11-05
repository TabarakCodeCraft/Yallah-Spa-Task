"use client";
import { useRef, useState } from "react";
import { Check, ChevronDown, LucideIcon } from "lucide-react";
import { useOutside } from "./useOutside";

export interface Option {
  value: string;
  label: string;
}
interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder: string;
  icon?: LucideIcon;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useOutside(ref, () => setOpen(false));
  const current = options.find((o) => o.value === value);

  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      pick(options[active].value);
    }
  };

  return (
    <div ref={ref} className="relative space-y-1.5" onKeyDown={onKey}>
      <span className="text-sm font-medium text-ink">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3.5 text-start transition ${open ? "border-olive ring-2 ring-olive/10" : "border-sand hover:border-olive/40"}`}
      >
        {Icon && <Icon size={18} className="text-gold" />}
        <span className={`flex-1 ${current ? "text-ink" : "opacity-50"}`}>
          {current?.label ?? placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`opacity-50 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute inset-x-0 z-30 mt-2 max-h-64 overflow-auto rounded-2xl border border-sand bg-white p-1.5 shadow-xl"
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(o.value)}
              className={`flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-3 transition ${i === active ? "bg-cream" : ""} ${o.value === value ? "font-medium text-ink" : ""}`}
            >
              {o.label}
              {o.value === value && <Check size={16} className="text-olive" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
