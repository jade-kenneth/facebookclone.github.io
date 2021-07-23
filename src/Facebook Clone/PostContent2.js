import React, {useEffect, useState,useReducer, useRef} from 'react'
import {FcVideoCall, FcStackOfPhotos,FcIdea, FcRightDown2} from'react-icons/fc';
import { postdata } from "./postdata";
import { reducer } from "./reducer";
import {HiUserGroup} from 'react-icons/hi';
import { BsThreeDots } from "react-icons/bs";
import { FcLike, FcComments, FcShare,FcCamera } from "react-icons/fc";
import uuid from 'uuid/dist/v4';
import ReactTooltip from "react-tooltip";
import PostModal from "./PostModal";
import { BsCaretDown } from 'react-icons/bs'
import {BiWorld} from 'react-icons/bi';
const defaultState = {
    login_dataS: postdata,
    dataFound: false,
    postModal: false
    
}
const PostContent2 = ({profile, id, name, lastname}) => {


    

    const PostContent = () => {
        let commentRef = useRef(null);
        const [state, dispatch] = useReducer(reducer, defaultState);
        const [reply, setReply] = useState('');
        const {posts} = state.login_dataS;
        let [toPost, setToPost] = useState({...posts});
        const [comment, setComment] = useState('');
        
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        const [commentVal, setCommentVal] = useState({comment1: '', posts: ''});
        let [activePost,setActivePost] = useState('');
        let [activeComment,setActiveComment] = useState('');
        const [replyVal, setReplyVal] = useState({reply1: ''});
        const [show, setShow] = useState(false);
        const [activeId, setActiveId] = useState({hoveractiveComment: '', hoveractivePost: ''})
        let active_post = null;
        const name_id = 'post';
        useEffect(() => {
            dispatch({type: "POSTS_DATA", payload: parseInt(id)});
                
        },[])
        const handleSubmit = (e) => {
            e.preventDefault();
            if (toPost.post) {
                const newPost = { ...toPost, post_id: uuid(), comment: [{comment1: null, replies: [{}]}] };
                posts.push(newPost);
                setToPost({post: ''});
                console.log(newPost);
                dispatch({type: "MODAL_POST_CLOSE"});
            } 
        }
        const triggerPopModal = () => {
            document.body.style.overflow = 'hidden';
            dispatch({type: "MODAL_POST"});
        }
        const handleChange = (e) => {
            
            const toBePostName = e.target.name;
            const toBePostValue = e.target.value;
            setToPost({...toPost, [toBePostName]:toBePostValue });
            if(toBePostValue.length >= 20){
                console.log('ok');
                
            }
        }
        const closeModal = () => {
            document.body.style.overflowY = 'scroll';
            dispatch({type: "MODAL_POST_CLOSE"});
        }
        const handleComment = (e) => {
            
            // const indeX = parseInt(e.target.id);
            // const newComment = [...posts];
            // newComment[indeX-1] = {comment: [ {  id: uuid() , comment1: e.target.value}]};
            // console.log(indeX);
            
            // setComment(newComment[indeX-1]);
            
        }
        const handleEventMouseOutComment = () =>{
            setTimeout(() => {
                setActiveId({hoveractiveComment: '', hoveractivePost: ''});
                
            }, 3000);
        }
        
        const Replies = (props) => {
            const handleSubmit = (e) => {
                e.preventDefault();
                
                const newReply = {...props.comment[props.comment_id], replies: props.replies.push(reply)};
                    setReply('');
                setReplyVal({reply1: ''})
                console.log(props.replies);
                
            }
            const handleChange = (e) => {
                e.preventDefault();
                const indeX = e.target.id;
                const replyName = e.target.name;
                const replyValue = e.target.value;
                replyValue.replace(/\s/g, '');
                const newReply = [...props.comment];
                newReply[indeX-1] = { reply_id: uuid() , reply1: replyValue};
                setReply(newReply[indeX-1]);
                setReplyVal({...props.replies, [replyName]: replyValue})
            }
            
            return (
                <div className="col">
                {props.replies && props.replies.map((data)=>{
                const {reply_id, reply1} = data;
                return (
                    <>
                    <div className="row">
                        <div>
                            <img src={profile} alt="" className="mini-pic"/>
                        </div>
                        <div key={reply_id}>
                            <div className="reply-info" key={reply_id}>
                                <h5>{name}</h5>
                                <p name={reply1} id={reply_id}>{reply1}</p>
                            </div>
                            <div className="comment-reaction">  
                                <div className="comment-actions">
                                    <h6 className="react">Like ·</h6>
                                    <h6 className="reply" onClick={() => {setActiveComment(props.comment_id); setActivePost(props.post_id)}}>Reply</h6>
                                </div>
                            </div>
                        </div>
                    </div> 
                    </>
                )
                })}
                {props.comment_id === activeComment && props.post_id === activePost && <form onSubmit={handleSubmit} className="grp-input reply-input" key={props.comment_id}>
                    <img src={profile} alt="" className="mini-pic"/>
                    <input autoComplete="off" type="text" name={`reply${props.comment_id}`} id={props.comment_id} value={replyVal.reply1} placeholder="Write a reply here..."  onChange={handleChange}  />
                    <FcCamera/>
                </form>}
                
        </div> 
            )
        }
        var Comment =(props)=>{
            
            const handleComment = (e) => {
            
                const indeX = parseInt(e.target.id);
                const commentValue = e.target.value;
                const commentName = e.target.name;
                const newComment = [...posts];
                commentValue.replace(/\s/g, '');
                newComment[indeX] = { comment_id: uuid() , comment1: commentValue, replies: []};
                console.log(indeX);
                
                setComment(newComment[indeX]);
                setCommentVal({...props.comment, [commentName]:commentValue});
                
                
                
            }
            const handleSubmitComment = (e) =>{
                e.preventDefault();
                if(comment.length != 0 || comment === " ")
                {
                    const newComment = {...toPost[props.id - 1], comment: props.comment.push(comment)};
                    setComment('');
                    setCommentVal({comment1: ''})
                    console.log(props.id);
                }
                
            }
            return (
                
                    <form className="grp-input" onSubmit={handleSubmitComment} key={props.id}>
                        <img src={profile} alt="" className="mini-pic"/>
                            <input key={props.id} type="text" name={`comment${props.id}`} value={commentVal.comment1} id={props.id}  placeholder="Write a comment..."  onChange={handleComment} ref={input => commentRef = input} />
                        <FcCamera />
                    </form>
                            
                
            )
        }
        return (
            <>
            {state.postModal && <PostModal profile={profile} name={name} lastname={lastname} trigger={handleSubmit} postVal={toPost.value} triggerChange={handleChange} name_id={name_id} modalClose={closeModal}/>
                    
            }
            <div className="post-container-right">
                <div className="post-content">
                    <div className="whats-on-mind">
                        <img src={profile} alt="" className="post-photo"/>
                        <div className="grp-input">
                            <input type="text"  onClick={triggerPopModal} placeholder={`What's on your mind, ${name}?` }/>
                            
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
                    const {post_id,post,comment} = data;
                    return (
                        <div className="display-posts" key={post_id}  >
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
                                {comment  && comment.map((data) => {
                                    const {comment_id, comment1, replies} = data;
                                    return(
                                        <>
                                        {comment1 !== null && <div key={comment_id} className="comment" >
                                            <div className="commentS" onMouseEnter={() => {setActiveId({hoveractiveComment:comment_id,  hoveractivePost: post_id})}}  >
                                                <div>
                                                    <img src={profile} alt="" className="mini-pic"/>
                                                </div>
                                                <div className="comment-info">
                                                    <h5>{name}</h5>
                                                    <p name={comment1} id={comment_id}>{comment1}</p>
                                                </div>
                                                {activeId.hoveractivePost === post_id && activeId.hoveractiveComment === comment_id && <div className="comment-delete-hide" key={comment_id}>
                                                        <ReactTooltip id="tooltip"/>

                                                        <BsThreeDots data-for='tooltip' className="comment-three-dot" data-tip="Delete or hide this" onMouseOut={handleEventMouseOutComment} onClick={() => setShow(!show)}/>
                                                        { show && <div className="delete-hide">
                                                            <h6>delete</h6>
                                                            <h6>hide</h6>
                                                        </div> }
                                                </div>}
                                                
                                            </div>
                                            
                                            <div className="grp-comment">
                                                <div className="comment-reaction">
                                                    <div className="comment-actions">
                                                        <h6 className="react">Like ·</h6>
                                                        <h6 className="reply" onClick={() => {setActiveComment(comment_id); setActivePost(post_id)}}>Reply</h6>
                                                    </div>
                                                    {Replies({replies: replies, comment_id: comment_id, post_id: post_id, comment: comment})}
                                                </div>
                                            </div>
                                        </div>}
                                        </>
                                    )
                                })}
                                {Comment({post_id: post_id, comment:comment})}
                                
                            </div>
                            
                        </div>
                    )
                })}
                
            </div>
            </>
        )
       
    }
    
    return (
        <div>
            <PostContent/>
        </div>
    )
}

export default PostContent2
