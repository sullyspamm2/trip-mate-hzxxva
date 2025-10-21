
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import CountrySelector from '@/components/CountrySelector';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackgroundImages from '@/components/BackgroundImages';

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [budget, setBudget] = useState('');
  const [travelersNeeded, setTravelersNeeded] = useState('2');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un titre pour votre projet');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Erreur', 'Veuillez décrire votre projet de voyage');
      return;
    }
    if (selectedCountries.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins un pays');
      return;
    }

    console.log('Creating project:', {
      title,
      description,
      selectedCountries,
      startDate,
      endDate,
      budget,
      travelersNeeded,
    });

    Alert.alert(
      'Projet créé !',
      'Votre projet de voyage a été publié avec succès. D\'autres voyageurs peuvent maintenant le découvrir !',
      [
        {
          text: 'OK',
          onPress: () => {
            setTitle('');
            setDescription('');
            setSelectedCountries([]);
            setStartDate(undefined);
            setEndDate(undefined);
            setBudget('');
            setTravelersNeeded('2');
          },
        },
      ]
    );
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Sélectionner';
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Créer un projet',
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
          {Platform.OS !== 'ios' && (
            <Text style={styles.title}>Créer un projet</Text>
          )}

          <View style={styles.section}>
            <Text style={styles.label}>
              Titre du projet <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Road trip en Islande"
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>
              Destination(s) <Text style={styles.required}>*</Text>
            </Text>
            <CountrySelector
              selectedCountries={selectedCountries}
              onCountriesChange={setSelectedCountries}
              multiSelect={true}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>
              Description <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Décrivez votre projet de voyage, vos attentes, le type de voyageurs que vous recherchez..."
              placeholderTextColor={colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.section, styles.halfWidth]}>
              <Text style={styles.label}>Date de départ</Text>
              <Pressable
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <IconSymbol name="calendar" size={20} color={colors.textSecondary} />
                <Text
                  style={[
                    styles.dateButtonText,
                    !startDate && styles.dateButtonPlaceholder,
                  ]}
                >
                  {formatDate(startDate)}
                </Text>
              </Pressable>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowStartDatePicker(Platform.OS === 'ios');
                    if (selectedDate) {
                      setStartDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>

            <View style={[styles.section, styles.halfWidth]}>
              <Text style={styles.label}>Date de retour</Text>
              <Pressable
                style={styles.dateButton}
                onPress={() => setShowEndDatePicker(true)}
              >
                <IconSymbol name="calendar" size={20} color={colors.textSecondary} />
                <Text
                  style={[
                    styles.dateButtonText,
                    !endDate && styles.dateButtonPlaceholder,
                  ]}
                >
                  {formatDate(endDate)}
                </Text>
              </Pressable>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate || startDate || new Date()}
                  mode="date"
                  display="default"
                  minimumDate={startDate}
                  onChange={(event, selectedDate) => {
                    setShowEndDatePicker(Platform.OS === 'ios');
                    if (selectedDate) {
                      setEndDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.section, styles.halfWidth]}>
              <Text style={styles.label}>Budget estimé</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 2000-2500€"
                placeholderTextColor={colors.textSecondary}
                value={budget}
                onChangeText={setBudget}
              />
            </View>

            <View style={[styles.section, styles.halfWidth]}>
              <Text style={styles.label}>Voyageurs recherchés</Text>
              <TextInput
                style={styles.input}
                placeholder="2"
                placeholderTextColor={colors.textSecondary}
                value={travelersNeeded}
                onChangeText={setTravelersNeeded}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View style={styles.infoBox}>
            <IconSymbol name="info.circle.fill" size={20} color={colors.primary} />
            <Text style={styles.infoText}>
              Votre projet sera visible par tous les utilisateurs. Assurez-vous de
              fournir suffisamment de détails pour attirer les bons compagnons de
              voyage !
            </Text>
          </View>

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Publier le projet</Text>
            <IconSymbol name="arrow.right" size={20} color="#fff" />
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
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  required: {
    color: colors.primary,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  dateButtonPlaceholder: {
    color: colors.textSecondary,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.accent + '20',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.accent + '40',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0px 4px 12px rgba(224, 122, 95, 0.3)',
    elevation: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
