import supabase from "./supabaseClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function useAuth(onAuthSuccess) {
    const navigate = useNavigate();
      const [signedIn, setSignedIn] = useState(false);
        useEffect(() => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSignedIn(!!session);
            });
            const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
                setSignedIn(!!session);
                
                // Handle authentication state changes globally
                if (event === 'SIGNED_IN' && session) {
                    // Close login modal if callback provided
                    if (onAuthSuccess) {
                        onAuthSuccess();
                    }
                    
                    try {
                        // Check if user already has a profile
                        const { data, error } = await supabase
                            .from('user_details')
                            .select('*')
                            .eq('user_id', session.user.id)
                            .single();

                        if (data && !error) {
                            // User has profile, go to welcome
                            navigate("/welcome");
                        } else {
                            // User needs to complete onboarding
                            navigate("/onboarding");
                        }
                    } catch (err) {
                        console.error('Error checking user profile:', err);
                        navigate("/onboarding");
                    }
                }
            });
            return () => listener.subscription.unsubscribe();
        }, [navigate, onAuthSuccess]);


    const signOut = () => {
            supabase.auth.signOut();
            console.log("User signed out");
            setSignedIn(false);
            navigate("/");


        };
        return { signedIn, signOut };
    }
