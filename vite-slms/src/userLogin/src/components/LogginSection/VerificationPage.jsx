// VerificationPage.js
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VerificationPage.css"; 
import HeaderComponent from "../Header/HeaderComponent.jsx";
import FooterComponent from "../Footer/FooterComponent.jsx";

function VerificationPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const decodedId = decodeURIComponent(id);

    useEffect(() => {
        axios.get(`http://localhost:80/project_1/UserLogin/controllers/IsVerifyController.php?id=${decodedId}`)
            .then(response => {
                console.log(response.data);

                if (response.data.resultMessage === "EmailVerified") {
                    const encodedId = encodeURIComponent(decodedId);
                    localStorage.setItem("userID", response.data.userID);
                    navigate(`/dashboard/${encodedId}`);
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    return (
        <div id="verificationPage">
            <HeaderComponent 
                router3={"/"} Link3={"Home"}
                router4={"/dashboard"} Link4={"Dashboard"}
                router7={"/login"} Link7={"Sign In"}
            />
            <div className="verification-container">
                <h1 className="verification-text">Please verify your email...</h1>
            </div>
            <FooterComponent />
        </div>
    );
}

export default VerificationPage;
