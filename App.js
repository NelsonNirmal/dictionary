import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Dict from './dictionary';
export default function App() {
  return (
    <View style={styles.container}>
      <Dict></Dict>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
     backgroundColor: '#0F4C81',
     
  },
});
