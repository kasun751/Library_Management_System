import GuestUser from "../LogginSection/GuestUser.jsx";
import {useEffect, useState} from "react";
import './HomePage.css';
import HeaderComponent from "../Header/HeaderComponent.jsx";
import FooterComponent from "../Footer/FooterComponent.jsx";
import aboutUsImg1 from "../../assets/images/aboutUSImg1.png";
import aboutUsImg2 from "../../assets/images/aboutUsImg2.png";
import aboutUsImg3 from "../../assets/images/aboutUsImg3.png";
import sliderImage1 from "../../assets/images/sliderImage1.png";
import sliderImage2 from "../../assets/images/sliderImage2.png";
import sliderImage3 from "../../assets/images/sliderimage3.png";
import services from "../../assets/images/services.png";
import contactUs from "../../assets/images/contactUs.png";
import InputField from "../SubComponents/InputFields.jsx";
import Button from "../SubComponents/Button.jsx";
import {Link} from "react-router-dom";
import ScrollReveal from "scrollreveal"
import Typed from "typed.js";
import { getUserType } from "../../../../userAuthFun.jsx";
function HomePage() {
    const [guestUserName, setGuestUserName] = useState('');
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('guestUserName');
        setGuestUserName(name);
        ScrollReveal({
            distance:'80px',
            duration:2000,
            delay:200,
        });
        ScrollReveal().reveal('#servicesTitle,#contactUs', { origin:'top' });
        ScrollReveal().reveal('' , { origin:'bottom' });
        ScrollReveal().reveal('#aboutUsLeft,#aboutUsRight,#contactUsTitle' , { origin:'left' });
        ScrollReveal().reveal('#aboutUsTitle,.servicesBoxDiv' , { origin:'right' });

        const typed = new Typed('#fingertips', {
            strings: ['Fingertips'],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 2000,
            showCursor: false  // Disable Typed.js cursor
        });
        
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(preValues => ({...preValues, [name]: value}))
    }

    function submit() {
        (async () => {
            'use strict'


            const forms = document.querySelectorAll('.needs-validation')

            await new Promise((resolve, reject) => {
                Array.from(forms).forEach(form => {
                    form.addEventListener('submit', event => {
                        form.classList.add('was-validated');   //was-validated This class is commonly used in Bootstrap forms to indicate that the form has been validated.

                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                            reject(false)
                            console.log("not complete");
                        } else {
                            console.log('validate true')
                            resolve(true)
                            event.preventDefault()

                        }

                    })
                })
            }).then(res => {
                if (res) {
                    updateDatabase();
                    console.log(inputs);
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    return (
        <div id="HomePage">
            <GuestUser/>
            <HeaderComponent id="homePageHeader" 
                             router1={"#aboutUs"} Link1={"About Us"}
                             router2={"#services"} Link2={"Services"}
                             router3={"#contactUs"} Link3={"Contact Us"}
                             router4={"/dashboard"} Link4={"Dashboard"}
                             router7={"/login"} Link7={getUserType() != "guest" ? "Log Out" : "Sign In"}
            />


<div id="homeHeader">
  <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active" data-bs-interval="10000">
        <h5 id="WelcomeMessage">Welcome {guestUserName}!</h5>
        <img src={sliderImage2} className="d-block w-100" alt="sliderImg1" />
        
        {/* Dark overlay */}
        <div className="dark-overlay"></div>

        <div className="carousel-caption d-none d-md-block text-start">
          <h1 className="pl-3 mainHeader">Books at <br />Your <br /><span id="fingertips" style={{color:"yellow"}}></span></h1>
          <p className="mt-3 headerIntro">Streamline your reading experience with our intuitive library management
            system, making it easier to discover, borrow, and enjoy your favorite titles.</p>
          <Link id="createAccountLink" className="btn btn-primary signUp" to="/register">Sign Up</Link>
        </div>
      </div>

      <div className="carousel-item" data-bs-interval="2000">
        <h5 id="WelcomeMessage">Welcome {guestUserName}!</h5>
        <img src={sliderImage1} className="d-block w-100" alt="sliderImg2" />
        
        {/* Dark overlay */}
        <div className="dark-overlay"></div>

        <div className="carousel-caption d-none d-md-block text-start">
          <h1 className="pl-3 mainHeader">Explore Stories  <br />with a <br /> <span style={{color:"yellow"}}>Simple Touch   </span></h1>
          <p className="mt-3 headerIntro">Streamline your reading experience with our intuitive library management
            system, making it easier to discover, borrow, and enjoy your favorite titles.</p>
          <Link id="createAccountLink" className="btn btn-primary signUp" to="/register">Sign Up</Link>
        </div>
      </div>

      <div className="carousel-item">
        <h5 id="WelcomeMessage">Welcome {guestUserName}!</h5>
        <img src={sliderImage3} className="d-block w-100" alt="sliderImg3" />
        
        {/* Dark overlay */}
        <div className="dark-overlay"></div>
        <div className="carousel-caption d-none d-md-block text-start">
          <h1 className="pl-3 mainHeader">Unlock the<br />  World <br /><span style={{color:"yellow"}}>of Books </span></h1>
          <p className="mt-3 headerIntro">Streamline your reading experience with our intuitive library management
            system, making it easier to discover, borrow, and enjoy your favorite titles.</p>
          <Link id="createAccountLink" className="btn btn-primary signUp" to="/register">Sign Up</Link>
        </div>
      </div>
    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>

    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</div>


            <div id="aboutUs" className="row">
                <h1 id="aboutUsTitle">About Us</h1>
                <div id="aboutUsLeft" className="col-sm-7 row">
                    <div className="col-sm-6 img1 "><img className="col-sm-12 " src={aboutUsImg3} alt=""/>
                    </div>
                    <div className="col-sm-6 col-xl-6">
                        <img className="col-lg-12  img2" src={aboutUsImg1} alt=""/><br/><br/>
                        <img className="col-lg-12  img3" src={aboutUsImg2} alt=""/>
                    </div>
                </div>
                <div id="aboutUsRight" className="col-sm-5">
                <div id="content" className="mt-4 px-sm-2 px-lg-5 py-5">
    <p style={{ fontSize: "20px", textAlign: "justify" }}> 
        Welcome to our Smart Library Management System!
    </p>
    <p style={{ textAlign: "justify" }}> 
        Our platform is designed to streamline and enhance the experience of managing and utilizing library resources. 
        With features like book and member management, and an e-resource section, we offer a comprehensive solution for 
        libraries of all sizes.
    </p>
    <p style={{ textAlign: "justify" }}> 
        Our system also includes unique components like donation handling, an idea corner, an Ask from community, and an 
        interactive e-task panel, ensuring that all library operations are efficient and user-friendly. Join us in 
        creating a smarter, more connected library community.
    </p>
</div>

                </div>
            </div>

            <div id="services" className="row ">
                <div id="servicesLeft" className="col-md-4">
                    <img src={services} alt=""/>
                </div>
                <div id="servicesRight" className="col-md-8 row justify-content-center">
                    <h1 id="servicesTitle">Our Services</h1>
                    <div id="servicesSection1" className="col-md-10 ">
                        <div className="servicesBoxDiv mx-auto d-flex justify-content-center align-items-center">
                            <ul>
                                <li>Book Management</li>
                                <li>Member Management</li>
                            </ul>
                        </div>
                    </div>
                    <div id="servicesSection2" className="col-sm-6 ">
                        <div className="servicesBoxDiv mx-auto d-flex justify-content-center align-items-center">
                            <ul>
                                <li>E-task Panel</li>
                                <li>Donation Handling</li>
                            </ul>
                        </div>
                    </div>

                    <div id="servicesSection3" className=" col-sm-6  " >
                        <div className="servicesBoxDiv mx-auto d-flex justify-content-center align-items-center">
                            <ul>
                                <li>Idea Corner</li>
                                <li>Ask From Community</li>
                                <li>E-Resources Section</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="contactUs" className="row">

                <div id="contactUsLeft" className="col-md-7 col-lg-8" >
                    <form className="row g-3 needs-validation" noValidate>
                        <h1 id="contactUsTitle" >Contact Us</h1>
                        <div>
                            {message && (
                                <p id="categoryAddingResponse" style={{
                                    display: 'initial',
                                    color: message === "Book Added successfully." ? 'green' : 'red',
                                }}>
                                    {message}
                                </p>
                            )}
                        </div>
                        <div>
                                <InputField label={"First Name"} id={"fName"} className={"form-control "}
                                            name={"fName"} type={"text"} handleChange={handleChange}
                                            feedback={"First Name."} placeholder={"Sajan"}/>
                                <InputField label={"Last Name"} id={"lName"} className={"form-control "} name={"lName"}
                                            placeholder={"Hirusha"} type={"text"} handleChange={handleChange}
                                            feedback={"Last Name."}/>
                                <InputField label={"Email Address"} id={"email"} className={"form-control "}
                                            name={"email"} placeholder={"Sajanhirusha1@gmail.com"} type={"email"}
                                            handleChange={handleChange} feedback={"Email Address."}/>

                                <div className="col-sm-12">
                                    <label htmlFor="validationCustom03" className="form-label ">Your Message</label>
                                    <textarea className="form-control feildDisabled " id="validationCustom03" rows="4"
                                              cols="50" name="description"
                                              placeholder={"Enter your question or message"}
                                              onChange={handleChange} required/>
                                </div>

                                <Button id={"submit"} keyword2={"Submit"}  submit={submit}/>
                        </div>
                    </form>
                </div>
                <div id="contactUsRight" className="col-md-5 col-lg-4" >
                    <img src={contactUs} alt=""/>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}

export default HomePage;