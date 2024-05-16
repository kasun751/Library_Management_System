import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Add from './Components/Pages/Add/Add.jsx'
import Remove from './Components/Pages/Remove.jsx'
import Buy from './Components/Pages/Buy.jsx'
import View from './Components/Pages/View.jsx'
import Search from './Components/Pages/Search.jsx'


import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
        path: "/buy",
        element: <Buy/>,
    },
    {
        path: "/view",
        element: <View/>,
    },
    {
        path: "/search",
        element: <Search/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
