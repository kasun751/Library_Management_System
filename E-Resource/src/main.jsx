import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import E_Book_Home from './Components/Pages/Home/E_Book_Home.jsx'
import Add from './Components/Pages/Add/Add.jsx'
import Remove from './Components/Pages/Remove/Remove.jsx'
import Update from './Components/Pages/Update/Update.jsx'
import MyBooks from './Components/Pages/MyBooks/MyBooks.jsx'
import Home from "./Components/Home/Home.jsx";


import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import E_NewsPapers_Home from "./Components/E_NewsPapers/Home/E_NewsPapers_Home.jsx";
import E_PastPapers_Home from "./Components/E_PastPapers/Home/E_PastPapers_Home.jsx";
import Add_NewsPapers from "./Components/E_NewsPapers/Add/Add_NewsPapers.jsx";
import Update_NewsPapers from "./Components/E_NewsPapers/Update/Update_NewsPapers.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>, // Define route for root URL
    },
    {
        path: "/home",
        element: <Home/>, // Define route for root URL
    },

    {
        path: "/ebook",
        element: <E_Book_Home/>,
    },
    {
        path: "/enews",
        element: <E_NewsPapers_Home/>,
    },
    {
        path: "/epastpapers",
        element: <E_PastPapers_Home/>,
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
    {
        path: "/add_news",
        element: <Add_NewsPapers/>,
    },
    {
        path: "/update_news",
        element: <Update_NewsPapers/>,
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
