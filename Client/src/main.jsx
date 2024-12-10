import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {Provider} from "react-redux";
import store from './redux/store.js';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/theme-provider" 
import { Play } from 'lucide-react';
import Player from "./components/Player.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    <Player/>
    <Toaster/>
    </ThemeProvider>
    </Provider>
   ,
)
