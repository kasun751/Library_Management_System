import React, { createContext, useEffect, useState } from 'react';
import BodyPost from '../PostComponents/BodyPost';
import './BodyComponent.css';
import axios from 'axios';
import SubHeader from '../HeaderComponents/SubHeader';

export const postRefresh = createContext({});

function BodyComponent() {
  const [posts, setPosts] = useState([]);
  const [refresh,setRefresh] = useState(true)
  const [offSet, setOffSet] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [title, setTitle] = useState("");

  

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleRefresh =()=>{
    setRefresh(refresh?false:true)
  }
  
  const onClickSetOffSet=(val)=>{
    if(offSet==0&&val<0){
    }else{
      if(posts.length+5>offSet || val<0)
      setOffSet(offSet+val);
    }
  }

  useEffect(() => {
    getPost(category,"", offSet);
    getCategories()
  }, [refresh]);
  useEffect(() => {
    getPost(category,title, offSet);
  }, [offSet, category]);
  useEffect(() => {
    getPost("",title, offSet);
  }, [title]);


  async function getPost($category,$title,$offSet) {
    try {
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/postController.php?category=${$category}&title=${$title}&offSet=${$offSet}`); //ok
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getCategories() {
    try {
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/postController.php?categoryList=ok`); //ok
      setCategoryList(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleChangeTitle = (title) => {
    setTitle(title);
};
  
  return (
    <postRefresh.Provider value={{refresh, handleRefresh}}>
      <SubHeader onChangeTitle={handleChangeTitle} />
        <div id='selectList-container'>
          <div id='selectList-div'>
            <select onChange={handleChange}>
              <option value="">- Sort by category -</option>
              {categoryList.map((item ,index) => (
              <option key={index}>{item.category}</option>
            ))} 
            </select>
          </div>
          <div id='post-numbers'>
            <button onClick={()=>onClickSetOffSet(-5)}>prev</button>
            <p>Posts {offSet+1} to {offSet+5}</p>
            <button onClick={()=>onClickSetOffSet(5)}>next</button>
        </div>
        </div>
      <div className='bodyComponent'>
        {posts.map((item) => (
          <BodyPost key={item.post_id} post={item} />
        ))}
      </div>
      <div id='bodyComponent-footer'>
          <div id='post-numbers'>
          <label>page: {(offSet+5)/5} </label>
        </div>
        </div>
    </postRefresh.Provider>
  );
}

export default BodyComponent;
