import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));


function Card(item) {
  const { classes } = useStyles();

  return (
    <a href={"https://" + item.url} target='_blank' style={{ textDecoration: "none"}}>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${item.image})` }}
        className={classes.card}
      >
        <div style={{ backgroundColor: '#131315b4' }}>
          <Text className={classes.category} size="xs">
            <h6>AD</h6>{item.category}
          </Text>
          <Title order={3} className={classes.title}>
            {item.title}
          </Title>
        </div>
        <Button variant="white" color="dark">
          Hurtiglenke
        </Button>
      </Paper>
    </a>
  );
}

const data = [

  {
    id: 0,
    image:
      'https://pbs.twimg.com/media/FY2_iaaXoAIIGaD?format=jpg&name=large',
    title: 'Finn billigst Drivstoff Nær Deg',
    category: 'Energi',
    url: 'minfuel.no',
  },
  {
    id: 1,
    image:
      'https://raw.githubusercontent.com/Animevariant/Animevariant/main/ezgif-3-b2438d3a3a.webp',
    title: 'Anime and Manga Marketplace. Earn money by reading and watching anime.',
    category: 'Marketplace',
    url: 'animevariant.com',
  },
  {
    id: 2,
    image:
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/319050516_587940730002478_1056009518990803037_n.png?stp=dst-png_p403x403&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bNr9pL9VCc0AX94W1ze&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTU6LzYDa7WxqLYCb-rRa-Txx9UAggONHWFRH1lZThzjg&oe=63F96459',
    title: 'Her kan det ligge Din reklame',
    category: 'Din category',
    url: 'minfuel.no',
  },

  {
    id: 3,
    image:
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/319050516_587940730002478_1056009518990803037_n.png?stp=dst-png_p403x403&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bNr9pL9VCc0AX94W1ze&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTU6LzYDa7WxqLYCb-rRa-Txx9UAggONHWFRH1lZThzjg&oe=63F96459',
    title: 'Her kan det ligge Din reklame',
    category: 'Din category',
    url: 'minfuel.no',
  },
  {
    id: 4,
    image:
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/319050516_587940730002478_1056009518990803037_n.png?stp=dst-png_p403x403&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bNr9pL9VCc0AX94W1ze&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTU6LzYDa7WxqLYCb-rRa-Txx9UAggONHWFRH1lZThzjg&oe=63F96459',
    title: 'Her kan det ligge Din reklame',
    category: 'Din category',
    url: 'minfuel.no',
  },
  {
    id: 5,
    image:
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/319050516_587940730002478_1056009518990803037_n.png?stp=dst-png_p403x403&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bNr9pL9VCc0AX94W1ze&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTU6LzYDa7WxqLYCb-rRa-Txx9UAggONHWFRH1lZThzjg&oe=63F96459',
    title: 'Her kan det ligge Din reklame',
    category: 'Din category',
    url: 'minfuel.no',
  },
];

export function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.id}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="40%"
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
      slideGap="xl"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}
