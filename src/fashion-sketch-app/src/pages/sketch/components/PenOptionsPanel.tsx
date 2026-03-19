import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { setActiveColor, setStrokeWidth } from '../../../store/slices/canvasSlice';
import { useTheme } from '../../../theme/ThemeContext';

const COLORS = [
  '#000000',
  '#FFFFFF',
  '#D4AF37',
  '#E63946',
  '#457B9D',
  '#2A9D8F',
  '#E9C46A',
  '#F4A261',
  '#6D6875',
  '#A8DADC',
];

const WIDTHS = [
  { label: 'XS', value: 1 },
  { label: 'S',  value: 2 },
  { label: 'M',  value: 4 },
  { label: 'L',  value: 8 },
  { label: 'XL', value: 14 },
];

const PenOptionsPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const activeColor = useSelector((state: RootState) => state.canvas.activeColor);
  const strokeWidth = useSelector((state: RootState) => state.canvas.strokeWidth);

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.grayLight }]}>Culoare</Text>
        <View style={styles.colorsRow}>
          {COLORS.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => dispatch(setActiveColor(c))}
              style={[
                styles.colorDot,
                { backgroundColor: c, borderColor: activeColor === c ? colors.gold : colors.border },
                activeColor === c && styles.colorDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.grayLight }]}>Grosime</Text>
        <View style={styles.widthsRow}>
          {WIDTHS.map((w) => (
            <TouchableOpacity
              key={w.value}
              onPress={() => dispatch(setStrokeWidth(w.value))}
              style={[
                styles.widthButton,
                { borderColor: strokeWidth === w.value ? colors.gold : colors.border },
                strokeWidth === w.value && { backgroundColor: 'rgba(212,175,55,0.1)' },
              ]}
            >
              <View style={[styles.widthPreview, { height: w.value > 8 ? 8 : w.value, backgroundColor: strokeWidth === w.value ? colors.gold : colors.grayLight }]} />
              <Text style={[styles.widthLabel, { color: strokeWidth === w.value ? colors.gold : colors.grayLight }]}>
                {w.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    width: 52,
  },
  colorsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  colorDotActive: {
    transform: [{ scale: 1.2 }],
  },
  divider: {
    height: 1,
    marginVertical: 2,
  },
  widthsRow: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  widthButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
    minWidth: 40,
  },
  widthPreview: {
    width: 20,
    borderRadius: 4,
  },
  widthLabel: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default PenOptionsPanel;
