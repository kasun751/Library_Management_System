import Navigation from "../../HeaderContent/Navigation.jsx";
import './Home.css';
import Card from './Card/Card.jsx';
function Home(){

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
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>

            </div>


        </>

    );
}

export default Home;