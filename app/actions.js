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

export async function SetupAccount(formData) {
    const supabase = await createClient();

    // 1. Verify Authentication
    const { data: userData, error: noUser } = await supabase.auth.getUser();

    if (noUser || !userData.user) {
        return redirect('/');
    }

    const userId = userData.user.id;
    const file = formData.get('profile_picture'); // Matches the 'name' attribute in your input tag
    let publicUrl = null;

    // 2. Handle File Upload (If a file exists and has a name)
    if (file && file.size > 0) {
        // We create a unique filename using the User ID and timestamp
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) {
            return { success: false, message: "Image upload failed: " + uploadError.message };
        }

        // Get the public URL for the database
        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);
        
        publicUrl = urlData.publicUrl;
    }

    if (publicUrl === null){
        publicUrl = 'https://api.dicebear.com/7.x/bottts/svg?seed=' + Math.random()
    }

    // 3. Upsert Profile Data (Now including the avatar_url)
    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            username: formData.get('username'),
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            phone_number: formData.get('phone_number'),
            birthdate: formData.get('birthdate'),
            sex: formData.get('sex'),
            avatar_url: publicUrl, // Storing the link, not the file!
            updated_at: new Date().toISOString(),
        });

    if (error) {
        return { success: false, message: error.message };
    }

    // 4. Success!
    return redirect('/home');
}

export async function GetUserProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_url, first_name, last_name')
        .eq('id', user.id)
        .single()
        
    return profile
}

export async function GetAllUsers(searchterm){
    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('id, avatar_url, first_name, last_name')
        .or(`first_name.ilike.%${searchterm}%, last_name.ilike.%${searchterm}%`)
        .order('first_name, last_name', { ascending: true })
        .limit(20)

    return profile
}