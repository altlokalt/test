import { Grid, Container, Pagination} from '@mantine/core';
import { useState } from 'react';
import Footer from '../components/footer/Footer';
import Nav from '../components/nav/Nav';
import { useQuery } from '@tanstack/react-query';
import { getPostsPage } from '../components/api/axios';
import { BadgeCardApi } from '../components/BadgeCardApi';



function Trending() {
  const [page, setPage] = useState(1)

  const {
    isLoading,
    isError,
    error,
    data: companies,
    isFetching,
    isPreviousData,
  } = useQuery(['/', page], () => getPostsPage(page), {
    keepPreviousData: true
  })
  if (isLoading) return <p>Loading Users...</p>
  if (isError) return <p>Error: {error.message}</p>
  const content = companies._embedded.enheter.map((company) => {
    return <Grid.Col
     xs={4}
      key={company.organisasjonsnummer}
      >
      <BadgeCardApi
        id={company.organisasjonsnummer}
        image={"https://scontent.xx.fbcdn.net/v/t1.15752-9/319050516_587940730002478_1056009518990803037_n.png?stp=dst-png_p403x403&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bNr9pL9VCc0AX94W1ze&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTU6LzYDa7WxqLYCb-rRa-Txx9UAggONHWFRH1lZThzjg&oe=63F96459"}
        url={company.hjemmeside}
        title={company.navn}
        country={company.stiftelsesdato}
        source={company.stiftelsesdato}
        description={JSON.stringify(company.naeringskode1)}
        sector={company.organisasjonsform.beskrivelse
        }
      />
    </Grid.Col>
  }
  )

  return (
    <div>
      <Nav />
      <center>
        <h1>Alle Bedrifter</h1>
      </center>
      <Container my="md">
          <Grid>
            {content}
          </Grid>
        <center style={{ padding: "5% 30%", display: "inline-block", verticalAlign: "middle" }}>
          <Pagination total={companies.page.totalPages} page={page} onChange={setPage} size="xs" radius="xl" withEdges />

        </center>
      </Container>
      <Footer />
    </div>
  )
}

export default Trending