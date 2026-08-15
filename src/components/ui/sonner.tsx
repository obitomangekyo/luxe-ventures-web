import { Toaster as Sonner, type ToasterProps } from "sonner";
import Caution from "@/assets/svgs/doodle-icons/caution.svg?react";
import Info from "@/assets/svgs/doodle-icons/info.svg?react";
import Tick2 from "@/assets/svgs/doodle-icons/tick-2.svg?react";
import Loader2 from "@/assets/svgs/loader-2.svg?react";
import OctagonX from "@/assets/svgs/octagon-x.svg?react";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <Tick2 className="w-4" />,
        info: <Info className="w-4" />,
        warning: <Caution className="w-4" />,
        error: <OctagonX className="w-4" />,
        loading: <Loader2 className="w-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
