import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { setActiveTool, undo, ToolType } from '../../../store/slices/canvasSlice';
import { Colors } from '../../../theme/colors';
import { RootState } from '../../../store';

interface Tool {
  id: ToolType | 'undo';
  icon: string;
  label: string;
}

const TOOLS: Tool[] = [
  { id: 'pen',    icon: '✏️', label: 'Pen' },
  { id: 'shape',  icon: '◇',  label: 'Shape' },
  { id: 'fabric', icon: '⬡',  label: 'Fabric' },
  { id: 'color',  icon: '◉',  label: 'Color' },
  { id: 'undo',   icon: '↩',  label: 'Undo' },
  { id: 'zoom',   icon: '⊕',  label: 'Zoom' },
];

const BottomToolbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeTool = useSelector((state: RootState) => state.canvas.activeTool);
  const selectedId = useSelector((state: RootState) => state.projects.selectedId);

  const handlePress = (id: ToolType | 'undo') => {
    if (id === 'undo' && selectedId) {
      dispatch(undo(selectedId));
    } else if (id !== 'undo') {
      dispatch(setActiveTool(id));
    }
  };

  return (
    <LinearGradient
      colors={['transparent', Colors.background]}
      style={styles.gradient}
    >
      <View style={styles.toolbar}>
        {TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <TouchableOpacity
              key={tool.id}
              onPress={() => handlePress(tool.id)}
              style={[styles.toolButton, isActive && styles.toolButtonActive]}
              activeOpacity={0.7}
            >
              {isActive && (
                <View style={styles.activeGlow} />
              )}
              <Text style={[styles.toolIcon, isActive && styles.toolIconActive]}>
                {tool.icon}
              </Text>
              <Text style={[styles.toolLabel, isActive && styles.toolLabelActive]}>
                {tool.label}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 32 : 16,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  toolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
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
    borderColor: Colors.gold,
  },
  toolIcon: {
    fontSize: 20,
    color: Colors.grayLight,
    marginBottom: 2,
  },
  toolIconActive: {
    color: Colors.gold,
  },
  toolLabel: {
    fontSize: 9,
    color: Colors.grayLight,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  toolLabelActive: {
    color: Colors.gold,
  },
});

export default BottomToolbar;
