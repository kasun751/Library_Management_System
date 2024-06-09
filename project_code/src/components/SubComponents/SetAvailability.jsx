function SetAvailability({handleChange,parameter}) {
    let notAvailable;
    switch(parameter) {
        case "addBook":
            notAvailable = "stillNotAdded";
            break;
        case "issueBook":
            notAvailable="bookIssued";
            break;
    }
    return (
        <div className="col-md-3">
            <label htmlFor="validationAvailability" className="form-label">Set Availability</label>
            <input type="hidden" name="parameter" value={parameter || ""}/>
            <select className="form-select" id="validationAvailability" required name="setAvailability" onChange={handleChange}>
                <option value=""> Chose...</option>
                <option value="available">Available</option>
                <option value={notAvailable}>Not Available</option>
            </select>
            <div className="valid-feedback">
                Looks good!
            </div>
            <div className="invalid-feedback">
                Please select a valid Category.
            </div>
        </div>
    );
}

export default SetAvailability;