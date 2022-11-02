import React from 'react';
  
// Import the essential components from react-native
import {
    StyleSheet, Button, View, SafeAreaView,
    Text, Alert
} from 'react-native';
  
// Function for creating button
export default function App() {
    return (
        <View style={styles.container}>
  
            // Create a button
            <Button
  
                // Some properties given to Button
                title="Geeks"
                onPress={() => Alert.alert(
                    'Its GeeksforGeeks !')}
            />
        </View>
    );
}
  
// Some styles given to button
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#71EC4C',
        alignItems: 'center',
        justifyContent: 'center',
    },
});