import React, { useState, useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import { BadgeCardApi } from '../../../BadgeCardApi';
import { getOurUsersPage } from '../../../api/axios';
import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from '@mantine/hooks';
import { Pagination, useMantineTheme } from '@mantine/core';

import Nav from '../../../nav/Nav'
import Footer from '../../../footer/Footer';
import { ImageCard } from '../../../ImageCard';

function Card(item) {
    //console.log("id fgsdfgfgfgfg", item)
    return (
        <ImageCard
            title={item.email}
            description={item.name}
            image={"https://scontent.xx.fbcdn.net/v/t1.15752-9/319050516_587940730002478_1056009518990803037_n.png?stp=dst-png_p403x403&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bNr9pL9VCc0AX94W1ze&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTU6LzYDa7WxqLYCb-rRa-Txx9UAggONHWFRH1lZThzjg&oe=63F96459"}
        />
    );
}

function Users() {
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
    } = useQuery(['/'], () => getOurUsersPage(), {
        keepPreviousData: true
    })
    //console.log("companies ", companies)

    if (isLoading) return <h2>Loading Users...</h2>

    if (isError) return <h2>Error: {error.response.data.valideringsfeil[0].feilmelding}, vennlygst, Last siden på nytt</h2>

    userQuery()

    function userQuery() {
        //console.log("companies ", companies)
        //console.log("companies ", companies.page.totalPages)
        slides = companies.map((item) => (
            <Carousel.Slide key={item._id}>
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

export default Users;
