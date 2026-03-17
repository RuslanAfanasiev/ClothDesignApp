import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import authClient from '../../services/authClient';
import { API_ENDPOINTS } from '../../config/api.config';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const Menubar = () => {
  const navigation = useNavigation<NavProp>();
  const { userData, setUserData, setIsLoggedIn, clearToken } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    setDropdownOpen(false);
    try {
      await authClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (_) {}
    await clearToken();
    setIsLoggedIn(false);
    setUserData(null);
  };

  const sendVerificationOtp = async () => {
    setDropdownOpen(false);
    try {
      await authClient.post(API_ENDPOINTS.AUTH.SEND_OTP);
      Alert.alert('Succes', 'OTP trimis cu succes');
      navigation.navigate('EmailVerify');
    } catch (error: any) {
      Alert.alert('Eroare', error.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>Authify</Text>

      {userData ? (
        <View>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => setDropdownOpen((prev) => !prev)}
          >
            <Text style={styles.avatarText}>
              {userData.name[0].toUpperCase()}
            </Text>
          </TouchableOpacity>

          <Modal
            transparent
            visible={dropdownOpen}
            animationType="fade"
            onRequestClose={() => setDropdownOpen(false)}
          >
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={1}
              onPress={() => setDropdownOpen(false)}
            >
              <View style={styles.dropdown}>
                {!userData.isAccountVerified && (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={sendVerificationOtp}
                  >
                    <Text style={styles.dropdownText}>Verify email</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={handleLogout}
                >
                  <Text style={[styles.dropdownText, styles.danger]}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Login →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    paddingTop: 70,
    paddingRight: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    minWidth: 150,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 15,
    color: '#1a1a1a',
  },
  danger: {
    color: '#dc3545',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  loginText: {
    fontWeight: '600',
    color: '#1a1a1a',
  },
});

export default Menubar;
