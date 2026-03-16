import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../theme/colors';

interface Props {
  name: string;
  fontsLoaded: boolean;
}

const getGreeting = (): string => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const GreetingHeader: React.FC<Props> = ({ name, fontsLoaded }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.greeting}>{getGreeting()},</Text>
        <Text
          style={[
            styles.name,
            fontsLoaded && { fontFamily: 'PlayfairDisplay_700Bold_Italic' },
          ]}
          numberOfLines={1}
        >
          {name || 'Designer'}.
        </Text>
      </View>

      <TouchableOpacity style={styles.avatar}>
        <Text style={styles.avatarText}>
          {(name?.[0] ?? 'D').toUpperCase()}
        </Text>
        <View style={styles.avatarRing} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 20,
  },
  left: {
    flex: 1,
  },
  greeting: {
    color: Colors.grayLight,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  name: {
    color: Colors.offWhite,
    fontSize: 28,
    letterSpacing: 0.3,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 16,
  },
  avatarText: {
    color: Colors.gold,
    fontSize: 16,
    fontWeight: '700',
  },
  avatarRing: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.goldDim,
  },
});

export default GreetingHeader;
