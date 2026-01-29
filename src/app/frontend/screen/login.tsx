import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Standard with Expo

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <LinearGradient
      colors={['#FF5291', '#FFFFFF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.innerContainer}>
        
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>My Linya</Text>
        </View>

        <Text style={styles.headerTitle}>LOGIN</Text>

        {/* Input Fields */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            placeholderTextColor="white"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Or Login with</Text>
          <View style={styles.line} />
        </View>

        {/* Social Icons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialIcon}>
             <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
             <Ionicons name="logo-facebook" size={24} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
             <Ionicons name="mail" size={24} color="#EA4335" />
          </TouchableOpacity>
        </View>

        {/* Signup Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginTop: 60,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  inputWrapper: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FF76A8',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: 'white',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#666',
    fontSize: 12,
  },
  loginBtn: {
    backgroundColor: '#FF5291',
    width: '60%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFB6C1',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#FF5291',
    fontSize: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  footerText: {
    color: '#666',
  },
  signupText: {
    color: '#FF5291',
    fontWeight: 'bold',
  },
});

export default LoginScreen;