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
/*
import ApplicationsList from 'views/ApplicationsList.jsx';
import ApplicationDetail from 'views/ApplicationDetail.jsx';
import ApplicationStatus from 'views/ApplicationStatus.jsx';
*/
import AppMessage from 'views/ApplicationDetailViews/ApplicationDetail/AppMessage.jsx';
import AppTrack from 'views/ApplicationDetailViews/ApplicationDetail/AppTrack.jsx';
import AppRole from 'views/ApplicationDetailViews/ApplicationDetail/AppRole.jsx';
import ActiveTask from 'views/ApplicationDetailViews/ApplicationDetail/ActiveTask.jsx';
import AppHelp from 'views/ApplicationDetailViews/ApplicationDetail/AppHelp.jsx';
import Action from 'views/ApplicationDetailViews/ApplicationDetail/Action.jsx';
import Form from 'views/ApplicationDetailViews/ApplicationDetail/Form.jsx';
// import Typography from "views/Typography/Typography.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import NotificationsPage from "views/Notifications/Notifications.jsx";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";

const appDetailRoutes = [
  {
    path: '/detail/message/:application_id/:role_id',
    component: AppMessage,
  },
  {
    path: '/detail/track/:application_id/:role_id',
    component: AppTrack,
  },
  {
    path: '/detail/role/:application_id/:role_id',
    component: AppRole,
  },
  {
    path: '/detail/active-task/:application_id/:role_id',
    component: ActiveTask,
  },
  {
    path: '/detail/help/:application_id/:role_id',
    component: AppHelp,
  },
  {
    path: '/detail/action/:application_id/:role_id',
    component: Action,
  },
  {
    path: '/detail/form/:application_id/:role_id/:form_id',
    component: Form,
  }
  /*
  {
    redirect: true, path: '/detail', to: '/detail/:application_id/:role_id'
  },
  */
];

export default appDetailRoutes;
