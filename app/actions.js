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

export async function SetupAccount(formData){
    const supabase = await createClient()

    const { data, error : noUser } = await supabase.auth.getUser()

    if(noUser){
        return redirect('/')
    }

    const { error } = await supabase
    .from('profiles')
    .upsert({
        id: data.user.id,
        username: formData.get('username'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        phone_number: formData.get('phone_number'),
        birthdate: formData.get('birthdate'),
        sex: formData.get('sex')
    })

    if(error){
        return {success: false, message: error.message}
    }
    else{
        return redirect('/home')
    }
}