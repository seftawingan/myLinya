import "../global.css";
import { Slot } from "expo-router";

import { Text, View, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "./utils/supabase";
import { Image, Link } from "@/tw";
import { useState } from "react";


export function Auth(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      Alert.alert('Error', error.message)
    }
    setLoading(false)
  }
  
  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      Alert.alert('Error', error.message)
    }
    setLoading(false)
  }
}


export default function Layout() {
  return (
    <View className="flex flex-1 bg-white">
      <Header />
      <Slot />
      <Footer />
    </View>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row">
        <Image
          source={require("./assets/myLinya.png")}
          className="w-6 h-6 object-contain mr-2"
        />
        <Link className="font-bold flex-1 items-center justify-center" href="/">
          myLinya
        </Link>
        <View className="flex flex-row gap-4 sm:gap-6">
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            About
          </Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Appointments
          </Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Team
          </Link>
        </View>
      </View>
    </View>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex shrink-0 bg-gray-100 native:hidden"
      style={{ paddingBottom: bottom }}
    >
      <View className="py-6 flex-1 items-start px-4 md:px-6 ">
        <Text className={"text-center text-gray-500"}>
          © {new Date().getFullYear()} Team myLinya
        </Text>
      </View>
    </View>
  );
}
