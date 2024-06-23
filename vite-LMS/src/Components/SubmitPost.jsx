import React, { useRef, useState } from 'react';
import './SubmitPost.css';
import axios from 'axios';
//ok
function SubmitPost({ category: initialCategory = 'none', title: initialTitle = '', description: initialDescription = '', formAvailable: initialformAvailable = false, btn_value: initialbtn_value = 'Send Post', post_id }) {
    const [formAvailable, setFormAvailable] = useState(initialformAvailable);
    const [option, setOption] = useState(false);

    const categoryRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();

    const handleToCreatePost = () => {
        setFormAvailable(true);
    };

    const handleToHideCreatePostForm = () => {
        setFormAvailable(false);
    };

    const handleOnOption = (e) => {
        setOption(e.target.value === "true");
    };

    const handleSubmit = () => {
        let cate="";
        try{
            cate=categoryRef.current.value;
        }catch(err){
            cate = "none";
        }
        const formData = {
            category: cate,
            title: titleRef.current.value,
            description: descriptionRef.current.value
        };
        console.log(formData.category);

        if (initialbtn_value === "Send Post") {
            savePostonDB(formData);
        } else {
            editPostfromDB(formData);
        }
    }

    async function savePostonDB(formData) {
        try {
            await axios.post(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`, {
                ...formData,
                user_id: "A12"
            });
            setFormAvailable(false);
        } catch (err) {
            console.error(err);
        }
    }

    async function editPostfromDB(formData) {
        try {
            await axios.put(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`, {
                ...formData,
                post_id: post_id
            });
            setFormAvailable(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {formAvailable && (
                <div className='submitPostBox'>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    <img src='src/Images/arrow-right.svg' style={{ width: '50px', float: 'right', cursor: 'pointer' }} onClick={handleToHideCreatePostForm} alt="Arrow" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Belong to any unique category?</b>
                                    <input type="radio" name="category" value="true" onChange={handleOnOption} /> Yes
                                    <input type="radio" name="category" value="false" onChange={handleOnOption} /> NO
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    {option && <input type="text" ref={categoryRef} defaultValue={initialCategory} />}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <input type="text" ref={titleRef} defaultValue={initialTitle} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <input
                                        type="text"
                                        ref={descriptionRef}
                                        defaultValue={initialDescription}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type='submit' value={initialbtn_value} onClick={handleSubmit} />
                </div>
            )}

            <div className='submitPostBtn'>
                {!formAvailable && (initialbtn_value==='Send Post'? true:false) && <img src="src/Images/submit-post.svg" alt="submit Post" onClick={handleToCreatePost} />}
            </div>
        </>
    );
}

export default SubmitPost;
