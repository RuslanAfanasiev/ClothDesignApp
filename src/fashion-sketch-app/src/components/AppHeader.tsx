import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import authClient from '../services/authClient';
import { API_ENDPOINTS } from '../config/api.config';
import { useAppContext } from '../authify/context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/ThemeContext';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const AppHeader: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { userData, setIsLoggedIn, setUserData, clearToken } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors } = useTheme();

  const handleLogout = async () => {
    setMenuOpen(false);
    try { await authClient.post(API_ENDPOINTS.AUTH.LOGOUT); } catch (_) {}
    await clearToken();
    setIsLoggedIn(false);
    setUserData(null);
  };

  const handleVerifyEmail = async () => {
    setMenuOpen(false);
    try {
      await authClient.post(API_ENDPOINTS.AUTH.SEND_OTP);
      navigation.navigate('EmailVerify');
    } catch (error: any) {
      Alert.alert('Eroare', error.response?.data?.message || error.message);
    }
  };

  const firstName = userData?.name?.split(' ')[0] ?? 'Designer';

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <View style={styles.container}>
        {/* Left — greeting */}
        <View style={styles.greetingWrapper}>
          <Text style={[styles.hello, { color: colors.grayLight }]}>Hello,</Text>
          <Text style={[styles.name, { color: colors.offWhite }]} numberOfLines={1}>{firstName}</Text>
        </View>

        {/* Right — avatar + menu */}
        <TouchableOpacity
          style={[styles.avatar, { backgroundColor: colors.surfaceElevated }]}
          onPress={() => setMenuOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.avatarText, { color: colors.gold }]}>
            {(userData?.name?.[0] ?? 'D').toUpperCase()}
          </Text>
          <View style={[styles.avatarRing, { borderColor: colors.goldDim }]} />
        </TouchableOpacity>
      </View>

      {/* Dropdown menu */}
      <Modal
        transparent
        visible={menuOpen}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenuOpen(false)}
        >
          <View
            style={[styles.dropdown, { backgroundColor: colors.surfaceElevated, borderColor: colors.border, shadowColor: colors.gold }]}
            onStartShouldSetResponder={() => true}
          >
            <Text style={[styles.dropdownName, { color: colors.offWhite }]}>{userData?.name ?? 'Designer'}</Text>
            <Text style={[styles.dropdownEmail, { color: colors.grayLight }]}>{userData?.email ?? ''}</Text>
            <View style={[styles.dropdownDivider, { backgroundColor: colors.border }]} />

            {!userData?.isAccountVerified && (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleVerifyEmail}
              >
                <Text style={[styles.dropdownItemText, { color: colors.offWhite }]}>✉  Verify Email</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
              <Text style={[styles.dropdownItemText, styles.logoutText, { color: colors.offWhite }]}>
                ↩  Logout
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  greetingWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  hello: {
    fontSize: 15,
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
  },
  avatarRing: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    borderWidth: 1.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 100 : 72,
    paddingRight: 20,
  },
  dropdown: {
    borderRadius: 14,
    padding: 16,
    minWidth: 200,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  dropdownEmail: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
  dropdownDivider: {
    height: 1,
    marginVertical: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownItemText: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
  logoutText: {
    color: '#FF6B6B',
  },
});

export default AppHeader;
