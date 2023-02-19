import { useState, useEffect } from 'react'
import { CompanyHeader } from '../components/CompanyHeader'
import { getCompanyPage } from '../components/api/axios';
import { useQuery } from '@tanstack/react-query';
import Footer from '../components/footer/Footer';
import Nav from '../components/nav/Nav';


function CompanyPageApi() {

    const [organisasjonsnummer, setOrganisasjonsnummer] = useState(928257045)



    useEffect(() => {
        ApiCall()
    }, [])

    const {
        isLoading,
        isError,
        error,
        data: companies,
        isFetching,
        isPreviousData,
    } = useQuery(['/', organisasjonsnummer], () => getCompanyPage(organisasjonsnummer), {
        keepPreviousData: true
    })
    //console.log(page)

    if (isLoading) return <p>Loading Users...</p>

    if (isError) return <p>Error: {error.message}</p>
    //console.log("companies ", companies)

    function ApiCall() {
        let company = window.localStorage.getItem("clicked company")
        console.log("window.localStorage.getItem ", company);
        setOrganisasjonsnummer(company)
        
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

            <CompanyHeader company={companies}  />
            <Footer />
        </div>
    )
}

export default CompanyPageApi