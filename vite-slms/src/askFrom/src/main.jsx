import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './DummyPages/HomePage.jsx';
import ContactUs from './DummyPages/ContactUs.jsx';
import Services from './DummyPages/Services.jsx';
import AboutUs from './DummyPages/AboutUs.jsx';
async function getUserAuthantication(){
  
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App user_id={"U034"} user_type={"reg"} />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/contactus",
    element: <ContactUs />
  },
  {
    path: "/services",
    element: <Services />
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
