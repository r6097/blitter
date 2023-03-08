import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function StyledButton({ label, onPress }) {
  return (
    <View>
      <Pressable style={styles.customButton} onPress={onPress}>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  customButton: {
    border: "1px solid",
    borderRadius: 8,
    padding: 6
  }
});
