
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { TravelProject } from '@/types/project';
import { COUNTRIES } from '@/data/countries';
import { IconSymbol } from './IconSymbol';
import { useRouter } from 'expo-router';

interface ProjectCardProps {
  project: TravelProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const getCountryFlags = () => {
    return project.countries
      .map((code) => {
        const country = COUNTRIES.find((c) => c.code === code);
        return country ? country.flag : '';
      })
      .join(' ');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        console.log('Project card pressed:', project.id);
        // Navigation to project details would go here
      }}
    >
      <View style={styles.header}>
        <Text style={styles.countryFlags}>{getCountryFlags()}</Text>
        <View style={styles.travelersNeeded}>
          <IconSymbol name="person.2.fill" size={16} color={colors.primary} />
          <Text style={styles.travelersText}>{project.travelersNeeded}</Text>
        </View>
      </View>

      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {project.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.authorInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {project.authorName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.authorName}>{project.authorName}</Text>
        </View>

        {project.startDate && (
          <View style={styles.dateInfo}>
            <IconSymbol name="calendar" size={14} color={colors.textSecondary} />
            <Text style={styles.dateText}>{formatDate(project.startDate)}</Text>
          </View>
        )}
      </View>

      {project.tags && project.tags.length > 0 && (
        <View style={styles.tags}>
          {project.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  countryFlags: {
    fontSize: 28,
  },
  travelersNeeded: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent + '30',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  travelersText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
});
