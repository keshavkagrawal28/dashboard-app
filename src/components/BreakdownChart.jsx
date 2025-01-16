import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import { getSales } from 'data/fetchData';

const BreakdownChart = ({ isDashboard = false }) => {
  const data = getSales();
  const theme = useTheme();

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      name: category,
      value: sales,
      fill: colors[i],
    })
  );

  return (
    // TODO fix issues
    <Box
      height={isDashboard ? '400px' : '100%'}
      width={undefined}
      minHeight={isDashboard ? '325px' : undefined}
      minWidth={isDashboard ? '325px' : undefined}
      position='relative'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey='value'
            nameKey='name'
            innerRadius='45%'
            fill='#88848d'
            paddingAngle={5}
            startAngle={90}
            endAngle={450}
            labelLine={false}
            isAnimationActive={true}
            strokeWidth={1}
            stroke={theme.palette.background.paper}
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
          />
          <Legend
            layout='horizontal'
            align='center'
            verticalAlign='bottom'
            iconSize={18}
            iconType='circle'
            wrapperStyle={{
              paddingTop: isDashboard ? '20px' : '56px',
              paddingBottom: isDashboard ? '20px' : '0',
            }}
            formatter={(value) => (
              <span style={{ color: '#999' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      <Box
        position='absolute'
        top='50%'
        left='50%'
        color={theme.palette.secondary[400]}
        textAlign='center'
        pointerEvents='none'
        sx={{
          transform: isDashboard
            ? 'translate(-75%, -170%)'
            : 'translate(-50%, -100%)',
        }}
      >
        <Typography variant='h6'>
          {!isDashboard && 'Total:'} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
