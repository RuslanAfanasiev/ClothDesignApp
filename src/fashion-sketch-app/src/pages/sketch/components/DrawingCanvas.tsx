import React, { useRef, useEffect } from 'react';
import { PanResponder, View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { addPath, updateLastPath, StrokePath, Point } from '../../../store/slices/canvasSlice';
import { Colors } from '../../../theme/colors';

const { width, height } = Dimensions.get('window');

const pointsToSvgPath = (points: Point[]): string => {
  if (points.length < 2) return '';
  const [first, ...rest] = points;
  const d = [`M ${first.x} ${first.y}`];
  rest.forEach((p) => d.push(`L ${p.x} ${p.y}`));
  return d.join(' ');
};

const DrawingCanvas = React.forwardRef<View, {}>((_, ref) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedId = useSelector((state: RootState) => state.projects.selectedId);
  const { activeColor, strokeWidth, pathsByProject } = useSelector(
    (state: RootState) => state.canvas,
  );

  const paths = selectedId ? (pathsByProject[selectedId] ?? []) : [];

  // Refs so PanResponder always reads the latest values (avoids stale closure)
  const activeColorRef = useRef(activeColor);
  const strokeWidthRef = useRef(strokeWidth);
  const selectedIdRef = useRef(selectedId);

  useEffect(() => { activeColorRef.current = activeColor; }, [activeColor]);
  useEffect(() => { strokeWidthRef.current = strokeWidth; }, [strokeWidth]);
  useEffect(() => { selectedIdRef.current = selectedId; }, [selectedId]);

  const isDrawing = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        const projectId = selectedIdRef.current;
        if (!projectId) return;
        isDrawing.current = true;
        const { locationX, locationY } = evt.nativeEvent;
        const path: StrokePath = {
          id: `path_${Date.now()}`,
          points: [{ x: locationX, y: locationY }],
          color: activeColorRef.current,
          width: strokeWidthRef.current,
          tool: 'pen',
        };
        dispatch(addPath({ projectId, path }));
      },

      onPanResponderMove: (evt) => {
        const projectId = selectedIdRef.current;
        if (!isDrawing.current || !projectId) return;
        const { locationX, locationY } = evt.nativeEvent;
        dispatch(updateLastPath({ projectId, point: { x: locationX, y: locationY } }));
      },

      onPanResponderRelease: () => {
        isDrawing.current = false;
      },
    }),
  ).current;

  return (
    <View ref={ref} style={styles.container} {...panResponder.panHandlers}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFillObject}>
        {paths.map((path) => (
          <Path
            key={path.id}
            d={pointsToSvgPath(path.points)}
            stroke={path.color}
            strokeWidth={path.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
      </Svg>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
});

export default DrawingCanvas;
