import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import supabase from '../../api/supabase';

export default function SignupScreen() {
  const router = useRouter();
  
  // 1. All State must be at the top
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. All Logic functions must be above the return
  const handleContinue = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Signup Failed", error.message);
      return;
    }

    if (data.user) {
      // If everything is correct, move to the ID Scan/Profile Setup
      router.push('frontend/screen/accountsetup');
    }
  };

  // 3. The Return must be the VERY LAST thing in the function
  return (
    <LinearGradient colors={['#FF5291', '#FFFFFF']} style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>My Linya</Text>
        </View>

        <Text style={styles.headerTitle}>CREATE ACCOUNT</Text>
        
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.input} 
            placeholder="Email Address" 
            placeholderTextColor="white" 
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Create Password" 
            placeholderTextColor="white" 
            secureTextEntry 
            onChangeText={setPassword}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Confirm Password" 
            placeholderTextColor="white" 
            secureTextEntry 
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity 
          style={styles.signupBtn} 
          onPress={handleContinue}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.signupBtnText}>CONTINUE TO ACCOUNT SETUP</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? <Text style={styles.loginLink}>Login</Text></Text>
        </TouchableOpacity>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, alignItems: 'center', paddingHorizontal: 30 },
  logoContainer: { marginTop: 60, marginBottom: 20 },
  logoText: { fontSize: 40, fontWeight: 'bold', color: 'white', fontStyle: 'italic' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: 'white', marginBottom: 30 },
  inputWrapper: { width: '100%' },
  input: { 
    backgroundColor: '#FF76A8', 
    height: 55, 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    marginBottom: 15, 
    color: 'white',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  signupBtn: { 
    backgroundColor: '#FF5291', 
    width: '100%', 
    height: 55, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20,
    elevation: 5 
  },
  signupBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  footer: { marginTop: 30 },
  footerText: { color: '#666' },
  loginLink: { color: '#FF5291', fontWeight: 'bold' },
});