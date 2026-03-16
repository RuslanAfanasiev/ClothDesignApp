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
import axios from 'axios';
import { useAppContext } from '../authify/context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Colors } from '../theme/colors';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const AppHeader: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { userData, backendUrl, setIsLoggedIn, setUserData, clearToken } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    try { await axios.post(backendUrl + '/logout'); } catch (_) {}
    await clearToken();
    setIsLoggedIn(false);
    setUserData(null);
  };

  const handleVerifyEmail = async () => {
    setMenuOpen(false);
    try {
      await axios.post(backendUrl + '/send-otp');
      navigation.navigate('EmailVerify');
    } catch (error: any) {
      Alert.alert('Eroare', error.response?.data?.message || error.message);
    }
  };

  const firstName = userData?.name?.split(' ')[0] ?? 'Designer';

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        {/* Left — greeting */}
        <View style={styles.greetingWrapper}>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.name} numberOfLines={1}>{firstName}</Text>
        </View>

        {/* Right — avatar + menu */}
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => setMenuOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.avatarText}>
            {(userData?.name?.[0] ?? 'D').toUpperCase()}
          </Text>
          <View style={styles.avatarRing} />
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
            style={styles.dropdown}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.dropdownName}>{userData?.name ?? 'Designer'}</Text>
            <Text style={styles.dropdownEmail}>{userData?.email ?? ''}</Text>
            <View style={styles.dropdownDivider} />

            {!userData?.isAccountVerified && (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleVerifyEmail}
              >
                <Text style={styles.dropdownItemText}>✉  Verify Email</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
              <Text style={[styles.dropdownItemText, styles.logoutText]}>
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
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    color: Colors.grayLight,
    fontSize: 15,
    letterSpacing: 0.5,
  },
  name: {
    color: Colors.offWhite,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    color: Colors.gold,
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
    borderColor: Colors.goldDim,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 100 : 72,
    paddingRight: 20,
  },
  dropdown: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 14,
    padding: 16,
    minWidth: 200,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownName: {
    color: Colors.offWhite,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  dropdownEmail: {
    color: Colors.grayLight,
    fontSize: 11,
    letterSpacing: 0.3,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownItemText: {
    color: Colors.offWhite,
    fontSize: 14,
    letterSpacing: 0.3,
  },
  logoutText: {
    color: '#FF6B6B',
  },
});

export default AppHeader;
