import React from 'react';
import List from './components/List/List';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AddContact from './components/AddContact/AddContact';
import { AppShell, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {

  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <Container size="lg">
          <AppShell.Header>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <div>Logo</div>
          </AppShell.Header>

          <AppShell.Main>
              <Routes>
                <Route path="/" element={<List />} />
                <Route path="/add" element={<AddContact />} />
              </Routes>
          </AppShell.Main>

          <AppShell.Footer p="md">Footer</AppShell.Footer>
        </Container>
      </AppShell>
    </>
  );
}

export default App;
