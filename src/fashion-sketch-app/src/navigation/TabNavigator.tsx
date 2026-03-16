import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import DashboardScreen from '../pages/dashboard/DashboardScreen';
import AppHeader from '../components/AppHeader';
import { Colors } from '../theme/colors';
import { AppDispatch } from '../store';
import { createProject } from '../store/slices/projectsSlice';

const Tab = createBottomTabNavigator();

// ─── Tab icon ────────────────────────────────────────────────────────────────
interface TabIconProps {
  icon: string;
  label: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, label, focused }) => (
  <View style={tabStyles.iconWrapper}>
    <Text style={[tabStyles.icon, focused && tabStyles.iconFocused]}>{icon}</Text>
    <Text style={[tabStyles.label, focused && tabStyles.labelFocused]}>{label}</Text>
    {focused && <View style={tabStyles.activeDot} />}
  </View>
);

const tabStyles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    paddingTop: 8,
    minWidth: 64,
  },
  icon: {
    fontSize: 20,
    color: Colors.grayLight,
    marginBottom: 3,
  },
  iconFocused: { color: Colors.gold },
  label: {
    fontSize: 9,
    color: Colors.grayLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  labelFocused: { color: Colors.gold },
  activeDot: {
    position: 'absolute',
    bottom: -6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gold,
  },
});

// ─── Center FAB button ────────────────────────────────────────────────────────
const CenterFAB: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={fabStyles.wrapper} onPress={onPress} activeOpacity={0.85}>
    <LinearGradient
      colors={[Colors.goldLight, Colors.gold]}
      style={fabStyles.circle}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={fabStyles.plus}>+</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const fabStyles = StyleSheet.create({
  wrapper: {
    top: -22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
  plus: {
    color: Colors.background,
    fontSize: 30,
    fontWeight: '300',
    lineHeight: 34,
    marginTop: -2,
  },
});

// ─── Create Project Modal ─────────────────────────────────────────────────────
interface CreateModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateProjectModal: React.FC<CreateModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    await dispatch(createProject({ name: name.trim(), description: description.trim() }));
    setLoading(false);
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={modalStyles.overlay}
      >
        <View style={modalStyles.card}>
          <View style={modalStyles.cornerTL} />
          <View style={modalStyles.cornerBR} />

          <Text style={modalStyles.title}>New Collection</Text>
          <View style={modalStyles.divider} />

          <Text style={modalStyles.label}>Project Name</Text>
          <TextInput
            style={modalStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Summer Couture 2026"
            placeholderTextColor={Colors.gray}
            selectionColor={Colors.gold}
          />

          <Text style={[modalStyles.label, { marginTop: 12 }]}>
            Description{' '}
            <Text style={modalStyles.labelOptional}>(optional)</Text>
          </Text>
          <TextInput
            style={[modalStyles.input, modalStyles.inputMultiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Brief description..."
            placeholderTextColor={Colors.gray}
            multiline
            numberOfLines={2}
            selectionColor={Colors.gold}
          />

          <View style={modalStyles.actions}>
            <TouchableOpacity onPress={onClose} style={modalStyles.cancelBtn}>
              <Text style={modalStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCreate}
              disabled={!name.trim() || loading}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={name.trim() ? [Colors.goldLight, Colors.gold] : [Colors.gray, Colors.gray]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={modalStyles.createBtn}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.background} size="small" />
                ) : (
                  <Text style={modalStyles.createText}>Create</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(11,11,15,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderColor: Colors.gold,
    borderTopLeftRadius: 20,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: Colors.gold,
    borderBottomRightRadius: 20,
  },
  title: {
    color: Colors.offWhite,
    fontSize: 22,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 20,
  },
  label: {
    color: Colors.grayLight,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  labelOptional: {
    color: Colors.gray,
    fontSize: 10,
    textTransform: 'none',
    letterSpacing: 0,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.offWhite,
    fontSize: 14,
  },
  inputMultiline: {
    height: 64,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  cancelBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelText: {
    color: Colors.grayLight,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  createBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  createText: {
    color: Colors.background,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

// ─── Placeholder screens ──────────────────────────────────────────────────────
const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => (
  <View style={placeholder.container}>
    <AppHeader />
    <View style={placeholder.content}>
      <Text style={placeholder.icon}>◈</Text>
      <Text style={placeholder.title}>{title}</Text>
      <Text style={placeholder.subtitle}>Coming soon</Text>
    </View>
  </View>
);

const placeholder = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 48, color: Colors.border, marginBottom: 16 },
  title: { color: Colors.offWhite, fontSize: 20, fontWeight: '600', marginBottom: 6 },
  subtitle: { color: Colors.grayLight, fontSize: 13, letterSpacing: 0.5 },
});

const SketchesScreen = () => <PlaceholderScreen title="Sketches" />;
const TemplatesScreen = () => <PlaceholderScreen title="Templates" />;
const SettingsScreen = () => <PlaceholderScreen title="Settings" />;
const EmptyScreen = () => null;

// ─── Tab Navigator ────────────────────────────────────────────────────────────
const TabNavigator: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: Platform.OS === 'ios' ? 80 : 64,
            backgroundColor: Colors.surfaceElevated,
            borderTopWidth: 1,
            borderTopColor: Colors.border,
            elevation: 0,
            shadowColor: Colors.gold,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={40}
              tint="dark"
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
          ),
          tabBarShowLabel: false,
        }}
      >
        {/* LEFT */}
        <Tab.Screen
          name="Projects"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="⊞" label="Projects" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Templates"
          component={TemplatesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="◧" label="Templates" focused={focused} />
            ),
          }}
        />

        {/* CENTER FAB */}
        <Tab.Screen
          name="New"
          component={EmptyScreen}
          options={{
            tabBarButton: () => (
              <CenterFAB onPress={() => setModalVisible(true)} />
            ),
          }}
        />

        {/* RIGHT */}
        <Tab.Screen
          name="Sketches"
          component={SketchesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="✏" label="Sketches" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="⚙" label="Settings" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>

      <CreateProjectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default TabNavigator;
