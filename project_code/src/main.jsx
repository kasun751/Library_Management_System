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
import AddRemoveCategory from "./components/BookSection/Add&RemoveCategory/Add&RemoveCategory.jsx";
import ViewBookDetails from "./components/BookSection/ViewBookDetails/ViewBookDetails.jsx";
import DeleteSomeBook from "./components/DeleteBook/DeleteSomeBooks.jsx";
import DeleteAllBook from "./components/DeleteBook/DeleteAllBooks.jsx";
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
        element:<AddRemoveCategory/>
    },
    {
        path: "/deleteBook",
        element:<DeleteBook/>
    },
    {
        path: "/deleteAllBook",
        element:<DeleteAllBook/>
    },
    {
        path: "/deleteSomeBook",
        element:<DeleteSomeBook/>
    },
    {
        path: "/viewBook",
        element:<ViewBookDetails/>
    },
    {
        path: "/modifyBook",
        element:<ModifyBook/>
    }

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
