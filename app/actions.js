'use server';
import { supabase } from '@/lib/supabaseClient';

export async function AccountCheck(formData){
    const email = formData.get('email');
    const password = formData.get('password');

    const { data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error){
        return {success: false, message: error.message}
    }

    return {success: true, message: ""}
};

export async function RegisterAccount(formData){
    const email = formData.get('email');
    const password = formData.get('password');

    const { data, error} = await supabase.auth.signUp({
        email,
        password
    });

    if (error){
        return {success: false, message: error.message}
    }

    else{
        return {success: true, message: "Account Created"}
    }
};