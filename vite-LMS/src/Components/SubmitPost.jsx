import React, { useEffect, useState } from 'react';
import './SubmitPost.css';
import axios from 'axios';

function SubmitPost() {
    const [formAvailable, setFormAvailable] = useState(false);
    const [option, setOption] = useState(false);
    const [category, setCategory] = useState("none");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleToCreatePost = () => {
        setFormAvailable(true);
    };

    const handleToHideCreatePostForm = () => {
        setFormAvailable(false);
    };

    const handleOnOption = (e) => {
        setOption(e.target.value === "true");
    };

    async function savePostonDB(){
        try{
            const response = await axios.post(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
                category:category,
                title:title,
                description:description,
                member_id : "A12"
            });
            setCategory("none");
            setTitle("");
            setDescription("");
            console.log(response);
        }catch(err){
            console.error(err);
        }
    }

    const[focusCategory,setFocusCategory]=useState(false)
    const[focusTitle,setfocusTitle]=useState(false)
    const[focusDescription,setfocusDescription]=useState(false)

    const setFocus=(input)=>{
        switch(input){
            
            case "c":
                setFocusCategory(true);
                setfocusTitle(false)
                setfocusDescription(false)
                console.log(input);
                break;
            case "t":
                setFocusCategory(false);
                setfocusTitle(true)
                setfocusDescription(false)
                console.log(input);
                break;
            case "d":
                setFocusCategory(false);
                setfocusTitle(false)
                setfocusDescription(true)
                console.log(input);
                break;
        }
    }

    function FormPart() {
        return (
            <div className='submitPostBox'>
                
                    <table style={{width:'100%'}}>
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
                                <td>
                                    
                                </td>
                                <td>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    {option && <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='enter category' onClick={() => setFocus("c")}  autoFocus={focusCategory}/>}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <input type="text" value={title} placeholder='enter post title' onChange={(e) => setTitle(e.target.value)} onClick={() => setFocus("t")}  autoFocus={focusTitle} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <input
                                        type="text"
                                        value={description}
                                        placeholder="Enter your description"
                                        onChange={(e) => setDescription(e.target.value)} onClick={() => setFocus("d")}  autoFocus={focusDescription}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type='submit' value="Post" onClick={savePostonDB} />
                
            </div>
        );
    }

    return (
        <>
            {formAvailable && <FormPart />}

            <div className='submitPostBtn'>
                {!formAvailable && <img src="src/Images/submit-post.svg" alt="submit Post" onClick={handleToCreatePost} />}
            </div>
        </>
    );
}

export default SubmitPost;
