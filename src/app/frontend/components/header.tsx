import "./frontend/styles/global.css";
import { Slot } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useState, useEffect } from "react";
import supabase from "../../api/supabase";
import type { Session } from "@supabase/supabase-js";