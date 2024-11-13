import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../components/supabaseClient";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Rootlayout() {

    useEffect(() => {
        // Unlock orientation to allow both portrait and landscape globally
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
      }, []);

    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch the session and set it in state
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Listen for changes to the auth state
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    useEffect(() => {
        // Redirect based on session state
        if (session) {
            router.replace("/authenticated");
        } else {
            router.replace("/");
        }
    }, [session]);

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "login screen",
                    headerShown: false,
                    headerTitle: "login screen",
                    // headerTitleStyle: { fontWeight: "bold" },
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    title: "register",
                    headerShown: false,
                    headerTitle: "register screen",
                    // headerTitleStyle: { fontWeight: "bold" },
                }}
            />
            <Stack.Screen
                name="authenticated"
                options={{
                    title: "authenticated",
                    headerShown: false,
                    headerTitle: "authenticated screen",
                    // headerTitleStyle: { fontWeight: "bold" },
                }}
            />
        </Stack>
    );
}
