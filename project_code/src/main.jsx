import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import BookSectionHome from "./components/BookSectionHome/BookSectionHome.jsx";
import AddBook from "./components/AddBook/AddBook.jsx";
import ModifyBook from "./components/modifyBook/ModifyBook.jsx";
import DeleteBook from "./components/DeleteBook/DeleteBook.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
const router = createBrowserRouter([
    {
        path: "/",
        element: <BookSectionHome/>,
    },
    {
        path: "/addBook",
        element:<AddBook/>
    },
    {
        path: "/deleteBook",
        element:<DeleteBook/>
    },
    {
        path: "/modifyBook",
        element:<ModifyBook/>
    },

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
