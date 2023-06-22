import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';
const { button, external, internal, text, externalSmall, internalSmall } =
  styles;

export default function RadioButton({
  children,
  small = false,
  active = false,
  callback,
}: any) {
  return (
    <TouchableOpacity style={button} onPress={callback}>
      <View style={[external, small && externalSmall]}>
        <View style={[active && internal, active && small && internalSmall]} />
      </View>

      <View style={text}>{children}</View>
    </TouchableOpacity>
  );
}
