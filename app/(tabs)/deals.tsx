
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  TextInput,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { MOCK_DEALS } from '@/data/mockDeals';
import { GoodDeal } from '@/types/user';
import CountrySelector from '@/components/CountrySelector';
import { COUNTRIES } from '@/data/countries';
import BackgroundImages from '@/components/BackgroundImages';

const CATEGORIES = [
  { id: 'all', label: 'Tous', icon: 'square.grid.2x2' },
  { id: 'accommodation', label: 'Logement', icon: 'house.fill' },
  { id: 'food', label: 'Nourriture', icon: 'fork.knife' },
  { id: 'transport', label: 'Transport', icon: 'car.fill' },
  { id: 'activity', label: 'Activité', icon: 'figure.hiking' },
  { id: 'other', label: 'Autre', icon: 'ellipsis.circle' },
];

export default function DealsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [showNewDealModal, setShowNewDealModal] = useState(false);

  const filteredDeals = MOCK_DEALS.filter((deal) => {
    const matchesSearch =
      searchQuery === '' ||
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry =
      selectedCountry.length === 0 || selectedCountry.includes(deal.country);

    const matchesCategory =
      selectedCategory === 'all' || deal.category === selectedCategory;

    return matchesSearch && matchesCountry && matchesCategory;
  });

  const getCountryName = (code: string) => {
    const country = COUNTRIES.find((c) => c.code === code);
    return country ? `${country.flag} ${country.name}` : code;
  };

  const getCategoryIcon = (category: string) => {
    const cat = CATEGORIES.find((c) => c.id === category);
    return cat?.icon || 'ellipsis.circle';
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Bons Plans',
            headerLargeTitle: true,
            headerRight: () => (
              <Pressable onPress={() => setShowNewDealModal(true)}>
                <IconSymbol name="plus.circle.fill" color={colors.primary} size={24} />
              </Pressable>
            ),
          }}
        />
      )}
      <View style={styles.container}>
        <BackgroundImages />
        <View style={styles.content}>
          {Platform.OS !== 'ios' && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Bons Plans</Text>
              <Pressable onPress={() => setShowNewDealModal(true)}>
                <IconSymbol name="plus.circle.fill" color={colors.primary} size={28} />
              </Pressable>
            </View>
          )}

          <View style={styles.header}>
            <View style={styles.searchContainer}>
              <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un bon plan..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <Pressable
              style={styles.countryButton}
              onPress={() => setShowCountrySelector(true)}
            >
              <IconSymbol name="globe" size={20} color={colors.primary} />
              <Text style={styles.countryButtonText}>
                {selectedCountry.length > 0
                  ? `${selectedCountry.length} pays`
                  : 'Tous les pays'}
              </Text>
            </Pressable>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
              contentContainerStyle={styles.categoriesContent}
            >
              {CATEGORIES.map((category) => (
                <Pressable
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.id && styles.categoryChipActive,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <IconSymbol
                    name={category.icon as any}
                    size={18}
                    color={
                      selectedCategory === category.id ? '#fff' : colors.text
                    }
                  />
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === category.id &&
                        styles.categoryChipTextActive,
                    ]}
                  >
                    {category.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              Platform.OS !== 'ios' && styles.scrollContentWithTabBar,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {filteredDeals.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>💡</Text>
                <Text style={styles.emptyStateTitle}>Aucun bon plan trouvé</Text>
                <Text style={styles.emptyStateText}>
                  Essayez de modifier vos filtres ou soyez le premier à partager un bon
                  plan !
                </Text>
              </View>
            ) : (
              filteredDeals.map((deal) => (
                <View key={deal.id} style={styles.dealCard}>
                  <View style={styles.dealHeader}>
                    <View style={styles.dealUserInfo}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                          {deal.userName.charAt(0)}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.dealUserName}>{deal.userName}</Text>
                        <Text style={styles.dealCountry}>
                          {getCountryName(deal.country)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.categoryBadge}>
                      <IconSymbol
                        name={getCategoryIcon(deal.category) as any}
                        size={16}
                        color={colors.primary}
                      />
                    </View>
                  </View>

                  <Text style={styles.dealTitle}>{deal.title}</Text>
                  <Text style={styles.dealDescription}>{deal.description}</Text>

                  <View style={styles.dealFooter}>
                    <Pressable style={styles.likeButton}>
                      <IconSymbol name="heart" size={18} color={colors.textSecondary} />
                      <Text style={styles.likeCount}>{deal.likes}</Text>
                    </Pressable>
                    <Text style={styles.dealDate}>
                      {new Date(deal.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        <Modal
          visible={showCountrySelector}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowCountrySelector(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner un pays</Text>
              <Pressable onPress={() => setShowCountrySelector(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
              </Pressable>
            </View>
            <CountrySelector
              selectedCountries={selectedCountry}
              onCountriesChange={setSelectedCountry}
              multiSelect={false}
            />
            <Pressable
              style={styles.modalButton}
              onPress={() => setShowCountrySelector(false)}
            >
              <Text style={styles.modalButtonText}>Appliquer</Text>
            </Pressable>
          </View>
        </Modal>

        <Modal
          visible={showNewDealModal}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowNewDealModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouveau bon plan</Text>
              <Pressable onPress={() => setShowNewDealModal(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
              </Pressable>
            </View>
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.infoText}>
                Fonctionnalité à venir : Partagez vos bons plans de voyage avec la
                communauté !
              </Text>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  countryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  categoriesScroll: {
    marginTop: 4,
  },
  categoriesContent: {
    gap: 8,
    paddingVertical: 4,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  categoryChipTextActive: {
    color: '#fff',
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
  dealCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dealUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  dealUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  dealCountry: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  categoryBadge: {
    backgroundColor: colors.accent + '40',
    borderRadius: 8,
    padding: 8,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  dealDescription: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  likeCount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  dealDate: {
    fontSize: 12,
    color: colors.textSecondary,
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
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  modalScroll: {
    flex: 1,
  },
  modalButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  infoText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 40,
  },
});
