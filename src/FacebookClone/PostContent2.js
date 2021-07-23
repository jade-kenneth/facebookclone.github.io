import React, {useEffect, useState,useReducer, useRef, useCallback, useMemo} from 'react'
import {FcVideoCall, FcStackOfPhotos,FcIdea, FcRightDown2} from'react-icons/fc';
import { postdata } from "./postdata";
import { reducer } from "./reducer";
import {HiUserGroup} from 'react-icons/hi';
import { BsThreeDots } from "react-icons/bs";
import { FcLike, FcComments, FcShare,FcCamera } from "react-icons/fc";
import {AiOutlineLike} from 'react-icons/ai'
import uuid from 'uuid/dist/v4';
import ReactTooltip from "react-tooltip";
import { BsCaretDown } from 'react-icons/bs';
import {BiWorld} from 'react-icons/bi';
import PostSkeleton from './Skeletons/PostSkeletons';
import { AuthorizedUserPosts, AuthorizedUserData } from './contexts/UserContext';
import { useFetch } from './custom-hooks/useFetch';


const PostContent2 = () => {

    const {authorizedData ,dispatch} = AuthorizedUserData();
    const [ {id ,username, lastname, profile}] = authorizedData.activeAccount;
    const [openModal, setOpenModal] = useState(false);
    // const {data: postsData, loading} = useFetch(`http://localhost:8000/userPosts/?=${id}`)
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    console.log(authorizedData.userPosts);
    
    

    const loadComment = () => {
        dispatch({type: "LOAD_COMMENT"});
    }
    const loadReply = () => {
        dispatch({type: "LOAD_REPLY"});
    }
    const deleteComment = () => {
        dispatch({type: "DELETE_COMMENT"});
    }
    const adjustHeight = () => {
        const tx = document.getElementsByTagName("textarea");
        for (let i = 0; i < tx.length; i++) {
            if(tx[i].textLength <=  100){
                
                tx[i].setAttribute("style", `height:  ${tx[i].scrollHeight}px;overflow-y:hidden; font-size: 1.2rem`);
                tx[i].addEventListener("input", OnInput, false);   
            }
            else if(tx[i].textLength >= 150 ){
                tx[i].setAttribute("style", `height:  ${tx[i].scrollHeight}px;overflow-y:visible; font-size: 1rem`);
                tx[i].addEventListener("input", OnInput, false);
            }
            else{
                tx[i].setAttribute("style", `height:  ${tx[i].scrollHeight}px;overflow-y:hidden; `);
                tx[i].addEventListener("input", OnInput, false);
                
            }
        }
        function OnInput() {
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + "px";
            
        }
    }
    useEffect (() => {
        adjustHeight();
    })
    useEffect(() => {
        if(!authorizedData.dataFound){
            const timer = setTimeout(() => {
                dispatch({type:"POSTS_DATA", payload: id});
            },5000)
        }
    },[])
    
        
        console.log(openModal);
        return (
            <React.Fragment>
            {openModal && <PostModal profile={profile}  id ={id} name={username} lastname={lastname} post={authorizedData.posts} loadComment={loadComment}  setOpenModal={setOpenModal} adjustHeight={adjustHeight}/>}
            <div className="post-container-right">
                <Whatsonmind profile={profile} name={username} setOpenModal={setOpenModal}/>
                {authorizedData.dataFound  && authorizedData.posts.slice(0).reverse().map((data) => {
                        const {post_id,post,comment} = data;
                        return (
                            <React.Fragment key={post_id}>
                                <div className="display-posts">
                                    <div className="profile-posts">
                                        <img src={profile} alt="" className="post-photo"/>
                                        <div className="name">
                                            <h5>{username}</h5>
                                            <h6>{date} <HiUserGroup/></h6>
                                        </div>
                                        <div className="dots">
                                                <BsThreeDots />
                                        </div>
                                    </div>
                                    <div className='text-post'   >
                                        <textarea readOnly value={post} />
                                    </div>
                                    <div className="react-post">
                                        <div className="like-react">
                                            <AiOutlineLike />
                                            <h4>Like</h4>
                                        </div>
                                        <div className="comment-react" onClick={() => document.getElementById(`commentInput${post_id}`).focus()} >
                                            <FcComments/>
                                            <h4>Comment</h4>
                                        </div>
                                        <div className="share-react">
                                            <FcShare/>
                                            <h4>Share</h4>
                                        </div>
                                        
                                    </div>
                                {/* rendering comments  */}
                                <div className="comment-section" >
                                    {/* Divided into components to avoid wasted re rendering
                                    -- loadComment allows to re renderComment when props changed */}
                                    
                                    <RenderComments comment={comment} name={username} profile={profile} posts={authorizedData.posts} post={post} post_id={post_id} deleteComment={deleteComment} loadReply={loadReply} loadComment={loadComment} /> 
                                    {/* setLoadComment  enable to change props [loadComment]  */}
                                    
                                </div>
                            </div>
                            </React.Fragment>
                        )
                })}
                {!authorizedData.dataFound&& [1,2,3,4,5].map((idx) => <PostSkeleton key={idx} theme="dark"/>) }
            </div>
            </React.Fragment>
        )
    
    
}




