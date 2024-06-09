
function Button({keyword1="",keyword2="",keyword3="",submit}) {
    return (
        <div className="col-12">
            <button className="btn btn-primary feildDisabled" type="submit" onClick={() => submit(keyword1,keyword3)}>{keyword2}</button>
        </div>
    );
}

export default Button;