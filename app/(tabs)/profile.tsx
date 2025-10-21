
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function ProfileScreen() {
  const userStats = [
    { label: 'Projets créés', value: '3', icon: 'plus.circle.fill' },
    { label: 'Voyages réalisés', value: '7', icon: 'airplane' },
    { label: 'Pays visités', value: '12', icon: 'globe' },
  ];

  const travelPreferences = [
    { label: 'Aventure', icon: 'figure.hiking' },
    { label: 'Culture', icon: 'building.columns' },
    { label: 'Nature', icon: 'leaf.fill' },
    { label: 'Gastronomie', icon: 'fork.knife' },
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Profil',
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {Platform.OS !== 'ios' && (
            <Text style={styles.title}>Profil</Text>
          )}

          <View style={styles.profileHeader}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>JD</Text>
            </View>
            <Text style={styles.userName}>Jean Dupont</Text>
            <Text style={styles.userBio}>
              Passionné de voyages et de découvertes. Toujours prêt pour une nouvelle
              aventure ! 🌍✈️
            </Text>
            <Pressable style={styles.editButton}>
              <IconSymbol name="pencil" size={16} color={colors.primary} />
              <Text style={styles.editButtonText}>Modifier le profil</Text>
            </Pressable>
          </View>

          <View style={styles.statsContainer}>
            {userStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <IconSymbol name={stat.icon as any} size={24} color={colors.primary} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Préférences de voyage</Text>
            <View style={styles.preferencesGrid}>
              {travelPreferences.map((pref, index) => (
                <View key={index} style={styles.preferenceCard}>
                  <IconSymbol name={pref.icon as any} size={28} color={colors.primary} />
                  <Text style={styles.preferenceLabel}>{pref.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pays visités</Text>
            <View style={styles.countriesContainer}>
              <Text style={styles.countryFlags}>
                🇫🇷 🇪🇸 🇮🇹 🇩🇪 🇬🇧 🇵🇹 🇬🇷 🇳🇱 🇯🇵 🇹🇭 🇺🇸 🇨🇦
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <View style={styles.aboutCard}>
              <View style={styles.aboutItem}>
                <IconSymbol name="mappin.circle.fill" size={20} color={colors.textSecondary} />
                <Text style={styles.aboutText}>Paris, France</Text>
              </View>
              <View style={styles.aboutItem}>
                <IconSymbol name="calendar" size={20} color={colors.textSecondary} />
                <Text style={styles.aboutText}>Membre depuis janvier 2024</Text>
              </View>
              <View style={styles.aboutItem}>
                <IconSymbol name="checkmark.seal.fill" size={20} color={colors.success} />
                <Text style={styles.aboutText}>Profil vérifié</Text>
              </View>
            </View>
          </View>

          <Pressable style={styles.settingsButton}>
            <IconSymbol name="gear" size={20} color={colors.text} />
            <Text style={styles.settingsButtonText}>Paramètres</Text>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(224, 122, 95, 0.3)',
    elevation: 4,
  },
  avatarLargeText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  userBio: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  preferenceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  countriesContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  countryFlags: {
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 48,
  },
  aboutCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aboutText: {
    fontSize: 15,
    color: colors.text,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingsButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
