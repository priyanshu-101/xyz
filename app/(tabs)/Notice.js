import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const NoticesScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(null); // Track which notice's menu is visible
  const [confirmedNotices, setConfirmedNotices] = useState(new Set()); // Track confirmed notices

  const handleBackPress = () => {
    navigation.navigate('Profile'); // Go back to the previous screen
  };

  const handleThreeDotsPress = (id) => {
    // Toggle the visibility of the menu
    setVisible(visible === id ? null : id);
  };

  const handleConfirm = (id) => {
    if (confirmedNotices.has(id)) {
      alert('Notice Already Confirmed', 'You have already confirmed this notice.');
    } else {
      alert('Confirmation', 'Notice confirmed successfully!');
      setConfirmedNotices(prev => new Set(prev).add(id)); // Add id to confirmed notices
    }
    setVisible(null); // Hide the menu after confirming
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" type="material" color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notices</Text>
      </View>

      <View style={styles.noticeContainer}>
        <View style={styles.notice}>
          <View style={styles.noticeHeader}>
            <Text style={styles.noticeDate}>August 12, 2024</Text>
            <TouchableOpacity onPress={() => handleThreeDotsPress(1)}>
              <Icon name="more-vert" type="material" color="gray" />
            </TouchableOpacity>
            {visible === 1 && (
              <TouchableOpacity style={styles.confirmOption} onPress={() => handleConfirm(1)}>
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.noticeTitle}>Notice 1</Text>
          <Text style={styles.noticeContent}>This is the content of the first notice.</Text>
        </View>

        <View style={styles.notice}>
          <View style={styles.noticeHeader}>
            <Text style={styles.noticeDate}>August 11, 2024</Text>
            <TouchableOpacity onPress={() => handleThreeDotsPress(2)}>
              <Icon name="more-vert" type="material" color="gray" />
            </TouchableOpacity>
            {visible === 2 && (
              <TouchableOpacity style={styles.confirmOption} onPress={() => handleConfirm(2)}>
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.noticeTitle}>Notice 2</Text>
          <Text style={styles.noticeContent}>This is the content of the second notice.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#68689E',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  noticeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notice: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noticeDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  noticeContent: {
    fontSize: 16,
    color: '#666',
  },
  confirmOption: {
    position: 'absolute',
    top: 30,
    right: 10,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  confirmText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default NoticesScreen;
