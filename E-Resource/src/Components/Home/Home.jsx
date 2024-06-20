import './Home.css';
import collectionBook from '../../assets/images/collection_book.jpg';
import CollectionNewsPapers from '../../assets/images/collection_newspapers.jpg';
import CollectionPastPapers from '../../assets/images/collectionpastpapers.jpg';

function Home (){
    return(
        <>
         <div className="main_home">
             <h1 className="outlined-text home_heading">Welcome to Our E-Resources Section</h1>
         </div>
            <div className="container">
                <h5 className="card-title">E-BOOKS SECTION</h5>
                <div className="card mb-3 border-0" style={{maxWidth:"540px;"}}>
                    <div className="row g-0">
                        <div className="col-md-4 col-xl-4 col-lg-5 col-md-8 col-sm-10 mx-auto">
                            <img src={collectionBook} id="img" className="img-fluid rounded-start" alt="cover image"/>
                        </div>
                        <div className="col-md-7  d-flex flex-column justify-content-center mx-auto">
                            <div className="card-body">
                                <p className="card-text"><small className="text-muted">Welcome to our E-Book Section, your gateway to
                                    a vast collection of digital books available at your fingertips. Our library management system offers
                                    a diverse range of e-books spanning various genres, authors, and topics, ensuring there's something for
                                    every reader. Enjoy seamless access to your favorite titles anytime, anywhere. Whether you're a student, a casual reader,
                                    or a researcher, our e-book collection is designed to enhance your reading experience and support your literary journey.</small></p>
                                <p className="card-text"><button className="btn btn-outline-success button" type="submit"><a href="/ebook">GO</a></button></p>
                            </div>
                        </div>
                    </div>
                </div>

                <h5 className="card-title">E-NEWSPAPERS SECTION</h5>
                <div className="card mb-3 border-0" style={{maxWidth:"540px;"}}>
                    <div className="row g-0">
                        <div className="col-md-4 col-xl-4 col-lg-5 col-md-7 col-sm-7 mx-auto">
                            <img src={CollectionNewsPapers} className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-7 d-flex flex-column justify-content-center mx-auto">
                            <div className="card-body">

                                <p className="card-text"><small className="text-muted">Welcome to our E-Newspapers Section, your source for a
                                    wide range of digital newspapers available at your convenience. Our library management system provides access
                                    to various newspapers covering local, national, and international news. Stay informed with up-to-date headlines,
                                    in-depth articles, and special features, all accessible anytime, anywhere. Perfect for avid news readers,
                                    researchers, and anyone looking to stay current with the latest events.</small></p>
                                <p className="card-text"><button className="btn btn-outline-success button" type="submit"><a href="/enews">GO</a></button></p>
                            </div>
                        </div>
                    </div>
                </div>

                <h5 className="card-title">E-PASTPAPERS SECTION</h5>
                <div className="card mb-3 border-0" style={{maxWidth:"540px;"}}>
                    <div className="row g-0">
                        <div className="col-md-4 col-xl-4 col-lg-5 col-md-7 col-sm-7 mx-auto">
                            <img src={CollectionPastPapers} className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-7 d-flex flex-column justify-content-center mx-auto">
                            <div className="card-body">

                                <p className="card-text"><small className="text-muted"> Explore our E-Past Papers Section, your comprehensive resource for academic past papers. Our library management system offers a diverse collection of past exam papers from various subjects and educational levels. Enhance your preparation and boost your confidence
                                    with easy access to previous exam questions and solutions. Ideal for students and educators aiming for academic excellence.</small></p>
                                <p className="card-text"><button className="btn btn-outline-success button" type="submit"><a href="/epastpapers">GO</a></button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home;