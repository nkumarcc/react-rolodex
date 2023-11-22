import { createContext, useEffect, useState } from 'react';
import { AppUser } from '../models';
import { supabase } from '../singletons';
import { User, Session } from '@supabase/supabase-js';

interface AuthState {
    session: Session | null,
    user: User | null,
    appUser: AppUser | null,
}

const initialState: AuthState = { session: null, user: null, appUser: null };
export const AuthContext = createContext(initialState);

export function AuthProvider({ children }: any) {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event: string, session: Session | null) => {
                console.log(_event);
                const user = session?.user ?? null;
                const appUser = (
                    user && user.email ?
                        (await supabase.from('user').select().eq('email', user.email).single())?.data :
                        null
                );
                setState({ session, user, appUser });
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    });

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;