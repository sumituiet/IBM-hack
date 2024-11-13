// logout.tsx
import { supabase } from './supabaseClient';
import { Alert } from 'react-native';

// Custom hook for logout functionality
export const useLogout = () => {

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error', error);
        Alert.alert('Logout Error', error.message);
      }
    } catch (err) {
      console.error('Unexpected error during sign-out:', err);
      Alert.alert('Logout Error', 'An unexpected error occurred');
    }
  };
  return { logout };
};

// Sign-up handler function
export const handleSignUp = async (email: string, password: string, confirmPassword: string) => {
  try {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert('Sign Up Error', error.message);
      return false;
    } else {
      Alert.alert('Success', 'Account created! Please check your email to confirm.');
      return true;
    }
  } catch (err) {
    console.error('Unexpected error during sign-up:', err);
    Alert.alert('Sign Up Error', 'An unexpected error occurred');
    return false;
  }
};

// Login handler function
export const handleLogin = async (email: string, password: string, onSuccess: () => void) => {
  try {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return false;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert('Login Error', error.message);
      return false;
    } else {
      onSuccess();
      return true;
    }
  } catch (err) {
    console.error('Unexpected error during login:', err);
    Alert.alert('Login Error', 'An unexpected error occurred');
    return false;
  }
};
