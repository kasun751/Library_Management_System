import {useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

function VerificationPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const decodedId = decodeURIComponent(id);
    useEffect(() => {axios.get(`http://localhost:8081/project_01/controllers/IsVerifyController.php?id=${decodedId}`)
        .then(response => {
            console.log(response.data)

            if(response.data.resultMessage == "EmailVerified"){
                const encodedId = encodeURIComponent(decodedId);
                localStorage.setItem("userID",response.data.userID)
                navigate(`/dashboard/${encodedId}`);
            }
        })
        .catch(error => {
            console.log(error.message);
        });
    }, []);
    return (
        <>
            <h1>Please verify email... </h1>
        </>
    )
}

export default VerificationPage;