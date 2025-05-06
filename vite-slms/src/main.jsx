import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AskFromCommunity from './askFrom/src/App.jsx';
import DashBoard from './dashBoard/src/App.jsx';
import DonationHome from './donation/src/App.jsx';
import DonateBookPage from './donation/src/Pages/DonateBookPage.jsx';
import DonateBookAdminPage from './donation/src/Pages/DonateBookAdminPage.jsx';
import DonateFundsPage from './donation/src/Pages/DonateFundsPage.jsx';
import DonateFundsAdminPage from './donation/src/Pages/DonateFundsAdminPage.jsx';
import MemberPortal from './memberManagement/src/App.jsx';

import Home from "../src/eResources/E-Resource/src/Components/Home/Home.jsx";
import E_Book_Home from '../src/eResources/E-Resource/src/Components/Pages/Home/E_Book_Home.jsx'
import Add from '../src/eResources/E-Resource/src/Components/Pages/Add/Add.jsx'
import Remove from '../src/eResources/E-Resource/src/Components/Pages/Remove/Remove.jsx'
import Update from '../src/eResources/E-Resource/src/Components/Pages/Update/Update.jsx'
import MyBooks from '../src/eResources/E-Resource/src/Components/Pages/MyBooks/MyBooks.jsx'
import E_NewsPapers_Home from "../src/eResources/E-Resource/src/Components/E_NewsPapers/Home/E_NewsPapers_Home.jsx";
import E_PastPapers_Home from "../src/eResources/E-Resource/src/Components/E_PastPapers/Home/E_PastPapers_Home.jsx";
import Add_NewsPapers from "../src/eResources/E-Resource/src/Components/E_NewsPapers/Add/Add_NewsPapers.jsx";
import Update_NewsPapers from "../src/eResources/E-Resource/src/Components/E_NewsPapers/Update/Update_NewsPapers.jsx";
import Add_PastPapers from "../src/eResources/E-Resource/src/Components/E_PastPapers/Add/Add_PastPapers.jsx";
import Update_PastPapers from "../src/eResources/E-Resource/src/Components/E_PastPapers/Update/Update_PastPapers.jsx";

import BookSectionHome from "../src/userLogin/src/components/BookSection/BookSectionHome/BookSectionHome.jsx";
import AddNewBook from "../src/userLogin/src/components/BookSection/AddNewBook/AddNewBook.jsx";
import ModifyBook from "../src/userLogin/src/components/BookSection/modifyBook/ModifyBook.jsx";
import DeleteBook from "../src/userLogin/src/components/BookSection/DeleteBook/DeleteBook.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AddExistingBookQty from "../src/userLogin/src/components/BookSection/AddExistingBookQty/AddExistingBookQty.jsx";
import SelectMethod from "../src/userLogin/src/components/BookSection/SelectMethod/SelectMethod.jsx";
import AddRemoveCategory from "../src/userLogin/src/components/BookSection/Add&RemoveCategory/Add&RemoveCategory.jsx";
import ViewBookDetails from "../src/userLogin/src/components/BookSection/ViewBookDetails/ViewBookDetails.jsx";
import DeleteSomeBook from "../src/userLogin/src/components/BookSection/DeleteBook/DeleteSomeBooks.jsx";
import DeleteAllBook from "../src/userLogin/src/components/BookSection/DeleteBook/DeleteAllBooks.jsx";
import ShowAllBookDetails from "../src/userLogin/src/components/BookSection/ViewBookDetails/ShowAllBookDetails.jsx";
import BookAvailabilityDetails from "../src/userLogin/src/components/BookSection/ViewBookDetails/BookAvailabilityDetails.jsx";
import IssueBook from "../src/userLogin/src/components/BookSection/IssueBook/IssueBook.jsx";
import GuestUser from "../src/userLogin/src/components/LogginSection/GuestUser.jsx";
//import Dashboard from "../src/userLogin/src/components/DashBoad/Dashboard.jsx";
import Login from "../src/userLogin/src/components/LogginSection/Login.jsx";
import VerificationPage from "../src/userLogin/src/components/LogginSection/VerificationPage.jsx";
import ViewBookRequests from "../src/userLogin/src/components/BookSection/IssueBook/ViewBookRequests.jsx";
import AvailableNow from "../src/userLogin/src/components/BookSection/AvailableNow/AvailableNow.jsx";
import ForgotPassword from "../src/userLogin/src/components/LogginSection/ForgotPassword.jsx";
import HomePage from "../src/userLogin/src/components/HomePage/HomePage.jsx";
import FetchBookData from "../src/userLogin/src/components/BookSection/AddNewBook/FetchBookData.jsx";
import ViewBarcodes from "../src/userLogin/src/components/BookSection/ViewBookDetails/ViewBarcodes.jsx";
import CheckOut from "../src/userLogin/src/components/BookSection/IssueBook/CheckOut.jsx";
import CheckIn from "../src/userLogin/src/components/BookSection/IssueBook/CheckIn.jsx";
import SearchDeletedBooks from '../src/userLogin/src/components/BookSection/DeleteBook/SearchDeletedBooks.jsx';
import RegisterLibraryUsers from '../src/userLogin/src/components/LogginSection/RegisterLibraryUsers.jsx';
import RegisterStaffUser from '../src/userLogin/src/components/LogginSection/RegisterStaffUser.jsx';

