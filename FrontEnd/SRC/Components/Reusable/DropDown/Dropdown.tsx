import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import styles from './DropDown.styles';

// Options pour l'état fermé (texte complet)
const closedOptions = [
  "Classement par associations",
  "Classement par universités",
  "Classement dans mon université",
  "Classement dans mon association",
  "Classement des membres MC",
];

// Options pour le volet ouvert (texte court)
const modalOptions = [
  "Associations",
  "Universités",
  "Mon association",
  "Mon université",
  "Membre MC",
];

export type DropDownProps = {
  selected: string; // Doit être l'un des closedOptions
  onSelect: (option: string) => void;
};

const DropDown: React.FC<DropDownProps> = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  // On détermine l'index sélectionné dans closedOptions
  const selectedIndex = closedOptions.indexOf(selected);
  const handleOptionPress = (index: number) => {
    if (index !== selectedIndex) {
      onSelect(closedOptions[index]);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* État fermé : affichage du contenu avec icône et texte */}
      <TouchableOpacity
        style={styles.closedContainer}
        onPress={() => setIsOpen(true)}
        testID="dropdown-closed"
      >
        <View style={styles.closedContent}>
          {/* Cercle avec icône sur la gauche */}
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../../../FrontEnd/assets/icone_bat.png')}
              style={styles.icon}
            />
          </View>
          {/* Texte centré */}
          <View style={styles.closedTextContainer}>
            <Text style={styles.closedText}>{selected}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal qui se déploie depuis le bas */}
      <Modal
        transparent
        animationType="none"
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay} testID="dropdown-modal">
          {/* Zone cliquable pour fermer le modal en dehors du volet */}
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          {/* Volet qui se déploie */}
          <View style={styles.modalContainer}>
            {/* Bouton de fermeture (croix) */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsOpen(false)}
              testID="dropdown-close"
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            {/* Titre du volet */}
            <Text style={styles.modalTitle}>Classement par ?</Text>
            {/* Liste des options du volet (texte court) */}
            {modalOptions.map((option, index) => {
              const isSelected = index === selectedIndex;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => handleOptionPress(index)}
                  disabled={isSelected}
                  testID={`dropdown-option-${index}`}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionSelected]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {/* Ligne bleue en bas du volet (optionnel) */}
            {/* <View style={styles.bottomLine} /> */}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DropDown;
