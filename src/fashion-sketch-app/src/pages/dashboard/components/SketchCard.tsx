import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Project, ProjectStatus } from '../../../store/slices/projectsSlice';
import { Colors } from '../../../theme/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

const STATUS_LABELS: Record<ProjectStatus, string> = {
  DRAFT: 'Draft',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

const STATUS_COLORS: Record<ProjectStatus, string> = {
  DRAFT: Colors.grayLight,
  IN_PROGRESS: Colors.gold,
  COMPLETED: '#3DFF8F',
};

interface Props {
  project: Project;
  onPress: (id: string) => void;
  fontsLoaded: boolean;
}

const SketchCard: React.FC<Props> = ({ project, onPress, fontsLoaded }) => {
  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <TouchableOpacity
      onPress={() => onPress(project.id)}
      activeOpacity={0.85}
      style={styles.wrapper}
    >
      <View style={styles.card}>
        {/* Preview area */}
        <View style={styles.previewContainer}>
          {project.previewUrl ? (
            <>
              <Image
                source={{ uri: project.previewUrl }}
                style={styles.previewImage}
                blurRadius={3}
              />
              <LinearGradient
                colors={['transparent', Colors.surface]}
                style={StyleSheet.absoluteFillObject}
              />
            </>
          ) : (
            <View style={styles.previewPlaceholder}>
              <Text style={styles.previewIcon}>◈</Text>
              <BlurView intensity={20} style={StyleSheet.absoluteFillObject} />
            </View>
          )}

          {/* Status badge */}
          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: STATUS_COLORS[project.status] },
              ]}
            />
            <Text style={styles.statusText}>
              {STATUS_LABELS[project.status]}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.contentTop}>
            <Text
              style={[
                styles.title,
                fontsLoaded && { fontFamily: 'PlayfairDisplay_700Bold' },
              ]}
              numberOfLines={1}
            >
              {project.name}
            </Text>
            <Text style={styles.arrow}>›</Text>
          </View>

          {project.description ? (
            <Text style={styles.description} numberOfLines={1}>
              {project.description}
            </Text>
          ) : null}

          <View style={styles.footer}>
            <Text style={styles.date}>{formattedDate}</Text>
            {project.sketchCount !== undefined && (
              <View style={styles.sketchCount}>
                <Text style={styles.sketchCountText}>
                  {project.sketchCount} sketch{project.sketchCount !== 1 ? 'es' : ''}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Gold border */}
        <View style={styles.goldBorder} />
        <View style={styles.goldCornerTL} />
        <View style={styles.goldCornerBR} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  previewContainer: {
    height: 140,
    backgroundColor: Colors.surface,
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
    backgroundColor: Colors.surface,
  },
  previewIcon: {
    fontSize: 40,
    color: Colors.border,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11,11,15,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    color: Colors.offWhite,
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
    color: Colors.offWhite,
    fontSize: 17,
    flex: 1,
    letterSpacing: 0.3,
  },
  arrow: {
    color: Colors.gold,
    fontSize: 22,
    marginLeft: 8,
  },
  description: {
    color: Colors.grayLight,
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
    color: Colors.gray,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  sketchCount: {
    backgroundColor: 'rgba(212,175,55,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.2)',
  },
  sketchCountText: {
    color: Colors.gold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  goldBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.goldDim,
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
    borderColor: Colors.gold,
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
    borderColor: Colors.gold,
    borderBottomRightRadius: 16,
  },
});

export default SketchCard;
