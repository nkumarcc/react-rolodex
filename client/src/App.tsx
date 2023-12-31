import React, { useContext } from 'react';
import List from './components/List/List';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AddContact from './components/AddContact/AddContact';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import { Anchor, AppShell, Burger, Center, Container, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useAuth from './hooks/useAuth';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import { AuthContext } from './contexts/AuthContext';
import UpdateContact from './components/UpdateContact/UpdateContact';
import UpdateMeetup from './components/UpdateMeetup/UpdateMeetup';
import AddMeetup from './components/UpdateContact/AddMeetup/AddMeetup';

function App() {

  const [opened, { toggle }] = useDisclosure();
  const { logout } = useAuth();
  const { user } = useContext(AuthContext);

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <Container>
            <AppShell.Header>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <div>Logo</div>
              {
                user ? (
                  <Anchor onClick={() => logout()}>Logout</Anchor>
                ) : null
              }
            </AppShell.Header>

            <AppShell.Main>
                  <Routes>
                    <Route element={<ProtectedRoute />}>
                      <Route path="/" element={<List />} />
                      <Route path="/add" element={<AddContact />} />
                      <Route path="/update/:contactId" element={<UpdateContact />} />
                      <Route path="/update/:contactId/:meetupId" element={<UpdateMeetup />} />
                      <Route path="/update/:contactId/add" element={<AddMeetup />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                    </Route>
                  </Routes>
            </AppShell.Main>
        </Container>
      </AppShell>
    </>
  );
}

export default App;
