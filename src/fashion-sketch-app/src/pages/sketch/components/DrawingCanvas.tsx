import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';
import { PanResponder, View, StyleSheet, LayoutChangeEvent } from 'react-native';
import Svg, { Path, Rect, Image as SvgImage } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { addPath, updateLastPath, StrokePath, Point } from '../../../store/slices/canvasSlice';

export interface DrawingCanvasHandle {
  captureToUri: () => Promise<string>;
}

const pointsToSvgPath = (points: Point[]): string => {
  if (points.length < 2) return '';
  const [first, ...rest] = points;
  const d = [`M ${first.x} ${first.y}`];
  rest.forEach((p) => d.push(`L ${p.x} ${p.y}`));
  return d.join(' ');
};

const DrawingCanvas = React.forwardRef<DrawingCanvasHandle, {}>((_, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const viewShotRef = useRef<ViewShot>(null);

  const { activeColor, strokeWidth, activeSketchKey, pathsBySketch, templateBySketch } = useSelector(
    (state: RootState) => state.canvas,
  );

  const paths = activeSketchKey ? (pathsBySketch[activeSketchKey] ?? []) : [];
  const templateUrl = activeSketchKey ? (templateBySketch[activeSketchKey] ?? null) : null;

  useImperativeHandle(ref, () => ({
    captureToUri: () => {
      if (!viewShotRef.current) return Promise.reject(new Error('Canvas not ready'));
      return viewShotRef.current.capture();
    },
  }));

  const activeColorRef = useRef(activeColor);
  const strokeWidthRef = useRef(strokeWidth);
  const activeSketchKeyRef = useRef(activeSketchKey);

  useEffect(() => { activeColorRef.current = activeColor; }, [activeColor]);
  useEffect(() => { strokeWidthRef.current = strokeWidth; }, [strokeWidth]);
  useEffect(() => { activeSketchKeyRef.current = activeSketchKey; }, [activeSketchKey]);

  const isDrawing = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => evt.nativeEvent.locationY > 0,
      onMoveShouldSetPanResponder: () => isDrawing.current,

      onPanResponderGrant: (evt) => {
        const sketchKey = activeSketchKeyRef.current;
        if (!sketchKey) return;
        isDrawing.current = true;
        const { locationX, locationY } = evt.nativeEvent;
        const path: StrokePath = {
          id: `path_${Date.now()}`,
          points: [{ x: locationX, y: locationY }],
          color: activeColorRef.current,
          width: strokeWidthRef.current,
          tool: 'pen',
        };
        dispatch(addPath({ sketchKey, path }));
      },

      onPanResponderMove: (evt) => {
        const sketchKey = activeSketchKeyRef.current;
        if (!isDrawing.current || !sketchKey) return;
        const { locationX, locationY } = evt.nativeEvent;
        dispatch(updateLastPath({ sketchKey, point: { x: locationX, y: locationY } }));
      },

      onPanResponderRelease: () => {
        isDrawing.current = false;
      },
    }),
  ).current;

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setCanvasSize({ width, height });
  };

  return (
    <View
      style={styles.container}
      collapsable={false}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
    >
      <ViewShot
        ref={viewShotRef}
        options={{ format: 'png', quality: 1 }}
        style={StyleSheet.absoluteFillObject}
      >
        {canvasSize.width > 0 && (
          <Svg
            width={canvasSize.width}
            height={canvasSize.height}
            style={StyleSheet.absoluteFillObject}
          >
            <Rect x="0" y="0" width={canvasSize.width} height={canvasSize.height} fill="white" />

            {templateUrl ? (
              <SvgImage
                x="0"
                y="0"
                width={canvasSize.width}
                height={canvasSize.height}
                href={templateUrl}
                preserveAspectRatio="xMidYMid meet"
              />
            ) : null}

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
        )}
      </ViewShot>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default DrawingCanvas;
