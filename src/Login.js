import supabase from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from "react";


export default function Login() {
  // All auth handling is now done globally in useAuth hook
  
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
  );
}
