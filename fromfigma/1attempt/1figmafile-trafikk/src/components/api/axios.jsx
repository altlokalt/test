import axios from "axios"

// companies from brreg
export const companies = axios.create({
    baseURL: 'https://data.brreg.no/enhetsregisteret/api'
})
export const getPostsPage = async (pageParam = 1) => {
    const response = await companies.get(`/enheter?page=${pageParam}&size=7`)
    return response.data
}

//companies in city from brreg
export const companiesInCity = axios.create({
    baseURL: 'https://data.brreg.no/enhetsregisteret/api/enheter'
})
export const getCityPage = async (value, page) => {
    const response = await companiesInCity.get(`/?forretningsadresse.poststed=${value}&page=${page}`)
    console.log(response.data)
    return response.data
}


//from our database
export const server = axios.create({
    baseURL: 'http://localhost:3031'
})


//companies from our database
export const getOurCompaniesPage = async () => {
    const response = await server.get("/api/companies")
    //console.log(response.data)
    return response.data
}

//quote from our db
//post to company to edit a specific company

//users from our database
export const getOurUsersPage = async () => {
    const response = await server.get("/api/users")
    //console.log(response.data)
    return response.data
}

//login from our database
export const login = axios.create({
    baseURL: 'http://localhost:3031/api/login'
})

//register from our database
export const register = axios.create({
    baseURL: 'http://localhost:3031/api/registerUser'
})

// //company in city from brreg old
// export const getCompaniesInCity= async (pageParam = 1, cityParam = "oslo"("city")) => {
//     const response = await companiesInCity.get(`?forretningsadresse.poststed=${cityParam}&page=${pageParam}`)
//     return response.data
// }

//one company from brreg
export const getCompanyPage = async (organisasjonsnummer) => {
    const response = await companiesInCity.get(`${organisasjonsnummer}`)
    return response.data
}
