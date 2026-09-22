import { useState } from "react";
import { Expand } from "lucide-react";
import { Photo } from "./Photo";
import { Lightbox } from "./Lightbox";
import { Carousel } from "./Carousel";
import { Container } from "./Container";
import { galleryItems } from "../../data/gallery";
import type { GalleryCategory } from "../../types";
import { cn } from "../../lib/utils";

const filters: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
  { id: "suvs-trucks", label: "SUVs & Trucks" },
  { id: "cars", label: "Cars" },
];

export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory | "all">("all");
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filtered = activeFilter === "all" ? galleryItems : galleryItems.filter((g) => g.category === activeFilter);
  const current = filtered[active];

  return (
    <div>
      <Container>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Gallery filters">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === f.id}
              onClick={() => {
                setActiveFilter(f.id);
                setActive(0);
              }}
              className={cn(
                "rounded-full border px-4 py-3 text-sm font-medium transition-colors sm:py-2",
                activeFilter === f.id
                  ? "border-blue-bright bg-blue-bright/15 text-white"
                  : "border-white/10 text-muted hover:border-white/25 hover:text-white",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Container>

      <div className="mt-8">
        {/* Breaks out of the page container to bleed edge-to-edge. */}
        <div className="mx-[calc(50%-50vw)] w-screen">
          <Carousel
            key={activeFilter}
            items={filtered}
            getKey={(item) => item.id}
            ariaLabel="Gallery"
            onActiveChange={setActive}
            activeIndex={active}
            trackClassName="gap-4 px-4 sm:px-6"
            slideClassName="w-[74%] sm:w-[36%] lg:w-[20%]"
            renderSlide={(item, index) => (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setActive(index);
                    setLightboxOpen(true);
                  }}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl"
                  aria-label={`Open larger image: ${item.caption}`}
                >
                  <Photo imageId={item.imageId} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                    <Expand
                      className="h-8 w-8 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-90"
                      aria-hidden="true"
                    />
                  </div>
                </button>
                <p className="mt-2 text-xs text-muted">{item.caption}</p>
              </div>
            )}
          />
        </div>

        {current && (
          <p className="mt-3 text-center font-heading text-sm tracking-wide tabular-nums text-muted">
            {String(active + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
          </p>
        )}
      </div>

      <Lightbox
        items={filtered}
        index={lightboxOpen ? active : null}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setActive}
      />
    </div>
  );
}
