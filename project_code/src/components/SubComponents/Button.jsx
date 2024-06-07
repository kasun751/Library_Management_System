
function Button({keyword,submit}) {
    return (
        <div className="col-12">
            <button className="btn btn-primary feildDisabled" type="submit" onClick={submit}>{keyword}</button>
        </div>
    );
}

export default Button;