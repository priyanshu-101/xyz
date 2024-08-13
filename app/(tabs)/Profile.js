import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const Profile = () => {
  const navigation = useNavigation();
  const [salaryModalVisible, setSalaryModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // Example salary data
  const salary = 50000;
  const advance = 10000; // Change this to 0 if no advance is taken
  const bonus = 5000; // Example bonus amount
  const finalSalary = salary - advance + bonus;
  const advanceDate = '2024-07-01'; // Example advance date
  const bonusDate = '2024-07-15'; // Example bonus date

  const handleLogoutNavigation = () => {
    setMenuVisible(false);
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar
            rounded
            size="large"
            source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg' }} 
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>Ramesh Gupta</Text>
            <Text style={styles.credits}>Total Credits - 50000</Text>
          </View>
        </View>
        <view style={styles.buttonsContainer}>
        <TouchableOpacity
            onPress={handleLogoutNavigation}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          </view>
          </View>
      
      <View style={styles.menuContainer}>
             
        <View style={styles.menuItem}>
          <Image style={styles.menuImage} source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg' }} /> 
          <TouchableOpacity style={styles.menuTouchable} onPress={() => navigation.navigate('Employee')} >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Profile</Text>
              <Text style={styles.menuSubText}>Display your profile details</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuItem}>
          <Image style={styles.menuImage} source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg' }} /> 
          <TouchableOpacity 
            style={styles.menuTouchable} 
            onPress={() => navigation.navigate('Camera')} 
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Mark Attendance</Text>
              <Text style={styles.menuSubText}>Mark your daily attendance</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuItem}>
          <Image style={styles.menuImage} source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg' }} /> 
          <TouchableOpacity 
            style={styles.menuTouchable} 
            onPress={() => navigation.navigate('ViewAtt')} 
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>View Attendance</Text>
              <Text style={styles.menuSubText}>Check your monthly attendance in detail</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItem}>
          <Image style={styles.menuImage} source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg' }} /> 
          <TouchableOpacity 
            style={styles.menuTouchable} 
            onPress={() => navigation.navigate('Application')} 
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Leave application</Text>
              <Text style={styles.menuSubText}>Total leaves</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>


        <View style={styles.menuItem}>
          <Image style={styles.menuImage} source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg' }} /> 
          <TouchableOpacity 
            style={styles.menuTouchable} 
            onPress={() => navigation.navigate('Salary')} 
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>View Salary</Text>
              <Text style={styles.menuSubText}>Check your income</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItem}>
          <Image style={styles.menuImage} source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg' }} /> 
          <TouchableOpacity 
            style={styles.menuTouchable} 
            onPress={() => navigation.navigate('HolidayList')} 
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Public Holidays</Text>
              <Text style={styles.menuSubText}>Check allocated public holidays</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>   
       
        <View style={styles.menuItem}>
          <Image style={styles.menuImage} source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg' }} /> 
          <TouchableOpacity 
            style={styles.menuTouchable} 
            onPress={() => navigation.navigate('Notice')} 
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Notice </Text>
              <Text style={styles.menuSubText}>Notice by Admin</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>
        
      </View>

      {/* Salary Receipt Modal */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={salaryModalVisible}
        onRequestClose={() => setSalaryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Salary Receipt</Text>
            <View style={styles.gridContainer}>
              <View style={styles.gridItem}>
                <Text style={styles.gridItemText}>Total Salary</Text>
                <Text style={styles.gridItemValue}>{salary}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridItemText}>Advance Taken</Text>
                <Text style={styles.gridItemValue}>{advance}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridItemText}>Advance Date</Text>
                <Text style={styles.gridItemValue}>{advanceDate}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridItemText}>Bonus Received</Text>
                <Text style={styles.gridItemValue}>{bonus}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridItemText}>Bonus Date</Text>
                <Text style={styles.gridItemValue}>{bonusDate}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridItemText}>Final Salary</Text>
                <Text style={styles.gridItemValue}>{finalSalary}</Text>
              </View>
            </View>
            <Button title="Close" onPress={() => setSalaryModalVisible(false)} />
          </View>
        </View>
      </Modal> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D9D9D9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  credits: {
    fontSize: 22,
    color: 'red',
  },
  menuIcon: {
    alignSelf: 'flex-start',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40, // Adjust as needed
    right: 0,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    width: 100,
    elevation: 5, // Adds shadow for Android
    zIndex: 1, // Ensures dropdown is above other elements
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 18,
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: '#68689E',
    borderRadius: 20,
    padding: 15,
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#EEE',
    borderRadius: 10,
  },
  menuImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  menuTouchable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  menuSubText: {
    fontSize: 18,
    color: '#555',
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
    borderLeftWidth: 15,
    borderLeftColor: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 15,
  },
  gridContainer: {
    width: '100%',
    marginBottom: 15,
  },
  gridItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  gridItemText: {
    fontSize: 18,
  },
  gridItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
