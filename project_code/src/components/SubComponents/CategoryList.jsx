function CategoryList({value,handleChange,categoryList}) {
    return (
        <div className="col-md-3">
            <label htmlFor="validationCustom04" className="form-label">Category</label>
            <select className="form-select feildDisabled" id="validationCustom04" required name="category"
                    value={value} onChange={handleChange}>
                <option value="" disabled> select Category</option>
                {Array.isArray(categoryList)?(categoryList.map((category, index) => (
                    <option key={index} value={category.Category_Name}>{category.Category_Name}</option>
                ))):""}
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
export default CategoryList