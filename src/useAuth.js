import supabase from "./supabaseClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function useAuth() {
    const navigate = useNavigate();
      const [signedIn, setSignedIn] = useState(false);
        useEffect(() => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSignedIn(!!session);
            });
            const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
                setSignedIn(!!session);
            });
            return () => listener.subscription.unsubscribe();
        }, []);


    const signOut = () => {
            supabase.auth.signOut();
            console.log("User signed out");
            setSignedIn(false);
            navigate("/");


        };
        return { signedIn, signOut };
    }
