import React, {useEffect, useState,useReducer, useRef} from 'react'
import {FcVideoCall, FcStackOfPhotos,FcIdea, FcRightDown2} from'react-icons/fc';
import { postdata } from "./postdata";
import { reducer } from "./reducer";
import {HiUserGroup} from 'react-icons/hi';
import { BsThreeDots } from "react-icons/bs";
import { FcLike, FcComments, FcShare,FcCamera } from "react-icons/fc";
import uuid from 'uuid/dist/v4';
const defaultState = {
    login_dataS: postdata,
    dataFound: false
}
const PostContent2 = ({profile, id, name}) => {

    const PostContent = () => {
        const commentRef = useRef(null);
        
        const [state, dispatch] = useReducer(reducer, defaultState);
        const [reply, setReply] = useState(false);
        
        useEffect(() => {
            dispatch({type: "POSTS_DATA", payload: parseInt(id)});
                
        },[])
        
        const {posts} = state.login_dataS;
        const [toPost, setToPost] = useState({...posts});
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        const handleSubmit = (e) => {
            e.preventDefault();
            if (toPost.post) {
                const newPost = { ...toPost, id: uuid() };
                posts.push(newPost);
                setToPost({post: ''});
                
            } 
        }
        const handleChange = (e) => {
            const toBePostName = e.target.name;
            const toBePostValue = e.target.value;
            setToPost({...toPost, [toBePostName]:toBePostValue });
        }
        const handleComment = (e) => {
            
            const indeX = parseInt(e.target.id);
            const newComment = [...posts];
            newComment[indeX] = e.target.value;
            
            console.log(newComment[indeX]);
            setToPost({posts: newComment})
            
            
            
            
        }
        const handleSubmitComment = (e) =>{
            e.preventDefault();
            const newComment = {id, ...toPost, id: uuid()};
        
            console.log(toPost);
        }
        return (
            
            <div className="post-container-right">
                <div className="post-content">
                    <div className="whats-on-mind">
                        <img src={profile} alt="" className="post-photo"/>
                        <div className="grp-input">
                            <input type="text" value={toPost.post} name="post" id="post" onChange={handleChange} placeholder="What's on your mind?"/>
                            <FcRightDown2 className="post-btn" onClick={handleSubmit}/>
                        </div>
                        
                    </div>
                    <hr/>
                    <div className="nav-post-content" >
                        <div className="live-video-btn">
                            <FcVideoCall/>
                            <h5>Live Video </h5>
                        </div>
                        <div className="photos-video-btn">
                            <FcStackOfPhotos/>
                            <h5>Photos</h5>
                        </div>
                        <div className="life-event-btn">
                            <FcIdea/>
                            <h5>Life Events</h5>
                        </div>
                    </div>
                    
                </div>
                
                {state.dataFound && posts.slice(0).reverse().map((data) => {
                    const {id,post,comment} = data;
                    
                   // console.log(comments);
                    return (
                        <div className="display-posts" key={id}  >
                            <div className="profile-posts">
                                <img src={profile} alt="" className="post-photo"/>
                                <div className="name">
                                    <h5>{name}</h5>
                                    <h6>{date} <HiUserGroup/></h6>
                                </div>
                                <div className="dots">
                                        <BsThreeDots />
                                </div>
                                
                            </div>
                            <h5>{post}</h5>
                            <div className="react-post">
                                <div className="like-react">
                                    <FcLike/>
                                    <h4>Like</h4>
                                </div>
                                <div className="comment-react">
                                    <FcComments/>
                                    <h4>Comment</h4>
                                </div>
                                <div className="share-react">
                                    <FcShare/>
                                    <h4>Share</h4>
                                </div>
                                
                            </div>
                            <div className="comment-section">
                                {comment && comment.map((data) => {
                                        const {id, comment1, replies} = data;
                                        return(
                                            <div key={id} className="comment">
                                                <div>
                                                    <img src={profile} alt="" className="mini-pic"/>
                                                </div>
                                                    <div className="grp-comment">
                                                        <div className="comment-info">
                                                            <h5>{name}</h5>
                                                            <p name={comment1} id={id}>{comment1}</p>
                                                        </div>
                                                        <div className="comment-reaction">
                                                            <div className="comment-actions">
                                                                <h6 className="react">Like ·</h6>
                                                                <h6 className="reply" onClick={() => setReply(!reply)} >Reply</h6>
                                                                
                                                            </div>
                                                            <div className="col">
                                                                    {replies && replies.map((data)=>{
                                                                    const {id, reply1} = data;
                                                                    return (
                                                                        <>
                                                                        <div className="row">
                                                                            <div>
                                                                                    <img src={profile} alt="" className="mini-pic"/>
                                                                            </div>
                                                                            <div>
                                                                                <div className="reply-info" key={id}>
                                                                                    <h5>{name}</h5>
                                                                                    <p name={reply1} id={id}>{reply1}</p>
                                                                                </div>
                                                                                <div className="comment-reaction">
                                                                                    <div className="comment-actions">
                                                                                        <h6 className="react">Like ·</h6>
                                                                                        <h6 className="reply" onClick={() => setReply(!reply)} >Reply</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                        </>
                                                                    )
                                                                    
                                                                    
                                                                    })}
                                                                     {reply &&  <div className="grp-input" key={id}>
                                                                    <img src={profile} alt="" className="mini-pic"/>
                                                                        <input type="text" name="comment" id={id}  placeholder="Write a reply here..."  onChange={handleComment} ref={commentRef} />
                                                                        <FcCamera/>
                                                                    </div>}
                                                            </div> 
                                                            
                                                        </div>
                                                    </div>
                                            </div>
                                            
                                        )
                                    })}
                                    
                                <div className="grp-input" key={id}>
                                    <img src={profile} alt="" className="mini-pic"/>
                                        <input type="text" name="comment1" value={toPost.comment1} id={id}  placeholder="Write a comment..."  onChange={handleComment} ref={commentRef} />
                                        
                                        <FcCamera onClick={handleSubmitComment}/>
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
                
            </div>
        )
    }
    return (
        <div>
            <PostContent/>
        </div>
    )
}

export default PostContent2
