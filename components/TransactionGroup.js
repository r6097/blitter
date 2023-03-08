import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default function TransactionGroup({ balance, members, date, location, host }) {
  return (
    <View style={styles.cardContainer}>
      <MaterialIcons name="group" size={24} color="black" />
      <View style={styles.mainContent}>
        <View style={styles.section}>
          <Text>{members}</Text>
          <Text>{balance}</Text>
        </View>
        <View style={styles.section}>
          <Text>{date} {location}</Text>
          <Text>to {host}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    borderBottom: "2px solid #CCCCCC",
    padding: 8,
    marginBottom: 4
  },
  mainContent: {
    flexDirection: "column",
    flexGrow: 2
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

});
