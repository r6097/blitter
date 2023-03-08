import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function CreateGroupScreen({ route, navigation }) {
  const { userName } = route.params; 
  const [groupName, setGroupName] = useState('');

  return (
    <View style={styles.container}>
      <Text>
        Creating new Group
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setGroupName}
        value={groupName}
        placeholder="Enter a group name"
      />
      <Button
        title="Create Group"
        onPress={() => navigation.navigate('MembersJoin', { userName: userName, groupName : groupName })}
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
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});