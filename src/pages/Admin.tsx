import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Upload, Trash2, LogOut, Loader2, Image as ImageIcon, Video, Link2, Eye, EyeOff, Star,
  LayoutGrid, ExternalLink, ArrowUp, ArrowDown, CloudUpload,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import {
  MEDIA_CATEGORIES, MediaItem, fetchMedia, uploadMediaFile, addMediaLink, deleteMedia, updateMedia, toEmbedUrl,
} from "@/lib/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logoDark from "@/assets/logo-dark.png";

export default function Admin() {
  const { user, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [active, setActive] = useState<string>("photos");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [drag, setDrag] = useState(false);
  const [link, setLink] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !isAdmin) navigate("/admin/login", { replace: true });
  }, [loading, isAdmin, navigate]);

  const load = useCallback(async () => {
    try {
      setItems(await fetchMedia());
    } catch {
      toast.error("Could not load media");
    }
  }, []);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  const current = useMemo(() => items.filter((i) => i.category === active), [items, active]);
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    items.forEach((i) => (c[i.category] = (c[i.category] || 0) + 1));
    return c;
  }, [items]);

  const handleFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image") || f.type.startsWith("video"));
    if (!list.length) return toast.error("Only images and videos are supported");
    setBusy(true);
    setProgress({ done: 0, total: list.length });
    let ok = 0;
    for (const f of list) {
      try {
        await uploadMediaFile(f, active);
        ok++;
      } catch (e) {
        toast.error(`Failed: ${f.name}`);
      }
      setProgress((p) => (p ? { ...p, done: p.done + 1 } : p));
    }
    setBusy(false);
    setProgress(null);
    if (ok) toast.success(`${ok} file${ok > 1 ? "s" : ""} uploaded`);
    load();
  };

  const submitLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const u = new URL(link.trim());
      if (!["http:", "https:"].includes(u.protocol)) throw new Error();
    } catch {
      return toast.error("Enter a valid https link");
    }
    try {
      await addMediaLink(link.trim(), active, linkTitle.trim().slice(0, 120));
      setLink("");
      setLinkTitle("");
      toast.success("Link added");
      load();
    } catch {
      toast.error("Could not add link");
    }
  };

  const remove = async (item: MediaItem) => {
    if (!confirm("Delete this item permanently?")) return;
    try {
      await deleteMedia(item);
      setItems((p) => p.filter((i) => i.id !== item.id));
      toast.success("Deleted");
    } catch {
      toast.error("Could not delete");
    }
  };

  const patch = async (item: MediaItem, data: Parameters<typeof updateMedia>[1]) => {
    setItems((p) => p.map((i) => (i.id === item.id ? { ...i, ...data } : i)));
    try {
      await updateMedia(item.id, data);
    } catch {
      toast.error("Could not save");
      load();
    }
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const arr = [...current];
    const j = idx + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    const updates = arr.map((it, k) => ({ ...it, sort_order: k }));
    setItems((p) => [...p.filter((i) => i.category !== active), ...updates]);
    await Promise.all(updates.map((u) => updateMedia(u.id, { sort_order: u.sort_order })));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading || !isAdmin)
    return <div className="min-h-screen grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  const cat = MEDIA_CATEGORIES.find((c) => c.id === active)!;

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-background rounded-lg p-1"><img src={logoDark} alt="2818 Studios" className="h-8" /></div>
            <span className="font-semibold hidden sm:inline">Studio Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-background/60 hidden md:inline">{user?.email?.split("@")[0]}</span>
            <Button asChild variant="ghost" size="sm" className="text-background hover:bg-background/10 hover:text-background">
              <Link to="/portfolio" target="_blank"><ExternalLink className="w-4 h-4 mr-1" />View site</Link>
            </Button>
            <Button onClick={signOut} variant="ghost" size="sm" className="text-background hover:bg-background/10 hover:text-background">
              <LogOut className="w-4 h-4 mr-1" />Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {MEDIA_CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  active === c.id ? "bg-primary text-primary-foreground shadow-lg" : "bg-background hover:bg-background/70 border"}`}>
                <span>{c.label}</span>
                <span className={`text-xs rounded-full px-2 py-0.5 ${active === c.id ? "bg-background/20" : "bg-muted"}`}>{counts[c.id] || 0}</span>
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-background border p-4 text-sm">
            <div className="flex items-center gap-2 font-semibold mb-1"><LayoutGrid className="w-4 h-4 text-primary" />Total</div>
            <p className="text-3xl font-bold">{items.length}</p>
            <p className="text-muted-foreground">items in your library</p>
          </div>
        </aside>

        {/* Main */}
        <main className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{cat.label}</h1>
            <p className="text-muted-foreground">Upload, organize and publish what appears on your portfolio.</p>
          </div>

          {/* Uploader */}
          <div className="grid md:grid-cols-2 gap-4">
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
              onClick={() => !busy && fileRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition bg-background ${drag ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}>
              <input ref={fileRef} type="file" multiple hidden accept="image/*,video/*"
                onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ""; }} />
              {busy ? (
                <>
                  <Loader2 className="w-10 h-10 mx-auto animate-spin text-primary mb-3" />
                  <p className="font-medium">Uploading {progress?.done}/{progress?.total}…</p>
                  <div className="h-2 bg-muted rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${progress ? (progress.done / progress.total) * 100 : 0}%` }} />
                  </div>
                </>
              ) : (
                <>
                  <CloudUpload className="w-10 h-10 mx-auto text-primary mb-3" />
                  <p className="font-semibold">Drag & drop files or click to browse</p>
                  <p className="text-sm text-muted-foreground mt-1">Photos & videos · multiple files · up to 500MB each</p>
                </>
              )}
            </div>
            <form onSubmit={submitLink} className="rounded-2xl border bg-background p-6 space-y-3">
              <div className="flex items-center gap-2 font-semibold"><Link2 className="w-4 h-4 text-primary" />Add a link</div>
              <p className="text-sm text-muted-foreground">Matterport / Zillow 3D, YouTube or Vimeo links.</p>
              <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://my.matterport.com/show/?m=…" maxLength={500} />
              <Input value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} placeholder="Title (optional)" maxLength={120} />
              <Button type="submit" className="w-full"><Upload className="w-4 h-4 mr-2" />Add link</Button>
            </form>
          </div>

          {/* Grid */}
          {current.length === 0 ? (
            <div className="rounded-2xl border bg-background p-16 text-center text-muted-foreground">
              <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
              Nothing here yet. Upload your first {cat.label.toLowerCase()}.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {current.map((item, idx) => (
                <div key={item.id} className={`group rounded-2xl overflow-hidden border bg-background ${!item.published ? "opacity-60" : ""}`}>
                  <div className="relative aspect-[4/3] bg-muted">
                    {item.media_type === "image" && <img src={item.url} alt={item.title || ""} loading="lazy" className="w-full h-full object-cover" />}
                    {item.media_type === "video" && <video src={item.url} className="w-full h-full object-cover" muted preload="metadata" controls />}
                    {item.media_type === "link" && (
                      <iframe src={toEmbedUrl(item.url)} title={item.title || "link"} className="w-full h-full pointer-events-none" loading="lazy" />
                    )}
                    <span className="absolute top-2 left-2 rounded-full bg-foreground/80 text-background text-xs px-2 py-1 flex items-center gap-1">
                      {item.media_type === "video" ? <Video className="w-3 h-3" /> : item.media_type === "link" ? <Link2 className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                      {item.media_type}
                    </span>
                    {item.featured && <span className="absolute top-2 right-2 rounded-full bg-primary text-primary-foreground text-xs px-2 py-1">Featured</span>}
                  </div>
                  <div className="p-3 space-y-2">
                    <Input defaultValue={item.title || ""} placeholder="Title" maxLength={120}
                      onBlur={(e) => e.target.value !== (item.title || "") && patch(item, { title: e.target.value })} className="h-9" />
                    <div className="flex items-center gap-1 flex-wrap">
                      <select value={item.category} onChange={(e) => patch(item, { category: e.target.value })}
                        className="h-8 rounded-md border bg-background text-xs px-2 flex-1 min-w-0">
                        {MEDIA_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                      <Button size="icon" variant="ghost" className="h-8 w-8" title="Move up" onClick={() => move(idx, -1)}><ArrowUp className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" title="Move down" onClick={() => move(idx, 1)}><ArrowDown className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" title="Feature" onClick={() => patch(item, { featured: !item.featured })}>
                        <Star className={`w-4 h-4 ${item.featured ? "fill-primary text-primary" : ""}`} />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" title={item.published ? "Hide" : "Publish"} onClick={() => patch(item, { published: !item.published })}>
                        {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" title="Delete" onClick={() => remove(item)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
