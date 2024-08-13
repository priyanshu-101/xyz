import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const EmployeesScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('Profile'); // Replace 'Profile' with the actual name of the profile screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" type="material" color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <Icon name="search" type="material" color="white" />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg' }} 
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>Ramesh Gupta</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>123 Main St, City</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mobile:</Text>
            <Text style={styles.infoValue}>+1234567890</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>DOB:</Text>
            <Text style={styles.infoValue}>January 1, 1990</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>ramesh.gupta@example.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Password:</Text>
            <Text style={styles.infoValue}>password123</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Designation:</Text>
            <Text style={styles.infoValue}>Software Engineer</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Salary:</Text>
            <Text style={styles.infoValue}>$5000</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Working Hours:</Text>
            <Text style={styles.infoValue}>9 AM - 5 PM</Text>
          </View>
        </View>
        
      </View>
      {menuVisible && (
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Edit</Text>
          <Text style={styles.menuItem}>Call</Text>
          <Text style={styles.menuItem}>Delete</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#68689E', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
   
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Android shadow effect
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoGrid: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
  menuIcon: {
    padding: 5,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  menu: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 10,
    top: 120,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
    fontSize: 16,
  },
});

export default EmployeesScreen;
