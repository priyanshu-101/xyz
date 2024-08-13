import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HolidayList = () => {
  const navigation = useNavigation();
  const [holidays] = useState([
    { id: '1', name: 'Independence Day', date: 'July 4, 2024' },
    { id: '2', name: 'Christmas Day', date: 'December 25, 2024' },
    { id: '3', name: 'New Year\'s Day', date: 'January 1, 2024' },
    // Add more holidays here
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="arrow-back" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Public Holidays</Text>
        <Icon name="calendar" size={24} color="grey" style={styles.icon} />
      </View>
      <FlatList
        data={holidays}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDate}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#68689E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    padding: 10,
    color:'black',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  itemDate: {
    fontSize: 16,
    color: '#555',
  },
});

export default HolidayList;
