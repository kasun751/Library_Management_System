import Navigation from "../../HeaderContent/Navigation.jsx";
import './remove.css';
const Remove = () =>{

    return(
        <div>
            <Navigation />
            <div className="remove_container">
                <h2>Remove E-Book</h2>
                <form className="row g-3 needs-validation" noValidate >
                    <div className="col-md-4">
                        <label htmlFor="validationCustom01" className="form-label">ID</label>
                        <input type="text" className="form-control" id="validationCustom01" name="id"
                               required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter a valid ID.
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustomUsername" className="form-label">Title</label>
                        <div className="input-group has-validation">
                            <input type="text" className="form-control" id="validationCustomUsername" name="title"
                                    required />
                            <div className="invalid-feedback">
                                Please enter a Book Title.
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Remove Book</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Remove;