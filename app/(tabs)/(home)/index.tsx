
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import {
  ScrollView,
  Pressable,
  StyleSheet,
  View,
  Text,
  Platform,
  TextInput,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import ProjectCard from '@/components/ProjectCard';
import CountrySelector from '@/components/CountrySelector';

export default function HomeScreen() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = MOCK_PROJECTS.filter((project) => {
    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountries =
      selectedCountries.length === 0 ||
      project.countries.some((country) => selectedCountries.includes(country));

    return matchesSearch && matchesCountries;
  });

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => setShowFilters(!showFilters)}
      style={styles.headerButtonContainer}
    >
      <IconSymbol
        name={showFilters ? 'line.3.horizontal.decrease.circle.fill' : 'line.3.horizontal.decrease.circle'}
        color={colors.primary}
        size={24}
      />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Covoyageurs',
            headerRight: renderHeaderRight,
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          {Platform.OS !== 'ios' && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Covoyageurs</Text>
              <Pressable onPress={() => setShowFilters(!showFilters)}>
                <IconSymbol
                  name={showFilters ? 'line.3.horizontal.decrease.circle.fill' : 'line.3.horizontal.decrease.circle'}
                  color={colors.primary}
                  size={28}
                />
              </Pressable>
            </View>
          )}

          <View style={styles.searchContainer}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un projet..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {showFilters && (
            <View style={styles.filtersContainer}>
              <Text style={styles.filterLabel}>Filtrer par pays</Text>
              <CountrySelector
                selectedCountries={selectedCountries}
                onCountriesChange={setSelectedCountries}
                multiSelect={true}
              />
              {selectedCountries.length > 0 && (
                <Pressable
                  style={styles.clearButton}
                  onPress={() => setSelectedCountries([])}
                >
                  <Text style={styles.clearButtonText}>Effacer les filtres</Text>
                </Pressable>
              )}
            </View>
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {filteredProjects.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>🌍</Text>
              <Text style={styles.emptyStateTitle}>Aucun projet trouvé</Text>
              <Text style={styles.emptyStateText}>
                Essayez de modifier vos filtres ou créez votre propre projet de voyage !
              </Text>
            </View>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
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
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  filtersContainer: {
    marginTop: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  clearButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  clearButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  headerButtonContainer: {
    padding: 6,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
