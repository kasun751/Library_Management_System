import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './Update_NewsPapers.css';
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";
import { userAuthFun } from "../../../../../../userAuthFun.jsx";

function Update_NewsPapers() {
    const location = useLocation();
    const { Id = '', title = '', date = '', description = '', image_path = '', pdf_path = '' } = location.state || {};

    const [updateNews, setUpdateNews] = useState({ Id, title, date, description, image_path, pdf_path });
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [resMessage, setResMessage] = useState('');

    const [message, setMessage] = useState('');
    useEffect(() => {
        const storedAddMessage = localStorage.getItem("message");
        if (storedAddMessage) {
            setMessage(storedAddMessage);
        }
        localStorage.removeItem("message");

    }, []);

    useEffect(() => {
        setUpdateNews({ Id, title, date, description, image_path, pdf_path });
    }, [Id, title, date, description, image_path, pdf_path]);

    const navi = useNavigate();
  useEffect(() => {
    userAuthFun(navi);
  }, []);

    const updateHandle = (e) => {
        const { name, value } = e.target;
        setUpdateNews({ ...updateNews, [name]: value });
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'image') {
            setImageFile(files[0]);
        } else if (name === 'pdf') {
            setPdfFile(files[0]);
        }
    }

    const updateDatabase = async () => {
        const formData = new FormData();
        for (const key in updateNews) {
            formData.append(key, updateNews[key]);
        }
        if (imageFile) {
            formData.append('image', imageFile);
        }
        if (pdfFile) {
            formData.append('pdf', pdfFile);
        }

        try {
            const res = await axios.post(
                'http://localhost:80/project_1/E-Resource_Php/Controllers/UpdateNewsPapersController.php',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setResMessage(res.data.resultMessage);
            localStorage.setItem("message", "Successfully Updated");
            window.location.reload();
        } catch (error) {
            console.error('error: ', error);
            localStorage.setItem("message",'Error updating');
            setResMessage('Error updating the news');
        }
    }

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

    return (
        <>
            <HeaderComponent
                id="homePageHeader" router1={"/"} Link1={"Home"} router2={"/dashboard"} Link2={"DashBoard"}
                router7={"/logout"} Link7={"Log Out"}
            />
            <div className="update_Enewspapers_form">
                <div className="formContainer ">
                    <h2 id="add" className="outlined-text ">Update E-News Paper</h2>
                    <h2 style={{color:'yellow',fontSize:"16px"}}>{message}</h2>
                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">ID</label>
                            <input type="text" className="form-control" id="validationCustom02" name="Id"
                                   value={updateNews.Id} onChange={updateHandle} disabled />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please enter a ID
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustomUsername" className="form-label">Title</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustomUsername" name="title"
                                       value={updateNews.title} onChange={updateHandle} required />
                                <div className="invalid-feedback">
                                    Please enter a Book Title.
                                </div>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustomUsername" className="form-label">Date</label>
                            <div className="input-group has-validation">
                                <input type="date" className="form-control" id="validationCustomUsername" name="date"
                                       value={updateNews.date} onChange={updateHandle} required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please enter a date.
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="validationCustom05" className="form-label">Description</label>
                            <textarea cols="30" rows="5" className="form-control" id="validationCustom05" name="description"
                                      value={updateNews.description} onChange={updateHandle} required />
                            <div className="invalid-feedback">
                                Please provide a description.
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="validationCustom06" className="form-label">Choose cover image to upload</label>
                            {updateNews.image_path && <a href={updateNews.image_path} target="_blank" > View Existing Cover Image</a>}
                            <input type="file" className="form-control" aria-label="file example" name="image"
                                   onChange={handleFileChange} accept="image/jpeg,image/png"/>
                            <div className="invalid-feedback">Please upload a Cover Image file.</div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="validationCustom06" className="form-label">Choose PDF to upload</label>
                            {updateNews.pdf_path && <a href={updateNews.pdf_path} target="_blank">View Existing PDF</a>}
                            <input type="file" className="form-control" aria-label="file example" name="pdf"
                                   onChange={handleFileChange} accept="application/pdf" />
                            <div className="invalid-feedback">Please upload a PDF file.</div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="button-container col-12">
                            <button className="btn btn-primary button" id="right-button" type="submit">Update Paper</button>
                        </div>
                    </form>
                </div>
            </div>

            <FooterComponent/>
        </>
    );
}

export default Update_NewsPapers;
