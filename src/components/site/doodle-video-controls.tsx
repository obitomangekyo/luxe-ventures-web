import type { RefObject } from "react";
import Maximize from "@/assets/svgs/doodle-icons/maximaize.svg?react";
import Minimize from "@/assets/svgs/doodle-icons/minimize.svg?react";
import Mute from "@/assets/svgs/doodle-icons/mute.svg?react";
import Pause from "@/assets/svgs/doodle-icons/pause.svg?react";
import Play from "@/assets/svgs/doodle-icons/play.svg?react";
import VolumeUp from "@/assets/svgs/doodle-icons/volume-up.svg?react";
import { cn } from "@/lib/utils";

type DoodleVideoControlsProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  isMuted: boolean;
  visible: boolean;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
};

export function DoodleVideoControls({
  videoRef,
  isPlaying,
  isMuted,
  visible,
  isFullscreen,
  onToggleFullscreen,
}: DoodleVideoControlsProps) {
  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  }

  return (
    <div
      className={cn(
        "absolute inset-x-2 bottom-2 flex items-center justify-between border border-brand-detail/60 bg-brand-bg/90 px-2 py-1.5 text-brand-text shadow-lg backdrop-blur-sm transition-opacity duration-200 sm:inset-x-5 sm:bottom-5 sm:px-3 sm:py-2",
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0 group-focus-within/video:pointer-events-auto group-focus-within/video:opacity-100 group-hover/video:pointer-events-auto group-hover/video:opacity-100",
      )}
    >
      <button
        type="button"
        onClick={togglePlayback}
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className="flex size-8 items-center justify-center border border-brand-text/20 transition hover:bg-brand-detail focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-detail sm:size-9"
      >
        {isPlaying ? (
          <Pause className="h-3.5 w-2.5 sm:h-4 sm:w-3" aria-hidden="true" />
        ) : (
          <Play className="h-3.5 w-2.5 sm:h-4 sm:w-3" aria-hidden="true" />
        )}
      </button>
      <button
        type="button"
        onClick={toggleMute}
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="flex size-8 items-center justify-center border border-brand-text/20 transition hover:bg-brand-detail focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-detail sm:size-9"
      >
        {isMuted ? (
          <Mute className="w-4 sm:w-5" aria-hidden="true" />
        ) : (
          <VolumeUp className="w-4 sm:w-5" aria-hidden="true" />
        )}
      </button>
      <button
        type="button"
        onClick={onToggleFullscreen}
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
        aria-label={isFullscreen ? "Exit full screen" : "View video full screen"}
        className="flex size-8 items-center justify-center border border-brand-text/20 transition hover:bg-brand-detail focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-detail sm:size-9"
      >
        {isFullscreen ? (
          <Minimize className="size-3.5 sm:size-4" aria-hidden="true" />
        ) : (
          <Maximize className="size-3.5 sm:size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
