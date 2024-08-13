import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { WebView } from 'react-native-webview';  // To display PDF or other documents

const App = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationText, setApplicationText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [sentApplications, setSentApplications] = useState([]);
  const [previewUri, setPreviewUri] = useState(null);

  const handleAttachment = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setAttachments([...attachments, result.uri]);
      setShowAttachmentModal(false);
    }
  };

  const handleSendApplication = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const newApplication = {
      text: applicationText,
      attachments,
      date: formattedDate,
      time: formattedTime,
      status: 'Pending',  // Default status
    };

    setSentApplications([...sentApplications, newApplication]);
    setApplicationText('');
    setAttachments([]);
    setShowApplicationForm(false);

    alert(`Your application was sent on ${formattedDate} at ${formattedTime}.`);
  };

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ramesh Gupta</Text>
        <TouchableOpacity onPress={() => setShowApplicationForm(!showApplicationForm)}>
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
              attachments.map((uri, index) => (
                <View key={index} style={styles.attachmentItem}>
                  <Text style={styles.attachmentText}>{uri.split('/').pop()}</Text>
                  <TouchableOpacity onPress={() => setPreviewUri(uri)}>
                    <Text style={styles.previewButton}>Preview</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    const newAttachments = attachments.filter((_, i) => i !== index);
                    setAttachments(newAttachments);
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
              <WebView
                source={{ uri: previewUri }}
                style={styles.webView}
              />
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
                    app.attachments.map((uri, fileIndex) => (
                      <Text key={fileIndex} style={styles.attachmentText}>{uri.split('/').pop()}</Text>
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

      {/* Attachment Modal */}
      <Modal
        transparent={true}
        visible={showAttachmentModal}
        onRequestClose={() => setShowAttachmentModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Document</Text>
            <Button title="Close" onPress={() => setShowAttachmentModal(false)} />
          </View>
        </View>
      </Modal>
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
  previewButton: {
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
    height: 300, // Adjust the height as needed
  },
  webView: {
    width: '100%',
    height: '100%',
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  applicationText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  applicationDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  applicationStatus: {
    fontSize: 14,
    color: 'blue',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default App;
