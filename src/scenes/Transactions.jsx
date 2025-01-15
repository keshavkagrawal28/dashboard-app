import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
import Header from 'components/Header';
import { getTransactions } from 'data/fetchData';
import DataGridBox from 'components/DataGridBox';

const Transactions = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState({ transactions: [], total: 0 });

  useEffect(() => {
    const result = getTransactions(
      paginationModel.page,
      paginationModel.pageSize,
      sort,
      search
    );
    setData(result);
  }, [paginationModel, sort, search]);

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
      <Header title='TRANSACTIONS' subtitle='List of transactions' />
      <DataGridBox>
        <DataGrid
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          paginationModel={paginationModel}
          pageSizeOptions={[10, 20, 50, 100]}
          paginationMode='server'
          sortingMode='server'
          onPaginationModelChange={(newPaginationModel) =>
            setPaginationModel(newPaginationModel)
          }
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </DataGridBox>
    </Box>
  );
};

export default Transactions;
