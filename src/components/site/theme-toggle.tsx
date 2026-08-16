import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isSummer = theme === "summer";

  return (
    <button
      type="button"
      aria-pressed={isSummer}
      aria-label={isSummer ? "Switch to classic luxury" : "Switch to summer palette"}
      title={isSummer ? "Switch to classic luxury" : "Switch to summer palette"}
      onClick={toggleTheme}
      className={cn(
        "group/switch relative flex aspect-2/1 w-10 items-center border border-brand-text/20 bg-brand-muted shadow-none transition-colors *:pointer-events-none hover:bg-brand-muted focus-visible:ring-2 focus-visible:ring-brand-detail focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg",
        className,
      )}
    >
      {/* Decoration: 30% of button width.
          Centered inside 40%-wide thumb:
          ((2/5) - (3/10)) / 2 = 1/20 */}
      <span
        className="absolute left-[calc(100%*(1/20)+((100%*(2/5)-100%*(3/10))/2))] aspect-square w-3/10 bg-[linear-gradient(135deg,var(--theme-classic-gold)_0_50%,var(--theme-classic-secondary)_50%_100%)] group-aria-pressed/switch:opacity-25"
        aria-hidden="true"
      />

      <span
        className="absolute right-[calc(100%*(1/20)+((100%*(2/5)-100%*(3/10))/2))] aspect-square w-3/10 bg-[linear-gradient(135deg,var(--theme-summer-mint)_0_50%,var(--theme-summer-peach)_50%_100%)] group-not-aria-pressed/switch:opacity-25"
        aria-hidden="true"
      />

      {/* Thumb:
          80% of button height = 40% of button width.
          5% horizontal gap = (50% - 40%) / 2.
          Travel = 100% - 5% - 40% - 5% = 50% of button width.
          50% / 40% = 125% of thumb width. */}
      <span
        className="absolute left-[calc(100%*(1/20))] aspect-square w-2/5 border border-brand-text/20 shadow-[0_2px_7px_rgb(26_26_26/18%)] transition-transform duration-300 ease-out group-aria-pressed/switch:translate-x-[125%]"
        aria-hidden="true"
      />
    </button>
  );
}
