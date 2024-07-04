import React, { createContext, useEffect, useState } from 'react';
import BodyPost from '../PostComponents/BodyPost';
import './BodyComponent.css';
import axios from 'axios';
import SubHeader from '../HeaderComponents/SubHeader';
import { AnimatePresence, motion } from 'framer-motion';
import FooterComponent from '../FooterComponent/FooterComponent';

export const postRefresh = createContext({});

export const loadPanelPost = createContext({});

function BodyComponent() {
  const [posts, setPosts] = useState([]);
  const [refresh,setRefresh] = useState(true)
  const [offSet, setOffSet] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [title, setTitle] = useState("");
  const [post_id, setPost_id] = useState();
  const [showPanelPost, setShowPanelPost] = useState(false);
  const variants = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
  };

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
    window.scrollTo(0,0)
  }

  useEffect(() => {
    getPost(category,"", offSet,"");
    getCategories()
  }, [refresh]);
  useEffect(() => {
    getPost(category,title, offSet,"");
  }, [offSet, category]);
  useEffect(() => {
    getPost("",title, offSet,"");
  }, [title]);
  useEffect(() => {
    getPost("","", "",post_id);
  }, [showPanelPost]);


  async function getPost($category,$title,$offSet,$post_id) {
    try {
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/postController.php?category=${$category}&title=${$title}&offSet=${$offSet}&post_id=${$post_id}`); //ok
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
    <loadPanelPost.Provider value = {{setPost_id, showPanelPost, setShowPanelPost}}>
      <postRefresh.Provider value={{refresh, handleRefresh}}>
        <SubHeader onChangeTitle={handleChangeTitle} />
        <div className='bodyComponent'>
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
              <img src="src\Images\prev-page-btn.svg" onClick={()=>onClickSetOffSet(-5)} />
              <p>Posts {offSet+1} to {offSet+5}</p>
              <img src="src\Images\next-page-btn.svg" onClick={()=>onClickSetOffSet(5)} />
          </div>
          </div>
          <AnimatePresence>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
          >
          {posts.map((item) => (
           
            <BodyPost key={item.post_id} post={item} />
          ))}
          </motion.div>
          </AnimatePresence>
        </div>
        <div id="scroll-btn-container">
          <img src="src\Images\scroll-up-btn.svg" alt="scroll up" id='scroll-btn' onClick={()=>window.scrollTo(0,0)}/>
        </div>
        <div id='bodyComponent-footer'>          
            <div id='post-numbers'>
              <img src="src\Images\prev-page-btn.svg" onClick={()=>onClickSetOffSet(-5)} />
              <label>page: {(offSet+5)/5} </label>
              <img src="src\Images\next-page-btn.svg" onClick={()=>onClickSetOffSet(5)} />
          </div>
          </div>
          <FooterComponent />
      </postRefresh.Provider>
    </loadPanelPost.Provider>  
  );
}

export default BodyComponent;
