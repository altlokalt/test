import { TextInput, Pagination, ActionIcon, Grid, Container, useMantineTheme, SimpleGrid } from '@mantine/core';
import { getCityPage } from '../components/api/axios';
import { useQuery } from '@tanstack/react-query';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import { useState } from 'react';
import Footer from '../components/footer/Footer';
import Nav from '../components/nav/Nav';
import { BadgeCardApi } from '../components/BadgeCardApi';

function Lokalet() {

    const [value, setValue] = useState("");
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1)

    const {
        isLoading,
        isError,
        error,
        data: companies,
        isFetching,
        isPreviousData,
      } = useQuery(['/', value, page], () => getCityPage(value, page), {
        keepPreviousData: true
      })
      //console.log(page)
    
      if (isLoading) return <p>Loading Users...</p>
    
      if (isError) return <p>Error: {error.message}</p>



    function HandleReFetch() {
      
        setContent(companies._embedded.enheter.map((company) => {
            return <Grid.Col
               
                xs={4}
                key={company.organisasjonsnummer}
                >
                <BadgeCardApi

                    image={"https://scontent.xx.fbcdn.net/v/t1.15752-9/319050516_587940730002478_1056009518990803037_n.png?stp=dst-png_p403x403&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bNr9pL9VCc0AX94W1ze&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTU6LzYDa7WxqLYCb-rRa-Txx9UAggONHWFRH1lZThzjg&oe=63F96459"}
                    url={company.hjemmeside}
                    title={company.navn}
                    country={company.forretningsadresse.poststed}
                    source={company.stiftelsesdato}

                    sector={company.organisasjonsform.beskrivelse}
                />
                
            </Grid.Col>
        }))
    }
    //console.log("companies2 ", companies) 

    function InputWithButton() {
        const theme = useMantineTheme();

        return (
            <TextInput
                icon={<IconSearch size={18} stroke={1.5} />}
                radius="xl"
                size="md"
                style={{paddingBottom: "20px"}}
                label="Vil du sjekke bed Byen din?"
                value={value}
                onChange={(event) => {
                    //console.log(event.target)
                    setValue(event.target.value)
                }}
                rightSection={
                    <ActionIcon onClick={() => {
                        HandleReFetch()
                    }}
                        size={32}
                        radius="xl"
                        color={theme.primaryColor}
                        variant="filled">
                        {theme.dir === 'ltr' ? (
                            <IconArrowRight size={18} stroke={1.5} />
                        ) : (
                            <IconArrowLeft size={18} stroke={1.5} />
                        )}
                    </ActionIcon>
                }
                placeholder="Søk en by ... eller noen land"
                rightSectionWidth={42}
            />
            
        );
    }

    return (
        <div>
            <Nav />
            <center>
                <h1>Se Bedrifter I Lokale Ditt.</h1>
            </center>
            <Container my="md">
                {InputWithButton()}
               
                    <Grid >
                        {content}
                    </Grid>
              

                
                <center  onClick={() => {
                        HandleReFetch()
                    }} style={{ padding: "5% 30%", display: "inline-block", verticalAlign: "middle"}}>
            <Pagination 
            total={companies.page.totalPages} 
            page={page} onChange={setPage}
            size="xs" 
            radius="xl" 
            withEdges >
             
            </Pagination>

          </center>
            </Container>
            <Footer />
        </div>

    )
}

export default Lokalet;