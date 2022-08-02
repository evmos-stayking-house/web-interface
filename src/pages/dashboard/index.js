import { useState } from 'react';

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import {
  GiftOutlined,
  MessageOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem',
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none',
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'month',
    label: 'This Month',
  },
  {
    value: 'year',
    label: 'This Year',
  },
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Balance Info</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total"
          count="191.3 Evmos"
          percentage={10.3}
          extra=""
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Reward"
          count="0.003 Evmos"
          percentage={''}
          extra="8,900"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Available Balance"
          count="0.002 Evmos"
          percentage={''}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>

      <Grid
        item
        md={8}
        sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }}
      />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Unique Visitor</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      {/*<Grid item xs={12} md={7} lg={8}>*/}
      {/*  <Grid container alignItems="center" justifyContent="space-between">*/}
      {/*    <Grid item>*/}
      {/*      <Typography variant="h5">Recent Orders</Typography>*/}
      {/*    </Grid>*/}
      {/*    <Grid item />*/}
      {/*  </Grid>*/}
      {/*  <MainCard sx={{ mt: 2 }} content={false}>*/}
      {/*    <OrdersTable />*/}
      {/*  </MainCard>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12} md={5} lg={4}>*/}
      {/*  <Grid container alignItems="center" justifyContent="space-between">*/}
      {/*    <Grid item>*/}
      {/*      <Typography variant="h5">Analytics Report</Typography>*/}
      {/*    </Grid>*/}
      {/*    <Grid item />*/}
      {/*  </Grid>*/}
      {/*  <MainCard sx={{ mt: 2 }} content={false}>*/}
      {/*    <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>*/}
      {/*      <ListItemButton divider>*/}
      {/*        <ListItemText primary="Company Finance Growth" />*/}
      {/*        <Typography variant="h5">+45.14%</Typography>*/}
      {/*      </ListItemButton>*/}
      {/*      <ListItemButton divider>*/}
      {/*        <ListItemText primary="Company Expenses Ratio" />*/}
      {/*        <Typography variant="h5">0.58%</Typography>*/}
      {/*      </ListItemButton>*/}
      {/*      <ListItemButton>*/}
      {/*        <ListItemText primary="Business Risk Cases" />*/}
      {/*        <Typography variant="h5">Low</Typography>*/}
      {/*      </ListItemButton>*/}
      {/*    </List>*/}
      {/*    <ReportAreaChart />*/}
      {/*  </MainCard>*/}
      {/*</Grid>*/}
    </Grid>
  );
};

export default DashboardDefault;
