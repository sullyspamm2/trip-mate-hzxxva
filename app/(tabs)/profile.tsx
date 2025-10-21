
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { CURRENT_USER } from '@/data/mockUsers';
import { MOCK_POSTS } from '@/data/mockPosts';
import { MOCK_RATINGS } from '@/data/mockRatings';
import BackgroundImages from '@/components/BackgroundImages';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'posts' | 'ratings'>('posts');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

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

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <IconSymbol
          key={i}
          name={i <= rating ? 'star.fill' : 'star'}
          size={16}
          color={i <= rating ? colors.accent : colors.textSecondary}
        />
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

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
        <BackgroundImages />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {Platform.OS !== 'ios' && <Text style={styles.title}>Profil</Text>}

          <View style={styles.profileHeader}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>
                {CURRENT_USER.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </Text>
            </View>
            <Text style={styles.userName}>{CURRENT_USER.name}</Text>
            <View style={styles.ratingContainer}>
              <IconSymbol name="star.fill" size={20} color={colors.accent} />
              <Text style={styles.ratingText}>
                {CURRENT_USER.rating.toFixed(1)}
              </Text>
              <Text style={styles.ratingCount}>
                ({CURRENT_USER.reviewCount} avis)
              </Text>
            </View>
            <Text style={styles.userBio}>{CURRENT_USER.bio}</Text>
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
                  <IconSymbol
                    name={pref.icon as any}
                    size={28}
                    color={colors.primary}
                  />
                  <Text style={styles.preferenceLabel}>{pref.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mur des publications</Text>
              <Pressable onPress={() => setShowNewPostModal(true)}>
                <IconSymbol
                  name="plus.circle.fill"
                  size={24}
                  color={colors.primary}
                />
              </Pressable>
            </View>

            <View style={styles.tabsContainer}>
              <Pressable
                style={[styles.tab, activeTab === 'posts' && styles.tabActive]}
                onPress={() => setActiveTab('posts')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'posts' && styles.tabTextActive,
                  ]}
                >
                  Publications
                </Text>
              </Pressable>
              <Pressable
                style={[styles.tab, activeTab === 'ratings' && styles.tabActive]}
                onPress={() => setActiveTab('ratings')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'ratings' && styles.tabTextActive,
                  ]}
                >
                  Avis reçus
                </Text>
              </Pressable>
            </View>

            {activeTab === 'posts' ? (
              <View style={styles.postsContainer}>
                {MOCK_POSTS.map((post) => (
                  <View key={post.id} style={styles.postCard}>
                    <Text style={styles.postContent}>{post.content}</Text>
                    {post.images && post.images.length > 0 && (
                      <Image
                        source={{ uri: post.images[0] }}
                        style={styles.postImage}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.postFooter}>
                      <View style={styles.postActions}>
                        <Pressable style={styles.postAction}>
                          <IconSymbol
                            name="heart"
                            size={18}
                            color={colors.textSecondary}
                          />
                          <Text style={styles.postActionText}>{post.likes}</Text>
                        </Pressable>
                        <Pressable style={styles.postAction}>
                          <IconSymbol
                            name="bubble.left"
                            size={18}
                            color={colors.textSecondary}
                          />
                          <Text style={styles.postActionText}>
                            {post.comments}
                          </Text>
                        </Pressable>
                      </View>
                      <Text style={styles.postDate}>
                        {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.ratingsContainer}>
                {MOCK_RATINGS.map((rating) => (
                  <View key={rating.id} style={styles.ratingCard}>
                    <View style={styles.ratingHeader}>
                      <View style={styles.ratingUserInfo}>
                        <View style={styles.avatarSmall}>
                          <Text style={styles.avatarSmallText}>
                            {rating.fromUserName.charAt(0)}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.ratingUserName}>
                            {rating.fromUserName}
                          </Text>
                          <Text style={styles.ratingDate}>
                            {new Date(rating.createdAt).toLocaleDateString(
                              'fr-FR',
                              {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }
                            )}
                          </Text>
                        </View>
                      </View>
                      {renderStars(rating.rating)}
                    </View>
                    <Text style={styles.ratingComment}>{rating.comment}</Text>
                  </View>
                ))}
              </View>
            )}
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
                <IconSymbol
                  name="mappin.circle.fill"
                  size={20}
                  color={colors.textSecondary}
                />
                <Text style={styles.aboutText}>{CURRENT_USER.location}</Text>
              </View>
              <View style={styles.aboutItem}>
                <IconSymbol name="calendar" size={20} color={colors.textSecondary} />
                <Text style={styles.aboutText}>
                  Membre depuis{' '}
                  {new Date(CURRENT_USER.memberSince).toLocaleDateString('fr-FR', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
              </View>
              {CURRENT_USER.verified && (
                <View style={styles.aboutItem}>
                  <IconSymbol
                    name="checkmark.seal.fill"
                    size={20}
                    color={colors.success}
                  />
                  <Text style={styles.aboutText}>Profil vérifié</Text>
                </View>
              )}
            </View>
          </View>

          <Pressable style={styles.settingsButton}>
            <IconSymbol name="gear" size={20} color={colors.text} />
            <Text style={styles.settingsButtonText}>Paramètres</Text>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.logoutButton}>
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color={colors.primary} />
            <Text style={styles.logoutButtonText}>Se déconnecter</Text>
          </Pressable>
        </ScrollView>

        <Modal
          visible={showNewPostModal}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowNewPostModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouvelle publication</Text>
              <Pressable onPress={() => setShowNewPostModal(false)}>
                <IconSymbol
                  name="xmark.circle.fill"
                  size={28}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>
            <TextInput
              style={styles.postInput}
              placeholder="Partagez vos aventures..."
              placeholderTextColor={colors.textSecondary}
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            <Pressable
              style={styles.addPhotoButton}
              onPress={() => console.log('Add photo')}
            >
              <IconSymbol name="photo" size={20} color={colors.primary} />
              <Text style={styles.addPhotoButtonText}>Ajouter une photo</Text>
            </Pressable>
            <Pressable
              style={styles.publishButton}
              onPress={() => {
                console.log('Publishing post:', newPostContent);
                setNewPostContent('');
                setShowNewPostModal(false);
              }}
            >
              <Text style={styles.publishButtonText}>Publier</Text>
            </Pressable>
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
  scrollView: {
    flex: 1,
    zIndex: 1,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  ratingCount: {
    fontSize: 14,
    color: colors.textSecondary,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  tabTextActive: {
    color: '#fff',
  },
  postsContainer: {
    gap: 12,
  },
  postCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  postContent: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  postDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  ratingsContainer: {
    gap: 12,
  },
  ratingCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ratingUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSmallText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  ratingUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  ratingDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingComment: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
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
    marginBottom: 12,
  },
  settingsButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
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
  postInput: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  addPhotoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  publishButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
