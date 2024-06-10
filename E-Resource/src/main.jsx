import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Home from './Components/Pages/Home/Home.jsx'
import Add from './Components/Pages/Add/Add.jsx'
import Remove from './Components/Pages/Remove/Remove.jsx'
import Update from './Components/Pages/Update/Update.jsx'
import MyBooks from './Components/Pages/MyBooks/MyBooks.jsx'


import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />, // Define route for root URL
    },

    {
        path: "/home",
        element: <Home/>,
    },
    {
        path: "/add",
        element: <Add/>,
    },
    {
        path: "/remove",
        element: <Remove/>,
    },
    {
        path: "/update",
        element: <Update/>,
    },
    {
        path: "/my_books",
        element: <MyBooks/>,
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
