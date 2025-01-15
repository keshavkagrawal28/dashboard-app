import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getSales } from 'data/fetchData';
import { useMemo } from 'react';

const Monthly = () => {
  const data = getSales();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return;

    const { monthlyData } = data;

    const formattedData = [];

    monthlyData.forEach(({ month, totalSales, totalUnits }) => {
      formattedData.push({
        month,
        totalSales,
        totalUnits,
      });
    });
    return [formattedData];
  }, [data]);

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='DAILY SALES' subtitle='Chart of daily sales' />
      <Box height='75vh'>
        {formattedData && (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={formattedData}
              margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
            >
              <XAxis
                dataKey='month'
                textAnchor='middle'
                interval='preserveStartEnd'
                tick={{ fill: theme.palette.secondary[200] }}
                label={{
                  value: 'Month',
                  position: 'insideBottom',
                  offset: -10,
                  fill: theme.palette.secondary[200],
                }}
              />
              <YAxis
                tick={{ fill: theme.palette.secondary[200] }}
                label={{
                  value: 'Total',
                  position: 'left',
                  angle: -90,
                  fill: theme.palette.secondary[200],
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary[200],
                }}
                cursor={false}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                iconType='circle'
                iconSize={12}
                layout='vertical'
                align='right'
                verticalAlign='top'
                fill={theme.palette.secondary[200]}
              />
              <Line
                type='linear'
                dataKey='totalSales'
                stroke={theme.palette.secondary.main}
                activeDot={{ r: 8 }}
                dot={{
                  fill: theme.palette.secondary.main,
                  stroke: theme.palette.background.default,
                  strokeWidth: 2,
                }}
              />
              <Line
                type='linear'
                dataKey='totalUnits'
                stroke={theme.palette.secondary[600]}
                activeDot={{ r: 8 }}
                dot={{
                  fill: theme.palette.secondary[600],
                  stroke: theme.palette.background.default,
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
};

export default Monthly;
