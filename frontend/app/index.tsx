import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { createStyles } from '../assets/styles';
import { Link } from 'expo-router';
import { handleLogin } from '../components/Auth';
import { useRouter } from 'expo-router';

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={()=> handleLogin(email, password, () => { router.push('authenticated/home')})}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Redirect to forgot password screen')}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
    
      <Link href="/register" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>Sign Up?</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
