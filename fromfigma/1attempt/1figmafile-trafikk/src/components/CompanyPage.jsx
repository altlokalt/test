import { useState, useEffect } from 'react'
import { CompanyHeader } from './CompanyHeader'

import Footer from './footer/Footer'
import Nav from './nav/Nav'
import client from '../hooks/sanity'

function CompanyPage() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        sanityApiCall()
    }, [])

    function sanityApiCall() {
        let company = window.localStorage.getItem("clicked company")
        //console.log(company );

        client.fetch(`*[_id == "${company}" ]`).then(data => {
            // use the data in your component
            //console.log(data)
            const titles = data[0]
            //console.log(titles)
            setCategories(titles)
        })

    }
    //console.log(categories)



    return (
        <div>
            <Nav />
            {/* <BadgeCard
            key={categories._id}
            
            image={categories.image}
            url={categories.name}
            title={categories.name}
            country={categories.name}
            source={categories._updatedAt}
            description={categories.slogan}
            sector={categories.name}
        /> */}

            <CompanyHeader company={categories} />
            <Footer />
        </div>
    )
}

export default CompanyPage