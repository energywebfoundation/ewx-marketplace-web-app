import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export const CircularChartSingular = ({ value }: Props): JSX.Element => {
  const data = [{ name: 'value', value }];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        width={60}
        height={60}
        cx="50%"
        cy="50%"
        innerRadius={20}
        outerRadius={40}
        barSize={8}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <defs>
          <linearGradient id="colorGradient" x1="1" y1="1" x2="0" y2="0">
            <stop stopColor="#15E8FF" />
            <stop offset="1" stopColor="#A166FF" />
          </linearGradient>
          <filter id="inset-shadow">
            <feOffset dx="1.5" dy="0" />
            <feGaussianBlur stdDeviation="4" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="1" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComponentTransfer in="shadow" result="shadow">
              <feFuncA type="linear" slope=".75" />
            </feComponentTransfer>
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>

        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar
          background={{ fill: 'rgba(77, 74, 81, 1)', filter: 'url(#inset-shadow)' }}
          dataKey="value"
          cornerRadius={40}
          fill="url(#colorGradient)"
          style={{ filter: `drop-shadow(0px 0px 5px #000)` }}
        />
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          className="text-font-primary text-base"
        >
          {value}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

interface Props {
  value: number;
}
