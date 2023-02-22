import { Grid, Pagination, SimpleGrid, Center } from '@mantine/core';
import { useState } from 'react';
import Footer from './Footer';
import { BadgeCard } from './BadgeCard';

import { useQuery } from '@tanstack/react-query';
import { getPostsPage } from './api/axios';

function HeaderWithTabs() {

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
  //console.log(page)

  if (isLoading) return <h2>Loading Users...</h2>

  if (isError) return <h2>Error: {error.response.data.valideringsfeil[0].feilmelding},
    vennlygst,
    Last siden på nytt</h2>
  //console.log("companies ", companies._embedded.enheter)
  //console.log("companies ", companies.page.totalPages)
  const content = companies._embedded.enheter.map((company) => {
    //console.log("id fgsdfgfgfgfg", company)
    return <Grid.Col
      gutter="md"
      key={company.organisasjonsnummer}
      span={4}>

      <BadgeCard
        id={company.organisasjonsnummer}
        image={"https://scontent.xx.fbcdn.net/v/t1.15752-9/319050516_587940730002478_1056009518990803037_n.png?stp=dst-png_p403x403&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bNr9pL9VCc0AX94W1ze&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTU6LzYDa7WxqLYCb-rRa-Txx9UAggONHWFRH1lZThzjg&oe=63F96459"}
        url={company.hjemmeside}
        title={company.navn}
        country={company.stiftelsesdato}
        source={company.stiftelsesdato}
        description={JSON.stringify(company.naeringskode1)}
        sector={company.organisasjonsform.beskrivelse}
      />
    </Grid.Col>
  }
  )



  return (
    <div>
      <SimpleGrid cols={1} spacing="md" >
        <Grid breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {content}

        </Grid>
        <Center >
          <Pagination total={companies.page.totalPages} page={page} onChange={setPage} size="xs" radius="xl" withEdges />
        </Center>
      </SimpleGrid>

      <Footer />
    </div>

  )
}

export default HeaderWithTabs