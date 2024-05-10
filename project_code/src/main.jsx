import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import BookSectionHome from "./components/BookSection/BookSectionHome/BookSectionHome.jsx";
import AddNewBook from "./components/BookSection/AddNewBook/AddNewBook.jsx";
import ModifyBook from "./components/modifyBook/ModifyBook.jsx";
import DeleteBook from "./components/DeleteBook/DeleteBook.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AddExistingBookQty from "./components/BookSection/AddExistingBookQty/AddExistingBookQty.jsx";
import SelectMethod from "./components/BookSection/SelectMethod/SelectMethod.jsx";
import AddCategory from "./components/BookSection/AddCategory/AddCategory.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <BookSectionHome/>,
    },
    {
        path: "/addBook",
        element:<SelectMethod/>
    },
    {
        path: "/addBook/addNewBook",
        element:<AddNewBook/>
    },
    {
        path: "/addBook/addExistingBookQty",
        element:<AddExistingBookQty/>
    },
    {
        path: "/addBook/addCategory",
        element:<AddCategory/>
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
