import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CustomCheckbox = ({ value, onChange }) => {
  return (
    <TouchableOpacity style={[styles.checkbox, value ? styles.checkboxChecked : {}]} onPress={onChange}>
      {value && <View style={styles.checkboxTick} />}
    </TouchableOpacity>
  );
};

const App = () => {
  const [days, setDays] = useState([
    { label: 'NO punch out', value: false },
    { label: 'Present Day', value: false },
    { label: 'Half Day', value: false },
    { label: 'On Leave', value: false }
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleCheckboxChange = (index) => {
    const newDays = [...days];
    newDays[index].value = !newDays[index].value;
    setDays(newDays);
  };

  const changeMonth = (delta) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + delta);
      return newDate;
    });
  };

  const changeYear = (delta) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(newDate.getFullYear() + delta);
      return newDate;
    });
  };

  const renderDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const weeks = [];
    let currentDay = 1;

    for (let week = 0; week < 6; week++) {
      const days = [];
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < firstDay) {
          days.push(<View key={day} style={styles.emptyDay} />);
        } else if (currentDay <= daysInMonth) {
          days.push(
            <View key={day} style={styles.day}>
              <Text style={[styles.dayText, (currentDay % 7 === 0 || (currentDay + 1) % 7 === 0) ? styles.holidayText : {}]}>
                {currentDay}
              </Text>
            </View>
          );
          currentDay++;
        } else {
          days.push(<View key={day} style={styles.emptyDay} />);
        }
      }
      weeks.push(
        <View key={week} style={styles.week}>
          {days}
        </View>
      );
    }
    return weeks;
  };

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ramesh Gupta</Text>
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
          <Icon name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.calendar}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => changeYear(-1)}>
            <Icon name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Icon name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.month}>
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Icon name="arrow-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeYear(1)}>
            <Icon name="arrow-forward-ios" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.weekDays}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <Text key={index} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>
        {renderDays()}
      </View>

      <View style={styles.optionsContainer}>
        <View style={[styles.option, styles.noPunchOut]}>
          <Text style={styles.optionText}>NO punch out</Text>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>1</Text>
          </View>
        </View>
        <View style={[styles.option, styles.presentDay]}>
          <Text style={styles.optionText}>Present Day</Text>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>2</Text>
          </View>
        </View>
        <View style={[styles.option, styles.halfDay]}>
          <Text style={styles.optionText}>Half Day</Text>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>3</Text>
          </View>
        </View>
        <View style={[styles.option, styles.onLeave]}>
          <Text style={styles.optionText}>On Leave</Text>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>4</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#68689E',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  calendar: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  month: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  weekDayText: {
    width: '14%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    width: '14%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  dayText: {
    color: '#000',
  },
  holidayText: {
    color: 'red',
  },
  emptyDay: {
    width: '14%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  noPunchOut: {
    backgroundColor: '#FCE4EC',
  },
  presentDay: {
    backgroundColor: '#E8F5E9',
  },
  halfDay: {
    backgroundColor: '#FFF3E0',
  },
  onLeave: {
    backgroundColor: '#E3F2FD',
  },
  optionText: {
    fontSize: 16,
  },
  numberContainer: {
    backgroundColor: '#d1e0e0',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 14,
    color: '#000',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 3,
  },
});

export default App;
