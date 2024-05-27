import {useParams} from "react-router-dom";

function Dashboard() {
    const {id} = useParams();
    const decodedId = decodeURIComponent(id);
    return (
        <>
            <h1>Welcome {decodedId}... </h1>
            <h1>Dashboard</h1>
        </>
    )
}

export default Dashboard;