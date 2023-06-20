import React from 'react';
import { Text, Image } from 'react-native';

import globalStyles from '../../styles';
const { img, title } = globalStyles;

export default function Logo() {
  return (
    <>
      <Image style={img} source={require('../../../assets/logo.png')} />
      <Text style={title}>Poshap</Text>
    </>
  );
}
