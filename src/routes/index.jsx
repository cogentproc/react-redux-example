import Application from 'layouts/CApplication.jsx';
import AppDetail from 'views/ApplicationDetailViews/ApplicationDetail.jsx';
// { path: '/', name: 'Home', component: Application },
//import Public from 'layouts/Public.jsx';
import Public from 'layouts/CPublic.jsx';

const indexRoutes = [
  { path: '/detail', name: 'Detail', component: AppDetail },
  { path: '/public', name: 'Public', component: Public },
  { path: '/', name: 'Home', component: Application },
];
export default indexRoutes;
