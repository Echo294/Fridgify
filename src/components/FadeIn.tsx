import { useEffect, useRef, type ReactNode } from "react";
import { Animated } from "react-native";

type FadeInProps = {
  children: ReactNode;
  duration?: number;
};

export default function FadeIn({ children, duration = 300 }: FadeInProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}
