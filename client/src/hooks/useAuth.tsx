import { supabase } from '../singletons';

const useAuth = () => {
    const signup = async (
        email: string,
        password: string,
        first_name: string,
        last_name: string,
    ): Promise<void> => {
        await supabase.auth.signUp({ email, password });
        await supabase.from('user').insert({ email, first_name, last_name});
    }

    const login = async (email: string, password: string): Promise<void> => {
        await supabase.auth.signInWithPassword({ email, password });
    };

    const logout = () => {
        supabase.auth.signOut();
    }

    return { signup, login, logout };

}

export default useAuth;