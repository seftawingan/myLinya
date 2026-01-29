import "./frontend/styles/global.css";
import { Slot } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image, Link } from "./frontend/components/router";
import { useState, useEffect } from "react";
import supabase from "./api/supabase";
import type { Session } from "@supabase/supabase-js";

export default function Layout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View className="flex flex-1 bg-white">
      <Header session={session} />
      <Slot />
      <Footer />
    </View>
  );
}

function Header({ session }: { session: Session | null }) {
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
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/account"
          >
            {session ? "Account" : "Login"}
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
          © {new Date().getFullYear()} Team VIVII
        </Text>
      </View>
    </View>
  );
}