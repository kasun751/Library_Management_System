// SidePanel.jsx
import React, { useState, useEffect, useContext } from 'react';
import './SidePanel.css';
import axios from 'axios';
import PanelPost from '../PostComponents/PanelPost';
import ReportPost from '../PostComponents/ReportPost';
import ReportReplyBox from '../ReplyBoxComponent/ReportReplyBox';
import { postRefresh } from '../BodyComponents/BodyComponent';
import { userAuthentication } from '../../App';

function SidePanel(props) {
    const [mySaveposts, setmySaveposts] = useState([]);
    const [myposts, setmyPosts] = useState([]);
    const [reportPosts, setReportPosts] = useState([]);
    const [reportMsg, setReportMsg] = useState([]);

    const {refresh} = useContext(postRefresh);
    const {user_id, user_type} = useContext(userAuthentication)

    useEffect(() => {
        if (props.state === "myPost") {
            getmyPost(user_id);
        } else if (props.state === "savePost") {
            getmySavePost(user_id);
        } else if (props.state === "reportMsg") {
            getReportedMsg(user_id);
        } else if (props.state === "reportPost") {
            getReportedPost();
        }
    }, [props.state, props.user_id, refresh]);

    async function getmySavePost(user_id) {
        try { //ok
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/sidePostPanelController.php?user_id=${user_id}`);
            setmySaveposts(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function getmyPost(user_id) {
        try { //ok
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/sidePostPanelController.php?user_id1=${user_id}`);
            setmyPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function getReportedPost() {
        try { //ok
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/reportPostController.php`);
            setReportPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function getReportedMsg() {
        try { //ok
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/reportReplyMsgController.php`);
            setReportMsg(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='container sidePanel_container col-lg-5 col-md-7'>
          <img id='sidePanel-back-btn' src="src\Images\arrow-right.svg" onClick={props.onClickClose}/>
            <div className='row text-center'>
                <div className='col-12'>
                    {props.state === "savePost" && <h2>Save Posts</h2>}
                    {props.state === "myPost" && <h2>My Posts</h2>}
                    {props.state === "reportPost" && <h2>Report Posts</h2>}
                    {props.state === "reportMsg" && <h2>Report Messages</h2>}
                </div>
                <div className='col-12'>
                    {props.state === "savePost" && mySaveposts.map((item) => (
                        <PanelPost key={item.post_id} onclickClose={props.onClickClose} post={item} />
                    ))}
                    {props.state === "myPost" && myposts.map((item) => (
                        <PanelPost key={item.post_id} onclickClose={props.onClickClose} post={item} />
                    ))}
                    {props.state === "reportPost" && reportPosts.map((item, index) => (
                        <ReportPost key={index} post={item} />
                    ))}
                    {props.state === "reportMsg" && reportMsg.map((item, index) => (
                        <ReportReplyBox key={index} post_id2={item.post_id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SidePanel;
