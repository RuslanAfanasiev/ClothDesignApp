import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../theme/ThemeContext';
import { Template } from '../../../services/templateService';

interface Props {
  template: Template;
  onUse: (template: Template) => void;
  onLongPress: (template: Template) => void;
}

const TemplateCard: React.FC<Props> = ({ template, onUse, onLongPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
      onLongPress={() => onLongPress(template)}
      delayLongPress={500}
      activeOpacity={0.85}
    >
      {template.imageUrl ? (
        <Image source={{ uri: template.imageUrl }} style={styles.cardThumbImage} resizeMode="cover" />
      ) : (
        <View style={[styles.cardThumb, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardThumbIcon, { color: colors.border }]}>◈</Text>
        </View>
      )}

      <View style={styles.cardBody}>
        {template.category ? (
          <View style={[styles.categoryBadge, { backgroundColor: 'rgba(212,175,55,0.08)', borderColor: 'rgba(212,175,55,0.2)' }]}>
            <Text style={[styles.categoryText, { color: colors.gold }]}>{template.category}</Text>
          </View>
        ) : null}
        <Text style={[styles.cardName, { color: colors.offWhite }]} numberOfLines={1}>
          {template.name}
        </Text>
        {template.description ? (
          <Text style={[styles.cardDesc, { color: colors.grayLight }]} numberOfLines={2}>
            {template.description}
          </Text>
        ) : null}
        {template.isPublic && (
          <Text style={[styles.publicBadge, { color: colors.grayLight }]}>◎ Public</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.useBtn, { borderColor: colors.gold }]}
        onPress={() => onUse(template)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.goldLight, colors.gold]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.useBtnGradient}
        >
          <Text style={[styles.useBtnText, { color: colors.background }]}>Use</Text>
        </LinearGradient>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardThumb: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center' },
  cardThumbImage: { width: 80, height: 80 },
  cardThumbIcon: { fontSize: 28 },
  cardBody: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, justifyContent: 'center' },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 4,
  },
  categoryText: { fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase' },
  cardName: { fontSize: 14, fontWeight: '600', letterSpacing: 0.2, marginBottom: 2 },
  cardDesc: { fontSize: 11, letterSpacing: 0.2, lineHeight: 15 },
  publicBadge: { fontSize: 10, marginTop: 3, letterSpacing: 0.3 },
  useBtn: { marginRight: 12, borderRadius: 10, overflow: 'hidden', borderWidth: 1 },
  useBtnGradient: { paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center', minWidth: 48 },
  useBtnText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
});

export default TemplateCard;
