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
import ModifyBook from "./components/BookSection/modifyBook/ModifyBook.jsx";
import DeleteBook from "./components/BookSection/DeleteBook/DeleteBook.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AddExistingBookQty from "./components/BookSection/AddExistingBookQty/AddExistingBookQty.jsx";
import SelectMethod from "./components/BookSection/SelectMethod/SelectMethod.jsx";
import AddRemoveCategory from "./components/BookSection/Add&RemoveCategory/Add&RemoveCategory.jsx";
import ViewBookDetails from "./components/BookSection/ViewBookDetails/ViewBookDetails.jsx";
import DeleteSomeBook from "./components/BookSection/DeleteBook/DeleteSomeBooks.jsx";
import DeleteAllBook from "./components/BookSection/DeleteBook/DeleteAllBooks.jsx";
import ShowAllBookDetails from "./components/BookSection/ViewBookDetails/ShowAllBookDetails.jsx";
import BookAvailabilityDetails from "./components/BookSection/ViewBookDetails/BookAvailabilityDetails.jsx";
import IssueBook from "./components/BookSection/IssueBook/IssueBook.jsx";
import GuestUser from "./components/LogginSection/GuestUser.jsx";
import Dashboard from "./components/DashBoad/Dashboard.jsx";
import Register from "./components/LogginSection/Register.jsx";
import Login from "./components/LogginSection/Login.jsx";
import VerificationPage from "./components/LogginSection/VerificationPage.jsx";
import RestoreAllBooksReleventToIsbn from "./components/BookSection/DeleteBook/RestoreAllBooksReleventToIsbn.jsx";
import ViewBookRequests from "./components/BookSection/IssueBook/ViewBookRequests.jsx";
import AvailableNow from "./components/BookSection/AvailableNow/AvailableNow.jsx";
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
        path: "/addBook/availableNow",
        element:<AvailableNow/>
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
        path: "/restoreBook",
        element:<RestoreAllBooksReleventToIsbn/>
    },
    {
        path: "/viewBook",
        element:<ViewBookDetails/>
    },
    {
        path: "/viewBook/showAllBookDetails/:id",
        element:<ShowAllBookDetails/>
    },
    {
        path: "/viewBook/bookAvailabilityDetails/:id",
        element:<BookAvailabilityDetails/>
    },
    {
        path: "/modifyBook",
        element:<ModifyBook/>
    },
    {
        path: "/issueBook",
        element:<IssueBook/>
    },
    {
        path: "/issueBook/requestList",
        element:<ViewBookRequests/>
    },
    {
        path: "/guestUser",
        element: <GuestUser/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/dashboard/:id",
        element: <Dashboard/>,
    },
    {
        path: "/verificationPage/:id",
        element: <VerificationPage/>,
    },


]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
