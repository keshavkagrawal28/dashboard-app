import { Box } from '@mui/material';
import { useTheme } from '@mui/material';

const DataGridBox = ({ children, isDashboard }) => {
  const theme = useTheme();
  return (
    <Box
      mt={isDashboard ? '0' : '40px'}
      height={isDashboard ? '100%' : '80vh'}
      sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
          borderRadius: isDashboard ? '0.5rem' : '0',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: isDashboard
            ? theme.palette.background.alt
            : theme.palette.primary.light,
        },
        '& .MuiDataGrid-footerContainer': {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: 'none',
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `${theme.palette.secondary[200]} !important`,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default DataGridBox;
