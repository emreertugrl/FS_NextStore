import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

type LoadingProps = {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
};

const Loading: React.FC<LoadingProps> = ({
  message = 'Yükleniyor...',
  size = 'large',
  color = '#4c9ef1',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#4c9ef1',
  },
});

export default Loading;
