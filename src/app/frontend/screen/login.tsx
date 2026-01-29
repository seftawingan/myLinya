import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import supabase from '@/app/api/supabase';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      Alert.alert('Login Success', 'You have been logged in!');
      // Optionally navigate to another screen or update app state
    }
  };

  return (
    <LinearGradient
      colors={['#FF5291', '#FFFFFF']}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 items-center px-[30px]">
        
        {/* Logo Section */}
        <View className="mt-[60px] mb-[40px]">
          <Text className="text-[48px] font-bold text-white italic" style={{textShadowColor: 'rgba(0, 0, 0, 0.2)', textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 3,}}>My Linya</Text>
        </View>

        <Text className="text-[28px] font-extrabold text-white mb-[20px] tracking-wide">LOGIN</Text>

        {/* Input Fields */}
        <View className="w-full">
          <TextInput
            className="bg-[#FF76A8] h-[50px] rounded-[5px] px-[15px] mb-[15px] text-white border border-white/50"
            placeholder="Enter your Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="bg-[#FF76A8] h-[50px] rounded-[5px] px-[15px] mb-[15px] text-white border border-white/50"
            placeholder="Enter Your Password"
            placeholderTextColor="white"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity className="self-end">
            <Text className="text-[#666] text-[12px]">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity className="bg-[#FF5291] w-[60%] h-[50px] rounded-[25px] justify-center items-center mt-[30px]" style={{elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,}} onPress={handleLogin}>
          <Text className="text-white text-[18px] font-bold">LOGIN</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-[30px] w-full">
          <View className="flex-1 h-[1px] bg-[#FFB6C1]" />
          <Text className="mx-[10px] text-[#FF5291] text-[12px]">Or Login with</Text>
          <View className="flex-1 h-[1px] bg-[#FFB6C1]" />
        </View>

        {/* Social Icons */}
        <View className="flex-row justify-center gap-[20px]">
          <TouchableOpacity className="w-[50px] h-[50px] rounded-[25px] bg-white justify-center items-center" style={{elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41,}}>
             <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity className="w-[50px] h-[50px] rounded-[25px] bg-white justify-center items-center" style={{elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41,}}>
             <Ionicons name="logo-facebook" size={24} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity className="w-[50px] h-[50px] rounded-[25px] bg-white justify-center items-center" style={{elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41,}}>
             <Ionicons name="mail" size={24} color="#EA4335" />
          </TouchableOpacity>
        </View>

        {/* Signup Link */}
        <View className="flex-row mt-[40px]">
          <Text className="text-[#666]">Don't have an account? </Text>
          <TouchableOpacity>
            <Text className="text-[#FF5291] font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;