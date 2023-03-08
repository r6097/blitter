import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default function TransactionCompleteScreen({ route, navigation }) {

  return (
    <View style={styles.container}>
      <Text>
        {receipt}
      </Text>
      <Button
        title="Split Again"
        onPress={() => navigation.navigate('Intro')}
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