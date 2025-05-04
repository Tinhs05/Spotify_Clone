import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Toast from './components/components/Toast';
import GlobalStyles from "./components/GlobalStyles";
import reportWebVitals from './reportWebVitals';
import { TrackProvider, useTrack } from "../src/components/Layouts/contexts/TrackProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <TrackProvider>
        <App />
        <Toast />
      </TrackProvider>
      
    </GlobalStyles>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
