import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './Update_PastPapers.css';
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";

function Update_NewsPapers() {
    const location = useLocation();
    const { id = '', subject = '', grade = '', year = '',extra='', image_path = '', pdf_path = '' } = location.state || {};

    const [updatePapers, setUpdatePapers] = useState({ id, subject, grade, year,extra, image_path, pdf_path });
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [resMessage, setResMessage] = useState('');

    useEffect(() => {
        setUpdatePapers({ id, subject, grade, year,extra, image_path, pdf_path});
    }, [id, subject, grade, year,extra, image_path, pdf_path]);

    const updateHandle = (e) => {
        const { name, value } = e.target;
        setUpdatePapers({ ...updatePapers, [name]: value });
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
        for (const key in updatePapers) {
            formData.append(key, updatePapers[key]);
        }
        if (imageFile) {
            formData.append('image', imageFile);
        }
        if (pdfFile) {
            formData.append('pdf', pdfFile);
        }

        try {
            const res = await axios.post(
                'http://localhost/Lbrary%20Management%20System/E-Resource_Php/Controllers/UpdatePastPapersController.php',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setResMessage(res.data.resultMessage);
            console.log(res.data);
        } catch (error) {
            console.error('error: ', error);
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
                id="homePageHeader" router1={"/"} Link1={"Home"}
                router2={"/logout"} Link4={"Log Out"}
            />
            <div className="Update_pasrpapers_form">
                <div className="formContainer">
                    <h2 id="add" className="outlined-text ">Update E-Past Paper</h2>
                    <h2 style={{color:'yellow'}}>{resMessage}</h2>
                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-md-3">
                            <label htmlFor="validationCustom02" className="form-label">ID</label>
                            <input type="text" className="form-control" id="validationCustom02" name="Id"
                                   value={updatePapers.id} onChange={updateHandle} disabled />
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
                                       value={updatePapers.subject} onChange={updateHandle} required />
                                <div className="invalid-feedback">
                                    Please enter a Book Title.
                                </div>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationCustomUsername" className="form-label">Grade</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustomUsername" name="grade"
                                       value={updatePapers.grade} onChange={updateHandle} required />
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
                                <input type="text" className="form-control" id="validationCustomUsername" name="year"
                                       value={updatePapers.year} onChange={updateHandle} required />
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
                                      value={updatePapers.extra} onChange={updateHandle} required />
                            <div className="invalid-feedback">
                                Please provide a description.
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="validationCustom06" className="form-label">Choose cover image to upload</label>
                            {updatePapers.image_path && <a href={updatePapers.image_path} target="_blank" > View Existing Cover Image</a>}
                            <input type="file" className="form-control" aria-label="file example" name="image"
                                   onChange={handleFileChange} accept="image/jpeg,image/png"/>
                            <div className="invalid-feedback">Please upload a Cover Image file.</div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="validationCustom06" className="form-label">Choose PDF to upload</label>
                            {updatePapers.pdf_path && <a href={updatePapers.pdf_path} target="_blank">View Existing PDF</a>}
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
