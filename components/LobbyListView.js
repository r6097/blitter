import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function LobbyListView({ data }) {
  console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>

        <View style={styles.userList}>
          {
            data.map((x) => {
              return(
                <Text>
                  {x}
                </Text>
              )
            })
          }
        </View>

      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userList: {
    flexDirection: 'column'
  },
  logo: {
    height: 128,
    width: 128,
  }
});
