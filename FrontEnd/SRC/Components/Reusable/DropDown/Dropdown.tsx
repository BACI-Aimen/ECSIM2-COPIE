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


const closedOptions = [
  "Classement par associations",
  "Classement par universités",
  "Classement dans mon université",
  "Classement dans mon association",
  "Classement des membres MC",
];


const modalOptions = [
  "Associations",
  "Universités",
  "Mon université",
  "Mon association",
  "Membre MC",
];

export type DropDownProps = {
  selected: string; 
  onSelect: (option: string) => void;
};

const DropDown: React.FC<DropDownProps> = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);


  const selectedIndex = closedOptions.indexOf(selected);
  const handleOptionPress = (index: number) => {
    if (index !== selectedIndex) {
      onSelect(closedOptions[index]);
    }
    setIsOpen(false);
  };

  return (
    <>
    
      <TouchableOpacity
        style={styles.closedContainer}
        onPress={() => setIsOpen(true)}
        testID="dropdown-closed"
      >
        <View style={styles.closedContent}>

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

      <Modal
        transparent
        animationType="none"
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay} testID="dropdown-modal">

          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>

          <View style={styles.modalContainer}>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsOpen(false)}
              testID="dropdown-close"
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Classement par ?</Text>

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

          </View>
        </View>
      </Modal>
    </>
  );
};

export default DropDown;
