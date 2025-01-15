import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DataGridBox from 'components/DataGridBox';
import Header from 'components/Header';
import { getCustomers } from 'data/fetchData';

const Customers = () => {
  const data = getCustomers();

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'NAME',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'EMAIL',
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
      },
    },
    {
      field: 'country',
      headerName: 'COUNTRY',
      flex: 0.4,
    },
    {
      field: 'occupation',
      headerName: 'OCCUPATION',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
    },
  ];

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='CUSTOMERS' subtitle='List of customers' />
      <DataGridBox>
        <DataGrid
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </DataGridBox>
    </Box>
  );
};

export default Customers;
