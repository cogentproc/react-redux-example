// @material-ui/icons
// import Dashboard from "@material-ui/icons/Dashboard";
// import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
// import DashboardPage from "views/Dashboard/Dashboard.jsx";
// import UserProfile from "views/UserProfile/UserProfile.jsx";
// import TableList from "views/TableList/TableList.jsx";
// import Typography from "views/Typography/Typography.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import NotificationsPage from "views/Notifications/Notifications.jsx";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";

import CLogin from 'views/CLogin.jsx';
/*
import Login from 'views/Login.jsx';
import Network from 'views/Network.jsx';
import SetPassword from 'views/SetPassword.jsx';
import Register from 'views/Register.jsx';
import ForgotPassword from 'views/ForgotPassword.jsx';
import ChooseWorkflow from 'views/ChooseWorkflow.jsx';
import ChangeWorkflow from 'views/ChangeWorkflow.jsx';
*/

const publicRoutes = [
  /*
  {
    path: '/public/network',
    sidebarName: 'Table List',
    navbarName: 'Table List',
    icon: 'content_paste',
    component: Network,
  },
  {
    path: '/public/login/:workflow_id',
    sidebarName: 'Table List',
    navbarName: 'Table List',
    icon: 'content_paste',
    component: Login,
  },
  */
  {
    path: '/public/login',
    //sidebarName: 'Table List',
    //navbarName: 'Table List',
    //icon: 'content_paste',
    component: CLogin,
  },
  /*
  {
    path: '/public/register',
    sidebarName: 'Table List',
    navbarName: 'Table List',
    icon: 'content_paste',
    component: Register,
  },
  {
    path: '/public/forgot-password',
    sidebarName: 'Table List',
    navbarName: 'Table List',
    icon: 'content_paste',
    component: ForgotPassword,
  },
  {
    path: '/public/setpassword/:token/:email',
    sidebarName: 'Table List',
    navbarName: 'Table List',
    icon: 'content_paste',
    component: SetPassword,
  },
  {
    path: '/public/choose-workflow',
    sidebarName: 'Table List',
    navbarName: 'Table List',
    icon: 'content_paste',
    component: ChooseWorkflow,
  },
  {
    path: '/public/change-workflow',
    sidebarName: 'Table List',
    navbarName: 'Table List',
    icon: 'content_paste',
    component: ChangeWorkflow,
  },
  */
  {
    redirect: true, path: '/', to: '/public/login'
  },
];

export default publicRoutes;
