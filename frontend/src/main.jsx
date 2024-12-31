import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import {persistor, store} from "./store.js";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { PersistGate } from 'redux-persist/integration/react';
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </AlertProvider>
  </StrictMode>,
)
