import GuestUser from "../LogginSection/GuestUser.jsx";
import {useEffect, useState} from "react";
import './HomePage.css';
import HeaderComponent from "../Header/HeaderComponent.jsx";
import FooterComponent from "../Footer/FooterComponent.jsx";
import aboutUsImg1 from "../../assets/images/aboutUSImg1.png";
import aboutUsImg2 from "../../assets/images/aboutUsImg2.png";
import aboutUsImg3 from "../../assets/images/aboutUsImg3.png";
import services from "../../assets/images/services.png";
import contactUs from "../../assets/images/contactUs.png";
import InputField from "../SubComponents/InputFields.jsx";
import Button from "../SubComponents/Button.jsx";

function HomePage() {
    const [guestUserName, setGuestUserName] = useState('');
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('guestUserName');
        setGuestUserName(name);
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
            <HeaderComponent id="homePageHeader" router1={"/"} Link1={"Home"}
                             router2={"#aboutUs"} Link2={"About Us"}
                             router3={"#services"} Link3={"Services"}
                             router4={"#contactUs"} Link4={"Contact Us"}
                             router5={"/askforum"} Link5={"Ask Forum"}
                             router6={"/ideaCorner"} Link6={"Idea Corne"}
                             router7={"/login"} Link7={"Sign In"}
            />

            <div id="homeHeader">
                <h5 id="WelcomeMessage">Welcome {guestUserName} !</h5>
                <div className="row mt-4 ms-5 w-75 text-white">
                    <div className="col-sm-6 intro-box">
                        <h1 className="pl-3 mainHeader">Books at <br/>Your <br/>Fingertips</h1>
                        <p className="mt-3 headerIntro">Streamline your reading experience with our intuitive library
                            management
                            system, making it
                            easier to
                            discover, borrow, and enjoy your favorite titles.</p>
                        <button type="button" className="btn btn-primary signUp ">Sign Up</button>
                    </div>
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
                        <p>  &nbsp;&nbsp;&nbsp;&nbsp;Welcome to our Smart Library Management System! Our platform is designed to streamline and
                            enhance the experience of managing and utilizing library resources. With features like book
                            and member management, inventory control, finance handling, and an e-resource section, we
                            offer a comprehensive solution for libraries of all sizes. Our system also includes unique
                            components like donation handling, an idea corner, an Ask from community, and an interactive
                            e-task panel , ensuring that all library operations are efficient and user-friendly. Join us
                            in creating a smarter, more connected library community</p>
                    </div>
                </div>
            </div>

            <div id="services" className="row ">
                <div id="servicesLeft" className="col-md-4">
                    <img src={services} alt=""/>
                </div>
                <div id="servicesRight" className="col-md-8 row justify-content-center">
                    <h1 id="servicesTitle">Services</h1>
                    <div id="servicesSection1" className="col-md-10 ">
                        <div className="servicesBoxDiv mx-auto d-flex justify-content-center align-items-center">
                            <ul>
                                <li>Book Management</li>
                                <li>Member Management</li>
                                <li>Inventory Management</li>
                            </ul>
                        </div>
                    </div>
                    <div id="servicesSection2" className="col-sm-6 ">
                        <div className="servicesBoxDiv mx-auto d-flex justify-content-center align-items-center">
                            <ul>
                                <li>Finance Management</li>
                                <li>E-task panel</li>
                                <li>Donation Handling</li>
                            </ul>
                        </div>
                    </div>

                    <div id="servicesSection3" className=" col-sm-6  " >
                        <div className="servicesBoxDiv mx-auto d-flex justify-content-center align-items-center">
                            <ul>
                                <li>Idea corner</li>
                                <li>Ask From Community</li>
                                <li>E-Resource section</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="contactUs" className="row">

                <div id="contactUsLeft" className="col-md-7 col-lg-8" >
                    <form className="row g-3 needs-validation" noValidate>
                        <h1 id="contactUsTitle" >Contact Us</h1>
                        <h6>Subheading for description or instructions</h6>
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
                                            feedback={"First Name."} placeholder={"sajan"}/>
                                <InputField label={"Last Name"} id={"lName"} className={"form-control "} name={"lName"}
                                            placeholder={"Hirusha"} type={"text"} handleChange={handleChange}
                                            feedback={"Last Name."}/>
                                <InputField label={"Email Address"} id={"email"} className={"form-control "}
                                            name={"email"} placeholder={"sajanhirusha1@gmail.com"} type={"email"}
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