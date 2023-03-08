import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { Icon } from 'react-native-elements'
import StyledButton from '../components/StyledButton';

import { Camera } from 'expo-camera';

export default function ScanScreen({ route, navigation }) {
  const { groupName, userName } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    navigation.navigate('ReviewItems', {
      groupName: groupName,
      userName: userName,
      image: null
    })
  };
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <StyledButton
          style={{ backgroundColor: 'blue' }}
          label={"Enter Manually Instead"}
          onPress={takePicture}
        />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
});