import KidsSection from '../src/ideaConer/src/components/KidsSection.jsx';
import AdultsSection from '../src/ideaConer/src/components/AdultsSection.jsx';
import Homepage from '../src/ideaConer/src/components/Homepage.jsx';
import TaskPanel from '../src/library-taskt-calendar/src/App.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { getAgeCategory, getUserID, getUserType, isLibrarian } from './userAuthFun.jsx';
 const Root = () => {
  const user = getUserType();
  const [userID, setUserID] = useState(getUserID()); 
  const [userType, setUserType] = useState(getUserType());
  const [userType1, setUserType1] = useState(getAgeCategory());
  
useEffect(()=>{
    setUserType(getUserType());
    //window.location.reload();
},[])


console.log(userID)
 const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },{
      path: "/askfromcommunity",
      element: <AskFromCommunity user_id={userID} user_type={userType} />,
    },{
      path: "/donation",
      element: <DonationHome />,
    },
    {
      path:"/donatebooks",
      element: userType !== "staff" ? <DonateBookPage /> : <DonateBookAdminPage />,
    },
    {
      path:"/donatefunds",
      element: userType !== "staff" ? <DonateFundsPage /> : <DonateFundsAdminPage />
    },{
      path: "/memberportal",
      element: <MemberPortal user_id={userID} user_type={userType} />,
    },
    {
        path: "/eresource",
        element: <Home/>, 
    },{
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
      element: userType == "staff" ? <Add/> : <Login/>,
  },
  {
      path: "/remove",
      element: userType == "staff" ? <Remove/> : <Login/>,
  },
  {
      path: "/update",
      element: userType == "staff" ? <Update/> : <Login/>,
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
  {
      path: "/add_pastPapers",
      element: userType == "staff" ? <Add_PastPapers/> : <Login/>,
  },
  {
      path: "/update_pastPapers",
      element: userType == "staff" ? <Update_PastPapers/> : <Login/>,
  },
{
    path: "/addBook",
    element: userType == "staff" ? <SelectMethod/> : <Login/>,
},
{
    path: "/addBook/addNewBook",
    element: userType == "staff" ? <AddNewBook/> : <Login/>,
},
{
    path: "/addBook/addExistingBookQty",
    element: userType == "staff" ? <AddExistingBookQty/> : <Login/>,
},
{
    path: "/addBook/addCategory",
    element: userType == "staff" ? <AddRemoveCategory/> : <Login/>,
},
{
    path: "/addBook/availableNow",
    element: userType == "staff" ? <AvailableNow/> : <Login/>,
},
{
    path: "/deleteBook",
    element: userType == "staff" ? <DeleteBook/> : <Login/>,
},
{
    path: "/deleteAllBook",
    element: userType == "staff" ? <DeleteAllBook/> : <Login/>,
},
{
    path: "/deleteSomeBook",
    element: userType == "staff" ? <DeleteSomeBook/> : <Login/>,
},
{
    path: "/searchDeleteBooks",
    element: userType == "staff" ? <SearchDeletedBooks/> : <Login/>,
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
    element: userType == "staff" ? <ModifyBook/> : <Login/>,
},
{
    path: "/checkIn",
    element: userType == "staff" ? <CheckIn/> : <Login/>,
},
{
    path: "/checkOut",
    element: userType == "staff" ? <CheckOut/> : <Login/>,
},
{
    path: "/issueBook/requestList",
    element: userType == "staff" ? <ViewBookRequests/> : <Login/>,
},
{
    path: "/guestUser",
    element: <GuestUser/>,
},
{
    path: "/register",
    element: <RegisterLibraryUsers/>,
},
{
    path: "/registerStaffUser",
    element:  isLibrarian() ? <RegisterStaffUser/> : <Login/>,
},
{
    path: "/login",
    element: <Login/>,
},{
  path: "/dashboard/:id",
  element: <DashBoard />,
},{
  path: "/dashboard",
  element: <DashBoard />,
},
{
    path: "/login/forgotPassword",
    element: <ForgotPassword/>,
},
{
    path: "/verificationPage/:id",
    element: <VerificationPage/>,
},
{
    path: "/barcode",
    element: userType == "staff" ? <ViewBarcodes/> : <Login/>,
},
{
    path: "/ideaconerkoa",
    element: userType1 == "adult" ? <AdultsSection /> : <KidsSection userType={userType} />,
},
{
    path: "/kid",
    element:<KidsSection userType={userType} />,
},
{
    path: "/adult",
    element: userType1 == "adult" ? <AdultsSection/> : <KidsSection userType={userType} />,
},
{
    path: "/ideaconer",
    element: <Homepage userType={userType1} />,
},
{
    path: "/taskpanel",
    element:<TaskPanel />,
}
  ]);

  return (
    <RouterProvider router={router} />
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
