import React, { useRef, useEffect } from 'react';
import {  Easing, StyleSheet, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';

const AnimatedFloatingPlaceholder = () => {
  const translateY = useRef(new Animated.Value(0)).current;
  const fontSize = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -25,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fontSize, {
        toValue: 14,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.floatingLabel, { transform: [{ translateY }] }]}>
        <Animated.Text style={[styles.labelText, { fontSize }]}>Username</Animated.Text>
      </Animated.View>
      <TextInput style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingLabel: {
    position: 'absolute',
    top: 18,
    left: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
  },
  labelText: {
    fontSize: 20,
    color: '#9E9E9E',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#9E9E9E',
    paddingHorizontal: 8,
    fontSize: 20,
  },
});

export default AnimatedFloatingPlaceholder;
