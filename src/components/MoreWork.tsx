import { MediaItem, toEmbedUrl } from "@/lib/media";

const SECTIONS = [
  { id: "3d-tours", title: "3D Tours", subtitle: "Walk through every space from anywhere in the world." },
  { id: "social", title: "Social Media Content", subtitle: "Reels, verticals and scroll-stopping clips." },
  { id: "aerial", title: "Aerial Views", subtitle: "A new perspective on every property." },
];

export default function MoreWork({ items }: { items: MediaItem[] }) {
  return (
    <>
      {SECTIONS.map((s) => {
        const list = items.filter((i) => i.category === s.id && !(s.id === "aerial" && i.media_type === "video"));
        if (!list.length) return null;
        return (
          <section key={s.id} className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
            <div className="max-w-7xl mx-auto">
              <p className="text-primary uppercase tracking-[0.3em] text-sm mb-3">Portfolio</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-3">{s.title}</h2>
              <p className="text-background/60 mb-10">{s.subtitle}</p>
              <div className={`grid gap-6 ${s.id === "3d-tours" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                {list.map((m) => (
                  <div key={m.id} className="rounded-2xl overflow-hidden border border-background/15 bg-background/5">
                    <div className={s.id === "3d-tours" ? "aspect-video" : "aspect-[4/5]"}>
                      {m.media_type === "image" && <img src={m.url} alt="" loading="lazy" className="w-full h-full object-cover" />}
                      {m.media_type === "video" && <video src={m.url} controls preload="metadata" className="w-full h-full object-cover" />}
                      {m.media_type === "link" && (
                        <iframe src={toEmbedUrl(m.url)} title={m.title || s.title} allowFullScreen loading="lazy" className="w-full h-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
