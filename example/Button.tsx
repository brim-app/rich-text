import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface ButtonProps {
  source: ImageSourcePropType;
  onPress?: () => void;
  selected?: boolean;
}

export default function Button({ onPress, selected, source }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, selected && styles.selected]}
    >
      <Image source={source} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: 'blue',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
