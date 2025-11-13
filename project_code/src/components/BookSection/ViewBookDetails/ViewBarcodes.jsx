import InputField from "../../SubComponents/InputFields.jsx";
import axios from "axios";
import {useState} from "react";
import Button from "../../SubComponents/Button.jsx";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";
import './ViewBarcodes.css';

function ViewBarcodes() {

    const [input, setInput] = useState({});
    const [barcodeImage, setBarcodeImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInput(prevInput => ({...prevInput, [name]: value}))
    }


    const getBookIdBarcodes = async (ID, barcodeParameter) => {
        console.log(ID)
        console.log(barcodeParameter)
        setLoading(true);
        await axios.get('http://localhost:8081/project_01/controllers/BookIDDataController.php', {
            params: {
                ID: ID,
                barcodeParameter: barcodeParameter
            }
        })
            .then(response => {
                setBarcodeImage(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    function submit(barcodeParameter) {

        (async () => {
            'use strict'
            const forms = document.querySelectorAll('.needs-validation')
            await new Promise((resolve, reject) => {
                Array.from(forms).forEach(form => {
                    form.addEventListener('submit', event => {
                        form.classList.add('was-validated');
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
                    switch (barcodeParameter) {
                        case 0:
                            getBookIdBarcodes(input.bookID, 0);
                            break;
                        case 1:
                            getBookIdBarcodes(input.isbnNumber, 1);
                            break;
                    }

                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    console.log(barcodeImage)
    return (
        <div id="viewBarcodes" className="bookSectionCommonClass bookSectionCommonTableClass">
            {loading && <CircleSpinner/>}
            <HeaderComponent Link1={"Home"} router1={"/bookSection"} Link7={"Log Out"} router7={""}/>
            <div id="viewBarcodesForms" className="bookSectionCommonFormClass">
                <h1>Get Barcodes</h1><br/>
                <form className="row g-3 needs-validation" noValidate>
                    <div id="allbooksBarcodeAccordingToIsbn">
                        <h5 className="barcodesubTopic">All Books Barcodes According To The ISBN</h5><br/>
                        <div className="row align-items-center w-75 mx-auto " >
                            <div className="col-auto px-0" >
                                <InputField label={"ISBN Number"} id={"isbnNumber"} className={"form-control w-100 "}
                                            name={"isbnNumber"} type={"text"} handleChange={handleChange}
                                            feedback={"ISBN Number."}
                                />
                            </div>
                            <div className="col-auto barcodeButton">
                                <Button id={"submit2"} keyword2={"Get Barcodes"} submit={() => submit(1)}
                                        className="btn btn-primary"/>
                            </div>
                        </div>
                    </div>
                </form>
                <br/>
                <div >
                    <table className="table w-75 mx-auto">
                        <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Book ID</th>
                            <th scope="col">Barcode</th>
                        </tr>
                        </thead>
                        <tbody>
                        {barcodeImage && typeof barcodeImage === 'object' && Object.keys(barcodeImage).length > 0 ? (
                            Array.isArray(barcodeImage.base64Image) && barcodeImage.base64Image.length > 0 ? (
                                barcodeImage.base64Image.map((barcode, index) => (
                                    <tr key={index}>
                                        <td className="booDetails">{index + 1}</td>
                                        <td className="booDetails">{barcode.Final_ID}</td>
                                        <td className="booDetails">
                                            <img src={`data:image/png;base64,${barcode.barcode_image}`} alt={`Barcode ${index}`} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No Barcodes.</td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="5">No Barcodes.</td>
                            </tr>
                        )}

                        </tbody>
                    </table>
                </div>
                <br/>
                <br/>
                <form className="row g-3 needs-validation" noValidate>
                    <div id="singleBookBarcode">
                        <h5 className="barcodesubTopic">Get single Book barcode</h5><br/>
                        <div className="row align-items-center w-75 mx-auto" >
                            <div className="col-auto singleBarcodeInput">
                                <InputField label={"Book ID"} id={"bookID"} className={"form-control w-100"}
                                            name={"bookID"} type={"text"} handleChange={handleChange}
                                            feedback={"Book ID."}
                                />
                            </div>
                            <div className="col-auto barcodeButton">
                                <Button id={"submit1"} keyword2={"Get Barcode"} submit={() => submit(0)}
                                        className="btn btn-primary mt-2"/>
                            </div>
                        </div>
                        <br/>
                        <table className="table w-75 mx-auto">
                            <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Book ID</th>
                                <th scope="col">Barcode</th>
                            </tr>
                            </thead>
                            <tbody>
                            {barcodeImage !== null && !(Array.isArray(barcodeImage.base64Image)) ? (
                                <tr>
                                    <td className="booDetails">01</td>
                                    <td className="booDetails">{barcodeImage.bookID}</td>
                                    <td className="booDetails"><img src={`data:image/png;base64,${barcodeImage.base64Image}`}
                                                                    alt="Barcode"/></td>
                                </tr>

                            ) : (
                                <tr>
                                    <td colSpan="5">No Barcodes.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </form>


            </div>
            <FooterComponent/>
        </div>
    )


}

export default ViewBarcodes;