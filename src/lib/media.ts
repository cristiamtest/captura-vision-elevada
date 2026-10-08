import { supabase } from "@/integrations/supabase/client";

export const MEDIA_CATEGORIES = [
  { id: "photos", label: "Photography", type: "image" },
  { id: "floor-plans", label: "Floor Plans", type: "image" },
  { id: "videos", label: "Video Tours", type: "video" },
  { id: "social", label: "Social Media", type: "any" },
  { id: "3d-tours", label: "3D Tours", type: "link" },
  { id: "aerial", label: "Aerial / Drone", type: "any" },
] as const;

export type MediaCategory = (typeof MEDIA_CATEGORIES)[number]["id"];

export interface MediaItem {
  id: string;
  category: string;
  media_type: string; // image | video | link
  url: string; // resolved, viewable url
  storage_path: string | null;
  title: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
}

const BUCKET = "media";
const SIGNED_TTL = 60 * 60 * 24 * 7;

/** Loads media rows and resolves signed URLs for stored files. */
export async function fetchMedia(category?: string): Promise<MediaItem[]> {
  let q = supabase
    .from("media_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (category) q = q.eq("category", category);
  const { data, error } = await q;
  if (error) throw error;
  const rows = (data ?? []) as MediaItem[];
  const paths = rows.filter((r) => r.storage_path).map((r) => r.storage_path!) as string[];
  if (paths.length) {
    const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrls(paths, SIGNED_TTL);
    const map = new Map((signed ?? []).map((s) => [s.path, s.signedUrl]));
    rows.forEach((r) => {
      if (r.storage_path && map.get(r.storage_path)) r.url = map.get(r.storage_path)!;
    });
  }
  return rows;
}

export async function uploadMediaFile(file: File, category: string) {
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `${category}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  const media_type = file.type.startsWith("video") ? "video" : "image";
  const { error: insErr } = await supabase.from("media_items").insert({
    category,
    media_type,
    url: path,
    storage_path: path,
    title: file.name.replace(/\.[^.]+$/, ""),
  });
  if (insErr) throw insErr;
}

export async function addMediaLink(url: string, category: string, title?: string) {
  const { error } = await supabase.from("media_items").insert({
    category,
    media_type: "link",
    url,
    title: title || null,
  });
  if (error) throw error;
}

export async function deleteMedia(item: MediaItem) {
  if (item.storage_path) await supabase.storage.from(BUCKET).remove([item.storage_path]);
  const { error } = await supabase.from("media_items").delete().eq("id", item.id);
  if (error) throw error;
}

export async function updateMedia(id: string, patch: Partial<Pick<MediaItem, "title" | "featured" | "published" | "sort_order" | "category">>) {
  const { error } = await supabase.from("media_items").update(patch).eq("id", id);
  if (error) throw error;
}

/** Converts YouTube / Vimeo links into embeddable URLs; returns the original otherwise. */
export function toEmbedUrl(url: string) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}

export const ADMIN_EMAIL_DOMAIN = "2818studios.com";
/** Usernames map to an internal login email (e.g. admin2818 -> admin2818@2818studios.com). */
export const usernameToEmail = (u: string) =>
  u.includes("@") ? u.trim().toLowerCase() : `${u.trim().toLowerCase()}@${ADMIN_EMAIL_DOMAIN}`;
