import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import LobbyListView from '../components/LobbyListView';
import groupData from '../groupData.json';

export default function MembersJoinScreen({ route, navigation }) {
  const { groupName, userName } = route.params;
  const groupList = fetchGroupData(groupData, groupName);

  // API Mockup to mock database
  function fetchGroupData(groupData, groupName) {
    console.log(groupData[groupName]);
    return groupData[groupName];
  } 


  return (
    <View style={styles.container}>
      <LobbyListView data={groupList} />
      <Button
        title="Copy Group Link"
      />
      <Button
        title="Ready"
        onPress={() => navigation.navigate('Scan', {
          groupName: groupName,
          userName: userName
        })}
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
  }
});