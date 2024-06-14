// SidePanel.jsx
import React, { useState, useEffect } from 'react';
import './SidePanel.css';
import axios from 'axios';
import PanelPost from '../PostComponents/PanelPost';
import ReportPost from '../PostComponents/ReportPost';
import ReportReplyBox from '../ReplyBoxComponent/ReportReplyBox';

function SidePanel(props) {
    const [mySaveposts, setmySaveposts] = useState([]);
    const [myposts, setmyPosts] = useState([]);
    const [reportPosts, setReportPosts] = useState([]);
    const [reportMsg, setReportMsg] = useState([]);

    useEffect(() => {
        if (props.state === "myPost") {
            getmyPost(props.user_id);
        } else if (props.state === "savePost") {
            getmySavePost(props.user_id);
        } else if (props.state === "reportMsg") {
            getReportedMsg(props.user_id);
        } else if (props.state === "reportPost") {
            getReportedPost();
        }
    }, [props.state, props.user_id]);

    async function getmySavePost(user_id) {
        try {
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?user_id=${user_id}`);
            setmySaveposts(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function getmyPost(user_id) {
        try {
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?user_id1=${user_id}`);
            setmyPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function getReportedPost() {
        try {
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/User-reportPostManager.php`);
            setReportPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function getReportedMsg() {
        try {
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/User-reportReplyManager.php`);
            setReportMsg(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='container sidePanel_container col-lg-5 col-md-7'>
            <div className='row text-center'>
                <div className='col-12'>
                    {props.state === "savePost" && <h2>Save Posts</h2>}
                    {props.state === "myPost" && <h2>My Posts</h2>}
                    {props.state === "reportPost" && <h2>Report Posts</h2>}
                    {props.state === "reportMsg" && <h2>Report Messages</h2>}
                </div>
                <div className='col-12'>
                    {props.state === "savePost" && mySaveposts.map((item) => (
                        <PanelPost key={item.post_id} post={item} user_id={props.user_id} />
                    ))}
                    {props.state === "myPost" && myposts.map((item) => (
                        <PanelPost key={item.post_id} post={item} user_id={props.user_id} />
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
