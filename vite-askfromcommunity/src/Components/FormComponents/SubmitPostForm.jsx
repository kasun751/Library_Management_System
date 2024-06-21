import React, { useContext, useRef, useState } from 'react';
import './SubmitPostForm.css';
import axios from 'axios';
import {userAuthentication} from '../../App';

function SubmitPostForm({ category: initialCategory = 'none', title: initialTitle = '', description: initialDescription = '', formAvailable: initialformAvailable = false, btn_value: initialbtn_value = 'Send Post', post_id }) {
    const [formAvailable, setFormAvailable] = useState(initialformAvailable);
    const [option, setOption] = useState(false);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    const [isShowWarning, setIsShoWarning] = useState(false);

    const categoryRef = useRef("");
    const titleRef = useRef("");
    const descriptionRef = useRef("");

    const{user_id, user_type} = useContext(userAuthentication);

    const handleToCreatePost = () => {
        setFormAvailable(true);
    };

    const handleToHideCreatePostForm = () => {
        setFormAvailable(false);
    };

    const handleOnOption = (e) => {
        setOption(e.target.value === "true");
    };

    const handleFileChange1 = (e) => {
        setSelectedFile1(e.target.files[0]);
    };
    const handleFileChange2 = (e) => {
        setSelectedFile2(e.target.files[0]);
    };
    const handleFileChange3 = (e) => {
        setSelectedFile3(e.target.files[0]);
    };
    
    const validateImgFiles = () =>{
        let returnStatement = "";
        const imageSizes = (selectedFile1?.size || 0) + (selectedFile2?.size || 0) + (selectedFile3?.size || 0);
        const allowedFileTypes = ["image/jped","image/png","image/gif","image/svg+xml","image/svg"]
        if((selectedFile1?(allowedFileTypes.includes(selectedFile1?.type)):true)&&(selectedFile2?(allowedFileTypes.includes(selectedFile2?.type)):true)&&(selectedFile3?(allowedFileTypes.includes(selectedFile3?.type)):true)&&(imageSizes<5242880)){
            return "";
        }
        else if(!((selectedFile1?(allowedFileTypes.includes(selectedFile1?.type)):true)&&(selectedFile2?(allowedFileTypes.includes(selectedFile2?.type)):true)&&(selectedFile3?(allowedFileTypes.includes(selectedFile3?.type)):true))){
            returnStatement= "please upload jpg, png, gif, svg files only.";
        }
         if(!(imageSizes<5242880)){
            returnStatement+= "Check average images size are less than 5MB";
        }
        return returnStatement;
    }

    const handleSubmit = async () => {
        if(validateImgFiles()==""){
            setIsShoWarning(false);
            if((titleRef.current.value !== "") && (descriptionRef.current.value!="")){
                let cate = "";
                try {
                    cate = categoryRef.current.value;
                } catch (err) {
                    cate = "none";
                }
                
                const formData = new FormData();
                formData.append('category', cate);
                formData.append('title', titleRef.current.value);
                formData.append('description', descriptionRef.current.value);
                formData.append('user_id', user_id);
    
                if (selectedFile1) {
                    formData.append('file1', selectedFile1);
                }
                if (selectedFile2) {
                    formData.append('file2', selectedFile2);
                }
                if (selectedFile3) {
                    formData.append('file3', selectedFile3);
                }
    
                if (initialbtn_value === "Send Post") {
                    formData.append('editPost',"no");
                    await savePostonDB(formData);
                } else {
                    formData.append('post_id', post_id);
                    formData.append('editPost',"ok");
                    await savePostonDB(formData);
                }
            }
        }else{
            setIsShoWarning(true);
        }
    };  

    async function savePostonDB(formData) {
        try { //ok
            const res = await axios.post('http://localhost:80/project_1/AskFromCommunity/Controller/postController.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res)
            setFormAvailable(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {formAvailable && (
                <div className='container submitPostFormBox col-lg-6'>
                    <form className="was-validated">
                    <div className="row">
                        <div >
                            <img id='submitForm-back-btn' src='src/Images/arrow-right.svg' onClick={handleToHideCreatePostForm} alt="Arrow" />
                        </div>
                        <b>You can upload maxium 3 images</b>
                        <div className='file-upload-container'>
                            <div className="mb-3">
                                <input className="form-control" type="file" id="formFile" name="file1" onChange={handleFileChange1} required/>
                            </div>
                            <div className="mb-3">
                                <input className="form-control" type="file" id="formFile" name="file2" onChange={handleFileChange2} required/>
                            </div>
                            <div className="mb-3">
                                <input className="form-control" type="file" id="formFile" name="file3" onChange={handleFileChange3} required/>
                            </div>
                        </div>
                        <b>Belong to any unique category?</b>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" value="true" onChange={handleOnOption} id="flexRadioDefault1" />
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" value="false" onChange={handleOnOption}/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        {option && <div className="mb-3">
                            <input type="text" className="form-control" placeholder='enter category' ref={categoryRef} defaultValue={initialCategory} id="exampleFormControlInput1"  />
                        </div>}
                        <div className="mb-3">
                            <input className="form-control" type="text" ref={titleRef} placeholder='enter post title' defaultValue={initialTitle} id="exampleFormControlInput1" required />
                            <div className="invalid-feedback">invalid</div>
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" id="validationTextarea" rows="4" cols="50"
                            ref={descriptionRef}
                            placeholder='enter post description'
                            defaultValue={initialDescription} required></textarea>
                            <div className="invalid-feedback">invalid</div>
                        </div>
                        {isShowWarning&&<div id='warning-msg'><p>{validateImgFiles()}</p></div>}
                    <input type='button' value={initialbtn_value} onClick={handleSubmit} />
                </div>
                </form>
            </div>
            )}

            <div className='submitPostFormBtn'>
                {!formAvailable && initialbtn_value === 'Send Post' && <img src="src/Images/submit-post.svg" alt="submit Post" onClick={handleToCreatePost} />}
            </div>
        </>
    );
}

export default SubmitPostForm;
