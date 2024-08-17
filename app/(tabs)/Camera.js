import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AttendancePage = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [city, setCity] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [customCityVisible, setCustomCityVisible] = useState(false); // State for showing text box after clicking "Other"
  const [customCity, setCustomCity] = useState(''); // State for manually entering the city
  const videoRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(granted => {
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission not granted');
          }
        });
    }
  }, []);

  const handleMarkAttendance = () => {
    setShowDropdown(true); // Show the dropdown
  };

  const handleCitySelect = (selectedCity) => {
    if (selectedCity === 'Other') {
      setCustomCityVisible(true); // Show text box if "Other" is selected
      setCity(null);
    } else {
      setCity(selectedCity);
      setCustomCityVisible(false); // Hide text box if other city is selected
      setShowDropdown(false); // Hide dropdown
      setCameraActive(true); // Activate the camera
      startCamera();
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCaptureImage = async () => {
    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const uri = canvas.toDataURL('image/jpeg');
      setPhotoUri(uri);
      setCameraActive(false);

      // Stop the camera stream
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());

      // Fetch location and datetime
      fetchLocation();
      setDateTime(new Date().toLocaleString());
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        console.error('Error fetching location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleBack = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      {!cameraActive && !photoUri && (
        <View style={styles.buttonContainer}>
          <Button title="Mark Attendance" onPress={handleMarkAttendance} />
        </View>
      )}

      {/* Dropdown for selecting city */}
      {showDropdown && (
        <View style={styles.dropdownContainer}>
          <ScrollView style={styles.dropdown}>
            {['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Other'].map((cityName) => (
              <TouchableOpacity
                key={cityName}
                style={styles.dropdownItem}
                onPress={() => handleCitySelect(cityName)}
              >
                <Text style={styles.dropdownItemText}>{cityName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Show text input after clicking "Other" */}
          {customCityVisible && (
            <View style={styles.customCityContainer}>
              <TextInput
                style={styles.customCityInput}
                placeholder="Enter your city"
                value={customCity}
                onChangeText={setCustomCity}
                onSubmitEditing={() => {
                  setCity(customCity);
                  setShowDropdown(false);
                  setCameraActive(true); // Start the camera after entering custom city
                  startCamera();
                }}
              />
            </View>
          )}
        </View>
      )}

      {cameraActive && (
        <View style={styles.cameraContainer}>
          <Text style={styles.cityText}>City: {city || customCity}</Text>
          <video ref={videoRef} style={styles.video} autoPlay />
          <TouchableOpacity style={styles.captureButton} onPress={handleCaptureImage}>
            <Text style={styles.captureButtonText}>Capture Image</Text>
          </TouchableOpacity>
        </View>
      )}

      {photoUri && (
        <View style={styles.photoContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Image source={{ uri: photoUri }} style={styles.photo} />
          <Text style={styles.dateTime}>Date and Time: {dateTime}</Text>
          {location && (
            <>
              <Text style={styles.location}>
                Location: Latitude {location.latitude.toFixed(6)}, Longitude {location.longitude.toFixed(6)}
              </Text>
              {(city || customCity) && <Text style={styles.city}>City: {city || customCity}</Text>}
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  cameraContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  captureButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  captureButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  video: {
    width: 300,
    height: 400,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  photo: {
    width: 300,
    height: 400,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  dateTime: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  dropdownContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    width: '90%', // Increased the width of dropdown for better visibility
    maxHeight: '50%', // Increased the height of dropdown
    borderRadius: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  dropdownItem: {
    padding: 20, // Increased the padding for dropdown items
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 18,
    color: '#333',
  },
  customCityContainer: {
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  customCityInput: {
    padding: 15, // Increased padding for text input
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  cityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AttendancePage;
