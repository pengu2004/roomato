import supabase from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from "react";


export default function Login({ onAuthSuccess }) {
    useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        onAuthSuccess();
      }
    });
    
    // Clean up listener when component unmounts
    return () => listener.subscription.unsubscribe();
  }, [onAuthSuccess]);
  

  return (
    
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
  );
}
