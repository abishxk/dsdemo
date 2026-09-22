import { useState } from "react";
import { imageSlots } from "../../data/images";
import { cn } from "../../lib/utils";

interface PhotoProps {
  imageId: string;
  className?: string;
  /** CSS object-position, e.g. "center 30%". Defaults to the slot's own value or "center". */
  position?: string;
  /** Use for the single largest above-the-fold image (hero). Everything else lazy-loads. */
  eager?: boolean;
}

/**
 * Renders real photography from /public/images. Every id is registered in
 * src/data/images.ts with its intended file path — drop a JPG at that path
 * and it renders immediately, no component changes required.
 *
 * If the file isn't there yet, falls back to a plain dark studio-toned
 * surface (no icons, no debug labels) so the layout never looks broken or
 * unfinished while assets are being produced.
 */
export function Photo({ imageId, className, position, eager = false }: PhotoProps) {
  const slot = imageSlots[imageId];
  const [failed, setFailed] = useState(false);

  if (!slot || failed) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-surface-light via-surface to-bg",
          className,
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 15%, rgba(40,100,255,0.14), transparent 55%), radial-gradient(circle at 85% 85%, rgba(23,77,255,0.1), transparent 50%)",
        }}
        role="img"
        aria-label={slot?.alt ?? "D's Spotless Auto Detailing"}
      />
    );
  }

  return (
    <img
      src={slot.src}
      alt={slot.alt}
      className={cn("object-cover", className)}
      style={{ objectPosition: position ?? slot.position ?? "center" }}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
