import {useState} from "react";
import axios from "axios";

function Add_NewsPapers(){

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        image: null,
        pdf: null
    });
    const [resMessage, setResMessage] = useState('');

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
                'http://localhost/Lbrary%20Management%20System/E-Resource_Php/AddNewsPapers.php',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('Response:', res.data);
            setResMessage(res.data.resultMessage ? 'Operation successful' : 'Operation failed');
        } catch (error) {
            console.error('Error uploading file:', error);
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
            <div className="formContainer">
                <h2>Add E-News Paper</h2>
                <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom02" className="form-label">ID</label>
                        <input type="text" className="form-control" id="validationCustom02" name="id"
                               value={formData.id} onChange={handleChange} required />
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
                                   value={formData.title} onChange={handleChange} required />
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
                            <input type="date" className="form-control" id="validationCustomUsername" placeholder="2024 june 25"
                                   name="date" value={formData.date} onChange={handleChange} required/>
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
                                  value={formData.description} onChange={handleChange} required />
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
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Add News Paper</button>
                    </div>
                </form>
            </div>
            <div>
                <p>Response from PHP script: {resMessage}</p>
            </div>
        </>
    )
}

export default Add_NewsPapers;
