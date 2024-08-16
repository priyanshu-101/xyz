import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SalaryPage = () => {
  const [salary, setSalary] = useState(50000); // Example base salary
  const [advances, setAdvances] = useState([
    { id: '1', amount: 5000, date: '2024-08-01' },
    { id: '2', amount: 3000, date: '2024-08-05' },
  ]);
  const [bonuses, setBonuses] = useState([
    { id: '1', amount: 2000, date: '2024-08-02' },
    { id: '2', amount: 1500, date: '2024-08-08' },
  ]);

  const navigation = useNavigation();

  // Calculate total advances, bonuses, and final salary
  const totalAdvances = advances.reduce((sum, item) => sum + item.amount, 0);
  const totalBonuses = bonuses.reduce((sum, item) => sum + item.amount, 0);
  const finalSalary = salary - totalAdvances + totalBonuses;

  const handleConfirm = () => {
    alert('Confirmation', 'Receipt generated successfully!');
  };

  // Filter data for a particular date
  const selectedDate = '2024-08-05'; // Change this date as needed
  const advancesForDate = advances.filter(item => item.date === selectedDate);
  const bonusesForDate = bonuses.filter(item => item.date === selectedDate);

  const renderRow = ({ item, type }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{type}</Text>
      <Text style={styles.cell}>₹{item.amount}</Text>
      <Text style={styles.cell}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Remash's Salary</Text>

      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Type</Text>
          <Text style={styles.headerCell}>Amount</Text>
          <Text style={styles.headerCell}>Date</Text>
        </View>

        <Text style={styles.sectionTitle}>Advances</Text>
        <FlatList
          data={advances}
          renderItem={(props) => renderRow({ ...props, type: 'Advance' })}
          keyExtractor={item => item.id}
        />

        <Text style={styles.sectionTitle}>Bonuses</Text>
        <FlatList
          data={bonuses}
          renderItem={(props) => renderRow({ ...props, type: 'Bonus' })}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Base Salary: ₹{salary}</Text>
        <Text style={styles.summaryText}>Total Advances: ₹{totalAdvances}</Text>
        <Text style={styles.summaryText}>Total Bonuses: ₹{totalBonuses}</Text>
        <Text style={styles.finalSalaryText}>Final Salary: ₹{finalSalary}</Text>
      </View>

      {/* Receipt Section for Particular Date */}
      <View style={styles.receiptContainer}>
        <Text style={styles.receiptTitle}>Receipt for {selectedDate}</Text>
        {advancesForDate.length > 0 ? (
          advancesForDate.map(item => (
            <Text key={item.id} style={styles.receiptText}>Advance: ₹{item.amount} on {item.date}</Text>
          ))
        ) : (
          <Text style={styles.receiptText}>No advances on this date</Text>
        )}
        {bonusesForDate.length > 0 ? (
          bonusesForDate.map(item => (
            <Text key={item.id} style={styles.receiptText}>Bonus: ₹{item.amount} on {item.date}</Text>
          ))
        ) : (
          <Text style={styles.receiptText}>No bonuses on this date</Text>
        )}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#68689E', // Background color
  },
  backArrow: {
    marginBottom: 20,
  },
  backArrowText: {
    fontSize: 24,
    color: '#000', // Black color for the back arrow
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff', // White text color for the title
    marginBottom: 20,
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  summary: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  finalSalaryText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  receiptContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  receiptTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  receiptText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SalaryPage;
