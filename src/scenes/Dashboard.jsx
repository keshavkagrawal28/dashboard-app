import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DataGridBox from 'components/DataGridBox';
import StatBox from 'components/StatBox';
import BreakdownChart from 'components/BreakdownChart';
import OverviewChart from 'components/OverviewChart';
import { getDashboardStats } from 'data/fetchData';

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  const data = getDashboardStats();

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
      filterable: false,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
      filterable: false,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 1,
      renderCell: (params) => params.value.length,
      filterable: false,
    },
    {
      field: 'cost',
      headerName: 'COST',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      filterable: false,
    },
  ];

  return (
    <Box m='1.5rem 2.5rem'>
      <FlexBetween>
        <Header title='DASHBOARD' subtitle='Welcome to your Dashboard' />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlined sx={{ mr: '10pxs' }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt='20px'
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='160px'
        gap='20px'
        sx={{
          '& > div': {
            gridColumn: isNonMediumScreens ? undefined : 'span 12',
          },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title='Total Customers'
          value={data && data.totalCustomers}
          increase='+14%' // Hardcoded for now
          description='Since last month'
          icon={
            <Email
              fontSize='26px'
              sx={{ color: theme.palette.secondary[300] }}
            />
          }
        />
        <StatBox
          title='Sales today'
          value={data && data.todayStats && data.todayStats.totalSales}
          increase='+21%' // Hardcoded for now
          description='Sales made today'
          icon={
            <PointOfSale
              fontSize='26px'
              sx={{ color: theme.palette.secondary[300] }}
            />
          }
        />
        <Box
          gridColumn='span 8'
          gridRow='span 2'
          backgroundColor={theme.palette.background.alt}
          p='1rem'
          borderRadius='0.55rem'
        >
          <OverviewChart view='Sales' isDashboard={true} />
        </Box>
        <StatBox
          title='Monthy Sales'
          value={data && data.thisMonthStats && data.thisMonthStats.totalSales}
          increase='+5%' // Hardcoded for now
          description='Since last month'
          icon={
            <PersonAdd
              fontSize='26px'
              sx={{ color: theme.palette.secondary[300] }}
            />
          }
        />
        <StatBox
          title='Yearly Sales'
          value={data && data.yearlySalesTotal}
          increase='+43%' // Hardcoded for now
          description='Sales made in this year'
          icon={
            <Traffic
              fontSize='26px'
              sx={{ color: theme.palette.secondary[300] }}
            />
          }
        />
        {/* ROW 2 */}
        <Box gridColumn='span 8' gridRow='span 3'>
          <DataGridBox isDashboard={true}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={(data && data.transactions && data.transactions) || []}
              columns={columns}
            />
          </DataGridBox>
        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 3'
          backgroundColor={theme.palette.background.alt}
          p='1.5rem'
          borderRadius='0.55rem'
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
            Sales by Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p='0 0.6rem'
            fontSize='0.8rem'
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year in total sales
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
