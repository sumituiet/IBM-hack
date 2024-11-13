import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { supabase } from '../../components/supabaseClient';
import { useRouter } from 'expo-router';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

export default function AuthenticatedLayout() {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const router = useRouter();


    
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                router.push('/'); // Redirect to login if the user is not authenticated
            }
        });
        
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);
    
    // Fix: android  WARN  fontFamily "Ubuntu_700Bold" is not a system font and has not been loaded through expo-font. [Component Stack]
    const [loaded, error] = useFonts({
        'Ubuntu_700Bold': require('../../node_modules/@expo-google-fonts/ubuntu/Ubuntu_700Bold.ttf'),
      });


    useEffect(() => {
        if (loaded || error) {
          SplashScreen.hideAsync();
        }
      }, [loaded, error]);
    
      if (!loaded && !error) {
        return null;
      }

    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: true,
                    headerTitle: "Home Screen",
                    headerStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
                    headerTintColor: isDarkMode ? '#fff' : '#000',
                    headerTitleStyle: { fontFamily: 'System', fontWeight: 'bold' }, 
                    tabBarStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
                    tabBarLabelStyle: { fontFamily: 'System' }, 
                    tabBarIcon: ({ size }) => (
                        <FontAwesome name="home" color={isDarkMode ? '#fff' : '#000'} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
                    headerTintColor: isDarkMode ? '#fff' : '#000',
                    headerTitleStyle: { fontFamily: 'System', fontWeight: 'bold' }, 
                    tabBarStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
                    tabBarLabelStyle: { fontFamily: 'System' },  
                    tabBarIcon: ({ size }) => (
                        <FontAwesome name="user" color={isDarkMode ? '#fff' : '#000'} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    headerStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
                    headerTintColor: isDarkMode ? '#fff' : '#000',
                    headerTitleStyle: { fontFamily: 'System', fontWeight: 'bold' }, 
                    tabBarStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
                    tabBarLabelStyle: { fontFamily: 'System' },  
                    tabBarIcon: ({ size }) => (
                        <FontAwesome name="cog" color={isDarkMode ? '#fff' : '#000'} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="portfolio"
                options={{
                    title: "Portfolio",
                    headerStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
                    headerTintColor: isDarkMode ? '#fff' : '#000',
                    headerTitleStyle: { fontFamily: 'System', fontWeight: 'bold' },
                    tabBarStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
                    tabBarLabelStyle: { fontFamily: 'System' },
                    tabBarIcon: ({ size }) => (
                        <FontAwesome name="line-chart" color={isDarkMode ? '#fff' : '#000'} size={size} />
                    ),
                }}
            />
            
        </Tabs>
    );
}
