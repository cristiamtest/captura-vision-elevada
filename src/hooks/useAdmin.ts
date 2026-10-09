import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

/** Admin = signed-in user with a document in the Firestore `admins` collection (rules enforce it). */
export function useAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) { setIsAdmin(false); setLoading(false); return; }
      try {
        const snap = await getDoc(doc(db, "admins", u.uid));
        setIsAdmin(snap.exists());
      } catch {
        setIsAdmin(false);
      }
      setLoading(false);
    });
  }, []);

  return { user, isAdmin, loading };
}
