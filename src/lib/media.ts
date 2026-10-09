import {
  collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where, serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

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
  url: string;
  storage_path: string | null;
  title: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
}

const COL = "media_items";

/** Loads media from Firestore. Public visitors only get published items (enforced by rules). */
export async function fetchMedia(category?: string, includeHidden = false): Promise<MediaItem[]> {
  const filters = [];
  if (!includeHidden) filters.push(where("published", "==", true));
  if (category) filters.push(where("category", "==", category));
  const snap = await getDocs(query(collection(db, COL), ...filters));
  const rows = snap.docs.map((d) => {
    const v = d.data() as any;
    return {
      id: d.id,
      category: v.category,
      media_type: v.media_type,
      url: v.url,
      storage_path: v.storage_path ?? null,
      title: v.title ?? null,
      featured: !!v.featured,
      published: v.published !== false,
      sort_order: v.sort_order ?? 0,
      created_at: v.created_at?.toDate?.().toISOString?.() ?? "",
    } as MediaItem;
  });
  return rows.sort((a, b) => a.sort_order - b.sort_order || b.created_at.localeCompare(a.created_at));
}

export async function uploadMediaFile(file: File, category: string) {
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `media/${category}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const r = ref(storage, path);
  await uploadBytes(r, file, { contentType: file.type });
  const url = await getDownloadURL(r);
  await addDoc(collection(db, COL), {
    category,
    media_type: file.type.startsWith("video") ? "video" : "image",
    url,
    storage_path: path,
    title: file.name.replace(/\.[^.]+$/, ""),
    featured: false,
    published: true,
    sort_order: 0,
    created_at: serverTimestamp(),
  });
}

export async function addMediaLink(url: string, category: string, title?: string) {
  await addDoc(collection(db, COL), {
    category, media_type: "link", url, storage_path: null, title: title || null,
    featured: false, published: true, sort_order: 0, created_at: serverTimestamp(),
  });
}

export async function deleteMedia(item: MediaItem) {
  if (item.storage_path) {
    try { await deleteObject(ref(storage, item.storage_path)); } catch { /* already gone */ }
  }
  await deleteDoc(doc(db, COL, item.id));
}

export async function updateMedia(id: string, patch: Partial<Pick<MediaItem, "title" | "featured" | "published" | "sort_order" | "category">>) {
  await updateDoc(doc(db, COL, id), patch);
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
export const usernameToEmail = (u: string) =>
  u.includes("@") ? u.trim().toLowerCase() : `${u.trim().toLowerCase()}@${ADMIN_EMAIL_DOMAIN}`;
