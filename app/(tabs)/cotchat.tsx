
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import BackgroundImages from '@/components/BackgroundImages';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { MOCK_CHATS } from '@/data/mockChats';
import { MOCK_REQUESTS } from '@/data/mockRequests';
import { CURRENT_USER } from '@/data/mockUsers';
import { MOCK_PROJECTS } from '@/data/mockProjects';

export default function CoTchatScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'chats' | 'requests'>('chats');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter requests for projects owned by current user
  const myProjectRequests = MOCK_REQUESTS.filter((request) => {
    const project = MOCK_PROJECTS.find((p) => p.id === request.projectId);
    return project?.authorId === CURRENT_USER.id && request.status === 'pending';
  });

  const filteredChats = MOCK_CHATS.filter((chat) =>
    chat.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}j`;
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepting request:', requestId);
    // In a real app, this would update the backend
    alert('Demande acceptée ! Un CoTchat a été créé avec ce voyageur.');
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejecting request:', requestId);
    // In a real app, this would update the backend
    alert('Demande refusée.');
  };

  const renderHeaderRight = () => (
    <Pressable style={styles.headerButtonContainer}>
      <IconSymbol name="ellipsis.circle" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'CoTchat',
            headerRight: renderHeaderRight,
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={styles.container}>
        <BackgroundImages />
        <View style={styles.content}>
          <View style={styles.header}>
            {Platform.OS !== 'ios' && (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>CoTchat</Text>
                <Pressable>
                  <IconSymbol name="ellipsis.circle" color={colors.primary} size={28} />
                </Pressable>
              </View>
            )}

            <View style={styles.tabsContainer}>
              <Pressable
                style={[styles.tab, activeTab === 'chats' && styles.tabActive]}
                onPress={() => setActiveTab('chats')}
              >
                <IconSymbol
                  name="message.fill"
                  size={18}
                  color={activeTab === 'chats' ? '#fff' : colors.text}
                />
                <Text style={[styles.tabText, activeTab === 'chats' && styles.tabTextActive]}>
                  Discussions
                </Text>
                {MOCK_CHATS.length > 0 && (
                  <View style={[styles.badge, activeTab === 'chats' && styles.badgeActive]}>
                    <Text style={[styles.badgeText, activeTab === 'chats' && styles.badgeTextActive]}>
                      {MOCK_CHATS.length}
                    </Text>
                  </View>
                )}
              </Pressable>
              <Pressable
                style={[styles.tab, activeTab === 'requests' && styles.tabActive]}
                onPress={() => setActiveTab('requests')}
              >
                <IconSymbol
                  name="person.badge.plus.fill"
                  size={18}
                  color={activeTab === 'requests' ? '#fff' : colors.text}
                />
                <Text style={[styles.tabText, activeTab === 'requests' && styles.tabTextActive]}>
                  Demandes
                </Text>
                {myProjectRequests.length > 0 && (
                  <View style={[styles.badge, activeTab === 'requests' && styles.badgeActive]}>
                    <Text style={[styles.badgeText, activeTab === 'requests' && styles.badgeTextActive]}>
                      {myProjectRequests.length}
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>

            {activeTab === 'chats' && (
              <View style={styles.searchContainer}>
                <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Rechercher une discussion..."
                  placeholderTextColor={colors.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
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
            {activeTab === 'chats' ? (
              <>
                {filteredChats.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateIcon}>💬</Text>
                    <Text style={styles.emptyStateTitle}>Aucune discussion</Text>
                    <Text style={styles.emptyStateText}>
                      Vos discussions de groupe apparaîtront ici une fois que vous serez accepté dans un projet.
                    </Text>
                  </View>
                ) : (
                  filteredChats.map((chat) => (
                    <Pressable
                      key={chat.id}
                      style={styles.chatCard}
                      onPress={() => {
                        console.log('Opening chat:', chat.id);
                        router.push(`/chat/${chat.id}`);
                      }}
                    >
                      <View style={styles.chatIcon}>
                        <IconSymbol name="person.3.fill" size={24} color="#fff" />
                      </View>
                      <View style={styles.chatContent}>
                        <View style={styles.chatHeader}>
                          <Text style={styles.chatTitle} numberOfLines={1}>
                            {chat.projectTitle}
                          </Text>
                          {chat.lastMessageTime && (
                            <Text style={styles.chatTime}>{formatTime(chat.lastMessageTime)}</Text>
                          )}
                        </View>
                        <Text style={styles.chatParticipants} numberOfLines={1}>
                          {chat.participantNames.join(', ')}
                        </Text>
                        {chat.lastMessage && (
                          <Text style={styles.chatLastMessage} numberOfLines={1}>
                            {chat.lastMessage}
                          </Text>
                        )}
                      </View>
                      {chat.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadBadgeText}>{chat.unreadCount}</Text>
                        </View>
                      )}
                    </Pressable>
                  ))
                )}
              </>
            ) : (
              <>
                {myProjectRequests.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateIcon}>📬</Text>
                    <Text style={styles.emptyStateTitle}>Aucune demande</Text>
                    <Text style={styles.emptyStateText}>
                      Les demandes de covoyage pour vos projets apparaîtront ici.
                    </Text>
                  </View>
                ) : (
                  myProjectRequests.map((request) => (
                    <View key={request.id} style={styles.requestCard}>
                      <View style={styles.requestHeader}>
                        <View style={styles.requesterInfo}>
                          <View style={styles.requesterAvatar}>
                            <Text style={styles.requesterAvatarText}>
                              {request.requesterName.charAt(0).toUpperCase()}
                            </Text>
                          </View>
                          <View style={styles.requesterDetails}>
                            <Text style={styles.requesterName}>{request.requesterName}</Text>
                            <View style={styles.ratingContainer}>
                              <IconSymbol name="star.fill" size={14} color={colors.accent} />
                              <Text style={styles.ratingText}>{request.requesterRating.toFixed(1)}</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={styles.projectBadge}>
                        <IconSymbol name="globe" size={14} color={colors.primary} />
                        <Text style={styles.projectBadgeText}>{request.projectTitle}</Text>
                      </View>

                      <Text style={styles.requestMessage}>{request.message}</Text>

                      <View style={styles.requestActions}>
                        <Pressable
                          style={styles.rejectButton}
                          onPress={() => handleRejectRequest(request.id)}
                        >
                          <IconSymbol name="xmark" size={18} color={colors.text} />
                          <Text style={styles.rejectButtonText}>Refuser</Text>
                        </Pressable>
                        <Pressable
                          style={styles.acceptButton}
                          onPress={() => handleAcceptRequest(request.id)}
                        >
                          <IconSymbol name="checkmark" size={18} color="#fff" />
                          <Text style={styles.acceptButtonText}>Accepter</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))
                )}
              </>
            )}
          </ScrollView>
        </View>
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
  headerButtonContainer: {
    padding: 6,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 6,
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
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
  badgeTextActive: {
    color: '#fff',
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
  chatCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
    gap: 12,
  },
  chatIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginRight: 8,
  },
  chatTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chatParticipants: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  chatLastMessage: {
    fontSize: 14,
    color: colors.text,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  requestCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  requesterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  requesterAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requesterAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  requesterDetails: {
    gap: 4,
  },
  requesterName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  projectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.accent + '30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    marginBottom: 12,
  },
  projectBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  requestMessage: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
  },
  rejectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
    boxShadow: '0px 2px 8px rgba(224, 122, 95, 0.3)',
    elevation: 3,
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
