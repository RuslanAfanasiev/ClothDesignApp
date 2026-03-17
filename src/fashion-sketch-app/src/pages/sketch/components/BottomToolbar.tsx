import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { setActiveTool, undo, ToolType } from '../../../store/slices/canvasSlice';
import { useTheme } from '../../../theme/ThemeContext';

interface Tool {
  id: ToolType | 'undo' | 'download' | 'cloud' | 'template';
  icon: string;
  label: string;
}

const TOOLS: Tool[] = [
  { id: 'pen',      icon: '✏️', label: 'Pen' },
  { id: 'shape',    icon: '◇',  label: 'Shape' },
  { id: 'fabric',   icon: '⬡',  label: 'Fabric' },
  { id: 'color',    icon: '◉',  label: 'Color' },
  { id: 'undo',     icon: '↩',  label: 'Undo' },
  { id: 'zoom',     icon: '⊕',  label: 'Zoom' },
  { id: 'template', icon: '◧',  label: 'Template' },
  { id: 'download', icon: '⬇',  label: 'Device' },
  { id: 'cloud',    icon: '☁',  label: 'Cloud' },
];

interface Props {
  onSaveCloud?: () => void;
  onSaveDevice?: () => void;
  savingCloud?: boolean;
  savingDevice?: boolean;
}

const BottomToolbar: React.FC<Props> = ({ onSaveCloud, onSaveDevice, savingCloud, savingDevice }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const activeTool = useSelector((state: RootState) => state.canvas.activeTool);
  const selectedId = useSelector((state: RootState) => state.projects.selectedId);
  const { colors } = useTheme();

  const handlePress = (id: ToolType | 'undo' | 'download' | 'cloud' | 'template') => {
    if (id === 'undo' && selectedId) {
      dispatch(undo(selectedId));
    } else if (id === 'download') {
      onSaveDevice?.();
    } else if (id === 'cloud') {
      onSaveCloud?.();
    } else if (id === 'template') {
      navigation.navigate('Main', { screen: 'Templates' });
    } else if (id !== 'undo') {
      dispatch(setActiveTool(id as ToolType));
    }
  };

  return (
    <LinearGradient
      colors={['transparent', colors.background]}
      style={styles.gradient}
    >
      <View style={[styles.toolbar, { backgroundColor: colors.surfaceElevated, borderColor: colors.border, shadowColor: colors.gold }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {TOOLS.map((tool) => {
            const isActive = activeTool === tool.id;
            const isBusy = (tool.id === 'cloud' && savingCloud) || (tool.id === 'download' && savingDevice);
            const isAction = tool.id === 'cloud' || tool.id === 'download';
            return (
              <TouchableOpacity
                key={tool.id}
                onPress={() => handlePress(tool.id)}
                style={[styles.toolButton, isActive && styles.toolButtonActive]}
                activeOpacity={0.7}
                disabled={isBusy}
              >
                {isActive && (
                  <View style={[styles.activeGlow, { borderColor: colors.gold }]} />
                )}
                <Text style={[
                  styles.toolIcon,
                  { color: colors.grayLight },
                  isActive && { color: colors.gold },
                  isAction && { color: colors.gold },
                ]}>
                  {isBusy ? '…' : tool.icon}
                </Text>
                <Text style={[
                  styles.toolLabel,
                  { color: colors.grayLight },
                  isActive && { color: colors.gold },
                  isAction && { color: colors.gold },
                ]}>
                  {tool.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
  },
  toolbar: {
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 32 : 16,
    borderRadius: 24,
    paddingVertical: 10,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
  },
  toolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 52,
    borderRadius: 12,
    position: 'relative',
  },
  toolButtonActive: {
    backgroundColor: 'rgba(212,175,55,0.08)',
  },
  activeGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    borderWidth: 1,
  },
  toolIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  toolLabel: {
    fontSize: 9,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export default BottomToolbar;
