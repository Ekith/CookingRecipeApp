// File: src/useAuth.ts
import { useState, useEffect } from 'react';
import { supabase } from './App';
import { User } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    loading: boolean;
}

export const useAuth = (): AuthState => {
    const [user, setUser] = useState<User | null>(null); // User : null si non authentifié, objet User sinon
    const [loading, setLoading] = useState<boolean>(true); // Loading : true tant que l'état d'authentification est en cours de détermination

    useEffect(() => {
        let mounted = true;

        const getInitialSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.error('supabase.getSession error', error);
                    if (mounted) setUser(null);
                    return;
                }
                if (mounted) setUser(data?.session?.user ?? null);
            } catch (err) {
                console.error('getInitialSession unexpected error', err);
                if (mounted) setUser(null);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        getInitialSession();

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (!mounted) return;
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const subscription = data?.subscription;

        return () => {
            mounted = false;
            if (subscription && typeof subscription.unsubscribe === 'function') {
                subscription.unsubscribe();
            }
        };
    }, []);

    return { user, loading };
};