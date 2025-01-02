// src/route/DrawerRoutes.tsx

import {RouteProp, useNavigation} from '@react-navigation/native';

import ClassScreen from '../screens/class/ClassScreen';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import ExamList from '../screens/Exam_List/ExamList';
import LoginScreen from '../screens/Login';
import {MainStackParamList} from '../types';
import MediaCenterScreen from '../screens/MediaCenterScreen';
import OnlineExam from '../screens/online_exam/OnlineExam';
import PdfShowComponent2 from '../components/pdf_show_component/PdfShowComponent2';
import React from 'react';
import RouteAssigmentScreen from './routeScreen/RouteAssignmnetScreen';
import RouteAttendenceScreen from './routeScreen/RouteAttendenceScreen';
import RouteBooksLibraryScreen from './routeScreen/RouteBooksLibraryScreen';
import RouteCalender from './routeScreen/RouteCalender';
import RouteClassSchdule from './routeScreen/RouteClassSchdule';
import RouteClassScreen from './routeScreen/RoutClassScreen';
import RouteCreditNotesScreen from './routeScreen/RouteCreditNotesScreen';
import RouteDashBoardScreen from './routeScreen/RouteDashBoardScreen';
import RouteDueInvoiceScreen from './routeScreen/RouteDueInvoiceScreen';
import RouteEventsScreen from './routeScreen/RouteEventsScreen';
import RouteExternalUrlScreen from './routeScreen/RouteExternalUrlScreen';
import RouteGradeLevelScreen from './routeScreen/RouteGradeLevelScreen';
import RouteHomeworkScreen from './routeScreen/RouteHomeworkScreen';
import RouteHostelScreen from './routeScreen/RouteHostelScreen';
import RouteInvoiceScreen from './routeScreen/RouteInvoiceScreen';
import RouteMediaCenter from './routeScreen/RouteMediaCenter';
import RouteMessage from './routeScreen/RouteMessage';
import RouteNewsBoardScreen from './routeScreen/RouteNewsBoardScreen';
import RouteParentsScreen from './routeScreen/RouteParentsScreen';
import RouteResourceAndGuideScreen from './routeScreen/RouteResourceAndGuideScreen';
import RouteStudentScreen from './routeScreen/RouteStudentScreen';
import RouteSubjectsScreen from './routeScreen/RouteSubjectsScreen';
import RouteTeachersScreen from './routeScreen/RouteTeachersScreen';
import RouteTransportScreen from './routeScreen/RouteTransportScreen';
import RouteYearScreen from './routeScreen/RouteYearScreen';
import SideBarAdmin from '../components/side_bar/SideBarAdmin';
import SideBarEmployee from '../components/side_bar/SideBarEmployee';
import SideBarParent from '../components/side_bar/SideBarParent';
import SideBarStudent from '../components/side_bar/SideBarStudent';
import SideBarTeacher from '../components/side_bar/SideBarTeacher';
import SplashScreen from '../screens/SplashScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator<MainStackParamList>();

type DrawerRoutesProps = {
  route: RouteProp<MainStackParamList, 'DrawerRoutes'>;
  navigation: DrawerNavigationProp<MainStackParamList, 'DrawerRoutes'>;
};

const DrawerRoutes: React.FC<DrawerRoutesProps> = ({route}) => {
  const moduleType = route?.params?.moduleType || 'default';
  const userData = route?.params?.userData || {};

  return (
    <Drawer.Navigator
      initialRouteName="RouteDashBoardScreen"
      drawerContent={props => {
        switch (moduleType) {
          case 'student':
            return <SideBarStudent {...props} userData={userData} />;
          case 'parent':
            return <SideBarParent {...props} userData={userData} />;
          case 'teacher':
            return <SideBarTeacher {...props} userData={userData} />;
          case 'admin':
            return <SideBarAdmin {...props} userData={userData} />;
          case 'employee':
            return <SideBarEmployee {...props} userData={userData} />;
          default:
            return null;
        }
      }}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'white',
        },
      }}>
      {/* Order starts here */}

      {/* Dashboard */}
      <Drawer.Screen name="RouteDashBoardScreen" component={RouteDashBoardScreen} />

      {/* Static Pages */}
      <Drawer.Screen name="RouteExternalUrlScreen" component={RouteExternalUrlScreen} />

      {/* Messages */}
      <Drawer.Screen name="RouteMessage" component={RouteMessage} />

      {/* Calendar */}
      <Drawer.Screen name="RouteCalender" component={RouteCalender} />

      {/* Homework */}
      <Drawer.Screen name="RouteHomeworkScreen" component={RouteHomeworkScreen} />

      {/* Attendance */}
      <Drawer.Screen name="RouteAttendenceScreen" component={RouteAttendenceScreen} />

      {/* Staff Attendance */}
      {/* Missing: Implement staff attendance screen */}

      {/* Books Library */}
      <Drawer.Screen name="RouteBooksLibraryScreen" component={RouteBooksLibraryScreen} />

      {/* Teacher */}
      <Drawer.Screen name="RouteTeachersScreen" component={RouteTeachersScreen} />

      {/* Student */}
      <Drawer.Screen name="RouteStudentScreen" component={RouteStudentScreen} />

      {/* Parents */}
      <Drawer.Screen name="RouteParentsScreen" component={RouteParentsScreen} />

      {/* Grade Levels */}
      <Drawer.Screen name="RouteGradeLevelScreen" component={RouteGradeLevelScreen} />

      {/* Assignments */}
      <Drawer.Screen name="RouteAssigmentScreen" component={RouteAssigmentScreen} />

      {/* Exam List */}
      <Drawer.Screen name="ExamList" component={ExamList} />

      {/* Online Exams */}
      <Drawer.Screen name="OnlineExam" component={OnlineExam} />

      {/* News Board */}
      <Drawer.Screen name="RouteNewsBoardScreen" component={RouteNewsBoardScreen} />

      {/* Events */}
      <Drawer.Screen name="RouteEventsScreen" component={RouteEventsScreen} />

      {/* Invoices */}
      <Drawer.Screen name="RouteInvoiceScreen" component={RouteInvoiceScreen} />

      {/* Due Invoices */}
      <Drawer.Screen name="RouteDueInvoiceScreen" component={RouteDueInvoiceScreen} />

      {/* Centres */}
      {/* Missing: Implement centres screen */}

      {/* Roots Centres */}
      {/* Missing: Implement roots centres screen */}

      {/* Transport */}
      <Drawer.Screen name="RouteTransportScreen" component={RouteTransportScreen} />

      {/* Hostel */}
      <Drawer.Screen name="RouteHostelScreen" component={RouteHostelScreen} />

      {/* Media Center */}
      <Drawer.Screen name="RouteMediaCenter" component={RouteMediaCenter} />

      {/* Subjects */}
      <Drawer.Screen name="RouteSubjectsScreen" component={RouteSubjectsScreen} />

      {/* Centre Schedule */}
      <Drawer.Screen name="RouteClassSchdule" component={RouteClassSchdule} />

      {/* Study Material */}
      <Drawer.Screen name="RouteResourceAndGuideScreen" component={RouteResourceAndGuideScreen} />

      {/* Logout */}
      <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;