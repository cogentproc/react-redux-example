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
import ApplicationsList from 'views/ApplicationsList.jsx';
//import ApplicationDetail from 'views/ApplicationDetail.jsx';
import ApplicationStatus from 'views/ApplicationStatus.jsx';
// import Typography from "views/Typography/Typography.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import NotificationsPage from "views/Notifications/Notifications.jsx";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";

const applicationRoutes = [
  {
    path: '/list',
    component: ApplicationsList,
  },
  /*
  {
    path: '/detail/:application_id/:role_id',
    component: ApplicationDetail,
  },
  */
  {
    path: '/status/:application_id/:role_id',
    component: ApplicationStatus,
  },
  {
    redirect: true, path: '/', to: '/list'
  },
];

export default applicationRoutes;
