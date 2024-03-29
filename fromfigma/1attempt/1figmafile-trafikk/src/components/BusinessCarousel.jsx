import { Carousel } from '@mantine/carousel';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Pagination, useMantineTheme } from '@mantine/core';
import { BadgeCard } from './BadgeCard';
import { useQuery } from '@tanstack/react-query';
import { getPostsPage } from './api/axios';
import client from '../hooks/sanity'
import { BadgeCardApi } from './BadgeCardApi';

function Card(item) {
    //console.log("id fgsdfgfgfgfg",item.organisasjonsnummer)
    return (
        <BadgeCardApi
            key={item.organisasjonsnummer}
            id={item.organisasjonsnummer}
            image={"https://scontent.xx.fbcdn.net/v/t1.15752-9/319050516_587940730002478_1056009518990803037_n.png?stp=dst-png_p403x403&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bNr9pL9VCc0AX94W1ze&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTU6LzYDa7WxqLYCb-rRa-Txx9UAggONHWFRH1lZThzjg&oe=63F96459"}
            url={item.hjemmeside}
            title={item.navn}
            country={item.stiftelsesdato}
            source={item.stiftelsesdato}
            description={JSON.stringify(item.naeringskode1)}
            sector={item.organisasjonsform.beskrivelse}
        />
    );
}

function SanityCard(item) {
    //console.log("id fgsdfgfgfgfg",item._id)
    return (
        <BadgeCard
            key={item._id}
            id={item._id}
            image={item.image}
            url1={"app.altlokal.no/start"}
            title={item.name}
            country={item.name}
            source={"app.altlokal.no/start"}
            description={item.slogan}
            sector={item.name}
        />

    );
}

export function BusinessCarousel(props) {
    //console.log(props.referrence)

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const [categories, setCategories] = useState([])
    const [page, setPage] = useState(1)
    let slides = []
    



    useEffect(() => {
        sanityApiCall(props)
    }, [])

    

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

    if (isError) return <h2>Error: {error.response.data.valideringsfeil[0].feilmelding}, vennlygst, Last siden på nytt</h2>


    brregQuery()

    function brregQuery() {
        //console.log("companies ", companies._embedded.enheter)
        //console.log("companies ", companies.page.totalPages)
        slides = companies._embedded.enheter.map((item) => (
            <Carousel.Slide key={item.organisasjonsnummer}>
                <Card {...item} />

            </Carousel.Slide>
        ));


    }

    function sanityApiCall(props) {
        client.fetch(`*[_type == "company"]`).then(data => {
            // use the data in your component
            const filteredData = data.filter(item => props.referrence.includes(item._id));
            //console.log("filtered data2", filteredData)
            setCategories(filteredData)
        })

    }

    slides = categories.map((item) => (
        <Carousel.Slide key={item._id}>
            <SanityCard {...item} />
        </Carousel.Slide>
    ));


    return (
        <Carousel
            slideSize="30%"
            breakpoints={[{ maxWidth: 'xm', slideSize: '100%', slideGap: 2 }]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 2}
        >
            {slides}
            <Carousel.Slide >
                <center style={{ paddingTop: "200px" }}>
                    <Pagination total={companies.page.totalPages} page={page} onChange={setPage} size="xs" radius="xl" withEdges />

                </center>

            </Carousel.Slide>

        </Carousel>
    );
}
