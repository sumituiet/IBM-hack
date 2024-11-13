import React, { useEffect, useState } from 'react';
import { View, Text, useColorScheme, ActivityIndicator, ScrollView } from 'react-native';
import { createStyles } from '../../assets/styles';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../components/supabaseClient';
import { Button } from 'react-native';
import { useLogout } from '../../components/Auth';

export default function home() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = createStyles(isDarkMode);
  const [session, setSession] = useState<Session | null>(null);

  interface Stock {
    stock_name: string;
    current_price: number;
  }

  const [portfolio, setPortfolio] = useState<Stock[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const { logout } = useLogout();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('stock_name, current_price') // Ensure fields match table schema
        .eq('email', (await supabase.auth.getUser()).data.user?.email);

      if (error) {
        console.error('Error fetching portfolio:', error);
      } else {
        setPortfolio(data);
        
        // Calculate total value based on `current_price`
        const total = data.reduce((acc, stock) => acc + (stock.current_price || 0), 0);
        setTotalValue(total);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <View style={styles.container}>
      {session && session.user ? (
        <Text style={styles.text}>Welcome {session.user.email}</Text>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <Button title="Logout" onPress={logout} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Stock Portfolio</Text>
        <Text style={styles.text}>Total Portfolio Value: ${totalValue.toFixed(2)}</Text>
        {portfolio.map((stock, index) => (
          <View key={index} style={{ marginTop: 15 }}>
            <Text style={styles.text}>
              {stock.stock_name}: ${stock.current_price.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
