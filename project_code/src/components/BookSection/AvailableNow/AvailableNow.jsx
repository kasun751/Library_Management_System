import InputField from "../../SubComponents/InputFields.jsx";

const AvailableNow = () => {
    // const handleChange = (e) => {
    //     if (e.target.name == "bookID") {
    //         getBookIdDetails({[e.target.name]: e.target.value});
    //         setData(preValues => ({...preValues, [e.target.name]: e.target.value}));
    //     }
    //     if (e.target.name == "userID") {
    //         getUserIDDetails({[e.target.name]: e.target.value});
    //     }
    //
    //     const name = e.target.name;
    //     const value = e.target.value;
    //
    //     setInputs(preValues => ({...preValues, [name]: value}))
    // }
    return (
       <>
           <InputField label={"Book ID"} id={"validationBookID1"} className={"form-control"} placeholder={"EX: SLMS/24/1"}
                       name={"bookID"} type={"text"}  feedback={"Book ID."}/>
           {/*add handlechange to input*/}
       </>
    );
};

export default AvailableNow;