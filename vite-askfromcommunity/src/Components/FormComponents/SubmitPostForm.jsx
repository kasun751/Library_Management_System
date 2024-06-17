import React, { useContext, useRef, useState } from 'react';
import './SubmitPostForm.css';
import axios from 'axios';
import {userAuthentication} from '../../App';

function SubmitPostForm({ category: initialCategory = 'none', title: initialTitle = '', description: initialDescription = '', formAvailable: initialformAvailable = false, btn_value: initialbtn_value = 'Send Post', post_id }) {
    const [formAvailable, setFormAvailable] = useState(initialformAvailable);
    const [option, setOption] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const categoryRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();

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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
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

        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        if (initialbtn_value === "Send Post") {
            formData.append('editPost',"no");
            await savePostonDB(formData);
        } else {
            formData.append('post_id', post_id);
            formData.append('editPost',"ok");
            await savePostonDB(formData);
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
                    <form>
                    <div className="row">
                        <div >
                            <img id='submitForm-back-btn' src='src/Images/arrow-right.svg' onClick={handleToHideCreatePostForm} alt="Arrow" />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="file" id="formFile" name="file" onChange={handleFileChange} />
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
                            <input className="form-control" type="text" ref={titleRef} placeholder='enter post title' defaultValue={initialTitle} id="exampleFormControlInput1"  />
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" cols="50"
                            ref={descriptionRef}
                            placeholder='enter post description'
                            defaultValue={initialDescription}></textarea>
                        </div>
                    <input type='submit' value={initialbtn_value} onClick={handleSubmit} />
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
