import React, { useEffect, useState } from 'react';
import BodyPost from '../PostComponents/BodyPost';
import './BodyComponent.css';
import axios from 'axios';
import SubHeader from '../HeaderComponents/SubHeader';

function BodyComponent(props) {
  const [posts, setPosts] = useState([]);
  const [refresh,setRefresh] = useState(true)
  const [offSet, setOffSet] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  
  const onClickSetOffSet=(val)=>{
    if(offSet==0&&val<0){
    }else{
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
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?category=${$category}&title=${$title}&offSet=${$offSet}`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getCategories() {
    try {
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?categoryList=ok`);
      setCategoryList(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleChangeTitle = (title) => {
    setTitle(title);
};
  
  return (
    <>
      <SubHeader user_id={props.user_id} onClickRefresh={()=>setRefresh(refresh? false:true)} onChangeTitle={handleChangeTitle} user_type={props.user_type} />
        <div id='selectList-container'>
          <div id='selectList-div'>
            <label>Sort by category: </label>
            <select onChange={handleChange}>
              <option value="">- select category -</option>
              {categoryList.map((item ,index) => (
              <option key={index}>{item.category}</option>
            ))} 
            </select>
          </div>
          <div id='prev-next-btnSet-div'>
            <button onClick={()=>onClickSetOffSet(-5)}>prev</button>
            <button onClick={()=>onClickSetOffSet(5)}>next</button>
          </div>
        </div>
      <div className='bodyComponent'>
        {posts.map((item) => (
          <BodyPost key={item.post_id} post={item} user_id={props.user_id} />
        ))}
      </div>
    </>
  );
}

export default BodyComponent;
