import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { Project, ProjectStatus, updateProject, deleteProject } from '../../../store/slices/projectsSlice';
import { createSketch } from '../../../store/slices/sketchesSlice';
import { AppDispatch } from '../../../store';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

const STATUS_LABELS: Record<ProjectStatus, string> = {
  DRAFT: 'Draft',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

interface Props {
  project: Project;
  onPress: (id: string) => void;
  fontsLoaded: boolean;
}

const STATUSES: ProjectStatus[] = ['DRAFT', 'IN_PROGRESS', 'COMPLETED'];

const SketchCard: React.FC<Props> = ({ project, onPress, fontsLoaded }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const [downloading, setDownloading] = useState(false);
  const [savingSketch, setSavingSketch] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const handleSaveToGallery = async () => {
    if (!project.previewUrl) {
      Alert.alert('No Preview', 'This project has no sketch preview to save.');
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
      const { uri } = await FileSystem.downloadAsync(project.previewUrl, localUri);
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Saved', 'Sketch saved to your gallery.');
    } catch {
      Alert.alert('Error', 'Could not save sketch to gallery.');
    } finally {
      setDownloading(false);
    }
  };

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

  const handleSaveToSketches = async () => {
    if (!project.previewUrl) {
      Alert.alert('No Preview', 'Draw and save to cloud first to create a sketch preview.');
      return;
    }
    setSavingSketch(true);
    try {
      await dispatch(createSketch({
        projectId: project.id,
        dto: { name: project.name, imageUrl: project.previewUrl },
      }));
      Alert.alert('Saved', 'Sketch saved to this project.');
    } catch {
      Alert.alert('Error', 'Could not save sketch.');
    } finally {
      setSavingSketch(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const isModified = project.updatedAt && project.updatedAt !== project.createdAt;

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
        {/* Preview area */}
        <View style={[styles.previewContainer, { backgroundColor: colors.surface }]}>
          {project.previewUrl ? (
            <>
              <Image
                source={{ uri: project.previewUrl }}
                style={styles.previewImage}
                blurRadius={3}
              />
              <LinearGradient
                colors={['transparent', colors.surface]}
                style={StyleSheet.absoluteFillObject}
              />
            </>
          ) : (
            <View style={[styles.previewPlaceholder, { backgroundColor: colors.surface }]}>
              <Text style={[styles.previewIcon, { color: colors.border }]}>◈</Text>
              <BlurView intensity={20} style={StyleSheet.absoluteFillObject} />
            </View>
          )}

          {/* Status badge tappable */}
          <TouchableOpacity
            style={[styles.statusBadge, { borderColor: colors.border }]}
            onPress={() => setStatusModalVisible(true)}
            activeOpacity={0.75}
          >
            <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[project.status] }]} />
            <Text style={[styles.statusText, { color: colors.white }]}>
              {STATUS_LABELS[project.status]}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
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
            <View>
              <Text style={[styles.date, { color: colors.gray }]}>
                Created {formatDate(project.createdAt)}
              </Text>
              {isModified && (
                <Text style={[styles.modified, { color: colors.goldDim }]}>
                  ✎ Modified {formatDate(project.updatedAt)}
                </Text>
              )}
            </View>
            {project.status === 'COMPLETED' && (
              <TouchableOpacity
                style={[styles.saveSketchBtn, { borderColor: colors.gold, backgroundColor: 'rgba(212,175,55,0.08)' }]}
                onPress={handleSaveToSketches}
                disabled={savingSketch}
                activeOpacity={0.75}
              >
                <Text style={[styles.saveSketchText, { color: colors.gold }]}>
                  {savingSketch ? '…' : '+ Sketch'}
                </Text>
              </TouchableOpacity>
            )}
            <View style={styles.footerRight}>
              {project.sketchCount !== undefined && (
                <View style={styles.sketchCount}>
                  <Text style={[styles.sketchCountText, { color: colors.gold }]}>
                    {project.sketchCount} sketch{project.sketchCount !== 1 ? 'es' : ''}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={[styles.saveBtn, { borderColor: colors.border }]}
                onPress={handleSaveToGallery}
                disabled={downloading}
                activeOpacity={0.7}
              >
                <Text style={[styles.saveBtnText, { color: downloading ? colors.gray : colors.grayLight }]}>
                  {downloading ? '…' : '⬇'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Gold border */}
        <View style={[styles.goldBorder, { backgroundColor: colors.goldDim }]} />
        <View style={[styles.goldCornerTL, { borderColor: colors.gold }]} />
        <View style={[styles.goldCornerBR, { borderColor: colors.gold }]} />
      </View>
    </TouchableOpacity>

    {/* Status picker modal */}
    <Modal
      visible={statusModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setStatusModalVisible(false)}
    >
      {/* Tap backdrop to close */}
      <TouchableOpacity
        style={[statusStyles.backdrop, { backgroundColor: colors.overlay }]}
        activeOpacity={1}
        onPress={() => setStatusModalVisible(false)}
      >
        {/* Sheet — stop propagation so tap inside doesn't close */}
        <TouchableOpacity
          activeOpacity={1}
          style={[statusStyles.sheet, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
          onPress={() => {}}
        >
          <View style={[statusStyles.handle, { backgroundColor: colors.border }]} />

          <Text style={[statusStyles.title, { color: colors.offWhite }]}>Change Status</Text>
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
                {isActive && <Text style={[statusStyles.check, { color: STATUS_COLORS[s] }]}>✓</Text>}
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
  wrapper: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
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
  previewContainer: {
    height: 140,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewIcon: {
    fontSize: 40,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 20, 91, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
    borderWidth: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    letterSpacing: 0.8,
  },
  content: {
    padding: 16,
  },
  contentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    flex: 1,
    letterSpacing: 0.3,
  },
  arrow: {
    fontSize: 22,
    marginLeft: 8,
  },
  description: {
    fontSize: 12,
    letterSpacing: 0.3,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  date: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  modified: {
    fontSize: 10,
    letterSpacing: 0.3,
    marginTop: 2,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sketchCount: {
    backgroundColor: 'rgba(213, 163, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(222, 176, 25, 0.2)',
  },
  sketchCountText: {
    fontSize: 10,
    letterSpacing: 0.5,
  },
  saveBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontSize: 13,
  },
  saveSketchBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  saveSketchText: {
    fontSize: 10,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  goldBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    opacity: 0.5,
  },
  goldCornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 24,
    height: 24,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderTopLeftRadius: 16,
  },
  goldCornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomRightRadius: 16,
  },
});

const statusStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginBottom: 12,
  },
  divider: { height: 1, marginBottom: 8 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 4,
    gap: 12,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  optionText: { flex: 1, fontSize: 15, letterSpacing: 0.2 },
  check: { fontSize: 16 },
  cancelBtn: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  cancelText: { fontSize: 14, letterSpacing: 0.5 },
});

export default SketchCard;
