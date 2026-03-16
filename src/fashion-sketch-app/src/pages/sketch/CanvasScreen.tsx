import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFonts, PlayfairDisplay_700Bold_Italic } from '@expo-google-fonts/playfair-display';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Colors } from '../../theme/colors';
import DrawingCanvas from './components/DrawingCanvas';
import BottomToolbar from './components/BottomToolbar';
import AISuggestionButton from './components/AISuggestionButton';

const CanvasScreen: React.FC = () => {
  const navigation = useNavigation();
  const canvasRef = useRef<View>(null);
  const [saving, setSaving] = useState(false);
  const selectedId = useSelector((state: RootState) => state.projects.selectedId);
  const project = useSelector((state: RootState) =>
    state.projects.items.find((p) => p.id === selectedId),
  );

  const [fontsLoaded] = useFonts({ PlayfairDisplay_700Bold_Italic });

  const handleSave = async () => {
    if (!canvasRef.current) return;
    setSaving(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Allow access to Photos to save your sketch.');
        return;
      }
      const uri = await captureRef(canvasRef, { format: 'jpg', quality: 0.92 });
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Saved', 'Sketch saved to your Photos.');
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Could not save sketch.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Text style={styles.headerButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text
              style={[
                styles.headerTitle,
                fontsLoaded && { fontFamily: 'PlayfairDisplay_700Bold_Italic' },
              ]}
              numberOfLines={1}
            >
              {project?.name ?? 'New Sketch'}
            </Text>
            <View style={styles.headerDot} />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color={Colors.gold} size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Canvas */}
        <View style={styles.canvasWrapper}>
          <DrawingCanvas ref={canvasRef} />
          <AISuggestionButton />
          <BottomToolbar />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    color: Colors.grayLight,
    fontSize: 16,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  headerTitle: {
    color: Colors.offWhite,
    fontSize: 18,
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  headerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
    marginTop: 2,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gold,
    minWidth: 60,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    borderColor: Colors.goldDim,
  },
  saveButtonText: {
    color: Colors.gold,
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  canvasWrapper: {
    flex: 1,
    position: 'relative',
  },
});

export default CanvasScreen;
