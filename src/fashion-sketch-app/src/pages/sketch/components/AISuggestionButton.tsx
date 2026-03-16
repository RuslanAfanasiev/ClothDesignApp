import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { setAISuggesting } from '../../../store/slices/canvasSlice';
import { Colors } from '../../../theme/colors';

const AISuggestionButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAISuggesting = useSelector(
    (state: RootState) => state.canvas.isAISuggesting,
  );

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAISuggesting) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();

      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      pulseAnim.stopAnimation();
      rotateAnim.stopAnimation();
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
    }
  }, [isAISuggesting]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[styles.wrapper, { transform: [{ scale: pulseAnim }] }]}
    >
      <TouchableOpacity
        onPress={() => dispatch(setAISuggesting(!isAISuggesting))}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={[Colors.goldLight, Colors.gold, Colors.goldDim]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Animated.Text
            style={[styles.icon, { transform: [{ rotate }] }]}
          >
            ✦
          </Animated.Text>
          <Text style={styles.label}>AI</Text>
        </LinearGradient>
      </TouchableOpacity>

      {isAISuggesting && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>●</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 24,
    top: '38%',
    zIndex: 10,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  icon: {
    fontSize: 16,
    color: Colors.background,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 9,
    color: Colors.background,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 1,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#3DFF8F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.background,
  },
  badgeText: {
    fontSize: 6,
    color: Colors.background,
  },
});

export default AISuggestionButton;
