import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system/legacy';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState, AppDispatch } from '../../../store';
import { Project, ProjectStatus, updateProject, deleteProject } from '../../../store/slices/projectsSlice';
import { fetchSketches } from '../../../store/slices/sketchesSlice';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

const STATUS_LABELS: Record<ProjectStatus, string> = {
  DRAFT: 'Draft',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

const STATUSES: ProjectStatus[] = ['DRAFT', 'IN_PROGRESS', 'COMPLETED'];

interface Props {
  project: Project;
  onPress: (id: string) => void;
  fontsLoaded: boolean;
}

const ProjectCard: React.FC<Props> = ({ project, onPress, fontsLoaded }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();

  const [downloading, setDownloading] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  // ── Schitele proiectului din store ─────────────────────────────────────────
  const sketches = useSelector(
    (state: RootState) => state.sketches.itemsByProject[project.id],
  );
  const latestSketchImage = sketches && sketches.length > 0
    ? ([...sketches]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .find(s => !!s.imageUrl)?.imageUrl ?? null)
    : null;

  // Fetch lazy: daca nu au fost incarcate inca schitele acestui proiect
  useEffect(() => {
    if (sketches === undefined) {
      dispatch(fetchSketches(project.id));
    }
  }, [project.id]);

  const previewUrl = latestSketchImage ?? project.previewUrl ?? null;

  const STATUS_COLORS: Record<ProjectStatus, string> = {
    DRAFT: colors.grayLight,
    IN_PROGRESS: colors.gold,
    COMPLETED: '#3DFF8F',
  };

  const handleSelectStatus = (status: ProjectStatus) => {
    dispatch(updateProject({ id: project.id, dto: { status } }));
    setStatusModalVisible(false);
  };

  const handleLongPress = () => {
    Alert.alert('Delete Project', `Delete "${project.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => dispatch(deleteProject(project.id)),
      },
    ]);
  };

  const handleSaveToGallery = async () => {
    if (!previewUrl) {
      Alert.alert(
        'No Preview Image',
        sketchCount > 0
          ? 'Your sketches don\'t have saved images yet.\nOpen canvas → draw → press Save to generate one.'
          : 'Open canvas, draw something, then press Save to create a preview.',
      );
      return;
    }
    const { status } = await MediaLibrary.requestPermissionsAsync(true);
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Allow access to save images to your gallery.');
      return;
    }
    setDownloading(true);
    try {
      const filename = `sketch_${project.id}_${Date.now()}.png`;
      const localUri = (FileSystem.cacheDirectory ?? '') + filename;
      const { uri } = await FileSystem.downloadAsync(previewUrl, localUri);
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Saved', 'Sketch saved to your gallery.');
    } catch {
      Alert.alert('Error', 'Could not save sketch to gallery.');
    } finally {
      setDownloading(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const sketchCount = sketches?.length ?? 0;

  return (
    <>
      <TouchableOpacity
        onPress={() => onPress(project.id)}
        onLongPress={handleLongPress}
        delayLongPress={500}
        activeOpacity={0.85}
        style={styles.wrapper}
      >
        <View style={[styles.card, { backgroundColor: colors.surfaceElevated, borderColor: colors.border, shadowColor: colors.gold }]}>

          {/* ── Preview ────────────────────────────────────────────────────── */}
          <View style={[styles.preview, { backgroundColor: colors.surface }]}>
            {previewUrl ? (
              <>
                <Image
                  source={{ uri: previewUrl }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', colors.surfaceElevated]}
                  style={StyleSheet.absoluteFillObject}
                  start={{ x: 0, y: 0.4 }}
                  end={{ x: 0, y: 1 }}
                />
              </>
            ) : (
              <View style={styles.previewEmpty}>
                <BlurView intensity={20} style={StyleSheet.absoluteFillObject} />
                <Text style={[styles.previewEmptyLabel, { color: colors.border }]}>
                  {sketchCount > 0 ? 'No preview image' : 'No sketch yet'}
                </Text>
                <Text style={[styles.previewEmptyHint, { color: colors.gray }]}>
                  {sketchCount > 0
                    ? 'Open canvas and use Save to generate a preview'
                    : 'Open canvas to start drawing'}
                </Text>
              </View>
            )}

            {/* Status badge */}
            <TouchableOpacity
              style={[styles.statusBadge, { backgroundColor: 'rgba(13,13,15,0.7)', borderColor: colors.border }]}
              onPress={() => setStatusModalVisible(true)}
              activeOpacity={0.75}
            >
              <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[project.status] }]} />
              <Text style={[styles.statusText, { color: colors.white }]}>
                {STATUS_LABELS[project.status]}
              </Text>
            </TouchableOpacity>

            {/* Sketch count badge */}
            {sketchCount > 0 && (
              <View style={[styles.sketchBadge, { backgroundColor: 'rgba(13,13,15,0.7)', borderColor: 'rgba(212,175,55,0.3)' }]}>
                <Text style={[styles.sketchBadgeText, { color: colors.gold }]}>
                  {sketchCount} sketch{sketchCount !== 1 ? 'es' : ''}
                </Text>
              </View>
            )}
          </View>

          {/* ── Content ────────────────────────────────────────────────────── */}
          <View style={styles.content}>
            <View style={styles.contentTop}>
              <Text
                style={[
                  styles.title,
                  { color: colors.offWhite },
                  fontsLoaded && { fontFamily: 'PlayfairDisplay_700Bold' },
                ]}
                numberOfLines={1}
              >
                {project.name}
              </Text>
              <Text style={[styles.arrow, { color: colors.gold }]}>›</Text>
            </View>

            {project.description ? (
              <Text style={[styles.description, { color: colors.grayLight }]} numberOfLines={1}>
                {project.description}
              </Text>
            ) : null}

            <View style={styles.footer}>
              <Text style={[styles.date, { color: colors.gray }]}>
                {formatDate(project.createdAt)}
              </Text>

              <TouchableOpacity
                style={[
                  styles.galleryBtn,
                  { borderColor: previewUrl ? colors.gold : colors.border,
                    backgroundColor: previewUrl ? 'rgba(212,175,55,0.08)' : 'transparent' },
                ]}
                onPress={handleSaveToGallery}
                disabled={downloading}
                activeOpacity={0.7}
              >
                <Text style={[styles.galleryBtnText, { color: previewUrl && !downloading ? colors.gold : colors.gray }]}>
                  {downloading ? '…' : '⬇'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Gold corner accents */}
          <View style={[styles.goldLine, { backgroundColor: colors.goldDim }]} />
          <View style={[styles.cornerTL, { borderColor: colors.gold }]} />
          <View style={[styles.cornerBR, { borderColor: colors.gold }]} />
        </View>
      </TouchableOpacity>

      {/* Status modal */}
      <Modal
        visible={statusModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <TouchableOpacity
          style={[statusStyles.backdrop, { backgroundColor: colors.overlay }]}
          activeOpacity={1}
          onPress={() => setStatusModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[statusStyles.sheet, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
            onPress={() => {}}
          >
            <View style={[statusStyles.handle, { backgroundColor: colors.border }]} />
            <Text style={[statusStyles.sheetTitle, { color: colors.offWhite }]}>Change Status</Text>
            <View style={[statusStyles.divider, { backgroundColor: colors.border }]} />

            {STATUSES.map((s) => {
              const isActive = project.status === s;
              return (
                <TouchableOpacity
                  key={s}
                  style={[
                    statusStyles.option,
                    { borderColor: isActive ? STATUS_COLORS[s] : 'transparent' },
                    isActive && { backgroundColor: 'rgba(212,175,55,0.06)' },
                  ]}
                  onPress={() => handleSelectStatus(s)}
                  activeOpacity={0.75}
                >
                  <View style={[statusStyles.dot, { backgroundColor: STATUS_COLORS[s] }]} />
                  <Text style={[statusStyles.optionText, { color: isActive ? colors.offWhite : colors.grayLight }]}>
                    {STATUS_LABELS[s]}
                  </Text>
                  {isActive && <Text style={{ color: STATUS_COLORS[s], fontSize: 16 }}>✓</Text>}
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={[statusStyles.cancelBtn, { borderColor: colors.border }]}
              onPress={() => setStatusModalVisible(false)}
            >
              <Text style={[statusStyles.cancelText, { color: colors.grayLight }]}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 24, marginBottom: 16 },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },

  // Preview
  preview: { height: 160, position: 'relative' },
  previewImage: { width: '100%', height: '100%' },
  previewEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  previewEmptyLabel: { fontSize: 14, fontWeight: '500', letterSpacing: 0.3 },
  previewEmptyHint: { fontSize: 11, letterSpacing: 0.3 },

  statusBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 10, letterSpacing: 0.8 },

  sketchBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  sketchBadgeText: { fontSize: 10, letterSpacing: 0.5, fontWeight: '600' },

  // Content
  content: { padding: 14 },
  contentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: { fontSize: 17, flex: 1, letterSpacing: 0.3 },
  arrow: { fontSize: 22, marginLeft: 8 },
  description: { fontSize: 12, letterSpacing: 0.3, marginBottom: 10 },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  date: { fontSize: 11, letterSpacing: 0.4 },
  galleryBtn: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  galleryBtnText: { fontSize: 13 },

  // Gold accents
  goldLine: { position: 'absolute', top: 0, left: 0, right: 0, height: 1, opacity: 0.5 },
  cornerTL: {
    position: 'absolute', top: 0, left: 0,
    width: 20, height: 20,
    borderTopWidth: 1.5, borderLeftWidth: 1.5, borderTopLeftRadius: 16,
  },
  cornerBR: {
    position: 'absolute', bottom: 0, right: 0,
    width: 20, height: 20,
    borderBottomWidth: 1.5, borderRightWidth: 1.5, borderBottomRightRadius: 16,
  },
});

const statusStyles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    borderWidth: 1, borderBottomWidth: 0,
    paddingHorizontal: 20, paddingBottom: 36, paddingTop: 12,
  },
  handle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 16, fontWeight: '600', letterSpacing: 0.3, marginBottom: 12 },
  divider: { height: 1, marginBottom: 8 },
  option: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 12,
    borderRadius: 12, borderWidth: 1, marginVertical: 4, gap: 12,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  optionText: { flex: 1, fontSize: 15, letterSpacing: 0.2 },
  cancelBtn: {
    marginTop: 12, paddingVertical: 14, borderRadius: 12,
    borderWidth: 1, alignItems: 'center',
  },
  cancelText: { fontSize: 14, letterSpacing: 0.5 },
});

export default ProjectCard;
