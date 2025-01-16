import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { getSales } from 'data/fetchData';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const data = getSales();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return;

    const { monthlyData } = data;

    const totalSalesLine = [];
    const totalUnitsLine = [];
    let currSales = 0;
    let currUnits = 0;

    monthlyData.forEach(({ month, totalSales, totalUnits }) => {
      currSales += totalSales;
      currUnits += totalUnits;

      totalSalesLine.push({ month, totalSales: currSales });
      totalUnitsLine.push({ month, totalUnits: currUnits });
    });

    return [totalSalesLine, totalUnitsLine];
  }, [data]);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <ComposedChart
        data={view === 'sales' ? totalSalesLine : totalUnitsLine}
        margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
      >
        <XAxis
          dataKey='month'
          tick={{ fill: theme.palette.secondary[200] }}
          tickFormatter={(value) => (isDashboard ? value.slice(0, 3) : value)}
          label={{
            value: 'Month',
            position: 'bottom',
            fill: theme.palette.secondary[200],
          }}
        />
        <YAxis
          tick={{ fill: theme.palette.secondary[200] }}
          tickCount={isDashboard ? 5 : 15}
          label={{
            value: view === 'sales' ? 'Total Revenue' : 'Total Units',
            angle: -90,
            position: 'left',
            fill: theme.palette.secondary[200],
          }}
        />
        {!isDashboard && (
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary[200],
            }}
            cursor={false}
          />
        )}
        {!isDashboard && (
          <Legend
            iconSize={12}
            iconType='circle'
            wrapperStyle={{ color: theme.palette.secondary[200] }}
            verticalAlign='bottom'
            align='right'
          />
        )}
        <Line
          type='monotone'
          dataKey={view === 'sales' ? 'totalSales' : 'totalUnits'}
          stroke={theme.palette.secondary.main}
          fill={theme.palette.secondary[600]}
          dot={{
            r: 6,
            stroke: theme.palette.background.default,
            strokeWidth: 2,
          }}
          activeDot={{ r: 8 }}
          strokeWidth={2}
          connectNulls
        />
        {isDashboard && (
          <Area
            type='monotone'
            dataKey={view === 'sales' ? 'totalSales' : 'totalUnits'}
            fillOpacity={0.2}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default OverviewChart;
