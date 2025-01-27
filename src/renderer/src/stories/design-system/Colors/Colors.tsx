// @ts-ignore
import tailwindConfig from 'tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';

export const Colors = (): JSX.Element => {
  const fullConfig = resolveConfig(tailwindConfig);
  const colors = fullConfig.theme.colors;

  const colorsBrand: Color[] = [
    {
      name: 'Light',
      color: colors['brand-light'],
    },
    {
      name: 'Default',
      color: colors.brand,
    },
    {
      name: 'Dark',
      color: colors['brand-dark'],
    },
  ];

  const colorsPalette: Color[] = [
    {
      name: 'Violet light',
      color: colors.violet.light,
    },
    {
      name: 'Violet dark',
      color: colors.violet.dark,
    },
    {
      name: 'Violet darker',
      color: colors.violet.darker,
    },
    {
      name: 'Teal',
      color: colors.teal,
    },
    {
      name: 'Blue',
      color: colors.blue,
    },
    {
      name: 'Pink',
      color: colors.pink,
    },
    {
      name: 'Green',
      color: colors.green,
    },
    {
      name: 'Red',
      color: colors.red,
    },
  ];

  const GrayDark: Color[] = [
    {
      name: 'Gray 5',
      color: colors.gray[5],
    },
    {
      name: 'Gray 10',
      color: colors.gray[10],
    },
    {
      name: 'Gray 20',
      color: colors.gray[20],
    },
    {
      name: 'Gray 30',
      color: colors.gray[30],
    },
    {
      name: 'Gray 40',
      color: colors.gray[40],
    },
    {
      name: 'Gray 50',
      color: colors.gray[50],
    },
    {
      name: 'Gray 60',
      color: colors.gray[60],
    },
    {
      name: 'Gray 70',
      color: colors.gray[70],
    },
    {
      name: 'Gray 80',
      color: colors.gray[80],
    },
    {
      name: 'Gray 90',
      color: colors.gray[90],
    },
    {
      name: 'Gray 95',
      color: colors.gray[95],
    },
    {
      name: 'Gray 100',
      color: colors.gray[100],
    },
  ];

  const colorsText: Color[] = [
    {
      name: 'Default',
      color: colors.font.DEFAULT,
    },
    {
      name: 'Subtle',
      color: colors.font.subtle,
    },
    {
      name: 'Subtler',
      color: colors.font.subtler,
    },
    {
      name: 'Subtlest',
      color: colors.font.subtlest,
    },
  ];

  const palettes = [
    {
      name: 'Brand',
      palette: colorsBrand,
    },
    {
      name: 'Palette',
      palette: colorsPalette,
    },
    {
      name: 'Gray - Dark',
      palette: GrayDark,
    },
    {
      name: 'Text - Dark',
      palette: colorsText,
    },
  ];

  return (
    <section>
      {palettes.map(({ name, palette }) => (
        <>
          <h2 className="mb-2">{name}</h2>
          <div className="mb-12 grid w-fit grid-cols-3 gap-6">
            {palette.map(({ name, color }, index) => (
              <ColorBox key={index} name={name} color={color} />
            ))}
          </div>
        </>
      ))}
    </section>
  );
};

const ColorBox = ({ name, color }: Color): JSX.Element => {
  return (
    <div className="w-fit rounded">
      <div
        style={{ backgroundColor: color }}
        className="glex-grow h-[110px] w-[160px] rounded-t-lg bg-[theme(colors.blue)]"
      ></div>
      <div className="rounded-b-lg bg-white p-2 text-black">
        <p className="font-primary-bold uppercase">{color}</p>
        <p className="text-sm">{name}</p>
      </div>
    </div>
  );
};

interface Color {
  name: string;
  color: string;
}
