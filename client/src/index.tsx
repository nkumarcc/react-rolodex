import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineColorsTuple, MantineProvider, createTheme } from '@mantine/core';
import { AuthProvider } from './contexts/AuthContext';

const myColor: MantineColorsTuple = [
  '#fffae1',
  '#fff4cc',
  '#ffe89b',
  '#ffdb64',
  '#ffd038',
  '#ffc91c',
  '#ffc509',
  '#e3ae00',
  '#ca9a00',
  '#ae8500'
];

const theme = createTheme({
  colors: {
    myColor,
  },
  components: {
    Button: {
      defaultProps: {
        color: 'myColor',
      }
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
