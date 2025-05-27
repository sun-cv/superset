import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ProgressRingProps {
  radius?: number;
  strokeWidth?: number;
  progress: number; // Value between 0 and 1
  color?: string;
  backgroundColor?: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ProgressRing({
  radius = 60,
  strokeWidth = 10,
  progress,
  color = '#ff7744',
  backgroundColor = '#eee',
}: ProgressRingProps) {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const normalizedProgress = Math.min(Math.max(progress, 0), 1);
  const size = radius * 2 + strokeWidth;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedOffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: normalizedProgress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [normalizedProgress]);

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke={backgroundColor}
        fill="none"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <AnimatedCircle
        stroke={color}
        fill="none"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={animatedOffset}
        strokeLinecap="round"
        rotation="-90"
        originX={center}
        originY={center}
      />
    </Svg>
  );
}
