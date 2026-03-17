export const darkColors = {
  background: '#0B0B0F',
  surface: '#13131A',
  surfaceElevated: '#1C1C26',
  gold: '#D4AF37',
  goldLight: '#E8CC6A',
  goldDim: '#8A6F1F',
  white: '#FFFFFF',
  offWhite: '#F0EDE6',
  gray: '#4A4A5A',
  grayLight: '#6B6B80',
  border: '#2A2A38',
  overlay: 'rgba(11,11,15,0.85)',
} as const;

export const lightColors = {
  background: '#F8F7F2',
  surface: '#EEECE6',
  surfaceElevated: '#FFFFFF',
  gold: '#D4AF37',
  goldLight: '#E8CC6A',
  goldDim: '#8A6F1F',
  white: '#FFFFFF',
  offWhite: '#1C1A16',
  gray: '#8A8A9A',
  grayLight: '#5C5C70',
  border: '#E0DDD5',
  overlay: 'rgba(248,247,242,0.92)',
} as const;

export type AppColors = typeof darkColors;

// Default export pentru backwards compat (dark theme)
export const Colors = darkColors;
