import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';
import { PanResponder, View, StyleSheet, LayoutChangeEvent } from 'react-native';
import Svg, { Path, Rect, Image as SvgImage, G } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { addPath, updateLastPath, setZoom } from '../../../store/slices/canvasSlice';
import { StrokePath, Point } from '../../../interfaces/canvas.interface';

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

const getDistance = (touches: any[]): number => {
  const dx = touches[0].pageX - touches[1].pageX;
  const dy = touches[0].pageY - touches[1].pageY;
  return Math.sqrt(dx * dx + dy * dy);
};

const DrawingCanvas = React.forwardRef<DrawingCanvasHandle, {}>((_, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const viewShotRef = useRef<ViewShot>(null);

  const { activeColor, strokeWidth, activeTool, activeSketchKey, pathsBySketch, templateBySketch, zoom } = useSelector(
    (state: RootState) => state.canvas,
  );

  const paths = activeSketchKey ? (pathsBySketch[activeSketchKey] ?? []) : [];
  const templateUrl = activeSketchKey ? (templateBySketch[activeSketchKey] ?? null) : null;

  useImperativeHandle(ref, () => ({
    captureToUri: () => {
      if (!viewShotRef.current) return Promise.reject(new Error('Canvas not ready'));
      return (viewShotRef.current as any).capture();
    },
  }));

  const activeColorRef = useRef(activeColor);
  const strokeWidthRef = useRef(strokeWidth);
  const activeSketchKeyRef = useRef(activeSketchKey);
  const activeToolRef = useRef(activeTool);
  const zoomRef = useRef(zoom);
  const pinchStartDistance = useRef<number | null>(null);
  const pinchStartZoom = useRef<number>(1);

  useEffect(() => { activeColorRef.current = activeColor; }, [activeColor]);
  useEffect(() => { strokeWidthRef.current = strokeWidth; }, [strokeWidth]);
  useEffect(() => { activeSketchKeyRef.current = activeSketchKey; }, [activeSketchKey]);
  useEffect(() => { activeToolRef.current = activeTool; }, [activeTool]);
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);

  const isDrawing = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        const touches = evt.nativeEvent.touches;

        if (touches.length === 2) {
          pinchStartDistance.current = getDistance(touches);
          pinchStartZoom.current = zoomRef.current;
          isDrawing.current = false;
          return;
        }

        const sketchKey = activeSketchKeyRef.current;
        if (!sketchKey) return;
        isDrawing.current = true;

        const x = evt.nativeEvent.locationX / zoomRef.current;
        const y = evt.nativeEvent.locationY / zoomRef.current;

        const isEraser = activeToolRef.current === 'eraser';
        const path: StrokePath = {
          id: `path_${Date.now()}`,
          points: [{ x, y }],
          color: isEraser ? '#FFFFFF' : activeColorRef.current,
          width: isEraser ? strokeWidthRef.current * 4 : strokeWidthRef.current,
          tool: activeToolRef.current as any,
        };
        dispatch(addPath({ sketchKey, path }));
      },

      onPanResponderMove: (evt) => {
        const touches = evt.nativeEvent.touches;

        if (touches.length === 2 && pinchStartDistance.current !== null) {
          const scale = (getDistance(touches) / pinchStartDistance.current) * pinchStartZoom.current;
          dispatch(setZoom(scale));
          return;
        }

        const sketchKey = activeSketchKeyRef.current;
        if (!isDrawing.current || !sketchKey) return;

        dispatch(updateLastPath({
          sketchKey,
          point: {
            x: evt.nativeEvent.locationX / zoomRef.current,
            y: evt.nativeEvent.locationY / zoomRef.current,
          },
        }));
      },

      onPanResponderRelease: () => {
        isDrawing.current = false;
        pinchStartDistance.current = null;
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
        style={StyleSheet.absoluteFill}
      >
        {canvasSize.width > 0 && (
          <Svg
            width={canvasSize.width}
            height={canvasSize.height}
            style={StyleSheet.absoluteFill}
          >
            <Rect x="0" y="0" width={canvasSize.width} height={canvasSize.height} fill="white" />

            <G transform={`scale(${zoom})`}>
              {templateUrl ? (
                <SvgImage
                  x="0"
                  y="0"
                  width={canvasSize.width / zoom}
                  height={canvasSize.height / zoom}
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
            </G>
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
