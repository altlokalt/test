import { useState } from 'react';
import { createStyles, Navbar, UnstyledButton, Tooltip, Title } from '@mantine/core';
import {

  IconBuildingSkyscraper,
  IconPremiumRights,
  IconUsers,
  IconMeteor,
  IconChalkboard,
  IconLiveView,
  IconSpeakerphone,
  IconMessageReport,
  IconAd2,
  IconUser,
  IconSettings,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },

  aside: {
    flex: '0 0 60px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
  },

  main: {
    flex: 1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  title: {
    boxSizing: 'border-box',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
  },

  logo: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: 60,
    paddingTop: theme.spacing.md,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    lineHeight: '44px',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  linkActive: {
    '&, &:hover': {
      borderLeftColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      color: theme.white,
    },
  },
}));

const mainLinksMockdata = [
  {
    icon: IconBuildingSkyscraper, label: 'Finn Alt', name: 'FinnAlt', children: [
      'Lokale ditt',
      'Din by',
      'Nabobyen',
      'Grunderiet',
      'Leverandør Liste',
      'Hobbyster',
      'Turist || Reise',
      'Lokale Anmeldelser',
      'Sport',
      'Bibliotek',
      'Mæteplassen'
    ]
  },
  {
    icon: IconPremiumRights, label: 'Annonser', name: 'Annonser', children: [
      'Kampanjer',
      'Markedsplass',
      'Salg',
      'Lokalet tilbud',
      'Handeltorget',
      'Firma Tilbud',
      'Opplagstavler',
      'Kjøp, salg & utleie',
      'Sammedags levering',
      'Hjemlevering',
      'Publiser annonse'
    ]
  },
  {
    icon: IconUsers, label: 'Felleskap', name: 'Felleskap', children: [
      'Næringsforum',
      'Ekspert Liste',
      'Oppmuntring',
      'Klubb',
      'Inspirasjon',
      'Be &eller Tylby hjelp',
      'Diskusjoner',
      'Lokalet forum',
      'Del kunskapp',
      'Dugnad & Frivillig',
      'Kunskap bygging'
    ]
  },
  {
    icon: IconMeteor, label: 'Tjeneste områder', name: 'TjenesteOmrader', children: [
      'Informasjon',
      'Nettverking',
      'Bli kjent',
      'Konkuranse',
      'Finne Lokale',
      'Kollaborasjon',
      'Altlokal Klubb',
      'Kultur Kalender',
      'Kurs, Webinar & Seminar',
      'Partnerskap & Sponsor',
      'Ideer & Forslag (Ideer bank)'
    ]
  },
  {
    icon: IconChalkboard, label: 'Portalen', name: 'Portalen', children: [
      'Liste over alle',
      'Næringsliv',
      'Handel',
      'Siste Nytt',
      'Helse & Velvære',
      'Bedrifter',
      'Butikker',
      'Trafikk',
      'skaper',
      'Forslagskasse',
      'Omtaler'
    ]
  },
  {
    icon: IconLiveView, label: 'Komunal Oversikt', name: 'KomunalOversikt', children: [
      'Aktuelt',
      'Aktiviteter',
      'Status',
      'Opplagstavler fra Buttikken',
      'Kultur front',
      'Politikk & historie',
      'Tilfrukts områder',
      'Nabolaget',
      'Innbyggere & bestander',
      'Friluftsliv & sport',
      'Virksomhet'
    ]
  },
  {
    icon: IconSpeakerphone, label: 'Arrangementer', name: 'Arrangementer', children: [
      'Dette skjer',
      'Eventer, Konserter & Fest',
      'legg til arrangement',
      'Utforsk',
      'Fritidsaktiviteter & tilbud',
      'Aktiviteter',
      'Attraksjoner',
      'Kommende arrangementer',
      'Arrangementer du følger',
      'Arrangementer i nærheten',
      'Får tilsendt arrangementer'
    ]
  },
  {
    icon: IconMessageReport, label: 'varsling', name: 'Varsling', children: [
      'Søknadsfrist oversikt',
      'Nød og forventninger',
      'Kjekk temperatur',
      'Oppdarert informasjon',
      'Vær & luft',
      'Frister',
      'Traffikk meldinger',
      'Reservasjon Kalender',
      'Økonomi & Regnskap',
      'Kultur Kalender',
      'Siste Nytt'
    ]
  },
  {
    icon: IconAd2, label: 'Rekrutering', name: 'Rekrutering', children: [
      'Søk etter jobb',
      'Læarling & Praksis',
      'Lokale jobber',
      'Ekspert & Profesjonell',
      'Talenter',
      'Internship',
      'Jobber du allerede',
      'Jobber anbefallinger',
      'Kandidat søk',
      'Publiser jobb',
      'Rask Jobbtilbud ( haster )'
    ]
  },
  {
    icon: IconUsers, label: 'Om oss', name: 'OmOss', children: [
      'Avtall mæte',
      'Presse',
      'Invester',
      'Kontakt oss',
      'Blogg',
      'Utvikler',
      'Kom i gang',
      'Støtt',
      'Investerings',
      'Mer informasjon'
    ]
  },
  {
    icon: IconUser, label: 'Konto', name: 'Konto', children: [
      'Konto oversikt',
      'Opprett bedrift konto',
      'legg til arrangement',
      'legg til oppdrag',
      'Bli en leverandør',
      'Regrister din kunnskap',
      'mitt innhold & nettverk',
      'Mitt selskap',
      'mitt ',
      'Medlemsfrister',
      'Avtale mæte',
      'Send inn alt'
    ]
  },
  {
    icon: IconSettings, label: 'Instillinger', name: 'Instillinger', children: [
      'kontoinnstillinger',
      'Oppdater konto',
      'Oppgrader konto',
      'konto sikkerhet',
      'Logg ut',
      'personvern',
      'sikkerhet',
      'konto',
      'konto sikkerhet',
      'slett konto',
      'Hjelp',
    ]
  },
];


export default function DashboardSearch() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Finn Alt');
  const [activeLink, setActiveLink] = useState('Lokale ditt');
  const [linksMockdata, setLinksMockdata] = useState(mainLinksMockdata[0].children)

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip label={link.label} position="right" withArrow transitionDuration={0} key={link.label}>
      <UnstyledButton
        onClick={() => {
          setActive(link.label);
          setLinksMockdata(link.children);
        }}
        className={cx(classes.mainLink, { [classes.mainLinkActive]: link.label === active })}
      >

        <link.icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: activeLink === link })}
      href="/"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  return (

    <Navbar height="100h" width={{ sm: 300 }} align="left" >
      <Navbar.Section grow className={classes.wrapper}>

        <div className={classes.aside}>
          <div className={classes.logo}>
            <MantineLogo type="mark" size={30} />
          </div>
          {mainLinks}
        </div>

        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>

          {links}
        </div>

      </Navbar.Section>
    </Navbar>
  );
}