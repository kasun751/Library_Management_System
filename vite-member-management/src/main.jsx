import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import BookConer from './DummyComponents/BookConer.jsx';
import MemberPortal from './DummyComponents/MemberPortal.jsx';
import FundManager from './DummyComponents/FundManager.jsx';
import UserApproval from './DummyComponents/UserApproval.jsx';
import ViewInventory from './DummyComponents/ViewInventory.jsx';
import IdeaAproval from './DummyComponents/IdeaAproval.jsx';
import CheckIn from './DummyComponents/CheckIn.jsx';
import CheckOut from './DummyComponents/CheckOut.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App user_id="A17" user_type="staff"/>,
  },
  {
    path: "/bookconer",
    element: <BookConer />,
  },
  {
    path: "/memberportal",
    element: <MemberPortal />,
  },
  {
    path: "/fundmanager",
    element: <FundManager />,
  },
  {
    path: "/userapproval",
    element: <UserApproval />,
  },
  {
    path: "/viewinventory",
    element: <ViewInventory />,
  },
  {
    path: "/ideaaproval",
    element: <IdeaAproval />,
  },
  {
    path: "/checkin",
    element: <CheckIn />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
