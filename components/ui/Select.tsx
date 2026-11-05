"use client";
import { useId, useRef, useState } from "react";
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
  const uid = useId();
  const labelId = `${uid}-label`;
  const listId = `${uid}-list`;
  useOutside(ref, () => setOpen(false));
  const current = options.find((o) => o.value === value);

  const toggle = () => {
    if (!open) {
      const i = options.findIndex((o) => o.value === value);
      setActive(i >= 0 ? i : 0);
    }
    setOpen(!open);
  };
  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((i) => Math.min(i + 1, options.length - 1));
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
      <span id={labelId} className="text-sm font-medium text-ink">
        {label}
      </span>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-activedescendant={open ? `${uid}-opt-${active}` : undefined}
        onClick={toggle}
        className={`flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3.5 text-start transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive/30 ${
          open
            ? "border-olive ring-2 ring-olive/10"
            : "border-sand hover:border-olive/40"
        }`}
      >
        {Icon && <Icon size={18} className="shrink-0 text-gold" />}
        <span
          className={`flex-1 truncate ${current ? "text-ink" : "text-ink/55"}`}
        >
          {current?.label ?? placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 opacity-50 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute inset-x-0 z-30 mt-2 max-h-64 overflow-auto rounded-2xl border border-sand bg-white p-1.5 shadow-xl"
        >
          {options.map((o, i) => {
            const selected = o.value === value;
            return (
              <li
                key={o.value}
                id={`${uid}-opt-${i}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(o.value)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-3 transition ${
                  i === active ? "bg-cream" : ""
                } ${selected ? "font-medium text-ink" : ""}`}
              >
                {o.label}
                {selected && (
                  <Check size={16} className="shrink-0 text-olive" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
