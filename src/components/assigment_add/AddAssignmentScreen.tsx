import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import TopBar from '../../components/TopBar';
import {
  AssigmentAddData,
  sectionsData,
  SubjectAndTeacherData,
} from '../../config/axios';
import Toast from 'react-native-toast-message';
import {sectionsApiResponce} from '../../types';
import NoDataFound from '../no_data_found/NoDataFound';
import {DrawerActions, useNavigation} from '@react-navigation/native';

interface Section {
  classId: number;
  id: number;
  sectionName: string;
  sectionTitle: string;
  teacherId: any[];
}

const {width} = Dimensions.get('window');

const AddAssignmentScreen = () => {
  const [title, setTitle] = useState('');
  const [data, setData] = useState<sectionsApiResponce | null>(null);
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [subject, setSubject] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [subjectData, setsubjectData] = useState<any>();
  // console.log(subjectData);

  const navigation = useNavigation();

  useEffect(() => {
    loadData(); // Initial data load
  }, []);

  useEffect(() => {
    if (data) {
      // Extract sections data and filter sections with classId 48
      const sections = Object.values(data.sections).flat();
      const filtered = sections.filter(section => section.classId === 48);
      setFilteredSections(filtered);
    }
  }, [data]);

  const loadData = async () => {
    try {
      const response = await SubjectAndTeacherData();
      setsubjectData(response.subjects || []);

      const data = await sectionsData();
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(false);
    setDeadline(currentDate);
  };

  const addAssignment = async () => {
    if (!title || !description || !file) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill out all fields and attach a file.',
      });
      return;
    }

    setLoading(true); // Show the loader

    const date = new Date(deadline);

    // Extract the year, month, and day directly to avoid time zone issues
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate);
    try {
      const assignmentData = {
        classId: [selectedClass],
        sectionId: [selectedSection.toString()],
        subjectId: subject,
        teacherId: 1,
        AssignTitle: title,
        AssignDescription: description,
        AssignDeadLine: formattedDate,
      };

      const data = await AssigmentAddData(assignmentData);
      console.log('data ', data);

      if (data?.message === 'Assignment created successfully') {
        Toast.show({
          type: 'success',
          text1: 'Assignment Added',
          text2: 'Assignment created successfully',
        });
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add assignment',
      });
    } finally {
      setLoading(false);
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };
  const handleMenuPress = React.useCallback(() => {
    console.log('Menu icon pressed');
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assest/icons/SideBarBg.jpg')}>
      <TopBar
        title="Assignment"
        // onMenuPress={handleMenuPress}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Assignment Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Title"
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Assignment Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter Description"
            placeholderTextColor="#666"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Deadline</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePicker}>
            <Text style={styles.dateText}>{deadline.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={deadline}
                mode="date"
                display="default"
                onChange={onDateChange}
                textColor="black"
              />
            </View>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Assignment File</Text>
          <TouchableOpacity onPress={selectFile} style={styles.fileButton}>
            <Text style={styles.fileButtonText}>Select File</Text>
          </TouchableOpacity>
          <View style={styles.fileNameContainer}>
            {file ? (
              <Text style={styles.fileName}>{file?.[0]?.name}</Text>
            ) : (
              <Text style={styles.fileName}>No File</Text>
            )}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Year</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedClass}
              onValueChange={itemValue => {
                setSelectedClass(itemValue);
                const sections = Object.values(data.sections).flat();
                const filtered = sections.filter(
                  section => section.classId === parseInt(itemValue),
                );
                setFilteredSections(filtered);
                setSelectedSection('');
              }}
              style={styles.picker}>
              <Picker.Item label="Select Year" value="" />
              {data &&
                Object.entries(data.classes).map(([key, value]) => (
                  <Picker.Item key={key} label={value} value={key} />
                ))}
            </Picker>
          </View>
        </View>
        {selectedClass && filteredSections.length > 0 && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Class</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSection}
                onValueChange={itemValue => setSelectedSection(itemValue)}
                style={styles.picker}>
                {filteredSections.map(section => (
                  <Picker.Item
                    key={section.id}
                    label={section.sectionName}
                    value={section.classId}
                  />
                ))}
              </Picker>
            </View>
          </View>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Subjects</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={subject}
              onValueChange={itemValue => setSubject(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Select Subject" value="" />
              {subjectData?.map((sub: any, index: number) => (
                <Picker.Item
                  label={sub.subjectTitle}
                  value={sub.id}
                  key={index}
                />
              ))}
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.addButton, loading && styles.disabledButton]}
          onPress={addAssignment}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.addButtonText}>Add Assignment</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePicker: {
    width: '100%',
    height: 48,
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
  },
  dateText: {
    color: '#000000',
    fontSize: 16,
  },
  datePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 8,
  },
  fileButton: {
    backgroundColor: '#f80d0d',
    padding: 12,
    width: '40%',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fileButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileNameContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
  },
  fileName: {
    color: '#ffffff',
    fontSize: 14,
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 48,
    color: '#000000',
  },
  addButton: {
    backgroundColor: '#2d7ca3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.7,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddAssignmentScreen;