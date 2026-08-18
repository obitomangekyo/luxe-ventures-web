import { useEffect, useRef, useState } from "react";
import { DoodleVideoControls } from "@/components/site/doodle-video-controls";
import { useInView } from "@/hooks/use-in-view";
import { featuredMedia } from "@/lib/featured-media";

export function FeaturedWork() {
  return (
    <section
      className="container mx-auto px-5 pb-28 xl:px-10 xl:pb-40"
      aria-labelledby="featured-work-title"
    >
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-4 font-body text-[10px] text-brand-detail uppercase tracking-[0.3em]">
            A completed celebration
          </p>
          <h2 id="featured-work-title" className="max-w-xl text-4xl leading-tight sm:text-5xl">
            The work, as it happens.
          </h2>
        </div>
        <p className="max-w-xs font-body text-brand-text/60 text-sm leading-6">
          A glimpse of the details, movement, and atmosphere we create for real celebrations.
        </p>
      </div>
      <div className="grid items-start gap-5 *:min-w-0 lg:grid-cols-2">
        <figure className="overflow-hidden border border-brand-detail/50 bg-brand-text/5">
          <FeaturedVideo />
          <figcaption className="border-brand-detail/40 border-t bg-brand-bg px-5 py-4 font-body text-[10px] text-brand-text/70 uppercase tracking-[0.14em]">
            Behind the scenes of a Luxe Ventures celebration
          </figcaption>
        </figure>
        <figure className="overflow-hidden border border-brand-detail/50 bg-brand-text/5">
          <div className="aspect-video overflow-hidden">
            <img
              src={featuredMedia.realWork.src}
              alt={featuredMedia.realWork.alt}
              width={1200}
              height={1600}
              loading="lazy"
              className="block h-full object-contain"
            />
          </div>
          <figcaption className="border-brand-detail/40 border-t bg-brand-bg px-5 py-4 font-body text-[10px] text-brand-text/70 uppercase tracking-[0.14em]">
            From a completed client event
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function FeaturedVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: visibilityRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px",
    triggerOnce: false,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        visibilityRef.current = node;
      }}
      className="group/video relative aspect-video overflow-hidden bg-brand-text/10"
      onPointerUp={(event) => {
        if (event.pointerType === "touch" && isPlaying) {
          setControlsVisible((current) => !current);
        }
      }}
    >
      <video
        ref={videoRef}
        src={featuredMedia.video.src}
        playsInline
        muted={isMuted}
        loop
        preload="metadata"
        onPlay={() => {
          setIsPlaying(true);
          setControlsVisible(false);
        }}
        onPause={() => {
          setIsPlaying(false);
          setControlsVisible(true);
        }}
        onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
        className="block h-full w-full object-contain"
        aria-label={featuredMedia.video.title}
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
