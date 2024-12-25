import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Adjust the import path as needed

const StateSelectedScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleImagePress = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName as any);
  };

  return (
    <View style={styles.container}>
      {/* first row start */}
      <View style={styles.imageRow}>
        <TouchableOpacity
          // onPress={() => handleImagePress('HomeScreen')}
          style={styles.imageContainer}>
          {/* <View style={styles.redCircle}>
            <Text style={styles.redCircleText}>0</Text>
          </View> */}
          <TouchableOpacity
            style={styles.imageOverlay}
            onPress={() => navigation.navigate('RouteAttendenceScreen' as any)}>
            <Image
              source={require('../assest/icons/dash_stat_student.png')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Attendance</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleImagePress('RouteClassSchdule' as any)}
          style={styles.imageContainer}>
          <View style={styles.imageOverlay}>
            <Image
              source={require('../assest/icons/dash_stat_teacher.jpg')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Schedule</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleImagePress('RouteEventsScreen' as any)}
          style={styles.imageContainer}>
          <View style={styles.imageOverlay}>
            <Image
              source={require('../assest/icons/dash_stat_classes.jpg')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Events</Text>
          </View>
        </TouchableOpacity>
      </View>
        {/* first row end  */}
        {/* second row start  */}
      <View style={styles.imageRow}>
        <TouchableOpacity
          style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imageOverlay}
            onPress={() => navigation.navigate('RouteMediaCenter' as any)}>
            <Image
              source={require('../assest/icons/dash_stat_student.png')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Media Center</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleImagePress('ExamList' as any)}
          style={styles.imageContainer}>
          <View style={styles.imageOverlay}>
            <Image
              source={require('../assest/icons/dash_stat_teacher.jpg')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Exam List</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleImagePress('RouteClassScreen' as any)} //Need confirmation for navigation screen
          style={styles.imageContainer}>
          <View style={styles.imageOverlay}>
            <Image
              source={require('../assest/icons/dash_stat_classes.jpg')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Centres</Text>
          </View>
        </TouchableOpacity>
      </View>
       {/* second row end  */}
       {/* third row start  */}
      <View style={styles.imageRow}>
        <TouchableOpacity
          style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imageOverlay}
            onPress={() => navigation.navigate('RouteTeachersScreen' as any)}>
            <Image
              source={require('../assest/icons/dash_stat_student.png')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Teachers</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      {/* third row end  */}
      <View style={{borderWidth: 1, borderColor: 'gray', marginTop: 10}} />
    </View>
  );
};

export default StateSelectedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 16,
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative', // Needed for positioning the red circle and overlay
  },
  redCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: -5,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redCircleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    position: 'absolute',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
