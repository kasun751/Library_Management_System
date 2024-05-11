import React, { useEffect, useState } from 'react'
import './SubmitPost.css'


function SubmitPost() {
    const [formAvailable,setFormAvailable] = useState(false);
    const [option,setOption] = useState(false);
    const [category,setCategory] = useState("")
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")

    const handleSubmitPost = () =>{
        setFormAvailable(true);
    }

    const handleOnOption = (e) =>{
        setOption((e.target.value)==="true"?true:false);
    }

    function FormPart(){
        return(
            <>
                <div className='submitPostBox'>
                    <form>
                        <label>belong to any unique category?</label>
                        < input type="radio" name="category" value="true" onChange={handleOnOption} /> Yes
                        <input type="radio" name="category" value="false" onChange={handleOnOption}/> NO
                        {option && <input type="text" value={category} onChange={((e)=>{
                            setCategory(e.target.value);
                        })} placeholder='enter category'/>
                        }
                        {<input type="text" value={title} placeholder='enter post title' onChange={((e)=>{
                        setTitle(e.target.value);
                         })}/>}
                        <input type="text" value={description} placeholder='enter post description' onChange={((e)=>{
                        setDescription(e.target.value);
                        })} /> 
                    </form>        
                </div>
            </>

        )
    }


  return (
    <>
        {formAvailable && <FormPart />} 
              
        <div className='submitPostBtn'>
                {!formAvailable && <img src="src\Images\submit-post.svg" alt="submit Post" onClick={handleSubmitPost}/>}
        </div>
    </>
  )
}

export default SubmitPost