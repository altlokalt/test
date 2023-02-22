import React, { useState, useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import { BadgeCardApi } from './BadgeCardApi';
import { getOurCompaniesPage } from './api/axios';
import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from '@mantine/hooks';
import { Pagination, useMantineTheme } from '@mantine/core';

function Card(item) {
    //console.log("id fgsdfgfgfgfg", item)
    return (
        <BadgeCardApi
            key={item.organisasjonsnummer}
            id={item.organisasjonsnummer}
            image={"https://scontent.xx.fbcdn.net/v/t1.15752-9/319050516_587940730002478_1056009518990803037_n.png?stp=dst-png_p403x403&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bNr9pL9VCc0AX94W1ze&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTU6LzYDa7WxqLYCb-rRa-Txx9UAggONHWFRH1lZThzjg&oe=63F96459"}
            url={item.hjemmeside}
            title={item.navn}
            country={item.naeringskode1.kode}
            source={item.stiftelsesdato}
            description={item.naeringskode1.beskrivelse}
            sector={item.naeringskode1.beskrivelse}
        />
    );
}

function BrregCompany() {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    let slides = []
    const {
        isLoading,
        isError,
        error,
        data: companies,
        isFetching,
        isPreviousData,
    } = useQuery(['/api/companies'], () => getOurCompaniesPage(), {
        keepPreviousData: true
    })
    //console.log("companies ", companies)

    if (isLoading) return <h2>Loading Users...</h2>

    if (isError) return <h2>Error: {error.response.data.valideringsfeil[0].feilmelding}, vennlygst, Last siden på nytt</h2>

    brregQuery()

    function brregQuery() {
       // console.log("companies ", companies)
        //console.log("companies ", companies.page.totalPages)
        slides = companies.companies.map((item) => (
            <Carousel.Slide key={item.organisasjonsnummer}>
                <Card {...item} />
            </Carousel.Slide>
        ));
    }

    return (
      
      
      <Carousel
            slideSize="30%"
            breakpoints={[{ maxWidth: 'xm', slideSize: '100%', slideGap: 2 }]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 2}
        >
            {slides}

        </Carousel>
     
        
  
    );
}

export default BrregCompany;
