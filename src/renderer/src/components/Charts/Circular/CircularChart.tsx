import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const colors = ['#15E8FF', '#747176', '#F9436F', '#F484D5', '#F9436F', '#FFFFFF'];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={10} textAnchor="middle" fill="white" className="text-xl">
        {payload.total}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={40}
      />
    </g>
  );
};

export const CircularChart = ({ data }: Props): JSX.Element => {
  const total = data.reduce((acc, { value }) => acc + value, 0);
  data[0].total = total;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={60} height={60}>
        <Pie
          activeIndex={0}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={37}
          outerRadius={50}
          dataKey="value"
          cornerRadius={40}
          paddingAngle={-10}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              style={{
                filter: `drop-shadow(0px 0px 5px #000)`,
                outline: 'none',
              }}
              stroke="0"
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export interface CirularChartData {
  name: string;
  value: number;
  total?: number;
}

export interface Props {
  data: CirularChartData[];
}
