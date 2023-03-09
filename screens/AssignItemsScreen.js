import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default function AssignItemsScreen({ route, navigation }) {
  const { groupName, userName, receipt } = route.params;

  return (
    <View style={styles.container}>
      <Text>
        {receipt['subItems']}
      </Text>
      <Text>
        {receipt['subTotal']}
      </Text>
      <Text>
        {receipt['tax']}
      </Text>
      <Text>
        {receipt['total']}
      </Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate('TransactionComplete', { groupName: groupName, userName: userName })}
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