import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  const defaultColor = props.defaultColor ? props.defaultColor : Colors.tabIconDefault;
  const focusedColor = props.focusedColor ? props.focusedColor: Colors.tabIconSelected;
  return (
    <FontAwesome
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? focusedColor : defaultColor}
    />
  );
}
