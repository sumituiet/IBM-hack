import { StyleSheet, Text, View,useColorScheme } from 'react-native'
import React from 'react'
import { createStyles } from '../../assets/styles';

const settings = () => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const styles = createStyles(isDarkMode);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>settings</Text>
    </View>
  )
}

export default settings

const styles = StyleSheet.create({})