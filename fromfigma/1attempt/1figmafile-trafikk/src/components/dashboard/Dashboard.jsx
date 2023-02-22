import { Quote } from '../Quote';
import { useState, useEffect } from 'react';
import {
  AppShell,
} from '@mantine/core';

import Users from './updateDB/users/Users';
import BrregCompany from '../BrregCompany';
import CarouselTitle from '../CarouselTitle';
import CarouselDescription from '../CarouselDescription';
import { useNavigate } from 'react-router-dom';
import NavbarDashboard from './navbar/NavbarDashboard';
import useAuth from '../../hooks/useAuth';
import { server } from '../../components/api/axios';
import Footer from '../footer/Footer';

function Dashboard() {
  const { setAuth } = useAuth()


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {

      async function checkToken() {
        try {
          const response = await server.post('/api/validateToken', { token });
          const userData = response.data;
          console.log("user data", userData);
          setAuth(userData);
          populateQuote();
        } catch (error) {
          console.error(error);
        }
      }
      checkToken();

    }
  }, []);



  const history = useNavigate();
  const [quote, setQuote] = useState('');
  const [tempQuote, setTempQuote] = useState('');

  async function populateQuote() {
    const response = await fetch('http://localhost:3031/api/quote',
      {
        method: 'GET',
        headers: {
          "x-access-token": localStorage.getItem('token'),
        },
      })
    const data = await response.json();
    //console.log(data);

    if (data.status === 'success') {
      console.log('success');
      setQuote(data.quote);
    } else {
      console.log('no user');
      // alert(data.error)
      // localStorage.removeItem('token');
      //  history("../login", { replace: true })

    }

  }

  async function updateQuote(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:3031/api/quote',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({
          quote: tempQuote
        })

      })
    const data = await response.json();
    //console.log(data);

    if (data.status === 'success') {
      console.log('success');
      setQuote(tempQuote);
      setTempQuote('');
    } else {
      console.log('no user');
      // alert(data.error)
      // localStorage.removeItem('token');
      //  history("../login", { replace: true })
    }

  }



  return (

    <AppShell
      padding="md"
      // navbar={<NavbarDashboard />}
      className="container"
      sidebar={"sidebar"}
      header={<NavbarDashboard />}
      footer={<Footer />}

      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >

      <Users />
      <CarouselTitle title={"Companies"} />
      <CarouselDescription description={"Se noen bedrifter i vår database"} />
      <BrregCompany />
      {/* <Quote quote={quote} /> */}
    </AppShell>
  );
}

export default Dashboard;