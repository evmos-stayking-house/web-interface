import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

const Typography = Loadable(
  lazy(() => import('pages/components-overview/Typography')),
);
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(
  lazy(() => import('pages/components-overview/AntIcons')),
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />,
    },
    {
      path: 'staking',
      element: <SamplePage />,
    },
  ],
};

export default MainRoutes;
