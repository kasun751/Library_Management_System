import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DonateBookPage from './Pages/DonateBookPage.jsx';
import DonateFundsPage from './Pages/DonateFundsPage.jsx';
import DonateBookAdminPage from './Pages/DonateBookAdminPage.jsx';
import DonateFundsAdminPage from './Pages/DonateFundsAdminPage.jsx';

const Root = () => {
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("reg");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path:"/donatebooks",
      element: userType !== "staff" ? <DonateBookPage /> : <DonateBookAdminPage />,
    },
    {
      path:"/donatefunds",
      element: userType !== "staff" ? <DonateFundsPage /> : <DonateFundsAdminPage />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
