import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function IntroScreen({ navigation }) {
  const [user, setUser] = useState(null);
  return (
    <View style={styles.container}>
      <Text>
        Welcome 👋
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setUser}
        value={user}
        placeholder="Enter your name!"
      />
      <Button
        title={`Create User`}
        onPress={() => {
          if (!user) {
            Alert.alert("Could Not Create User", "Please enter a name", [
              {
                text: 'Close',
              }
            ])
          } else {
            navigation.navigate('Dashboard', {userName : user})
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});