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

function App() {

  const [opened, { toggle }] = useDisclosure();
  const { logout } = useAuth();
  const { user } = useContext(AuthContext);

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
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
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                    </Route>
                  </Routes>
            </AppShell.Main>

            <AppShell.Footer p="md">Footer</AppShell.Footer>
        </Container>
      </AppShell>
    </>
  );
}

export default App;
