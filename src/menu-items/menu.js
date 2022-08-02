import { DashboardOutlined } from '@ant-design/icons';

const icons = {
  DashboardOutlined,
};

const menu = {
  id: 'group-menu',
  title: '',
  type: 'group',
  children: [
    {
      id: 'menu',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'stake',
      title: 'Stake',
      type: 'item',
      url: '/staking',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
  ],
};

export default menu;
