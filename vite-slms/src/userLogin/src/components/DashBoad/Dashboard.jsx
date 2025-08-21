import {Link, useParams} from "react-router-dom";
import BookSectionHome from "../BookSection/BookSectionHome/BookSectionHome.jsx";
import HeaderComponent from "../Header/HeaderComponent.jsx";

function Dashboard() {
    const {id} = useParams();
    const decodedId = decodeURIComponent(id);
    return (
        <>
            <HeaderComponent Link1={"Book Section Home"} router1={"/bookSection"} Link7={"Log Out"} router7={""} />

            <h1>Welcome {decodedId}... </h1>
            <h1>Dashboard</h1>
        </>
    )
}

export default Dashboard;