import {useParams} from "react-router-dom";

function Dashboard() {
    const {id} = useParams();

    return (
        <>
            <h1>Welcome {id}... </h1>
            <h1>Dashboard</h1>
        </>
    )
}

export default Dashboard;