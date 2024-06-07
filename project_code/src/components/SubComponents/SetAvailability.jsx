function SetAvailability({handleChange}) {
    return (
        <div className="col-md-3">
            <label htmlFor="validationAvailability" className="form-label">Set Availability</label>
            <select className="form-select" id="validationAvailability" required name="setAvailability" onChange={handleChange}>
                <option value=""> Chose...</option>
                <option value="available">Available</option>
                <option value="notAvailable">Not Available</option>
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