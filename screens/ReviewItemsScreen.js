import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import receiptData from '../receiptData.json';

export default function ReviewItemsScreen({ route, navigation }) {
  const { groupName, userName, image } = route.params;
  const receipt = scanImage(receiptData)
  
  // Mock-up of image scanning API
  function scanImage(receiptData) {
    return receiptData;
  } 
  
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
        onPress={() => navigation.navigate('AssignItems', { groupName: groupName, userName: userName, receipt: receipt})}
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