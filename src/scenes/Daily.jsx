import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import DatePicker from 'react-datepicker';
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

import 'react-datepicker/dist/react-datepicker.css';
import { useMemo, useState } from 'react';

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date('2024-01-31'));
  const [endDate, setEndDate] = useState(new Date('2024-02-28'));
  const data = getSales();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return;

    const { dailyData } = data;

    const formattedData = [];

    dailyData.forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf('-') + 1);

        formattedData.push({
          date: splitDate,
          totalSales,
          totalUnits,
        });
      }
    });
    return [formattedData];
  }, [data, startDate, endDate]);

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='DAILY SALES' subtitle='Chart of daily sales' />
      <Box height='75vh'>
        <Box display='flex' justifyContent='flex-end'>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </Box>

        {formattedData && (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={formattedData}
              margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
            >
              <XAxis
                dataKey='date'
                angle={-90}
                textAnchor='middle'
                interval='preserveStartEnd'
                tick={{ fill: theme.palette.secondary[200] }}
                label={{
                  value: 'Date',
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
                type='monotone'
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
                type='monotone'
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

export default Daily;
