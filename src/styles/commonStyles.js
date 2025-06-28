import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/config';

const { width, height } = Dimensions.get('window');

// Ortak Stil Sabitleri - Küçültülmüş
export const SPACING = {
  xs: 3,
  sm: 6,
  md: 12,
  lg: 18,
  xl: 24,
  xxl: 36,
};

export const BORDER_RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 22,
  round: 999,
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  huge: 26,
  massive: 36,
  giant: 56,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: COLORS.shadow.opacity,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: COLORS.shadow.color,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};

// Ortak Stiller
export const commonStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
  },

  // Card Styles
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  cardTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },

  // Button Styles
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  buttonTextPrimary: {
    color: COLORS.white,
  },
  buttonTextSecondary: {
    color: COLORS.primary,
  },

  // Text Styles
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  body: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  caption: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.light,
  },

  // Input Styles
  input: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.small,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    ...SHADOWS.small,
  },

  // Icon Styles
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerPrimary: {
    backgroundColor: COLORS.primary,
  },
  iconContainerSecondary: {
    backgroundColor: COLORS.gray.light,
  },

  // Layout Styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  flex: {
    flex: 1,
  },

  // Spacing Styles
  marginXS: { margin: SPACING.xs },
  marginSM: { margin: SPACING.sm },
  marginMD: { margin: SPACING.md },
  marginLG: { margin: SPACING.lg },
  marginXL: { margin: SPACING.xl },

  paddingXS: { padding: SPACING.xs },
  paddingSM: { padding: SPACING.sm },
  paddingMD: { padding: SPACING.md },
  paddingLG: { padding: SPACING.lg },
  paddingXL: { padding: SPACING.xl },

  // Border Styles
  border: {
    borderWidth: 1,
    borderColor: COLORS.gray.light,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray.light,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray.light,
  },

  // Background Styles
  backgroundPrimary: {
    backgroundColor: COLORS.primary,
  },
  backgroundSecondary: {
    backgroundColor: COLORS.secondary,
  },
  backgroundWhite: {
    backgroundColor: COLORS.white,
  },
  backgroundTransparent: {
    backgroundColor: 'transparent',
  },

  // Dimension Helpers
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  screenWidth: {
    width: width,
  },
  screenHeight: {
    height: height,
  },
}); 