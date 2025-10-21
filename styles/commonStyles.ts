
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Travel-inspired color palette
export const colors = {
  background: '#f9f7f3',        // Off-white, clean and bright
  text: '#3d405b',              // Dark grayish-purple for readability
  textSecondary: '#81b29a',     // Muted green for secondary text
  primary: '#e07a5f',           // Burnt orange, warm and inviting
  secondary: '#3d405b',         // Dark grayish-purple
  accent: '#f2cc8f',            // Mustard yellow for highlights
  card: '#ffffff',              // White for content containers
  highlight: '#e07a5f',         // Burnt orange for important elements
  border: '#e4e4e7',            // Light border
  success: '#81b29a',           // Muted green
  backgroundAlt: '#fefefe',     // Slightly off-white
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});
