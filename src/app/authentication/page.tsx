"use client";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../../lib/initSupabase";
import { useRouter } from "next/navigation";
//const supabase: SupabaseClient = createClient('https://<project>.supabase.co', '<your-anon-key>')

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
  }
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <>
        <div>Logged in!</div>
        <button onClick={handleLogout}>Log out</button>
      </>
    );
  }
}