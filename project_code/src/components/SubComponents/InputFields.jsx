import './InputFields.css'

const InputField = ({
                        type,
                        className,
                        label,
                        id,
                        name,
                        placeholder,
                        value,
                        disabled = false,
                        handleChange,
                        feedback,
                        minLength,
                        requiredPattern,
                        title
                    }) => {
    return (
        <div className="col-sm-12">
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type={type}
                className={className}
                id={id}
                aria-describedby="inputGroupPrepend"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                minLength={minLength}
                required pattern={requiredPattern}
                title={title}
            />
            <div className="valid-feedback">
                Looks good!
            </div>
            <div className="invalid-feedback">
                Please choose a valid {feedback}
            </div>
        </div>
    );
};

export default InputField;