import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const XP_BAR_HEIGHT = 20;
const SCREEN_WIDTH = Dimensions.get('window').width;
const BAR_WIDTH = SCREEN_WIDTH * 0.85;

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  barColor?: string;
  backgroundColor?: string;
}

export default function XPBar({
  currentXP,
  maxXP,
  level,
  barColor = '#ff7744',
  backgroundColor = '#eee',
}: XPBarProps) {
  const progress = Math.min(currentXP / maxXP, 1);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.xpBarContainer}>
      <View style={styles.xpLabelRow}>
        <Text style={styles.level}>Lv {level}</Text>
        <Text style={styles.xpText}>{currentXP} / {maxXP} XP</Text>
      </View>
      <View style={[styles.xpBarBackground, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.xpBarFill,
            {
              backgroundColor: barColor,
              width: animatedWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  xpBarContainer: {
    marginTop: 24,
    marginBottom: 24,
    alignSelf: 'center',
    width: BAR_WIDTH,
  },
  xpLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  level: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  xpText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  xpBarBackground: {
    height: XP_BAR_HEIGHT,
    borderRadius: XP_BAR_HEIGHT / 2,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: XP_BAR_HEIGHT,
    borderRadius: XP_BAR_HEIGHT / 2,
  },
});
