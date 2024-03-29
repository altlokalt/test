import React from 'react'
import { Container } from '@mantine/core';

import Footer from '../components/footer/Footer';
import Nav from '../components/nav/Nav';
import { BusinessCarousel } from '../components/BusinessCarousel';
import CarouselTitle from '../components/CarouselTitle';

import { useEffect, useState } from 'react'
import client from '../hooks/sanity'
import CarouselDescription from '../components/CarouselDescription';
import { CardsCarousel } from '../components/CardsCarousel';

function LandingPage() {
    const [categories, setCategories] = useState([])
    let titles = []

    useEffect(() => {
        client.fetch(`*[_type == "category"]`).then(data => {
            // use the data in your component
            const categories = data.map(category => {
                //console.log(category)
                //console.log(category.companies)
                return category
            })

            setCategories(categories)

        })

    }, [])
    
    function addCompanyList(title) {
        titles = title.companies.map(company => {
           return  company._ref
        })
        //console.log("refLanfingpaage", titles)

        return <BusinessCarousel referrence={titles} />
    }


    return (
        <div>
            <Nav />
            <Container size="xl" my="sm">
            <CardsCarousel />
                {categories.map(title =>
                    <div key={title._id}>
                        <CarouselTitle title={title.title} />
                        <CarouselDescription description={title.description} />

                        {title.companies ? addCompanyList(title) : "nothing"}

                    </div>)}
                {/* <CarouselTitle title={"Gridded"}/>
                <HeaderWithTabs /> */}
            </Container>
            <Footer />

        </div>
    )
}

export default LandingPage
