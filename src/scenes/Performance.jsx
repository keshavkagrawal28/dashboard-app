import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';
import Header from 'components/Header';
import { getUserPerformance } from 'data/fetchData';
import DataGridBox from 'components/DataGridBox';

const Performance = () => {
  const userId = useSelector((state) => state.global.userId);
  const data = getUserPerformance(userId);

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='PERFORMANCE'
        subtitle='Track your affiliate sales performance here'
      />
      <DataGridBox>
        <DataGrid
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
          slots={{
            columnMenu: CustomColumnMenu,
          }}
        />
      </DataGridBox>
    </Box>
  );
};

export default Performance;
