import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { Sketch } from '../../../services/sketchService';

interface Props {
  sketch: Sketch;
  onPress: (sketch: Sketch) => void;
  onLongPress: (sketch: Sketch) => void;
}

const SketchCard: React.FC<Props> = React.memo(({ sketch, onPress, onLongPress }) => {
  const { colors } = useTheme();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
      onPress={() => onPress(sketch)}
      onLongPress={() => onLongPress(sketch)}
      activeOpacity={0.85}
      delayLongPress={500}
    >
      {/* Thumbnail */}
      {sketch.imageUrl ? (
        <Image
          source={{ uri: sketch.imageUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.thumbnailPlaceholder, { backgroundColor: colors.surface }]}>
          <Text style={[styles.thumbnailIcon, { color: colors.border }]}>✏</Text>
        </View>
      )}

      {/* Info */}
      <View style={styles.cardInfo}>
        <Text style={[styles.cardName, { color: colors.offWhite }]} numberOfLines={1}>
          {sketch.name}
        </Text>
        <Text style={[styles.cardDate, { color: colors.gray }]}>
          {formatDate(sketch.createdAt)}
        </Text>
        {sketch.notes ? (
          <Text style={[styles.cardNotes, { color: colors.grayLight }]} numberOfLines={2}>
            {sketch.notes}
          </Text>
        ) : null}
      </View>

      {/* Edit badge */}
      <View style={styles.editBadge}>
        <Text style={[styles.editBadgeIcon, { color: colors.gold }]}>✏</Text>
        <Text style={[styles.editBadgeText, { color: colors.gold }]}>Edit</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  thumbnail: { width: 100, height: 100 },
  thumbnailPlaceholder: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailIcon: { fontSize: 32 },
  cardInfo: { flex: 1, paddingHorizontal: 14, paddingVertical: 12, justifyContent: 'center' },
  cardName: { fontSize: 15, fontWeight: '600', marginBottom: 4, letterSpacing: 0.2 },
  cardDate: { fontSize: 11, letterSpacing: 0.3, marginBottom: 4 },
  cardNotes: { fontSize: 12, letterSpacing: 0.2, lineHeight: 16 },
  editBadge: {
    alignItems: 'center',
    paddingRight: 14,
    gap: 2,
  },
  editBadgeIcon: { fontSize: 16 },
  editBadgeText: { fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase' },
});

export default SketchCard;
