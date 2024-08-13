import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const NoticesScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('Profile'); // Go back to the previous screen
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
          <Text style={styles.noticeDate}>August 12, 2024</Text>
          <Text style={styles.noticeTitle}>Notice 1</Text>
          <Text style={styles.noticeContent}>This is the content of the first notice.</Text>
        </View>
        <View style={styles.notice}>
          <Text style={styles.noticeDate}>August 11, 2024</Text>
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
});

export default NoticesScreen;
