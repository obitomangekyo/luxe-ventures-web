import { useEffect, useRef, useState } from "react";
import { DoodleVideoControls } from "@/components/site/doodle-video-controls";
import { useInView } from "@/hooks/use-in-view";
import type { BeholdPost } from "@/lib/behold";

export function InstagramPostMedia({ post, isActive }: { post: BeholdPost; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: visibilityRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px",
    triggerOnce: false,
  });
  const image = post.sizes.medium ?? post.sizes.small;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && isInView) {
      video.muted = true;
      setIsMuted(true);
      setControlsVisible(false);
      void video.play().catch(() => {
        setIsPlaying(false);
        setControlsVisible(true);
      });
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      setControlsVisible(true);
    }
  }, [isActive, isInView]);

  useEffect(() => {
    if (!isInView && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isInView]);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement === containerRef.current) {
      void document.exitFullscreen();
      return;
    }

    void containerRef.current?.requestFullscreen();
  }

  if (post.mediaType !== "VIDEO") {
    return (
      <img
        src={image.mediaUrl}
        alt={post.altText || "Luxe Ventures Instagram event styling detail"}
        width={image.width}
        height={image.height}
        className="block h-auto max-h-[min(70vh,38rem)] max-w-full object-contain"
      />
    );
  }

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        visibilityRef.current = node;
      }}
      className="group/video relative flex min-h-0 w-full items-center justify-center overflow-hidden bg-brand-text/5"
      onPointerUp={(event) => {
        if (event.pointerType === "touch" && isPlaying) {
          setControlsVisible((current) => !current);
        }
      }}
    >
      <video
        ref={videoRef}
        src={post.mediaUrl}
        poster={image.mediaUrl}
        loop
        muted={isMuted}
        playsInline
        onPlay={() => {
          setIsPlaying(true);
          setControlsVisible(false);
        }}
        onPause={() => {
          setIsPlaying(false);
          setControlsVisible(true);
        }}
        onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
        className="block h-auto max-h-[min(70vh,38rem)] max-w-full object-contain"
        aria-label={post.altText || "Luxe Ventures Instagram event styling video"}
      />
      <DoodleVideoControls
        videoRef={videoRef}
        isPlaying={isPlaying}
        isMuted={isMuted}
        visible={!isPlaying || controlsVisible}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}
