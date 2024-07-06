import './Home.css';
import collectionBook from '../../assets/images/collection_book.png';
import CollectionNewsPapers from '../../assets/images/collection_newspapers.png';
import CollectionPastPapers from '../../assets/images/collectionpastpapers.png';
import HeaderComponent from "../HeaderComponent/HeaderComponent.jsx";
import FooterComponent from "../FooterComponent/FooterComponent.jsx";

function Home() {
    return (
        <>

            <div className="body">
                <HeaderComponent
                    id="homePageHeader" router1={"/"} Link1={"Home"}
                    router2={"/askforum"} Link2={"Ask Forum"}
                    router3={"/ideaCorner"} Link3={"Idea Corner"}
                    router4={"/logout"} Link4={"Log Out"}
                />
                <div className="main_home">
                    <h1 className="outlined-text home_heading">WELCOME<br/>OUR<br/>E-RESOURCES SECTION</h1>
                </div>
                <div className="home mx-auto">

                    <h2 className="card-title mt-5">E-BOOKS SECTION</h2>


                    <div className="card mb-5 border-0">
                        <div className="row g-0">
                            <div className="col-md-3 col-xl-4 col-lg-5 col-md-8 col-sm-10 mx-auto"
                                 style={{height: "280px"}}>
                                <img src={collectionBook} id="img" className="img-fluid h-100 mt-2" alt="cover image"/>
                            </div>
                            <div className="col-md-1 d-flex justify-content-center">
                                <div className="vertical-line"></div>
                            </div>
                            <div className="col-lg-5 col-md-10 d-flex flex-column justify-content-center mx-auto">
                                <div className="card-body">

                                    <p className="card-text"><small>Welcome to our E-Book Section, offering a wide range
                                        of
                                        digital books
                                        across various genres and topics. Enjoy seamless access to your favorite titles
                                        anytime, anywhere, enhancing your reading experience and supporting your
                                        literary
                                        journey.</small></p>
                                    <div className="col-md-10 mt-2">
                                        <button className="btn btn-outline-success button" id="custom-button"
                                                type="submit">
                                            <a href="/ebook">Explore</a></button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    <h2 className="card-title">E-NEWSPAPERS SECTION</h2>

                    <div className="card mb-5 border-0">
                        <div className="row g-0">
                            <div className="col-md-4 col-xl-4 col-lg-5 col-md-7 col-sm-7 mx-auto"
                                 style={{height: "280px", width: "450px"}}>
                                <img src={CollectionNewsPapers} className="img-fluid h-100 mt-2" alt="..."/>
                            </div>
                            <div className="col-md-1 d-flex justify-content-center">
                                <div className="vertical-line"></div>
                            </div>
                            <div className="col-lg-5 col-md-10 d-flex flex-column justify-content-center mx-auto">
                                <div className="card-body">

                                    <p className="card-text"><small>Welcome to our E-Newspapers Section! Access local,
                                        national, and international news anytime with our digital library. Stay informed
                                        with up-to-date
                                        headlines, in-depth articles, and special features, perfect for avid readers and
                                        researchers.</small></p>
                                    <div className="col-md-10 mt-2">
                                        <button className="btn btn-outline-success button" id="custom-button"
                                                type="submit">
                                            <a href="/enews">Explore</a></button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="card-title">E-PASTPAPERS SECTION</h2>
                    <div className="card mb-5 border-0">
                        <div className="row g-0">
                            <div className="col-md-4 col-xl-4 col-lg-5 col-md-7 col-sm-7 mx-auto "
                                 style={{height: "280px", width: "450px"}}>
                                <img src={CollectionPastPapers} className="img-fluid h-100 mt-2" alt="..."/>
                            </div>
                            <div className="col-md-1 d-flex justify-content-center">
                                <div className="vertical-line"></div>
                            </div>
                            <div className="col-lg-5 col-md-10 d-flex flex-column justify-content-center mx-auto">
                                <div className="card-body">


                                    <p className="card-text"><small> Welcome to our E-Past Papers Section, your go-to
                                        resource for academic past papers.
                                        Access a diverse collection of past exam papers across various subjects and
                                        levels.Perfect for students and educators.</small></p>
                                    <div className="col-md-10 mt-2">
                                        <button className="btn btn-outline-success button" id="custom-button"
                                                type="submit">
                                            <a href="/epastpapers">Explore</a></button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent/>
            </div>

        </>
    )
}

export default Home;