import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useFonts, PlayfairDisplay_700Bold_Italic } from '@expo-google-fonts/playfair-display';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { useTheme } from '../../../theme/ThemeContext';
import { setAISuggesting, setActiveSketchKey, setSketchTemplate, migrateSketchKey } from '../../../store/slices/canvasSlice';
import * as MediaLibrary from 'expo-media-library';
import uploadService from '../../../services/uploadService';
import { createSketch, updateSketch } from '../../../store/slices/sketchesSlice';
import { saveLocalSketch, updateLocalSketch } from '../../../store/slices/localSketchesSlice';
import { RootStackParamList } from '../../../navigation/types';
import DrawingCanvas, { DrawingCanvasHandle } from '../components/DrawingCanvas';
import BottomToolbar from '../components/BottomToolbar';
import AISuggestionButton from '../components/AISuggestionButton';

const CanvasScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Canvas'>>();
  const editSketchId = route.params?.editSketchId;
  const editSketchName = route.params?.editSketchName;

  const dispatch = useDispatch<AppDispatch>();
  const canvasRef = useRef<DrawingCanvasHandle>(null);
  const [saving, setSaving] = useState(false);
  const [savingDevice, setSavingDevice] = useState(false);
  const [savingLocal, setSavingLocal] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [localNameModalVisible, setLocalNameModalVisible] = useState(false);
  const [sketchName, setSketchName] = useState('');
  const selectedId = useSelector((state: RootState) => state.projects.selectedId);
  const project = useSelector((state: RootState) =>
    state.projects.items.find((p) => p.id === selectedId),
  );
  const { colors } = useTheme();

  const isAISuggesting = useSelector((state: RootState) => state.canvas.isAISuggesting);
  const lastSketchImageUrl = useSelector((state: RootState) => {
    if (!selectedId) return undefined;
    const sketches = (state as any).sketches?.itemsByProject?.[selectedId];
    return sketches && sketches.length > 0 ? sketches[sketches.length - 1]?.imageUrl : undefined;
  });
  const [fontsLoaded] = useFonts({ PlayfairDisplay_700Bold_Italic });

  const isEditing = !!editSketchId;
  const activeSketchKey = useSelector((state: RootState) => state.canvas.activeSketchKey);

  // Set active sketch key on mount if not already set by navigation
  useEffect(() => {
    const sketchKey = editSketchId ?? (selectedId ? `new_${selectedId}` : null);
    if (sketchKey) dispatch(setActiveSketchKey(sketchKey));
  }, []);

  const defaultSketchName = () => {
    if (isEditing && editSketchName) return editSketchName;
    const now = new Date();
    return `${project?.name ?? 'Sketch'} — ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const openSaveModal = () => {
    if (!selectedId) return;
    setSketchName(defaultSketchName());
    setNameModalVisible(true);
  };

  const handleSaveCloud = async () => {
    if (!canvasRef.current || !selectedId || !sketchName.trim()) return;
    setSaving(true);
    setNameModalVisible(false);
    try {
      const uri = await canvasRef.current.captureToUri();
      const filename = `sketch_${selectedId}_${Date.now()}.png`;
      const imageUrl = await uploadService.uploadImage(uri, filename);

      if (isEditing && editSketchId) {
        await dispatch(
          updateSketch({
            projectId: selectedId,
            sketchId: editSketchId,
            dto: { name: sketchName.trim(), imageUrl },
          }),
        );
        if (activeSketchKey) {
          dispatch(setSketchTemplate({ sketchKey: activeSketchKey, templateUrl: imageUrl }));
        }
        Alert.alert('Updated', `"${sketchName.trim()}" updated.`);
      } else {
        await dispatch(
          createSketch({
            projectId: selectedId,
            dto: { name: sketchName.trim(), imageUrl },
          }),
        );
        Alert.alert('Saved', `"${sketchName.trim()}" saved to cloud.`);
      }
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message ?? err.message ?? 'Could not save to cloud.');
    } finally {
      setSaving(false);
    }
  };

  const openLocalSaveModal = () => {
    if (!selectedId) return;
    // If already a saved local sketch — update silently (paths persist automatically)
    if (activeSketchKey?.startsWith('local_')) {
      if (editSketchId) {
        dispatch(updateLocalSketch({ projectId: selectedId, sketchId: editSketchId, name: editSketchName ?? defaultSketchName() }));
      }
      Alert.alert('Saved', 'Sketch updated in Sketches.');
      return;
    }
    // New sketch — ask for name
    setSketchName(defaultSketchName());
    setLocalNameModalVisible(true);
  };

  const handleSaveLocal = () => {
    if (!selectedId || !sketchName.trim() || !activeSketchKey) return;
    setSavingLocal(true);
    try {
      const localId = `local_${Date.now()}`;
      const now = new Date().toISOString();
      dispatch(migrateSketchKey({ fromKey: activeSketchKey, toKey: localId }));
      dispatch(saveLocalSketch({
        id: localId,
        name: sketchName.trim(),
        projectId: selectedId,
        createdAt: now,
        updatedAt: now,
        isLocal: true,
      }));
      setLocalNameModalVisible(false);
      Alert.alert('Saved', `"${sketchName.trim()}" saved to Sketches.`);
    } finally {
      setSavingLocal(false);
    }
  };

  const handleSaveDevice = async () => {
    if (!canvasRef.current) return;
    const { status } = await MediaLibrary.requestPermissionsAsync(true);
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Allow access to save images to your gallery.');
      return;
    }
    setSavingDevice(true);
    try {
      const uri = await canvasRef.current.captureToUri();
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Saved', 'Sketch saved to your gallery.');
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Could not save to device.');
    } finally {
      setSavingDevice(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Text style={[styles.headerButtonText, { color: colors.grayLight }]}>✕</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text
              style={[
                styles.headerTitle,
                { color: colors.offWhite },
                fontsLoaded && { fontFamily: 'PlayfairDisplay_700Bold_Italic' },
              ]}
              numberOfLines={1}
            >
              {isEditing ? (editSketchName ?? 'Edit Sketch') : (project?.name ?? 'New Sketch')}
            </Text>
            <View style={[styles.headerDot, { backgroundColor: isEditing ? colors.gold : colors.gold }]} />
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[
                styles.aiButton,
                {
                  borderColor: isAISuggesting ? colors.gold : colors.border,
                  backgroundColor: isAISuggesting ? 'rgba(212,175,55,0.12)' : 'transparent',
                },
              ]}
              onPress={() => dispatch(setAISuggesting(!isAISuggesting))}
            >
              <Text style={[styles.aiButtonText, { color: isAISuggesting ? colors.gold : colors.grayLight }]}>
                ✦ AI
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: saving ? colors.goldDim : colors.gold }]}
              onPress={openSaveModal}
              disabled={saving || !selectedId}
              activeOpacity={0.8}
            >
              <Text style={[styles.saveButtonText, { color: colors.background }]}>
                {saving ? '…' : isEditing ? 'Update' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Canvas */}
        <View style={styles.canvasWrapper}>
          <DrawingCanvas ref={canvasRef} />
          {isAISuggesting && (
            <AISuggestionButton
              currentSketchImageUrl={lastSketchImageUrl}
              projectName={project?.name}
            />
          )}
          <BottomToolbar
            onSaveCloud={openSaveModal}
            savingCloud={saving}
            onSaveDevice={handleSaveDevice}
            savingDevice={savingDevice}
            onSaveLocal={openLocalSaveModal}
            savingLocal={savingLocal}
          />
        </View>
      </SafeAreaView>

      <Modal
        visible={nameModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setNameModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[saveModalStyles.overlay, { backgroundColor: colors.overlay }]}
        >
          <View style={[saveModalStyles.card, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <View style={[saveModalStyles.cornerTL, { borderColor: colors.gold }]} />
            <View style={[saveModalStyles.cornerBR, { borderColor: colors.gold }]} />

            <Text style={[saveModalStyles.title, { color: colors.offWhite }]}>
              {isEditing ? 'Update Sketch' : 'Save Sketch'}
            </Text>
            <View style={[saveModalStyles.divider, { backgroundColor: colors.border }]} />

            <Text style={[saveModalStyles.label, { color: colors.grayLight }]}>Sketch Name</Text>
            <TextInput
              style={[saveModalStyles.input, { backgroundColor: colors.surface, borderColor: colors.gold, color: colors.offWhite }]}
              value={sketchName}
              onChangeText={setSketchName}
              placeholder="e.g. Front View"
              placeholderTextColor={colors.gray}
              selectionColor={colors.gold}
              autoFocus
              selectTextOnFocus
            />

            <View style={saveModalStyles.actions}>
              <TouchableOpacity
                onPress={() => setNameModalVisible(false)}
                style={[saveModalStyles.cancelBtn, { borderColor: colors.border }]}
              >
                <Text style={[saveModalStyles.cancelText, { color: colors.grayLight }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveCloud}
                disabled={!sketchName.trim()}
                activeOpacity={0.85}
              >
                <View style={[saveModalStyles.saveBtn, { backgroundColor: sketchName.trim() ? colors.gold : colors.gray }]}>
                  <Text style={[saveModalStyles.saveBtnText, { color: colors.background }]}>
                    {isEditing ? 'Update' : 'Save'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Local Save Modal */}
      <Modal
        visible={localNameModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLocalNameModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[saveModalStyles.overlay, { backgroundColor: colors.overlay }]}
        >
          <View style={[saveModalStyles.card, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <View style={[saveModalStyles.cornerTL, { borderColor: colors.gold }]} />
            <View style={[saveModalStyles.cornerBR, { borderColor: colors.gold }]} />

            <Text style={[saveModalStyles.title, { color: colors.offWhite }]}>Save to Sketches</Text>
            <View style={[saveModalStyles.divider, { backgroundColor: colors.border }]} />

            <Text style={[saveModalStyles.label, { color: colors.grayLight }]}>Sketch Name</Text>
            <TextInput
              style={[saveModalStyles.input, { backgroundColor: colors.surface, borderColor: colors.gold, color: colors.offWhite }]}
              value={sketchName}
              onChangeText={setSketchName}
              placeholder="e.g. Front View"
              placeholderTextColor={colors.gray}
              selectionColor={colors.gold}
              autoFocus
              selectTextOnFocus
            />

            <View style={saveModalStyles.actions}>
              <TouchableOpacity
                onPress={() => setLocalNameModalVisible(false)}
                style={[saveModalStyles.cancelBtn, { borderColor: colors.border }]}
              >
                <Text style={[saveModalStyles.cancelText, { color: colors.grayLight }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveLocal}
                disabled={!sketchName.trim() || savingLocal}
                activeOpacity={0.85}
              >
                <View style={[saveModalStyles.saveBtn, { backgroundColor: sketchName.trim() ? colors.gold : colors.gray }]}>
                  <Text style={[saveModalStyles.saveBtnText, { color: colors.background }]}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: { fontSize: 16 },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 18,
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  headerDot: { width: 6, height: 6, borderRadius: 3, marginTop: 2 },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 46,
    alignItems: 'center',
  },
  aiButtonText: { fontSize: 12, letterSpacing: 0.8, fontWeight: '600' },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
  canvasWrapper: { flex: 1, position: 'relative' },
});

const saveModalStyles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  card: { width: '100%', borderRadius: 20, padding: 24, borderWidth: 1, position: 'relative' },
  cornerTL: { position: 'absolute', top: 0, left: 0, width: 24, height: 24, borderTopWidth: 1.5, borderLeftWidth: 1.5, borderTopLeftRadius: 20 },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderBottomWidth: 1.5, borderRightWidth: 1.5, borderBottomRightRadius: 20 },
  title: { fontSize: 20, marginBottom: 10, letterSpacing: 0.3 },
  divider: { height: 1, marginBottom: 18 },
  label: { fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 },
  input: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 20 },
  cancelBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, borderWidth: 1 },
  cancelText: { fontSize: 13, letterSpacing: 0.5 },
  saveBtn: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 10, minWidth: 80, alignItems: 'center' },
  saveBtnText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
});

export default CanvasScreen;
