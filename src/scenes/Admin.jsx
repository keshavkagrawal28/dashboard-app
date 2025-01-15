import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DataGridBox from 'components/DataGridBox';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';
import Header from 'components/Header';
import { getAdmins } from 'data/fetchData';

const Admin = () => {
  const data = getAdmins();

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
      <Header
        title='ADMINS'
        subtitle='Managing admins and List of administrators'
      />
      <DataGridBox>
        <DataGrid
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          slots={{
            columnMenu: CustomColumnMenu,
          }}
        />
      </DataGridBox>
    </Box>
  );
};

export default Admin;
