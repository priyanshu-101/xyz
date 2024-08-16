import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, Modal, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationText, setApplicationText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [sentApplications, setSentApplications] = useState([]);
  const [previewUri, setPreviewUri] = useState(null);

  const handleAttachment = () => {
    if (Platform.OS === 'web') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/pdf';
      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const uri = reader.result;
            setAttachments(prev => [...prev, { uri, name: file.name }]);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      Alert.alert('File Picker', 'Please implement a file picker or use a library for mobile file selection.');
    }
  };

  const handleSendApplication = () => {
    if (applicationText.trim() === '') {
      Alert.alert('Error', 'Application text cannot be empty.');
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const newApplication = {
      text: applicationText,
      attachments,
      date: formattedDate,
      time: formattedTime,
      status: 'Pending',
    };

    setSentApplications(prev => [...prev, newApplication]);
    setApplicationText('');
    setAttachments([]);
    setShowApplicationForm(false);

    Alert.alert('Success', `Your application was sent on ${formattedDate} at ${formattedTime}.`);
  };

  const handleDownload = (uri) => {
    if (Platform.OS === 'web') {
      const link = document.createElement('a');
      link.href = uri;
      link.download = uri.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Mobile-specific download logic might go here
      Alert.alert('Download', 'Please implement a download function or use a library for mobile file downloading.');
    }
  };

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ramesh Gupta</Text>
        <TouchableOpacity onPress={() => setShowApplicationForm(prev => !prev)}>
          <Icon name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {showApplicationForm && (
        <View style={styles.applicationForm}>
          <TextInput
            style={styles.textInput}
            placeholder="Start application..."
            multiline
            numberOfLines={4}
            onChangeText={setApplicationText}
            value={applicationText}
          />
          <View style={styles.buttonRow}>
            <Button title="Attach Document" onPress={handleAttachment} />
            <Button title="Send" onPress={handleSendApplication} />
          </View>
          <View style={styles.attachmentContainer}>
            {attachments.length > 0 ? (
              attachments.map((file, index) => (
                <View key={index} style={styles.attachmentItem}>
                  <Text style={styles.attachmentText}>{file.name}</Text>
                  {/* <TouchableOpacity onPress={() => handleDownload(file.uri)}>
                    <Text style={styles.downloadButton}>Download</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity onPress={() => {
                    setAttachments(prev => prev.filter((_, i) => i !== index));
                  }}>
                    <Text style={styles.removeButton}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noAttachments}>No documents attached.</Text>
            )}
          </View>
          {previewUri && (
            <View style={styles.previewContainer}>
              <Text>Preview for: {previewUri}</Text>
              <Button title="Close Preview" onPress={() => setPreviewUri(null)} />
            </View>
          )}
        </View>
      )}

      {sentApplications.length > 0 && (
        <View style={styles.sentApplications}>
          <Text style={styles.sentApplicationsTitle}>Sent Applications</Text>
          <View style={styles.columnsContainer}>
            {sentApplications.map((app, index) => (
              <View key={index} style={styles.applicationColumn}>
                <Text style={styles.applicationText}>{app.text}</Text>
                <Text style={styles.applicationDate}>{`Date: ${app.date} Time: ${app.time}`}</Text>
                <Text style={styles.applicationStatus}>{`Status: ${app.status}`}</Text>
                <View style={styles.attachmentContainer}>
                  {app.attachments.length > 0 ? (
                    app.attachments.map((file, fileIndex) => (
                      <TouchableOpacity key={fileIndex} onPress={() => handleDownload(file.uri)}>
                        <Text style={styles.attachmentText}>{file.name} </Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.noAttachments}>No documents attached.</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
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
  applicationForm: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  attachmentContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  attachmentText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
  },
  downloadButton: {
    color: 'blue',
    fontSize: 16,
  },
  removeButton: {
    color: 'red',
    fontSize: 16,
  },
  noAttachments: {
    fontSize: 16,
    color: 'gray',
  },
  previewContainer: {
    marginTop: 20,
    width: '100%',
    height: 300,
  },
  sentApplications: {
    width: '100%',
    marginTop: 20,
  },
  sentApplicationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  columnsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  applicationColumn: {
    width: '48%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  applicationText: {
    fontSize: 16,
    color: 'black',
  },
  applicationDate: {
    fontSize: 14,
    color: 'gray',
  },
  applicationStatus: {
    fontSize: 14,
    color: 'green',
  },
});

export default App;
