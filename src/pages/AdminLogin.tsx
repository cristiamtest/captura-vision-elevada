import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User, ArrowLeft, Loader2 } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { usernameToEmail } from "@/lib/media";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logoDark from "@/assets/logo-dark.png";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, loading } = useAdmin();

  useEffect(() => {
    if (!loading && isAdmin) navigate("/admin", { replace: true });
  }, [loading, isAdmin, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return toast.error("Enter your username and password");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, usernameToEmail(username), password);
    } catch {
      setBusy(false);
      return toast.error("Invalid username or password");
    }
    setBusy(false);
    toast.success("Welcome back!");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-3xl" />
      <form onSubmit={submit} className="relative w-full max-w-md rounded-3xl border border-background/15 bg-background/10 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
        <div className="bg-background rounded-2xl p-3 w-fit mb-6"><img src={logoDark} alt="2818 Studios" className="h-12" /></div>
        <h1 className="text-3xl font-bold text-background mb-2">Studio Dashboard</h1>
        <p className="text-background/60 mb-8">Sign in to manage your portfolio.</p>
        <label className="block text-sm text-background/70 mb-2">Username</label>
        <div className="relative mb-5">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-background/50" />
          <Input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" maxLength={100}
            className="pl-10 h-12 bg-background/10 border-background/20 text-background placeholder:text-background/40" placeholder="admin2818" />
        </div>
        <label className="block text-sm text-background/70 mb-2">Password</label>
        <div className="relative mb-8">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-background/50" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" maxLength={200}
            className="pl-10 h-12 bg-background/10 border-background/20 text-background placeholder:text-background/40" placeholder="••••••••" />
        </div>
        <Button type="submit" disabled={busy} className="w-full h-12 text-base rounded-xl">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
