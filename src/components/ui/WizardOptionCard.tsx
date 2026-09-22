import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface WizardOptionCardProps {
  label: string;
  description?: string;
  icon?: ReactNode;
  selected: boolean;
  onClick: () => void;
}

export function WizardOptionCard({ label, description, icon, selected, onClick }: WizardOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex w-full flex-col items-start gap-1 rounded-xl border p-5 text-left transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.98]",
        selected
          ? "border-blue-bright bg-blue-bright/10"
          : "border-white/10 bg-surface hover:border-white/25",
      )}
    >
      {icon && <div className="mb-1 text-blue-bright">{icon}</div>}
      <span className="font-heading text-base font-semibold tracking-wide">{label}</span>
      {description && <span className="text-sm text-muted">{description}</span>}
    </button>
  );
}
