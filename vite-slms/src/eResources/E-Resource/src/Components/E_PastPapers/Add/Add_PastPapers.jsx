import {useEffect, useState} from "react";
import axios from "axios";
import './Add_PastPapers.css';
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";
import { useNavigate } from "react-router-dom";
import { userAuthFun } from "../../../../../../userAuthFun.jsx";

function Add_PastPapers(){
    const [formData, setFormData] = useState({
        id: '',
        subject: '',
        grade: '',
        year: '',
        extra: '',
        image: null,
        pdf: null
    });
    const [resMessage, setResMessage] = useState('');
    const [nextId, setNextId] = useState(null);

    const navi = useNavigate();
    const [message, setMessage] = useState('');
    useEffect(() => {
        const storedAddMessage = localStorage.getItem("message");
        if (storedAddMessage) {
            setMessage(storedAddMessage);
        }
        localStorage.removeItem("message");

    }, []);

  useEffect(() => {
    userAuthFun(navi);
  }, []);

    useEffect(() => {
        const fetchNextId = async () => {
            try {
                const res = await axios.get("http://localhost:80/project_1/E-Resource_Php/Controllers/GetPastPapersNextIdController.php");
                setNextId(res.data.next_Id);
                console.log(nextId);
            } catch (error) {
                console.error("Error fetching next ID:", error);
                setResMessage("Failed to retrieve next ID. Please try again.");
            }
        };

        fetchNextId();
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        let value;
        if (name === 'image' || name === 'pdf') {
            value = e.target.files[0];
        } else {
            value = e.target.value;
        }
        setFormData({ ...formData, [name]: value });
    };

    const updateDatabase = async () => {
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'image' || key === 'pdf') {
                formDataToSend.append(key, formData[key], formData[key].name);
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }


        try {
            console.log('Sending FormData:', ...formDataToSend.entries());
            const res = await axios.post(
                'http://localhost:80/project_1/E-Resource_Php/Controllers/AddPastPapersController.php',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('Response:', res.data);
            localStorage.setItem("message", "Successfully Added");
            setResMessage(res.data.resultMessage ? 'Operation successful' : 'Operation failed');
            window.location.reload();
        } catch (error) {
            localStorage.setItem("message",'Error Adding');
            setResMessage('File upload failed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            await updateDatabase();
        }
        form.classList.add('was-validated');
    };
    return(
        <>
            <HeaderComponent
                id="homePageHeader" router1={"/"} Link1={"Home"} router2={"/dashboard"} Link2={"DashBoard"}
                router7={"/logout"} Link7={"Log Out"}
            />
            <div className="add_EpastPapers_form">
                <div className="formContainer">
                    <h2 id="add" className="outlined-text ">Add E-Past Paper</h2>
                    <h2 style={{color:'yellow',fontSize:"16px"}}>{message}</h2>
                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-md-3">
                            <label htmlFor="validationCustom02" className="form-label">ID</label>
                            <input type="text" className="form-control" id="validationCustom02" name="id"
                                   value={nextId || ""} onChange={handleChange} disabled />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please enter a ID
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationCustomUsername" className="form-label">Subject</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustomUsername" name="subject"
                                       value={formData.subject} onChange={handleChange} required />
                                <div className="invalid-feedback">
                                    Please enter a Subject.
                                </div>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationCustomUsername" className="form-label">Grade</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustomUsername"
                                       name="grade" value={formData.grade} onChange={handleChange} required/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please enter a date.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationCustomUsername" className="form-label">Year</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustomUsername"
                                       name="year" value={formData.year} onChange={handleChange} required/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please enter a date.
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="validationCustom05" className="form-label">Extra Details</label>
                            <textarea cols="30" rows="5" className="form-control" id="validationCustom05" name="extra"
                                      value={formData.extra} onChange={handleChange} required />
                            <div className="invalid-feedback">
                                Please provide a description.
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="validationCustom06" className="form-label">Choose cover image to upload</label>
                            <input type="file" className="form-control" aria-label="file example" name="image"
                                   onChange={handleChange} accept="image/jpeg,image/png" required />
                            <div className="invalid-feedback">Please upload a Cover Image file.</div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="validationCustom06" className="form-label">Choose PDF to upload</label>
                            <input type="file" className="form-control" aria-label="file example" name="pdf"
                                   onChange={handleChange} accept="application/pdf" required />
                            <div className="invalid-feedback">Please upload a PDF file.</div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="button-container col-12">
                            <button className="btn btn-primary button" id="right-button" type="submit">Add Past Paper</button>
                        </div>
                    </form>
                </div>
            </div>

           <FooterComponent/>
        </>
    )
}

export default Add_PastPapers;