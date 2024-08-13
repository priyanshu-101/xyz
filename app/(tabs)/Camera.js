import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AttendancePage = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Request location permission on mount for Android
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(granted => {
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission not granted');
          }
        });
    }
  }, []);

  const handleMarkAttendance = async () => {
    setCameraActive(true);
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
    // setPhotoUri(null);
    // setLocation(null);
    // setDateTime(null);
    // setCameraActive(false);

    navigation.navigate('Profile')
  };

  return (
    <View style={styles.container}>
      {!cameraActive && !photoUri && (
        <View style={styles.buttonContainer}>
          <Button title="Mark Attendance" onPress={handleMarkAttendance} />
        </View>
      )}

      {cameraActive && (
        <View style={styles.cameraContainer}>
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
            <Text style={styles.location}>
              Location: Latitude {location.latitude.toFixed(6)}, Longitude {location.longitude.toFixed(6)}
            </Text>
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
});

export default AttendancePage;
