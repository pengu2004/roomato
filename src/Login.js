import supabase from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import {
  ThemeSupa,
} from '@supabase/auth-ui-shared'

export default function Login() {
  return (
    <Auth supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        
      }} />
  );
}