const PostModal = (props) => {
    const input = document.querySelectorAll('create-post-content');
    const postRef = useRef(null);
    const modal = useRef(null);
    // const {dispatch} = AuthorizedUserData();

    let [toPost, setToPost] = useState({...props.post});
    const [toPostVal , setToPostVal] = useState({...props.post, post: ''});
    console.log("POST MODAL RENDERS");
    const handleSubmit = (e) => {
        e.preventDefault();
        document.body.style.overflowY = 'scroll'; 
        if (toPost) {
            props.setOpenModal(false);
            console.log(toPost);
            const newPost = {id: uuid(), post: toPostVal.post, post_id: uuid(), comment: [] };
            props.post.push(newPost);
            console.log(props.post);
            setToPost({post: ''});
            setToPostVal({post: ''});
           
            // const INSERT_DATA_JSON = async () => {
            //     const location = window.location.hostname;
            //     const settings = {
            //         method: 'POST',
            //         headers: {'Content-Type': 'application/json'},
            //         body: JSON.stringify(newPost)
            //     };
            //     try {
                    
            //         const fetchResponse = await fetch(`http://${location}:8000/userPosts/`, settings);
            //         const data = await fetchResponse.json();
                    
            //         return data;
            //     } catch (e) {
            //         return e;
            //     }    
            
            // }
            
            // INSERT_DATA_JSON();
            
            
            
        }
        
    }
    const handleChange = (e) => {

        const toBePostName = e.target.name;
        const toBePostValue = e.target.value;
        setToPostVal({[toBePostName]:toBePostValue})
        setToPost({...toPost, [toBePostName]:toBePostValue });

    }
    useEffect(() => {
        props.adjustHeight();
        
    }) 
    
    useEffect(() => {
        postRef.current.focus();
    },[])
    
        useEffect(() => {
            document.addEventListener("mousedown", handleClick);
            return () => {
            document.removeEventListener("mousedown", handleClick);
            };
            }, []);
    
        const handleClick = (e) => {
            if(!modal.current.contains(e.target)){
                props.setOpenModal(false);
            }
        }
    

    return (
        
        <React.Fragment>
        
        <div className="pop-up-post-container" >
        <div className="post-form" ref={modal}>
            <div className="create-post-title">
                <div className="create-post">
                    <h2>Create Post</h2>
                </div>
                
                <div className="close-btn">
                    <button onClick={() =>props.setOpenModal(false)}>X</button>
                </div>
                
            </div>
            <hr/>
            
            <div className="create-post-details">
                <img src={props.profile} alt="" className="mini-pic"/>
                <div>
                    <h4>{props.name} {props.lastname}</h4>
                    <button><BiWorld/> Public <BsCaretDown/> </button>
                </div>
                
            </div>
            <div className="create-post-content">
            <textarea  id='text' ref={postRef}  onChange={handleChange} type="text" value={toPostVal.post} name="post" id="post" rows="1"  placeholder="What's on your mind?"></textarea>
                
            </div>
            
            <div className="post-btn" >
                <button onClick={handleSubmit}>POST</button>
            </div>
            
        </div>
        </div>
        
        </React.Fragment>
    )
}
const RenderComments = React.memo((props)=> {
    let [activeComment,setActiveComment] = useState('');
    // whenever this state changes re renders happen 
    //USE FOR LOADING COMMENT DATAs
    const [loadComment, setLoadComment] = useState(false);
    let [activePost,setActivePost] = useState('');
    const [show, setShow] = useState(false);
    const [activeId, setActiveId] = useState({hoveractiveComment: '', hoveractivePost: ''})
    const each_comment = useRef(null);
    
    


    const handleEventMouseOutComment = () =>{
        setActiveId({hoveractiveComment: '', hoveractivePost: ''});
        setShow(false);
    }
    return (
        <React.Fragment  >
            {/* In new post, comment are not already availabe so checking the props.comment first if it should be rendered */}
        {props.comment  && props.comment.map((data) => {
            const {comment_id, comment1, replies} = data;
            
            return(
                <React.Fragment key={comment_id}    >
                {/* in new post comment1 is set to null as initialization, so checking comment1 if it is null then dont render  */}
                {comment1 !== null && <div  className="comment" >
                
                    <div className="commentS" ref={each_comment} onMouseLeave={handleEventMouseOutComment} onMouseEnter={() => {setActiveId({hoveractiveComment:comment_id,  hoveractivePost: props.post_id})}}  >  
                        <div>
                            <img src={props.profile} alt="" className="mini-pic"/>
                        </div>
                        <div className="comment-info">
                            <h5>{props.name}</h5>
                            <p name={comment1} id={comment_id}>{comment1}</p>
                        </div>
                        {activeId.hoveractivePost === props.post_id && activeId.hoveractiveComment === comment_id && <div  className="comment-delete-hide" >
                                <ReactTooltip id="tooltip"/>
                                <BsThreeDots data-for='tooltip' className="comment-three-dot" data-tip="Delete or hide this"  onClick={() => setShow(!show)}/>
                                { show && <div className="delete-hide">
                                    <h6 onClick={() =>  window.alert("wew")  }>delete</h6>
                                    <h6>hide</h6>
                                </div> }
                        </div>}
                    </div>
                    <div className="grp-comment">
                        <div className="comment-reaction">
                            <div className="comment-actions">
                                <h6 className="react">Like ·</h6>
                                <h6 className="reply" onClick={() => {setActiveComment(comment_id); setActivePost(props.post_id)}}>Reply</h6>
                            </div>
                            
                            <Replies loadReply={props.loadReply} replies={replies} activeComment={activeComment} setActiveComment={setActiveComment}
                            setActivePost={setActivePost} activePost={activePost} comment_id={comment_id} name={props.name}
                            post_id={props.post_id} comment={props.comment} profile={props.profile}/>
                        </div>
                    </div>

                    
                </div>}
                </React.Fragment>
                
            )
            
        })}
        <Comment  post_id={props.post_id} posts= {props.posts} post={props.post} comment={props.comment} profile={props.profile} name={props.name} loadComment={props.loadComment} setLoadComment={setLoadComment} />

        </React.Fragment>
    )
})
    
