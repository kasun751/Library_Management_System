import Navigation from "../../HeaderContent/Navigation.jsx";
import './Home.css';
import Card from './Card/Card.jsx';
import {useEffect, useState} from "react";
import axios from "axios";
function Home(){
    const [getBookDetails,setGetBookDetails]=useState([]);

    useEffect(() => {
        const getViewBookDetails = async ()=>{
            try{
                const res= await axios.get(
                    'http://localhost/Lbrary%20Management%20System/E-Resource_Php/viewBookDetails.php',
                    {
                        headers:{
                            'content-Type':'application/json'
                        }
                    }
                )
                console.log(res.data);
                setGetBookDetails(res.data);
            }catch (error){
                console.error("Error fetching data",error);
            }
        }

        getViewBookDetails();
    }, []);

    useEffect(() => {
        const loadPayHereScript = () => {
            const script = document.createElement("script");
            script.src = "https://www.payhere.lk/lib/payhere.js";
            script.type = "text/javascript";
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                console.log("PayHere script loaded successfully");
            };

            script.onerror = () => {
                console.error("Error loading PayHere script");
            };
        };

        loadPayHereScript();
    }, []);

    return(
        <>
            <Navigation/>

            <div className="search-container">
                <h1>E-Resources Section</h1>
                <form>
                    <div className="input-group mb-4">
                        <input type="search" className="form-control" placeholder="Search your Book Here"
                               aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <span className="input-group-text" id="basic-addon2">search icon</span>
                    </div>
                </form>
            </div>
            <div className="card-container">
                {getBookDetails.map((book, index) => (

                    <Card
                        key={index}
                        title={book.title}
                        isbn={book.isbn}
                        author={book.author}
                        price={book.price}
                        description={book.description}
                        image_path={`http://localhost/Lbrary%20Management%20System/IMAGES/${book.image_path}`}
                    />
                ))}

            </div>


        </>

    );
}

export default Home;