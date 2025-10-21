
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import { COUNTRIES } from '@/data/countries';
import BackgroundImages from '@/components/BackgroundImages';
import { CURRENT_USER } from '@/data/mockUsers';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);

  const project = MOCK_PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Projet non trouvé</Text>
      </View>
    );
  }

  const isFull = project.acceptedTravelers.length >= project.travelersNeeded;
  const isOwner = project.authorId === CURRENT_USER.id;

  const getCountryNames = () => {
    return project.countries
      .map((code) => {
        const country = COUNTRIES.find((c) => c.code === code);
        return country ? `${country.flag} ${country.name}` : '';
      })
      .join(', ');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleSendRequest = () => {
    if (!message.trim()) {
      Alert.alert('Erreur', 'Veuillez écrire un message pour votre demande');
      return;
    }

    console.log('Sending request for project:', project.id, 'with message:', message);
    Alert.alert(
      'Demande envoyée !',
      'Votre demande de covoyage a été envoyée. Le créateur du projet vous répondra bientôt.',
      [
        {
          text: 'OK',
          onPress: () => {
            setMessage('');
            setShowMessageBox(false);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Détails du projet',
          headerBackTitle: 'Retour',
        }}
      />
      <View style={styles.container}>
        <BackgroundImages />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isFull && (
            <View style={styles.fullBanner}>
              <IconSymbol name="checkmark.circle.fill" size={24} color="#fff" />
              <Text style={styles.fullBannerText}>Ce projet est complet</Text>
            </View>
          )}

          <View style={styles.header}>
            <Text style={styles.title}>{project.title}</Text>
            <View style={styles.statusContainer}>
              <View style={styles.travelersStatus}>
                <IconSymbol name="person.2.fill" size={20} color={colors.primary} />
                <Text style={styles.statusText}>
                  {project.acceptedTravelers.length}/{project.travelersNeeded} voyageurs
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="globe" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Destination</Text>
            </View>
            <Text style={styles.sectionContent}>{getCountryNames()}</Text>
          </View>

          {(project.startDate || project.endDate) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <IconSymbol name="calendar" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Dates</Text>
              </View>
              <Text style={styles.sectionContent}>
                {project.startDate && `Du ${formatDate(project.startDate)}`}
                {project.endDate && ` au ${formatDate(project.endDate)}`}
              </Text>
            </View>
          )}

          {project.budget && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <IconSymbol name="dollarsign.circle.fill" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Budget</Text>
              </View>
              <Text style={styles.sectionContent}>{project.budget}</Text>
            </View>
          )}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="doc.text.fill" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Description</Text>
            </View>
            <Text style={styles.description}>{project.description}</Text>
          </View>

          {project.tags && project.tags.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <IconSymbol name="tag.fill" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Tags</Text>
              </View>
              <View style={styles.tags}>
                {project.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="person.fill" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Organisateur</Text>
            </View>
            <View style={styles.authorCard}>
              <View style={styles.authorAvatar}>
                <Text style={styles.authorAvatarText}>
                  {project.authorName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.authorName}>{project.authorName}</Text>
            </View>
          </View>

          {!isOwner && (
            <View style={styles.actionSection}>
              {!isFull ? (
                showMessageBox ? (
                  <View style={styles.messageBox}>
                    <Text style={styles.messageBoxTitle}>
                      Présentez-vous et expliquez pourquoi vous souhaitez rejoindre ce voyage
                    </Text>
                    <TextInput
                      style={styles.messageInput}
                      placeholder="Écrivez votre message ici..."
                      placeholderTextColor={colors.textSecondary}
                      value={message}
                      onChangeText={setMessage}
                      multiline
                      numberOfLines={6}
                      textAlignVertical="top"
                    />
                    <View style={styles.messageActions}>
                      <Pressable
                        style={styles.cancelButton}
                        onPress={() => {
                          setShowMessageBox(false);
                          setMessage('');
                        }}
                      >
                        <Text style={styles.cancelButtonText}>Annuler</Text>
                      </Pressable>
                      <Pressable
                        style={styles.sendButton}
                        onPress={handleSendRequest}
                      >
                        <IconSymbol name="paperplane.fill" size={18} color="#fff" />
                        <Text style={styles.sendButtonText}>Envoyer la demande</Text>
                      </Pressable>
                    </View>
                  </View>
                ) : (
                  <Pressable
                    style={styles.requestButton}
                    onPress={() => setShowMessageBox(true)}
                  >
                    <IconSymbol name="person.badge.plus.fill" size={20} color="#fff" />
                    <Text style={styles.requestButtonText}>Demander à rejoindre</Text>
                  </Pressable>
                )
              ) : (
                <View style={styles.fullMessage}>
                  <IconSymbol name="info.circle.fill" size={20} color={colors.textSecondary} />
                  <Text style={styles.fullMessageText}>
                    Ce projet est complet. Vous ne pouvez plus envoyer de demande.
                  </Text>
                </View>
              )}
            </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 40,
  },
  fullBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  fullBannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 36,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  travelersStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent + '30',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  sectionContent: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 26,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorAvatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  authorName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  actionSection: {
    marginTop: 8,
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 16,
    gap: 8,
    boxShadow: '0px 4px 16px rgba(224, 122, 95, 0.4)',
    elevation: 4,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  messageBox: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageBoxTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 22,
  },
  messageInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 120,
    marginBottom: 12,
  },
  messageActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  sendButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    gap: 8,
    boxShadow: '0px 2px 8px rgba(224, 122, 95, 0.3)',
    elevation: 3,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  fullMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fullMessageText: {
    flex: 1,
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