const Replies = React.memo((props) => {
    console.log("replies renders");
    
    const [replyVal, setReplyVal] = useState({reply1: ''});
    const [reply, setReply] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.replies.push(reply);
        props.loadReply();
        setReply('');
        setReplyVal({reply1: ''}) 
        
        
        
    }
    const handleChange = (e) => {
        e.preventDefault();
        const indeX = e.target.id;
        const replyName = e.target.name;
        const replyValue = e.target.value;
        //excess spaces are not counted in actual render
        replyValue.replace(/\s/g, '');
        let newReply = [...props.comment];
        newReply = { reply_id: uuid() , reply1: replyValue};
        setReply(newReply);
        setReplyVal({...props.replies, [replyName]: replyValue})
    }
    
    return (
        <div className="col">
        {props.replies && props.replies.map((data)=>{
        const {reply_id, reply1} = data;
        return (
            <React.Fragment key={reply_id}>
            <div className="row" >
                <div>
                    <img src={props.profile} alt="" className="mini-pic"/>
                </div>
                <div >
                    <div className="reply-info" >
                        <h5>{props.name}</h5>
                        <p name={reply1} id={reply_id}>{reply1}</p>
                    </div>
                    <div className="comment-reaction">  
                        <div className="comment-actions">
                            <h6 className="react">Like ·</h6>
                            {/* getting comment id and activePost  */}
                            <h6 className="reply" onClick={() => {props.setActiveComment(props.comment_id); props.setActivePost(props.post_id)}}>Reply</h6>
                        </div>
                    </div>
                </div>
            </div> 
            </React.Fragment>
        )
        })}
        {/* rendering reply input after setting activepost and comment id  */}
        {props.comment_id === props.activeComment && props.post_id === props.activePost && <form onSubmit={handleSubmit} className="grp-input reply-input" >
            <img src={props.profile} alt="" className="mini-pic"/>
            <input autoComplete="off" type="text" name="reply1" id={props.comment_id} value={replyVal.reply1} placeholder="Write a reply here..."  onChange={handleChange}  />
            <FcCamera/>
        </form>}
        {/* {console.log(props.comment_id + " " + props.activeComment + " " + props.post_id +" " + props.activePost) } */}
    </div> 
    )
})
const Comment = React.memo((props)=> {
    console.log("comment renders");
    let commentRef = useRef(null);
    const [comment, setComment] = useState('');
    const [toPost, setPost] = useState({...props.posts});
    const [commentVal, setCommentVal] = useState({comment1: ''});
    //setting false whenever it re renders
    const isLoaded = false;
    let newComment;
    const handleComment = (e) => {
        
        
        const commentValue = e.target.value;
        const commentName = e.target.name;
        commentValue.replace(/\s/g, '');
        newComment = { comment_id: uuid(),  comment1: commentValue, replies: []};
        setComment(newComment);
        setCommentVal({[commentName]:commentValue});
        
        
        
    }
    const handleSubmitComment = (e) =>{
        e.preventDefault();
        if(comment.length != 0 || comment === " ")
        {
            // push new comment
            props.comment.push(comment);
            console.log(newComment);
            //dispatch loadComment to render comment and update localStorage
            props.loadComment();
            //set to empty string 
            setComment('');
            setCommentVal({comment1: ''})
        }
        
    }
    return (
        
        
        
            <form className="grp-input" onSubmit={handleSubmitComment} >
                <img src={props.profile} alt="" className="mini-pic"/>
                    <input type="text"  name="comment1" id={`commentInput${props.post_id}`} value={commentVal.comment1}  placeholder="Write a comment..."  onChange={handleComment} ref={input => commentRef = input} />
                <FcCamera />
                        
            </form>
        
       
        
    )
})
const Whatsonmind = React.memo((props) => {
    
    console.log("whatsonmind renders");
    
    return (
        <div className="post-content">
                <div className="whats-on-mind">
                    <img src={props.profile} alt="" className="post-photo"/>
                    <div className="grp-input">
                        <input type="text" defaultValue=""  onClick={() =>  props.setOpenModal(true)} placeholder={`What's on your mind, ${props.name}?` }/>
                        
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
    )
}) 
    


export default PostContent2
