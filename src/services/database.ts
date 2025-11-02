import { supabase } from '../lib/supabase';
import type { CandidateApplication, ContactForm, UserProfile } from '../lib/supabase';

export class DatabaseService {
  // Authentication methods
  static async signUp(email: string, password: string, fullName: string): Promise<{ success: boolean; error?: string; user?: any }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) {
        console.error('Error signing up:', error);
        return { success: false, error: error.message };
      }

      // Create profile after successful signup
      if (data.user) {
        const profileResult = await this.createProfile(data.user.id, fullName);
        if (!profileResult.success) {
          console.error('Error creating profile:', profileResult.error);
        }
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      return { success: false, error: 'An unexpected error occurred during signup' };
    }
  }

  static async signIn(email: string, password: string): Promise<{ success: boolean; error?: string; user?: any }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error signing in:', error);
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Unexpected error during signin:', error);
      return { success: false, error: 'An unexpected error occurred during signin' };
    }
  }

  static async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error signing out:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error during signout:', error);
      return { success: false, error: 'An unexpected error occurred during signout' };
    }
  }

  static async resetPasswordForEmail(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Error sending reset password email:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error sending reset password email:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  static async updateUserPassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Error updating password:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error updating password:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  static async updateUserEmail(newEmail: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });

      if (error) {
        console.error('Error updating email:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error updating email:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Profile management methods
  static async createProfile(userId: string, fullName: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([{
          id: userId,
          full_name: fullName,
        }]);

      if (error) {
        console.error('Error creating profile:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error creating profile:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  static async getProfile(userId: string): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  static async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error updating profile:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  static async uploadProfilePhoto(file: File, userId: string): Promise<{ 
    success: boolean; 
    photoUrl?: string; 
    error?: string 
  }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/profile.${fileExt}`;
      const filePath = fileName;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Error uploading profile photo:', uploadError);
        return { success: false, error: uploadError.message };
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(filePath);

      // Update profile with new photo URL
      const updateResult = await this.updateProfile(userId, { 
        profile_photo_url: publicUrl 
      });

      if (!updateResult.success) {
        return { success: false, error: updateResult.error };
      }

      return { success: true, photoUrl: publicUrl };
    } catch (error) {
      console.error('Unexpected error uploading profile photo:', error);
      return { success: false, error: 'An unexpected error occurred while uploading photo' };
    }
  }

  static async getCurrentUser(): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        // Don't log "Auth session missing!" as an error since it's expected for unauthenticated users
        if (error.message !== 'Auth session missing!') {
          console.error('Error getting current user:', error);
        }
        return { success: false, error: error.message };
      }

      return { success: true, user };
    } catch (error) {
      console.error('Unexpected error getting current user:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Submit candidate application
  static async submitCandidateApplication(data: CandidateApplication): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('candidate_applications')
        .insert([{
          full_name: data.full_name,
          citizenship: data.citizenship,
          phone: data.phone,
          email: data.email,
          main_role: data.main_role,
          business_sector: data.business_sector,
          job_title: data.job_title,
          current_employer: data.current_employer,
          linkedin_url: data.linkedin_url,
          cv_file_id: data.cv_file_path,
          cv_file_name: data.cv_file_name,
          cv_file_size: data.cv_file_size,
          cv_file_type: data.cv_file_type
        }]);

      if (error) {
        console.error('Error submitting candidate application:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Submit contact form
  static async submitContactForm(data: ContactForm): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('contact_forms')
        .insert([data]);

      if (error) {
        console.error('Error submitting contact form:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Upload CV file to Supabase Storage
  static async uploadCV(file: File, candidateEmail: string): Promise<{ 
    success: boolean; 
    filePath?: string; 
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    error?: string 
  }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${candidateEmail}-${Date.now()}.${fileExt}`;
      const filePath = `cvs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('candidate-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading CV:', uploadError);
        return { success: false, error: uploadError.message };
      }

      return { 
        success: true, 
        filePath,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      };
    } catch (error) {
      console.error('Unexpected error uploading CV:', error);
      return { success: false, error: 'An unexpected error occurred while uploading CV' };
    }
  }

  // Get all candidate applications (for admin use)
  static async getCandidateApplications(): Promise<{ success: boolean; data?: CandidateApplication[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('candidate_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching candidate applications:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Get all contact forms (for admin use)
  static async getContactForms(): Promise<{ success: boolean; data?: ContactForm[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('contact_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contact forms:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }
}