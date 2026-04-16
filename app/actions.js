'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function AccountCheck(formData){

    const supabase = await createClient()

    const { data : authData, error : authError} = await supabase.auth.signInWithPassword({
        email : formData.get('email'),
        password : formData.get('password')
    });

    if (authError){
        return {success: false, message: authError.message}
    }

    const { data : profile } = await supabase.from('profiles').select('username').eq('id', authData.user.id).single()

    if (!profile?.username){
        redirect('/setup')
    }
    
    else{
        redirect('/home')
    }
};

export async function RegisterAccount(formData){
    const supabase = await createClient()

    const { data, error} = await supabase.auth.signUp({
        email : formData.get('email'),
        password : formData.get('password')
    });

    if (error){
        return {success: false, message: error.message}
    }

    return {success: true, message: "Account Created"}
};