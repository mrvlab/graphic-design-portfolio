import { useEffect, useRef, ComponentRef, useMemo, useCallback } from "react";
import MuxPlayer, {
  MinResolution,
  RenditionOrder,
} from "@mux/mux-player-react";
import "@mux/mux-player";
import "@mux/mux-player/themes/minimal";

type IMuxVideo = {
  playbackId: string;
  className?: string;
  aspectRatio?: string;
  thumbnailTime?: number;
  poster?: string;
  muted?: boolean;
  autoPlay?: boolean | "muted" | "any";
  loop?: boolean | string;
  videoObjectFitCover?: boolean;
};

const DEFAULT_ASPECT_RATIO = "16/9";

const INTERSECTION_OPTIONS = {
  root: null,
  rootMargin: "50px",
  threshold: 0.5,
} as const;

const HIDDEN_CONTROLS_STYLES = {
  "--controls": "none",
  "--dialog": "none",
  "--loading-indicator": "none",
  "--play-button": "none",
  "--live-button": "none",
  "--seek-backward-button": "none",
  "--seek-forward-button": "none",
  "--mute-button": "none",
  "--captions-button": "none",
  "--airplay-button": "none",
  "--pip-button": "none",
  "--fullscreen-button": "none",
  "--cast-button": "none",
  "--playback-rate-button": "none",
  "--volume-range": "none",
  "--time-range": "none",
  "--time-display": "none",
  "--duration-display": "none",
  "--rendition-menu-button": "none",
  "--center-controls": "none",
  "--top-controls": "none",
  "--bottom-controls": "none",
  "--background-color": "none",
  "--media-background-color": "transparent",
  "--media-object-fit": "cover",
} as const;

const OBJECT_FIT_COVER_STYLES = {
  ...HIDDEN_CONTROLS_STYLES,
  "--media-object-fit": "cover",
} as const;

export default function MuxVideo({
  playbackId,
  className,
  aspectRatio,
  thumbnailTime,
  poster,
  muted = true,
  autoPlay = "muted",
  loop = true,
  videoObjectFitCover = false,
}: IMuxVideo) {
  const videoRef = useRef<ComponentRef<typeof MuxPlayer>>(null);

  const finalAspectRatio = useMemo(() => {
    if (!aspectRatio) return DEFAULT_ASPECT_RATIO;
    return aspectRatio.replace(":", "/");
  }, [aspectRatio]);

  const loopValue = useMemo(() => {
    return (loop ? "true" : "false") as unknown as boolean;
  }, [loop]);

  const playerStyles = useMemo(
    () => ({
      aspectRatio: finalAspectRatio,
      ...HIDDEN_CONTROLS_STYLES,
      ...(videoObjectFitCover ? OBJECT_FIT_COVER_STYLES : {}),
    }),
    [finalAspectRatio, videoObjectFitCover],
  );

  const metadata = useMemo(
    () => ({
      video_id: playbackId,
      video_title: "Video",
    }),
    [playbackId],
  );

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      const player = videoRef.current;
      if (!player) return;

      if (entry.isIntersecting) {
        const p = player.play?.();
        if (p !== undefined) {
          p.catch(() => {});
        }
      } else {
        player.pause?.();
      }
    },
    [],
  );

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      handleIntersection,
      INTERSECTION_OPTIONS,
    );
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [handleIntersection]);

  return (
    <MuxPlayer
      ref={videoRef}
      className={`mux-player-ui-none ${className ?? ""}`}
      playbackId={playbackId}
      thumbnailTime={thumbnailTime}
      poster={poster}
      muted={muted}
      autoPlay={autoPlay}
      preload="auto"
      loop={loopValue}
      style={playerStyles as React.CSSProperties}
      metadata={metadata}
      renditionOrder={RenditionOrder.DESCENDING}
      minResolution={MinResolution.noLessThan720p}
    />
  );
}
