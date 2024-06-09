import React, { useRef, useState } from 'react';
import './SubmitPostForm.css';
import axios from 'axios';
import BodyPost from '../PostComponents/BodyPost';

function SubmitPostForm({ category: initialCategory = 'none', title: initialTitle = '', description: initialDescription = '', formAvailable: initialformAvailable = false, btn_value: initialbtn_value = 'Send Post', post_id , user_id }) {
    const [formAvailable, setFormAvailable] = useState(initialformAvailable);
    const [option, setOption] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

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
            //handleDelete();
            formData.append('post_id', post_id);
            formData.append('editPost',"ok");
            await savePostonDB(formData);
        }
    };

    // async function handleDelete(){
    //     try{
    //       const res = await axios.delete(`http://localhost:80/project_1/AskFromCommunity/Upload.php`,{
    //       data:{
    //         post_id:post_id,
    //         status:"deletePost"
    //       }
    //     });
    //     console.log(res)
    //     }catch(err){
    //       console.error(err);
    //     }
    //   }  

    async function savePostonDB(formData) {
        try {
            const res = await axios.post('http://localhost:80/project_1/AskFromCommunity/UploadHandler.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormAvailable(false);
        } catch (err) {
            console.error(err);
        }
    }

    // async function editPostfromDB(formData) {
    //     for (let [key, value] of formData.entries()) {
    //         console.log(`${key}: ${value}`);
    //     }
    //     try {
    //         const res = await axios.post('http://localhost:80/project_1/AskFromCommunity/Upload.php', formData);
    //         console.log(res)
    //         setFormAvailable(false);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    return (
        <>
            {formAvailable && (
                <div className='submitPostFormBox'>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    <img src='src/Images/arrow-right.svg' style={{ width: '50px', float: 'right', cursor: 'pointer' }} onClick={handleToHideCreatePostForm} alt="Arrow" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <b>Belong to any unique category?</b>
                                    <input type="radio" name="category" value="true" onChange={handleOnOption} /> Yes
                                    <input type="radio" name="category" value="false" onChange={handleOnOption} /> NO
                                </td>
                            </tr>
                            <tr>
                                <td>Upload Image/Images</td>
                                <td>
                                    <input type="file" name="file" onChange={handleFileChange} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    {option && <input type="text" placeholder='enter category' ref={categoryRef} defaultValue={initialCategory} />}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <input type="text" ref={titleRef} placeholder='enter post title' defaultValue={initialTitle} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <textarea
                                        rows="4" cols="50"
                                        ref={descriptionRef}
                                        placeholder='enter post description'
                                        defaultValue={initialDescription}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type='submit' value={initialbtn_value} onClick={handleSubmit} />
                </div>
            )}

            <div className='submitPostFormBtn'>
                {!formAvailable && initialbtn_value === 'Send Post' && <img src="src/Images/submit-post.svg" alt="submit Post" onClick={handleToCreatePost} />}
            </div>
        </>
    );
}

export default SubmitPostForm;
