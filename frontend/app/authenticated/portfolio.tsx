import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { createStyles } from '../../assets/styles'; // Adjust path as necessary
import { supabase } from '../../components/supabaseClient';

export default function Portfolio() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = createStyles(isDarkMode);
  
  function usePortfolio() {
    const [portfolio, setPortfolio] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      async function fetchPortfolio() {
        let { data: portfolio, error } = await supabase
          .from('portfolio')
          .select('*');
        
        if (error) {
          console.error('Error fetching portfolio:', error);
        } else {
          setPortfolio(portfolio || []);
          setLoading(false);
        }
      }
      
      fetchPortfolio();
    }, []);
    
    return { portfolio, loading };
  }

const { portfolio, loading } = usePortfolio();

return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio</Text>
      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            {portfolio.map((stock, index) => (
              <View key={index} style={styles.text}>
                <Text style={styles.text}>{stock.stock_name}</Text>
                <Text style={styles.text}>${stock.current_price}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
