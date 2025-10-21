
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { colors } from '@/styles/commonStyles';
import { COUNTRIES } from '@/data/countries';
import { IconSymbol } from './IconSymbol';

interface CountrySelectorProps {
  selectedCountries: string[];
  onCountriesChange: (countries: string[]) => void;
  multiSelect?: boolean;
}

export default function CountrySelector({
  selectedCountries,
  onCountriesChange,
  multiSelect = true,
}: CountrySelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCountry = (countryCode: string) => {
    if (multiSelect) {
      if (selectedCountries.includes(countryCode)) {
        onCountriesChange(selectedCountries.filter((c) => c !== countryCode));
      } else {
        onCountriesChange([...selectedCountries, countryCode]);
      }
    } else {
      onCountriesChange([countryCode]);
      setModalVisible(false);
    }
  };

  const getSelectedCountryNames = () => {
    if (selectedCountries.length === 0) return 'Sélectionner des pays';
    return selectedCountries
      .map((code) => {
        const country = COUNTRIES.find((c) => c.code === code);
        return country ? `${country.flag} ${country.name}` : '';
      })
      .join(', ');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.selector} onPress={() => setModalVisible(true)}>
        <Text
          style={[
            styles.selectorText,
            selectedCountries.length === 0 && styles.placeholderText,
          ]}
          numberOfLines={2}
        >
          {getSelectedCountryNames()}
        </Text>
        <IconSymbol name="chevron.down" size={20} color={colors.text} />
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {multiSelect ? 'Sélectionner des pays' : 'Sélectionner un pays'}
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.text} />
              </Pressable>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un pays..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <ScrollView style={styles.countryList}>
              {filteredCountries.map((country) => {
                const isSelected = selectedCountries.includes(country.code);
                return (
                  <Pressable
                    key={country.code}
                    style={[
                      styles.countryItem,
                      isSelected && styles.countryItemSelected,
                    ]}
                    onPress={() => toggleCountry(country.code)}
                  >
                    <Text style={styles.countryFlag}>{country.flag}</Text>
                    <Text style={styles.countryName}>{country.name}</Text>
                    {isSelected && (
                      <IconSymbol
                        name="checkmark.circle.fill"
                        size={24}
                        color={colors.primary}
                      />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>

            {multiSelect && (
              <Pressable
                style={styles.doneButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.doneButtonText}>Terminé</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    minHeight: 56,
  },
  selectorText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  searchInput: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    fontSize: 16,
    color: colors.text,
  },
  countryList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  countryItemSelected: {
    backgroundColor: colors.accent + '20',
    borderColor: colors.primary,
  },
  countryFlag: {
    fontSize: 28,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  doneButton: {
    backgroundColor: colors.primary,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
